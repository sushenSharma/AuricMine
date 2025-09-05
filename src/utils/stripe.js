import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const createPaymentIntent = async (amount, currency = 'usd', metadata = {}) => {
  const response = await fetch(`${process.env.REACT_APP_BE_BASE_URL}/super-action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ amount, currency, metadata }),
  });
  
  if (!response.ok) {
    throw new Error(`Payment intent creation failed: ${response.status}`);
  }
  
  return response.json();
};

export const confirmPayment = async (paymentIntentClientSecret, paymentMethod) => {
  const stripe = await stripePromise;
  
  return stripe.confirmCardPayment(paymentIntentClientSecret, {
    payment_method: paymentMethod
  });
};

export default stripePromise;