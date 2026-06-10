import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const isNewUser = searchParams.get("newUser") === "true";
    if (token) {
      localStorage.setItem("access_token", token);
      if (isNewUser) {
        localStorage.setItem("show_profile_setup", "true");
      }
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

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
}
