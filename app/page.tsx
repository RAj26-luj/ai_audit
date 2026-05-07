"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import Inputs from "@/components/Inputs";
import Loading from "@/components/Loading";

type FormDataType = {
  selectedTools: string[];
};

export default function Home() {
  const [step, setStep] = useState("landing");

  const [formData, setFormData] = useState<FormDataType>({
    selectedTools: [],
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar setStep={setStep} />

      {step === "landing" && (
        <Landing setStep={setStep} />
      )}

      {step === "inputs" && (
        <Inputs
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {step === "loading" && (
        <Loading />
      )}

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}