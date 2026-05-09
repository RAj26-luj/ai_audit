import {
  generateAudit,
} from "../lib/audit";

describe(
  "audit engine",
  () => {

    test(
      "detects llm overlap",
      () => {

        const result =
          generateAudit({
            teamSize: 2,

            useCase:
              "coding",

            tools: [
              {
                id: "chatgpt",
                name: "ChatGPT",
                plan: "Plus",
                pricePerSeat: 20,
                seats: 2,
              },

              {
                id: "claude",
                name: "Claude",
                plan: "Pro",
                pricePerSeat: 20,
                seats: 2,
              },
            ],
          });

        expect(
          result.recommendations.length
        ).toBeGreaterThan(0);
      }
    );

    test(
      "calculates yearly spend",
      () => {

        const result =
          generateAudit({
            teamSize: 1,

            useCase:
              "coding",

            tools: [
              {
                id: "cursor",
                name: "Cursor",
                plan: "Pro",
                pricePerSeat: 20,
                seats: 1,
              },
            ],
          });

        expect(
          result.totalYearlySpend
        ).toBe(240);
      }
    );

    test(
      "detects seat mismatch",
      () => {

        const result =
          generateAudit({
            teamSize: 2,

            useCase:
              "coding",

            tools: [
              {
                id: "copilot",
                name: "GitHub Copilot",
                plan: "Business",
                pricePerSeat: 19,
                seats: 5,
              },
            ],
          });

        expect(
          result.recommendations.some(
            (r) =>
              r.title.includes(
                "Reduce"
              )
          )
        ).toBe(true);
      }
    );

    test(
      "calculates optimization score",
      () => {

        const result =
          generateAudit({
            teamSize: 2,

            useCase:
              "coding",

            tools: [],
          });

        expect(
          result.optimizationScore
        ).toBeGreaterThan(0);
      }
    );

    test(
      "calculates spend per employee",
      () => {

        const result =
          generateAudit({
            teamSize: 2,

            useCase:
              "coding",

            tools: [
              {
                id: "chatgpt",
                name: "ChatGPT",
                plan: "Plus",
                pricePerSeat: 20,
                seats: 2,
              },
            ],
          });

        expect(
          result.spendPerEmployee
        ).toBe(20);
      }
    );
  }
);