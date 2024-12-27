// utils/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';  // Import the createClient function from the Supabase SDK

// Fetch the Supabase URL and anon key from environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;  // The URL for your Supabase instance
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;  // The anon key for accessing the Supabase API

// Create and export the Supabase client instance with the provided URL and anon key
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
