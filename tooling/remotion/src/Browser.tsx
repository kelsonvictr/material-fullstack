import React from "react";
import { C, FONT, MONO } from "./theme";

// Janelinha de navegador (chrome estilo macOS) — usada nos dois clipes.
export const Browser: React.FC<{
  url?: string;
  width: number;
  height: number;
  children: React.ReactNode;
  glow?: boolean;
}> = ({ url = "localhost:5500", width, height, children, glow }) => (
  <div
    style={{
      width,
      height,
      borderRadius: 18,
      background: C.surface,
      border: `1px solid ${C.line}`,
      overflow: "hidden",
      boxShadow: glow
        ? `0 0 0 2px ${C.js}55, 0 30px 80px rgba(0,0,0,0.55)`
        : "0 30px 80px rgba(0,0,0,0.55)",
      fontFamily: FONT,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        height: 44,
        background: C.surface2,
        borderBottom: `1px solid ${C.line}`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 18px",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
          <div key={c} style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          height: 26,
          borderRadius: 8,
          background: C.bg2,
          color: C.dim,
          fontFamily: MONO,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 8,
        }}
      >
        <span style={{ color: C.green }}>🔒</span>
        {url}
      </div>
    </div>
    <div style={{ flex: 1, position: "relative", background: C.bg }}>{children}</div>
  </div>
);

// Servidor (sua API Spring) — bloco do lado direito do clipe de fetch.
export const ServerBox: React.FC<{ width: number; height: number; lit: boolean }> = ({
  width,
  height,
  lit,
}) => (
  <div
    style={{
      width,
      height,
      borderRadius: 18,
      background: C.surface,
      border: `1px solid ${lit ? C.spring : C.line}`,
      boxShadow: lit ? `0 0 0 2px ${C.spring}55, 0 0 60px ${C.spring}33` : "none",
      fontFamily: FONT,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      transition: "all 0.2s",
    }}
  >
    <div style={{ fontSize: 52 }}>🍃</div>
    <div style={{ color: C.text, fontWeight: 800, fontSize: 26 }}>SUA API</div>
    <div style={{ color: C.dim, fontSize: 18 }}>Spring Boot</div>
    <div
      style={{
        fontFamily: MONO,
        fontSize: 16,
        color: lit ? C.spring : C.dim,
        background: C.codeBg,
        padding: "6px 12px",
        borderRadius: 8,
        border: `1px solid ${C.line}`,
      }}
    >
      @GetMapping("/produtos")
    </div>
  </div>
);
