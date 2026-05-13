"use client";

import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";

import RecommendationItem from "./recommendations/RecommendationItem";

type Props = {
  recommendations: any[];
  auditId: string;
};

//recommendations list
export default function Recommendations({
  recommendations,
  auditId,
}: Props) {

  const router = useRouter();

  const handleOpen = (index: number) => {
    router.push(`/optimize/${auditId}?focus=${index}`);
  };

  return (

    <section className="space-y-4">

      {/* header */}
      <div className="flex items-center justify-between">

        <h3 className="text-2xl font-bold flex items-center gap-2">

          <Zap className="text-amber-400" size={22} />

          Optimization Opportunities

        </h3>

        <p className="text-sm text-gray-500">
          {(recommendations || []).length} recommendations detected
        </p>

      </div>

      {/* list */}
      {(recommendations || []).map((rec, idx) => (
        <RecommendationItem
          key={idx}
          rec={rec}
          index={idx}
          handleOpen={handleOpen}
        />
      ))}

    </section>
  );
}