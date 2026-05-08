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

export type UseCaseType =
  | "coding"
  | "writing"
  | "research"
  | "data"
  | "mixed";

export type FormDataType = {
  selectedTools: string[];

  toolDetails: Record<
    string,
    ToolDetail
  >;

  teamSize: number;

  useCase: UseCaseType;
};