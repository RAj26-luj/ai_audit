interface Props {
  recommendations: any[];
}

//recommendations
export default function PDFRecommendations({
  recommendations,
}: Props) {

  return (
    <div style={{ marginBottom: 60 }}>

      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        Top Recommendations
      </h2>

      {recommendations.map((rec, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: 24,
            marginBottom: 20,
            background: "#f8fafc",
          }}
        >

          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
            {rec?.title}
          </h3>

          <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: 18 }}>
            {rec?.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

            <div>
              <strong>Savings:</strong>{" "}
              ${Math.round(rec?.savings || 0).toLocaleString()}/month
            </div>

            <div>
              <strong>Risk:</strong> {rec?.productivityRisk || "Low"}
            </div>

          </div>

        </div>
      ))}

    </div>
  );
}