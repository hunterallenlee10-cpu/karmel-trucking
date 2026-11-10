type Props = {
  num?: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/** Section label styled like a survey stake: green flag + "01 / LAND CLEARING". */
export function StakeLabel({ num, children, tone = "dark", className = "" }: Props) {
  const text = tone === "dark" ? "text-limestone/80" : "text-muted-light";
  return (
    <p className={`stake flex items-center gap-3 ${text} ${className}`}>
      <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden="true" className="shrink-0">
        <rect x="0" y="0" width="1.6" height="18" fill="currentColor" opacity="0.7" />
        <path d="M1.6 0.5 L13.5 3.6 L1.6 6.8 Z" fill="var(--karmel-green)" />
      </svg>
      <span>
        {num ? (
          <>
            <span className={tone === "dark" ? "text-green" : "text-green-ink"}>{num}</span>
            <span className="mx-2 opacity-50">/</span>
          </>
        ) : null}
        {children}
      </span>
    </p>
  );
}
