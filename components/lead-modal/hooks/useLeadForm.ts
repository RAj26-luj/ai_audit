//lead form
import { useState } from "react";

//form logic
export function useLeadForm(
  onSubmit: any,
  onClose: () => void
) {

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const [teamSize, setTeamSize] = useState(0);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //submit form
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await onSubmit({
        email,
        company,
        role,
        teamSize,
      });

      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 1800);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  };

  return {
    email, setEmail,
    company, setCompany,
    role, setRole,
    teamSize, setTeamSize,
    loading, success,
    handleSubmit,
  };
}