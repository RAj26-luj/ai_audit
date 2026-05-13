interface OptReq {
  stack: any[];
  enabledRecommendations: string[];
}

//api
export async function optimizeAudit(payload: OptReq) {

  const res = await fetch("/api/optimize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
}