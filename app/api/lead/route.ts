import { NextResponse } from "next/server";

import { supabase }
from "@/lib/supabase";

export async function POST(
  req:Request
){

  try{

    const body =
      await req.json();

    const {
      email,
      company,
      role,
      teamSize,
      auditId,
    } = body;

    const { error } =
      await supabase
        .from("leads")
        .insert([
          {

            email,

            company,

            role,

            team_size:
              teamSize,

            audit_id:
              auditId,
          },
        ]);

    if(error){
      throw error;
    }

    return NextResponse.json({
      success:true,
    });

  }catch(err){

    console.error(err);

    return NextResponse.json(
      {
        error:
          "Lead save failed",
      },
      {
        status:500,
      }
    );
  }
}