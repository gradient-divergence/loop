<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import BokehBackground from '$lib/components/layout/BokehBackground.svelte';
	
	const appName = 'Loop';
</script>

<BokehBackground intensity="medium">
	<Header {appName} />

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-13rem)]">
		<slot></slot>
	</main>

	<Footer {appName} />
</BokehBackground>
