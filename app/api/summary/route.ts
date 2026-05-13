import { NextResponse } from "next/server";

import buildSummaryPrompt from "./prompts/buildSummaryPrompt";

import generateSummary from "./services/generateSummary";

import fallbackSummary from "./utils/fallbackSummary";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const yearlySpend =
      Number(
        body?.yearlySpend
      ) || 0;

    const waste =
      Number(
        body?.waste
      ) || 0;

    const recommendations =
      Array.isArray(
        body?.recommendations
      )
        ? body.recommendations
        : [];

    const prompt =
      buildSummaryPrompt(
        yearlySpend,
        waste,
        recommendations
      );

    const result =
      await generateSummary(
        prompt
      );

    if (result) {

      return NextResponse.json(
        result
      );
    }

    return NextResponse.json({

      success: false,

      fallback: true,

      summary:
        fallbackSummary(
          yearlySpend,
          waste
        ),
    });

  } catch (err) {

    console.error(
      "SUMMARY API ERROR:",
      err
    );

    return NextResponse.json(
      {

        success: false,

        summary:
          "AI summary generation is temporarily unavailable.",
      },
      {
        status: 500,
      }
    );
  }
}