import { cn } from "@/lib/utils";
import AssistantChat from "./AssistantChat";
import UserChat from "./UserChat";
import type { Key } from "react";

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
      {/* <div className="flex flex-col pr-3 overflow-y-auto"> */}
      {convos.map((convo, index) => {
        return convoMap[convo.role](index, convo.message);
      })}
      {/* </div> */}
    </div>
  );
}
