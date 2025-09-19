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
  const mapLabel = `${stateName} - Interactive Map Not Available Offline`;
  
  return (
    <div className={`overflow-hidden rounded-lg border ${className}`}>
      <div className="relative w-full" style={{ paddingTop: "100%" }}>
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center p-4">
            <p className="text-muted-foreground font-medium">{mapLabel}</p>
            <small className="text-muted-foreground/70">Maps require internet connection</small>
          </div>
        </div>
      </div>
    </div>
  );
}
