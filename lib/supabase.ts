import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "sb_publishable_XD_6cMHGp7YqDKT0HVIK0g_z3o-eVEb",
  { auth: { autoRefreshToken: false, persistSession: false } }
);
