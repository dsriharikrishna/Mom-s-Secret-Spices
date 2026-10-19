export const BRAND_PHONE = '919900161030';
export const BRAND_PHONE_DISPLAY = '+91 99001 61030';
export const BRAND_EMAIL = 'contact@momssecretspices.com';

export interface WhatsAppOrderDetails {
  productName: string;
  packSize: string;
  quantity: number;
  unitPrice: number;
  customerNote?: string;
}

/**
 * Generates an officially formatted and URL-encoded WhatsApp order link.
 */
export function buildWhatsAppOrderUrl(details: WhatsAppOrderDetails): string {
  const { productName, packSize, quantity, unitPrice, customerNote } = details;
  const totalPrice = unitPrice * quantity;

  let message = 
    `Namaste Akshaya Foods! 🙏\n\n` +
    `I would like to order from *Mom's Secret Spices*:\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `• *Product:* ${productName}\n` +
    `• *Pack Size:* ${packSize}\n` +
    `• *Quantity:* ${quantity}\n` +
    `• *Unit Price:* ₹${unitPrice}\n` +
    `• *Estimated Total:* ₹${totalPrice}\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n` +
    `Please share the payment link and estimated delivery timeline.`;

  if (customerNote && customerNote.trim()) {
    message += `\n\n*Special Instructions:* ${customerNote.trim()}`;
  }

  message += `\n\nThank you!`;

  return `https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a WhatsApp wholesale & distributor inquiry link.
 */
export function buildWhatsAppWholesaleUrl(businessType: string = 'Retailer / Distributor'): string {
  const message =
    `Namaste Akshaya Foods! 🙏\n\n` +
    `I am inquiring regarding *Wholesale & HoReCa Supply* for *Mom's Secret Spices*.\n` +
    `• *Inquiry Type:* ${businessType}\n` +
    `• *Location / City:* [Your City Here]\n\n` +
    `Please share your B2B product catalogue, bulk commercial pack options (5kg/10kg/25kg), and dealership terms.\n\n` +
    `Looking forward to connecting!`;

  return `https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(message)}`;
}
