import { TypographyP } from "@/components/typography/TP";
import { TypographyH1 } from "@/components/typography/TH1";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <TypographyH1>Unleash the Power of AI Chatbots</TypographyH1>
      <TypographyP className="text-balance">Odin is a good project</TypographyP>

      <Button
        asChild
        variant={"secondary"}
        className="mt-14 mx-auto block w-fit"
      >
        <Link href="/chat">Goto chat page</Link>
      </Button>
    </div>
  );
}
