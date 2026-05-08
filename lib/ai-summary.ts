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

  const res =
    await fetch(
      "/api/summary",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          data
        ),
      }
    );

  const json =
    await res.json();

  return json.summary;
}