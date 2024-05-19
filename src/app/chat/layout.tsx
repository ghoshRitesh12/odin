import { cn } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";

type ChatLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div
      // flex-1
      className={cn`
        flex flex-col md:flex-row justify-center flex-1
        gap-4 lg:gap-6 gap-y-2
      `}
    >
      <Sidebar
        className={cn`
          flex md:flex-col sm:gap-4 md:flex-[30%]
          md:pr-4 md:mr-2 overflow-auto
        `}
      />

      <section
        role="presentation"
        className={cn`
          flex-grow-1 flex flex-col overflow-auto
          md:flex-[55%] lg:flex-[65%] xl:flex-[78%]
          max-w-full w-full rounded-xl mt-2
        `}
      >
        {children}
      </section>
    </div>
  );
}
