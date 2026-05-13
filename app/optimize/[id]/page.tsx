import InteractiveOptimizer from "@/components/optimization/InteractiveOptimizer";

import PageHeader from "./components/PageHeader";

import NotFoundState from "./components/NotFoundState";

import getAuditResult from "./utils/getAuditResult";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OptimizePage({
  params,
}: Props) {

  const { id } =
    await params;

  const {
    result,
    error,
  } =
    await getAuditResult(id);

  if (
    error ||
    !result
  ) {

    return <NotFoundState />;
  }

  return (

    <div className="min-h-screen bg-[#020205] text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        <PageHeader
          id={id}
        />

        <div className="mt-10">

          <InteractiveOptimizer
            audit={result}
          />

        </div>

      </div>

    </div>
  );
}