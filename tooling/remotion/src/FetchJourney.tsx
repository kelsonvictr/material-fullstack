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
import { Browser, ServerBox } from "./Browser";

const PRODUTOS = [
  { nome: "Teclado Mecânico", preco: "R$ 320,00" },
  { nome: "Monitor 27\"", preco: "R$ 1.450,00" },
  { nome: "Cadeira Gamer", preco: "R$ 980,00" },
];

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
      fontSize: 18,
      fontWeight: 700,
      color: C.bg,
      background: color,
      padding: "8px 16px",
      borderRadius: 999,
      boxShadow: `0 6px 24px ${color}66`,
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </div>
);

export const FetchJourney: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const browserX = 70;
  const browserW = 560;
  const serverW = 330;
  const serverX = width - serverW - 70;
  const midY = 300;

  // entrada
  const intro = spring({ frame, fps, config: { damping: 200 } });

  // pacote de ida (GET) — frames 36..78
  const goT = interpolate(frame, [36, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const goX = interpolate(goT, [0, 1], [browserX + browserW - 40, serverX + 40]);
  const goO = interpolate(frame, [36, 44, 72, 80], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // servidor acende — 80..96
  const lit = frame > 80 && frame < 150;

  // pacote de volta (JSON) — 100..146
  const backT = interpolate(frame, [100, 146], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const backX = interpolate(backT, [0, 1], [serverX + 40, browserX + browserW - 40]);
  const backO = interpolate(frame, [100, 108, 140, 148], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // legenda final
  const capO = interpolate(frame, [210, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {BG}

      {/* título */}
      <div
        style={{
          position: "absolute",
          top: 44,
          width: "100%",
          textAlign: "center",
          color: C.text,
          fontSize: 40,
          fontWeight: 900,
          opacity: intro,
        }}
      >
        A jornada do <span style={{ color: C.js }}>fetch</span>
      </div>

      {/* linha entre os dois */}
      <div
        style={{
          position: "absolute",
          top: midY,
          left: browserX + browserW - 40,
          width: serverX + 40 - (browserX + browserW - 40),
          height: 3,
          background: `repeating-linear-gradient(90deg, ${C.dim}, ${C.dim} 10px, transparent 10px, transparent 20px)`,
          opacity: 0.5 * intro,
        }}
      />

      {/* navegador (front) */}
      <div style={{ position: "absolute", left: browserX, top: 120, opacity: intro }}>
        <Browser url="localhost:5500" width={browserW} height={420}>
          <div style={{ padding: 24 }}>
            <div style={{ color: C.text, fontSize: 24, fontWeight: 800, marginBottom: 16 }}>
              Painel de Produtos
            </div>
            {frame < 150 ? (
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 18,
                  color: C.dim,
                  background: C.codeBg,
                  border: `1px solid ${C.line}`,
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <span style={{ color: C.react }}>fetch</span>(
                <span style={{ color: C.green }}>"/produtos"</span>)
                <br />
                <span style={{ color: C.dim }}>  carregando…</span>
              </div>
            ) : (
              PRODUTOS.map((p, i) => {
                const a = spring({ frame: frame - 150 - i * 10, fps, config: { damping: 200 } });
                return (
                  <div
                    key={p.nome}
                    style={{
                      opacity: a,
                      transform: `translateY(${interpolate(a, [0, 1], [16, 0])}px)`,
                      background: C.surface2,
                      border: `1px solid ${C.line}`,
                      borderRadius: 10,
                      padding: "12px 16px",
                      marginBottom: 10,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: C.text, fontWeight: 700, fontSize: 18 }}>{p.nome}</span>
                    <span style={{ color: C.js, fontFamily: MONO, fontSize: 16 }}>{p.preco}</span>
                  </div>
                );
              })
            )}
          </div>
        </Browser>
        <div style={{ textAlign: "center", color: C.dim, marginTop: 12, fontSize: 18 }}>
          🖥️ seu navegador (front)
        </div>
      </div>

      {/* servidor (back) */}
      <div style={{ position: "absolute", left: serverX, top: 150, opacity: intro }}>
        <ServerBox width={serverW} height={340} lit={lit} />
        <div style={{ textAlign: "center", color: C.dim, marginTop: 12, fontSize: 18 }}>
          🌐 um servidor na internet (a API)
        </div>
      </div>

      {/* pacotes */}
      <Packet x={goX} y={midY} label="GET /produtos" color={C.js} o={goO} />
      <Packet x={backX} y={midY} label='JSON [ {…}, {…} ]' color={C.json} o={backO} />

      {/* legenda */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          textAlign: "center",
          color: C.text,
          fontSize: 26,
          fontWeight: 700,
          opacity: capO,
        }}
      >
        do navegador → <span style={{ color: C.spring }}>a API</span> → de volta como{" "}
        <span style={{ color: C.js }}>cards</span> na tela
      </div>
    </AbsoluteFill>
  );
};
