import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getGroups } from "../api/matches";

export default function GroupsCarousel() {
  const navigate = useNavigate();
  const { data: groups = [] } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % groups.length);
    }, 3000);
  };

  useEffect(() => {
    if (groups.length === 0) return;
    startTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [groups.length]);

  if (groups.length === 0) return null;

  const prev = (current - 1 + groups.length) % groups.length;
  const next = (current + 1) % groups.length;

  const getSlideStyle = (index: number) => {
    if (index === prev) return "scale-90 opacity-40 -translate-y-16 z-0";
    if (index === current) return "scale-100 opacity-100 translate-y-0 z-10";
    if (index === next) return "scale-90 opacity-40 translate-y-16 z-0";
    return "opacity-0 scale-75 z-0";
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
          Group Standings
        </h2>
        <button
          onClick={() => navigate("/groups")}
          className="text-xs text-zinc-600 hover:text-[#00ff87] transition-colors"
        >
          View all →
        </button>
      </div>

      {/* Carousel */}
      <div
        className="relative h-56 overflow-hidden cursor-pointer"
        onClick={() => navigate("/groups")}
      >
        {groups.map((group: any, i: number) => (
          <div
            key={group.group}
            className={`absolute inset-x-0 mx-auto w-full transition-all duration-500 ease-in-out ${getSlideStyle(i)}`}
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              {/* Group header */}
              <div className="px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between">
                <span className="font-black text-sm text-[#00ff87]">
                  {group.group}
                </span>
                <div className="flex gap-3 text-xs text-zinc-600 font-mono">
                  <span className="w-4 text-center">P</span>
                  <span className="w-4 text-center">W</span>
                  <span className="w-4 text-center">D</span>
                  <span className="w-4 text-center">L</span>
                  <span className="w-6 text-center">Pts</span>
                </div>
              </div>

              {/* Teams */}
              {group.table.map((row: any) => (
                <div
                  key={row.team.id}
                  className={`flex items-center gap-3 px-4 py-2 border-b border-zinc-800/40 last:border-0 ${row.position <= 2 ? "bg-[#00ff87]/3" : ""}`}
                >
                  <span
                    className={`text-xs font-black w-3 shrink-0 ${row.position <= 2 ? "text-[#00ff87]" : "text-zinc-600"}`}
                  >
                    {row.position}
                  </span>
                  <img
                    src={row.team.crest}
                    alt={row.team.name}
                    className="w-4 h-4 object-contain shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <span className="flex-1 text-xs font-medium truncate">
                    {row.team.name}
                  </span>
                  <div className="flex gap-3 text-xs font-mono text-zinc-500 shrink-0">
                    <span className="w-4 text-center">{row.playedGames}</span>
                    <span className="w-4 text-center">{row.won}</span>
                    <span className="w-4 text-center">{row.draw}</span>
                    <span className="w-4 text-center">{row.lost}</span>
                    <span className="w-6 text-center font-black text-white">
                      {row.points}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bullet navigation */}
      <div className="flex items-center justify-center gap-1.5">
        {groups.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              startTimer();
            }}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-4 h-1.5 bg-[#00ff87]" : "w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500"}`}
          />
        ))}
      </div>
    </div>
  );
}
