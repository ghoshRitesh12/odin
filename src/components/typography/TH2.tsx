import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export function TypographyH2({ children }: PropsWithChildren) {
  return (
    <h2
      className={cn`
        scroll-m-20 text-3xl font-semibold 
        tracking-tight first:mt-0
      `}
    >
      {children}
    </h2>
  );
}
