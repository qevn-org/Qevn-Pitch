import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const { email, pitchId } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Save lead in Supabase (if connected)
    if (supabase) {
      const { data, error } = await supabase
        .from("leads")
        .insert({
          email,
          source_pitch_id: pitchId || null,
        })
        .select("id")
        .single();

      if (error) {
        console.error("Failed to insert lead in Supabase:", error);
      } else if (data) {
        // Log captured event to events table
        await supabase.from("events").insert({
          event_type: "captured",
          pitch_id: pitchId || null,
        });
      }
    }

    const response = NextResponse.json({ success: true, email });

    // Set cookies to remember the email and unlock the rate limit
    response.cookies.set("lead-email", email, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: false, // Accessible to client components
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("API error inside /api/lead:", error);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "Failed to save lead." },
      { status: 500 }
    );
  }
}
