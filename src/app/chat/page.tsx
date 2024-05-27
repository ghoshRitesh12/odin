"use client";

import ReactMarkdown from "react-markdown";
import UserChat from "@/components/UserChat";
import AssistantChat from "@/components/AssistantChat";
import { Spinner } from "@/components/icon/Spinner";
import { SendIcon } from "@/components/icon/SendIcon";
import { Button } from "@/components/ui/button";
import { cn, initialMessages, scrollToEnd } from "@/lib/utils";
import type { Message } from "ai";
import { ulid } from "ulid";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Odin } from "@/lib/OdinDB";
import { useToast } from "@/components/ui/useToast";

export default function ChatPage() {
  const { toast } = useToast();
  const [userKey, setUserKey] = useState<string | null>(null);

  const {
    input,
    messages,
    isLoading,
    setMessages,
    handleSubmit,
    handleInputChange,
  } = useChat({
    initialMessages,
    api: "/api/chat",
    body: {
      userId: userKey,
    },
    generateId: () => ulid(Date.now()),

    streamMode: "text",
    sendExtraMessageFields: true,

    async onResponse(response) {
      console.log("ON RESPONSE: ", messages);

      let recentMsg: Message = {
        id: response.headers.get("x-recent-prompt-id") || "",
        content: response.headers.get("x-recent-prompt-content") || "",
        role: response.headers.get("x-recent-prompt-role") as Message["role"],
        createdAt:
          new Date(response.headers.get("x-recent-prompt-created-at") || "") ||
          undefined,
      };

      console.log(recentMsg);

      if (
        recentMsg?.content &&
        recentMsg?.role &&
        recentMsg?.content &&
        recentMsg?.createdAt
      ) {
        await Odin.addMessage(recentMsg).catch((err) => {
          console.log("ON RESPONSE err: ", err);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to persist chat history",
          });
        });
      }
    },
    onError(err) {
      console.error("Error responding to prompt", err);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to respond to prompt",
      });
    },
    async onFinish(message) {
      try {
        console.log("FINISH: ", message);
        await Odin.addMessage(message);
      } catch (err) {
        console.log("FINISH err: ", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to persist chat history",
        });
      }
    },
  });

  useEffect(() => {
    setUserKey(localStorage.getItem("odin_user"));

    Odin.addMessage(initialMessages[0]).then(async (isAdded) => {
      if (!isAdded) {
        await Odin.getMessages().then(setMessages);
      }
    });
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setTimeout(() => scrollToEnd(containerRef), 100);
  }, [messages]);

  return (
    <>
      <div
        className={cn`
          overflow-y-auto flex-1 pb-2 md:pl-2 pr-3 
          max-h-[43rem] min-h-[32.5rem] md:max-h-[45.5rem]
          mb-4 border-[0px] border-red-300
        `}
        role="contentinfo"
        ref={containerRef}
      >
        {messages.map((msg) => {
          return msg.role === "assistant" ? (
            <AssistantChat key={msg.id}>
              <ReactMarkdown className="prose">{msg.content}</ReactMarkdown>
            </AssistantChat>
          ) : (
            <UserChat
              key={msg.id}
              message={msg.content}
            />
          );
        })}
      </div>

      <div>
        <form
          onSubmit={handleSubmit}
          className={cn`
            flex overflow-hidden rounded-lg border 
            bg-background focus-within:ring-1 focus-within:ring-ring 
          `}
        >
          <label
            htmlFor="message"
            className="sr-only"
          >
            Message
          </label>

          <Input
            id="message"
            value={input}
            disabled={isLoading}
            onChange={handleInputChange}
            placeholder={"Type your message here..."}
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />

          <div className="flex items-center p-3 flex-shrink-0">
            <Button
              type="submit"
              size="default"
              disabled={isLoading}
              className="gap-1.5 text-[0.85rem]"
            >
              {isLoading ? (
                <Spinner className="text-lg" />
              ) : (
                <SendIcon className="text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
