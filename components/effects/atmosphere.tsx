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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(147,0,156,0.42),rgba(56,3,86,0.22)_32%,transparent_62%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:88px_88px] opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_28%,transparent_80%)]" />
      <div className="absolute -top-[8%] left-[8%] h-[58vh] w-[54vw] bg-[radial-gradient(circle,rgba(176,0,178,0.34),transparent_68%)]" />
      <div className="absolute top-[22%] -right-[8%] h-[48vh] w-[42vw] bg-[radial-gradient(circle,rgba(107,0,120,0.38),transparent_70%)]" />
      <div className="absolute bottom-[-6%] left-[18%] h-[36vh] w-[46vw] bg-[radial-gradient(circle,rgba(56,3,86,0.55),transparent_72%)]" />
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
