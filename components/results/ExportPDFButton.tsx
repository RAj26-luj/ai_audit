"use client";

import {
  Download,
  Loader2,
  FileText,
} from "lucide-react";

import {
  useState,
} from "react";

import { motion } from "framer-motion";

export default function ExportPDFButton() {

  const [loading, setLoading] =
    useState(false);

  const handlePrint =
    () => {

      const printContent =
        document.getElementById(
          "print-report"
        );

      if (!printContent) {

        alert(
          "Printable report not found."
        );

        return;
      }

      setLoading(true);

      const newWindow =
        window.open(
          "",
          "_blank"
        );

      if (!newWindow) {

        setLoading(false);

        alert(
          "Unable to open print window."
        );

        return;
      }

      newWindow.document.write(`
        <html>
          <head>
            <title>StackAudit Report</title>

            <meta charset="UTF-8" />

            <style>

              body {
                font-family: Arial, sans-serif;
                background: white;
                color: #111827;
                margin: 0;
                padding: 48px;
                line-height: 1.6;
              }

              * {
                box-sizing: border-box;
              }

              h1,h2,h3,h4 {
                margin-top: 0;
                color: #111827;
              }

              p {
                color: #374151;
              }

              .card {
                border: 1px solid #e5e7eb;
                border-radius: 16px;
                padding: 24px;
                margin-bottom: 24px;
              }

              @media print {

                body {
                  padding: 20px;
                }

              }

            </style>
          </head>

          <body>

            ${printContent.innerHTML}

          </body>
        </html>
      `);

      newWindow.document.close();

      newWindow.focus();

      setTimeout(() => {

        newWindow.print();

        setLoading(false);

      }, 700);
    };

  return (
    <motion.button

      whileHover={{
        scale: 1.02,
      }}

      whileTap={{
        scale: 0.98,
      }}

      onClick={handlePrint}

      disabled={loading}

      className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all px-5 py-4 font-semibold flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 disabled:opacity-70"
    >

      {loading ? (

        <Loader2
          size={20}
          className="animate-spin"
        />

      ) : (

        <Download size={20} />

      )}

      <div className="flex flex-col items-start">

        <span className="text-sm font-bold">

          {loading
            ? "Preparing PDF..."
            : "Export PDF Report"}

        </span>

        <span className="text-[11px] text-indigo-200 flex items-center gap-1">

          <FileText size={10} />

          Printable audit summary

        </span>

      </div>

    </motion.button>
  );
}