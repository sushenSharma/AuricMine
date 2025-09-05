-- Create features table for user feature access control
CREATE TABLE IF NOT EXISTS features (
    id BIGSERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    p_status TEXT DEFAULT 'free',
    insight_c BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_features_user_id ON features(user_id);

-- Add Row Level Security (RLS)
ALTER TABLE features ENABLE ROW LEVEL SECURITY;

-- Create policies for features table
CREATE POLICY "Users can view own features" ON features
    FOR SELECT USING (auth.uid¯()::text = user_id);

CREATE POLICY "Users can insert own features" ON features
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own features" ON features
    FOR UPDATE USING (auth.uid()::text = user_id);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON features TO authenticated;