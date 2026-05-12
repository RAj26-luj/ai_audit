import { NextResponse } from "next/server";

const MODELS = [
  "google/gemini-3.1-flash-lite",
  "openai/gpt-4.1-mini",
  "mistralai/mistral-small-3.1",
];

const FALLBACK_SUMMARY = (
  yearlySpend: number,
  waste: number
) => `
Your organization currently spends approximately $${yearlySpend?.toLocaleString()} annually on AI tooling.

The audit identified optimization opportunities across overlapping subscriptions, pricing inefficiencies, and seat allocation.

An estimated ${waste}% reduction in AI spend may be achievable while maintaining productivity and workflow quality.
`.trim();

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

    const formattedRecommendations =
      recommendations.length
        ? recommendations
            .map(
              (r: any) =>
                `- ${r.title}: ${r.description}`
            )
            .join("\n")
        : "- No major optimization recommendations detected.";

    const prompt = `
You are an expert AI SaaS optimization consultant.

Generate a concise executive summary for a company AI infrastructure audit.

Requirements:
- professional tone
- executive-friendly
- concise
- under 150 words
- mention savings opportunity
- explain major inefficiencies
- summarize key recommendation impact

Company AI Spend:
$${yearlySpend}

Optimization Opportunity:
${waste}%

Recommendations:
${formattedRecommendations}
`;

    for (const model of MODELS) {

      try {

        const res =
          await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              method: "POST",

              headers: {

                Authorization:
                  `Bearer ${process.env.OPENROUTER_API_KEY}`,

                "Content-Type":
                  "application/json",

                "HTTP-Referer":
                  "http://localhost:3000",

                "X-Title":
                  "StackAudit",
              },

              body: JSON.stringify({

                model,

                messages: [
                  {
                    role: "system",

                    content:
                      "You are a senior AI infrastructure optimization consultant specializing in SaaS cost analysis.",
                  },
                  {
                    role: "user",

                    content:
                      prompt,
                  },
                ],

                temperature: 0.6,

                max_tokens: 220,
              }),
            }
          );

        // FAILED REQUEST

        if (!res.ok) {

          const err =
            await res.json();

          console.error(
            `MODEL FAILED: ${model}`,
            err
          );

          continue;
        }

        const data =
          await res.json();

        const summary =
          data?.choices?.[0]
            ?.message?.content;

        // SUCCESS

        if (
          summary &&
          typeof summary ===
            "string"
        ) {

          return NextResponse.json({

            success: true,

            model,

            summary:
              summary.trim(),
          });
        }

      } catch (err) {

        console.error(
          `MODEL ERROR: ${model}`,
          err
        );
      }
    }

    // FALLBACK

    return NextResponse.json({

      success: false,

      fallback: true,

      summary:
        FALLBACK_SUMMARY(
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