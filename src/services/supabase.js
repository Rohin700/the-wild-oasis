import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pqtfruykrqtxnctztytp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxdGZydXlrcnF0eG5jdHp0eXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3Nzc2ODcsImV4cCI6MjA5NTM1MzY4N30.IFUAs0flESIbdvVARcSKNHrTp8HUzSURJZfMxqoSJW4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
