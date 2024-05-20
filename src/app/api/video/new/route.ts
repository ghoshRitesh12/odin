import { upsertTranscriptChunks } from "@/lib/pinecone";
import { generateTranscript } from "@/lib/transcript";
import { getSummarizedChunks } from "@/lib/summarize";

export async function POST(req: Request) {
  const { videoId, userId } = await req.json().catch(() => {
    return Response.json(
      {
        status: 400,
        message: "Error parsing payload",
      },
      { status: 400 }
    );
  });

  if (!videoId || !userId) {
    return Response.json(
      {
        status: 400,
        message: "Invalid payload",
      },
      { status: 400 }
    );
  }

  let transcript: string[] = [];
  try {
    transcript = await generateTranscript(String(videoId));
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        status: 400,
        message: "Seems like transcript is disabled on this video",
      },
      { status: 400 }
    );
  }

  try {
    const summaryChunks = await getSummarizedChunks(transcript.join(" \n "));
    console.log(`Got ${summaryChunks.length} summary chunks`);

    console.log(
      `Generating embeddings & upserting ${summaryChunks.length} embedded chunks into pinecone index...`
    );
    await upsertTranscriptChunks(summaryChunks, videoId, userId);
    console.log(`Upserted embedded chunks into pinecone index`);

    return Response.json(
      {},
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { status: 500, message: "Failed to add a new video" },
      { status: 500 }
    );
  }
}
