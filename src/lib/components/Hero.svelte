<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import LoopLogo from './layout/LoopLogo.svelte';
</script>

<div class="relative overflow-hidden h-[40vh] min-h-[300px] flex items-center">
  <!-- Extra bokeh effect for hero - mode-sensitive gradients -->
  <div class="absolute inset-0 z-0">
    <div class="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/10 dark:bg-primary/15 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4"></div>
    <div class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/10 dark:bg-secondary/15 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4"></div>
  </div>
  
  <!-- Content -->
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-3xl">
      <div class="mb-4">
        <LoopLogo size="lg" withTagline={true} color="text-primary" />
      </div>
      
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Find what you're <span class="text-primary">looking for</span>
      </h1>
      
      <p class="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl">
        Discover products that match your style and needs with our intelligent search platform.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild>
          <a href="/signup">Get Started</a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href="/about">Learn More</a>
        </Button>
      </div>
    </div>
  </div>
</div>
