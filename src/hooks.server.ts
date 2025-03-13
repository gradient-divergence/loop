import { createClient } from '@supabase/supabase-js';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Create a Supabase client specifically for this request
  event.locals.supabase = createClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        // Get auth cookies from the request
        persistSession: false,
        detectSessionInUrl: false
      }
    }
  );

  // Get the session
  const { data: { session } } = await event.locals.supabase.auth.getSession();
  event.locals.session = session;

  // Resolve the request
  return resolve(event);
};
