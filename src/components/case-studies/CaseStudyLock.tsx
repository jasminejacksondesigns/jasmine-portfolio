"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

const STORAGE_KEY = "jj-case-study-unlocked";
const PASSWORD = "bloom";

export const PUBLIC_CASE_STUDY_SECTION_IDS = new Set([
  "overview",
  "problem",
  "solution",
]);

type LockContextValue = {
  enabled: boolean;
  unlocked: boolean;
  unlock: (password: string) => boolean;
};

const CaseStudyLockContext = createContext<LockContextValue>({
  enabled: false,
  unlocked: true,
  unlock: () => true,
});

export function useCaseStudyLock() {
  return useContext(CaseStudyLockContext);
}

export function CaseStudyLockProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setUnlocked(true);
      return;
    }
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setUnlocked(true);
      }
    } catch {
      /* ignore */
    }
  }, [enabled]);

  const unlock = (password: string) => {
    if (password.trim().toLowerCase() !== PASSWORD) return false;
    setUnlocked(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    return true;
  };

  return (
    <CaseStudyLockContext.Provider
      value={{ enabled, unlocked: !enabled || unlocked, unlock }}
    >
      {children}
    </CaseStudyLockContext.Provider>
  );
}

export function CaseStudyLocked({ children }: { children: ReactNode }) {
  const { enabled, unlocked } = useCaseStudyLock();
  if (!enabled || unlocked) {
    return <div className="contents">{children}</div>;
  }
  return <CaseStudyPasswordForm />;
}

function CaseStudyPasswordForm() {
  const { unlock } = useCaseStudyLock();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = unlock(value);
    if (!ok) setError(true);
  };

  return (
    <section className="border-t border-border pt-10 md:pt-14">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-5 text-center">
        <div className="space-y-3">
          <p className="font-subheading text-xs tracking-[0.5px] text-muted uppercase">
            Protected
          </p>
          <h2 className="font-display text-2xl font-light tracking-tight text-ink">
            The rest of this case study is locked
          </h2>
          <p className="text-sm font-light leading-relaxed text-muted">
            Enter the password to see process, iterations, and the final design.
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex w-full flex-col gap-3">
          <label className="sr-only" htmlFor="case-study-password">
            Password
          </label>
          <input
            id="case-study-password"
            type="password"
            autoComplete="off"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setError(false);
            }}
            placeholder="Password"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-center text-sm text-ink outline-none placeholder:text-muted focus:border-ink"
          />
          {error ? (
            <p className="text-xs text-muted">That password doesn’t match.</p>
          ) : null}
          <button
            type="submit"
            className="rounded-full bg-role-pill px-5 py-2.5 font-display text-sm font-light text-white transition-opacity hover:opacity-90"
          >
            Unlock
          </button>
        </form>
      </div>
    </section>
  );
}
