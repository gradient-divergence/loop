import { writable, get } from 'svelte/store';
import type { Product } from '$lib/types/product';
import { authStore } from '$lib/stores/authStore';
import { supabase } from '$lib/supabaseClient';

// Define cart item interface
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

// Create a cart store
export const cartStore = writable<CartItem[]>([]);

// Add product to cart
export async function addToCart(product: Product, quantity: number = 1): Promise<void> {
  const cart = get(cartStore);
  const authState = get(authStore);
  
  // Check if product is already in cart
  const existingItem = cart.find(item => item.productId === product.id);
  
  if (existingItem) {
    // Update quantity if already in cart
    const updatedCart = cart.map(item => 
      item.productId === product.id 
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
    cartStore.set(updatedCart);
  } else {
    // Add new item to cart
    const newItem: CartItem = {
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl
    };
    cartStore.set([...cart, newItem]);
  }
  
  // If user is logged in, sync with database
  if (authState?.user) {
    try {
      await syncCartWithDatabase();
    } catch (error) {
      console.error('Failed to sync cart with database:', error);
    }
  }
}

// Sync cart with database for logged-in users
async function syncCartWithDatabase(): Promise<void> {
  const cart = get(cartStore);
  const authState = get(authStore);
  
  if (!authState?.user) return;
  
  try {
    // First delete existing cart items
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', authState.user.id);
    
    // Then insert current cart items
    if (cart.length > 0) {
      const cartItemsForDb = cart.map(item => ({
        user_id: authState.user.id,
        product_id: item.productId,
        quantity: item.quantity
      }));
      
      await supabase.from('cart_items').insert(cartItemsForDb);
    }
  } catch (error) {
    console.error('Error syncing cart with database:', error);
    throw new Error('Failed to sync cart');
  }
}

// Load cart from database for logged-in users
export async function loadCartFromDatabase(): Promise<void> {
  const authState = get(authStore);
  
  if (!authState?.user) return;
  
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        quantity,
        products:product_id (
          id,
          name,
          price,
          imageUrl
        )
      `)
      .eq('user_id', authState.user.id);
    
    if (error) throw error;
    
    if (data) {
      const cartItems: CartItem[] = data.map(item => ({
        id: crypto.randomUUID(),
        productId: item.products.id,
        name: item.products.name,
        price: item.products.price,
        quantity: item.quantity,
        imageUrl: item.products.imageUrl
      }));
      
      cartStore.set(cartItems);
    }
  } catch (error) {
    console.error('Error loading cart from database:', error);
  }
}

// Additional cart functions
export function removeFromCart(productId: string): void {
  cartStore.update(items => items.filter(item => item.productId !== productId));
  
  // Sync with database
  const authState = get(authStore);
  if (authState?.user) {
    syncCartWithDatabase().catch(console.error);
  }
}

export function updateCartItemQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  cartStore.update(items => 
    items.map(item => 
      item.productId === productId 
        ? { ...item, quantity } 
        : item
    )
  );
  
  // Sync with database
  const authState = get(authStore);
  if (authState?.user) {
    syncCartWithDatabase().catch(console.error);
  }
}

export function clearCart(): void {
  cartStore.set([]);
  
  // Sync with database
  const authState = get(authStore);
  if (authState?.user) {
    syncCartWithDatabase().catch(console.error);
  }
}
