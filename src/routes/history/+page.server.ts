// src/routes/history/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Get the session from locals
  const session = locals.session;
  
  // If no session, redirect to login
  if (!session) {
    throw redirect(303, '/login?redirect=/history');
  }
  
  // Use the supabase client from locals, not the createServerClient function
  const { data: searchHistory, error } = await locals.supabase
    .from('search_history')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(50);
  
  if (error) {
    console.error('Error fetching search history:', error);
    return {
      searchHistory: []
    };
  }
  
  return {
    searchHistory
  };
};