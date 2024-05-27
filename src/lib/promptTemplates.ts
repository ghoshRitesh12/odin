import {
  MessagesPlaceholder,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";

// Creates a standalone question from the chat-history and the current question
export const STANDALONE_QUESTION_TEMPLATE = [
  AIMessagePromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
  `),
  new MessagesPlaceholder("chat_history"),
  AIMessagePromptTemplate.fromTemplate(`Follow Up Input: {input}
  Standalone question:`),
];

// Actual question you ask the chat and send the response to client
export const QA_TEMPLATE = [
  AIMessagePromptTemplate.fromTemplate(`You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.\n\n{context}\n\n`),
  // new MessagesPlaceholder("chat_history"),
  HumanMessagePromptTemplate.fromTemplate(`Question: {input}
  Helpful answer in markdown:
  `),
];
