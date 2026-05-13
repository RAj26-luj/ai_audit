interface Props {
  yearlySavings: number;
}

//summary
export default function PDFExecutiveSummary({
  yearlySavings,
}: Props) {

  return (
    <div style={{ marginBottom: 60 }}>

      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
        Executive Summary
      </h2>

      <p style={{ fontSize: 16, lineHeight: 1.9, color: "#334155" }}>
        Your AI stack can potentially save{" "}
        <strong>${yearlySavings.toLocaleString()}</strong>{" "}
        annually through intelligent optimization without major productivity loss.
      </p>

    </div>
  );
}