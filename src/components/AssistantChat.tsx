import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type AssistantChatProps = PropsWithChildren<{}>;

export default function AssistantChat({ children }: AssistantChatProps) {
  return (
    <div
      className={cn`
        w-fit px-4 py-2 rounded-2xl mr-auto leading-6
        max-w-[34ch] sm:max-w-[60ch] md:max-w-[70ch] 
        bg-secondary text-zinc-700 dark:text-zinc-200 my-4
      `}
    >
      {children}
    </div>
  );
}
