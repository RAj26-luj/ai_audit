"use client";

//lead modal
import { AnimatePresence } from "framer-motion";

import ModalWrapper from "./ModalWrapper";
import LeadForm from "./LeadForm";
import SuccessMessage from "./SuccessMessage";

import { useLeadForm } from "./hooks/useLeadForm";

import type {
  FormDataType,
} from "@/types/audit";

type Props = {
  open: boolean;

  onClose: () => void;

  formData: FormDataType;

  setFormData: React.Dispatch<
    React.SetStateAction<FormDataType>
  >;

  onSubmit: (data: {
    email: string;
    company: string;
    role: string;
    teamSize: number;
  }) => Promise<void>;
};

//modal wrapper
export default function LeadCaptureModal({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
}: Props) {

  const {
    email, setEmail,
    company, setCompany,
    role, setRole,
    loading, success,
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

              teamSize={formData.teamSize}

              setTeamSize={(value: number) =>
                setFormData((prev) => ({
                  ...prev,
                  teamSize: value,
                }))
              }

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