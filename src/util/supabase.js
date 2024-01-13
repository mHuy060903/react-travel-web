import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kelgvklglzidcrndbmjn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbGd2a2xnbHppZGNybmRibWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyNTk5MzMsImV4cCI6MjAwMzgzNTkzM30.GOXpFbO6VeIcfnuN7mZsfOcYfhwf-zSViH-2EBa_-p8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
