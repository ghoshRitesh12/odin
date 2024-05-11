import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export function TypographyH1({ children }: PropsWithChildren) {
  return (
    <h2
      className={cn`
        scroll-m-20 text-4xl font-extrabold 
        tracking-tight lg:text-5xl
      `}
    >
      {children}
    </h2>
  );
}
