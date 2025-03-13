<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
</script>

<svelte:head>
  <title>About Loop | Your Product Search Platform</title>
  <meta name="description" content="Learn more about Loop, the product search platform helping you find exactly what you need." />
</svelte:head>

<div class="space-y-8 max-w-4xl mx-auto">
  <div class="text-center">
    <h1 class="text-4xl font-bold tracking-tight mb-4">About Loop</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto">
      Discover the story behind our platform and our mission to simplify product discovery.
    </p>
  </div>
  
  <section class="prose dark:prose-invert max-w-none">
    <h2>Our Mission</h2>
    <p>
      At Loop, we believe finding the right products should be simple and stress-free. Our platform is designed to connect you with exactly what you're looking for, without the endless scrolling and comparison that typically comes with online shopping.
    </p>
    
    <p>
      We're building a smarter way to search, discover, and decide on products that match your needs, preferences, and budget.
    </p>
    
    <h2>Our Story</h2>
    <p>
      Loop was founded in 2023 by a team of e-commerce enthusiasts who were frustrated with the fragmented nature of online shopping. Too often, finding the perfect product meant visiting dozens of websites, comparing hundreds of options, and still feeling uncertain about the final choice.
    </p>
    
    <p>
      We set out to build a platform that brings together products from across the web, with powerful search capabilities and an intuitive interface that makes shopping feel like a joy rather than a chore.
    </p>
    
    <div class="grid md:grid-cols-3 gap-6 my-8">
      <Card>
        <CardHeader>
          <CardTitle>Smart Search</CardTitle>
          <CardDescription>Find exactly what you need</CardDescription>
        </CardHeader>
        <CardContent>
          Our advanced search algorithms understand what you're looking for, even when you're not sure how to describe it.
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Comprehensive</CardTitle>
          <CardDescription>Products from everywhere</CardDescription>
        </CardHeader>
        <CardContent>
          We aggregate products from thousands of sources to ensure you can find everything in one place.
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Personalized</CardTitle>
          <CardDescription>Tailored to your preferences</CardDescription>
        </CardHeader>
        <CardContent>
          Your search history helps us understand your preferences to deliver more relevant results over time.
        </CardContent>
      </Card>
    </div>
    
    <h2>Our Team</h2>
    <p>
      We're a small but passionate team of developers, designers, and product enthusiasts committed to creating the best product search experience on the web. Each team member brings unique expertise and perspective to make Loop the platform we'd want to use ourselves.
    </p>
    
    <h2>Join Our Journey</h2>
    <p>
      Loop is constantly evolving, and we'd love for you to be part of our story. Create an account to start tracking your searches, save your favorites, and help us build a better product discovery platform.
    </p>
    
    <div class="flex justify-center mt-8">
      <Button size="lg" asChild>
        <a href="/signup">Create an Account</a>
      </Button>
    </div>
  </section>
</div>
