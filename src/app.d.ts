// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			supabase: SupabaseClient;
			session: Session | null;
		}
	}
	
	interface ImportMetaEnv {
		PUBLIC_SHOPIFY_STORE_DOMAIN: string;
		PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: string;
	}
}

export {};
