"use client";

//home page
import Navbar from "@/components/navbar/Navbar";
import Landing from "@/components/landing/Landing";
import Inputs from "@/components/inputs/Inputs";
import Loading from "@/components/loading/Loading";
import Results from "@/components/results/Results";

import LeadCaptureModal from "@/components/lead-modal/LeadCaptureModal";

import {
  useHomeAudit,
} from "@/hooks/useHomeAudit";

export default function Home() {

  const {
    step,
    setStep,

    formData,
    setFormData,

    auditResult,

    showLeadModal,
    setShowLeadModal,

    startAudit,
    submitLead,
  } = useHomeAudit();

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* navbar */}
      <Navbar setStep={setStep} />

      {/* landing */}
      {step === "landing" && (
        <Landing setStep={setStep} />
      )}

      {/* inputs */}
      {step === "inputs" && (
        <Inputs
          formData={formData}
          setFormData={setFormData}
          startAudit={startAudit}
        />
      )}

      {/* loading */}
      {step === "loading" && (
        <Loading />
      )}

      {/* results */}
      {step === "results" && (
        <Results data={auditResult} />
      )}

      {/* modal */}
      <LeadCaptureModal
        open={showLeadModal}

        onClose={() =>
          setShowLeadModal(false)
        }

        onSubmit={submitLead}

        formData={formData}
        setFormData={setFormData}
      />

      {/* glow */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}