import type { Tool } from "./Tool";

//audit input
export interface AuditInput {
  stack: Tool[];
  teamSize: number;
  engineeringTeamSize: number;
  primaryUseCase: string;
}