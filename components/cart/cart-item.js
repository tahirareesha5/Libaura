import Image from "next/image";
import { Trash2 } from "lucide-react";
import QuantityStepper from "@/components/ui/quantity-stepper";
import { formatCurrency } from "@/lib/currency";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const lineTotal = Number((item.unitPrice * item.quantity).toFixed(2));

  return (
    <article className="rounded-2xl border border-border bg-surface p-3 shadow-[0_10px_24px_rgba(10,22,40,0.06)]">
      <div className="flex items-start gap-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-background">
          <Image
            src={item.image}
            alt={item.name}
            width={160}
            height={160}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
                {item.name}
              </h3>
              <p className="text-xs text-muted">{item.category}</p>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-red-50 hover:text-danger"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <QuantityStepper
              quantity={item.quantity}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              compact
            />

            <p className="text-sm font-bold text-foreground">
              {formatCurrency(lineTotal)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
