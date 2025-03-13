<script lang="ts">
  import LoopLogo from './LoopLogo.svelte';
  import { authStore } from "$lib/stores/authStore";
  
  // App name can be passed as a prop if needed
  export let appName = 'Loop';
</script>

<footer class="bg-background/90 dark:bg-background/80 border-t border-border backdrop-blur-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="mb-4 md:mb-0">
        <LoopLogo size="sm" withTagline={true} />
        <p class="text-sm text-muted-foreground mt-2">
          &copy; {new Date().getFullYear()} {appName}. All rights reserved.
        </p>
      </div>
      
      <!-- Footer Navigation -->
      <div>
        <nav class="flex flex-wrap justify-center space-x-4">
          <a href="/" class="text-muted-foreground hover:text-foreground">Home</a>
          <a href="/about" class="text-muted-foreground hover:text-foreground">About</a>
          <a href="/contact" class="text-muted-foreground hover:text-foreground">Contact</a>
          
          <!-- Conditional auth links -->
          {#if $authStore && !$authStore.user}
            <a href="/login" class="text-muted-foreground hover:text-foreground">Login</a>
            <a href="/signup" class="text-muted-foreground hover:text-foreground">Sign Up</a>
          {/if}
          
          <a href="/privacy" class="text-muted-foreground hover:text-foreground">Privacy</a>
          <a href="/terms" class="text-muted-foreground hover:text-foreground">Terms</a>
        </nav>
      </div>
    </div>
  </div>
</footer>
