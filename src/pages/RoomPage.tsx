import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRoom } from "../api/rooms";
import { getLeaderboard, getMyPredictions } from "../api/predictions";
import { getMatches } from "../api/matches";
import { isLocked } from "../utils/time";
import TeamCrest from "../components/TeamCrest";

const MEDAL = ["🥇", "🥈", "🥉"];

export default function RoomPage({ user }: { user: any }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const { data: room } = useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoom(id!),
  });
  const { data: leaderboard = [] } = useQuery({
    queryKey: ["leaderboard", id],
    queryFn: () => getLeaderboard(id!),
  });
  const { data: predictions = [] } = useQuery({
    queryKey: ["predictions", id],
    queryFn: () => getMyPredictions(id!),
  });
  const { data: matches = [] } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  });

  const predictedMatchIds = new Set(predictions.map((p: any) => p.matchId));
  const upcoming = matches.filter((m: any) => m.status === "SCHEDULED");

  const copyInvite = () => {
    navigator.clipboard.writeText(room?.inviteCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(upcoming.length / PAGE_SIZE);
  const pageMatches = upcoming.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const medalStyle = (i: number) => {
    if (i === 0)
      return {
        background:
          "linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.02))",
        border: "0.5px solid rgba(255,215,0,0.25)",
      };
    if (i === 1)
      return {
        background:
          "linear-gradient(135deg, rgba(192,192,192,0.08), rgba(192,192,192,0.01))",
        border: "0.5px solid rgba(192,192,192,0.2)",
      };
    if (i === 2)
      return {
        background:
          "linear-gradient(135deg, rgba(205,127,50,0.08), rgba(205,127,50,0.01))",
        border: "0.5px solid rgba(205,127,50,0.2)",
      };
    return {
      background: "rgba(255,255,255,0.03)",
      border: "0.5px solid rgba(255,255,255,0.07)",
    };
  };

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
            "radial-gradient(ellipse 60% 40% at 0% 0%, rgba(0,255,135,0.07) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 100% 100%, rgba(0,80,255,0.07) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,255,135,0.3), transparent)",
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
          <div style={{ fontSize: "15px", fontWeight: 900 }}>{room?.name}</div>
          {room?.inviteCode !== "GLOBAL" && (
            <div
              style={{
                fontSize: "10px",
                color: "#00ff87",
                fontFamily: "monospace",
                opacity: 0.7,
              }}
            >
              {room?.inviteCode}
            </div>
          )}
        </div>
        {room?.inviteCode !== "GLOBAL" ? (
          <button
            onClick={copyInvite}
            style={{
              fontSize: "11px",
              color: copied ? "#00ff87" : "rgba(255,255,255,0.4)",
              background: copied
                ? "rgba(0,255,135,0.08)"
                : "rgba(255,255,255,0.05)",
              border: copied
                ? "0.5px solid rgba(0,255,135,0.3)"
                : "0.5px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "5px 12px",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {copied ? "✓ Copied!" : "📋 Copy invite"}
          </button>
        ) : (
          <div style={{ width: "80px" }} />
        )}
      </header>

      {/* Body */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT — Leaderboard */}
        <div>
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "2px",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Leaderboard
          </div>
          <div className="flex flex-col gap-2">
            {leaderboard.map((member: any, i: number) => (
              <div
                key={member.id}
                style={{
                  ...medalStyle(i),
                  borderRadius: "12px",
                  padding: i < 3 ? "12px 14px" : "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.2s",
                  outline:
                    member.userId === user.id
                      ? "1px solid rgba(0,255,135,0.3)"
                      : "none",
                }}
              >
                <span
                  style={{
                    fontSize: i < 3 ? "20px" : "12px",
                    width: "24px",
                    textAlign: "center",
                    color: i >= 3 ? "rgba(255,255,255,0.3)" : undefined,
                  }}
                >
                  {i < 3 ? MEDAL[i] : i + 1}
                </span>
                {member.user.avatarUrl ? (
                  <img
                    src={member.user.avatarUrl}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #00ff87, #0099ff)",
                      flexShrink: 0,
                    }}
                  />
                )}
                <span style={{ flex: 1, fontSize: "12px", fontWeight: 600 }}>
                  {member.user.displayName}
                </span>
                {member.userId === user.id && (
                  <span
                    style={{
                      fontSize: "8px",
                      color: "#00ff87",
                      background: "rgba(0,255,135,0.1)",
                      border: "0.5px solid rgba(0,255,135,0.2)",
                      borderRadius: "20px",
                      padding: "2px 6px",
                    }}
                  >
                    You
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span
                    style={{
                      fontSize: i === 0 ? "16px" : "13px",
                      fontWeight: 900,
                      color:
                        i === 0
                          ? "#00ff87"
                          : i === 1
                            ? "rgba(255,255,255,0.7)"
                            : i === 2
                              ? "rgba(205,127,50,0.9)"
                              : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {member.score}
                  </span>
                  <span
                    style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)" }}
                  >
                    pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Matches */}
        {/* RIGHT — Matches */}
        <div>
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "2px",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Matches to predict ·{" "}
            <span style={{ color: "#00ff87" }}>
              {predictions.length} predicted
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {pageMatches.map((match: any) => {
              const predicted = predictedMatchIds.has(match.id);
              const locked = isLocked(match.kickoffAt);
              return (
                <div
                  key={match.id}
                  onClick={() => navigate(`/matches/${match.id}?roomId=${id}`)}
                  style={{
                    background: predicted
                      ? "linear-gradient(135deg, rgba(0,255,135,0.06), rgba(0,255,135,0.01))"
                      : "rgba(255,255,255,0.03)",
                    border: predicted
                      ? "0.5px solid rgba(0,255,135,0.2)"
                      : "0.5px solid rgba(255,255,255,0.07)",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = predicted
                      ? "rgba(0,255,135,0.4)"
                      : "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = predicted
                      ? "rgba(0,255,135,0.2)"
                      : "rgba(255,255,255,0.07)";
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <TeamCrest
                        src={match.homeCrest}
                        name={match.homeTeam}
                        size={6}
                      />
                      <span
                        style={{ fontSize: "11px", fontWeight: 700 }}
                        className="truncate"
                      >
                        {match.homeTeam}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "8px",
                        color: "rgba(255,255,255,0.2)",
                        flexShrink: 0,
                      }}
                    >
                      vs
                    </span>
                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                      <span
                        style={{ fontSize: "11px", fontWeight: 700 }}
                        className="truncate"
                      >
                        {match.awayTeam}
                      </span>
                      <TeamCrest
                        src={match.awayCrest}
                        name={match.awayTeam}
                        size={6}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      style={{
                        fontSize: "9px",
                        color: "rgba(255,255,255,0.25)",
                      }}
                    >
                      {new Date(match.kickoffAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <div className="flex items-center gap-2">
                      {locked && (
                        <span
                          style={{
                            fontSize: "9px",
                            color: "rgba(255,255,255,0.2)",
                          }}
                        >
                          🔒
                        </span>
                      )}
                      {predicted && (
                        <span style={{ fontSize: "9px", color: "#00ff87" }}>
                          ✓ Predicted
                        </span>
                      )}
                      {!predicted && !locked && (
                        <span
                          style={{
                            fontSize: "9px",
                            color: "rgba(255,255,255,0.3)",
                          }}
                        >
                          Predict →
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                style={{
                  color:
                    page === 0
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(255,255,255,0.5)",
                  background: "none",
                  border: "none",
                  cursor: page === 0 ? "default" : "pointer",
                  fontSize: "16px",
                }}
              >
                ←
              </button>
              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    style={{
                      borderRadius: "9999px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      width: i === page ? "16px" : "6px",
                      height: "6px",
                      background:
                        i === page ? "#00ff87" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                style={{
                  color:
                    page === totalPages - 1
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(255,255,255,0.5)",
                  background: "none",
                  border: "none",
                  cursor: page === totalPages - 1 ? "default" : "pointer",
                  fontSize: "16px",
                }}
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
