import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../utils/stripe';

const StripeProvider = ({ children }) => {
  const options = {
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#4340f5',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeProvider;