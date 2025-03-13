import { error } from '@sveltejs/kit';
import { getProductById } from '$lib/services/shopifyService';

export async function load({ params }) {
  try {
    const numericId = params.id;
    const shopifyId = `gid://shopify/Product/${numericId}`;
    
    const productData = await getProductById(shopifyId);
    
    if (!productData) {
      throw error(404, 'Product not found');
    }
    
    // Convert to a plain serializable object with explicit type conversions
    const product = {
      id: String(productData.id),
      title: String(productData.title || ''),
      description: String(productData.description || ''),
      descriptionHtml: String(productData.descriptionHtml || ''),
      price: productData.variants && productData.variants[0] ? 
             Number(productData.variants[0].price) : 0,
      images: Array.isArray(productData.images) ? 
              productData.images.map(img => ({
                src: String(img.src || ''),
                alt: String(img.alt || productData.title || '')
              })) : [],
      variants: Array.isArray(productData.variants) ?
                productData.variants.map(variant => ({
                  id: String(variant.id || ''),
                  title: String(variant.title || ''),
                  price: Number(variant.price || 0),
                  available: Boolean(variant.available)
                })) : []
    };
    
    return { product };
  } catch (err) {
    console.error('Error loading product:', err);
    throw error(500, 'Error loading product details');
  }
}
