import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { sendAuditEmail }from "@/lib/email/sendAuditEmail";
import {getSimulatedVersion}from "../simulate-price-change/route";

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

if(
  audit.pricing_version !==
  getSimulatedVersion()
){
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