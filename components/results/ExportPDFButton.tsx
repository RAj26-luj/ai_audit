"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import usePrintReport from "./export-pdf/usePrintReport";
import ExportButtonContent from "./export-pdf/ExportButtonContent";

//export pdf button
export default function ExportPDFButton() {

  const [loading, setLoading] = useState(false);
  const { handlePrint } = usePrintReport();

  return (

    <motion.button

      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}

      onClick={() => handlePrint(setLoading)}
      disabled={loading}

      className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all px-5 py-4 font-semibold flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 disabled:opacity-70"
    >

      <ExportButtonContent loading={loading} />

    </motion.button>

  );
}