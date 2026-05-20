import { supabase } from "@/lib/supabase";

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
      <div className="p-10">
        Audit not found
      </div>
    );
  }

  const oldResults =
    audit.result_json;

  return (
    <div className="p-10 space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Your AI stack recommendations changed.
        </h1>

        <p className="text-sm opacity-70 mt-2">
          Comparing stored audit vs current pricing snapshot.
        </p>
      </div>

      <div className="border rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Recommendations
        </h2>

        <div className="space-y-4">

          {oldResults?.recommendations?.map(
            (rec:any,index:number)=>(
              <div
                key={index}
                className="border rounded-lg p-4"
              >
                <div className="font-medium">
                  {rec.title}
                </div>

                <div className="text-sm opacity-70 mt-1">
                  {rec.description}
                </div>

                <div className="mt-2 text-sm">
                  Savings:
                  ${rec.savings || 0}
                </div>
              </div>
            )
          )}

        </div>
      </div>
    </div>
  );
}