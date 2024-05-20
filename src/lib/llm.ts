import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";

export const model = new ChatCloudflareWorkersAI({
  model: "@cf/meta/llama-2-7b-chat-int8",
  cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
  streaming: true,
});
