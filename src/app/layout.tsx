import "../styles/globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Source_Sans_3 as SourceSans } from "next/font/google";

import Titlebar from "@/components/Titlebar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

const sourceSans = SourceSans({
  preload: true,
  subsets: ["latin"],
  weight: ["400", "600"],
  fallback: ["sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Odin",
  description:
    "An AI chatbot named after the God of Wisdom who sacrificed an eye to gain immense knowledge",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={cn`__odin__ ${sourceSans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Titlebar />

          <main
            className={cn`
              pt-4 sm:pt-8 pb-8 mx-auto w-full max-w-[92%] 
              md:max-w-[95%] xl:max-w-[85%] 2xl:max-w-[70%]
            `}
          >
            {children}
          </main>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
