import { cn } from "@/lib/utils";

type UserChatProps = Readonly<{
  message: string;
}>;

export default function UserChat({ message }: UserChatProps) {
  return (
    <div
      className={cn`
        w-fit bg-primary text-zinc-200 px-3 py-2
        rounded-2xl ml-auto leading-[1.4] my-2
        max-w-[30ch] sm:max-w-[40ch]
      `}
    >
      <div>{message}</div>
    </div>
  );
}
