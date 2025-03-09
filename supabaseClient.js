import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lylgebvldbxmautshmyx.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5bGdlYnZsZGJ4bWF1dHNobXl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTY5MzksImV4cCI6MjA1NzAzMjkzOX0.Loe-7v98TbgBtwz3CSSnNlGJgpET1eehekP-Csn3nFI'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
