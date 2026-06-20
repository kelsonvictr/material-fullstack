import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { C, FONT, MONO } from "./theme";

// "A função-seta (arrow)" — Cap 02. Mostra a função clássica VIRANDO arrow,
// destaca as 3 mudanças e crava que => é = + > (nunca o símbolo ⇒).

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

// código com cores (clássico × arrow)
const CLASSIC: Tok[][] = [
  [
    { t: "function ", c: C.purple },
    { t: "dobro", c: C.react },
    { t: "(", c: C.dim },
    { t: "n", c: C.js },
    { t: ") {", c: C.dim },
  ],
  [
    { t: "  return ", c: C.purple },
    { t: "n ", c: C.js },
    { t: "* ", c: C.dim },
    { t: "2", c: C.js },
    { t: ";", c: C.dim },
  ],
  [{ t: "}", c: C.dim }],
];

const ARROW: Tok[][] = [
  [
    { t: "const ", c: C.purple },
    { t: "dobro", c: C.react },
    { t: " = ", c: C.dim },
    { t: "(", c: C.dim },
    { t: "n", c: C.js },
    { t: ") ", c: C.dim },
    { t: "=>", c: C.green },
    { t: " {", c: C.dim },
  ],
  [
    { t: "  return ", c: C.purple },
    { t: "n ", c: C.js },
    { t: "* ", c: C.dim },
    { t: "2", c: C.js },
    { t: ";", c: C.dim },
  ],
  [{ t: "}", c: C.dim }],
];

const SHORT: Tok[][] = [
  [
    { t: "const ", c: C.purple },
    { t: "dobro", c: C.react },
    { t: " = ", c: C.dim },
    { t: "(", c: C.dim },
    { t: "n", c: C.js },
    { t: ") ", c: C.dim },
    { t: "=>", c: C.green },
    { t: " n ", c: C.js },
    { t: "* ", c: C.dim },
    { t: "2", c: C.js },
    { t: ";", c: C.dim },
  ],
];

const CodeCard: React.FC<{
  lines: Tok[][];
  appear: number; // 0..1
  label: string;
  labelColor: string;
  glow?: boolean;
}> = ({ lines, appear, label, labelColor, glow }) => (
  <div
    style={{
      width: 720,
      background: C.codeBg,
      border: `1px solid ${glow ? labelColor : C.line}`,
      boxShadow: glow ? `0 0 50px ${labelColor}33` : "0 18px 50px rgba(0,0,0,0.45)",
      borderRadius: 16,
      padding: "22px 30px 26px",
      fontFamily: MONO,
      fontSize: 30,
      lineHeight: 1.6,
      opacity: appear,
      transform: `translateY(${interpolate(appear, [0, 1], [16, 0])}px)`,
    }}
  >
    <div
      style={{
        fontFamily: FONT,
        fontSize: 17,
        fontWeight: 800,
        color: labelColor,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 14,
      }}
    >
      {label}
    </div>
    {lines.map((line, i) => (
      <div key={i} style={{ whiteSpace: "pre" }}>
        {line.map((tok, j) => (
          <span key={j} style={{ color: tok.c }}>
            {tok.t}
          </span>
        ))}
      </div>
    ))}
  </div>
);

const Keycap: React.FC<{ ch: string; pop: number }> = ({ ch, pop }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 92,
      height: 92,
      borderRadius: 16,
      background: C.surface2,
      border: `2px solid ${C.line}`,
      boxShadow: `0 6px 0 ${C.line}, 0 14px 24px rgba(0,0,0,0.5)`,
      fontFamily: MONO,
      fontSize: 52,
      fontWeight: 800,
      color: C.text,
      transform: `translateY(${interpolate(pop, [0, 1], [0, -10])}px) scale(${interpolate(
        pop,
        [0, 1],
        [1, 0.92]
      )})`,
    }}
  >
    {ch}
  </div>
);

export const ArrowFunction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 200 } });

  // ── tempos de cena ──
  const classicIn = spring({ frame: frame - 18, fps, config: { damping: 200 } });
  // cena 2: arrow aparece e clássico recua
  const arrowIn = spring({ frame: frame - 95, fps, config: { damping: 200 } });
  // cena 3: keycaps do =>
  const inScene3 = frame >= 188 && frame < 262;
  const eqPop = spring({ frame: frame - 200, fps, config: { damping: 14, stiffness: 180 } });
  const gtPop = spring({ frame: frame - 214, fps, config: { damping: 14, stiffness: 180 } });
  const mergePop = spring({ frame: frame - 232, fps, config: { damping: 12, stiffness: 200 } });
  // cena 4: versão curta
  const shortIn = spring({ frame: frame - 270, fps, config: { damping: 200 } });

  // posição vertical do par de cards (sobem um pouco quando arrow entra)
  const shift = interpolate(arrowIn, [0, 1], [60, 0], { extrapolateRight: "clamp" });

  // anotações das 3 mudanças (cena 2)
  const noteO = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const notesGone = interpolate(frame, [185, 195], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const notes = noteO * notesGone;

  // some os cards na cena 3 (keycaps) e volta na 4
  const cardsHide = inScene3
    ? interpolate(frame, [188, 200], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : frame >= 262
    ? interpolate(frame, [262, 274], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  const titleText =
    frame < 95
      ? "A função-seta (arrow)"
      : frame < 188
      ? "A MESMA função, mais curta"
      : frame < 262
      ? "A seta é = seguido de >"
      : "Versão curtíssima";

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {BG}

      <div
        style={{
          position: "absolute",
          top: 44,
          width: "100%",
          textAlign: "center",
          color: C.text,
          fontSize: 42,
          fontWeight: 900,
          opacity: intro,
        }}
      >
        {titleText}
      </div>

      {/* ── par de cards (cena 1, 2 e 4) ── */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          opacity: cardsHide,
        }}
      >
        {frame < 262 ? (
          <>
            <div style={{ transform: `translateY(${shift}px)`, opacity: classicIn }}>
              <CodeCard
                lines={CLASSIC}
                appear={classicIn}
                label="jeito clássico"
                labelColor={C.purple}
              />
            </div>

            {arrowIn > 0.02 && (
              <>
                <div
                  style={{
                    color: C.green,
                    fontSize: 34,
                    fontWeight: 900,
                    opacity: arrowIn,
                  }}
                >
                  ↓ vira ↓
                </div>
                <CodeCard
                  lines={ARROW}
                  appear={arrowIn}
                  label="arrow function"
                  labelColor={C.green}
                  glow
                />
              </>
            )}
          </>
        ) : (
          <CodeCard
            lines={SHORT}
            appear={shortIn}
            label="arrow function (return implícito)"
            labelColor={C.green}
            glow
          />
        )}
      </div>

      {/* ── anotações das 3 mudanças (cena 2) ── */}
      {notes > 0.02 && (
        <div
          style={{
            position: "absolute",
            top: 470,
            width: "100%",
            textAlign: "center",
            opacity: notes,
            color: C.text,
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          tirou <span style={{ color: C.purple }}>function</span> &nbsp;·&nbsp; ganhou{" "}
          <span style={{ color: C.dim }}>const dobro =</span> &nbsp;·&nbsp; ganhou a seta{" "}
          <span style={{ color: C.green }}>=&gt;</span>
        </div>
      )}

      {/* ── cena 3: keycaps = + > = => ── */}
      {inScene3 && (
        <div
          style={{
            position: "absolute",
            top: 230,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
            opacity: interpolate(frame, [196, 206], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <Keycap ch="=" pop={eqPop} />
            <div style={{ fontSize: 48, fontWeight: 900, color: C.dim, opacity: gtPop }}>+</div>
            <Keycap ch=">" pop={gtPop} />
            <div style={{ fontSize: 48, fontWeight: 900, color: C.dim, opacity: mergePop }}>=</div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 76,
                fontWeight: 800,
                color: C.green,
                transform: `scale(${interpolate(mergePop, [0, 1], [0.4, 1])})`,
                opacity: mergePop,
                textShadow: `0 0 30px ${C.green}66`,
              }}
            >
              =&gt;
            </div>
          </div>

          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: C.text,
              opacity: mergePop,
              textAlign: "center",
            }}
          >
            sua IDE pode <span style={{ color: C.dim }}>desenhar</span>{" "}
            <span style={{ fontFamily: MONO, color: C.red }}>⇒</span> — mas você digita{" "}
            <span style={{ color: C.green }}>dois caracteres</span>
          </div>
        </div>
      )}

      {/* ── legenda cena 4 ── */}
      {frame >= 262 && (
        <div
          style={{
            position: "absolute",
            bottom: 70,
            width: "100%",
            textAlign: "center",
            color: C.text,
            fontSize: 26,
            fontWeight: 700,
            opacity: shortIn,
            padding: "0 60px",
            boxSizing: "border-box",
          }}
        >
          uma linha só: sem <span style={{ color: C.dim }}>{"{ }"}</span> e sem{" "}
          <span style={{ color: C.purple }}>return</span> — ela devolve o valor direto
        </div>
      )}
    </AbsoluteFill>
  );
};
