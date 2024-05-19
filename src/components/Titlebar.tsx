import { cn } from "@/lib/utils";

import Link from "next/link";
import AppLogo from "./AppLogo";
import { Button } from "./ui/button";
import { ThemeToggler } from "./ui/theme-toggler";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Titlebar() {
  const titlebarItemColor = "text-zinc-700 dark:text-zinc-200";
  const githubRepo = "https://github.com/ghoshRitesh12/odin";

  return (
    <header className="py-3 lg:px-0 border-b-[1px]">
      <div
        className={cn`
          flex items-center justify-between 
          mx-auto w-full max-w-[92%] 
          md:max-w-[95%] xl:max-w-[85%] 2xl:max-w-[70%]
        `}
      >
        <AppLogo iconColorStyle={titlebarItemColor} />

        <div className="flex items-center gap-3">
          <ThemeToggler iconColorStyle={titlebarItemColor} />

          <Button
            asChild
            variant="outline"
            className="w-10"
            size="icon"
            title="GitHub"
          >
            <Link
              target="_blank"
              href={githubRepo}
              className={titlebarItemColor}
            >
              <GitHubLogoIcon
                width={22}
                height={22}
                color="currentColor"
              />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
