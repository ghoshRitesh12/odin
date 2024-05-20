"use client";

import type { Key } from "react";
import { cn } from "@/lib/utils";

import UserChat from "./UserChat";
import AssistantChat from "./AssistantChat";

type Convo = {
  role: "assistant" | "user";
  message: string;
};

export const convoMap = {
  assistant: (key: Key, message: string) => (
    <AssistantChat
      message={message}
      key={key}
    />
  ),
  user: (key: Key, message: string) => (
    <UserChat
      message={message}
      key={key}
    />
  ),
};

export const convos: Convo[] = [
  {
    role: "assistant",
    message: "Hello there! How can I help you today?",
  },
  {
    role: "user",
    message: "LMAO",
  },
  {
    role: "assistant",
    message: "Can I help you today?",
  },
  {
    role: "assistant",
    message: "Hello there! How can I help you today?",
  },
  {
    role: "user",
    message: "LMAO",
  },
  {
    role: "assistant",
    message: "Can I help you today?",
  },
  {
    role: "assistant",
    message: "Hello there! How can I help you today?",
  },
  {
    role: "user",
    message: "LMAO",
  },
  {
    role: "assistant",
    message: "Can I help you today?",
  },
  {
    role: "assistant",
    message: "Hello there! How can I help you today?",
  },
  {
    role: "user",
    message: "LMAO",
  },
  {
    role: "assistant",
    message: "Can I help you today?",
  },
  {
    role: "assistant",
    message: "Hello there! How can I help you today?",
  },
  {
    role: "user",
    message: "LMAO",
  },
  {
    role: "assistant",
    message: "Can I help you today?",
  },
  {
    role: "assistant",
    message: "Hello there! How can I help you today?",
  },
  {
    role: "user",
    message: "LMAO",
  },
  {
    role: "assistant",
    message: "Can I help you today?",
  },
  {
    role: "assistant",
    message: "Hello there! How can I help you today?",
  },
  {
    role: "user",
    message: "LMAO",
  },
  {
    role: "assistant",
    message: "Can I help you today?",
  },
];

type ChatViewProps = Readonly<{
  className?: string;
}>;

export default function ChatView({ className }: ChatViewProps) {
  return (
    <div
      className={cn`
        overflow-y-auto flex-1 pb-2 md:pl-2 pr-3 
        max-h-[32.5rem] md:max-h-[45.5rem]
        ${className}
      `}
      role="contentinfo"
    >
      {convos.map((convo, index) => {
        return convoMap[convo.role](index, convo.message);
      })}
    </div>
  );
}
