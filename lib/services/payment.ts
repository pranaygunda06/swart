/**
 * Payment provider abstraction (Razorpay-ready)
 */

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  orderId: string;
  status: "created" | "paid" | "failed";
}

export interface CreatePaymentInput {
  orderId: string;
  amount: number; // in paise for Razorpay
  currency?: string;
  customerEmail?: string;
  customerPhone?: string;
}

/**
 * Demo implementation – does not charge real money.
 * Replace with real Razorpay / PhonePe / Cashfree SDK + webhook verification.
 */
export async function createPaymentIntent(
  input: CreatePaymentInput
): Promise<PaymentIntent> {
  // In production: call Cloud Function that creates Razorpay order
  return {
    id: `pay_demo_${Date.now()}`,
    amount: input.amount,
    currency: input.currency || "INR",
    orderId: input.orderId,
    status: "created",
  };
}

export async function verifyPaymentWebhook(
  _payload: unknown,
  _signature: string
): Promise<boolean> {
  // Production: verify Razorpay signature server-side
  return false;
}
