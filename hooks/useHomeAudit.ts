"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { TOOLS_CONFIG } from "@/data/tools";

import type {
  StepType,
  FormDataType,
} from "@/types/home";
import { supabase }
from "@/lib/supabase";

//home audit hook
export function useHomeAudit() {

  const router = useRouter();

  //step
  const [step,setStep] =
    useState<StepType>(
      "landing"
    );

  //form
  const [formData,setFormData] =
    useState<FormDataType>({
      selectedTools:[],
      toolDetails:{},
      teamSize:1,
      useCase:"coding",
    });

  //result
  const [auditResult,setAuditResult] =
    useState<any>(null);

  //lead modal
  const [
    showLeadModal,
    setShowLeadModal,
  ] = useState(false);

  //start audit
  const startAudit = async () => {

    try{

      setStep("loading");

      //build stack
      const tools =
        formData.selectedTools.map(
          (toolId)=>{

            const config =
              TOOLS_CONFIG.find(
                t=>t.id===toolId
              );

            const details =
              formData.toolDetails[
                toolId
              ];

            return {

              id:toolId,

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

      //payload
      const payload = {

        stack:tools,

        originalStack:tools,

        teamSize:
          formData.teamSize,

        useCase:
          formData.useCase,
      };

      //optimize api
      const res =
        await fetch(
          "/api/optimize",
          {
            method:"POST",

            headers:{
              "Content-Type":
                "application/json",
            },

            body:JSON.stringify(
              payload
            ),
          }
        );

      const result =
        await res.json();

      //summary api
      let summary =
        "AI summary unavailable.";

      try{

        const summaryRes =
          await fetch(
            "/api/summary",
            {
              method:"POST",

              headers:{
                "Content-Type":
                  "application/json",
              },

              body:JSON.stringify({
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

      }catch(err){

        console.error(
          "SUMMARY ERROR:",
          err
        );
      }

      //final result
      const finalResult = {

        id:
          result.auditId,

        ...result,

        summary,

        tools,
      };

      setAuditResult(
        finalResult
      );

      //go results
      setTimeout(()=>{

        setStep("results");

        setShowLeadModal(
          true
        );

      },1800);

    }catch(err){

      console.error(err);

      setStep("inputs");
    }
  };

  //submit lead
  const submitLead = async (
    leadData:{
      email:string;
      company:string;
      role:string;
      teamSize:number;
    }
  ) => {

    try{

   const res =
  await fetch(
    "/api/lead",
    {
      method:"POST",

      headers:{
        "Content-Type":
          "application/json",
      },

      body:JSON.stringify({

        email:
          leadData.email,

        company:
          leadData.company,

        role:
          leadData.role,

        teamSize:
          leadData.teamSize,

        auditId:
          auditResult?.id,
      }),
    }
  );

await supabase
  .from("audits")
  .update({
    email:
      leadData.email,
  })
  .eq(
    "id",
    auditResult?.id
  );

      if(!res.ok){
        throw new Error(
          "Lead save failed"
        );
      }

      setShowLeadModal(
        false
      );

      router.push(
        `/audit/${auditResult?.id}`
      );

    }catch(err){

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