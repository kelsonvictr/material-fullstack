import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { C, FONT, MONO } from "./theme";

// "Anatomia do JSON" — turma nova: explica [ ] { } "campo": valor do zero.

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

type Tok = { t: string; c: string; g?: string };

const LINES: Tok[][] = [
  [{ t: "[", c: C.react, g: "bracket" }],
  [
    { t: "  ", c: C.dim },
    { t: "{", c: C.dim, g: "brace" },
    { t: ' "nome"', c: C.json, g: "field" },
    { t: ": ", c: C.dim },
    { t: '"Teclado"', c: C.green, g: "value" },
    { t: ", ", c: C.dim },
    { t: '"preco"', c: C.json, g: "field" },
    { t: ": ", c: C.dim },
    { t: "320", c: C.js, g: "value" },
    { t: " }", c: C.dim, g: "brace" },
    { t: ",", c: C.dim },
  ],
  [
    { t: "  ", c: C.dim },
    { t: "{", c: C.dim, g: "brace" },
    { t: ' "nome"', c: C.json, g: "field" },
    { t: ": ", c: C.dim },
    { t: '"Monitor"', c: C.green, g: "value" },
    { t: ", ", c: C.dim },
    { t: '"preco"', c: C.json, g: "field" },
    { t: ": ", c: C.dim },
    { t: "1450", c: C.js, g: "value" },
    { t: " }", c: C.dim, g: "brace" },
  ],
  [{ t: "]", c: C.react, g: "bracket" }],
];

// foco por janela de frames: [início, fim, grupo, cor, legenda]
const STAGES: [number, number, string, string, string][] = [
  [70, 110, "bracket", C.react, "os colchetes [ ] = uma LISTA de coisas"],
  [114, 154, "brace", C.purple, "as chaves { } = UM item (um produto)"],
  [158, 198, "field", C.json, '"campo": a etiqueta do dado (a chave)'],
  [202, 242, "value", C.js, "o valor: o conteúdo que vem depois do :"],
];

export const JsonAnatomy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 200 } });

  const stage = STAGES.find(([a, b]) => frame >= a && frame < b);
  const focusG = stage?.[2] ?? null;
  const stageColor = stage?.[3] ?? C.line;

  const capO = interpolate(frame, [252, 268], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {BG}

      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          color: C.text,
          fontSize: 44,
          fontWeight: 900,
          opacity: intro,
        }}
      >
        Anatomia do <span style={{ color: C.json }}>JSON</span>
      </div>

      {/* bloco de código */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: "50%",
          transform: "translateX(-50%)",
          width: 760,
          background: C.codeBg,
          border: `1px solid ${focusG ? stageColor : C.line}`,
          boxShadow: focusG ? `0 0 50px ${stageColor}22` : "0 24px 60px rgba(0,0,0,0.5)",
          borderRadius: 16,
          padding: "28px 36px",
          fontFamily: MONO,
          fontSize: 30,
          lineHeight: 1.7,
          transition: "all .2s",
          opacity: intro,
        }}
      >
        {LINES.map((line, i) => {
          const a = spring({ frame: frame - 14 - i * 9, fps, config: { damping: 200 } });
          return (
            <div
              key={i}
              style={{
                opacity: a,
                transform: `translateX(${interpolate(a, [0, 1], [-14, 0])}px)`,
                whiteSpace: "pre",
              }}
            >
              {line.map((tok, j) => {
                const dim = focusG !== null && tok.g !== focusG;
                const hot = focusG !== null && tok.g === focusG;
                return (
                  <span
                    key={j}
                    style={{
                      color: tok.c,
                      opacity: dim ? 0.22 : 1,
                      background: hot ? `${stageColor}26` : "transparent",
                      borderRadius: 6,
                      padding: hot ? "2px 2px" : 0,
                      transition: "all .15s",
                    }}
                  >
                    {tok.t}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* legenda do estágio atual */}
      {stage && (
        <div
          style={{
            position: "absolute",
            top: 470,
            width: "100%",
            textAlign: "center",
            color: stageColor,
            fontSize: 28,
            fontWeight: 800,
            opacity: interpolate(frame, [stage[0], stage[0] + 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {stage[4]}
        </div>
      )}

      {/* legenda final */}
      <div
        style={{
          position: "absolute",
          bottom: 46,
          width: "100%",
          textAlign: "center",
          color: C.text,
          fontSize: 26,
          fontWeight: 700,
          opacity: capO,
          padding: "0 60px",
          boxSizing: "border-box",
        }}
      >
        JSON = o jeito que os <span style={{ color: C.json }}>dados</span> viajam pela internet
        {" "}(igual a um objeto JS 👀)
      </div>
    </AbsoluteFill>
  );
};
