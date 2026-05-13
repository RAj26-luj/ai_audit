import Results from "@/components/results/Results";

import demoAudit from "./data/demoAudit";
import AuditNotFound from "./components/AuditNotFound";

import getAudit from "./utils/getAudit";
import normalizeAudit from "./utils/normalizeAudit";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

//audit page
export default async function AuditPage({
  params,
}: Props) {

  const { id } = await params;

  //demo audit
  if (id === "demo") {
    return (
      <Results data={demoAudit} />
    );
  }

  const { data, error } =
    await getAudit(id);

  //audit missing
  if (error || !data) {
    return <AuditNotFound />;
  }

  //normalize data
  const result =
    normalizeAudit(id, data.result);

  return (
    <Results data={result} />
  );
}