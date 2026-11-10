type Props = {
  className?: string;
  /** Text colour for "KARMEL" and the subtitle. */
  tone?: "light" | "dark";
};

/**
 * Clean SVG wordmark: KARMEL in Archivo Expanded Black, a thin green rule,
 * and TRUCKING & EXCAVATING small and letter-spaced underneath.
 */
export function Wordmark({ className = "", tone = "light" }: Props) {
  const fill = tone === "light" ? "var(--limestone)" : "var(--asphalt)";
  return (
    <svg
      viewBox="0 0 200 50"
      className={className}
      role="img"
      aria-label="Karmel Trucking & Excavating"
    >
      <text
        x="0"
        y="27"
        fill={fill}
        textLength="200"
        lengthAdjust="spacingAndGlyphs"
        style={{
          fontFamily: "var(--font-archivo)",
          fontWeight: 900,
          fontStretch: "125%",
          fontSize: 33,
          letterSpacing: "-0.01em",
        }}
      >
        KARMEL
      </text>
      <rect x="0" y="33" width="200" height="1.6" fill="var(--karmel-green)" />
      <rect x="0" y="31.5" width="18" height="4.6" fill="var(--karmel-green)" />
      <text
        x="0"
        y="47"
        fill={fill}
        textLength="200"
        lengthAdjust="spacing"
        style={{
          fontFamily: "var(--font-public-sans)",
          fontWeight: 600,
          fontSize: 9.2,
        }}
      >
        TRUCKING &amp; EXCAVATING
      </text>
    </svg>
  );
}
