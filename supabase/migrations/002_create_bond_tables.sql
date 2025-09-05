-- Create bond_types table for available bonds
CREATE TABLE IF NOT EXISTS bond_types (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    region TEXT NOT NULL,
    type TEXT NOT NULL,
    min_investment DECIMAL(10,2) NOT NULL,
    current_price DECIMAL(10,2) NOT NULL,
    expected_returns TEXT NOT NULL,
    maturity_period TEXT NOT NULL,
    risk_level TEXT NOT NULL,
    description TEXT,
    features JSONB DEFAULT '[]',
    color TEXT DEFAULT '#4CAF50',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_bond_holdings table for tracking user investments
CREATE TABLE IF NOT EXISTS user_bond_holdings (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    user_email TEXT NOT NULL,
    bond_id TEXT NOT NULL REFERENCES bond_types(id),
    quantity INTEGER NOT NULL DEFAULT 0,
    purchase_price DECIMAL(10,2) NOT NULL,
    total_invested DECIMAL(10,2) NOT NULL,
    purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bond_price_history table for price tracking
CREATE TABLE IF NOT EXISTS bond_price_history (
    id BIGSERIAL PRIMARY KEY,
    bond_id TEXT NOT NULL REFERENCES bond_types(id),
    price DECIMAL(10,2) NOT NULL,
    change_amount DECIMAL(10,2) DEFAULT 0,
    change_percent DECIMAL(5,2) DEFAULT 0,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_bond_holdings_user_id ON user_bond_holdings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_bond_holdings_user_email ON user_bond_holdings(user_email);
CREATE INDEX IF NOT EXISTS idx_user_bond_holdings_bond_id ON user_bond_holdings(bond_id);
CREATE INDEX IF NOT EXISTS idx_bond_price_history_bond_id ON bond_price_history(bond_id);
CREATE INDEX IF NOT EXISTS idx_bond_price_history_recorded_at ON bond_price_history(recorded_at);

-- Insert irresistible investment opportunities for everyday people!
INSERT INTO bond_types (id, name, symbol, region, type, min_investment, current_price, expected_returns, maturity_period, risk_level, description, features, color) VALUES
('india-starter', '💰 Quick Cash Starter Bond', 'CASH', 'India', 'Beginner-Friendly', 100.00, 102.50, '12-18%', '6 months', 'Safe & Secure', '🚀 Start with just $100! Double your money in 6 months with our safest investment. Perfect for beginners who want guaranteed returns!', '["💵 Start with just $100 - Perfect entry point!", "📈 Up to 18% returns - Triple bank interest!", "🔒 100% Safe - Government backed security", "⚡ Quick 6-month returns - See profits fast!"]', '#2196F3'),
('brazil-growth', '🌟 Wealth Builder Pro Bond', 'WEALTH', 'Brazil', 'Popular Choice', 200.00, 205.80, '20-25%', '12 months', 'Medium Risk, High Reward', '💎 Turn $200 into $250+ in just 1 year! Our most popular choice for serious wealth building. Limited spots available!', '["💰 25% annual returns - Beat inflation by 20%!", "📊 Monthly profit updates sent to your phone", "🎁 Bonus rewards for early investors", "🔄 Flexible exit options anytime after 6 months"]', '#FF9800'),
('pilbara-premium', '🏆 Steady Income Champion', 'CHAMP', 'Australia', 'Safe & Steady', 300.00, 315.60, '15-20%', '18 months', 'Ultra Safe', '🛡️ The safest way to grow $300 into $360+ with Australia''s most trusted mining operations. Get paid every 3 months!', '["💵 Quarterly cash payments directly to your account", "🔐 Full insurance coverage - Your money is 100% protected", "📱 Real-time mining progress on your phone", "🚪 Easy exit - Get your money back anytime after 1 year"]', '#4CAF50'),
('safrica-premium', '🔥 Million Maker Platinum', 'PLAT', 'South Africa', 'High Earner', 500.00, 525.20, '30-40%', '24 months', 'Higher Risk, Maximum Reward', '🚀 The ULTIMATE wealth multiplier! Turn $500 into $700+ in 2 years. For serious investors who want life-changing returns!', '["💎 Up to 40% annual returns - The highest we offer!", "🎯 Professional wealth managers handle everything", "👑 VIP investor status with exclusive perks", "📈 Advanced profit tracking and analytics dashboard"]', '#9C27B0')
ON CONFLICT (id) DO UPDATE SET
    current_price = EXCLUDED.current_price,
    updated_at = NOW();

-- Insert sample price history for each bond (last 30 days)
INSERT INTO bond_price_history (bond_id, price, change_amount, change_percent, recorded_at)
SELECT 
    bond_id,
    base_price + (random() * 10 - 5) as price,
    (random() * 4 - 2) as change_amount,
    (random() * 4 - 2) as change_percent,
    NOW() - (interval '1 day' * generate_series(29, 0, -1)) as recorded_at
FROM (
    SELECT 'india-starter' as bond_id, 100.00 as base_price
    UNION ALL
    SELECT 'brazil-growth', 200.00
    UNION ALL
    SELECT 'pilbara-premium', 310.00
    UNION ALL
    SELECT 'safrica-premium', 520.00
) base_data
ON CONFLICT DO NOTHING;

-- Add Row Level Security (RLS)
ALTER TABLE bond_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bond_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bond_price_history ENABLE ROW LEVEL SECURITY;

-- Create policies for bond_types table (public read access)
CREATE POLICY "Anyone can view bond types" ON bond_types
    FOR SELECT USING (true);

-- Create policies for user_bond_holdings table
CREATE POLICY "Users can view own bond holdings" ON user_bond_holdings
    FOR SELECT USING (auth.uid()::text = user_id OR auth.uid()::text = user_email);

CREATE POLICY "Users can insert own bond holdings" ON user_bond_holdings
    FOR INSERT WITH CHECK (auth.uid()::text = user_id OR auth.uid()::text = user_email);

CREATE POLICY "Users can update own bond holdings" ON user_bond_holdings
    FOR UPDATE USING (auth.uid()::text = user_id OR auth.uid()::text = user_email);

-- Create policies for bond_price_history table (public read access)
CREATE POLICY "Anyone can view bond price history" ON bond_price_history
    FOR SELECT USING (true);

-- Grant permissions
GRANT SELECT ON bond_types TO public;
GRANT SELECT ON bond_price_history TO public;
GRANT SELECT, INSERT, UPDATE ON user_bond_holdings TO authenticated;