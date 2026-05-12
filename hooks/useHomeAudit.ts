"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  supabase,
} from "@/lib/supabase";

import {
  TOOLS_CONFIG,
} from "@/data/tools";

import type {
  StepType,
  FormDataType,
} from "@/types/home";

export function useHomeAudit() {

  const router =
    useRouter();

  // STEP

  const [
    step,
    setStep,
  ] =
    useState<StepType>(
      "landing"
    );

  // FORM

  const [
    formData,
    setFormData,
  ] =
    useState<FormDataType>({
      selectedTools: [],
      toolDetails: {},
      teamSize: 1,
      useCase: "coding",
    });

  // RESULT

  const [
    auditResult,
    setAuditResult,
  ] =
    useState<any>(
      null
    );

  // LEAD MODAL

  const [
    showLeadModal,
    setShowLeadModal,
  ] =
    useState(false);

  // TEMP AUDIT ID

  const [
    auditId,
  ] =
    useState(
      crypto.randomUUID()
    );

  // MAIN AUDIT

  const startAudit =
    async () => {

      try {

        setStep(
          "loading"
        );

        // BUILD STACK

        const tools =
          formData.selectedTools.map(
            (toolId) => {

              const config =
                TOOLS_CONFIG.find(
                  (t) =>
                    t.id ===
                    toolId
                );

              const details =
                formData.toolDetails[
                  toolId
                ];

              return {

                id:
                  toolId,

                name:
                  config?.name ||
                  toolId,

                plan:
                  details?.plan ||
                  "Pro",

                pricePerSeat:
                  details?.monthlySpend ||
                  20,

                seats:
                  details?.seats ||
                  1,
              };
            }
          );

        // FULL STACK PAYLOAD

        const payload = {

          stack:
            tools,

          originalStack:
            tools,

          teamSize:
            formData.teamSize,

          useCase:
            formData.useCase,
        };

        // OPTIMIZATION API

        const res =
          await fetch(
            "/api/optimize",
            {

              method:
                "POST",

              headers: {

                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  payload
                ),
            }
          );

        const result =
          await res.json();

        // AI SUMMARY API

        let summary =
          "AI summary unavailable.";

        try {

          const summaryRes =
            await fetch(
              "/api/summary",
              {

                method:
                  "POST",

                headers: {

                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify({
                    yearlySpend:
                      result.yearlySavings ||
                      0,

                    waste:
                      result.savingsPercentage ||
                      0,

                    recommendations:
                      result.recommendations ||
                      [],
                  }),
              }
            );

          const summaryData =
            await summaryRes.json();

          summary =
            summaryData?.summary ||
            summary;

        } catch (err) {

          console.error(
            "SUMMARY ERROR:",
            err
          );
        }

        // FINAL RESULT

        const finalResult = {

          id:
            auditId,

          ...result,

          summary,

          tools,
        };

        // SAVE RESULT LOCALLY

        setAuditResult(
          finalResult
        );

        // SAVE AUDIT IN DB

        await supabase
          .from("audits")
          .insert([
            {
              id:
                auditId,

              result:
                finalResult,
            },
          ]);

        // SHOW RESULTS

        setTimeout(() => {

          setStep(
            "results"
          );

          setShowLeadModal(
            true
          );

        }, 1800);

      } catch (err) {

        console.error(
          err
        );

        setStep(
          "inputs"
        );
      }
    };

  // SAVE LEAD INFO

  const submitLead =
    async (
      leadData: {
        email: string;
        company: string;
        role: string;
        teamSize: number;
      }
    ) => {

      try {

        const {
          error,
        } = await supabase
          .from("leads")
          .insert([
            {

              email:
                leadData.email,

              company:
                leadData.company,

              role:
                leadData.role,

              team_size:
                leadData.teamSize,

              audit_id:
                auditId,
            },
          ]);

        if (error) {

          console.error(
            error
          );
        }

        setShowLeadModal(
          false
        );

        router.push(
          `/audit/${auditId}`
        );

      } catch (err) {

        console.error(
          err
        );

        setShowLeadModal(
          false
        );
      }
    };

  return {

    step,
    setStep,

    formData,
    setFormData,

    auditResult,

    showLeadModal,
    setShowLeadModal,

    startAudit,

    submitLead,
  };
}