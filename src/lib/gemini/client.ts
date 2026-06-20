import { GoogleGenerativeAI } from "@google/generative-ai";
import { INDUSTRIES } from "../constants";

export interface PitchData {
  cold_email: {
    subject: string;
    body: string;
  };
  cold_call: {
    script: string;
    duration_estimate: string;
  };
  linkedin_dm: {
    message: string;
    character_count: number;
  };
}

export const GEMINI_SYSTEM_PROMPT = `Write a sales pitch bundle in JSON. Avoid generic AI fluff. Tone must be human and direct.
Inputs: Niche, Description, Target. 
Output JSON Schema:
{
  "cold_email": {
    "subject": "Intriguing subject under 8 words",
    "body": "Value opening, clear solution, soft CTA. Max 4 short paragraphs. Use newlines (\\\\n) for paragraphs."
  },
  "cold_call": {
    "script": "Natural 15s spoken script (~40 words) introducing self, reason, and hook.",
    "duration_estimate": "15 seconds"
  },
  "linkedin_dm": {
    "message": "Conversational text under 300 chars.",
    "character_count": 250
  }
}`;

export async function generatePitchFromGemini(
  industry: string,
  description: string,
  targetCustomer: string
): Promise<PitchData> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined. Falling back to mock content.");
    return getFallbackPitch(industry, description, targetCustomer);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: GEMINI_SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const userPrompt = `Industry: ${industry}\nDescription: ${description}\nTarget Customer: ${targetCustomer}`;
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    const parsed = JSON.parse(text) as PitchData;
    return parsed;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Graceful fallback to pre-generated content
    return getFallbackPitch(industry, description, targetCustomer);
  }
}

function getFallbackPitch(
  industry: string,
  description: string,
  targetCustomer: string
): PitchData {
  const found = INDUSTRIES.find((ind) => ind.slug === industry) || INDUSTRIES[0];
  
  const emailBody = found.examples.email.body
    .replace(/\{\{Company\}\}/g, "your prospect's team")
    .replace(/\{\{Name\}\}/g, "there")
    .replace(/\{\{City\}\}/g, "your target city");

  const emailSubject = found.examples.email.subject
    .replace(/\{\{Company\}\}/g, "your prospect")
    .replace(/\{\{City\}\}/g, "your region");

  const callScript = found.examples.call.script
    .replace(/\{\{Name\}\}/g, "there")
    .replace(/\{\{Company\}\}/g, "your team");

  const dmMessage = found.examples.dm.message
    .replace(/\{\{Name\}\}/g, "there");

  return {
    cold_email: {
      subject: emailSubject,
      body: emailBody,
    },
    cold_call: {
      script: callScript,
      duration_estimate: found.examples.call.duration,
    },
    linkedin_dm: {
      message: dmMessage,
      character_count: dmMessage.length,
    },
  };
}
