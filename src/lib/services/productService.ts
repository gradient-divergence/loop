import { getAllProducts, getProductById } from './shopifyService';
import type { Product } from '$lib/types/product';

// Convert Shopify product to your app's product format
function convertShopifyProduct(shopifyProduct: any): Product {
  return {
    id: shopifyProduct.id.toString(),
    name: shopifyProduct.title,
    description: shopifyProduct.descriptionHtml || shopifyProduct.description,
    price: parseFloat(shopifyProduct.variants[0].price),
    imageUrl: shopifyProduct.images[0]?.src || 'https://via.placeholder.com/150',
    category: shopifyProduct.productType.toLowerCase()
  };
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Get all products from Shopify
  const shopifyProducts = await getAllProducts();
  
  // Filter and convert products
  return shopifyProducts
    .filter((product: any) => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
    )
    .map(convertShopifyProduct);
}

export async function getCategories(): Promise<string[]> {
  // Get all products from Shopify
  const shopifyProducts = await getAllProducts();
  
  // Extract unique categories
  const categories = new Set(
    shopifyProducts.map((product: any) => product.productType.toLowerCase())
  );
  
  return Array.from(categories);
}

export async function getProductDetails(id: string): Promise<Product> {
  const shopifyProduct = await getProductById(id);
  return convertShopifyProduct(shopifyProduct);
}