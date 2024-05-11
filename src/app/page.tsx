import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <br />
      <Button>Click me</Button>
      <br /> <br />
      <Button variant={"destructive"}>Click me2</Button>
      <br /> <br />
      <Button variant={"secondary"}>Click me3</Button>
    </div>
  );
}
