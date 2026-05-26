import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#07162f",
          borderRadius: 40,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 64 64" fill="none">
          <path
            d="M17 45 28 18l11 27"
            stroke="#f8fafc"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5.5"
          />
          <path
            d="M23.5 34h11"
            stroke="#7dd3fc"
            strokeLinecap="round"
            strokeWidth="5.5"
          />
          <path
            d="M43 19v26h11"
            stroke="#f8fafc"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5.5"
          />
          <path
            d="M35.5 35.5h9"
            stroke="#7dd3fc"
            strokeLinecap="round"
            strokeWidth="4.5"
          />
        </svg>
      </div>
    ),
    size,
  );
}
