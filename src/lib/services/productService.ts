import type { Product } from '$lib/types/product';

// Mock data - in a real app, this would be fetched from an API
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Designer Sneakers",
    description: "Premium sneakers with comfort technology",
    price: 129.99,
    category: "shoes",
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: "2",
    name: "Silver Bracelet",
    description: "Elegant bracelet with minimalist design",
    price: 49.99,
    category: "accessories",
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: "3",
    name: "Leather Tote Bag",
    description: "Spacious tote bag with premium leather finish",
    price: 89.99,
    category: "handbags",
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: "4",
    name: "Silk Blouse",
    description: "Lightweight silk blouse for all occasions",
    price: 69.99,
    category: "clothing",
    imageUrl: "https://via.placeholder.com/150"
  }
];

export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would be an API request
  // return fetch(`/api/products?search=${query}`).then(res => res.json());
  
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getCategories(): Promise<string[]> {
  // In a real app, fetch categories from an API
  return ["shoes", "accessories", "handbags", "clothing"];
}
