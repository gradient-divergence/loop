import { writable } from 'svelte/store';

export interface UIState {
  isSearching: boolean;
  hasSearched: boolean;
  error: string | null;
}

export const uiState = writable<UIState>({
  isSearching: false,
  hasSearched: false,
  error: null
});

export function setSearching(value: boolean): void {
  uiState.update(state => ({ ...state, isSearching: value }));
}

export function setHasSearched(value: boolean): void {
  uiState.update(state => ({ ...state, hasSearched: value }));
}

export function setError(error: string | null): void {
  uiState.update(state => ({ ...state, error }));
}

export function resetSearchState(): void {
  uiState.set({
    isSearching: false,
    hasSearched: false,
    error: null
  });
}
