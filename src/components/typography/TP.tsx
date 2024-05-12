import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type TypographyPProps = PropsWithChildren<{
  className?: string;
}>;

export function TypographyP({ children, className }: TypographyPProps) {
  // [&:not(:first-child)]:mt-6
  return (
    <p
      className={cn`
        leading-7 ${className}
      `}
    >
      {children}
    </p>
  );
}
