const payloads = [
  { description: "DevOps agency helping startups scale infrastructure", targetCustomer: "Tech startups", industry: "saas" },
  { description: "Real estate brokerage in New York", targetCustomer: "Homebuyers", industry: "real-estate" },
  { description: "Clinic offering dental implants", targetCustomer: "Older adults", industry: "healthcare" },
  { description: "Boutique hotel in Paris", targetCustomer: "Travelers", industry: "hospitality" }
];

async function main() {
  for (const payload of payloads) {
    try {
      console.log(`Sending payload for industry: ${payload.industry}`);
      const response = await fetch("http://localhost:3000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log(`Status: ${response.status}`);
      if (response.ok) {
        console.log(`Success! Pitch email subject: ${data.pitch.cold_email.subject}`);
      } else {
        console.error(`Error: ${data.message || data.error}`);
      }
    } catch (err) {
      console.error("Fetch failed:", err.message);
    }
  }
}
main();
