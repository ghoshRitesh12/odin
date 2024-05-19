"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Odin, type ContextTable } from "@/lib/OdinDB";

import ContextCard from "./ContextCard";

type ContextDeckProps = Readonly<{
  sheetContext: boolean;
}>;

export default function ContextDeck({ sheetContext }: ContextDeckProps) {
  const [contexts, setContexts] = useState<ContextTable[]>([]);

  useEffect(() => {
    Odin.context.toArray().then((contexts) => setContexts(contexts.reverse()));
  });

  return (
    <ul
      className={cn`
        my-2 -mr-3 pr-4 flex-1 border-[0px] overflow-y-auto
        ${!sheetContext ? "max-h-[30rem]" : ""}
      `}
    >
      {contexts.map((context) => (
        <ContextCard
          key={context.id}
          id={context.id}
          name={`https://youtube.com/watch?v=${context.videoId}`}
        />
      ))}
    </ul>
  );
}
