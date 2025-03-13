<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Hero from "$lib/components/Hero.svelte";
  import { Input } from "$lib/components/ui/input";
  import { Card } from "$lib/components/ui/card";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import { uiState, setSearching, setHasSearched, setError } from "$lib/stores/uiStore";
  import { onMount } from "svelte";
  // Import Shopify-specific services
  import { searchProducts, getCategories } from '$lib/services/productService';
  
  let searchQuery = "";
  let products = [];
  let categories = [];
  let loading = true;
  
  onMount(async () => {
    try {
      // Load initial products and categories from Shopify
      products = await searchProducts('');
      categories = await getCategories();
    } catch (error) {
      console.error('Error loading initial data:', error);
      setError("Failed to load products. Please refresh the page.");
    } finally {
      loading = false;
    }
  });
  
  async function handleSearch() {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    setError(null);
    setHasSearched(true);
    
    try {
      // Search products using Shopify service
      products = await searchProducts(searchQuery);
    } catch (err) {
      setError("Failed to search products. Please try again.");
      products = [];
    } finally {
      setSearching(false);
    }
  }
  
  // Function to handle category selection
  async function selectCategory(category: string) {
    searchQuery = category;
    handleSearch();
  }
  
  // Helper function to format Shopify product IDs for URLs
  function formatProductId(id: string) {
    // If ID contains the Shopify prefix (gid://shopify/Product/), extract just the numeric part
    return id.includes('gid://') ? id.split('/').pop() : id;
  }
</script>

<svelte:head>
  <title>Loop Style Club | Fashion That Fits Your Lifestyle</title>
</svelte:head>

<Hero />
<div class="space-y-8">
  <div class="text-center">
    <h1 class="text-4xl font-bold tracking-tight mb-4">Find Your Style</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto">
      Discover the latest fashion trends in shoes, accessories, handbags and more.
    </p>
  </div>
  
  <div class="max-w-2xl mx-auto">
    <form on:submit|preventDefault={handleSearch} class="flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder="Search for shoes, accessories, handbags..."
        bind:value={searchQuery}
        class="flex-1"
      />
      <Button type="submit" disabled={$uiState.isSearching}>
        {#if $uiState.isSearching}
          Searching...
        {:else}
          Search
        {/if}
      </Button>
    </form>
  </div>
  
  {#if $uiState.hasSearched}
    <div class="py-4">
      {#if $uiState.isSearching}
        <!-- Loading state -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each Array(3) as _}
            <Card>
              <Skeleton class="h-80 w-full" />
            </Card>
          {/each}
        </div>
      {:else if $uiState.error}
        <!-- Error state -->
        <div class="text-center p-8 bg-destructive/10 rounded-lg">
          <p class="text-destructive text-lg">{$uiState.error}</p>
          <Button variant="outline" class="mt-4" on:click={handleSearch}>
            Try Again
          </Button>
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
          <p class="text-muted-foreground mb-4">Found {products.length} products for "{searchQuery}"</p>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {#each products as product (product.id)}
              <a 
                href="/product/{formatProductId(product.id)}" 
                class="block group"
                data-sveltekit-preload-data="off"
              >
                <div class="rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow">
                  <div class="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={product.imageUrl || (product.images?.[0]?.src || 'https://via.placeholder.com/300')} 
                      alt={product.name || product.title} 
                      class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div class="p-4">
                    <h3 class="font-medium">{product.name || product.title}</h3>
                    <p class="text-muted-foreground mt-1">
                      ${(product.price || (product.variants?.[0]?.price || 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {:else}
    <!-- Initial state - display categories from Shopify -->
    <div class="text-center p-12 bg-muted/50 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Shop by Category</h2>
      <p class="text-muted-foreground mb-6">
        Browse our collection or search for what you're looking for above.
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {#each categories as category}
          <Button variant="outline" on:click={() => selectCategory(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        {/each}
      </div>
    </div>
  {/if}
  
  {#if !$uiState.hasSearched && !loading && products.length > 0}
    <!-- Featured products section -->
    <div>
      <h2 class="text-2xl font-bold mb-6">Featured Products</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        {#each products.slice(0, 4) as product (product.id)}
          <a 
            href="/product/{formatProductId(product.id)}" 
            class="block group"
            data-sveltekit-preload-data="off"
          >
            <div class="rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow">
              <div class="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={product.imageUrl || (product.images?.[0]?.src || 'https://via.placeholder.com/300')} 
                  alt={product.name || product.title} 
                  class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div class="p-4">
                <h3 class="font-medium">{product.name || product.title}</h3>
                <p class="text-muted-foreground mt-1">
                  ${(product.price || (product.variants?.[0]?.price || 0)).toFixed(2)}
                </p>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/if}
</div>

