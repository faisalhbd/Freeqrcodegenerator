import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#14171C",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 460,
            height: 460,
            borderRadius: 40,
            background: "#FBF8F1",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 220,
              height: 220,
              borderRadius: 24,
              background: "#FF6B35",
            }}
          />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#1B1B18" }}>
            SCAN ME
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 56,
            fontWeight: 700,
            color: "#F2F1ED",
          }}
        >
          Free QR Code Generator
        </div>
        <div style={{ display: "flex", marginTop: 12, fontSize: 28, color: "#8A94A6" }}>
          No sign-up · No tracking · 20+ platforms
        </div>
      </div>
    ),
    { ...size }
  );
}
