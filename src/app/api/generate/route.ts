import { NextRequest, NextResponse } from "next/server";
import { generatePitchFromOpenAI } from "@/lib/openai/client";
import { supabase } from "@/lib/supabase/client";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const { description, targetCustomer, industry } = await req.json();

    // 1. Basic validation
    if (!description || !targetCustomer || !industry) {
      return NextResponse.json(
        { error: "Description, Target Customer, and Industry are required." },
        { status: 400 }
      );
    }

    // 2. Cookie-based Rate Limit Verification
    const cookies = req.cookies;
    const currentCount = parseInt(cookies.get("generation-count")?.value || "0", 10);
    const hasCapturedEmail = cookies.has("lead-email");

    if (currentCount >= 3 && !hasCapturedEmail) {
      return NextResponse.json(
        { error: "RATE_LIMIT_EXCEEDED", message: "You've generated 3 free pitches. Drop your email to keep generating." },
        { status: 403 }
      );
    }

    // 3. Pitch Generation (OpenAI API or mock fallback)
    const pitch = await generatePitchFromOpenAI(industry, description, targetCustomer);

    // 4. Save to Supabase (if connected)
    const shareSlug = nanoid(10);
    let insertedPitchId = null;

    if (supabase) {
      const { data, error } = await supabase
        .from("pitches")
        .insert({
          niche: industry,
          business_description: description,
          target_customer: targetCustomer,
          industry,
          generated_email: pitch.cold_email,
          generated_call_script: pitch.cold_call,
          generated_dm: pitch.linkedin_dm,
          share_slug: shareSlug,
        })
        .select("id")
        .single();

      if (error) {
        console.error("Failed to insert pitch in Supabase:", error);
      } else if (data) {
        insertedPitchId = data.id;

        // Log generated event in events table
        await supabase.from("events").insert({
          event_type: "generated",
          pitch_id: insertedPitchId,
        });
      }
    }

    // 5. Update generation count cookie
    const response = NextResponse.json({
      pitch,
      shareSlug,
      generationCount: currentCount + 1,
    });

    response.cookies.set("generation-count", String(currentCount + 1), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: true,
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    console.error("API error inside /api/generate:", error);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "Couldn't generate that one. Try a sharper description of what you sell." },
      { status: 500 }
    );
  }
}
