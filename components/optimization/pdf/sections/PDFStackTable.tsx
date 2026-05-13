interface Props {
  stack: any[];
}

//stack table
export default function PDFStackTable({ stack }: Props) {

  const td = {
    padding: "16px",
    borderBottom: "1px solid #e2e8f0",
  };

  return (
    <div style={{ marginBottom: 60 }}>

      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        Optimized AI Stack
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>

        <thead>

          <tr style={{ background: "#f8fafc" }}>

            {["Tool", "Plan", "Seats", "Cost"].map((h) => (
              <th
                key={h}
                style={{ ...td, textAlign: "left", fontSize: 14 }}
              >
                {h}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {stack.map((t, i) => (
            <tr key={i}>

              <td style={td}>{t?.name}</td>
              <td style={td}>{t?.plan}</td>
              <td style={td}>{t?.seats}</td>

              <td style={{ ...td, fontWeight: 700 }}>
                $
                {(
                  (t?.pricePerSeat || 0) * (t?.seats || 0)
                ).toLocaleString()}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}