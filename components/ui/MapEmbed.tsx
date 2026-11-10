/** Keyless Google Maps embed, grayscale, with a green brand pin over Mechanicsville. */
export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[var(--radius)] bg-card-light ${className}`}>
      <iframe
        title="Map of Mechanicsville, Maryland 20659"
        src="https://maps.google.com/maps?q=Mechanicsville,+MD+20659&z=10&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(1.08)_brightness(0.98)]"
      />
      {/* Brand pin over the map centre */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full" aria-hidden="true">
        <span className="absolute top-full left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green/25 motion-safe:animate-ping" />
        <svg width="40" height="52" viewBox="0 0 40 52" className="relative drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]">
          <path d="M20 0C9 0 0 8.7 0 19.6 0 34.3 20 52 20 52s20-17.7 20-32.4C40 8.7 31 0 20 0z" fill="#44A12A" />
          <path d="M14 11h4.5v19H14zM18.5 20l5.5-9h5.3l-6.4 9.8 6.9 9.2h-5.4z" fill="#121412" />
        </svg>
      </div>
      <span className="stake absolute bottom-3 left-3 rounded-[4px] bg-asphalt px-2.5 py-1.5 text-[0.68rem] text-limestone">Mechanicsville, MD 20659</span>
    </div>
  );
}
