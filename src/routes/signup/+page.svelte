<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  import { authStore } from "$lib/stores/authStore";
  import { onMount } from "svelte";
  
  let email = "";
  let password = "";
  let confirmPassword = "";
  let loading = false;
  let error: string | null = null;
  
  onMount(() => {
    // Initialize auth store
    const unsubscribe = authStore.initialize();
    return unsubscribe;
  });
  
  async function handleEmailSignup() {
    loading = true;
    error = null;
    
    // Validate password match
    if (password !== confirmPassword) {
      error = "Passwords do not match";
      loading = false;
      return;
    }
    
    // Validate password strength
    if (password.length < 8) {
      error = "Password must be at least 8 characters";
      loading = false;
      return;
    }
    
    try {
      await authStore.signUpWithEmail(email, password);
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to sign up";
    } finally {
      loading = false;
    }
  }
  
  async function handleGoogleSignup() {
    loading = true;
    error = null;
    
    try {
      await authStore.signInWithGoogle();
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to sign up with Google";
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Sign Up | Loop</title>
</svelte:head>

<div class="flex justify-center items-center min-h-[calc(100vh-13rem)]">
  <Card class="w-full max-w-md">
    <CardHeader class="space-y-1">
      <CardTitle class="text-2xl font-bold">Create an account</CardTitle>
      <CardDescription>
        Enter your email and create a password to sign up
      </CardDescription>
    </CardHeader>
    <CardContent>
      {#if error}
        <Alert variant="destructive" class="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      {/if}
      
      <form on:submit|preventDefault={handleEmailSignup} class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="name@example.com"
            required
            bind:value={email} 
          />
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            required
            bind:value={password} 
            placeholder="8+ characters"
          />
        </div>
        <div class="space-y-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            required
            bind:value={confirmPassword} 
            placeholder="Confirm your password"
          />
        </div>
        <Button 
          type="submit" 
          class="w-full" 
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
      
      <div class="mt-4 flex items-center">
        <Separator class="flex-1" />
        <span class="mx-2 text-xs text-muted-foreground">OR</span>
        <Separator class="flex-1" />
      </div>
      
      <Button 
        variant="outline" 
        class="w-full mt-4" 
        on:click={handleGoogleSignup}
        disabled={loading}
      >
        <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        Sign Up with Google
      </Button>
    </CardContent>
    <CardFooter>
      <p class="text-sm text-center w-full text-muted-foreground">
        Already have an account?
        <a href="/login" class="text-primary hover:underline">Sign in</a>
      </p>
    </CardFooter>
  </Card>
</div>
