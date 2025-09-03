// src/components/maps/StateMap.tsx
type Props = {
  stateName?: string;   // e.g., "Ohio"
  zoom?: number;        // 5–8 works well for states
  className?: string;   // let callers pass Tailwind classes
};

export default function StateMap({
  stateName = "Ohio",
  zoom = 6,
  className = "",
}: Props) {
  const src = `https://www.google.com/maps?hl=en&q=${encodeURIComponent(
    stateName
  )}&z=${zoom}&output=embed`;

  return (
    <div className={`overflow-hidden rounded-lg border ${className}`}>
      <div className="relative w-full" style={{ paddingTop: "75%" }}>
        {/* 4:3 ratio wrapper */}
        <iframe
          title={`Map of ${stateName}`}
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
