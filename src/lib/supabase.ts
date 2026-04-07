import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️ Supabase credentials missing! Linear components requiring real data will fail. " +
    "Check your .env file or environment variables."
  );
}

// This is a singleton instance of the Supabase client
export const supabase = createClient(
    supabaseUrl || 'https://mock-supabase-url.supabase.co', 
    supabaseKey || 'public-anon-key'
);
