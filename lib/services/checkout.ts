/**
 * Checkout quote abstraction.
 * In production this calls a Cloud Function that recalculates everything server-side.
 * Demo version computes a basic quote client-side for UI preview only.
 */
import type { CheckoutQuote, DeliveryType } from "@/lib/types";

export interface QuoteInput {
  storeId: string;
  items: { unitPrice: number; quantity: number }[];
  deliveryType: DeliveryType;
  deliveryFee: number; // vendor-defined
  freeDeliveryThreshold?: number;
}

export function createDemoQuote(input: QuoteInput): CheckoutQuote {
  const subtotal = input.items.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0
  );

  let deliveryFee = input.deliveryFee;
  if (
    input.freeDeliveryThreshold &&
    subtotal >= input.freeDeliveryThreshold
  ) {
    deliveryFee = 0;
  }

  const discountTotal = 0;
  const grandTotal = subtotal + deliveryFee - discountTotal;

  return {
    storeId: input.storeId,
    subtotal,
    deliveryFee,
    discountTotal,
    grandTotal,
    availableDeliveryModes: ["quick", "scheduled"],
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
  };
}

/**
 * Production path: call Cloud Function `createCheckoutQuote`
 * which validates inventory, radius, hours, and returns authoritative totals.
 */
export async function requestCheckoutQuote(_input: QuoteInput): Promise<CheckoutQuote> {
  // TODO: replace with httpsCallable or fetch to Cloud Function
  return createDemoQuote(_input);
}
