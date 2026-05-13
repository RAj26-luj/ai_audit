import type { Tool } from "../types/Tool";

//monthly spend
export default function calcMonthlySpend(
  stack: Tool[]
) {
  return stack.reduce(
    (acc, tool) =>
      acc + tool.pricePerSeat * tool.seats,
    0
  );
}