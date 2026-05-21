import { NextResponse }
from "next/server";

import { supabase }
from "@/lib/supabase";

import { sendAuditEmail }
from "@/lib/email/sendAuditEmail";

import {
  getSimulatedVersion
}
from "../simulate-price-change/route";

export async function POST(){

  try{

    const {
      data:audits,
      error,
    } = await supabase
      .from("audits")
      .select("*");

    if(error){
      throw error;
    }

    const changedAudits=[];

    //find changed audits
    for(
      const audit of audits || []
    ){

      if(
        audit.pricing_version !==
        getSimulatedVersion()
      ){

        changedAudits.push({

          auditId:audit.id,

          email:audit.email,
        });
      }
    }

    //group by email
    const groupedByEmail:
    Record<string,any[]> = {};

    for(
      const audit of changedAudits
    ){

      if(!audit.email){
        continue;
      }

      if(
        !groupedByEmail[
          audit.email
        ]
      ){

        groupedByEmail[
          audit.email
        ] = [];
      }

      groupedByEmail[
        audit.email
      ].push(audit);
    }

    //send one email per user
    for(
      const email
      in groupedByEmail
    ){

      await sendAuditEmail({

        to:email,

        audits:
          groupedByEmail[email],
      });
    }

    return NextResponse.json({

      success:true,

      changedAudits,

      total:
        changedAudits.length,
    });

  }catch(err){

    console.error(err);

    return NextResponse.json(
      {
        error:
          "detect changes failed",
      },
      {
        status:500,
      }
    );
  }
}