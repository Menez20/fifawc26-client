const sizeMap: Record<number, string> = {
  6: "w-6 h-6",
  8: "w-8 h-8",
  10: "w-10 h-10",
  12: "w-12 h-12",
};

export default function TeamCrest({
  src,
  name,
  size = 6,
}: {
  src?: string;
  name: string;
  size?: number;
}) {
  const sizeClass = sizeMap[size] ?? "w-6 h-6";

  if (!src)
    return (
      <div
        className={`${sizeClass} rounded-full bg-zinc-800 flex items-center justify-center text-xs shrink-0`}
      >
        ⚽
      </div>
    );

  return (
    <img
      src={src}
      alt={name}
      className={`${sizeClass} object-contain shrink-0`}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
