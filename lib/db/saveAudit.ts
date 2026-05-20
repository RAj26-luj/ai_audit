import { supabase } from "@/lib/supabase";

interface SaveAuditProps {
  email:string;
  inputJson:any;
  resultJson:any;
  pricingSnapshot:any;
}

export async function saveAudit({
  email,
  inputJson,
  resultJson,
  pricingSnapshot,
}:SaveAuditProps){

  const { data,error } =
    await supabase
      .from("audits")
      .insert([
        {
          email,
          input_json:inputJson,
          result_json:resultJson,
          pricing_snapshot:pricingSnapshot,
        },
      ])
      .select()
      .single();

  if(error){
    console.error(
      "SAVE_AUDIT_ERROR",
      error
    );

    return null;
  }

  return data;
}