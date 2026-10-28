/**
 * Formats a currency/price value with two decimal places (e.g. 25.35, 50.70, 177.45).
 */
export function formatPrice(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0.00';
  }
  return Number(amount).toFixed(2);
}

