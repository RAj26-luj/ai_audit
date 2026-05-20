import type { Tool } from "../types/Tool";

//monthly spend
export default function calcMonthlySpend(
  stack: Tool[]
) {
  return stack.reduce(
    (acc, tool) =>
      acc +
      (
        (tool.monthlyCost || tool.pricePerSeat || 0)
      ) *
      (tool.seats || 1),
    0
  );
}