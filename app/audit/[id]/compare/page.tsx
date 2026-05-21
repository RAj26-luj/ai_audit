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

  const oldResults =
    audit.result_json;

  const totalSavings =
    oldResults?.recommendations?.reduce(
      (acc:any,rec:any)=>
        acc+(rec.savings || 0),
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* header */}
        <div className="space-y-4">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
            Re-Audit Comparison
          </div>

         <div>
  <h1 className="text-4xl md:text-5xl font-black tracking-tight">
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
              Stored Recommendations
            </div>

            <div className="text-3xl font-bold mt-2">
              {oldResults?.recommendations?.length || 0}
            </div>
          </div>

          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
            <div className="text-sm text-green-300">
              Potential Savings
            </div>

            <div className="text-3xl font-bold mt-2 text-green-400">
              ${totalSavings}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-gray-400">
              Audit Status
            </div>

            <div className="text-xl font-semibold mt-2 text-indigo-300">
              Updated
            </div>
          </div>

        </div>

        {/* recommendations */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <div className="mb-6">

            <h2 className="text-2xl font-bold">
              Recommendations
            </h2>

            <p className="text-gray-400 mt-1">
              Latest optimization opportunities detected.
            </p>

          </div>

          <div className="space-y-5">

            {(!oldResults?.recommendations ||
              oldResults.recommendations.length===0) && (

              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-gray-500">
                No recommendation changes detected yet.
              </div>

            )}

            {oldResults?.recommendations?.map(
              (rec:any,index:number)=>(
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black/40 p-6"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                      <h3 className="text-xl font-semibold">
                        {rec.title}
                      </h3>

                      <p className="text-gray-400 mt-2 leading-relaxed">
                        {rec.description}
                      </p>
                    </div>

                    <div className="min-w-[140px]">

                      <div className="text-sm text-gray-500">
                        Estimated Savings
                      </div>

                      <div className="text-3xl font-black text-green-400 mt-1">
                        ${rec.savings || 0}
                      </div>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}