import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../config/index_supabase';

// Mock data fallback
const mockBondData = {
  'india-starter': {
    id: 'india-starter',
    name: 'India Goa Starter Iron Bond',
    symbol: 'IGIB',
    currentPrice: 102.5,
    change: +2.5,
    changePercent: 2.44,
    userHoldings: 5,
    totalValue: 512.5,
  },
  'brazil-growth': {
    id: 'brazil-growth',
    name: 'Brazil Minas Gerais Growth Bond',
    symbol: 'BMGB',
    currentPrice: 205.8,
    change: -3.2,
    changePercent: -1.53,
    userHoldings: 2,
    totalValue: 411.6,
  },
  'pilbara-premium': {
    id: 'pilbara-premium',
    name: 'Australia Pilbara Premium Iron Bond',
    symbol: 'APIB',
    currentPrice: 315.6,
    change: +5.6,
    changePercent: 1.81,
    userHoldings: 1,
    totalValue: 315.6,
  }
};

export const useBondTypes = () => {
  const [bondTypes, setBondTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBondTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('bond_types')
          .select('*')
          .eq('is_active', true);

        if (error) {
          console.warn('Failed to fetch bond types from database, using mock data:', error);
          // Use mock data as fallback
          setBondTypes([
            {
              id: 'india-starter',
              name: '💰 Quick Cash Starter Bond',
              symbol: 'CASH',
              region: 'India',
              type: 'Beginner-Friendly',
              min_investment: 100,
              current_price: 102.5,
              expected_returns: '12-18%',
              maturity_period: '6 months',
              risk_level: 'Safe & Secure',
              description: '🚀 Start with just $100! Double your money in 6 months with our safest investment. Perfect for beginners who want guaranteed returns!',
              features: ['💵 Start with just $1 - Anyone can afford it!', '📈 Up to 18% returns - Triple bank interest!', '🔒 100% Safe - Government backed security', '⚡ Quick 6-month returns - See profits fast!'],
              color: '#2196F3'
            },
            {
              id: 'brazil-growth',
              name: '🌟 Wealth Builder Pro Bond',
              symbol: 'WEALTH',
              region: 'Brazil',
              type: 'Popular Choice',
              min_investment: 200,
              current_price: 205.8,
              expected_returns: '20-25%',
              maturity_period: '12 months',
              risk_level: 'Medium Risk, High Reward',
              description: '💎 Turn $200 into $250+ in just 1 year! Our most popular choice for serious wealth building. Limited spots available!',
              features: ['💰 25% annual returns - Beat inflation by 20%!', '📊 Monthly profit updates sent to your phone', '🎁 Bonus rewards for early investors', '🔄 Flexible exit options anytime after 6 months'],
              color: '#FF9800'
            },
            {
              id: 'pilbara-premium',
              name: '🏆 Steady Income Champion',
              symbol: 'CHAMP',
              region: 'Australia',
              type: 'Safe & Steady',
              min_investment: 300,
              current_price: 315.6,
              expected_returns: '15-20%',
              maturity_period: '18 months',
              risk_level: 'Ultra Safe',
              description: '🛡️ The safest way to grow $300 into $360+ with Australia\'s most trusted mining operations. Get paid every 3 months!',
              features: ['💵 Quarterly cash payments directly to your account', '🔐 Full insurance coverage - Your money is 100% protected', '📱 Real-time mining progress on your phone', '🚪 Easy exit - Get your money back anytime after 1 year'],
              color: '#4CAF50'
            },
            {
              id: 'safrica-premium',
              name: '🔥 Million Maker Platinum',
              symbol: 'PLAT',
              region: 'South Africa',
              type: 'High Earner',
              min_investment: 500,
              current_price: 525.2,
              expected_returns: '30-40%',
              maturity_period: '24 months',
              risk_level: 'Higher Risk, Maximum Reward',
              description: '🚀 The ULTIMATE wealth multiplier! Turn $500 into $700+ in 2 years. For serious investors who want life-changing returns!',
              features: ['💎 Up to 40% annual returns - The highest we offer!', '🎯 Professional wealth managers handle everything', '👑 VIP investor status with exclusive perks', '📈 Advanced profit tracking and analytics dashboard'],
              color: '#9C27B0'
            }
          ]);
        } else {
          setBondTypes(data || []);
        }
      } catch (err) {
        console.error('Error fetching bond types:', err);
        setError(err.message);
        // Use mock data as fallback
        setBondTypes(Object.values(mockBondData).map(bond => ({
          ...bond,
          min_investment: bond.currentPrice,
          current_price: bond.currentPrice
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchBondTypes();
  }, []);

  return { bondTypes, loading, error };
};

export const useUserBondHoldings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userSession } = useSelector(state => state.public);

  useEffect(() => {
    const fetchUserHoldings = async () => {
      if (!userSession?.user) {
        // Use mock data for demo if no user session
        setHoldings(Object.values(mockBondData));
        setLoading(false);
        return;
      }

      try {
        const userId = userSession.user.id || userSession.user.email;
        
        const { data, error } = await supabase
          .from('user_bond_holdings')
          .select(`
            *,
            bond_types (*)
          `)
          .eq('user_id', userId)
          .eq('is_active', true);

        if (error) {
          console.warn('Failed to fetch user holdings from database, using mock data:', error);
          setHoldings(Object.values(mockBondData));
        } else {
          // Transform database data to match component expectations
          const transformedHoldings = (data || []).map(holding => ({
            ...holding.bond_types,
            userHoldings: holding.quantity,
            totalValue: holding.total_invested,
            purchasePrice: holding.purchase_price,
            change: Math.random() * 10 - 5, // Mock change for demo
            changePercent: (Math.random() * 4 - 2).toFixed(2)
          }));
          
          // If no holdings in database, show mock data for demo
          setHoldings(transformedHoldings.length > 0 ? transformedHoldings : Object.values(mockBondData));
        }
      } catch (err) {
        console.error('Error fetching user holdings:', err);
        setError(err.message);
        setHoldings(Object.values(mockBondData));
      } finally {
        setLoading(false);
      }
    };

    fetchUserHoldings();
  }, [userSession]);

  return { holdings, loading, error, setHoldings };
};

export const useBondPriceHistory = (bondId, period = '1M') => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        // Calculate date range based on period
        const now = new Date();
        const daysAgo = {
          '1D': 1,
          '1W': 7,
          '1M': 30,
          '3M': 90,
          '1Y': 365
        }[period] || 30;

        const fromDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));

        const { data, error } = await supabase
          .from('bond_price_history')
          .select('*')
          .eq('bond_id', bondId)
          .gte('recorded_at', fromDate.toISOString())
          .order('recorded_at', { ascending: true });

        if (error) {
          console.warn('Failed to fetch price history from database, generating mock data:', error);
          // Generate mock data
          const mockData = generateMockPriceData(period);
          setPriceHistory(mockData);
        } else {
          // Transform database data
          const transformedData = (data || []).map(record => ({
            date: record.recorded_at.split('T')[0],
            price: parseFloat(record.price).toFixed(2),
            displayDate: period === '1D' 
              ? new Date(record.recorded_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
              : new Date(record.recorded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }));
          
          setPriceHistory(transformedData.length > 0 ? transformedData : generateMockPriceData(period));
        }
      } catch (err) {
        console.error('Error fetching price history:', err);
        setError(err.message);
        setPriceHistory(generateMockPriceData(period));
      } finally {
        setLoading(false);
      }
    };

    if (bondId) {
      fetchPriceHistory();
    }
  }, [bondId, period]);

  return { priceHistory, loading, error };
};

// Helper function to generate mock price data
const generateMockPriceData = (period) => {
  const basePrice = 100;
  const dataPoints = {
    '1D': 24,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '1Y': 365
  };

  const data = [];
  const points = dataPoints[period] || 30;
  
  for (let i = 0; i < points; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (points - i - 1));
    
    const price = basePrice + (Math.random() * 20 - 10) + (i * 0.1);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.max(80, Math.min(120, price)).toFixed(2),
      displayDate: period === '1D' 
        ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
  }
  
  return data;
};