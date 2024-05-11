import "../styles/globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Source_Sans_3 as SourceSans } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

const sourceSans = SourceSans({
  preload: true,
  subsets: ["latin"],
  weight: ["400", "600"],
  fallback: ["sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Odin Chatbot",
  description:
    "An AI chatbot named after the God of Wisdom who sacrificed an eye to gain immense knowledge",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn`__odin__ ${sourceSans.className}`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
