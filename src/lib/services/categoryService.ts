import { writable } from 'svelte/store';
import { getCategories as fetchCategoriesFromAPI } from './productService';

// Create a store for categories
export const categories = writable<string[]>([]);

// Load categories
export async function loadCategories(): Promise<string[]> {
  try {
    const categoryList = await fetchCategoriesFromAPI();
    categories.set(categoryList);
    return categoryList;
  } catch (error) {
    console.error('Failed to load categories:', error);
    const fallbackCategories = ["electronics", "clothing", "home", "toys"];
    categories.set(fallbackCategories);
    return fallbackCategories;
  }
}

// Get a category by slug
export function getCategoryBySlug(slug: string): string | undefined {
  const cats = get(categories);
  return cats.find(cat => slugify(cat) === slug);
}

// Helper function to convert category name to slug
export function slugify(categoryName: string): string {
  return categoryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
