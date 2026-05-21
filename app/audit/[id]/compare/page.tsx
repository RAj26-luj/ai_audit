import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Props{
  params:Promise<{
    id:string;
  }>;
}

export default async function ComparePage({
  params,
}:Props){

  const { id } = await params;

  const { data:audit } =
    await supabase
      .from("audits")
      .select("*")
      .eq("id",id)
      .single();

  if(!audit){
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Audit not found
          </h1>

          <p className="text-gray-500 mt-3">
            Unable to locate this audit record.
          </p>
        </div>
      </div>
    );
  }

  const oldRecommendations =
    audit.result_json?.recommendations || [];

  const newRecommendations =
    audit.updated_result_json?.recommendations || [];

  const totalOldSavings =
    oldRecommendations.reduce(
      (acc:number,rec:any)=>
        acc+(rec.savings || 0),
      0
    );

  const totalNewSavings =
    newRecommendations.reduce(
      (acc:number,rec:any)=>
        acc+(rec.savings || 0),
      0
    );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* header */}
        <div className="space-y-4">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
            Re-Audit Comparison
          </div>

          <div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Your AI stack recommendations changed.
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              Comparing stored audit recommendations with the latest pricing snapshot.
            </p>

            <div className="mt-6">
              <Link
                href={`/audit/${id}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all"
              >
                ← Back To Audit
              </Link>
            </div>

          </div>

        </div>

        {/* summary cards */}
        <div className="grid md:grid-cols-3 gap-4">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <div className="text-sm text-gray-400">
              Previous Savings
            </div>

            <div className="text-3xl font-black mt-2 text-red-300">
              ${totalOldSavings}
            </div>

          </div>

          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">

            <div className="text-sm text-green-300">
              Updated Savings
            </div>

            <div className="text-3xl font-black mt-2 text-green-400">
              ${totalNewSavings}
            </div>

          </div>

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-6">

            <div className="text-sm text-indigo-300">
              Savings Delta
            </div>

            <div className="text-3xl font-black mt-2 text-indigo-200">
              ${totalNewSavings-totalOldSavings}
            </div>

          </div>

        </div>

        {/* recommendations */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <div className="mb-8">

            <h2 className="text-3xl font-bold">
              Recommendation Diff
            </h2>

            <p className="text-gray-400 mt-2">
              Previous audit output compared against latest pricing data.
            </p>

          </div>

          <div className="space-y-6">

            {oldRecommendations.length===0 && (
              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-gray-500">
                No recommendations found.
              </div>
            )}

            {oldRecommendations.map(
              (oldRec:any,index:number)=>{

                const newRec =
                  newRecommendations[index];

                return (
                  <div
                    key={index}
                    className="grid md:grid-cols-2 gap-4"
                  >

                    {/* old */}
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">

                      <div className="text-sm text-red-300 mb-3">
                        Previous Recommendation
                      </div>

                      <h3 className="text-xl font-semibold">
                        {oldRec.title || "No Title"}
                      </h3>

                      <p className="text-gray-400 mt-2 leading-relaxed">
                        {oldRec.description || "No description available."}
                      </p>

                      <div className="mt-5">

                        <div className="text-sm text-gray-500">
                          Estimated Savings
                        </div>

                        <div className="text-3xl font-black text-red-300 mt-1">
                          ${oldRec.savings || 0}
                        </div>

                      </div>

                    </div>

                    {/* new */}
                    <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">

                      <div className="text-sm text-green-300 mb-3">
                        Current Recommendation
                      </div>

                      <h3 className="text-xl font-semibold">
                        {newRec?.title || "No Change"}
                      </h3>

                      <p className="text-gray-400 mt-2 leading-relaxed">
                        {newRec?.description || "Recommendation unchanged."}
                      </p>

                      <div className="mt-5">

                        <div className="text-sm text-gray-500">
                          Estimated Savings
                        </div>

                        <div className="text-3xl font-black text-green-300 mt-1">
                          ${newRec?.savings || 0}
                        </div>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>

    </div>
  );
}