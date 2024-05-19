import { getVectorStore } from "./pinecone";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

import { streamingModel, nonStreamingModel } from "./llm";
import {
  StreamingTextResponse,
  StreamData,
  LangChainAdapter,
  LangChainStream,
} from "ai";
import { STANDALONE_QUESTION_TEMPLATE, QA_TEMPLATE } from "./promptTemplates";

type callChainArgs = {
  question: string;
  chatHistory: string;
  userId: string;
};

export async function callChain({
  question,
  chatHistory,
  userId,
}: callChainArgs) {
  try {
    const sanitizedQuestion = question.replace(/[\s]/g, " ");
    const vectorStore = await getVectorStore(userId);

    const streams = await streamingModel.stream("");
    const {} = LangChainAdapter.toAIStream(streams);

    const retrieverChain = createHistoryAwareRetriever({
      // @ts-ignore
      llm: nonStreamingModel,
      retriever: vectorStore.asRetriever(),
      rephrasePrompt: "",
    });

    //
  } catch (err) {}
}
