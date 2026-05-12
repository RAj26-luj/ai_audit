export async function generateAISummary(
  data: {
    yearlySpend: number;

    waste: number;

    recommendations: {
      title: string;

      description: string;
    }[];
  }
) {

  try {

    const res =
      await fetch(
        "/api/summary",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              data
            ),
        }
      );

    if (!res.ok) {

      return `
Your organization currently spends approximately $${data.yearlySpend.toLocaleString()} annually on AI tooling.

The audit identified optimization opportunities across pricing inefficiencies,
seat allocation,
and overlapping subscriptions.

Estimated savings potential is approximately ${data.waste}% through stack optimization and workflow consolidation.
`;
    }

    const json =
      await res.json();

    return (
      json.summary ||
      "AI summary unavailable."
    );

  } catch (err) {

    console.error(err);

    return `
Your organization currently spends approximately $${data.yearlySpend.toLocaleString()} annually on AI tooling.

The audit identified optimization opportunities across pricing inefficiencies,
seat allocation,
and overlapping subscriptions.

Estimated savings potential is approximately ${data.waste}% through stack optimization and workflow consolidation.
`;
  }
}