//lead form
import { Mail, Building2, Briefcase, Users, Sparkles } from "lucide-react";

import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

type Props = any;

//form content
export default function LeadForm({
  email, setEmail,
  company, setCompany,
  role, setRole,
  teamSize, setTeamSize,
  loading,
  handleSubmit,
}: Props) {

  return (
    <>

      {/* badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold mb-5">
        <Sparkles size={12} />
        Unlock Full Report
      </div>

      {/* title */}
      <h2 className="text-4xl font-black text-white">
        Save Your Audit
      </h2>

      <p className="text-gray-500 mt-4">
        Enter your details to unlock the complete report.
      </p>

      {/* form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">

        <FormInput label="Work Email" icon={<Mail size={14} />} type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />

        <FormInput label="Company" icon={<Building2 size={14} />} type="text" placeholder="Acme Inc." value={company} onChange={(e) => setCompany(e.target.value)} />

        <FormInput label="Your Role" icon={<Briefcase size={14} />} type="text" placeholder="Engineering Manager" value={role} onChange={(e) => setRole(e.target.value)} />

        {/* size */}
        <FormInput label="Team Size" icon={<Users size={14} />} type="number" placeholder="10" value={teamSize === 0 ? "" : teamSize} onChange={(e) => setTeamSize(e.target.value === "" ? 0 : Number(e.target.value))} />

        {/* submit */}
        <SubmitButton loading={loading} />

      </form>

    </>
  );
}