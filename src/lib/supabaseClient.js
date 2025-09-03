import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wefqzhqwxtuzuodrktyf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlZnF6aHF3eHR1enVvZHJrdHlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NzY1MzEsImV4cCI6MjA2NDQ1MjUzMX0.975J9hnTNpzrjzfPvS8cSCP2PB7s6_QFh5B6HLbybFA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);