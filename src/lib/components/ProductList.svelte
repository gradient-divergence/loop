<script lang="ts">
  import type { Product } from '$lib/types/product';
  import ProductCard from './ProductCard.svelte';
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { Card, CardContent, CardFooter, CardHeader } from "$lib/components/ui/card";
  
  export let products: Product[] = [];
  export let isLoading: boolean = false;
  export let searchQuery: string = '';
</script>

{#if isLoading}
  <!-- Loading state -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each Array(3) as _}
      <Card>
        <CardHeader>
          <Skeleton class="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton class="h-32 w-full mb-4" />
          <Skeleton class="h-4 w-full mb-2" />
          <Skeleton class="h-4 w-2/3" />
        </CardContent>
        <CardFooter>
          <Skeleton class="h-8 w-24" />
        </CardFooter>
      </Card>
    {/each}
  </div>
{:else if products.length === 0}
  <!-- Empty state -->
  <div class="text-center p-8 bg-muted rounded-lg">
    <h3 class="text-lg font-medium">No products found</h3>
    <p class="text-muted-foreground mt-2">
      Try adjusting your search term or browse our categories.
    </p>
  </div>
{:else}
  <!-- Results -->
  <div>
    {#if searchQuery}
      <p class="text-muted-foreground mb-4">Found {products.length} products for "{searchQuery}"</p>
    {/if}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each products as product}
        <ProductCard {product} />
      {/each}
    </div>
  </div>
{/if}
