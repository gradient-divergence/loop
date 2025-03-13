import { searchProducts } from './productService';
import { saveSearchToHistory } from './searchHistoryService';
import { authStore } from '$lib/stores/authStore';
import { get } from 'svelte/store';
import type { Product } from '$lib/types/product';

export interface SearchResult {
  products: Product[];
  count: number;
  query: string;
}

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'newest';
}

export async function performSearch(query: string): Promise<SearchResult> {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty');
  }
  
  try {
    // Get search results from product service
    const products = await searchProducts(query);
    
    // Save search to history if user is logged in
    const authState = get(authStore);
    if (authState?.user) {
      await saveSearchToHistory(query, products.length);
    }
    
    // Return search results
    return {
      products,
      count: products.length,
      query
    };
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to perform search');
  }
}

export async function performAdvancedSearch(
  query: string, 
  filters: SearchFilters = {}
): Promise<SearchResult> {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty');
  }
  
  try {
    // This would call an enhanced version of searchProducts that accepts filters
    const products = await searchProducts(query);
    
    // Filter and sort results based on filters
    let filteredProducts = [...products];
    
    // Apply category filter
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    
    // Apply price filters
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }
    
    // Save search with filters to history if user is logged in
    const authState = get(authStore);
    if (authState?.user) {
      await saveSearchToHistory(query, filteredProducts.length, filters);
    }
    
    return {
      products: filteredProducts,
      count: filteredProducts.length,
      query
    };
  } catch (error) {
    console.error('Advanced search error:', error);
    throw new Error('Failed to perform search with filters');
  }
}
