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
import { Browser } from "./Browser";

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

// momentos de clique (frame em que o cursor "bate" no botão)
const CLICKS = [70, 120, 170];

export const ClickToDom: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 200 } });

  // quantos cliques já aconteceram
  const count = CLICKS.filter((c) => frame >= c).length;

  // clique mais recente (para o pulso / ripple)
  const last = [...CLICKS].reverse().find((c) => frame >= c) ?? -999;
  const since = frame - last;
  const pulse = since >= 0 && since < 14 ? interpolate(since, [0, 6, 14], [1, 1.18, 1]) : 1;
  const ripple = since >= 0 && since < 18;

  // cursor: repousa, desce até o botão antes de cada clique
  const btnX = 250;
  const btnY = 250;
  const nextClick = CLICKS.find((c) => frame < c);
  let curX = btnX + 120;
  let curY = btnY + 90;
  if (nextClick !== undefined) {
    const t = interpolate(frame, [nextClick - 28, nextClick - 2], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });
    const fromX = frame < CLICKS[0] ? btnX + 200 : btnX + 120;
    const fromY = frame < CLICKS[0] ? btnY + 160 : btnY + 90;
    curX = interpolate(t, [0, 1], [fromX, btnX]);
    curY = interpolate(t, [0, 1], [fromY, btnY]);
  } else {
    curX = btnX;
    curY = btnY;
  }

  // balão "evento: click"
  const evtO = ripple ? interpolate(since, [0, 3, 12, 18], [0, 1, 1, 0]) : 0;

  // legenda
  const capO = interpolate(frame, [195, 215], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const listenerLit = ripple;

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
          fontSize: 40,
          fontWeight: 900,
          opacity: intro,
        }}
      >
        Clique → <span style={{ color: C.react }}>evento</span> → o DOM muda
      </div>

      {/* navegador */}
      <div style={{ position: "absolute", left: 70, top: 120, opacity: intro }}>
        <Browser url="localhost:5500/curtidas.html" width={560} height={440}>
          <div
            style={{
              padding: 30,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 28,
            }}
          >
            {/* contador (nó do DOM que muda) */}
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: C.js,
                fontFamily: MONO,
                transform: `scale(${pulse})`,
                textShadow: ripple ? `0 0 30px ${C.js}88` : "none",
              }}
            >
              {count}
            </div>
            <div style={{ color: C.dim, fontSize: 18, marginTop: -18 }}>curtidas</div>

            {/* botão */}
            <div
              style={{
                position: "relative",
                background: C.react,
                color: C.bg,
                fontWeight: 800,
                fontSize: 24,
                padding: "16px 34px",
                borderRadius: 14,
                transform: ripple ? "scale(0.94)" : "scale(1)",
                boxShadow: `0 10px 30px ${C.react}55`,
              }}
            >
              Curtir ❤
              {ripple && (
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: interpolate(since, [0, 18], [10, 180]),
                    height: interpolate(since, [0, 18], [10, 180]),
                    borderRadius: "50%",
                    border: `3px solid ${C.bg}`,
                    opacity: interpolate(since, [0, 18], [0.6, 0]),
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
          </div>
        </Browser>
      </div>

      {/* painel do listener (lado direito) */}
      <div style={{ position: "absolute", left: 700, top: 200, width: 480, opacity: intro }}>
        <div
          style={{
            background: C.codeBg,
            border: `1px solid ${listenerLit ? C.react : C.line}`,
            boxShadow: listenerLit ? `0 0 40px ${C.react}33` : "none",
            borderRadius: 14,
            padding: 24,
            fontFamily: MONO,
            fontSize: 19,
            lineHeight: 1.7,
            color: C.text,
          }}
        >
          <div style={{ color: C.dim }}>{"// seu JavaScript escuta"}</div>
          <div>
            botao.<span style={{ color: C.react }}>addEventListener</span>(
          </div>
          <div>
            {"  "}
            <span style={{ color: C.green }}>"click"</span>,
          </div>
          <div>
            {"  "}() <span style={{ color: C.js }}>=&gt;</span> {"{"}
          </div>
          <div style={{ background: listenerLit ? `${C.react}22` : "transparent", borderRadius: 6 }}>
            {"    "}contador<span style={{ color: C.js }}>++</span>;
          </div>
          <div>{"  }"});</div>
        </div>

        {/* balão evento */}
        <div
          style={{
            marginTop: 22,
            display: "inline-block",
            background: C.react,
            color: C.bg,
            fontWeight: 800,
            fontSize: 20,
            padding: "10px 20px",
            borderRadius: 999,
            opacity: evtO,
            transform: `translateY(${interpolate(evtO, [0, 1], [10, 0])}px)`,
          }}
        >
          ⚡ evento: "click"
        </div>
      </div>

      {/* cursor */}
      <div
        style={{
          position: "absolute",
          left: 70 + 30 + curX,
          top: 120 + 60 + curY,
          fontSize: 44,
          transform: `translate(-30%,-10%) scale(${ripple ? 0.85 : 1})`,
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.6))",
        }}
      >
        🖱️
      </div>

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
        você <span style={{ color: C.react }}>escuta</span> o evento e{" "}
        <span style={{ color: C.js }}>muda o DOM</span>
      </div>
    </AbsoluteFill>
  );
};
