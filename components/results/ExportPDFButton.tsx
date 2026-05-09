"use client";

export default function ExportPDFButton() {

  const handlePrint =
    () => {

      const printContent =
        document.getElementById(
          "print-report"
        );

      if (!printContent) return;

      const newWindow =
        window.open(
          "",
          "_blank"
        );

      if (!newWindow) return;

      newWindow.document.write(`
        <html>
          <head>
            <title>StackAudit Report</title>

            <style>

              body {
                font-family: Arial, sans-serif;
                background: white;
                color: black;
                margin: 0;
                padding: 40px;
              }

              * {
                box-sizing: border-box;
              }

              h1,h2,h3,h4 {
                margin: 0;
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

      }, 500);
    };

  return (
    <button
      onClick={handlePrint}
      className="w-full rounded-2xl bg-indigo-500 hover:bg-indigo-400 transition px-5 py-4 font-semibold"
    >

      Export Audit Report PDF
    </button>
  );
}