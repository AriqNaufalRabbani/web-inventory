export function formatPrice(value: number | string, locale: string = "id-ID", currency?: string): string {
  if (value === null || value === undefined || value === "") return "-";

  const numberValue = Number(value);

  if (isNaN(numberValue)) return String(value);

  // Jika ingin pakai format mata uang (misal Rupiah)
  if (currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(numberValue);
  }

  // Jika hanya separator angka (tanpa simbol Rp)
  return new Intl.NumberFormat(locale).format(numberValue);
}
