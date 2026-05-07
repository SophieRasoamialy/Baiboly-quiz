import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { logger } from "../utils/logger";

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
  points: number;
  joined_at?: string;
}

export interface MatchInvitationSender {
  profile_id: string;
  session_id: string;
  name: string;
  avatar: string;
  church: string | null;
  city: string | null;
  points: number;
}

export interface MatchInvitationPayload {
  id: string;
  sender: MatchInvitationSender;
  recipient_profile_id: string;
  recipient_session_id?: string | null;
  game_type: string;
  quiz_type: string;
  status: "pending" | "accepted" | "declined";
  created_at?: string;
  responded_at?: string | null;
}

export interface PublicProfile {
  id: string;
  name: string;
  avatar: string | null;
  church: string | null;
  city: string | null;
  points: number;
  updated_at?: string;
}

export interface AuthProfileInput {
  name: string;
  avatar: string;
  church: string | null;
  city: string | null;
  points: number;
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
    game_type: string;
    quiz_type: string;
  }) {
    const { error } = await supabase.from("matchmaking_pool").insert([
      {
        session_id: sessionId,
        name: user.name,
        avatar: user.avatar,
        church: user.church,
        city: user.city,
        profile_id: user.profile_id,
        game_type: user.game_type,
        quiz_type: user.quiz_type,
      },
    ]);

    if (error) {
      logger.error("SupabaseService", "Join pool failed", error);
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
      logger.error("SupabaseService", "Leave pool failed", error);
    }
  }

  /**
   * Fetch all players currently in the pool who aren't matched.
   */
  async findAllActivePlayers(mySessionId: string, gameType: string, quizType: string): Promise<MatchmakingPlayer[]> {
    const { data, error } = await supabase
      .from("matchmaking_pool")
      .select("*")
      .neq("session_id", mySessionId)
      .eq("game_type", gameType)
      .eq("quiz_type", quizType)
      .order("joined_at", { ascending: false });

    if (error) {
      logger.error("SupabaseService", "Find active players failed", error);
      return [];
    }

    return (data as MatchmakingPlayer[]) || [];
  }

  /**
   * Send a manual invitation to another player.
   */
  async sendInvitation(invitation: {
    sender: MatchInvitationSender;
    recipient_profile_id: string;
    game_type: string;
    quiz_type: string;
  }) {
    const { data, error } = await supabase
      .from("match_invitations")
      .insert({
        sender_profile_id: invitation.sender.profile_id,
        sender_session_id: invitation.sender.session_id,
        sender_name: invitation.sender.name,
        sender_avatar: invitation.sender.avatar,
        sender_church: invitation.sender.church,
        sender_city: invitation.sender.city,
        sender_points: invitation.sender.points,
        recipient_profile_id: invitation.recipient_profile_id,
        game_type: invitation.game_type,
        quiz_type: invitation.quiz_type,
        status: "pending",
      })
      .select("*")
      .single();

    if (error) {
      logger.error("SupabaseService", "Send invitation failed", error);
      throw error;
    }

    return this.mapInvitationRecord(data);
  }

  /**
   * Accept an invitation.
   */
  async acceptInvitation(invitationId: string, recipientSessionId: string) {
    const { error } = await supabase
      .from("match_invitations")
      .update({
        status: "accepted",
        recipient_session_id: recipientSessionId,
        responded_at: new Date().toISOString(),
      })
      .eq("id", invitationId);

    if (error) {
      logger.error("SupabaseService", "Accept invitation failed", error);
      throw error;
    }
  }

  /**
   * Decline an invitation (reset recipient's status).
   */
  async declineInvitation(invitationId: string) {
    const { error } = await supabase
      .from("match_invitations")
      .update({
        status: "declined",
        responded_at: new Date().toISOString(),
      })
      .eq("id", invitationId);

    if (error) {
      logger.error("SupabaseService", "Decline invitation failed", error);
      throw error;
    }
  }

  /**
   * Subscribe to changes on my own matchmaking record.
   * Receives a parsed claimant object when someone claims us.
   */
  subscribeToIncomingInvitations(profileId: string, onInvitation: (invitation: MatchInvitationPayload) => void) {
    const channel = supabase
      .channel(`incoming_invites_${profileId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "match_invitations",
          filter: `recipient_profile_id=eq.${profileId}`,
        },
        (payload) => {
          const invitation = this.mapInvitationRecord(payload.new);
          if (invitation.status === "pending") {
            onInvitation(invitation);
          }
        }
      )
      .subscribe();

    return channel;
  }

  /**
   * Subscribe to updates for invitations I sent.
   */
  subscribeToSentInvitations(profileId: string, onInvitationUpdate: (invitation: MatchInvitationPayload) => void) {
    const channel = supabase
      .channel(`sent_invites_${profileId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "match_invitations",
          filter: `sender_profile_id=eq.${profileId}`,
        },
        (payload) => {
          onInvitationUpdate(this.mapInvitationRecord(payload.new));
        }
      )
      .subscribe();

    return channel;
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
  async upsertProfile(profileId: string, data: AuthProfileInput) {
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
      logger.error("SupabaseService", "Upsert profile failed", error);
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

  /**
   * Create a new auth user and initialize their public profile.
   */
  async signUpWithEmail(email: string, password: string, profile: AuthProfileInput) {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          name: profile.name,
          avatar: profile.avatar,
          church: profile.church,
          city: profile.city,
        },
      },
    });

    if (error) {
      throw error;
    }

    const user = data.user;

    if (!user) {
      throw new Error("Supabase sign up succeeded without a user.");
    }

    if (data.session) {
      await this.upsertProfile(user.id, profile);
    }

    return {
      user,
      needsEmailConfirmation: !data.session,
    };
  }

  /**
   * Sign in with Supabase Auth email/password.
   */
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  /**
   * Sign out the active Supabase session.
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  /**
   * Read the currently authenticated user from the persisted session.
   */
  async getCurrentSessionUser() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return session?.user ?? null;
  }

  /**
   * Fetch the global leaderboard ordered by points.
   */
  async getLeaderboard(limit = 50): Promise<PublicProfile[]> {
    const { data, error } = await supabase
      .from("public_profiles")
      .select("*")
      .order("points", { ascending: false })
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (error) {
      logger.error("SupabaseService", "Get leaderboard failed", error);
      return [];
    }

    return (data as PublicProfile[]) || [];
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
          logger.info("SupabaseService", `Subscribed to channel ${channelName}`);
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
   * Search for profiles in the matchmaking pool who are actively searching.
   */
  async searchActivePlayersByName(query: string) {
    const { data, error } = await supabase
      .from("matchmaking_pool")
      .select("*")
      .ilike("name", `%${query}%`)
      .limit(20);

    if (error) {
      logger.error("SupabaseService", "Search active players failed", error);
      return [];
    }
    return data;
  }

  /**
   * Search for public profiles by name.
   */
  async searchProfilesByName(query: string) {
    const { data, error } = await supabase
      .from("public_profiles")
      .select("*")
      .ilike("name", `%${query}%`)
      .limit(10);

    if (error) {
      logger.error("SupabaseService", "Search profiles failed", error);
      return [];
    }
    return data;
  }

  async getProfilesByIds(ids: string[]) {
    const { data, error } = await supabase
      .from("public_profiles")
      .select("*")
      .in("id", ids);

    if (error) {
      logger.error("SupabaseService", "Get profiles by ids failed", error);
      return [];
    }
    return data;
  }

  async cleanupMatchInvitations() {
    const { error } = await supabase.rpc("cleanup_match_invitations");

    if (error) {
      logger.error("SupabaseService", "Cleanup match invitations failed", error);
    }
  }

  private mapInvitationRecord(record: any): MatchInvitationPayload {
    return {
      id: record.id,
      sender: {
        profile_id: record.sender_profile_id,
        session_id: record.sender_session_id,
        name: record.sender_name,
        avatar: record.sender_avatar,
        church: record.sender_church,
        city: record.sender_city,
        points: record.sender_points || 0,
      },
      recipient_profile_id: record.recipient_profile_id,
      recipient_session_id: record.recipient_session_id,
      game_type: record.game_type,
      quiz_type: record.quiz_type,
      status: record.status,
      created_at: record.created_at,
      responded_at: record.responded_at,
    };
  }
}

export const supabaseService = new SupabaseService();
