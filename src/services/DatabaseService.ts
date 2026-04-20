import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "baiboly_quiz.db";

export interface UserDBState {
  id: number;
  username: string | null;
  churchName: string | null;
  city: string | null;
  gems: number;
  hearts: number;
  medals: string; // Stored as comma-separated string
  avatar: string;
  language: string;
  points: number;
  lastHeartRefill: number;
}

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async init() {
    if (this.db) return;
    this.db = await SQLite.openDatabaseAsync(DATABASE_NAME);

    // Create tables if they don't exist
    await this.db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS user_state (
        id INTEGER PRIMARY KEY NOT NULL,
        username TEXT,
        churchName TEXT,
        city TEXT,
        gems INTEGER DEFAULT 100,
        hearts INTEGER DEFAULT 5,
        medals TEXT DEFAULT 'bronze',
        avatar TEXT DEFAULT 'default',
        language TEXT DEFAULT 'mg',
        theme TEXT DEFAULT 'light',
        points INTEGER DEFAULT 0,
        lastHeartRefill INTEGER
      );

      CREATE TABLE IF NOT EXISTS friends (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        avatar TEXT,
        church TEXT,
        city TEXT
      );
    `);

    // Ensure we have at least one row
    const result = await this.db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM user_state",
    );
    if (result && result.count === 0) {
      await this.db.runAsync(
        'INSERT INTO user_state (id, gems, hearts, medals, avatar, language, theme, points, lastHeartRefill) VALUES (1, 100, 5, "bronze", "default", "mg", "light", 0, ?)',
        [Date.now()],
      );
    }
  }

  async getUserState(): Promise<UserDBState | null> {
    if (!this.db) await this.init();
    return await this.db!.getFirstAsync<UserDBState>(
      "SELECT * FROM user_state WHERE id = 1",
    );
  }

  async saveUserState(state: Partial<UserDBState>) {
    if (!this.db) await this.init();
    const keys = Object.keys(state);
    if (keys.length === 0) return;

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const values = Object.values(state);

    await this.db!.runAsync(`UPDATE user_state SET ${setClause} WHERE id = 1`, [
      ...values,
    ]);
  }

  async resetDatabase() {
    if (!this.db) await this.init();
    await this.db!.execAsync("DROP TABLE IF EXISTS user_state");
    await this.db!.execAsync("DROP TABLE IF EXISTS friends");
    this.db = null;
    await this.init();
  }

  // Friend Management
  async getFriends(): Promise<any[]> {
    if (!this.db) await this.init();
    return await this.db!.getAllAsync<any>("SELECT * FROM friends");
  }

  async addFriend(friend: any) {
    if (!this.db) await this.init();
    const { id, name, avatar, church, city } = friend;
    await this.db!.runAsync(
      "INSERT OR REPLACE INTO friends (id, name, avatar, church, city) VALUES (?, ?, ?, ?, ?)",
      [id, name, avatar || null, church || null, city || null],
    );
  }

  async removeFriend(id: string) {
    if (!this.db) await this.init();
    await this.db!.runAsync("DELETE FROM friends WHERE id = ?", [id]);
  }
}

export const databaseService = new DatabaseService();
