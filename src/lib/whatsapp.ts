import { CartItem, CustomerDetails } from '@/store/cartStore';
import { formatPrice } from '@/lib/formatPrice';

export const BRAND_PHONE = '919900161030';
export const BRAND_PHONE_DISPLAY = '+91 99001 61030';
export const BRAND_EMAIL = 'contact@momssecretspices.com';

// Fallback base URL for image links in WhatsApp
export const SITE_DOMAIN = 'https://momssecretspices.com';

export interface WhatsAppOrderDetails {
  productName: string;
  packSize: string;
  quantity: number;
  unitPrice: number;
  customerNote?: string;
  image?: string;
}

/**
 * Builds full WhatsApp checkout text including:
 * - Each item with quantity, pack size, price, and direct image preview link
 * - Subtotal and item counts
 * - Customer contact and delivery address
 * - Special instructions
 */
export function buildWhatsAppCartCheckoutUrl(
  items: CartItem[],
  customer: CustomerDetails,
  totalPrice: number
): string {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  let message = `*MOM'S SECRET SPICES — ORDER REQUEST*\n`;
  message += `_Artisanal Stone-Ground Heritage Spices_\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `📦 *ORDERED ITEMS (${items.length} items / ${totalQuantity} packs):*\n\n`;

  items.forEach((item, index) => {
    const itemTotal = item.unitPrice * item.quantity;
    const imageUrl = item.image.startsWith('http')
      ? item.image
      : `${SITE_DOMAIN}${item.image}`;

    message += `*${index + 1}. ${item.name}*\n`;
    message += `   • Pack: *${item.packSize}*\n`;
    message += `   • Qty: *${item.quantity}* × ₹${formatPrice(item.unitPrice)} = *₹${formatPrice(itemTotal)}*\n`;
    message += `   • Photo: ${imageUrl}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *TOTAL ESTIMATE: ₹${formatPrice(totalPrice)}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  // Delivery & Customer Information
  message += `📍 *DELIVERY DETAILS:*\n`;
  message += `• *Name:* ${customer.name?.trim() || '[Please provide name]'}\n`;
  message += `• *Phone:* ${customer.phone?.trim() || '[Please provide phone]'}\n`;
  message += `• *Address:* ${customer.address?.trim() || '[Please provide address]'}\n`;
  if (customer.city?.trim()) {
    message += `• *City:* ${customer.city.trim()}\n`;
  }
  if (customer.pincode?.trim()) {
    message += `• *Pincode:* ${customer.pincode.trim()}\n`;
  }

  if (customer.notes?.trim()) {
    message += `\n📝 *SPECIAL INSTRUCTIONS:*\n${customer.notes.trim()}\n`;
  }

  message += `\n🙏 Please confirm order availability, share payment instructions (UPI/Bank), and dispatch timeline. Thank you!`;

  return `https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Single-product quick order WhatsApp link with direct image link
 */
export function buildWhatsAppOrderUrl(details: WhatsAppOrderDetails): string {
  const { productName, packSize, quantity, unitPrice, customerNote, image } = details;
  const totalPrice = unitPrice * quantity;
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${SITE_DOMAIN}${image}`
    : undefined;

  let message =
    `Namaste Mom’s Secret Spices! 🙏\n\n` +
    `I would like to order from *Mom's Secret Spices*:\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `• *Product:* ${productName}\n` +
    `• *Pack Size:* ${packSize}\n` +
    `• *Quantity:* ${quantity}\n` +
    `• *Unit Price:* ₹${formatPrice(unitPrice)}\n` +
    `• *Estimated Total:* ₹${formatPrice(totalPrice)}\n`;

  if (imageUrl) {
    message += `• *Image Preview:* ${imageUrl}\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━\n\n` +
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
    `Namaste Mom’s Secret Spices! 🙏\n\n` +
    `I am inquiring regarding *Wholesale & HoReCa Supply* for *Mom's Secret Spices*.\n` +
    `• *Inquiry Type:* ${businessType}\n` +
    `• *Location / City:* [Your City Here]\n\n` +
    `Please share your B2B product catalogue, bulk commercial pack options (5kg/10kg/25kg), and dealership terms.\n\n` +
    `Looking forward to connecting!`;

  return `https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(message)}`;
}
