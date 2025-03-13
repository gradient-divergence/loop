<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Hero from "$lib/components/Hero.svelte";
  import { Input } from "$lib/components/ui/input";
  import { Card } from "$lib/components/ui/card";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import { performSearch } from "$lib/services/searchService";
  import { loadCategories, categories } from "$lib/services/categoryService";
  import { uiState, setSearching, setHasSearched, setError } from "$lib/stores/uiStore";
  import { onMount } from "svelte";
  
  let searchQuery = "";
  let products = [];
  
  onMount(() => {
    loadCategories();
  });
  
  async function handleSearch() {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const result = await performSearch(searchQuery);
      products = result.products;
    } catch (err) {
      setError("Failed to search products. Please try again.");
      products = [];
    } finally {
      setSearching(false);
    }
  }
  
  function selectCategory(category: string) {
    searchQuery = category;
    handleSearch();
  }
</script>

<svelte:head>
  <title>Loop | Find Products You Love</title>
</svelte:head>

<Hero />
<div class="space-y-8">
  <div class="text-center">
    <h1 class="text-4xl font-bold tracking-tight mb-4">Find Your Products</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto">
      Search our extensive catalog of high-quality products to find exactly what you need.
    </p>
  </div>
  
  <div class="max-w-2xl mx-auto">
    <form on:submit|preventDefault={handleSearch} class="flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder="Search products..."
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
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each products as product}
              <ProductCard {product} />
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {:else}
    <!-- Initial state - use dynamically loaded categories -->
    <div class="text-center p-12 bg-muted/50 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Find what you're looking for</h2>
      <p class="text-muted-foreground mb-6">
        Enter a search term above to browse our extensive catalog of products.
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {#each $categories as category}
          <Button variant="outline" on:click={() => selectCategory(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        {/each}
      </div>
    </div>
  {/if}
</div>

