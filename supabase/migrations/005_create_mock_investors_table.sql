-- Create mock investors table for admin demo purposes
CREATE TABLE IF NOT EXISTS mock_investors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    total_bonds INTEGER NOT NULL DEFAULT 1,
    total_invested DECIMAL(10,2) NOT NULL DEFAULT 0,
    bond_type VARCHAR(100),
    joined_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_investment TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    avatar_color VARCHAR(7) DEFAULT '#FF6B35',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on joined_date for efficient sorting
CREATE INDEX IF NOT EXISTS idx_mock_investors_joined_date ON mock_investors (joined_date DESC);

-- Create an index on is_active for filtering
CREATE INDEX IF NOT EXISTS idx_mock_investors_active ON mock_investors (is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE mock_investors ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin functionality)
CREATE POLICY "Allow authenticated users to view mock investors" ON mock_investors
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert mock investors" ON mock_investors
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update mock investors" ON mock_investors
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete mock investors" ON mock_investors
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert some initial mock data
INSERT INTO mock_investors (name, email, total_bonds, total_invested, bond_type, joined_date, avatar_color) VALUES
('Alex Johnson', 'alex.johnson@example.com', 3, 750.00, 'India Starter', NOW() - INTERVAL '2 hours', '#FF6B35'),
('Maria Garcia', 'maria.garcia@example.com', 5, 1250.00, 'Brazil Growth', NOW() - INTERVAL '5 hours', '#4ECDC4'),
('David Chen', 'david.chen@example.com', 2, 500.00, 'Australia Premium', NOW() - INTERVAL '1 day', '#45B7D1'),
('Sarah Wilson', 'sarah.wilson@example.com', 7, 1750.00, 'South Africa Platinum', NOW() - INTERVAL '2 days', '#96CEB4'),
('Michael Brown', 'michael.brown@example.com', 1, 250.00, 'India Starter', NOW() - INTERVAL '3 days', '#FFEAA7');