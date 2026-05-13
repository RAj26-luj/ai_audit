import Recommendations from "../Recommendations";
import OptimizationCTA from "../OptimizationCTA";
import AuditNotice from "../AuditNotice";
import OptimizedNotice from "./OptimizedNotice";

interface Props {
  data: any;
}

//right panel
export default function RightPanel({
  data,
}: Props) {

  return (

    <div className="xl:col-span-4 space-y-8 print:mt-6 print:space-y-6">

      {/* recommendations / empty state */}
      {data.recommendations?.length > 0 ? (
        <Recommendations
          recommendations={data.recommendations || []}
          auditId={data.id || "demo"}
        />
      ) : (
        <OptimizedNotice />
      )}

      {/* CTA */}
      <OptimizationCTA
        savings={data.savingsPercentage || 0}
        recommendations={data.recommendations || []}
        auditId={data.id || "demo"}
      />

      {/* notice */}
      <AuditNotice />

    </div>
  );
}