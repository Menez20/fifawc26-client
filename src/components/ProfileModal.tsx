import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/auth";

export default function ProfileModal({
  user,
  onClose,
  isNewUser = false,
}: {
  user: any;
  onClose: () => void;
  isNewUser?: boolean;
}) {
  const qc = useQueryClient();
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");
  const [preview, setPreview] = useState(user.avatarUrl || "");

  const mutation = useMutation({
    mutationFn: () =>
      updateProfile({
        displayName: displayName !== user.displayName ? displayName : undefined,
        avatarUrl: avatarUrl !== user.avatarUrl ? avatarUrl : undefined,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      onClose();
    },
  });

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(4px)",
          zIndex: 40,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "400px",
          zIndex: 50,
          background: "#0d0d1a",
          border: "0.5px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          padding: "28px",
          color: "#fff",
          boxShadow: "0 0 60px rgba(0,0,0,0.6), 0 0 120px rgba(0,255,135,0.04)",
        }}
      >
        {/* Top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            borderRadius: "20px 20px 0 0",
            background:
              "linear-gradient(90deg, transparent, rgba(0,255,135,0.4), transparent)",
          }}
        />

        {/* Header */}
        <div>
          <div style={{ fontSize: "15px", fontWeight: 900 }}>
            {isNewUser ? "👋 Welcome to FIFA WC26!" : "Edit Profile"}
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.3)",
              marginTop: "2px",
            }}
          >
            {isNewUser
              ? "Set up your profile to get started"
              : "Changes override your Google account info"}
          </div>
        </div>

        {/* Avatar preview */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div style={{ position: "relative" }}>
            {preview ? (
              <img
                src={preview}
                alt="avatar"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgba(0,255,135,0.3)",
                }}
                onError={() => setPreview("")}
              />
            ) : (
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00ff87, #0099ff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  fontWeight: 900,
                  color: "#050510",
                }}
              >
                {displayName?.[0]?.toUpperCase() || "?"}
              </div>
            )}
          </div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>
            Avatar preview
          </div>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Display name */}
          <div>
            <label
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Display Name
            </label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={user.displayName}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "13px",
                color: "#fff",
                outline: "none",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,255,135,0.4)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
              }
            />
          </div>

          {/* Avatar URL */}
          <div>
            <label
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Avatar URL
            </label>
            <input
              value={avatarUrl}
              onChange={(e) => {
                setAvatarUrl(e.target.value);
                setPreview(e.target.value);
              }}
              placeholder="https://example.com/avatar.jpg"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "13px",
                color: "#fff",
                outline: "none",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(0,255,135,0.4)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
              }
            />
            <div
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.25)",
                marginTop: "4px",
              }}
            >
              Paste any image URL — leave empty to keep Google avatar
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "12px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              style={{
                flex: 2,
                background: "linear-gradient(135deg, #00ff87, #00c864)",
                border: "none",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "12px",
                fontWeight: 900,
                color: "#050510",
                cursor: "pointer",
                opacity: mutation.isPending ? 0.6 : 1,
              }}
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
