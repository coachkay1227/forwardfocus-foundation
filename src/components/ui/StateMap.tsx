type Props = {
  stateName?: string;   // e.g., "Ohio"
  zoom?: number;        // 5–8 works well for states
  className?: string;
};

export default function StateMap({ stateName = "Ohio", zoom = 6, className = "" }: Props) {
  // Use the proper Google Maps embed API URL format
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO4iZRjreH4Nv0&q=${encodeURIComponent(stateName)},USA&zoom=${zoom}`;

  return (
    <div className={`overflow-hidden rounded-lg border bg-card ${className}`}>
      <iframe
        title={`${stateName} Map`}
        src={embedUrl}
        className="h-[300px] w-full md:h-[420px] border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}