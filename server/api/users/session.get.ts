import { createClient } from "@supabase/supabase-js";

const supabase_url = "https://nsfipxnlucvgchlkqvqw.supabase.co";
const anon_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZmlweG5sdWN2Z2NobGtxdnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NjA0MzgsImV4cCI6MTk5MDQzNjQzOH0.ieuplz2wsoohp3BSuHsm9BNNlAIWHZqGnd2kBLcpQbk";
const supabase = createClient(supabase_url, anon_key);

export default defineEventHandler(async (event) => {
  const { data, error } = await supabase.auth.getSession();

  return { data};
});
