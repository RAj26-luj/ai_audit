export async function exportPDF() {

  const element =
    document.getElementById(
      "pdf-report"
    );

  if (!element) {
    return;
  }

  const printWindow =
    window.open(
      "",
      "_blank"
    );

  if (!printWindow) {
    return;
  }

  printWindow.document.write(`
    <html>

      <head>

        <title>
          Credex AI Audit Report
        </title>

        <style>

          * {

            box-sizing: border-box;
          }

          body {

            margin: 0;

            padding: 0;

            background: white;

            color: #0f172a;

            font-family:
              Inter,
              Arial,
              sans-serif;
          }

          table {

            width: 100%;

            border-collapse:
              collapse;
          }

          th,
          td {

            text-align: left;
          }

          @page {

            margin: 24px;
          }

          @media print {

            body {

              -webkit-print-color-adjust: exact;

              print-color-adjust: exact;
            }
          }

        </style>

      </head>

      <body>

        ${element.innerHTML}

      </body>

    </html>
  `);

  printWindow.document.close();

  printWindow.focus();

  setTimeout(() => {

    printWindow.print();

  }, 500);
}