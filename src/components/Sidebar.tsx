"use client";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { SidebarLeftExpandIcon } from "./icon/SidebarLeftExpandIcon";

import ContextView from "./ContextView";

type SidebarProps = Readonly<{
  className?: string;
}>;

export default function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={className}>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="w-10 h-9"
            >
              <SidebarLeftExpandIcon className="text-2xl" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            {/* context view component */}
            <ContextView renderContext="sheet" />

            {/* <SheetFooter>
            <SheetClose>BRUH</SheetClose>
          </SheetFooter> */}
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex h-full">
        <ContextView renderContext="normal" />
      </div>
    </aside>
  );
}
