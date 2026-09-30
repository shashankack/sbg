import type { DocumentBlock } from "@/lib/site";

export function DocumentSections({ blocks }: { blocks: DocumentBlock[] }) {
  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
      {blocks.map((block) => (
        <section
          key={block.id}
          id={block.id}
          className="grid gap-6 border-t border-white/10 py-16 md:grid-cols-[160px_minmax(0,1fr)] md:py-24"
        >
          <p className="font-mono text-[11px] tracking-[0.2em] text-white/40">
            {block.index}
          </p>
          <div className="max-w-3xl">
            <h2 className="text-[clamp(32px,4vw,56px)] leading-[0.95] font-medium tracking-[-0.045em]">
              {block.title}
            </h2>
            <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-muted">
              {block.body}
            </p>
            <p className="mt-6 font-mono text-[10px] tracking-[0.22em] text-[#B000B2]">
              PLACEHOLDER
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
