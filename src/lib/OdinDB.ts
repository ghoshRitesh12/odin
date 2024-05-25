import Dexie, { type Table } from "dexie";
import axios from "axios";
import type { Message as MessageTable } from "ai";
import type { ToastFn } from "@/components/ui/useToast";

type UserTable = {
  id: string;
  userKey: string;
};

export type ContextTable = {
  id: number;
  videoId: string;
  createdAt: number;
};

class OdinDB extends Dexie {
  private static dbname = "__odin__";
  private static odin: OdinDB | null = null;

  private odinUserId = "odin_user";

  public user!: Table<UserTable, string>;
  public context!: Table<ContextTable, string>;
  public messages!: Table<MessageTable, string>;

  private constructor() {
    super(OdinDB.dbname);

    this.version(1).stores({
      user: "id",
      context: "id",
      messages: "id",
    });
  }

  public static getInstance() {
    if (OdinDB.odin === null) {
      OdinDB.odin = new OdinDB();
    }
    return OdinDB.odin;
  }

  public async initUser(userKey: string) {
    const userExists = await this.user.get(this.odinUserId);
    if (userExists) {
      return userExists.userKey;
    }

    return this.user
      .add({ id: this.odinUserId, userKey }, this.odinUserId)
      .then(() => userKey);
  }

  public async addMessage(message: MessageTable | undefined) {
    const defaultMsgKey = "0";

    if (
      !message ||
      (message?.id === defaultMsgKey && (await this.messages.get(message.id)))
    ) {
      return false;
    }

    const { id, ...otherInfo } = message;
    return this.messages.add({ id, ...otherInfo }, message.id).then(() => true);
  }

  public async getMessages() {
    return this.messages.toArray();
  }

  public async addYtContext(videoId: string | undefined, toast: ToastFn) {
    try {
      if (!videoId) {
        throw new Error("Invalid youtube video");
      }

      const [userId, videoExists] = await Promise.all([
        this.getUserKey(),
        this.context.get(videoId),
      ]);

      if (videoExists) {
        throw new Error("Video context already exists, try another video");
      }

      toast({
        title: "Adding new video context...",
        description: "Hang tight while we get things ready.",
      });

      await axios
        .post(
          `/api/video/new`,
          { videoId, userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .catch(() => {
          throw new Error("Failed to fetch video transcript, try again later");
        })
        .then(() => {
          toast({
            title: "New video context added",
          });
        });

      return this.context.add({
        id: Date.now(),
        videoId,
        createdAt: Date.now(),
      });
    } catch (err) {
      throw err;
    }
  }

  public async getUserKey() {
    try {
      const user = await this.user.get(this.odinUserId);
      if (!user) {
        throw new Error("Corrupted user identification");
      }
      return user.userKey;
    } catch (err) {
      throw err;
    }
  }
}

export const Odin = OdinDB.getInstance();
