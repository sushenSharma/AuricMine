-- Seed data for testing (optional)
-- This file contains sample data for development/testing purposes

-- Insert a test payment record (you can remove this in production)
INSERT INTO stripe_payments (
    payment_intent_id,
    amount,
    currency,
    status,
    user_email,
    user_phone,
    metadata
) VALUES (
    'pi_test_example_123456789',
    10000, -- $100.00 in cents
    'usd',
    'succeeded',
    'test@example.com',
    '+1234567890',
    '{"test_data": true, "product": "Premium Plan"}'::jsonb
) ON CONFLICT (payment_intent_id) DO NOTHING;

-- Insert a test payment log
INSERT INTO payment_logs (
    payment_intent_id,
    amount,
    currency,
    status,
    metadata
) VALUES (
    'pi_test_example_123456789',
    10000,
    'usd',
    'succeeded',
    '{"test_data": true}'::jsonb
);