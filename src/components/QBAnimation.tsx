"use client";

// ============================================================
// QuickBooks Request-Flow Animation
// A self-contained, looping recreation of the Collab Agent portal:
// a ledger with an inbound request, then the accountant/SMB thread
// view with a chip-based reply. Ported from Jasmine's standalone
// prototype (colors registered in globals.css as --color-app-*).
// ============================================================

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

type QBAnimationProps = {
  logoUrl?: string;
  /** Total loop duration in milliseconds (default: 12000). */
  durationMs?: number;
  /** Hold time at the end of each loop in milliseconds (default: 1000). */
  holdMs?: number;
  className?: string;
};

const BASE_W = 1086;
const BASE_H = 614;

export default function QBAnimation({
  logoUrl = "/accounting-agent/qb-logo.png",
  durationMs = 12000,
  holdMs = 1000,
  className = "",
}: QBAnimationProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <AnimationStage logoUrl={logoUrl} durationMs={durationMs} holdMs={holdMs} />
    </div>
  );
}

function AnimationStage({
  logoUrl,
  durationMs,
  holdMs,
}: {
  logoUrl: string;
  durationMs: number;
  holdMs: number;
}) {
  const [animatedP, setAnimatedP] = useState(0);
  const reduced = useReducedMotion();
  const raf = useRef<number | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const p = reduced ? 1 : animatedP;

  useEffect(() => {
    if (reduced) return;
    let start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed > durationMs + holdMs) {
        start = now;
        setAnimatedP(0);
      } else {
        setAnimatedP(Math.min(1, elapsed / durationMs));
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduced, durationMs, holdMs]);

  useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) setScale(Math.min(width / BASE_W, height / BASE_H));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const s = useSequenceState(p);

  return (
    <div ref={hostRef} className="relative h-full w-full overflow-hidden">
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
        <RealisticSkin s={s} logoUrl={logoUrl} />
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// State & timing
// ------------------------------------------------------------

type SequenceState = {
  p: number;
  ledgerIn: number;
  modalIn: number;
  modalOut: number;
  typed: string;
  caret: boolean;
  submit: number;
  panelSwap: number;
  threadIn: number;
  cursor: number;
  chipActive: boolean;
  replyIn: number;
  assistantIn: number;
};

const REQUEST_TEXT =
  "This looks like supplies. Can you confirm these were office-related expenses?";

function sub(p: number, start: number, end: number) {
  if (end <= start) return p >= end ? 1 : 0;
  return Math.min(1, Math.max(0, (p - start) / (end - start)));
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useSequenceState(p: number): SequenceState {
  const typedP = sub(p, 0.3, 0.46);
  const chars = Math.round(typedP * REQUEST_TEXT.length);

  return {
    p,
    ledgerIn: easeOut(sub(p, 0, 0.08)),
    modalIn: easeOut(sub(p, 0.14, 0.24)),
    modalOut: easeOut(sub(p, 0.5, 0.56)),
    typed: REQUEST_TEXT.slice(0, chars),
    caret: typedP > 0 && typedP < 1,
    submit: easeOut(sub(p, 0.46, 0.5)),
    panelSwap: easeOut(sub(p, 0.5, 0.58)),
    threadIn: easeOut(sub(p, 0.54, 0.64)),
    cursor: easeOut(sub(p, 0.66, 0.78)),
    chipActive: p > 0.78,
    replyIn: easeOut(sub(p, 0.8, 0.87)),
    assistantIn: easeOut(sub(p, 0.88, 0.96)),
  };
}

// ------------------------------------------------------------
// Data
// ------------------------------------------------------------

const ACCOUNTANT_MESSAGE =
  "This looks like supplies. Can you confirm these were office-related expenses?";
const CHIPS = ["Business meal", "Personal expense", "Gift for client"];
const CHOSEN_CHIP = 0;
const ASSISTANT_MESSAGE = "Thank you! I have all the information I need.";

const LEDGER_ROWS = [
  { date: "07/27/2024", desc: "AMAZON MARKEPLACE N", amount: "-$111.44", party: "Amazon", cat: "Uncategorized expense", link: false },
  { date: "07/26/2024", desc: "PAYMT ID: RON ODELL CU", amount: "$785.23", party: "Select customer", cat: "Invoice 28 07/01/2024 Ron…", link: true },
  { date: "07/25/2024", desc: "SQ* Sunday128 XXXXXXX", amount: "-$82.23", party: "Sunday Lawn", cat: "Uncategorized expense", link: false },
  { date: "07/24/2024", desc: "SQ* PHILZ COFFEE", amount: "-$31.44", party: "Philz Coffee", cat: "Meals", link: false, checked: true },
  { date: "07/23/2024", desc: "DIRECT DEP ID: XXXXXX3", amount: "$100,000.00", party: "Select customer", cat: "Invoice 1005 07/02/2024…", link: true },
  { date: "07/18/2024", desc: "ACH Payment to Sierra Vist", amount: "-$500.00", party: "SV Growers", cat: "Uncategorized expense", link: false },
  { date: "07/17/2024", desc: "DD DOORDASH SUGARFI", amount: "-$119.99", party: "Select vendor", cat: "Uncategorized expense", link: false },
  { date: "07/17/2024", desc: "ATT*BILL PAYMENT", amount: "-$117.23", party: "Select vendor", cat: "Utilities", link: false },
  { date: "07/17/2024", desc: "SQ* PHILZ COFFEE", amount: "-$27.53", party: "Philz Coffee", cat: "Meals", link: false, checked: true },
  { date: "07/15/2024", desc: "CHEVRON 0357947", amount: "-$97.66", party: "Chevron", cat: "Uncategorized expense", link: false },
  { date: "07/11/2024", desc: "AMEX PAYMENT", amount: "-$1,505.38", party: "Select vendor", cat: "Uncategorized expense", link: false },
  { date: "07/08/2024", desc: "SQ* THE HIVE", amount: "-$27.99", party: "The Hive", cat: "Meals", link: false },
];

const THREAD_ROWS = [
  { txn: "AMAZON MARKEPLACE", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "Was this for the company…" },
  { txn: "Walmart", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "What is this for?" },
  { txn: "AMAZON MARKEPLACE", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "What is this for?" },
  { txn: "AMAZON MARKEPLACE", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "What is this for?" },
  { txn: "AMAZON MARKEPLACE", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "What is this for?" },
  { txn: "AMAZON MARKEPLACE", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "What is this for?" },
  { txn: "AMAZON MARKEPLACE", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "What is this for?" },
  { txn: "AMAZON MARKEPLACE", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "What is this for?" },
  { txn: "AMAZON MARKEPLACE", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "What is this for?" },
  { txn: "AMAZON MARKEPLACE", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "What is this for?" },
  { txn: "AMAZON MARKEPLACE", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "What is this for?" },
  { txn: "AMAZON MARKEPLACE", account: "Chase credit card: 4455", date: "5/21/2025", amount: "-$123.90", q: "What is this for?" },
];

const SIDEBAR_ITEMS = [
  "Bank transactions",
  "Integration transa…",
  "Receipts",
  "Reconcile",
  "Rules",
  "Chart of accounts",
  "Recurring transact…",
  "Revenue recogniti…",
  "Fixed assets",
  "My accountant",
  "Live Experts",
];

// ------------------------------------------------------------
// UI chrome
// ------------------------------------------------------------

function Cursor({ t, from, to }: { t: number; from: [number, number]; to: [number, number] }) {
  const x = from[0] + (to[0] - from[0]) * t;
  const y = from[1] + (to[1] - from[1]) * t;
  return (
    <svg
      viewBox="0 0 12 18"
      className="pointer-events-none absolute z-30 h-4 w-3 drop-shadow-sm"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      <path
        d="M1 1 L11 9 L6 9.5 L8.5 15 L6.5 16 L4 10.5 L1 13.5 Z"
        className="fill-app-ink stroke-app-surface"
        strokeWidth="1"
      />
    </svg>
  );
}

function TopBar({ logoUrl }: { logoUrl: string }) {
  return (
    <div className="flex h-8 shrink-0 items-center gap-3 bg-app-chrome px-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoUrl} alt="Intuit QuickBooks" className="h-3.5 w-auto object-contain" loading="lazy" />
      <div className="h-3 w-px bg-app-line" />
      <span className="text-[9px] font-semibold text-app-ink">Arlana&apos;s Art Supplies</span>
      <div className="ml-4 flex h-4 w-[220px] items-center gap-1.5 rounded-full border border-app-line bg-app-surface px-2">
        <span className="text-[7px] text-app-ink-faint">◯</span>
        <span className="text-[7px] text-app-ink-faint">Search, jump to, or ask a question</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-2.5 w-2.5 rounded-sm bg-app-line" />
        ))}
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-app-blue text-[7px] font-semibold text-app-green-foreground">
          J
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="flex w-[132px] shrink-0 flex-col gap-[3px] border-r border-app-line-soft bg-app-surface px-2 py-2">
      <div className="pb-1 text-[7px] font-semibold tracking-widest text-app-ink-muted uppercase">
        My apps
      </div>
      <div className="text-[8px] font-semibold text-app-ink">Accounting</div>
      {SIDEBAR_ITEMS.map((item, i) => (
        <div
          key={item}
          className={`truncate rounded px-1.5 py-[3px] text-[8px] ${
            i === 0 ? "bg-app-chrome font-semibold text-app-ink" : "text-app-ink-muted"
          }`}
        >
          {item}
        </div>
      ))}
      <div className="mt-1 border-t border-app-line-soft pt-1.5 text-[7px] font-semibold tracking-widest text-app-ink-muted uppercase">
        Pinned
      </div>
      {["Expenses & Bills", "Sales & Get Paid", "Customer Hub", "Team"].map((p) => (
        <div key={p} className="truncate px-1.5 py-[3px] text-[8px] text-app-ink-muted">
          {p}
        </div>
      ))}
    </div>
  );
}

function AccountCard({
  name,
  count,
  bank,
  posted,
  active,
}: {
  name: string;
  count: string;
  bank: string;
  posted: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex-1 rounded border px-2.5 py-2 ${
        active ? "border-app-green bg-app-surface" : "border-app-line bg-app-surface"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[8.5px] font-semibold text-app-ink">{name}</span>
        <span className="rounded bg-app-dark px-1 py-px text-[7px] font-semibold text-app-green-foreground">
          {count}
        </span>
      </div>
      <div className="pt-1 text-[8.5px] font-semibold text-app-ink">Bank: {bank}</div>
      <div className="text-[7.5px] text-app-ink-muted">Posted: {posted}</div>
    </div>
  );
}

// ------------------------------------------------------------
// Screens
// ------------------------------------------------------------

function LedgerScreen({ s }: { s: SequenceState }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-3 py-2">
      <div className="flex items-center gap-1.5 text-[8px] text-app-ink-muted">
        <span className="text-app-blue">Dashboard</span>
        <span>›</span>
        <span className="text-app-blue">Accounting</span>
        <span>›</span>
        <span>Transactions</span>
      </div>
      <h2 className="pt-1.5 text-[15px] font-semibold text-app-ink">Transactions</h2>
      <div className="flex gap-4 border-b border-app-line pt-2">
        {["Bank transactions", "App transactions", "Receipts", "Reconcile", "Rules", "Chart of accounts"].map(
          (t, i) => (
            <span
              key={t}
              className={`pb-1.5 text-[8.5px] ${
                i === 0 ? "border-b-2 border-app-green font-semibold text-app-ink" : "text-app-ink-muted"
              }`}
            >
              {t}
            </span>
          ),
        )}
      </div>

      <div className="flex items-center gap-2 pt-2.5">
        <span className="text-[10px] font-semibold text-app-ink">Wells Fargo Checking ⌄</span>
        <div className="ml-auto flex gap-1.5">
          {["Link accounts", "Update", "Requests"].map((b) => (
            <span
              key={b}
              className="rounded border border-app-green px-2 py-1 text-[8px] font-semibold text-app-green"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <AccountCard name="Wells Fargo Checking" count="100" bank="$4,323.23" posted="$1,752.14" active />
        <AccountCard name="Amex Gold" count="43" bank="$799.32" posted="$0" />
      </div>

      <div className="flex items-center gap-0 pt-2.5">
        <span className="rounded-l border border-app-line bg-app-dark px-2.5 py-1 text-[8px] font-semibold text-app-green-foreground">
          Pending (100)
        </span>
        <span className="border-y border-app-line px-2.5 py-1 text-[8px] text-app-ink">Posted</span>
        <span className="rounded-r border border-app-line px-2.5 py-1 text-[8px] text-app-ink">
          Excluded
        </span>
        <span className="ml-auto text-[8px] text-app-blue">Release notes</span>
      </div>

      <div className="mt-2 min-h-0 flex-1 overflow-hidden rounded border border-app-line">
        <div className="grid grid-cols-[16px_58px_1fr_70px_92px_1fr_112px] items-center gap-2 border-b border-app-line bg-app-chrome px-2 py-1.5 text-[7.5px] font-semibold tracking-wide text-app-ink-muted uppercase">
          <span />
          <span>Date</span>
          <span>Full Bank Description</span>
          <span className="text-right">Amount</span>
          <span>From/To</span>
          <span>Categorize or Match</span>
          <span className="text-right">Action</span>
        </div>
        {LEDGER_ROWS.map((r, i) => {
          const delay = i * 0.045;
          const o = Math.min(1, Math.max(0, (s.ledgerIn - delay) / 0.4));
          return (
            <div
              key={`${r.desc}-${i}`}
              className="grid grid-cols-[16px_58px_1fr_70px_92px_1fr_112px] items-center gap-2 border-b border-app-line-soft px-2 py-[5px] text-[8px] text-app-ink"
              style={{ opacity: o, transform: `translateY(${(1 - o) * 5}px)` }}
            >
              <span
                className={`h-2.5 w-2.5 rounded-[2px] border ${
                  r.checked ? "border-app-green bg-app-green" : "border-app-line"
                }`}
              />
              <span className="tabular-nums">{r.date}</span>
              <span className="truncate">{r.desc}</span>
              <span className="text-right tabular-nums">{r.amount}</span>
              <span className="truncate text-app-ink-muted">{r.party}</span>
              <span className={`truncate ${r.link ? "text-app-blue" : "text-app-ink-muted"}`}>
                {r.cat}
              </span>
              <span className="flex items-center justify-end gap-1">
                <span className="rounded border border-app-line px-1 py-px text-[7px]">Match</span>
                <span className="rounded border border-app-line bg-app-chrome px-1 py-px text-[7px]">
                  Categorize
                </span>
                <span className="text-[7px] whitespace-nowrap text-app-blue">Post ⌄</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RequestModal({ s }: { s: SequenceState }) {
  return (
    <div
      className="absolute right-3 bottom-3 z-20 w-[300px] rounded-lg border border-app-line bg-app-surface shadow-2xl"
      style={{
        opacity: s.modalIn * (1 - s.modalOut),
        transform: `scale(${0.96 + 0.04 * s.modalIn}) translateY(${(1 - s.modalIn) * 10}px)`,
      }}
    >
      <div className="flex items-center justify-between px-3 pt-3">
        <span className="text-[10px] font-semibold text-app-ink">Request more info</span>
        <span className="text-[10px] text-app-ink-muted">✕</span>
      </div>
      <div className="mx-3 mt-2 rounded border border-app-line p-2">
        <p className="min-h-[52px] text-[9px] leading-relaxed text-app-ink">
          {s.typed}
          {s.caret && (
            <span className="ml-px inline-block h-2.5 w-px translate-y-0.5 bg-app-ink align-middle" />
          )}
        </p>
        <div className="flex gap-1.5 pt-2">
          <span className="rounded border border-app-line px-1.5 py-1 text-[7.5px] text-app-ink">
            Ask for more info
          </span>
          <span className="rounded border border-app-line px-1.5 py-1 text-[7.5px] text-app-ink">
            Ask for receipt
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3">
        <span className="text-[9px] font-semibold text-app-blue">View list</span>
        <span className="ml-auto rounded border border-app-green px-2 py-1 text-[8px] font-semibold text-app-green">
          Add and post
        </span>
        <span
          className="rounded bg-app-green px-2 py-1 text-[8px] font-semibold text-app-green-foreground"
          style={{ transform: `scale(${1 - 0.06 * Math.sin(s.submit * Math.PI)})` }}
        >
          Add request to list
        </span>
      </div>
    </div>
  );
}

function RequestsScreen({ s }: { s: SequenceState }) {
  return (
    <div className="flex h-full flex-col bg-app-surface">
      <div className="flex items-center gap-2 px-3 pt-3">
        <h3 className="text-[13px] font-semibold text-app-ink">Requests for info</h3>
        <span className="text-[8.5px] text-app-ink-muted">Requests view ⌄</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[8.5px] text-app-ink-muted">Feedback</span>
          <span className="rounded bg-app-green px-2 py-1 text-[8px] font-semibold text-app-green-foreground">
            Send requests
          </span>
          <span className="text-[10px] text-app-ink-muted">✕</span>
        </div>
      </div>

      <div className="mx-3 mt-2 flex items-center gap-1.5 rounded border border-app-blue px-2 py-1.5">
        <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-app-blue text-[6px] text-app-green-foreground">
          i
        </span>
        <span className="text-[8px] text-app-ink">
          Use this view to request info about transactions, or to review responses.{" "}
          <span className="text-app-blue">switch to Replies view.</span>
        </span>
        <span className="ml-auto text-[8px] text-app-ink-muted">✕</span>
      </div>

      <div className="flex px-3 pt-2.5">
        {["New (10)", "In progress (7)", "Complete (4)", "All (21)"].map((t, i) => (
          <span
            key={t}
            className={`border border-app-line px-2 py-1 text-[8px] ${
              i === 0 ? "rounded-l bg-app-dark font-semibold text-app-green-foreground" : ""
            } ${i === 3 ? "rounded-r" : ""} ${i > 0 ? "border-l-0 text-app-ink" : ""}`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mx-3 mt-2 mb-3 flex min-h-0 flex-1 overflow-hidden rounded border border-app-line">
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-[16px_1fr_1fr_56px_56px_1fr_44px_52px] items-center gap-2 border-b border-app-line px-2 py-2 text-[7.5px] font-semibold text-app-ink-muted">
            <span />
            <span>Transaction</span>
            <span>Account</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Question</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          {THREAD_ROWS.map((r, i) => (
            <div
              key={i}
              className={`grid grid-cols-[16px_1fr_1fr_56px_56px_1fr_44px_52px] items-center gap-2 border-b border-app-line-soft px-2 py-[7px] text-[7.5px] ${
                i === 0 ? "bg-app-chrome font-semibold text-app-ink" : "text-app-ink"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-[2px] border border-app-line" />
              <span className="truncate">{r.txn}</span>
              <span className="truncate">{r.account}</span>
              <span>{r.date}</span>
              <span>{r.amount}</span>
              <span className="truncate">{r.q}</span>
              <span className="rounded bg-app-blue px-1 py-px text-center text-[6.5px] font-semibold text-app-green-foreground">
                NEW
              </span>
              <span className="text-app-blue underline">Remove</span>
            </div>
          ))}
        </div>

        <div className="flex w-[228px] shrink-0 flex-col border-l border-app-line">
          <div className="border-b border-app-line px-2.5 py-2 text-[7.5px] font-semibold text-app-ink-muted">
            Thread
          </div>
          <div className="border-b border-app-line px-2.5 py-2">
            <div className="flex items-center justify-between">
              <span className="rounded bg-app-blue px-1 py-px text-[6.5px] font-semibold text-app-green-foreground">
                NEW
              </span>
              <span className="text-[7.5px] text-app-blue">Hide</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-[9px] font-semibold text-app-ink">AMAZON MARKEPLACE N</span>
              <span className="text-[9px] font-semibold text-app-ink">-$123.90</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[7.5px] text-app-ink-muted">Chase credit card: 4455</span>
              <span className="text-[7.5px] text-app-ink-muted">02/10/2025</span>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col gap-2.5 px-2.5 py-2.5">
            <div
              className="flex gap-1.5"
              style={{ opacity: s.threadIn, transform: `translateY(${(1 - s.threadIn) * 6}px)` }}
            >
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[oklch(0.62_0.16_310)] text-[6.5px] font-semibold text-app-green-foreground">
                J
              </div>
              <div className="min-w-0">
                <div className="truncate text-[7.5px] font-semibold text-app-ink">
                  jodie@stanfordaccounting.com{" "}
                  <span className="font-normal text-app-ink-muted">2:46 PM</span>
                </div>
                <p className="pt-0.5 text-[8px] leading-snug text-app-ink">{ACCOUNTANT_MESSAGE}</p>
              </div>
            </div>

            <div
              className="flex justify-end"
              style={{ opacity: s.replyIn, transform: `translateY(${(1 - s.replyIn) * 8}px)` }}
            >
              <div className="max-w-[80%] rounded-lg bg-app-chrome px-2 py-1.5">
                <div className="text-[7px] text-app-ink-muted">Client · 2:46 PM</div>
                <p className="text-[8px] text-app-ink">{CHIPS[CHOSEN_CHIP]}</p>
              </div>
            </div>

            <div
              className="flex gap-1.5"
              style={{ opacity: s.assistantIn, transform: `translateY(${(1 - s.assistantIn) * 8}px)` }}
            >
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-app-green text-[6px] font-semibold text-app-green-foreground">
                AI
              </div>
              <p className="pt-0.5 text-[8px] leading-snug text-app-ink">{ASSISTANT_MESSAGE}</p>
            </div>

            <div className="relative mt-auto" style={{ opacity: s.threadIn }}>
              <div className="flex gap-1">
                {CHIPS.map((c, i) => {
                  const active = s.chipActive && i === CHOSEN_CHIP;
                  return (
                    <span
                      key={c}
                      className={`rounded-full border px-1.5 py-[3px] text-[6.5px] whitespace-nowrap transition-colors ${
                        active
                          ? "border-app-blue bg-app-blue/10 text-app-blue"
                          : "border-app-line text-app-ink"
                      }`}
                      style={{ opacity: s.replyIn > 0.5 && !active ? 0.25 : 1 }}
                    >
                      {c}
                    </span>
                  );
                })}
              </div>
              <Cursor t={s.cursor} from={[78, -60]} to={[16, 10]} />
            </div>

            <div className="flex items-center gap-1.5 border-t border-app-line pt-2">
              <span className="flex-1 text-[7.5px] text-app-ink-faint">Add your response</span>
              <span className="flex h-4 w-4 items-center justify-center rounded bg-app-green text-[7px] text-app-green-foreground">
                ➤
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RealisticSkin({ s, logoUrl }: { s: SequenceState; logoUrl: string }) {
  const ledgerOpacity = 1 - s.panelSwap;
  const threadOpacity = s.panelSwap;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-none border border-app-line bg-app-chrome">
      <div
        className="absolute inset-0 flex flex-col"
        style={{ opacity: ledgerOpacity, transform: `scale(${1 - 0.03 * s.panelSwap})` }}
      >
        <TopBar logoUrl={logoUrl} />
        <div className="flex min-h-0 flex-1 bg-app-surface">
          <Sidebar />
          <LedgerScreen s={s} />
        </div>
        <RequestModal s={s} />
      </div>

      <div
        className="absolute inset-0"
        style={{ opacity: threadOpacity, transform: `translateY(${(1 - s.panelSwap) * 10}px)` }}
      >
        <RequestsScreen s={s} />
      </div>
    </div>
  );
}
