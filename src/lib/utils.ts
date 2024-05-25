import type { Message } from "ai";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const initialMessages: Message[] = [
  {
    id: "0",
    role: "assistant",
    content:
      "Hi! I am Odin. I am happy to help with your questions about youtube videos.",
  },
];

export function scrollToEnd(containerRef: React.RefObject<HTMLElement>) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild;
    if (lastMessage) {
      lastMessage.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  }
}
