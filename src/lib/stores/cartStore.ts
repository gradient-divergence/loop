import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { createCheckout, addItemsToCheckout, getCheckout } from '$lib/services/shopifyService';

// Define cart item type
export interface CartItem {
  id: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  checkoutId: string | null;
  checkoutUrl: string | null;
  loading: boolean;
}

// Initialize cart from localStorage if available
const initialState: CartState = browser 
  ? JSON.parse(localStorage.getItem('cart') || '{"items":[],"checkoutId":null,"checkoutUrl":null,"loading":false}')
  : { items: [], checkoutId: null, checkoutUrl: null, loading: false };

function createCartStore() {
  const { subscribe, set, update } = writable<CartState>(initialState);

  // Save to localStorage when cart changes
  if (browser) {
    subscribe(state => {
      localStorage.setItem('cart', JSON.stringify(state));
    });
  }

  return {
    subscribe,
    
    // Add item to cart
    addItem: async (item: CartItem) => {
      update(state => {
        const existingItem = state.items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          // Increase quantity if item already exists
          return {
            ...state,
            items: state.items.map(i => 
              i.variantId === item.variantId 
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          };
        } else {
          // Add new item
          return {
            ...state,
            items: [...state.items, item]
          };
        }
      });

      // Sync with Shopify checkout
      await syncWithShopify();
    },

    // Remove item from cart
    removeItem: async (variantId: string) => {
      update(state => ({
        ...state,
        items: state.items.filter(item => item.variantId !== variantId)
      }));

      // Sync with Shopify checkout
      await syncWithShopify();
    },

    // Update item quantity
    updateQuantity: async (variantId: string, quantity: number) => {
      update(state => ({
        ...state,
        items: state.items.map(item => 
          item.variantId === variantId 
            ? { ...item, quantity } 
            : item
        )
      }));

      // Sync with Shopify checkout
      await syncWithShopify();
    },

    // Clear cart
    clearCart: () => {
      set({ items: [], checkoutId: null, checkoutUrl: null, loading: false });
    },

    // Checkout
    checkout: async () => {
      let state: CartState;
      subscribe(s => { state = s; })();
      
      if (state.checkoutUrl) {
        window.location.href = state.checkoutUrl;
      }
    }
  };

  // Helper function to sync cart with Shopify checkout
  async function syncWithShopify() {
    update(state => ({ ...state, loading: true }));

    try {
      let state: CartState;
      subscribe(s => { state = s; })();

      // If no items in cart, reset checkout
      if (state.items.length === 0) {
        update(state => ({
          ...state, 
          checkoutId: null, 
          checkoutUrl: null, 
          loading: false
        }));
        return;
      }

      // Create or update checkout
      let checkout;
      if (state.checkoutId) {
        // Get existing checkout
        checkout = await getCheckout(state.checkoutId);
        
        // If checkout is completed, create a new one
        if (checkout.completedAt) {
          checkout = await createCheckout();
          
          // Add all items to the new checkout
          const lineItems = state.items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity
          }));
          
          checkout = await addItemsToCheckout(checkout.id, lineItems);
        } else {
          // Add all items to existing checkout
          const lineItems = state.items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity
          }));
          
          checkout = await addItemsToCheckout(checkout.id, lineItems);
        }
      } else {
        // Create new checkout
        checkout = await createCheckout();
        
        // Add all items to the new checkout
        const lineItems = state.items.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        }));
        
        checkout = await addItemsToCheckout(checkout.id, lineItems);
      }

      // Update cart state with checkout info
      update(state => ({
        ...state,
        checkoutId: checkout.id,
        checkoutUrl: checkout.webUrl,
        loading: false
      }));
    } catch (error) {
      console.error('Error syncing with Shopify:', error);
      update(state => ({ ...state, loading: false }));
    }
  }
}

export const cart = createCartStore();