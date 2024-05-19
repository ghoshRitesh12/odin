import { YoutubeTranscript } from "youtube-transcript";

export async function generateTranscript(videoId: string) {
  const transcriptResponse = await YoutubeTranscript.fetchTranscript(
    `https://www.youtube.com/watch?v=${videoId}`
  );

  if (!transcriptResponse) {
    throw new Error(`Cannot get transcript for video id ${videoId}.`);
  }

  let transcript: any[] = [];
  for (const line of transcriptResponse) {
    transcript.push(line.text);
  }
  return transcript;
}
