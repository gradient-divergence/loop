<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
  import { Badge } from "$lib/components/ui/badge";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { authStore } from "$lib/stores/authStore";
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabaseClient";
  
  // Import types if available
  export let data;
  
  // Get search history from server load function
  let searchHistory = data.searchHistory;
  
  // Reactive state
  let isDeleting = false;
  let selectedItems: string[] = [];
  
  // Format date for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
  
  // Execute a search from history
  function executeSearch(query: string) {
    goto(`/?q=${encodeURIComponent(query)}`);
  }
  
  // Delete a search item
  async function deleteSearchItem(id: string) {
    isDeleting = true;
    
    try {
      const { error } = await supabase
        .from('search_history')
        .delete()
        .eq('id', id)
        .eq('user_id', $authStore.user?.id);
      
      if (error) throw error;
      
      // Update the UI after deletion
      searchHistory = searchHistory.filter(item => item.id !== id);
    } catch (err) {
      console.error('Error deleting search item:', err);
      // You could add a toast notification here
    } finally {
      isDeleting = false;
    }
  }
  
  // Clear all search history
  async function clearAllHistory() {
    if (!confirm('Are you sure you want to clear your entire search history?')) return;
    
    isDeleting = true;
    
    try {
      const { error } = await supabase
        .from('search_history')
        .delete()
        .eq('user_id', $authStore.user?.id);
      
      if (error) throw error;
      
      // Clear the UI
      searchHistory = [];
    } catch (err) {
      console.error('Error clearing search history:', err);
      // You could add a toast notification here
    } finally {
      isDeleting = false;
    }
  }
  
  // Toggle item selection
  function toggleSelection(id: string) {
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(item => item !== id);
    } else {
      selectedItems = [...selectedItems, id];
    }
  }
  
  // Delete selected items
  async function deleteSelected() {
    if (!selectedItems.length) return;
    if (!confirm(`Are you sure you want to delete ${selectedItems.length} selected items?`)) return;
    
    isDeleting = true;
    
    try {
      const { error } = await supabase
        .from('search_history')
        .delete()
        .in('id', selectedItems)
        .eq('user_id', $authStore.user?.id);
      
      if (error) throw error;
      
      // Update the UI
      searchHistory = searchHistory.filter(item => !selectedItems.includes(item.id));
      selectedItems = [];
    } catch (err) {
      console.error('Error deleting selected items:', err);
    } finally {
      isDeleting = false;
    }
  }
</script>

<svelte:head>
  <title>Search History | Loop</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold tracking-tight">Your Search History</h1>
    
    <div class="flex space-x-2">
      {#if selectedItems.length > 0}
        <Button 
          variant="destructive" 
          on:click={deleteSelected} 
          disabled={isDeleting}
        >
          Delete Selected ({selectedItems.length})
        </Button>
      {/if}
      
      <Button 
        variant="outline" 
        on:click={clearAllHistory} 
        disabled={isDeleting || searchHistory.length === 0}
      >
        Clear All History
      </Button>
    </div>
  </div>
  
  {#if searchHistory.length === 0}
    <Card>
      <CardContent class="pt-6">
        <div class="text-center py-12">
          <h3 class="text-lg font-medium">No search history found</h3>
          <p class="text-muted-foreground mt-2">
            Your search history will appear here once you start searching for products.
          </p>
          <Button class="mt-4" on:click={() => goto('/')}>
            Start Searching
          </Button>
        </div>
      </CardContent>
    </Card>
  {:else}
    <Card>
      <CardHeader>
        <CardTitle>Recent Searches</CardTitle>
        <CardDescription>
          Your last {searchHistory.length} searches are shown here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-12">
                <div class="flex items-center">
                  <input 
                    type="checkbox"
                    class="form-checkbox h-4 w-4"
                    checked={selectedItems.length === searchHistory.length && searchHistory.length > 0}
                    indeterminate={selectedItems.length > 0 && selectedItems.length < searchHistory.length}
                    on:change={() => {
                      if (selectedItems.length === searchHistory.length) {
                        selectedItems = [];
                      } else {
                        selectedItems = searchHistory.map(item => item.id);
                      }
                    }}
                  />
                </div>
              </TableHead>
              <TableHead>Search Query</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Results</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each searchHistory as item}
              <TableRow>
                <TableCell>
                  <input 
                    type="checkbox"
                    class="form-checkbox h-4 w-4"
                    checked={selectedItems.includes(item.id)}
                    on:change={() => toggleSelection(item.id)}
                  />
                </TableCell>
                <TableCell class="font-medium">
                  {item.query}
                  {#if item.filters}
                    <div class="mt-1 flex flex-wrap gap-1">
                      {#each Object.entries(item.filters) as [key, value]}
                        <Badge variant="outline" class="text-xs">
                          {key}: {value}
                        </Badge>
                      {/each}
                    </div>
                  {/if}
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger>
                      {formatDate(item.created_at)}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{new Date(item.created_at).toLocaleString()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>{item.result_count || 0} items</TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      on:click={() => executeSearch(item.query)}
                    >
                      Search Again
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      disabled={isDeleting}
                      on:click={() => deleteSearchItem(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  {/if}
</div>



