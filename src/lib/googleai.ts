import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

const apiKey = process.env.HUGGING_FACE_API_KEY;

if (!apiKey) {
  throw new Error("Missing HUGGING_FACE_API_KEY environment variable");
}

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGING_FACE_API_KEY!,
  model: "jinaai/jina-embeddings-v2-base-en",
});

export async function getEmbedding(text: string) {
  const results = await embeddings.embedQuery(text);
  console.log(results);

  return results;
}

export async function getEmbeddings(docs: string[]) {
  const results = await embeddings.embedDocuments(docs);
  console.log(results);

  return results;
}
