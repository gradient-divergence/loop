<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabaseClient';
  
  let error: string | null = null;
  
  onMount(async () => {
    const { error: err } = await supabase.auth.getSession();
    
    if (err) {
      error = err.message;
      return;
    }
    
    // Redirect to the home page or a protected route
    goto('/');
  });
</script>

<div class="flex justify-center items-center min-h-[calc(100vh-13rem)]">
  {#if error}
    <div class="text-center">
      <h2 class="text-2xl font-bold text-destructive">Authentication Error</h2>
      <p class="mt-2 text-muted-foreground">{error}</p>
      <a href="/login" class="mt-4 inline-block text-primary hover:underline">
        Return to login
      </a>
    </div>
  {:else}
    <div class="text-center">
      <h2 class="text-2xl font-bold">Completing authentication...</h2>
      <p class="mt-2 text-muted-foreground">Please wait while we sign you in.</p>
    </div>
  {/if}
</div>
