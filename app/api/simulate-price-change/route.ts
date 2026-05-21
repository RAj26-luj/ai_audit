import { NextResponse } from "next/server";

let simulatedVersion = 1;

export async function POST(){

  simulatedVersion++;

  return NextResponse.json({
    success:true,
    pricingVersion:simulatedVersion,
  });
}

export function getSimulatedVersion(){
  return simulatedVersion;
}