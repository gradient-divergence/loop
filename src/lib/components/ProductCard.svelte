<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { addToCart } from "$lib/services/cartService";
  import type { Product } from '$lib/types/product';
  
  export let product: Product;
</script>

<Card>
  <CardHeader>
    <CardTitle>{product.name}</CardTitle>
  </CardHeader>
  <CardContent>
    <div class="aspect-square w-full relative mb-4">
      <img 
        src={product.imageUrl} 
        alt={product.name}
        class="object-cover w-full h-full rounded-md"
      />
    </div>
    <p class="text-sm text-muted-foreground">{product.description}</p>
  </CardContent>
  <CardFooter class="flex justify-between">
    <p class="font-bold">${product.price.toFixed(2)}</p>
    <Button on:click={() => addToCart(product)}>Add to Cart</Button>
  </CardFooter>
</Card>
