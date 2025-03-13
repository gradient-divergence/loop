<script lang="ts">
  export let intensity: 'low' | 'medium' | 'high' = 'medium';
</script>

<div class="bokeh-container {intensity}">
  <div class="bokeh-overlay"></div>
  <slot></slot>
</div>

<style>
  .bokeh-container {
    position: relative;
    width: 100%;
    min-height: 100%;
    background: linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.8) 100%);
    overflow: hidden;
  }

  .bokeh-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.6;
    pointer-events: none;
  }
  
  .low .bokeh-overlay {
    opacity: 0.2;
  }
  
  .high .bokeh-overlay {
    opacity: 0.8;
  }

  /* Different styling for light and dark mode */
  :global(.dark) .bokeh-overlay::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, hsla(35, 90%, 61%, 0.15) 5%, transparent 15%),
      radial-gradient(circle at 80% 20%, hsla(35, 90%, 61%, 0.1) 10%, transparent 20%),
      radial-gradient(circle at 40% 80%, hsla(35, 90%, 61%, 0.2) 8%, transparent 18%),
      radial-gradient(circle at 90% 60%, hsla(35, 90%, 61%, 0.15) 12%, transparent 25%);
    filter: blur(8px);
  }
  
  /* Light mode bokeh effect - more subtle with light colors */
  :global(html:not(.dark)) .bokeh-overlay::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, hsla(35, 70%, 50%, 0.08) 5%, transparent 15%),
      radial-gradient(circle at 80% 20%, hsla(35, 70%, 50%, 0.05) 10%, transparent 20%),
      radial-gradient(circle at 40% 80%, hsla(300, 65%, 50%, 0.08) 8%, transparent 18%),
      radial-gradient(circle at 90% 60%, hsla(220, 70%, 50%, 0.06) 12%, transparent 25%);
    filter: blur(8px);
  }
  
  :global(.bokeh-container > *) {
    position: relative;
    z-index: 1;
  }
</style>
