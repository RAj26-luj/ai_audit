export default function PDFHeader() {

  return (
    /* Container */
    <div style={{ marginBottom: 50, borderBottom: "2px solid #e2e8f0", paddingBottom: 24 }}>

      {/* Title */}
      <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>
        Credex AI Audit
      </h1>

      {/* Subtitle */}
      <p style={{ color: "#64748b", fontSize: 17 }}>
        AI Stack Optimization Report
      </p>

    </div>
  );
}