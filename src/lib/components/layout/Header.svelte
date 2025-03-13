<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  import { Button } from "$lib/components/ui/button";
  import { authStore } from "$lib/stores/authStore";
  import LoopLogo from './LoopLogo.svelte';
  import { onMount } from "svelte";
  
  let theme: 'light' | 'dark' = 'light';
  export let appName = 'Loop';

  // Initialize auth store
  onMount(() => {
    const unsubscribe = authStore.initialize();
    return unsubscribe;
  });
  
  function handleSignOut() {
    authStore.signOut();
  }
</script>

<header class="bg-background/90 dark:bg-background/80 backdrop-blur-sm border-b border-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo/Site title -->
        <div class="flex-shrink-0 flex items-center">
          <a href="/" aria-label="Home">
            <LoopLogo size="md" withTagline={true} />
          </a>
        </div>
        
        <!-- Navigation links -->
        <nav class="flex space-x-4">
          <a href="/" class="text-foreground hover:text-primary px-3 py-2 rounded-md">Home</a>
          
          {#if $authStore.user}
            <a href="/history" class="text-foreground hover:text-primary px-3 py-2 rounded-md">History</a>
          {/if}
          
          <a href="/about" class="text-foreground hover:text-primary px-3 py-2 rounded-md">About</a>
          <a href="/contact" class="text-foreground hover:text-primary px-3 py-2 rounded-md">Contact</a>
        </nav>
        
        <!-- Auth buttons and theme toggle -->
        <div class="flex items-center space-x-4">
          <!-- Auth links - conditional rendering based on auth state -->
          {#if $authStore.loading}
            <!-- Show nothing while loading auth state -->
          {:else if $authStore.user}
            <!-- User is logged in -->
            <div class="flex items-center space-x-2">
              <span class="text-sm text-muted-foreground hidden md:inline">
                {$authStore.user.email}
              </span>
              <Button variant="outline" size="sm" on:click={handleSignOut}>
                Sign Out
              </Button>
            </div>
          {:else}
            <!-- User is not logged in -->
            <div class="flex space-x-2">
              <a href="/login">
                <Button variant="outline" size="sm">Login</Button>
              </a>
              <a href="/signup">
                <Button size="sm">Sign Up</Button>
              </a>
            </div>
          {/if}
          
          <!-- Theme toggle button -->
          <ThemeToggle bind:theme />
        </div>
      </div>
    </div>
  </header>
