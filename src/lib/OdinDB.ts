import Dexie, { type Table } from "dexie";
import axios from "axios";

type UserTable = {
  id: string;
  userKey: string;
};

export type ConversationTable = {
  id: string;
  createdAt: Date;
  userMessage: string;
  assistantMessage: string;
};

export type ContextTable = {
  id: string;
  videoId: string;
  createdAt: number;
};

class OdinDB extends Dexie {
  private static dbname = "__odin__";
  private static odin: OdinDB | null = null;

  private odinUserId = "odin_user";

  public user!: Table<UserTable, string>;
  public context!: Table<ContextTable, string>;

  private constructor() {
    super(OdinDB.dbname);

    this.version(1).stores({
      user: "id",
      context: "id",
      conversation: "id, createdAt",
    });
  }

  public static getInstance() {
    if (OdinDB.odin === null) {
      OdinDB.odin = new OdinDB();
    }
    return OdinDB.odin;
  }

  public async initUser(userKey: string) {
    if (await this.user.get(this.odinUserId)) return;
    return this.user.add({ id: this.odinUserId, userKey }, this.odinUserId);
  }

  public async addConversation(userKey: string) {
    const odinUserId = "odin_user";

    if (await this.user.get(odinUserId)) return;
    return this.user.add({ id: odinUserId, userKey }, odinUserId);
  }

  public async addYtContext(videoId: string | undefined) {
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
        });

      return this.context.add({
        id: videoId,
        videoId,
        createdAt: Date.now(),
      });
    } catch (err) {
      throw err;
    }
  }

  private async getUserKey() {
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
