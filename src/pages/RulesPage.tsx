import { useNavigate } from "react-router-dom";

const SECTIONS = [
  {
    title: "Score Prediction — Regular Matches",
    color: "#00ff87",
    rows: [
      {
        rule: "Exact score",
        pts: 6,
        example: "Predict 2-1 → ends 2-1",
        highlight: true,
      },
      {
        rule: "Correct winner + correct goals for one team",
        pts: 4,
        example: "Predict 2-0 → ends 2-1",
      },
      {
        rule: "Correct winner (without exact score)",
        pts: 3,
        example: "Predict 1-0 → ends 3-1",
      },
      {
        rule: "Correct goals for one team (wrong winner)",
        pts: 1,
        example: "Predict 2-1 → ends 0-1",
      },
      { rule: "Wrong prediction", pts: 0, example: "Predict 2-0 → ends 1-3" },
    ],
  },
  {
    title: "Draw Matches",
    color: "#38bdf8",
    rows: [
      {
        rule: "Exact draw score",
        pts: 6,
        example: "Predict 1-1 → ends 1-1",
        highlight: true,
      },
      {
        rule: "Draw predicted (not exact score)",
        pts: 3,
        example: "Predict 0-0 → ends 2-2",
      },
      { rule: "Wrong prediction", pts: 0, example: "Predict 1-0 → ends 1-1" },
    ],
  },
  {
    title: "Matches Decided by Penalty Shootout",
    color: "#f59e0b",
    rows: [
      {
        rule: "Exact draw score + correct penalty winner",
        pts: 9,
        example: "Predict 1-1 + Team A → 1-1, Team A wins",
        highlight: true,
      },
      {
        rule: "Exact draw score + wrong penalty winner",
        pts: 6,
        example: "Predict 1-1 + Team A → 1-1, Team B wins",
      },
      {
        rule: "Draw predicted + correct penalty winner",
        pts: 6,
        example: "Predict 0-0 + Team B → 2-2, Team B wins",
      },
      {
        rule: "Draw predicted + wrong penalty winner",
        pts: 3,
        example: "Predict 0-0 + Team A → 2-2, Team B wins",
      },
      {
        rule: "Winner predicted (match goes to penalties)",
        pts: 0,
        example: "Predict 2-1 → ends 1-1, goes to penalties",
      },
    ],
  },
  {
    title: "Winner-Only Groups",
    color: "#a78bfa",
    rows: [
      {
        rule: "Correct winner or correct draw prediction",
        pts: 3,
        example: "Predict Team A wins → Team A wins",
      },
      {
        rule: "Correct draw + correct penalty winner",
        pts: 5,
        example: "Predict draw + Team B → draw, Team B wins",
        highlight: true,
      },
      {
        rule: "Incorrect prediction",
        pts: 0,
        example: "Predict Team A → Team B wins",
      },
    ],
  },
];

const ptsColor = (pts: number) => {
  if (pts >= 9) return "#f59e0b";
  if (pts >= 6) return "#00ff87";
  if (pts >= 3) return "#38bdf8";
  if (pts >= 1) return "#a78bfa";
  return "rgba(255,255,255,0.2)";
};

export default function RulesPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "#06060f", color: "#fff" }}
    >
      {/* Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 0% 0%, rgba(0,255,135,0.07) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 100% 100%, rgba(0,80,255,0.07) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,255,135,0.3), rgba(255,100,20,0.2), transparent)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)",
            background: "rgba(255,255,255,0.05)",
            border: "0.5px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "5px 14px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
          }
        >
          ← Back
        </button>
        <div className="flex flex-col items-center">
          <div style={{ fontSize: "15px", fontWeight: 900 }}>Scoring Rules</div>
          <div
            style={{
              fontSize: "9px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "1px",
            }}
          >
            How points are awarded
          </div>
        </div>
        <div style={{ width: "80px" }} />
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Power-up banner */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(251,146,60,0.12), rgba(251,146,60,0.04))",
            border: "0.5px solid rgba(251,146,60,0.3)",
            borderRadius: "14px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: "32px" }}>⚡</div>
          <div>
            <div
              style={{ fontSize: "13px", fontWeight: 800, color: "#fb923c" }}
            >
              x2 Power-Up
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.5)",
                marginTop: "2px",
              }}
            >
              Activate before a match to double all points earned from that
              prediction.
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              background: "rgba(251,146,60,0.15)",
              border: "0.5px solid rgba(251,146,60,0.3)",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "11px",
              fontWeight: 700,
              color: "#fb923c",
            }}
          >
            Coming soon
          </div>
        </div>

        {/* Note */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "11px",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.6,
          }}
        >
          📌 Match result includes 90 minutes + stoppage time + extra time if
          applicable. Penalty shootouts are scored separately.
        </div>

        {/* Scoring sections */}
        {SECTIONS.map((section) => (
          <div key={section.title}>
            {/* Section header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "18px",
                  borderRadius: "2px",
                  background: section.color,
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: section.color,
                }}
              >
                {section.title}
              </span>
            </div>

            {/* Table */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {/* Table header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 60px 1fr",
                  padding: "8px 16px",
                  borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Rule
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  Pts
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Example
                </span>
              </div>

              {/* Rows */}
              {section.rows.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 60px 1fr",
                    padding: "12px 16px",
                    borderBottom:
                      i < section.rows.length - 1
                        ? "0.5px solid rgba(255,255,255,0.05)"
                        : "none",
                    background: row.highlight
                      ? `rgba(${section.color === "#00ff87" ? "0,255,135" : section.color === "#38bdf8" ? "56,189,248" : section.color === "#f59e0b" ? "245,158,11" : "167,139,250"},0.04)`
                      : "transparent",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: row.highlight ? "#fff" : "rgba(255,255,255,0.6)",
                      fontWeight: row.highlight ? 600 : 400,
                      paddingRight: "12px",
                    }}
                  >
                    {row.rule}
                  </span>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 900,
                        color: ptsColor(row.pts),
                        background: `rgba(${row.pts >= 9 ? "245,158,11" : row.pts >= 6 ? "0,255,135" : row.pts >= 3 ? "56,189,248" : row.pts >= 1 ? "167,139,250" : "255,255,255"},0.1)`,
                        border: `0.5px solid rgba(${row.pts >= 9 ? "245,158,11" : row.pts >= 6 ? "0,255,135" : row.pts >= 3 ? "56,189,248" : row.pts >= 1 ? "167,139,250" : "255,255,255"},0.2)`,
                        borderRadius: "6px",
                        padding: "3px 10px",
                        minWidth: "36px",
                        textAlign: "center",
                      }}
                    >
                      {row.pts}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.35)",
                      paddingLeft: "12px",
                    }}
                  >
                    {row.example}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Points legend */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          {[
            { pts: 9, label: "Max points", color: "#f59e0b" },
            { pts: 6, label: "Great", color: "#00ff87" },
            { pts: 3, label: "Good", color: "#38bdf8" },
            { pts: 1, label: "Partial", color: "#a78bfa" },
            { pts: 0, label: "No points", color: "rgba(255,255,255,0.2)" },
          ].map((item) => (
            <div
              key={item.pts}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "5px 12px",
              }}
            >
              <span
                style={{ fontSize: "12px", fontWeight: 900, color: item.color }}
              >
                {item.pts}
              </span>
              <span
                style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
