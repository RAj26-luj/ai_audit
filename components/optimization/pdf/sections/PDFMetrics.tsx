interface Props {
  currentSpend: number;
  optimizedSpend: number;
  monthlySavings: number;
  yearlySavings: number;
}

//metrics
export default function PDFMetrics({
  currentSpend,
  optimizedSpend,
  monthlySavings,
  yearlySavings,
}: Props) {

  const metrics = [
    { label: "Current Spend", value: `$${currentSpend.toLocaleString()}` },
    { label: "Optimized Spend", value: `$${optimizedSpend.toLocaleString()}` },
    { label: "Monthly Savings", value: `$${monthlySavings.toLocaleString()}` },
    { label: "Yearly Savings", value: `$${yearlySavings.toLocaleString()}` },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20,
        marginBottom: 60,
      }}
    >

      {metrics.map((m, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: 24,
            background: "#f8fafc",
          }}
        >

          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 10 }}>
            {m.label}
          </p>

          <h2 style={{ fontSize: 30, fontWeight: 800, margin: 0 }}>
            {m.value}
          </h2>

        </div>
      ))}

    </div>
  );
}