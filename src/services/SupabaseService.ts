import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Keys provided by the user (Falling back to environment variables correctly prefixed for Expo)
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export interface MatchmakingPlayer {
  session_id: string;
  name: string;
  avatar: string;
  church: string | null;
  city: string | null;
  profile_id: string | null;
  joined_at?: string;
}

class SupabaseService {
  /**
   * Insert the current user into the remote matchmaking_pool table.
   * Supabase expects the table to be created with equivalent columns.
   */
  async joinMatchmakingPool(sessionId: string, user: {
    name: string;
    avatar: string;
    church: string | null;
    city: string | null;
    profile_id: string | null;
  }) {
    const { error } = await supabase.from("matchmaking_pool").insert([
      {
        session_id: sessionId,
        name: user.name,
        avatar: user.avatar,
        church: user.church,
        city: user.city,
        profile_id: user.profile_id,
        matched_with: null,
      },
    ]);

    if (error) {
      console.error("Supabase Join Pool Error:", error);
      throw error;
    }
  }

  /**
   * Automatically deletes the session from the remote pool.
   */
  async leaveMatchmakingPool(sessionId: string) {
    const { error } = await supabase
      .from("matchmaking_pool")
      .delete()
      .eq("session_id", sessionId);

    if (error) {
      console.error("Supabase Leave Pool Error:", error);
    }
  }

  /**
   * Fetch all players currently in the pool who aren't matched.
   */
  async findAllActivePlayers(mySessionId: string): Promise<MatchmakingPlayer[]> {
    const { data, error } = await supabase
      .from("matchmaking_pool")
      .select("*")
      .neq("session_id", mySessionId)
      .is("matched_with", null)
      .order("joined_at", { ascending: true });

    if (error) {
      console.error("Supabase Find All Players Error:", error);
      return [];
    }

    return (data as MatchmakingPlayer[]) || [];
  }

  /**
   * Send a manual invitation to another player.
   */
  async sendInvitation(targetSid: string, inviter: {
    profile_id: string;
    session_id: string;
    name: string;
    avatar: string;
    church: string | null;
    city: string | null;
  }) {
    const payload = {
      type: "invitation",
      sender: inviter,
    };

    const { error } = await supabase
      .from("matchmaking_pool")
      .update({ matched_with: JSON.stringify(payload) })
      .eq("session_id", targetSid);

    if (error) {
      console.error("Supabase Send Invitation Error:", error);
      throw error;
    }
  }

  /**
   * Accept an invitation.
   */
  async acceptInvitation(senderSid: string, acceptor: {
    profile_id: string;
    session_id: string;
    name: string;
    avatar: string;
    church: string | null;
    city: string | null;
  }) {
    const payload = {
      type: "accepted",
      sender: acceptor,
    };

    const { error } = await supabase
      .from("matchmaking_pool")
      .update({ matched_with: JSON.stringify(payload) })
      .eq("session_id", senderSid);

    if (error) {
      console.error("Supabase Accept Invitation Error:", error);
      throw error;
    }
  }

  /**
   * Decline an invitation (reset recipient's status).
   */
  async declineInvitation(mySid: string) {
    const { error } = await supabase
      .from("matchmaking_pool")
      .update({ matched_with: null })
      .eq("session_id", mySid);

    if (error) {
      console.error("Supabase Decline Invitation Error:", error);
      throw error;
    }
  }

  /**
   * Subscribe to changes on my own matchmaking record.
   * Receives a parsed claimant object when someone claims us.
   */
  subscribeToMyMatch(mySid: string, onMatch: (claimant: any) => void) {
    const channel = supabase
      .channel(`handshake_${mySid}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "matchmaking_pool",
          filter: `session_id=eq.${mySid}`,
        },
        (payload) => {
          const raw = payload.new?.matched_with;
          if (raw) {
            try {
              onMatch(JSON.parse(raw));
            } catch {
              onMatch(null); // fallback
            }
          }
        }
      )
      .subscribe();

    return channel;
  }

  /**
   * One-time check if I've been matched (fallback for polling).
   * Returns the parsed claimant object or null.
   */
  async checkMyMatchStatus(mySid: string): Promise<any | null> {
    const { data, error } = await supabase
      .from("matchmaking_pool")
      .select("matched_with")
      .eq("session_id", mySid)
      .single();

    if (error || !data || !data.matched_with) return null;
    try {
      return JSON.parse(data.matched_with);
    } catch {
      return null;
    }
  }

  /**
   * Fetch a player's data from the pool by their session ID.
   */
  async getMatchmakingPlayer(sessionId: string): Promise<MatchmakingPlayer | null> {
    const { data, error } = await supabase
      .from("matchmaking_pool")
      .select("*")
      .eq("session_id", sessionId)
      .single();

    if (error) return null;
    return data as MatchmakingPlayer;
  }

  // ── Profile Synchronization ─────────────────────────────

  /**
   * Sync the user's public info to Supabase.
   */
  async upsertProfile(profileId: string, data: {
    name: string;
    avatar: string;
    church: string | null;
    city: string | null;
    points: number;
  }) {
    const { error } = await supabase.from("public_profiles").upsert({
      id: profileId,
      name: data.name,
      avatar: data.avatar,
      church: data.church,
      city: data.city,
      points: data.points,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase Upsert Profile Error:", error);
      throw error;
    }
  }

  /**
   * Fetch a user's permanent profile.
   */
  async getProfile(profileId: string): Promise<any | null> {
    const { data, error } = await supabase
      .from("public_profiles")
      .select("*")
      .eq("id", profileId)
      .single();

    if (error) return null;
    return data;
  }

  // ── Game Synchronization (Broadcast) ─────────────────────────────

  /**
   * Join a private real-time channel for a specific match.
   */
  joinGameChannel(channelName: string, onMessage: (payload: any) => void) {
    const channel = supabase.channel(channelName, {
      config: {
        broadcast: { self: false },
      },
    });

    channel
      .on("broadcast", { event: "game_action" }, ({ payload }) => {
        onMessage(payload);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log(`Subscribed to channel: ${channelName}`);
        }
      });

    return channel;
  }

  /**
   * Send a message to the other player in the channel.
   */
  async broadcastGameAction(channel: any, action: string, data: any) {
    await channel.send({
      type: "broadcast",
      event: "game_action",
      payload: { action, data },
    });
  }

  // ── Global User Discovery & Validation ───────────────────

  /**
   * Check if a username is already taken by another profile.
   */
  async isUsernameTaken(name: string, excludeProfileId?: string): Promise<boolean> {
    const query = supabase
      .from("public_profiles")
      .select("id")
      .ilike("name", name.trim()); // Case-insensitive check

    if (excludeProfileId) {
      query.neq("id", excludeProfileId);
    }

    const { data, error } = await query.maybeSingle();
    return !!data;
  }

  /**
   * Search for public profiles by name.
   */
  async searchProfilesByName(searchQuery: string): Promise<any[]> {
    if (!searchQuery || searchQuery.length < 2) return [];

    const { data, error } = await supabase
      .from("public_profiles")
      .select("*")
      .ilike("name", `%${searchQuery}%`)
      .limit(20);

    if (error) {
      console.error("Supabase Search Profiles Error:", error);
      return [];
    }

    return data || [];
  }
}

export const supabaseService = new SupabaseService();
