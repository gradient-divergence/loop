<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { cart } from '$lib/stores/cartStore';
  
  export let data;
  const { product } = data;
  
  let quantity = 1;
  let loading = false;
  
  function addToCart() {
    loading = true;
    
    cart.addItem({
      id: product.id,
      variantId: product.variants[0].id,
      name: product.title,
      price: product.price,
      quantity: quantity,
      imageUrl: product.images[0]?.src || '/images/placeholder.jpg'
    });
    
    loading = false;
  }
</script>

<svelte:head>
  <title>{product.title} | Loop Style Club</title>
</svelte:head>

<div class="container mx-auto py-8">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="relative">
      <img 
        src={product.images[0]?.src || '/images/placeholder.jpg'} 
        alt={product.title} 
        class="w-full h-auto rounded-lg"
      />
    </div>
    
    <div class="flex flex-col justify-between">
      <div>
        <h1 class="text-3xl font-bold">{product.title}</h1>
        <p class="text-xl mt-2">${product.price.toFixed(2)}</p>
        
        <div class="mt-4 prose prose-lg dark:prose-invert">
          {#if product.descriptionHtml}
            <div>{@html product.descriptionHtml}</div>
          {:else}
            <p>{product.description}</p>
          {/if}
        </div>
      </div>
      
      <div class="mt-8">
        <div class="flex items-center gap-4 mb-4">
          <label for="quantity">Quantity:</label>
          <input 
            type="number" 
            id="quantity" 
            bind:value={quantity} 
            min="1" 
            max="10" 
            class="w-16 px-2 py-1 border rounded-md"
          />
        </div>
        
        <Button on:click={addToCart} disabled={loading} class="w-full">
          {#if loading}
            Adding to Cart...
          {:else}
            Add to Cart
          {/if}
        </Button>
      </div>
    </div>
  </div>
</div>
