-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own payments" ON stripe_payments;
DROP POLICY IF EXISTS "Users can insert own payments" ON stripe_payments;
DROP POLICY IF EXISTS "Users can update own payments" ON stripe_payments;

-- Create new policies that allow anonymous payments
CREATE POLICY "Allow payment inserts" ON stripe_payments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own payments" ON stripe_payments
    FOR SELECT USING (auth.uid()::text = user_id OR auth.uid()::text = user_email OR user_id = 'anonymous');

CREATE POLICY "Users can update own payments" ON stripe_payments
    FOR UPDATE USING (auth.uid()::text = user_id OR auth.uid()::text = user_email OR user_id = 'anonymous');