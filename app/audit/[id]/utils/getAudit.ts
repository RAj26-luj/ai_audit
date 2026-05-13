import { supabase } from "@/lib/supabase";

//get audit
export default async function getAudit(
  id: string
) {

  const { data, error } =
    await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

  return { data, error };
}