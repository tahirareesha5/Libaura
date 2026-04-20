import Link from "next/link";

export default function LogoMark() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/35 bg-accent-soft text-lg font-bold text-accent transition-transform duration-300 group-hover:scale-105">
        L
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
          Libaura
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">
          Grocery Store
        </span>
      </span>
    </Link>
  );
}
