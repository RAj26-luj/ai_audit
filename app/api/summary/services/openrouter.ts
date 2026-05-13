//openrouter api
export default async function openrouter(
  model: string,
  prompt: string
) {

  const res = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "StackAudit",
      },

      body: JSON.stringify({
        model,

        messages: [
          {
            role: "system",
            content: "You are a senior AI infrastructure optimization consultant specializing in SaaS cost analysis.",
          },

          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.6,
        max_tokens: 220,
      }),
    }
  );

  return res;
}