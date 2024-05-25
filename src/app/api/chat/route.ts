import { createRAGChain } from "@/lib/langchain";
import { StreamingTextResponse, type Message as VercelChatMessage } from "ai";
import { AIMessage, ChatMessage, HumanMessage } from "@langchain/core/messages";

export const revalidate = true;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: VercelChatMessage[] = body?.messages || [];
    if (!messages.length) {
      return Response.json("Error: no messages provided", {
        status: 400,
      });
    }

    const userId = body.userId;
    if (!userId) {
      return Response.json("Error: no userId provided", {
        status: 400,
      });
    }

    const formattedPreviousMessages = messages
      .slice(0, -1)
      .map(formatVercelMessages);
    const currentMessage = messages?.at(-1);

    if (!currentMessage?.content) {
      return Response.json("Error: no message content provided", {
        status: 400,
      });
    }

    const ragChain = await createRAGChain(userId);

    const stream = await ragChain.stream({
      chat_history: formattedPreviousMessages,
      input: currentMessage.content,
    });

    const byteStream = stream.pipeThrough(new TextEncoderStream());

    return new StreamingTextResponse(byteStream, {
      headers: {
        "x-recent-prompt-id": currentMessage.id,
        "x-recent-prompt-role": currentMessage.role,
        "x-recent-prompt-content": currentMessage.content,
        "x-recent-prompt-created-at":
          currentMessage.createdAt?.toString() || new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      { status: 500, message: "Failed to respond to prompt" },
      { status: 500 }
    );
  }
}

function formatVercelMessages(message: VercelChatMessage) {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    console.warn(
      `Unknown message type passed: "${message.role}". Falling back to generic message type.`
    );
    return new ChatMessage({ content: message.content, role: message.role });
  }
}
