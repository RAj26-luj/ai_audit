"use client";

// main audit logic

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  generateAudit,
  AuditResult,
  ToolSelection,
} from "@/lib/audit";

import {
  TOOLS_CONFIG,
} from "@/data/tools";

import {
  supabase,
} from "@/lib/supabase";

import type {
  StepType,
  FormDataType,
} from "@/types/home";
import {
  generateAISummary,
} from "@/lib/ai-summary";
export function useHomeAudit() {

  const router =
    useRouter();

  // step
  const [step, setStep] =
    useState<StepType>(
      "landing"
    );

  // form
  const [formData, setFormData] =
    useState<FormDataType>({
      selectedTools: [],
      toolDetails: {},
      teamSize: 1,
      useCase: "coding",
    });

  // result
  const [
    auditResult,
    setAuditResult,
  ] =
    useState<AuditResult | null>(
      null
    );

  // modal
  const [
    showLeadModal,
    setShowLeadModal,
  ] = useState(false);

  // id
  const [auditId, setAuditId] =
    useState("");

  // restore
  useEffect(() => {

    const saved =
      localStorage.getItem(
        "audit-form"
      );

    if (saved) {

      setFormData(
        JSON.parse(saved)
      );
    }

  }, []);

  // save
  useEffect(() => {

    localStorage.setItem(
      "audit-form",
      JSON.stringify(
        formData
      )
    );

  }, [formData]);

  // run audit
const startAudit =
  async () => {

    setStep("loading");

    const tools: ToolSelection[] =
      formData.selectedTools.map(
        (toolId) => {

          const config =
            TOOLS_CONFIG.find(
              (t) =>
                t.id === toolId
            );

          const details =
            formData.toolDetails[
              toolId
            ];

          return {
            id: toolId,

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

    // generate
    const result =
      generateAudit({
        tools,
        teamSize:
          formData.teamSize,
        useCase:
          formData.useCase,
      });

    // ai summary
    const aiSummary =
      await generateAISummary({
        yearlySpend:
          result.totalYearlySpend,

        waste:
          result.potentialSavingsPercentage,

        recommendations:
          result.recommendations,
      });

    result.summary =
      aiSummary;

    // save
    const {
      data: savedAudit,
      error,
    } = await supabase
      .from("audits")
      .insert([
        {
          tools,
          result,
        },
      ])
      .select()
      .single();

    // fallback
    if (error) {

      console.error(error);

      setAuditResult(
        result
      );

      setStep("results");

      setShowLeadModal(
        true
      );

      return;
    }

    setAuditId(
      savedAudit.id
    );

    setTimeout(() => {

      setAuditResult(
        result
      );

      setStep("results");

      setShowLeadModal(
        true
      );

    }, 2500);
  };

  // lead submit
  const submitLead =
    async (leadData: any) => {

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
          console.error(error);
        }

        setShowLeadModal(
          false
        );

        router.push(
          `/audit/${auditId}`
        );

      } catch (err) {

        console.error(err);

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