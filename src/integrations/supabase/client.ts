import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://syjzriyieojgwmybgnuo.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5anpyaXlpZW9qZ3dteWJnbnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTc2OTcsImV4cCI6MjA4ODUzMzY5N30.ZzqaVGX52uUJhDzqfwDjEDQQANXrtaC77fbCUyw040w';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
