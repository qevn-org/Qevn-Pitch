const { createClient } = require("@supabase/supabase-js");

async function main() {
  const url = "https://byqwgswzoilcmfxjayrm.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cXdnc3d6b2lsY21meGpheXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDYyODksImV4cCI6MjA5NzUyMjI4OX0.DMdLZTae1JWLjm8DDoRlc2mylE8a1WDQtzdwkETiBY0";
  
  try {
    const supabase = createClient(url, key);
    console.log("Supabase client initialized.");
    console.log("Attempting insert...");
    const { data, error } = await supabase
      .from("pitches")
      .insert({
        niche: "saas",
        business_description: "test desc",
        target_customer: "test target",
        industry: "saas",
        generated_email: {},
        generated_call_script: {},
        generated_dm: {},
        share_slug: "test-slug-123",
      })
      .select("id")
      .single();
      
    if (error) {
      console.log("Returned Error:", error.message);
    } else {
      console.log("Returned Data:", data);
    }
  } catch (err) {
    console.error("CATHE ERROR DETECTED DURING INSERT:", err);
  }
}
main();
