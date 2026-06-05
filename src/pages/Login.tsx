export default function Login() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#05050f" }}
    >
      {/* Atmospheric gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(255,120,30,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(0,80,255,0.25) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 50% 50%, rgba(0,255,135,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,120,30,0.8), rgba(0,255,135,0.5), transparent)",
        }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,80,255,0.5), transparent)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Trophy */}
        <div
          style={{
            fontSize: "72px",
            filter: "drop-shadow(0 0 40px rgba(255,120,30,0.7))",
          }}
        >
          🏆
        </div>

        {/* Title */}
        <div className="text-center flex flex-col gap-2">
          <h1
            className="text-white font-black tracking-tighter"
            style={{
              fontSize: "52px",
              lineHeight: 1,
              textShadow: "0 0 60px rgba(0,255,135,0.2)",
            }}
          >
            FIFA WC<span style={{ color: "#00ff87" }}>26</span>
          </h1>
          <p
            className="tracking-widest uppercase"
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "4px",
            }}
          >
            Predict · Compete · Win
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-64">
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))",
            }}
          />
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>
            sign in to continue
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)",
            }}
          />
        </div>

        {/* Google button */}
        <a
          href="http://localhost:3000/auth/google"
          className="flex items-center gap-3 font-black transition-all duration-300 hover:scale-105"
          style={{
            background: "rgba(255,255,255,0.95)",
            color: "#050510",
            borderRadius: "40px",
            padding: "14px 32px",
            fontSize: "13px",
            letterSpacing: "0.3px",
            boxShadow:
              "0 0 40px rgba(0,255,135,0.15), 0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </a>

        {/* Footer note */}
        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.15)" }}>
          Free to play · No ads · WC2026
        </p>
      </div>
    </div>
  );
}
