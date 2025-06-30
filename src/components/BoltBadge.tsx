import React, { useState, useEffect } from 'react';
import { Zap, Sparkles } from 'lucide-react';

export const BoltBadge: React.FC = () => {
  const [shimmer, setShimmer] = useState(0);

  useEffect(() => {
    const shimmerInterval = setInterval(() => {
      setShimmer(prev => (prev + 1) % 100);
    }, 50);

    return () => {
      clearInterval(shimmerInterval);
    };
  }, []);

  const handleClick = () => {
    window.open('https://bolt.new', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group">
        <button 
          onClick={handleClick}
          className="relative bg-premium-bg-primary/80 backdrop-blur-xl border border-premium-accent-gold/30 rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
        >
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="p-2 bg-premium-gradient-primary rounded-lg shadow-md">
                <Zap size={16} className="text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">Built on Bolt</span>
                <Sparkles size={10} className="text-premium-accent-gold" />
              </div>
              <span className="text-xs text-premium-text-secondary font-medium">Powered by AI</span>
            </div>
          </div>
          
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-premium-accent-gold/15 to-transparent rounded-2xl"
            style={{
              transform: `translateX(${-100 + (shimmer * 2)}%)`,
              transition: shimmer === 0 ? 'none' : 'transform 0.05s linear'
            }}
          />
        </button>
      </div>
    </div>
  );
};