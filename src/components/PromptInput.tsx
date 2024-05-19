import { cn } from "@/lib/utils";
import { SendIcon } from "./icon/SendIcon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PromptInput() {
  return (
    <form
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

      <Textarea
        id="message"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />

      <div className="flex items-center p-3 flex-shrink-0">
        <Button
          type="submit"
          size="default"
          className="gap-1.5 text-[0.85rem]"
          title="Send Message"
        >
          {/* Send Message */}
          <SendIcon className="text-lg" />
        </Button>
      </div>
    </form>
  );
}
