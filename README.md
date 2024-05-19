## Odin

An AI chatbot named after the Norse God of Wisdom who sacrificed an eye to gain immense knowledge

```typescript
  import { ChatAnthropic } from "@langchain/anthropic";
  import {
    ChatPromptTemplate,
    MessagesPlaceholder,
  } from "@langchain/core/prompts";
  import { BaseMessage } from "@langchain/core/messages";
  import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
  import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
  import { createRetrievalChain } from "langchain/chains/retrieval";

  const retriever = ...your retriever;
  const llm = new ChatAnthropic();

  // Contextualize question
  const contextualizeQSystemPrompt = `
  Given a chat history and the latest user question
  which might reference context in the chat history,
  formulate a standalone question which can be understood
  without the chat history. Do NOT answer the question, just
  reformulate it if needed and otherwise return it as is.`;
  const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
    ["system", contextualizeQSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);
  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm,
    retriever,
    rephrasePrompt: contextualizeQPrompt,
  });

  // Answer question
  const qaSystemPrompt = `
  You are an assistant for question-answering tasks. Use
  the following pieces of retrieved context to answer the
  question. If you don't know the answer, just say that you
  don't know. Use three sentences maximum and keep the answer
  concise.
  \n\n
  {context}`;
  const qaPrompt = ChatPromptTemplate.fromMessages([
    ["system", qaSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  // Below we use createStuffDocuments_chain to feed all retrieved context
  // into the LLM. Note that we can also use StuffDocumentsChain and other
  // instances of BaseCombineDocumentsChain.
  const questionAnswerChain = await createStuffDocumentsChain({
    llm,
    prompt: qaPrompt,
  });

  const ragChain = await createRetrievalChain({
    retriever: historyAwareRetriever,
    combineDocsChain: questionAnswerChain,
  });

  // Usage:
  const chat_history: BaseMessage[] = [];
  const response = await ragChain.invoke({
    chat_history,
    input: "...",
  });
```
