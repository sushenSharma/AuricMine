-- SQL script to create bond_investments table in Supabase
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS bond_investments (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
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

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bond_investments_user_id ON bond_investments(user_id);
CREATE INDEX IF NOT EXISTS idx_bond_investments_status ON bond_investments(status);
CREATE INDEX IF NOT EXISTS idx_bond_investments_bond_id ON bond_investments(bond_id);
CREATE INDEX IF NOT EXISTS idx_bond_investments_created_at ON bond_investments(created_at);

-- Enable Row Level Security
ALTER TABLE bond_investments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own investments
CREATE POLICY "Users can view their own investments" ON bond_investments
    FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own investments
CREATE POLICY "Users can create their own investments" ON bond_investments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own investments
CREATE POLICY "Users can update their own investments" ON bond_investments
    FOR UPDATE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_bond_investments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_bond_investments_updated_at
    BEFORE UPDATE ON bond_investments
    FOR EACH ROW
    EXECUTE FUNCTION update_bond_investments_updated_at();

-- Optional: Create a view for better data access
CREATE OR REPLACE VIEW user_bond_portfolio AS
SELECT 
    bi.id,
    bi.user_id,
    bi.user_email,
    bi.bond_id,
    bi.bond_name,
    bi.investment_amount,
    bi.investor_details,
    bi.status,
    bi.payment_id,
    bi.created_at,
    bi.completed_at,
    -- Calculate investment age in days
    EXTRACT(DAY FROM (NOW() - bi.completed_at)) as investment_age_days,
    -- Estimate current value (assuming 9% annual growth for completed investments)
    CASE 
        WHEN bi.status = 'completed' AND bi.completed_at IS NOT NULL 
        THEN bi.investment_amount * (1 + (0.09 * EXTRACT(DAY FROM (NOW() - bi.completed_at)) / 365))
        ELSE bi.investment_amount
    END as estimated_current_value
FROM bond_investments bi
WHERE bi.status = 'completed';

-- Grant access to the view
GRANT SELECT ON user_bond_portfolio TO authenticated;

-- Sample data (remove this section in production)
-- INSERT INTO bond_investments (
--     user_id, 
--     user_email, 
--     bond_id, 
--     bond_name, 
--     investment_amount, 
--     investor_details, 
--     status,
--     payment_id,
--     completed_at
-- ) VALUES (
--     auth.uid(),
--     'user@example.com',
--     'pilbara-premium',
--     'Australia Pilbara Premium Iron Bond',
--     50000.00,
--     '{"name": "John Doe", "phone": "+1234567890", "panCard": "ABCDE1234F", "address": "123 Main St, City, Country"}',
--     'completed',
--     'pay_sample123',
--     NOW() - INTERVAL '3 months'
-- );

COMMENT ON TABLE bond_investments IS 'Stores iron ore bond investment records with payment tracking';
COMMENT ON COLUMN bond_investments.investor_details IS 'JSON object containing investor KYC details (name, phone, panCard, address)';
COMMENT ON COLUMN bond_investments.status IS 'Investment status: pending, completed, failed, or cancelled';
COMMENT ON VIEW user_bond_portfolio IS 'View providing enriched bond investment data with estimated current values';