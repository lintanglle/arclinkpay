import { createClient } from "@supabase/supabase-js";
import { hasSupabaseServerEnv } from "./config";

export function createSupabaseServerClient() {
  if (!hasSupabaseServerEnv()) {
    return null;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
      },
    },
  );
}
