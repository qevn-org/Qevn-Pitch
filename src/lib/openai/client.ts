import OpenAI from "openai";
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

export const OPENAI_SYSTEM_PROMPT = `You are an expert sales copywriter. Write a sales pitch bundle in JSON.
Avoid generic AI fluff. Tone must be human and direct.
Inputs: Niche, Description, Target.

You must output a single JSON object matching the schema below:
{
  "cold_email": {
    "subject": "Intriguing subject line under 8 words",
    "body": "Value opening, clear solution, soft CTA. Max 4 short paragraphs. Use newlines (\\n) for paragraphs."
  },
  "cold_call": {
    "script": "Natural 15s spoken script (~40 words) introducing yourself, reason for calling, and a hook.",
    "duration_estimate": "15 seconds"
  },
  "linkedin_dm": {
    "message": "Conversational message text under 300 characters.",
    "character_count": 250
  }
}`;

export async function generatePitchFromOpenAI(
  industry: string,
  description: string,
  targetCustomer: string
): Promise<PitchData> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("OPENAI_API_KEY is not defined. Falling back to mock content.");
    return getFallbackPitch(industry, description, targetCustomer);
  }

  try {
    const openai = new OpenAI({ apiKey });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: OPENAI_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Industry: ${industry}\nDescription: ${description}\nTarget Customer: ${targetCustomer}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const text = response.choices[0].message.content || "{}";
    const parsed = JSON.parse(text) as PitchData;
    return parsed;
  } catch (error) {
    console.error("OpenAI API call failed:", error);
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
