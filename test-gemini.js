const { GoogleGenerativeAI } = require("@google/generative-ai");

const modelsToTest = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro",
  "gemini-2.5-flash",
  "gemini-1.0-pro"
];

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  for (const modelName of modelsToTest) {
    try {
      console.log(`Testing model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello");
      console.log(`Success with ${modelName}! Response:`, result.response.text().trim());
      return;
    } catch (err) {
      console.log(`Failed for ${modelName}:`, err.message);
    }
  }
}
main();
