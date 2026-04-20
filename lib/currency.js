const liberianCurrency = new Intl.NumberFormat("en-LR", {
  style: "currency",
  currency: "LRD",
  maximumFractionDigits: 2,
});

export function formatCurrency(amount) {
  return liberianCurrency.format(amount);
}
