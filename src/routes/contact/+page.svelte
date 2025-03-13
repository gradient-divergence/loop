<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Label } from "$lib/components/ui/label";
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { authStore } from "$lib/stores/authStore";
  import { onMount } from "svelte";
  
  // Form state
  let name = "";
  let email = "";
  let subject = "";
  let message = "";
  let isSubmitting = false;
  let isSubmitted = false;
  let error: string | null = null;
  
  // Pre-fill email if the user is logged in
  onMount(() => {
    if ($authStore?.user?.email) {
      email = $authStore.user.email;
    }
  });
  
  // Submit form
  async function handleSubmit() {
    isSubmitting = true;
    error = null;
    
    // Basic validation
    if (!name || !email || !message) {
      error = "Please fill out all required fields";
      isSubmitting = false;
      return;
    }
    
    try {
      // In a real app, you'd send this to your server or a service like Formspree
      // await fetch('/api/contact', { 
      //   method: 'POST',
      //   body: JSON.stringify({ name, email, subject, message }),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      // For demo purposes, just simulate a server delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      isSubmitted = true;
      // Reset form
      name = "";
      email = "";
      subject = "";
      message = "";
    } catch (err) {
      error = "Failed to send your message. Please try again.";
      console.error("Error sending contact form:", err);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Contact Us | Loop</title>
  <meta name="description" content="Get in touch with the Loop team. We'd love to hear from you!" />
</svelte:head>

<div class="space-y-8 max-w-4xl mx-auto">
  <div class="text-center">
    <h1 class="text-4xl font-bold tracking-tight mb-4">Get in Touch</h1>
    <p class="text-muted-foreground max-w-2xl mx-auto">
      We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
    </p>
  </div>
  
  <div class="grid md:grid-cols-2 gap-8">
    <div>
      <h2 class="text-2xl font-semibold mb-4">Contact Information</h2>
      <div class="space-y-4">
        <div class="flex items-start">
          <div class="bg-primary/10 p-2 rounded-md mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div>
            <p class="font-medium">Email</p>
            <p class="text-muted-foreground">hello@loopplatform.com</p>
          </div>
        </div>
        
        <div class="flex items-start">
          <div class="bg-primary/10 p-2 rounded-md mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <p class="font-medium">Location</p>
            <p class="text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>
        
        <div class="flex items-start">
          <div class="bg-primary/10 p-2 rounded-md mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <div>
            <p class="font-medium">Phone</p>
            <p class="text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Follow Us</h2>
      <div class="flex space-x-4">
        <a href="#" class="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
          </svg>
        </a>
        <a href="#" class="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a href="#" class="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </div>
    </div>
    
    <div>
      {#if isSubmitted}
        <Card>
          <CardHeader>
            <CardTitle>Message Sent!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Thank you for reaching out. We've received your message and will get back to you shortly.</p>
          </CardContent>
          <CardFooter>
            <Button on:click={() => isSubmitted = false}>Send Another Message</Button>
          </CardFooter>
        </Card>
      {:else}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
              {#if error}
                <div class="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                  {error}
                </div>
              {/if}
              
              <div class="space-y-2">
                <Label for="name">Name*</Label>
                <Input id="name" bind:value={name} required placeholder="Your name" />
              </div>
              
              <div class="space-y-2">
                <Label for="email">Email*</Label>
                <Input id="email" type="email" bind:value={email} required placeholder="your@email.com" />
              </div>
              
              <div class="space-y-2">
                <Label for="subject">Subject</Label>
                <Input id="subject" bind:value={subject} placeholder="What's this about?" />
              </div>
              
              <div class="space-y-2">
                <Label for="message">Message*</Label>
                <Textarea 
                  id="message" 
                  bind:value={message} 
                  placeholder="How can we help you?" 
                  required
                  rows={5}
                />
              </div>
              
              <Button 
                type="submit" 
                class="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      {/if}
    </div>
  </div>
</div>
