import { MODELS } from "../constants/models";

import openrouter from "./openrouter";

//generate summary
export default async function generateSummary(
  prompt: string
) {

  //try models
  for (const model of MODELS) {

    try {

      const res =
        await openrouter(model, prompt);

      //request failed
      if (!res.ok) {

        const err = await res.json();

        console.error(
          `MODEL FAILED: ${model}`,
          err
        );

        continue;
      }

      const data = await res.json();

      const summary =
        data?.choices?.[0]?.message?.content;

      //valid response
      if (
        summary &&
        typeof summary === "string"
      ) {

        return {
          success: true,
          model,

          summary:
            summary.trim(),
        };
      }

    } catch (err) {

      //model error
      console.error(
        `MODEL ERROR: ${model}`,
        err
      );
    }
  }

  return null;
}