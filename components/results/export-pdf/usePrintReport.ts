export default function usePrintReport() {

  const handlePrint = (setLoading: (value: boolean) => void) => {

    const printContent = document.getElementById("print-report");

    if (!printContent) {
      alert("Printable report not found.");
      return;
    }

    setLoading(true);

    const newWindow = window.open("", "_blank");

    if (!newWindow) {
      setLoading(false);
      alert("Unable to open print window.");
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

  return { handlePrint };
}