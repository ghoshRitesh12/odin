import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/typography/TP";

export default function NotFound() {
  const defaultError = 404;
  const defaultErrorMessage = "This page couldn't be found.";

  return (
    <div
      className={cn`
        mt-52 sm:mt-60 md:mt-72 text-center
        text-zinc-600 dark:text-zinc-200
      `}
    >
      <TypographyP className="text-xl text-center">Oops !</TypographyP>

      <div
        className={cn`
          flex items-center justify-center gap-4 mt-3 mb-6
        `}
      >
        <TypographyP className="text-2xl">{defaultError}</TypographyP>

        <TypographyP
          className={cn`
            text-xl border-l-[1px] border-zinc-600 pl-4
          `}
        >
          {defaultErrorMessage}
        </TypographyP>
      </div>

      <Button
        asChild
        size={"lg"}
        variant={"secondary"}
      >
        <Link
          href="/"
          replace={true}
        >
          <ArrowLeftIcon className="mr-2" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
