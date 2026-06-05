import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getMatches } from "../api/matches";
import { getMyRooms, createRoom, joinRoom } from "../api/rooms";
import { logout } from "../api/auth";
import TeamCrest from "../components/TeamCrest";
import GroupsCarousel from "../components/GroupsCarousel";

export default function Dashboard({ user }: { user: any }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [roomName, setRoomName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 7;

  const { data: matches = [] } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  });
  const { data: rooms = [] } = useQuery({
    queryKey: ["rooms"],
    queryFn: getMyRooms,
  });

  const createMutation = useMutation({
    mutationFn: () => createRoom(roomName),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rooms"] });
      setRoomName("");
    },
  });

  const joinMutation = useMutation({
    mutationFn: () => joinRoom(inviteCode),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rooms"] });
      setInviteCode("");
    },
  });

  const stages = [
    "ALL",
    ...Array.from(new Set(matches.map((m: any) => m.stage as string))),
  ] as string[];
  const upcoming = matches.filter((m: any) => {
    if (m.status !== "SCHEDULED") return false;
    if (stageFilter !== "ALL" && m.stage !== stageFilter) return false;
    return true;
  });
  const totalPages = Math.ceil(upcoming.length / PAGE_SIZE);
  const pageMatches = upcoming.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const daysToWC = Math.max(
    0,
    Math.ceil((new Date("2026-06-11").getTime() - Date.now()) / 86400000),
  );

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#06060f", color: "#fff" }}
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 0% 0%, rgba(255,100,20,0.18) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 100% 0%, rgba(0,200,255,0.09) 0%, transparent 50%), radial-gradient(ellipse 60% 30% at 50% 100%, rgba(0,255,135,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,100,20,0.6), rgba(0,200,255,0.4), transparent)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: "0.5px solid rgba(255,255,255,0.07)",
          background:
            "linear-gradient(180deg, rgba(255,100,20,0.06) 0%, transparent 100%)",
        }}
      >
        <div
          style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "-0.5px" }}
        >
          FIFA WC<span style={{ color: "#00ff87" }}>26</span>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate("/groups")}
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.05)",
              border: "0.5px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "5px 14px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00ff87")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
            }
          >
            Groups
          </button>
          <div className="flex items-center gap-2">
            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                className="w-7 h-7 rounded-full"
                style={{ border: "1.5px solid rgba(0,255,135,0.3)" }}
              />
            )}
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
              {user.displayName}
            </span>
          </div>
          <button
            onClick={() => {
              window.location.href = "http://localhost:3000/auth/logout";
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11px",
              color: "rgba(255,255,255,0.25)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.25)")
            }
          >
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Hero banner */}
      <div
        className="relative z-10 px-6 py-6"
        style={{
          borderBottom: "0.5px solid rgba(255,255,255,0.05)",
          background:
            "linear-gradient(180deg, rgba(255,100,20,0.06) 0%, transparent 100%)",
        }}
      >
        <div
          style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.5px" }}
        >
          Good{" "}
          {new Date().getHours() < 12
            ? "morning"
            : new Date().getHours() < 18
              ? "afternoon"
              : "evening"}{" "}
          ⚡
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)",
            marginTop: "4px",
          }}
        >
          WC2026 kicks off in{" "}
          <span style={{ color: "#00ff87", fontWeight: 700 }}>
            {daysToWC} days
          </span>
          {" · "}
          <span style={{ color: "#f59e0b" }}>48 teams · 104 matches</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT — Upcoming matches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
              }}
            >
              Upcoming Matches
            </div>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>
              {upcoming.length} matches
            </span>
          </div>

          {/* Stage filters */}
          <div className="flex gap-2 flex-wrap mb-5">
            {stages.map((stage: string) => (
              <button
                key={stage}
                onClick={() => {
                  setStageFilter(stage);
                  setPage(0);
                }}
                style={{
                  fontSize: "9px",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  border:
                    stageFilter === stage
                      ? "0.5px solid #00ff87"
                      : "0.5px solid rgba(255,255,255,0.1)",
                  color:
                    stageFilter === stage
                      ? "#00ff87"
                      : "rgba(255,255,255,0.35)",
                  background:
                    stageFilter === stage
                      ? "rgba(0,255,135,0.08)"
                      : "rgba(255,255,255,0.03)",
                  transition: "all 0.2s",
                }}
              >
                {stage === "ALL" ? "All" : stage.replace(/_/g, " ")}
              </button>
            ))}
          </div>

          {/* Match cards */}
          <div className="flex flex-col gap-3">
            {pageMatches.map((match: any) => (
              <div
                key={match.id}
                onClick={() => navigate(`/matches/${match.id}`)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    color: "rgba(255,255,255,0.25)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  {match.stage.replace(/_/g, " ")}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <TeamCrest
                      src={match.homeCrest}
                      name={match.homeTeam}
                      size={6}
                    />
                    <span
                      style={{ fontSize: "12px", fontWeight: 700 }}
                      className="truncate"
                    >
                      {match.homeTeam}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "9px",
                      color: "rgba(255,255,255,0.2)",
                      flexShrink: 0,
                    }}
                  >
                    vs
                  </span>
                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                    <span
                      style={{ fontSize: "12px", fontWeight: 700 }}
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
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.25)",
                    marginTop: "6px",
                  }}
                >
                  {new Date(match.kickoffAt).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
            {upcoming.length === 0 && (
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
                No matches for this stage.
              </p>
            )}
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

        {/* RIGHT — Rooms + Groups carousel */}
        <div className="flex flex-col gap-6">
          {/* My Rooms */}
          <div>
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              My Rooms
            </div>
            <div className="flex flex-col gap-3">
              {rooms.map((room: any) => (
                <div
                  key={room.id}
                  onClick={() => navigate(`/rooms/${room.id}`)}
                  style={{
                    background:
                      room.inviteCode === "GLOBAL"
                        ? "linear-gradient(135deg, rgba(0,255,135,0.08), rgba(0,255,135,0.02))"
                        : "rgba(255,255,255,0.04)",
                    border:
                      room.inviteCode === "GLOBAL"
                        ? "0.5px solid rgba(0,255,135,0.2)"
                        : "0.5px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,255,135,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      room.inviteCode === "GLOBAL"
                        ? "rgba(0,255,135,0.2)"
                        : "rgba(255,255,255,0.08)";
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: "13px", fontWeight: 800 }}>
                        {room.name}
                      </span>
                      {room.inviteCode === "GLOBAL" && (
                        <span
                          style={{
                            fontSize: "8px",
                            background: "rgba(0,255,135,0.12)",
                            border: "0.5px solid rgba(0,255,135,0.25)",
                            borderRadius: "20px",
                            color: "#00ff87",
                            padding: "2px 7px",
                          }}
                        >
                          Global
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.25)",
                      }}
                    >
                      {room._count.members} members →
                    </span>
                  </div>
                  {room.inviteCode !== "GLOBAL" && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#00ff87",
                        fontFamily: "monospace",
                        marginTop: "4px",
                        opacity: 0.7,
                      }}
                    >
                      {room.inviteCode}
                    </div>
                  )}
                </div>
              ))}
              {rooms.length === 0 && (
                <p
                  style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}
                >
                  No rooms yet.
                </p>
              )}
            </div>
          </div>

          {/* Create + Join */}
          <div className="grid grid-cols-2 gap-3">
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "2px",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Create
              </div>
              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Room name..."
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  fontSize: "12px",
                  color: "#fff",
                  outline: "none",
                  marginBottom: "8px",
                }}
              />
              <button
                onClick={() => createMutation.mutate()}
                disabled={!roomName || createMutation.isPending}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #00ff87, #00c864)",
                  color: "#050510",
                  fontSize: "11px",
                  fontWeight: 800,
                  borderRadius: "8px",
                  padding: "8px",
                  border: "none",
                  cursor: roomName ? "pointer" : "default",
                  opacity: roomName ? 1 : 0.4,
                }}
              >
                {createMutation.isPending ? "Creating..." : "Create"}
              </button>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "2px",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Join
              </div>
              <input
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="Invite code..."
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  fontSize: "12px",
                  color: "#00ff87",
                  fontFamily: "monospace",
                  outline: "none",
                  marginBottom: "8px",
                }}
              />
              <button
                onClick={() => joinMutation.mutate()}
                disabled={!inviteCode || joinMutation.isPending}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "0.5px solid rgba(0,255,135,0.4)",
                  color: "#00ff87",
                  fontSize: "11px",
                  fontWeight: 800,
                  borderRadius: "8px",
                  padding: "8px",
                  cursor: inviteCode ? "pointer" : "default",
                  opacity: inviteCode ? 1 : 0.4,
                }}
              >
                {joinMutation.isPending ? "Joining..." : "Join"}
              </button>
            </div>
          </div>

          {/* Groups carousel */}
          <GroupsCarousel />
        </div>
      </div>
    </div>
  );
}
