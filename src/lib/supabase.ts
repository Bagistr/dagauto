import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cipsjpwojdznihahvhji.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpcHNqcHdvamR6bmloYWh2aGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MjkxNDIsImV4cCI6MjEwMzAwNTE0Mn0.10HjhqNa94U9D0t8nSCkM7bxTp_gQjdtAcyf-s3MyH4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
