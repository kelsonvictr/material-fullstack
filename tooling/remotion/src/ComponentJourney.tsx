import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Browser } from "./Browser";
import { C, FONT, MONO } from "./theme";

// "Como o React liga na página" — Cap 04. A corrente index.html (a tomada
// root, vazia) → main.jsx (o plugue) → App.jsx (o componente) → tela.

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

type Tok = { t: string; c: string };

const INDEX_LINES: Tok[][] = [
  [
    { t: "<div ", c: C.react },
    { t: 'id="root"', c: C.green },
    { t: "></div>", c: C.react },
  ],
  [{ t: "<!-- vazia de propósito -->", c: C.dim }],
];

const MAIN_LINES: Tok[][] = [
  [
    { t: "createRoot", c: C.js },
    { t: "(", c: C.dim },
    { t: "document", c: C.react },
    { t: ".", c: C.dim },
    { t: "getElementById", c: C.js },
    { t: '("root"))', c: C.dim },
  ],
  [
    { t: "  .render", c: C.js },
    { t: "(", c: C.dim },
    { t: "<App />", c: C.react },
    { t: ")", c: C.dim },
  ],
];

const APP_LINES: Tok[][] = [
  [
    { t: "const ", c: C.purple },
    { t: "App", c: C.react },
    { t: " = () ", c: C.dim },
    { t: "=>", c: C.green },
    { t: " (", c: C.dim },
  ],
  [
    { t: "  <h1>", c: C.react },
    { t: "Minha Loja 🛒", c: C.text },
    { t: "</h1>", c: C.react },
  ],
  [{ t: ")", c: C.dim }],
];

const FileCard: React.FC<{
  icon: string;
  name: string;
  sub: string;
  lines: Tok[][];
  appear: number;
  color: string;
}> = ({ icon, name, sub, lines, appear, color }) => (
  <div
    style={{
      width: 560,
      background: C.codeBg,
      border: `1px solid ${appear > 0.6 ? color : C.line}`,
      boxShadow: appear > 0.6 ? `0 0 40px ${color}22` : "0 14px 40px rgba(0,0,0,0.45)",
      borderRadius: 14,
      padding: "14px 20px 16px",
      opacity: appear,
      transform: `translateX(${interpolate(appear, [0, 1], [-30, 0])}px)`,
    }}
  >
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color }}>{name}</span>
      <span style={{ fontFamily: FONT, fontSize: 15, color: C.dim, fontWeight: 700 }}>{sub}</span>
    </div>
    {lines.map((line, i) => (
      <div key={i} style={{ whiteSpace: "pre", fontFamily: MONO, fontSize: 19, lineHeight: 1.55 }}>
        {line.map((tok, j) => (
          <span key={j} style={{ color: tok.c }}>
            {tok.t}
          </span>
        ))}
      </div>
    ))}
  </div>
);

export const ComponentJourney: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 200 } });
  const htmlIn = spring({ frame: frame - 15, fps, config: { damping: 200 } });
  const mainIn = spring({ frame: frame - 85, fps, config: { damping: 200 } });
  const appIn = spring({ frame: frame - 165, fps, config: { damping: 200 } });
  const h1Pop = spring({ frame: frame - 205, fps, config: { damping: 13, stiffness: 160 } });
  const punch = interpolate(frame, [250, 268], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rendered = frame >= 205;

  const titleText =
    frame < 85
      ? "index.html: o quarto com a tomada"
      : frame < 165
      ? "main.jsx: o plugue"
      : frame < 250
      ? "App.jsx: o que você descreve…"
      : "…vira a tela 🪄";

  const wireStyle = (on: number): React.CSSProperties => ({
    fontSize: 26,
    fontWeight: 900,
    color: on > 0.5 ? C.js : `${C.line}`,
    fontFamily: FONT,
    textAlign: "center",
    lineHeight: 1,
    opacity: Math.max(0.35, on),
  });

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
          fontSize: 40,
          fontWeight: 900,
          opacity: intro,
        }}
      >
        {titleText}
      </div>

      {/* coluna dos 3 arquivos */}
      <div
        style={{
          position: "absolute",
          top: 128,
          left: 56,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <FileCard
          icon="📄"
          name="index.html"
          sub="a tomada (vazia)"
          lines={INDEX_LINES}
          appear={htmlIn}
          color={C.json}
        />
        <div style={wireStyle(mainIn)}>⚡</div>
        <FileCard
          icon="🔌"
          name="main.jsx"
          sub="o plugue (você não mexe)"
          lines={MAIN_LINES}
          appear={mainIn}
          color={C.js}
        />
        <div style={wireStyle(appIn)}>⚡</div>
        <FileCard
          icon="⚛️"
          name="App.jsx"
          sub="SEU componente"
          lines={APP_LINES}
          appear={appIn}
          color={C.react}
        />
      </div>

      {/* seta arquivo → navegador */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 636,
          fontSize: 40,
          fontWeight: 900,
          color: rendered ? C.green : C.line,
          opacity: Math.max(0.3, appIn),
        }}
      >
        →
      </div>

      {/* navegador */}
      <div style={{ position: "absolute", top: 170, left: 700, opacity: htmlIn }}>
        <Browser url="localhost:5173" width={520} height={400} glow={rendered}>
          <AbsoluteFill
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
            }}
          >
            {!rendered ? (
              <>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 19,
                    color: C.dim,
                    border: `2px dashed ${C.line}`,
                    borderRadius: 12,
                    padding: "16px 22px",
                  }}
                >
                  {'<div id="root"></div>'}
                </div>
                <div style={{ color: C.dim, fontSize: 18, fontWeight: 700 }}>
                  tela vazia… esperando o plugue
                </div>
              </>
            ) : (
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 900,
                  color: C.text,
                  transform: `scale(${interpolate(h1Pop, [0, 1], [0.5, 1])})`,
                  opacity: h1Pop,
                  textShadow: `0 0 40px ${C.react}44`,
                }}
              >
                Minha Loja 🛒
              </div>
            )}
          </AbsoluteFill>
        </Browser>
      </div>

      {/* punchline final */}
      {punch > 0.02 && (
        <div
          style={{
            position: "absolute",
            bottom: 42,
            width: "100%",
            textAlign: "center",
            fontSize: 28,
            fontWeight: 800,
            color: C.text,
            opacity: punch,
          }}
        >
          você <span style={{ color: C.react }}>DESCREVE</span> a tela — o React{" "}
          <span style={{ color: C.green }}>MONTA</span> (e remonta) por você
        </div>
      )}
    </AbsoluteFill>
  );
};
