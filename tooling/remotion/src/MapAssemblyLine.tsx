import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { C, FONT, MONO } from "./theme";

// "A esteira do .map()" — Cap 05. O array entra, cada item passa pelo molde
// (o componente) e sai um card. Item novo no array → card novo. O código não muda.

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

const PRODUTOS = [
  { id: 1, nome: "Teclado", preco: 320, emoji: "⌨️", inAt: 20, outAt: 75 },
  { id: 2, nome: "Monitor", preco: 1450, emoji: "🖥️", inAt: 32, outAt: 110 },
  { id: 3, nome: "Cadeira", preco: 980, emoji: "🪑", inAt: 44, outAt: 145 },
  { id: 4, nome: "Mouse", preco: 180, emoji: "🖱️", inAt: 195, outAt: 232 },
];

const Pill: React.FC<{ nome: string; id: number; appear: number; fresh: boolean }> = ({
  nome,
  id,
  appear,
  fresh,
}) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 17,
      color: C.text,
      background: C.codeBg,
      border: `1px solid ${fresh ? C.js : C.line}`,
      boxShadow: fresh ? `0 0 26px ${C.js}33` : "none",
      borderRadius: 10,
      padding: "9px 12px",
      whiteSpace: "pre",
      opacity: appear,
      transform: `translateX(${interpolate(appear, [0, 1], [-24, 0])}px)`,
    }}
  >
    <span style={{ color: C.dim }}>{"{ "}</span>
    <span style={{ color: C.green }}>id</span>
    <span style={{ color: C.dim }}>: </span>
    <span style={{ color: C.js }}>{id}</span>
    <span style={{ color: C.dim }}>, </span>
    <span style={{ color: C.green }}>nome</span>
    <span style={{ color: C.dim }}>: </span>
    <span style={{ color: C.json }}>&quot;{nome}&quot;</span>
    <span style={{ color: C.dim }}>{" }"}</span>
  </div>
);

const Card: React.FC<{
  nome: string;
  preco: number;
  emoji: string;
  id: number;
  pop: number;
}> = ({ nome, preco, emoji, id, pop }) => (
  <div
    style={{
      width: 270,
      background: "#ffffff",
      borderRadius: 14,
      padding: "10px 16px",
      boxShadow: "0 14px 34px rgba(0,0,0,0.5)",
      fontFamily: FONT,
      display: "flex",
      alignItems: "center",
      gap: 12,
      opacity: pop,
      transform: `translateX(${interpolate(pop, [0, 1], [-40, 0])}px) scale(${interpolate(
        pop,
        [0, 1],
        [0.8, 1]
      )})`,
    }}
  >
    <div style={{ fontSize: 34 }}>{emoji}</div>
    <div>
      <div style={{ fontFamily: MONO, fontSize: 11, color: "#94a3b8" }}>key={id}</div>
      <div style={{ fontSize: 19, fontWeight: 900, color: "#0f172a", lineHeight: 1.1 }}>{nome}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: "#16a34a" }}>R$ {preco}</div>
    </div>
  </div>
);

export const MapAssemblyLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 200 } });
  const machineIn = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const punch = interpolate(frame, [238, 256], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // engrenagem gira enquanto algum item está "passando" pela esteira
  const busy =
    PRODUTOS.some((p) => frame >= p.inAt + 20 && frame <= p.outAt + 12) || frame < 160;
  const gearTurn = frame * (busy ? 6 : 1);

  const titleText =
    frame < 185
      ? "A esteira do .map(): 1 item entra = 1 card sai"
      : "chegou item novo? o código NÃO muda";

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {BG}

      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          color: C.text,
          fontSize: 38,
          fontWeight: 900,
          opacity: intro,
        }}
      >
        {titleText}
      </div>

      {/* coluna do array */}
      <div style={{ position: "absolute", top: 150, left: 52, width: 330 }}>
        <div style={{ color: C.dim, fontWeight: 800, fontSize: 18, marginBottom: 12 }}>
          📦 o array <span style={{ fontFamily: MONO, color: C.text }}>produtos</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PRODUTOS.map((p) => {
            const appear = spring({
              frame: frame - p.inAt,
              fps,
              config: { damping: 15, stiffness: 150 },
            });
            return (
              <Pill
                key={p.id}
                id={p.id}
                nome={p.nome}
                appear={appear}
                fresh={p.id === 4 && frame >= p.inAt && frame < 250}
              />
            );
          })}
        </div>
      </div>

      {/* a máquina .map() */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 420,
          width: 400,
          opacity: machineIn,
          transform: `translateY(${interpolate(machineIn, [0, 1], [24, 0])}px)`,
        }}
      >
        <div
          style={{
            background: C.surface,
            border: `2px solid ${C.react}`,
            borderRadius: 20,
            padding: "22px 24px",
            boxShadow: `0 0 60px ${C.react}22, 0 24px 60px rgba(0,0,0,0.5)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 46,
              transform: `rotate(${gearTurn}deg)`,
              display: "inline-block",
              lineHeight: 1,
            }}
          >
            ⚙️
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 21,
              marginTop: 14,
              whiteSpace: "pre",
            }}
          >
            <span style={{ color: C.text }}>produtos</span>
            <span style={{ color: C.js }}>.map</span>
            <span style={{ color: C.dim }}>((</span>
            <span style={{ color: C.js }}>p</span>
            <span style={{ color: C.dim }}>) </span>
            <span style={{ color: C.green }}>=&gt;</span>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 21, whiteSpace: "pre" }}>
            <span style={{ color: C.dim }}>  </span>
            <span style={{ color: C.react }}>&lt;CartaoProduto /&gt;</span>
            <span style={{ color: C.dim }}>)</span>
          </div>
          <div style={{ color: C.dim, fontSize: 15, fontWeight: 700, marginTop: 10 }}>
            o molde é sempre o mesmo
          </div>
        </div>
        {/* setas de fluxo */}
        <div
          style={{
            position: "absolute",
            left: -52,
            top: 92,
            fontSize: 34,
            fontWeight: 900,
            color: C.js,
          }}
        >
          →
        </div>
        <div
          style={{
            position: "absolute",
            right: -52,
            top: 92,
            fontSize: 34,
            fontWeight: 900,
            color: C.green,
          }}
        >
          →
        </div>
      </div>

      {/* coluna dos cards */}
      <div style={{ position: "absolute", top: 150, left: 900, width: 320 }}>
        <div style={{ color: C.dim, fontWeight: 800, fontSize: 18, marginBottom: 12 }}>
          🖼️ os cards na tela
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PRODUTOS.map((p) => {
            const pop = spring({
              frame: frame - p.outAt,
              fps,
              config: { damping: 13, stiffness: 160 },
            });
            return (
              <Card
                key={p.id}
                id={p.id}
                nome={p.nome}
                preco={p.preco}
                emoji={p.emoji}
                pop={pop}
              />
            );
          })}
        </div>
      </div>

      {/* punchline final */}
      {punch > 0.02 && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            width: "100%",
            textAlign: "center",
            fontSize: 27,
            fontWeight: 800,
            color: C.text,
            opacity: punch,
          }}
        >
          o array cresceu, o <span style={{ fontFamily: MONO, color: C.js }}>.map()</span> continua
          com <span style={{ color: C.green }}>uma linha</span> — quem trabalha é a esteira 🏭
        </div>
      )}
    </AbsoluteFill>
  );
};
