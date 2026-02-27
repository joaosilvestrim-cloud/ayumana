import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gqyvkeduhwktgalrgwwx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxeXZrZWR1aHdrdGdhbHJnd3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTE5NzUsImV4cCI6MjA4Nzc2Nzk3NX0.puoGEYC1rlhoZCijLxttxYheWjRyPqe1yINOor1ileQ';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
