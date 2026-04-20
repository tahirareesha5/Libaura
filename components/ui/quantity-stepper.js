"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
  compact = false,
}) {
  const buttonSize = compact ? "h-8 w-8" : "h-10 w-10";
  const textSize = compact ? "text-sm" : "text-base";

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface p-1">
      <button
        type="button"
        onClick={onDecrease}
        className={`${buttonSize} grid place-items-center rounded-lg text-muted transition-colors hover:bg-accent-soft hover:text-accent`}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>

      <span className={`min-w-8 text-center font-semibold ${textSize}`}>{quantity}</span>

      <button
        type="button"
        onClick={onIncrease}
        className={`${buttonSize} grid place-items-center rounded-lg text-muted transition-colors hover:bg-accent-soft hover:text-accent`}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
