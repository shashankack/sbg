const pixels = [
  { top: "14%", left: "2.2%" },
  { top: "28%", left: "97%", dim: true, blink: true },
  { top: "58%", left: "1.4%", hide: true },
  { top: "72%", left: "98%", dim: true },
  { top: "88%", left: "3%", blink: true, hide: true },
  { top: "8%", left: "96%" },
];

export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:96px_96px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_72%)]" />
      <div className="absolute -top-[12%] -left-[18%] h-[52vh] w-[48vw] bg-[radial-gradient(circle,rgba(56,3,86,0.55),transparent_68%)]" />
      <div className="absolute top-[38%] -right-[12%] h-[36vh] w-[34vw] bg-[radial-gradient(circle,rgba(107,0,120,0.16),transparent_70%)]" />
      <div className="absolute bottom-[-8%] left-[20%] h-[28vh] w-[40vw] bg-[radial-gradient(circle,rgba(56,3,86,0.28),transparent_70%)]" />
      {pixels.map((pixel) => (
        <span
          key={`${pixel.top}-${pixel.left}`}
          className={`pixel ${pixel.dim ? "pixel-dim" : ""} ${pixel.blink ? "pixel-blink" : ""} ${pixel.hide ? "max-md:hidden" : ""}`}
          style={{ top: pixel.top, left: pixel.left }}
        />
      ))}
    </div>
  );
}
