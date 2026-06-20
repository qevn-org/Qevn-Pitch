const { createClient } = require("@supabase/supabase-js");

async function main() {
  const url = "https://byqwgswzoilcmfxjayrm.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cXdnc3d6b2lsY21meGpheXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDYyODksImV4cCI6MjA5NzUyMjI4OX0.DMdLZTae1JWLjm8DDoRlc2mylE8a1WDQtzdwkETiBY0";
  
  try {
    const supabase = createClient(url, key);
    console.log("Supabase client initialized.");
    const { data, error } = await supabase
      .from("pitches")
      .select("*")
      .limit(1);
    if (error) {
      console.error("Supabase Error:", error.message);
    } else {
      console.log("Success! Data:", data);
    }
  } catch (err) {
    console.error("Supabase Catch Error:", err);
  }
}
main();
