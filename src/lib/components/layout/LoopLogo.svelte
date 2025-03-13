<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let withTagline = true;
  export let color = ""; // Empty for automatic dark/light mode
  
  // Size classes mapped to TailwindCSS
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };
</script>

<div class="flex items-center {sizes[size]} {color ? color : 'text-foreground'}">
  <div class="logo-container">
    <svg viewBox="0 0 140 60" class="h-full" aria-label="Loop logo">
      <!-- L -->
      <path d="M10,10 L10,40 L20,40" stroke="currentColor" stroke-width="4" fill="none" />
      
      <!-- O with infinity symbol -->
      <g>
        <circle cx="40" cy="30" r="10" stroke="currentColor" stroke-width="4" fill="none" />
        <path d="M35,18 C30,22 30,28 35,32 C40,36 45,36 50,32 C55,28 55,22 50,18 C45,14 40,14 35,18 Z" 
              stroke="currentColor" stroke-width="1.5" fill="none" transform="translate(0,-15) scale(0.6)" />
      </g>
      
      <!-- O -->
      <circle cx="65" cy="30" r="10" stroke="currentColor" stroke-width="4" fill="none" />
      
      <!-- P -->
      <path d="M85,10 L85,40 M85,10 C95,10 100,15 100,20 C100,25 95,30 85,30" 
            stroke="currentColor" stroke-width="4" fill="none" />
    </svg>
  </div>
  
  {#if withTagline}
    <div class="flex items-center ml-3">
      <div class="h-full w-px bg-current opacity-40 mx-3"></div>
      <div class="text-current text-lg tracking-wide font-light">style club</div>
    </div>
  {/if}
</div>
