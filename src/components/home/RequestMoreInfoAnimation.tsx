"use client";

// ============================================================
// "Request more info" QuickBooks-style animation.
// Ported from a standalone HTML/CSS/JS prototype: a cursor clicks
// a chat icon on a transactions ledger, the page zooms behind a
// modal, a message types out, then the cursor moves to submit.
// ============================================================

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const BASE_W = 960;
const BASE_H = 620;

const COLOR = {
  bg: "#f7f8fa",
  surface: "#ffffff",
  border: "#d4d7dc",
  borderStrong: "#babec5",
  accent: "#2ca01c",
  accentDark: "#248517",
  text: "#393a3d",
  textDim: "#6b6c72",
  link: "#0077c5",
};

const FONT =
  '"Avenir Next", -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const MESSAGE =
  "Hi! These seem to be supplies. Could you please confirm if they were office-related expenses?";
const MS_PER_CHAR = 28;
const LOOP_LENGTH =
  600 + 600 + 600 + 400 + (MESSAGE.length + 1) * MS_PER_CHAR + 300 + 550 + 2000 + 400;

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export default function RequestMoreInfoAnimation({
  className = "",
}: {
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0)
        setScale(Math.min(width / BASE_W, height / BASE_H));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: BASE_W,
          height: BASE_H,
          marginLeft: -BASE_W / 2,
          marginTop: -BASE_H / 2,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Stage />
      </div>
    </div>
  );
}

type CursorPos = "default" | "icon" | "button";

function Stage() {
  const reduced = useReducedMotion();
  const [zoomed, setZoomed] = useState(reduced);
  const [cursorPos, setCursorPos] = useState<CursorPos>(reduced ? "button" : "default");
  const [flashKey, setFlashKey] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const [typed, setTyped] = useState(reduced ? MESSAGE : "");
  const [hover, setHover] = useState(reduced);

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) fn();
        }, delay),
      );
    };

    function typeMessage(onDone: () => void) {
      let i = 0;
      const step = () => {
        if (cancelled) return;
        if (i <= MESSAGE.length) {
          setTyped(MESSAGE.slice(0, i));
          i++;
          schedule(step, MS_PER_CHAR);
        } else {
          onDone();
        }
      };
      step();
    }

    function reset() {
      setZoomed(false);
      setCursorPos("default");
      setFlashing(false);
      setHover(false);
      setTyped("");
    }

    function runCycle() {
      reset();

      schedule(() => setCursorPos("icon"), 600);

      schedule(() => {
        setFlashKey((k) => k + 1);
        setFlashing(true);
        setZoomed(true);
      }, 1200);

      schedule(() => {
        typeMessage(() => {
          schedule(() => {
            setCursorPos("button");
            schedule(() => setHover(true), 550);
          }, 300);
        });
      }, 2200);
    }

    function loop() {
      runCycle();
      schedule(loop, LOOP_LENGTH);
    }

    schedule(loop, 200);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  const modalIn = zoomed;
  const cursorXY: Record<CursorPos, [number, number]> = {
    default: [780, 230],
    icon: [370, 452],
    button: [600, 422],
  };
  const [cursorLeft, cursorTop] = cursorXY[cursorPos];
  const cursorHidden = zoomed && cursorPos === "icon";

  return (
    <div
      style={{
        position: "relative",
        width: BASE_W,
        height: BASE_H,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        background: COLOR.bg,
        fontFamily: FONT,
      }}
    >
      <style>{`
        @keyframes qbam-blink { 50% { opacity: 0; } }
        @keyframes qbam-flash { 0% { width: 0; height: 0; opacity: 0.9; } 100% { width: 36px; height: 36px; opacity: 0; } }
      `}</style>

      {/* page background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "60% 55%",
          transform: zoomed ? "scale(1.14) translateY(-14px)" : "scale(1) translateY(0)",
          filter: zoomed ? "blur(2.5px)" : "blur(0px)",
          transition:
            "transform 0.7s cubic-bezier(0.34,1.2,0.64,1), filter 0.7s ease-in-out",
        }}
      >
        {/* topbar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: BASE_W,
            height: 44,
            background: COLOR.surface,
            borderBottom: `1px solid ${COLOR.border}`,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: COLOR.text, letterSpacing: -0.2 }}>
            quickbooks
          </div>
          <div
            style={{
              position: "absolute",
              left: 260,
              width: 300,
              height: 28,
              background: COLOR.bg,
              border: `1px solid ${COLOR.border}`,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              color: COLOR.textDim,
              fontSize: 12,
            }}
          >
            Search, jump to, or ask a question
          </div>
          <div style={{ position: "absolute", right: 16, display: "flex", alignItems: "center", gap: 14 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#c7cbd1" }} />
            ))}
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#1a4fa0", marginLeft: 6 }} />
          </div>
        </div>

        {/* sidebar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 44,
            width: 64,
            height: 576,
            background: COLOR.surface,
            borderRight: `1px solid ${COLOR.border}`,
            paddingTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: i === 1 ? "#eaf7e8" : "#eef0f2",
                boxShadow: i === 1 ? `inset 0 0 0 2px ${COLOR.accent}` : undefined,
              }}
            />
          ))}
        </div>

        {/* content */}
        <div style={{ position: "absolute", left: 84, top: 0, width: 852, height: BASE_H }}>
          <div style={{ position: "absolute", top: 58, left: 0, fontSize: 11, color: COLOR.textDim }}>
            Dashboard&nbsp;&nbsp;›&nbsp;&nbsp;Accounting&nbsp;&nbsp;›&nbsp;&nbsp;Transactions
          </div>
          <div style={{ position: "absolute", top: 72, left: 0, fontSize: 22, fontWeight: 700, color: COLOR.text }}>
            Transactions
          </div>

          <div style={{ position: "absolute", top: 112, left: 0, display: "flex", gap: 28 }}>
            {["Bank transactions", "Receipts", "Rules"].map((t, i) => (
              <div
                key={t}
                style={{
                  fontSize: 13,
                  paddingBottom: 6,
                  color: i === 0 ? COLOR.text : COLOR.textDim,
                  fontWeight: i === 0 ? 700 : 400,
                  borderBottom: i === 0 ? `2px solid ${COLOR.accent}` : "none",
                }}
              >
                {t}
              </div>
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              top: 140,
              left: 0,
              width: 240,
              height: 56,
              background: COLOR.surface,
              border: `1px solid ${COLOR.border}`,
              borderRadius: 8,
              padding: "8px 12px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                background: COLOR.text,
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 9,
              }}
            >
              100
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLOR.text }}>Wells Fargo Checking</div>
            <div style={{ fontSize: 12, color: COLOR.textDim, marginTop: 4 }}>$4,323.23</div>
          </div>

          <div style={{ position: "absolute", top: 214, left: 0, display: "flex", gap: 8 }}>
            {[
              { label: "Pending (100)", active: true },
              { label: "Posted", active: false },
              { label: "Excluded", active: false },
            ].map((p) => (
              <div
                key={p.label}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: `1px solid ${p.active ? COLOR.text : COLOR.borderStrong}`,
                  color: p.active ? "#fff" : COLOR.textDim,
                  background: p.active ? COLOR.text : "transparent",
                }}
              >
                {p.label}
              </div>
            ))}
          </div>

          <div style={{ position: "absolute", top: 254, left: 0, width: 852 }}>
            <div
              style={{
                display: "flex",
                fontSize: 11,
                fontWeight: 700,
                color: COLOR.textDim,
                borderBottom: `1px solid ${COLOR.border}`,
                paddingBottom: 8,
              }}
            >
              <span style={{ width: 96 }}>Date</span>
              <span style={{ width: 380 }}>Description</span>
              <span style={{ width: 96 }}>Amount</span>
              <span style={{ width: 220 }}>Categorize or Match</span>
              <span style={{ width: 60 }}>Action</span>
            </div>

            {[
              { date: "07/27/2024", vendor: "Amazon Marketplace", sub: "Uncategorized expense", amount: "-$111.44", neg: true, matchEmph: false },
              { date: "07/26/2024", vendor: "Ron Odell", sub: "Invoice 28 · 07/01/2024", amount: "$785.23", neg: false, matchEmph: true },
              { date: "07/25/2024", vendor: "Sunday Lawn", sub: "Uncategorized expense", amount: "-$82.23", neg: true, matchEmph: false },
              { date: "07/24/2024", vendor: "Philz Coffee", sub: "Meals", amount: "-$31.44", neg: true, matchEmph: false, chatIcon: true },
              { date: "07/23/2024", vendor: "Invoice 1005", sub: "07/02/2024", amount: "$100,000.00", neg: false, matchEmph: true },
              { date: "07/18/2024", vendor: "SV Growers", sub: "Uncategorized expense", amount: "-$500.00", neg: true, matchEmph: false },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  height: 50,
                  borderBottom: "1px solid #eef0f2",
                  fontSize: 13,
                  color: COLOR.text,
                }}
              >
                <div style={{ width: 96, color: COLOR.textDim, fontSize: 12 }}>{r.date}</div>
                <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 2, position: "relative" }}>
                  <div style={{ fontWeight: 600 }}>{r.vendor}</div>
                  <div style={{ fontSize: 11, color: COLOR.textDim }}>{r.sub}</div>
                  {r.chatIcon && (
                    <div
                      style={{
                        position: "absolute",
                        left: 212,
                        top: 16,
                        width: 18,
                        height: 18,
                        borderRadius: 5,
                        background: "#eef0f2",
                        border: `1px solid ${COLOR.borderStrong}`,
                      }}
                    />
                  )}
                </div>
                <div style={{ width: 96, fontSize: 13, color: r.neg ? "#c0311a" : COLOR.text }}>{r.amount}</div>
                <div style={{ width: 220, display: "flex", gap: 6 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "5px 10px",
                      borderRadius: 6,
                      border: `1px solid ${r.matchEmph ? COLOR.text : COLOR.borderStrong}`,
                      color: r.matchEmph ? COLOR.text : COLOR.textDim,
                    }}
                  >
                    Match
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "5px 10px",
                      borderRadius: 6,
                      border: `1px solid ${!r.matchEmph ? COLOR.text : COLOR.borderStrong}`,
                      color: !r.matchEmph ? COLOR.text : COLOR.textDim,
                    }}
                  >
                    Categorize
                  </div>
                </div>
                <div style={{ color: COLOR.link, fontSize: 12, fontWeight: 600 }}>Post ⌄</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#14161a",
          opacity: zoomed ? 0.45 : 0,
          transition: "opacity 0.6s ease-in-out",
          pointerEvents: "none",
        }}
      />

      {/* modal */}
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 130,
          width: 560,
          height: 360,
          background: COLOR.surface,
          borderRadius: 12,
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          opacity: modalIn ? 1 : 0,
          visibility: modalIn ? "visible" : "hidden",
          transform: modalIn ? "scale(1)" : "scale(0.92)",
          transition: modalIn
            ? "opacity 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.15s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.15s, visibility 0s 0s"
            : "opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1), visibility 0s 0.5s",
        }}
      >
        <div style={{ position: "absolute", top: 20, left: 24, right: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLOR.text }}>Request more info</h3>
          <div style={{ fontSize: 18, color: COLOR.textDim, lineHeight: 1 }}>×</div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 24,
            top: 64,
            width: 512,
            height: 190,
            border: `1px solid ${COLOR.border}`,
            borderRadius: 12,
            background: COLOR.surface,
            padding: 20,
          }}
        >
          <span style={{ fontSize: 16, lineHeight: 1.5, color: COLOR.text }}>
            {typed}
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 18,
                background: COLOR.text,
                marginLeft: 1,
                verticalAlign: -3,
                animation: "qbam-blink 1s step-end infinite",
              }}
            />
          </span>
          <div style={{ position: "absolute", left: 20, bottom: 20, display: "flex", gap: 10 }}>
            {["Ask for more info", "Ask for receipt"].map((label) => (
              <button
                key={label}
                type="button"
                style={{
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: 600,
                  color: COLOR.textDim,
                  background: COLOR.surface,
                  border: `1px solid ${COLOR.borderStrong}`,
                  borderRadius: 6,
                  padding: "9px 16px",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", left: 24, right: 24, top: 284, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ color: COLOR.accent, fontSize: 14, fontWeight: 700 }}>View list</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: COLOR.accent,
                background: COLOR.surface,
                border: `1.5px solid ${COLOR.accent}`,
                borderRadius: 6,
                padding: "9px 18px",
              }}
            >
              Add and post
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                background: hover ? COLOR.accentDark : COLOR.accent,
                border: `1.5px solid ${hover ? COLOR.accentDark : COLOR.accent}`,
                borderRadius: 6,
                padding: "9px 18px",
                transform: hover ? "scale(1.04)" : "scale(1)",
                transition: "background 0.2s ease, transform 0.2s ease",
              }}
            >
              Add request to list
            </div>
          </div>
        </div>
      </div>

      {/* click flash */}
      <div
        key={flashKey}
        style={{
          position: "absolute",
          left: 377,
          top: 461,
          borderRadius: "50%",
          border: `2px solid ${COLOR.accent}`,
          opacity: 0,
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          animation: flashing ? "qbam-flash 0.4s ease-out" : undefined,
        }}
      />

      {/* cursor */}
      <div
        style={{
          position: "absolute",
          width: 16,
          height: 20,
          zIndex: 50,
          background: "#1f2328",
          clipPath:
            "polygon(0 0, 0 16px, 4.5px 12.5px, 7.5px 19px, 10px 18px, 6.5px 11px, 13px 11px)",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))",
          left: cursorLeft,
          top: cursorTop,
          opacity: cursorHidden ? 0 : 1,
          transition:
            "left 0.55s cubic-bezier(0.34,1.2,0.64,1), top 0.55s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease",
        }}
      />
    </div>
  );
}
