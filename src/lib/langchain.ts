import { model } from "./llm";
import { getVectorStore } from "./pinecone";
import type { Runnable } from "@langchain/core/runnables";
import type { BaseMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { STANDALONE_QUESTION_TEMPLATE, QA_TEMPLATE } from "./promptTemplates";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

export async function createRAGChain(
  userId: string
): Promise<Runnable<{ input: string; chat_history: BaseMessage[] }, string>> {
  try {
    const vectorStore = await getVectorStore(userId);

    const historyAwarePrompt = ChatPromptTemplate.fromMessages(
      STANDALONE_QUESTION_TEMPLATE
    );

    const historyAwareRetriever = await createHistoryAwareRetriever({
      llm: model,
      retriever: vectorStore.asRetriever(),
      rephrasePrompt: historyAwarePrompt,
      // retriever: vectorStore.asRetriever({
      //   metadata: { userId },
      // }),
    });

    const promptGetAnswer = ChatPromptTemplate.fromMessages(QA_TEMPLATE);

    const questionAnswerChain = await createStuffDocumentsChain({
      llm: model,
      prompt: promptGetAnswer,
    });

    const conversationalRetrievalChain = await createRetrievalChain({
      retriever: historyAwareRetriever,
      combineDocsChain: questionAnswerChain,
    });

    return conversationalRetrievalChain.pick("answer");
  } catch (err) {
    throw err;
  }
}
