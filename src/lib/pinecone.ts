import { getEmbeddingModel } from "./embedding";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;
const pineconeIndexName = process.env.PINECONE_INDEX_NAME;

if (!apiKey || !pineconeIndexName) {
  throw new Error(
    "Missing PINECONE_API_KEY or index name environment variable"
  );
}

export const pinecone = new Pinecone({ apiKey });
export const videosIndex = pinecone.Index(pineconeIndexName);

export async function upsertTranscriptChunks(
  texts: string[],
  videoId: string,
  userId: string
) {
  try {
    const embeddings = getEmbeddingModel();

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
    const embeddings = getEmbeddingModel();

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
