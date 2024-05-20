import { HfInference } from "@huggingface/inference";

export function getChatCompletionModel() {
  // "google/gemma-1.1-7b-it"
  const chatCompletionModelName = "meta-llama/Meta-Llama-3-8B-Instruct";
  const hf = new HfInference(process.env.HUGGING_FACE_API_KEY!);

  return {
    hf,
    chatCompletionModelName,
  };
}
