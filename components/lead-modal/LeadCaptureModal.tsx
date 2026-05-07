"use client";

// main modal wrapper

import { AnimatePresence } from "framer-motion";

import ModalWrapper from "./ModalWrapper";
import LeadForm from "./LeadForm";
import SuccessMessage from "./SuccessMessage";

import { useLeadForm } from "./hooks/useLeadForm";

type Props = {
  open: boolean;

  onClose: () => void;

  onSubmit: (data: {
    email: string;
    company: string;
    role: string;
    teamSize: number;
  }) => Promise<void>;
};

export default function LeadCaptureModal({
  open,
  onClose,
  onSubmit,
}: Props) {

  const {
    email,
    setEmail,

    company,
    setCompany,

    role,
    setRole,

    teamSize,
    setTeamSize,

    loading,
    success,

    handleSubmit,
  } = useLeadForm(
    onSubmit,
    onClose
  );

  return (
    <AnimatePresence>

      {open && (

        <ModalWrapper>

          {!success ? (

            <LeadForm
              email={email}
              setEmail={setEmail}

              company={company}
              setCompany={setCompany}

              role={role}
              setRole={setRole}

              teamSize={teamSize}
              setTeamSize={setTeamSize}

              loading={loading}

              handleSubmit={handleSubmit}
            />

          ) : (

            <SuccessMessage />
          )}
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
}