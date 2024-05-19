import ChatFrame from "@/components/ChatFrame";
import PromptInput from "@/components/PromptInput";

export default function ChatPage() {
  // <div className="flex flex-col flex-1 mx-2 mb-2 h-full">
  return (
    <>
      <ChatFrame className="mb-4 border-[0px] border-red-300" />

      <div className="min-h-0">
        <PromptInput />
      </div>
    </>
  );
}
