import { z } from "zod";
import { Odin } from "./OdinDB";
import type { ToastFn } from "@/components/ui/useToast";

const ytVideoRegex =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const youtubeUrlSchema = z.object({
  url: z
    .string({
      message: "Invalid YouTube video URL",
    })
    .url("Invalid YouTube video URL")
    .refine((url) => ytVideoRegex.test(url), {
      message: "Invalid YouTube video URL",
    }),
});

export type YoutubeUrlSchema = z.infer<typeof youtubeUrlSchema>;

export async function submitYtContext(
  values: YoutubeUrlSchema,
  toast: ToastFn
) {
  const videoId =
    new URLSearchParams(new URL(values.url).search).get("v") || undefined;

  try {
    await Odin.addYtContext(videoId);

    toast({
      title: "Success",
      description: "Added new youtube video context",
    });
  } catch (err: any) {
    console.table(err);

    if (err?.name === "PrematureCommitError") {
      err.message = undefined;
    }

    toast({
      title: "Error adding context",
      description: err?.message || "Failed to add youtube video context",
    });
  }
}

// https://www.youtube.com/watch?v=HCOQmKTFzYY
