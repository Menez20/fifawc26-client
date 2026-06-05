import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getGroups } from "../api/matches";

const GROUP_COLORS = [
  {
    accent: "#00ff87",
    bg: "rgba(0,255,135,0.07)",
    border: "rgba(0,255,135,0.18)",
    top: "rgba(0,255,135,0.5)",
  },
  {
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.07)",
    border: "rgba(245,158,11,0.18)",
    top: "rgba(245,158,11,0.5)",
  },
  {
    accent: "#38bdf8",
    bg: "rgba(56,189,248,0.07)",
    border: "rgba(56,189,248,0.18)",
    top: "rgba(56,189,248,0.5)",
  },
  {
    accent: "#f472b6",
    bg: "rgba(244,114,182,0.07)",
    border: "rgba(244,114,182,0.18)",
    top: "rgba(244,114,182,0.5)",
  },
  {
    accent: "#a78bfa",
    bg: "rgba(167,139,250,0.07)",
    border: "rgba(167,139,250,0.18)",
    top: "rgba(167,139,250,0.5)",
  },
  {
    accent: "#fb923c",
    bg: "rgba(251,146,60,0.07)",
    border: "rgba(251,146,60,0.18)",
    top: "rgba(251,146,60,0.5)",
  },
  {
    accent: "#34d399",
    bg: "rgba(52,211,153,0.07)",
    border: "rgba(52,211,153,0.18)",
    top: "rgba(52,211,153,0.5)",
  },
  {
    accent: "#f87171",
    bg: "rgba(248,113,113,0.07)",
    border: "rgba(248,113,113,0.18)",
    top: "rgba(248,113,113,0.5)",
  },
  {
    accent: "#60a5fa",
    bg: "rgba(96,165,250,0.07)",
    border: "rgba(96,165,250,0.18)",
    top: "rgba(96,165,250,0.5)",
  },
  {
    accent: "#fbbf24",
    bg: "rgba(251,191,36,0.07)",
    border: "rgba(251,191,36,0.18)",
    top: "rgba(251,191,36,0.5)",
  },
  {
    accent: "#4ade80",
    bg: "rgba(74,222,128,0.07)",
    border: "rgba(74,222,128,0.18)",
    top: "rgba(74,222,128,0.5)",
  },
  {
    accent: "#e879f9",
    bg: "rgba(232,121,249,0.07)",
    border: "rgba(232,121,249,0.18)",
    top: "rgba(232,121,249,0.5)",
  },
];

export default function GroupsPage() {
  const navigate = useNavigate();
  const { data: groups = [], isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  if (isLoading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#06060f" }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "2px solid #00ff87",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );

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
            "radial-gradient(ellipse 80% 30% at 50% 0%, rgba(0,255,135,0.05) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 0% 100%, rgba(255,100,20,0.05) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 100% 60%, rgba(0,80,255,0.05) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,255,135,0.25), rgba(255,100,20,0.2), transparent)",
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
          <div style={{ fontSize: "15px", fontWeight: 900 }}>Group Stage</div>
          <div
            style={{
              fontSize: "9px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "1px",
            }}
          >
            {groups.length} groups · 48 teams
          </div>
        </div>
        <div style={{ width: "80px" }} />
      </header>

      {/* Groups grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {groups.map((group: any, i: number) => {
            const color = GROUP_COLORS[i % GROUP_COLORS.length];
            return (
              <div
                key={group.group}
                style={{
                  background: color.bg,
                  border: `0.5px solid ${color.border}`,
                  borderRadius: "14px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${color.top}, transparent)`,
                  }}
                />

                {/* Group header */}
                <div
                  style={{
                    padding: "12px 14px 10px",
                    borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 900,
                      color: color.accent,
                    }}
                  >
                    {group.group}
                  </span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {["P", "W", "D", "L", "GD", "Pts"].map((h) => (
                      <span
                        key={h}
                        style={{
                          fontSize: "8px",
                          color: "rgba(255,255,255,0.2)",
                          width: h === "GD" ? "22px" : "18px",
                          textAlign: "center",
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Team rows */}
                {group.table.map((row: any) => (
                  <div
                    key={row.team.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 14px",
                      borderBottom: "0.5px solid rgba(255,255,255,0.04)",
                      background:
                        row.position <= 2
                          ? `rgba(${color.accent === "#00ff87" ? "0,255,135" : color.accent === "#f59e0b" ? "245,158,11" : color.accent === "#38bdf8" ? "56,189,248" : color.accent === "#f472b6" ? "244,114,182" : color.accent === "#a78bfa" ? "167,139,250" : color.accent === "#fb923c" ? "251,146,60" : color.accent === "#34d399" ? "52,211,153" : color.accent === "#f87171" ? "248,113,113" : color.accent === "#60a5fa" ? "96,165,250" : color.accent === "#fbbf24" ? "251,191,36" : color.accent === "#4ade80" ? "74,222,128" : "232,121,249"},0.04)`
                          : row.position === 3
                            ? "rgba(245,158,11,0.04)"
                            : "transparent",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 800,
                        width: "12px",
                        color:
                          row.position <= 2
                            ? color.accent
                            : row.position === 3
                              ? "#f59e0b"
                              : "rgba(255,255,255,0.25)",
                        flexShrink: 0,
                      }}
                    >
                      {row.position}
                    </span>
                    <img
                      src={row.team.crest}
                      alt={row.team.name}
                      style={{
                        width: "18px",
                        height: "18px",
                        objectFit: "contain",
                        flexShrink: 0,
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        flex: 1,
                        fontWeight:
                          row.position <= 2
                            ? 600
                            : row.position === 3
                              ? 500
                              : 400,
                        color:
                          row.position <= 2
                            ? "#fff"
                            : row.position === 3
                              ? "rgba(255,255,255,0.7)"
                              : "rgba(255,255,255,0.45)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.team.name}
                    </span>
                    <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                      {[row.playedGames, row.won, row.draw, row.lost].map(
                        (v, vi) => (
                          <span
                            key={vi}
                            style={{
                              fontSize: "10px",
                              width: "18px",
                              textAlign: "center",
                              color: "rgba(255,255,255,0.35)",
                            }}
                          >
                            {v}
                          </span>
                        ),
                      )}
                      <span
                        style={{
                          fontSize: "10px",
                          width: "22px",
                          textAlign: "center",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {row.goalDifference > 0
                          ? `+${row.goalDifference}`
                          : row.goalDifference}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          width: "18px",
                          textAlign: "center",
                          fontWeight: 800,
                          color: "#fff",
                        }}
                      >
                        {row.points}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Qualified indicator */}
                <div
                  style={{
                    padding: "8px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: color.accent,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "8px",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      Top 2 qualify automatically
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#f59e0b",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "8px",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      3rd — best 8 of 12 advance
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
