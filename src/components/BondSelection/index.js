import React, { useState } from 'react';

const BondSelection = ({ onInvest, newInvestor = false }) => {
  const [selectedBond, setSelectedBond] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  // Irresistible investment opportunities for everyday people!
  const bonds = [
    {
      id: 'india-starter',
      name: '💰 Quick Cash Starter Bond',
      symbol: 'CASH',
      region: 'India',
      type: 'Beginner-Friendly',
      currentPrice: 10,
      minInvestment: 100,
      expectedReturns: '12-18%',
      maturityPeriod: '6 months',
      riskLevel: 'Safe & Secure',
      description: '🚀 Start with just $100! Double your money in 6 months with our safest investment. Perfect for beginners who want guaranteed returns!',
      color: '#2196F3'
    },
    {
      id: 'brazil-growth',
      name: '🌟 Wealth Builder Pro Bond',
      symbol: 'WEALTH',
      region: 'Brazil',
      type: 'Popular Choice',
      currentPrice: 205.8,
      minInvestment: 200,
      expectedReturns: '20-25%',
      maturityPeriod: '12 months',
      riskLevel: 'Medium Risk, High Reward',
      description: '💎 Turn $200 into $250+ in just 1 year! Our most popular choice for serious wealth building. Limited spots available!',
      color: '#FF9800'
    },
    {
      id: 'pilbara-premium',
      name: '🏆 Steady Income Champion',
      symbol: 'CHAMP',
      region: 'Australia',
      type: 'Safe & Steady',
      currentPrice: 315.6,
      minInvestment: 300,
      expectedReturns: '15-20%',
      maturityPeriod: '18 months',
      riskLevel: 'Ultra Safe',
      description: '🛡️ The safest way to grow $300 into $360+ with Australia\'s most trusted mining operations. Get paid every 3 months!',
      color: '#4CAF50'
    },
    {
      id: 'safrica-premium',
      name: '🔥 Million Maker Platinum',
      symbol: 'PLAT',
      region: 'South Africa',
      type: 'High Earner',
      currentPrice: 525.2,
      minInvestment: 500,
      expectedReturns: '30-40%',
      maturityPeriod: '24 months',
      riskLevel: 'Higher Risk, Maximum Reward',
      description: '🚀 The ULTIMATE wealth multiplier! Turn $500 into $700+ in 2 years. For serious investors who want life-changing returns!',
      color: '#9C27B0'
    }
  ];

  const handleBuyClick = (bond) => {
    setSelectedBond(bond);
    setInvestmentAmount(bond.currentPrice.toString());
    setShowDialog(true);
  };

  const handleConfirmPurchase = () => {
    if (selectedBond && investmentAmount && onInvest) {
      const quantity = Math.floor(parseFloat(investmentAmount) / selectedBond.currentPrice);
      onInvest({
        bond: selectedBond,
        amount: parseFloat(investmentAmount),
        quantity: quantity
      });
      setShowDialog(false);
      setInvestmentAmount('');
      setSelectedBond(null);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'High': return '#F44336';
      default: return '#757575';
    }
  };

  const canAfford = (bond) => {
    const amount = parseFloat(investmentAmount) || 0;
    return amount >= bond.minInvestment;
  };

  const getQuantity = (bond) => {
    const amount = parseFloat(investmentAmount) || 0;
    return Math.floor(amount / bond.currentPrice);
  };

  return (
    <div style={{ color: '#fff' }}>
      <h2 style={{ color: '#FFA500', marginBottom: '16px', fontWeight: 600 }}>
        {newInvestor ? 'Choose Your First Bond Investment' : 'Available Bonds'}
      </h2>
      
      {newInvestor && (
        <p style={{ color: '#e0e0e0', marginBottom: '24px' }}>
          Start your investment journey with our carefully selected iron ore bonds. 
          Each bond offers different risk-return profiles to match your investment goals.
        </p>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px',
        marginBottom: '24px'
      }}>
        {bonds.map((bond) => (
          <div key={bond.id} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${bond.color}30`,
            borderRadius: '8px',
            padding: '24px',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: bond.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold'
              }}>
                {bond.symbol.substring(0, 2)}
              </div>
              <div>
                <h3 style={{ 
                  color: bond.color, 
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 600
                }}>
                  {bond.name}
                </h3>
                <p style={{ color: '#bbb', margin: '4px 0 0 0', fontSize: '14px' }}>
                  {bond.symbol}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{
                background: `${bond.color}30`,
                color: bond.color,
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 500
              }}>
                {bond.region}
              </span>
              <span style={{
                background: `${bond.color}30`,
                color: bond.color,
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 500
              }}>
                {bond.type}
              </span>
              <span style={{
                background: `${getRiskColor(bond.riskLevel)}30`,
                color: getRiskColor(bond.riskLevel),
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 500
              }}>
                {bond.riskLevel}
              </span>
            </div>

            <p style={{ 
              color: '#e0e0e0', 
              marginBottom: '16px',
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              {bond.description}
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '8px', 
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              <div>
                <div style={{ color: '#bbb', fontSize: '12px' }}>Current Price</div>
                <div style={{ 
                  color: bond.color, 
                  fontWeight: 600,
                  fontSize: '14px'
                }}>
                  ${bond.currentPrice}
                </div>
              </div>
              <div>
                <div style={{ color: '#bbb', fontSize: '12px' }}>Min Investment</div>
                <div style={{ 
                  color: '#FFA500', 
                  fontWeight: 600,
                  fontSize: '14px'
                }}>
                  ${bond.minInvestment}
                </div>
              </div>
              <div>
                <div style={{ color: '#bbb', fontSize: '12px' }}>Expected Returns</div>
                <div style={{ 
                  color: '#4CAF50', 
                  fontWeight: 600,
                  fontSize: '14px'
                }}>
                  {bond.expectedReturns}
                </div>
              </div>
              <div>
                <div style={{ color: '#bbb', fontSize: '12px' }}>Maturity</div>
                <div style={{ 
                  color: '#2196F3', 
                  fontWeight: 600,
                  fontSize: '14px'
                }}>
                  {bond.maturityPeriod}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleBuyClick(bond)}
              style={{
                width: '100%',
                padding: '12px',
                background: `linear-gradient(135deg, ${bond.color} 0%, ${bond.color}CC 100%)`,
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Simple Dialog */}
      {showDialog && selectedBond && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%',
            color: '#fff'
          }}>
            <h3 style={{ color: '#FFA500', marginTop: 0 }}>
              Buy {selectedBond.name}
            </h3>
            <p style={{ color: '#e0e0e0', margin: '8px 0 16px 0' }}>
              Current Price: <strong>${selectedBond.currentPrice}</strong>
            </p>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#e0e0e0', marginBottom: '8px' }}>
                Investment Amount
              </label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '14px'
                }}
                placeholder="Enter amount"
              />
            </div>
            {investmentAmount && selectedBond && (
              <div style={{
                padding: '12px',
                background: 'rgba(255, 165, 0, 0.1)',
                borderRadius: '4px',
                marginBottom: '16px'
              }}>
                <p style={{ margin: 0, color: '#FFA500', fontSize: '14px' }}>
                  You can buy <strong>{getQuantity(selectedBond)}</strong> bond(s)
                  {!canAfford(selectedBond) && (
                    <span style={{ color: '#f44336' }}> - Insufficient amount</span>
                  )}
                </p>
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowDialog(false)}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  color: '#e0e0e0',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                disabled={!canAfford(selectedBond) || !investmentAmount}
                style={{
                  padding: '8px 16px',
                  background: selectedBond.color,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: canAfford(selectedBond) && investmentAmount ? 'pointer' : 'not-allowed',
                  opacity: canAfford(selectedBond) && investmentAmount ? 1 : 0.6
                }}
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BondSelection;