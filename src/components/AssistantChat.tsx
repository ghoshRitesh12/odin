import { cn } from "@/lib/utils";

type AssistantChatProps = Readonly<{
  message: string;
}>;

export default function AssistantChat({ message }: AssistantChatProps) {
  return (
    <div
      className={cn`
        w-fit px-4 py-2 rounded-2xl mr-auto leading-[1.4]
        max-w-[30ch] sm:max-w-[40ch] bg-secondary
        text-zinc-700 dark:text-zinc-200 my-2
      `}
    >
      <div>{message}</div>
    </div>
  );
}
