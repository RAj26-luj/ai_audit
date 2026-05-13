import type { AuditInput } from "./AuditInput";
import type { Recommendation } from "./Recommendation";

//audit rule
export interface AuditRule {
  id: string;

  evaluate(
    input: AuditInput
  ): Recommendation[];
}