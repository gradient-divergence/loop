import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Check auth status from locals (you need to set this up in your hooks.server.ts)
  if (!locals.session) {
    throw redirect(303, '/login');
  }
  
  return {
    // Return any data needed by the page
  };
};
