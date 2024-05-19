import { cn } from "@/lib/utils";
// import CategorySelector from "./CategorySelector";
import ContextDeck from "./ContextDeck";
import ContextInput from "./ContextInput";

type ContextViewProps = Readonly<{
  renderContext: "sheet" | "normal";
}>;

export default function ContextView({ renderContext }: ContextViewProps) {
  return (
    <section
      className={cn`
        flex flex-col justify-between
        ${renderContext === "sheet" ? "h-[104%] pb-7" : ""}
      `}
    >
      <div className="flex flex-col space-y-2 text-center sm:text-left">
        <h2
          id="radix-:R5uacqH1:"
          className="text-lg font-semibold text-foreground"
        >
          Context View
        </h2>
        <p className="text-sm text-muted-foreground">
          You can view existing contexts and add new ones.
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div>Existing contexts</div>
      </div>

      <ContextDeck sheetContext={renderContext === "sheet"} />

      {/* <CategorySelector /> */}
      <ContextInput />
    </section>
  );
}
