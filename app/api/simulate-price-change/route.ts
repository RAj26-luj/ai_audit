import { NextResponse }
from "next/server";

import { TOOLS_CONFIG }
from "@/data/tools";

let simulatedVersion = 1;

export async function POST(){

  simulatedVersion++;

  //simulate real pricing change
  const cursorTool =
    TOOLS_CONFIG.find(
      tool=>tool.id==="cursor"
    );

  if(cursorTool){

    cursorTool.basePrice.Business =
      cursorTool.basePrice.Business + 5;
  }

  return NextResponse.json({

    success:true,

    pricingVersion:
      simulatedVersion,

    updatedPrice:
      cursorTool?.basePrice
        .Business,
  });
}

export function
getSimulatedVersion(){

  return simulatedVersion;
}