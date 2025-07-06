-- SQL script to create missing tables for your payment system
-- Run this in your Supabase SQL editor

-- 1. Create payments table if it doesn't exist
CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    amount BIGINT NOT NULL,
    attempts INTEGER DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'INR',
    entity VARCHAR(50) DEFAULT 'order',
    order_id VARCHAR(255) UNIQUE NOT NULL,
    receipt VARCHAR(255),
    status VARCHAR(50) DEFAULT 'created',
    user_id VARCHAR(255),
    user_email VARCHAR(255),
    user_phone BIGINT,
    payment_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create bond_investments table if it doesn't exist
CREATE TABLE IF NOT EXISTS bond_investments (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    bond_id VARCHAR(100) NOT NULL,
    bond_name VARCHAR(255) NOT NULL,
    investment_amount DECIMAL(15,2) NOT NULL,
    investor_details JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    payment_id VARCHAR(255),
    razorpay_order_id VARCHAR(255),
    razorpay_signature VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create features table if it doesn't exist (optional for user features)
CREATE TABLE IF NOT EXISTS features (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE NOT NULL,
    p_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

CREATE INDEX IF NOT EXISTS idx_bond_investments_user_id ON bond_investments(user_id);
CREATE INDEX IF NOT EXISTS idx_bond_investments_status ON bond_investments(status);
CREATE INDEX IF NOT EXISTS idx_bond_investments_bond_id ON bond_investments(bond_id);

CREATE INDEX IF NOT EXISTS idx_features_user_id ON features(user_id);

-- Create update timestamp triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bond_investments_updated_at BEFORE UPDATE ON bond_investments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON features
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE payments IS 'Stores all payment transactions from Razorpay';
COMMENT ON TABLE bond_investments IS 'Stores iron ore bond investment records';
COMMENT ON TABLE features IS 'Tracks user feature access and payment status';
COMMENT ON COLUMN bond_investments.investor_details IS 'JSON object containing investor KYC details (name, phone, panCard, address)';