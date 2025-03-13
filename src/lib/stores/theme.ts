import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultTheme = 'light';

// Initialize from localStorage or system preference when in browser
const initialTheme = browser 
  ? localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  : defaultTheme;

export const theme = writable<'light' | 'dark'>(initialTheme as 'light' | 'dark');

// Update the DOM and localStorage when theme changes
if (browser) {
  theme.subscribe((value) => {
    localStorage.setItem('theme', value);
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
}

export function toggleTheme() {
  theme.update(current => current === 'light' ? 'dark' : 'light');
}
