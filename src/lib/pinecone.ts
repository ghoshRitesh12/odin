import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

const apiKey = process.env.PINECONE_API_KEY;
const pineconeIndexName = process.env.PINECONE_INDEX_NAME;
// const chunkIdSeparator = "@";

if (!apiKey || !pineconeIndexName) {
  throw new Error("Missing PINECONE_API_KEY environment variable");
}

export const pinecone = new Pinecone({ apiKey });

export const videosIndex = pinecone.Index(pineconeIndexName);

export async function upsertTranscriptChunks(
  texts: string[],
  videoId: string,
  userId: string
) {
  try {
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGING_FACE_API_KEY!,
      model: "jinaai/jina-embeddings-v2-base-en",
    });

    await PineconeStore.fromTexts(
      texts,
      { userId, videoId },
      embeddings, //
      {
        pineconeIndex: videosIndex,
        textKey: userId,
      }
    );
  } catch (err) {
    console.error(err);
    throw new Error("Error upserting transcript chunks into pinecone index");
  }
}

export async function getVectorStore(userId: string) {
  try {
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGING_FACE_API_KEY!,
      model: "jinaai/jina-embeddings-v2-base-en",
    });

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: videosIndex,
      textKey: userId,
    });

    return vectorStore;
  } catch (err) {
    console.error(err);
    throw new Error("Error getting vector store from pinecone index");
  }
}
