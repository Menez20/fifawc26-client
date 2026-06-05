import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMatch } from "../api/matches";
import { submitPrediction, getMyPredictions } from "../api/predictions";
import LockCountdown from "../components/LockCountdown";
import { isLocked } from "../utils/time";

export default function MatchPage({}: {}) {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [home, setHome] = useState(0);
  const [away, setAway] = useState(0);

  const { data: match } = useQuery({
    queryKey: ["match", id],
    queryFn: () => getMatch(id!),
  });
  const { data: predictions = [] } = useQuery({
    queryKey: ["predictions", roomId],
    queryFn: () => getMyPredictions(roomId!),
    enabled: !!roomId,
  });

  useEffect(() => {
    const existing = predictions.find((p: any) => p.matchId === id);
    if (existing) {
      setHome(existing.predictedHome);
      setAway(existing.predictedAway);
    }
  }, [predictions, id]);

  const existing = predictions.find((p: any) => p.matchId === id);

  const mutation = useMutation({
    mutationFn: () =>
      submitPrediction({
        matchId: id!,
        roomId: roomId!,
        predictedHome: home,
        predictedAway: away,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["predictions"] });
      navigate(`/rooms/${roomId}`);
    },
  });

  if (!match)
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

  // Team color bleeds based on crest — we use green shades as fallback
  const locked = isLocked(match.kickoffAt);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "#06060f", color: "#fff" }}
    >
      {/* Atmospheric team color bleeds */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 0% 50%, rgba(0,120,80,0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 100% 50%, rgba(0,80,160,0.2) 0%, transparent 60%), radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,255,135,0.04) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,255,135,0.4), transparent)",
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
          onClick={() => navigate(-1)}
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
        <span
          style={{
            fontSize: "9px",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {match.stage?.replace(/_/g, " ")}
        </span>
        <div style={{ width: "80px" }} />
      </header>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 gap-10 min-h-[calc(100vh-64px)]">
        {/* Teams */}
        <div className="flex items-center gap-8 w-full max-w-lg">
          {/* Home team */}
          <div className="flex flex-col items-center gap-4 flex-1">
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg, rgba(0,120,80,0.6), rgba(0,200,120,0.2))",
                border: "0.5px solid rgba(0,255,135,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(0,120,80,0.3)",
              }}
            >
              {match.homeCrest ? (
                <img
                  src={match.homeCrest}
                  alt={match.homeTeam}
                  style={{
                    width: "52px",
                    height: "52px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span style={{ fontSize: "36px" }}>⚽</span>
              )}
            </div>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 800,
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {match.homeTeam}
            </span>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center gap-2">
            <div
              style={{
                width: "1px",
                height: "24px",
                background:
                  "linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)",
              }}
            />
            {match.status === "FINISHED" ? (
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  fontVariantNumeric: "tabular-nums",
                  textShadow: "0 0 30px rgba(0,255,135,0.3)",
                }}
              >
                {match.homeScore}{" "}
                <span style={{ color: "rgba(255,255,255,0.2)" }}>–</span>{" "}
                {match.awayScore}
              </div>
            ) : (
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.2)",
                  fontWeight: 700,
                }}
              >
                {new Date(match.kickoffAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>
              {new Date(match.kickoffAt).toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
            <div
              style={{
                width: "1px",
                height: "24px",
                background:
                  "linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)",
              }}
            />
          </div>

          {/* Away team */}
          <div className="flex flex-col items-center gap-4 flex-1">
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg, rgba(0,80,160,0.6), rgba(0,140,255,0.2))",
                border: "0.5px solid rgba(0,140,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(0,80,160,0.3)",
              }}
            >
              {match.awayCrest ? (
                <img
                  src={match.awayCrest}
                  alt={match.awayTeam}
                  style={{
                    width: "52px",
                    height: "52px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span style={{ fontSize: "36px" }}>⚽</span>
              )}
            </div>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 800,
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {match.awayTeam}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "0.5px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* Prediction section */}
        {match.status === "FINISHED" ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Final Score
            </div>
            {existing && (
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "14px 24px",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: "6px",
                  }}
                >
                  Your prediction
                </div>
                <div style={{ fontSize: "20px", fontWeight: 900 }}>
                  {existing.predictedHome}{" "}
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>–</span>{" "}
                  {existing.predictedAway}
                </div>
                {existing.pointsAwarded !== null && (
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "13px",
                      color: "#00ff87",
                      fontWeight: 800,
                    }}
                  >
                    +{existing.pointsAwarded} pts
                  </div>
                )}
              </div>
            )}
          </div>
        ) : roomId ? (
          <div className="flex flex-col items-center gap-6 w-full max-w-sm">
            {locked ? (
              <div className="flex flex-col items-center gap-4 text-center">
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    border: "0.5px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  🔒
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    Predictions Locked
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.3)",
                      marginTop: "4px",
                    }}
                  >
                    Locked 30 minutes before kickoff
                  </div>
                </div>
                {existing && (
                  <div
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "0.5px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      padding: "12px 24px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.3)",
                        marginBottom: "4px",
                      }}
                    >
                      Your prediction
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: 900 }}>
                      {existing.predictedHome} – {existing.predictedAway}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  {existing ? "Update Prediction" : "Your Prediction"}
                </div>

                <LockCountdown kickoffAt={match.kickoffAt} />

                {/* Score inputs */}
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-center gap-3">
                    <span
                      style={{
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      {match.homeTeam}
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setHome(Math.max(0, home - 1))}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          border: "0.5px solid rgba(255,255,255,0.15)",
                          background: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "18px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          fontSize: "36px",
                          fontWeight: 900,
                          width: "36px",
                          textAlign: "center",
                          textShadow: "0 0 20px rgba(0,255,135,0.4)",
                        }}
                      >
                        {home}
                      </span>
                      <button
                        onClick={() => setHome(home + 1)}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          border: "0.5px solid rgba(0,255,135,0.3)",
                          background: "rgba(0,255,135,0.06)",
                          color: "#00ff87",
                          fontSize: "18px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "1px",
                      height: "40px",
                      background:
                        "linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent)",
                    }}
                  />

                  <div className="flex flex-col items-center gap-3">
                    <span
                      style={{
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.3)",
                      }}
                    >
                      {match.awayTeam}
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setAway(Math.max(0, away - 1))}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          border: "0.5px solid rgba(255,255,255,0.15)",
                          background: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.5)",
                          fontSize: "18px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          fontSize: "36px",
                          fontWeight: 900,
                          width: "36px",
                          textAlign: "center",
                        }}
                      >
                        {away}
                      </span>
                      <button
                        onClick={() => setAway(away + 1)}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          border: "0.5px solid rgba(0,255,135,0.3)",
                          background: "rgba(0,255,135,0.06)",
                          color: "#00ff87",
                          fontSize: "18px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending}
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #00ff87, #00c864)",
                    color: "#050510",
                    fontSize: "13px",
                    fontWeight: 900,
                    borderRadius: "12px",
                    padding: "14px",
                    border: "none",
                    cursor: "pointer",
                    opacity: mutation.isPending ? 0.6 : 1,
                    letterSpacing: "0.3px",
                    boxShadow: "0 0 30px rgba(0,255,135,0.2)",
                  }}
                >
                  {mutation.isPending
                    ? "Saving..."
                    : existing
                      ? "Update Prediction"
                      : "Submit Prediction"}
                </button>
              </>
            )}
          </div>
        ) : (
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
            Open this match from a room to make a prediction.
          </p>
        )}
      </div>
    </div>
  );
}
