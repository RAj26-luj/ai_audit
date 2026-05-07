import Results from "@/components/results/Results";

import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AuditPage({
  params,
}: Props) {
  const { id } = await params;

  const { data, error } =
    await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl font-bold">
        Audit not found
      </div>
    );
  }

  return (
    <Results data={data.result} />
  );
}