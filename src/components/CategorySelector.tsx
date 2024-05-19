"use client";

import { GlobeIcon } from "./icon/GlobeIcon";
import { FilePdfIcon } from "./icon/FilePdfIcon";
import { YoutubeIcon } from "./icon/YoutubeIcon";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TypographyMuted } from "./typography/TMuted";

const categories = [
  {
    name: "YouTube Video",
    slug: "yt_video",
    iconComponent: YoutubeIcon,
  },
  {
    name: "Web Page",
    slug: "web_page",
    iconComponent: GlobeIcon,
  },
  {
    name: "PDF",
    slug: "pdf",
    iconComponent: FilePdfIcon,
  },
];

export default function CategorySelector() {
  return (
    <div className="relative flex-col items-start gap-8 md:flex mt-auto">
      <form className="grid w-full items-start gap-6 mt-4">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Context category
          </legend>

          <TypographyMuted>
            Select a context category and enter contex details to teach the AI
            and ask questions.
          </TypographyMuted>

          <div className="grid gap-3">
            <Select
              onValueChange={(val) => {
                console.log("VAL->>", val);
              }}
            >
              <SelectTrigger
                id="category"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a context category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    value={category.slug}
                    key={category.slug}
                  >
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <category.iconComponent />

                      <div className="grid gap-0.5 dark:text-zinc-200 text-zinc-800">
                        {category.name}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
