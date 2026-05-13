import { supabase } from "@/lib/supabase";

import demoData from "../data/demoData";

export default async function getAuditResult(
  id: string
) {

  if (id === "demo") {

    return {
      result: demoData,
      error: null,
    };
  }

  const {
    data,
    error,
  } =
    await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

  if (
    error ||
    !data
  ) {

    return {
      result: null,
      error: true,
    };
  }

  return {

    result: {
      ...data.result,
      id,
    },

    error: null,
  };
}