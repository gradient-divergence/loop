import { supabase } from '$lib/supabaseClient';
import { authStore } from '$lib/stores/authStore';
import { get } from 'svelte/store';

interface SearchFilters {
  [key: string]: string | number | boolean;
}

export async function saveSearchToHistory(
  query: string, 
  resultCount: number, 
  filters: SearchFilters = {}
): Promise<void> {
  const authState = get(authStore);
  
  // Only save if user is logged in
  if (!authState?.user) return;
  
  try {
    await supabase
      .from('search_history')
      .insert({
        user_id: authState.user.id,
        query: query,
        filters: filters,
        result_count: resultCount
      });
  } catch (err) {
    console.error('Error saving search to history:', err);
    throw new Error('Failed to save search history');
  }
}

export async function getSearchHistory(limit: number = 50): Promise<any[]> {
  const authState = get(authStore);
  
  // Return empty array if not logged in
  if (!authState?.user) return [];
  
  try {
    const { data, error } = await supabase
      .from('search_history')
      .select('*')
      .eq('user_id', authState.user.id)
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    
    return data || [];
  } catch (err) {
    console.error('Error fetching search history:', err);
    throw new Error('Failed to fetch search history');
  }
}

export async function deleteSearchHistoryItem(id: string): Promise<void> {
  const authState = get(authStore);
  
  // Return if not logged in
  if (!authState?.user) return;
  
  try {
    const { error } = await supabase
      .from('search_history')
      .delete()
      .eq('id', id)
      .eq('user_id', authState.user.id);
      
    if (error) throw error;
  } catch (err) {
    console.error('Error deleting search history item:', err);
    throw new Error('Failed to delete search history item');
  }
}

export async function clearAllSearchHistory(): Promise<void> {
  const authState = get(authStore);
  
  // Return if not logged in
  if (!authState?.user) return;
  
  try {
    const { error } = await supabase
      .from('search_history')
      .delete()
      .eq('user_id', authState.user.id);
      
    if (error) throw error;
  } catch (err) {
    console.error('Error clearing search history:', err);
    throw new Error('Failed to clear search history');
  }
}

export async function deleteMultipleSearchHistoryItems(ids: string[]): Promise<void> {
  const authState = get(authStore);
  
  // Return if not logged in
  if (!authState?.user) return;
  
  try {
    const { error } = await supabase
      .from('search_history')
      .delete()
      .in('id', ids)
      .eq('user_id', authState.user.id);
      
    if (error) throw error;
  } catch (err) {
    console.error('Error deleting search history items:', err);
    throw new Error('Failed to delete search history items');
  }
}
