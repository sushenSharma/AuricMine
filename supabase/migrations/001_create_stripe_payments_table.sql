-- Create stripe_payments table
CREATE TABLE IF NOT EXISTS stripe_payments (
    id BIGSERIAL PRIMARY KEY,
    payment_intent_id TEXT UNIQUE NOT NULL,
    amount INTEGER NOT NULL, -- Amount in cents
    currency TEXT NOT NULL DEFAULT 'usd',
    status TEXT NOT NULL DEFAULT 'pending',
    user_id TEXT,
    user_email TEXT,
    user_phone TEXT,
    payment_method_id TEXT,
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment_logs table for tracking payment intent creation
CREATE TABLE IF NOT EXISTS payment_logs (
    id BIGSERIAL PRIMARY KEY,
    payment_intent_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL,
    status TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stripe_payments_payment_intent_id ON stripe_payments(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payments_user_email ON stripe_payments(user_email);
CREATE INDEX IF NOT EXISTS idx_stripe_payments_status ON stripe_payments(status);
CREATE INDEX IF NOT EXISTS idx_stripe_payments_created_at ON stripe_payments(created_at);

CREATE INDEX IF NOT EXISTS idx_payment_logs_payment_intent_id ON payment_logs(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_created_at ON payment_logs(created_at);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_stripe_payments_updated_at 
    BEFORE UPDATE ON stripe_payments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add Row Level Security (RLS)
ALTER TABLE stripe_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for stripe_payments table
-- Allow anonymous users to insert payment records (for guest checkout)
CREATE POLICY "Allow payment inserts" ON stripe_payments
    FOR INSERT WITH CHECK (true);

-- Users can only see their own payment records
CREATE POLICY "Users can view own payments" ON stripe_payments
    FOR SELECT USING (auth.uid()::text = user_id OR auth.uid()::text = user_email OR user_id = 'anonymous');

-- Users can update their own payment records
CREATE POLICY "Users can update own payments" ON stripe_payments
    FOR UPDATE USING (auth.uid()::text = user_id OR auth.uid()::text = user_email OR user_id = 'anonymous');

-- Only service role can access payment_logs
CREATE POLICY "Service role can access payment_logs" ON payment_logs
    FOR ALL USING (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON stripe_payments TO authenticated;
GRANT SELECT, INSERT ON payment_logs TO service_role;