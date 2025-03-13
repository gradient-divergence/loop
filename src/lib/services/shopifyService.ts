import Client from 'shopify-buy';

// Initialize the Shopify client
const shopifyClient = Client.buildClient({
  domain: import.meta.env.VITE_PUBLIC_SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
});

// Get all products
export async function getAllProducts() {
  try {
    const products = await shopifyClient.product.fetchAll();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Get product by ID
export async function getProductById(id: string) {
  try {
    const product = await shopifyClient.product.fetch(id);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

// Get products by collection
export async function getProductsByCollection(collectionId: string) {
  try {
    const collection = await shopifyClient.collection.fetchWithProducts(collectionId);
    return collection.products;
  } catch (error) {
    console.error('Error fetching collection products:', error);
    throw error;
  }
}

// Create checkout
export async function createCheckout() {
  try {
    return await shopifyClient.checkout.create();
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
}

// Add items to checkout
export async function addItemsToCheckout(checkoutId: string, lineItems: any[]) {
  try {
    return await shopifyClient.checkout.addLineItems(checkoutId, lineItems);
  } catch (error) {
    console.error('Error adding items to checkout:', error);
    throw error;
  }
}

// Get checkout by ID
export async function getCheckout(checkoutId: string) {
  try {
    return await shopifyClient.checkout.fetch(checkoutId);
  } catch (error) {
    console.error('Error fetching checkout:', error);
    throw error;
  }
} 