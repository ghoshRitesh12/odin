import { HfInference } from "@huggingface/inference";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import type { Document } from "langchain/document";

export async function getSummarizedChunks(transcript: string) {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
  });

  console.log("Splitting transcript into documents...");
  const docs = await textSplitter.createDocuments([transcript]);

  console.log("Invoking summarization chain...");
  const summaryChunks = await invokeSummarizationChain(docs);

  return summaryChunks;
}

async function invokeSummarizationChain(docs: Document<Record<string, any>>[]) {
  try {
    // "meta-llama/Meta-Llama-3-8B-Instruct"
    const chatCompletionModelName = "google/gemma-1.1-7b-it";
    const hf = new HfInference(process.env.HUGGING_FACE_API_KEY!);

    console.log(JSON.stringify(docs, null, 2));
    console.log(docs.length);

    const summaries = await Promise.all(
      docs.map(async (doc) => {
        const chat = await hf.chatCompletion(
          {
            model: chatCompletionModelName,
            messages: [
              {
                role: "user",
                content: `
                Write a concise summary of the following in plain text paragraph:
                "${doc.pageContent}"
                `,
              },
            ],
          },
          {
            use_cache: true,
          }
        );

        const summary = chat.choices[0].message.content
          ?.replace(/[\s]+/g, " ")
          .trim();

        return summary || "";
      })
    );

    return summaries;
  } catch (err) {
    throw err;
  }
}
