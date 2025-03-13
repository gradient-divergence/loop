<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { addToCart } from "$lib/services/cartService";
  import type { Product } from '$lib/types/product';
  
  export let product: Product;
</script>

<a href="/product/{product.id}" class="block group">
  <div class="rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow">
    <div class="aspect-[4/3] relative overflow-hidden">
      <img 
        src={product.imageUrl || 'https://via.placeholder.com/300'} 
        alt={product.name} 
        class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    
    <div class="p-4">
      <h3 class="font-medium">{product.name}</h3>
      <p class="text-muted-foreground mt-1">${product.price.toFixed(2)}</p>
    </div>
  </div>
</a>
