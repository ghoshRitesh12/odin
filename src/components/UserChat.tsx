import { cn } from "@/lib/utils";

type UserChatProps = Readonly<{
  message: string;
}>;

export default function UserChat({ message }: UserChatProps) {
  return (
    <div
      className={cn`
        w-fit bg-primary text-zinc-200 px-3 py-2
        rounded-2xl ml-auto leading-6 my-4
        max-w-[34ch] sm:max-w-[60ch] md:max-w-[70ch] 
      `}
    >
      <div>{message}</div>
    </div>
  );
}
