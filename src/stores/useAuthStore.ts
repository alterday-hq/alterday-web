import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ success: boolean }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ success: boolean }>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  error: null,

  initialize: async () => {
    const { data } = await supabase.auth.getSession();
    set({ session: data.session, user: data.session?.user ?? null });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
    });
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    const errorStr = error ? [error.code, error.message].filter(Boolean).join(' ') : null;
    set({ isLoading: false, error: errorStr });
    return { success: !error };
  },

  signUp: async (email, password, displayName) => {
    set({ isLoading: true, error: null });
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    const errorStr = error ? [error.code, error.message].filter(Boolean).join(' ') : null;
    set({ isLoading: false, error: errorStr });
    return { success: !error };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
