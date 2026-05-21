import { supabase }
from "@/lib/supabase";

interface SaveAuditProps{

  email:string;

  inputJson:any;

  resultJson:any;

  pricingSnapshot:any;

  pricingVersion:number;
}

export async function saveAudit({

  email,

  inputJson,

  resultJson,

  pricingSnapshot,

  pricingVersion,

}:SaveAuditProps){

  const { data,error } =

    await supabase

      .from("audits")

      .insert([
        {

          email,

          tools:
            inputJson?.stack || [],

          input_json:
            inputJson,

          result_json:
            resultJson,

          pricing_snapshot:
            pricingSnapshot,

          pricing_version:
            pricingVersion,

          updated_result_json:
            null,
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