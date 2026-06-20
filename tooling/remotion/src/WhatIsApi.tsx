import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { C, FONT, MONO } from "./theme";

// "O que é uma API?" — clipe de vocabulário (turma nova, nunca viu backend).
// Conta a história requisição → servidor → resposta com os termos aparecendo.

const BG = (
  <AbsoluteFill style={{ background: C.bg }}>
    <AbsoluteFill
      style={{
        backgroundImage: `linear-gradient(${C.line}55 1px, transparent 1px), linear-gradient(90deg, ${C.line}55 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
        opacity: 0.5,
      }}
    />
  </AbsoluteFill>
);

const Side: React.FC<{
  x: number;
  emoji: string;
  title: string;
  sub: string;
  lit: boolean;
  color: string;
}> = ({ x, emoji, title, sub, lit, color }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: 200,
      width: 300,
      height: 300,
      borderRadius: 22,
      background: C.surface,
      border: `1px solid ${lit ? color : C.line}`,
      boxShadow: lit ? `0 0 0 2px ${color}55, 0 0 70px ${color}33` : "0 24px 60px rgba(0,0,0,0.5)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      transition: "all .2s",
    }}
  >
    <div style={{ fontSize: 90 }}>{emoji}</div>
    <div style={{ color: C.text, fontWeight: 900, fontSize: 28 }}>{title}</div>
    <div style={{ color: C.dim, fontSize: 19, textAlign: "center", padding: "0 18px" }}>{sub}</div>
  </div>
);

const Packet: React.FC<{ x: number; y: number; label: string; color: string; o: number }> = ({
  x,
  y,
  label,
  color,
  o,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: "translate(-50%,-50%)",
      opacity: o,
      fontFamily: MONO,
      fontSize: 19,
      fontWeight: 700,
      color: C.bg,
      background: color,
      padding: "10px 18px",
      borderRadius: 999,
      boxShadow: `0 8px 28px ${color}66`,
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </div>
);

export const WhatIsApi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 200 } });

  const leftX = 90;
  const leftW = 300;
  const rightX = width - 300 - 90;
  const midY = 350;

  // pedido (ida) — 45..95
  const goT = interpolate(frame, [45, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const goX = interpolate(goT, [0, 1], [leftX + leftW - 30, rightX + 30]);
  const goO = interpolate(frame, [45, 55, 88, 96], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // servidor aceso — 96..150
  const lit = frame > 96 && frame < 158;

  // resposta (volta) — 150..205
  const backT = interpolate(frame, [150, 205], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const backX = interpolate(backT, [0, 1], [rightX + 30, leftX + leftW - 30]);
  const backO = interpolate(frame, [150, 160, 198, 206], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // legendas de termo (aparecem em momentos)
  const reqLblO = interpolate(frame, [60, 74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const resLblO = interpolate(frame, [165, 179], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const capO = interpolate(frame, [220, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {BG}

      <div
        style={{
          position: "absolute",
          top: 48,
          width: "100%",
          textAlign: "center",
          color: C.text,
          fontSize: 44,
          fontWeight: 900,
          opacity: intro,
        }}
      >
        O que é uma <span style={{ color: C.green }}>API</span>?
      </div>

      {/* trilho */}
      <div
        style={{
          position: "absolute",
          top: midY,
          left: leftX + leftW - 30,
          width: rightX + 30 - (leftX + leftW - 30),
          height: 3,
          background: `repeating-linear-gradient(90deg, ${C.dim}, ${C.dim} 10px, transparent 10px, transparent 20px)`,
          opacity: 0.5 * intro,
        }}
      />

      <div style={{ opacity: intro }}>
        <Side
          x={leftX}
          emoji="🧑‍💻"
          title="VOCÊ"
          sub="o navegador — quem faz o pedido"
          lit={false}
          color={C.react}
        />
        <Side
          x={rightX}
          emoji="🌐"
          title="A API"
          sub="um servidor na internet que responde pedidos"
          lit={lit}
          color={C.green}
        />
      </div>

      {/* pacotes */}
      <Packet x={goX} y={midY} label="GET /produtos" color={C.js} o={goO} />
      <Packet x={backX} y={midY} label="📦 JSON" color={C.json} o={backO} />

      {/* rótulo: requisição */}
      <div
        style={{
          position: "absolute",
          top: midY - 70,
          left: (leftX + leftW - 30 + rightX + 30) / 2,
          transform: "translateX(-50%)",
          color: C.js,
          fontWeight: 800,
          fontSize: 22,
          opacity: reqLblO,
          textAlign: "center",
        }}
      >
        requisição<div style={{ color: C.dim, fontSize: 16, fontWeight: 600 }}>(o pedido)</div>
      </div>

      {/* rótulo: resposta */}
      <div
        style={{
          position: "absolute",
          top: midY + 36,
          left: (leftX + leftW - 30 + rightX + 30) / 2,
          transform: "translateX(-50%)",
          color: C.json,
          fontWeight: 800,
          fontSize: 22,
          opacity: resLblO,
          textAlign: "center",
        }}
      >
        resposta<div style={{ color: C.dim, fontSize: 16, fontWeight: 600 }}>(os dados, em JSON)</div>
      </div>

      {/* legenda final */}
      <div
        style={{
          position: "absolute",
          bottom: 46,
          width: "100%",
          textAlign: "center",
          color: C.text,
          fontSize: 27,
          fontWeight: 700,
          opacity: capO,
          padding: "0 60px",
          boxSizing: "border-box",
        }}
      >
        uma <span style={{ color: C.green }}>API</span> é um lugar na internet que{" "}
        <span style={{ color: C.js }}>responde pedidos</span> com dados
      </div>
    </AbsoluteFill>
  );
};
