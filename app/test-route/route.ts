import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createClient();
  const { data } = await supabase.from("notes").select();

  // URL to redirect to after sign in process completes
  return NextResponse.json(data);
}
