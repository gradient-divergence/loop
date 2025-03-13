import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';
import { goto } from '$app/navigation';

type AuthState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthState>({
    user: null,
    session: null,
    loading: true
  });

  async function initialize() {
    update(state => ({ ...state, loading: true }));
    
    // Get initial session
    const { data } = await supabase.auth.getSession();
    
    if (data.session) {
      set({
        user: data.session.user,
        session: data.session,
        loading: false
      });
    } else {
      set({
        user: null,
        session: null,
        loading: false
      });
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          set({
            user: session.user,
            session: session,
            loading: false
          });
        } else {
          set({
            user: null,
            session: null,
            loading: false
          });
        }
      }
    );

    // Return cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }

  async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    goto('/');
    return data;
  }

  async function signUpWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    
    goto('/');
    return data;
  }

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    if (error) throw error;
    
    return data;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    goto('/login');
  }

  return {
    subscribe,
    initialize,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut
  };
};

export const authStore = createAuthStore();
