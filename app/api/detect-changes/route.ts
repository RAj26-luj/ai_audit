import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { TOOLS_CONFIG } from "@/data/tools";
import { sendAuditEmail }
from "@/lib/email/sendAuditEmail";

export async function POST() {

  try {

    const { data:audits,error } =
      await supabase
        .from("audits")
        .select("*");

    if(error){
      throw error;
    }

    const changedAudits = [];

    for(const audit of audits || []){

      const oldPricing =
        JSON.stringify(
          audit.pricing_snapshot
        );

      const currentPricing =
        JSON.stringify(
          TOOLS_CONFIG
        );

      if(oldPricing !== currentPricing){
        if(audit.email){

        await sendAuditEmail({
        to:audit.email,
        auditId:audit.id,
        });
}
        changedAudits.push({
          auditId:audit.id,
          email:audit.email,
        });
      }
    }

    return NextResponse.json({
      success:true,
      changedAudits,
      total:
        changedAudits.length,
    });

  } catch(err){

    console.error(err);

    return NextResponse.json(
      {
        error:"detect changes failed",
      },
      {
        status:500,
      }
    );
  }
}