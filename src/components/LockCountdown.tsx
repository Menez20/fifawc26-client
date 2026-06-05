import { useEffect, useState } from "react";

function getTimeToLock(kickoffAt: string) {
  const lockTime = new Date(new Date(kickoffAt).getTime() - 30 * 60 * 1000);
  const diff = lockTime.getTime() - Date.now();
  if (diff <= 0) return null;

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s, diff };
}

export default function LockCountdown({ kickoffAt }: { kickoffAt: string }) {
  const [time, setTime] = useState(getTimeToLock(kickoffAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeToLock(kickoffAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [kickoffAt]);

  if (!time) return null;

  // Only show countdown if under 2 hours to lock
  if (time.diff > 2 * 3600000) return null;

  return (
    <div
      className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border ${time.diff < 5 * 60000 ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-yellow-500/40 bg-yellow-500/10 text-yellow-400"}`}
    >
      <span>🔒 Locks in</span>
      <span className="font-black font-mono">
        {time.h > 0 && `${time.h}h `}
        {String(time.m).padStart(2, "0")}m {String(time.s).padStart(2, "0")}s
      </span>
    </div>
  );
}
