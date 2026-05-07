// home page types

export type StepType =
  | "landing"
  | "inputs"
  | "loading"
  | "results";

export type ToolDetail = {
  plan: string;

  seats: number;

  monthlySpend: number;
};

export type FormDataType = {
  selectedTools: string[];

  toolDetails: Record<
    string,
    ToolDetail
  >;
};