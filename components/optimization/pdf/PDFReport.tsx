"use client";

interface Props {
  currentSpend: number;
  optimizedSpend: number;
  monthlySavings: number;
  yearlySavings: number;
  productivityRisk: string;
  recommendations?: any[];
  optimizedStack?: any[];
}

export default function PDFReport({
  currentSpend,
  optimizedSpend,
  monthlySavings,
  yearlySavings,
  recommendations = [],
  optimizedStack = [],
}: Props) {

  const safeRecommendations =
    Array.isArray(
      recommendations
    )
      ? recommendations
      : [];

  const safeStack =
    Array.isArray(
      optimizedStack
    )
      ? optimizedStack
      : [];

  const topRecommendations =
    safeRecommendations
      .sort(
        (a, b) =>
          (b?.savings || 0) -
          (a?.savings || 0)
      )
      .slice(0, 3);

  return (

    <div
      id="pdf-report"
      style={{
        position: "absolute",
        left: "-99999px",
        top: 0,
        width: "1200px",
      }}
    >

      <div
        style={{
          padding: "50px",
          background: "white",
          color: "#0f172a",
          fontFamily:
            "Inter, Arial, sans-serif",
        }}
      >

        <div
          style={{
            marginBottom: 50,
            borderBottom:
              "2px solid #e2e8f0",
            paddingBottom: 24,
          }}
        >

          <h1
            style={{
              fontSize: 40,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Credex AI Audit
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: 17,
            }}
          >
            AI Stack Optimization Report
          </p>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, 1fr)",
            gap: 20,
            marginBottom: 60,
          }}
        >

          {[
            {
              label:
                "Current Spend",
              value:
                `$${currentSpend.toLocaleString()}`,
            },

            {
              label:
                "Optimized Spend",
              value:
                `$${optimizedSpend.toLocaleString()}`,
            },

            {
              label:
                "Monthly Savings",
              value:
                `$${monthlySavings.toLocaleString()}`,
            },

            {
              label:
                "Yearly Savings",
              value:
                `$${yearlySavings.toLocaleString()}`,
            },
          ].map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                style={{
                  border:
                    "1px solid #e2e8f0",
                  borderRadius: 20,
                  padding: 24,
                  background:
                    "#f8fafc",
                }}
              >

                <p
                  style={{
                    color:
                      "#64748b",
                    fontSize: 14,
                    marginBottom: 10,
                  }}
                >
                  {item.label}
                </p>

                <h2
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    margin: 0,
                  }}
                >
                  {item.value}
                </h2>

              </div>

            )
          )}

        </div>

        <div
          style={{
            marginBottom: 60,
          }}
        >

          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Executive Summary
          </h2>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.9,
              color: "#334155",
            }}
          >

            Your AI stack can potentially save

            {" "}

            <strong>
              ${yearlySavings.toLocaleString()}
            </strong>

            {" "}

            annually through intelligent optimization without major productivity loss.

          </p>

        </div>

        <div
          style={{
            marginBottom: 60,
          }}
        >

          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            Optimized AI Stack
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
            }}
          >

            <thead>

              <tr
                style={{
                  background:
                    "#f8fafc",
                }}
              >

                {[
                  "Tool",
                  "Plan",
                  "Seats",
                  "Monthly Cost",
                ].map(
                  (
                    head
                  ) => (

                    <th
                      key={head}
                      style={{
                        textAlign:
                          "left",
                        padding:
                          "16px",
                        borderBottom:
                          "1px solid #e2e8f0",
                        fontSize: 14,
                      }}
                    >
                      {head}
                    </th>

                  )
                )}

              </tr>

            </thead>

            <tbody>

              {safeStack.map(
                (
                  tool,
                  index
                ) => (

                  <tr
                    key={index}
                  >

                    <td
                      style={{
                        padding:
                          "16px",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      {tool?.name}
                    </td>

                    <td
                      style={{
                        padding:
                          "16px",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      {tool?.plan}
                    </td>

                    <td
                      style={{
                        padding:
                          "16px",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      {tool?.seats}
                    </td>

                    <td
                      style={{
                        padding:
                          "16px",
                        borderBottom:
                          "1px solid #e2e8f0",
                        fontWeight: 700,
                      }}
                    >
                      $
                      {(
                        (tool?.pricePerSeat || 0) *
                        (tool?.seats || 0)
                      ).toLocaleString()}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        <div
          style={{
            marginBottom: 60,
          }}
        >

          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            Top Recommendations
          </h2>

          {topRecommendations.map(
            (
              rec,
              index
            ) => (

              <div
                key={index}
                style={{
                  border:
                    "1px solid #e2e8f0",
                  borderRadius: 20,
                  padding: 24,
                  marginBottom: 20,
                  background:
                    "#f8fafc",
                }}
              >

                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  {rec?.title}
                </h3>

                <p
                  style={{
                    color:
                      "#475569",
                    lineHeight: 1.8,
                    marginBottom: 18,
                  }}
                >
                  {rec?.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                  }}
                >

                  <div>

                    <strong>
                      Savings:
                    </strong>

                    {" "}

                    $

                    {Math.round(
                      rec?.savings || 0
                    ).toLocaleString()}

                    /month

                  </div>

                  <div>

                    <strong>
                      Risk:
                    </strong>

                    {" "}

                    {rec?.productivityRisk ||
                      "Low"}

                  </div>

                </div>

              </div>

            )
          )}

        </div>

        <div
          style={{
            marginTop: 70,
            borderTop:
              "1px solid #e2e8f0",
            paddingTop: 24,
            color: "#64748b",
            fontSize: 13,
          }}
        >

          Generated by Credex AI • Confidential Optimization Report

        </div>

      </div>

    </div>
  );
}