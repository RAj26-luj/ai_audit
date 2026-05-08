export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const prompt = `
You are an AI SaaS optimization consultant.

Generate a concise executive summary.

Yearly AI Spend:
$${body.yearlySpend}

Optimization Opportunity:
${body.waste}%

Recommendations:
${body.recommendations
  .map(
    (r: any) =>
      `- ${r.title}: ${r.description}`
  )
  .join("\n")}
`;

    const res =
      await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-large",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${process.env.HUGGINGFACE_API_KEY}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            inputs:
              prompt,
          }),
        }
      );
if (!res.ok) {

  return Response.json({
    summary: `
Your organization currently spends approximately $${body.yearlySpend.toLocaleString()} annually on AI tooling.

Our audit identified optimization opportunities across overlapping subscriptions, pricing inefficiencies, and seat allocation.

Based on your current stack, we estimate up to ${body.waste}% potential savings through AI stack consolidation and workflow optimization.
`,
  });
}
const text =
  await res.text();

let data;

try {

  data =
    JSON.parse(text);

} catch {

  return Response.json({
    summary:
      "AI summary generation temporarily unavailable.",
  });
}

    return Response.json({
      summary:
        data[0]
          ?.generated_text ||
        "AI summary unavailable.",
    });

  } catch (err) {

    console.error(err);

    return Response.json({
      summary:
        "AI summary unavailable.",
    });
  }
}