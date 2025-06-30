import React, { useEffect, useState } from 'react';
import { Globe, Heart, Guitar as Hospital, FileText, MapPin, Sparkles, Stethoscope, Activity, Zap } from 'lucide-react';
import { Screen } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [earthRotation, setEarthRotation] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [centerPulse, setCenterPulse] = useState(0);

  useEffect(() => {
    const earthInterval = setInterval(() => {
      setEarthRotation(prev => (prev + 0.2) % 360);
    }, 100);

    const pulseInterval = setInterval(() => {
      setPulseIntensity(prev => (prev + 0.05) % (Math.PI * 2));
    }, 80);

    const orbitInterval = setInterval(() => {
      setOrbitAngle(prev => (prev + 0.15) % 360);
    }, 150);

    const centerInterval = setInterval(() => {
      setCenterPulse(prev => (prev + 0.08) % (Math.PI * 2));
    }, 120);

    return () => {
      clearInterval(earthInterval);
      clearInterval(pulseInterval);
      clearInterval(orbitInterval);
      clearInterval(centerInterval);
    };
  }, []);

  const glowIntensity = Math.sin(pulseIntensity) * 0.2 + 0.8;
  const orbitRadius = 180;
  const orbitX = Math.cos(orbitAngle * Math.PI / 180) * orbitRadius;
  const orbitY = Math.sin(orbitAngle * Math.PI / 180) * orbitRadius * 0.3;
  const centerScale = 1 + Math.sin(centerPulse) * 0.15;
  const centerOpacity = 0.7 + Math.sin(centerPulse) * 0.3;

  return (
    <div className="min-h-screen bg-premium-gradient-dark flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* Premium ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-premium-accent-orange/8 via-premium-accent-coral/4 to-premium-accent-gold/6 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-premium-bg-secondary/30 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-gradient-radial from-premium-accent-orange/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-radial from-premium-accent-coral/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Premium Header */}
      <div className="text-center mb-12 animate-fade-in relative z-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight bg-premium-gradient-text-primary bg-clip-text text-transparent">
          Welcome to Medora
        </h1>
        <p className="text-xl md:text-2xl font-bold mb-6 bg-premium-gradient-text-secondary bg-clip-text text-transparent">
          Health beyond borders
        </p>
        <p className="text-lg text-premium-text-secondary max-w-2xl mx-auto leading-relaxed opacity-90">
          Connecting patients, donors, and healthcare providers across the globe through intelligent matching and secure health management.
        </p>
      </div>

      {/* Enhanced Premium 3D Earth with Animated Center */}
      <div className="relative mb-16 group">
        <div 
          className="w-64 h-64 md:w-80 md:h-80 rounded-full relative overflow-hidden transform transition-all duration-700 group-hover:scale-110 shadow-2xl border-2 border-premium-accent-gold/30"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255, 107, 53, 0.6) 0%, transparent 50%),
              radial-gradient(circle at 70% 40%, rgba(255, 140, 66, 0.5) 0%, transparent 50%),
              radial-gradient(circle at 50% 70%, rgba(255, 167, 38, 0.4) 0%, transparent 50%),
              conic-gradient(from ${earthRotation}deg, #ff6b35, #ff8c42, #ffa726, #ff6b35, #ff8c42, #ffa726)
            `,
            boxShadow: `
              0 30px 80px rgba(255, 107, 53, ${glowIntensity * 0.2}),
              0 15px 40px rgba(255, 167, 38, ${glowIntensity * 0.15}),
              0 8px 25px rgba(0, 0, 0, 0.3),
              inset 0 0 60px rgba(255, 243, 224, 0.08),
              inset -20px -20px 60px rgba(0, 0, 0, 0.2)
            `
          }}
        >
          {/* Premium atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-br from-premium-accent-gold/10 via-transparent to-premium-accent-orange/8 rounded-full"></div>
          
          {/* ANIMATED CENTER CORE - The main feature! */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="relative"
              style={{
                transform: `scale(${centerScale}) rotate(${earthRotation * 2}deg)`,
                opacity: centerOpacity
              }}
            >
              {/* Central Health Symbol */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-premium-gradient-primary rounded-full flex items-center justify-center shadow-2xl border-2 border-premium-accent-cream/30">
                <Stethoscope size={24} className="text-white" />
              </div>
              
              {/* Rotating Health Icons around center */}
              {[
                { icon: <Heart size={12} />, angle: 0, radius: 35 },
                { icon: <Activity size={12} />, angle: 90, radius: 35 },
                { icon: <Zap size={12} />, angle: 180, radius: 35 },
                { icon: <Globe size={12} />, angle: 270, radius: 35 }
              ].map((item, index) => {
                const rotatedAngle = (item.angle + earthRotation * 3) * Math.PI / 180;
                const x = Math.cos(rotatedAngle) * item.radius;
                const y = Math.sin(rotatedAngle) * item.radius;
                
                return (
                  <div
                    key={index}
                    className="absolute w-6 h-6 bg-premium-gradient-gold rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      left: `calc(50% + ${x}px - 12px)`,
                      top: `calc(50% + ${y}px - 12px)`,
                      transform: `rotate(${-earthRotation * 3}deg)`,
                      boxShadow: `0 0 8px rgba(255, 167, 38, ${centerOpacity * 0.8})`
                    }}
                  >
                    {item.icon}
                  </div>
                );
              })}
              
              {/* Pulsing energy rings */}
              <div 
                className="absolute inset-0 border-2 border-premium-accent-cream/20 rounded-full animate-ping"
                style={{ transform: `scale(${1.5 + Math.sin(centerPulse * 1.5) * 0.3})` }}
              />
              <div 
                className="absolute inset-0 border border-premium-accent-gold/30 rounded-full animate-ping"
                style={{ 
                  transform: `scale(${2 + Math.sin(centerPulse * 2) * 0.4})`,
                  animationDelay: '0.5s'
                }}
              />
            </div>
          </div>
          
          {/* Refined continental masses */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-16 h-12 bg-premium-accent-sage rounded-full blur-sm transform rotate-12 shadow-lg"></div>
            <div className="absolute top-1/3 right-1/4 w-20 h-10 bg-premium-accent-slate rounded-full blur-sm transform -rotate-6 shadow-lg"></div>
            <div className="absolute bottom-1/3 left-1/3 w-14 h-16 bg-premium-accent-coral rounded-full blur-sm transform rotate-45 shadow-lg"></div>
            <div className="absolute bottom-1/4 right-1/3 w-16 h-12 bg-premium-accent-gold rounded-full blur-sm transform -rotate-12 shadow-lg"></div>
          </div>

          {/* Premium location pulses */}
          {[...Array(10)].map((_, i) => {
            const angle = (i * 36 + earthRotation * 0.5) * Math.PI / 180;
            const radius = 120 + Math.sin(i * 0.8) * 20;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.6;
            const size = 2.5 + Math.sin(pulseIntensity + i * 0.4) * 1;
            
            return (
              <div
                key={i}
                className="absolute bg-premium-gradient-primary rounded-full shadow-xl"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  boxShadow: `
                    0 0 ${size * 2}px rgba(255, 107, 53, ${glowIntensity * 0.6}),
                    0 0 ${size}px rgba(255, 140, 66, ${glowIntensity * 0.4})
                  `,
                  transform: `scale(${0.8 + Math.sin(pulseIntensity + i * 0.2) * 0.2})`
                }}
              >
                <div className="absolute inset-0 bg-premium-accent-cream/40 rounded-full animate-ping"></div>
              </div>
            );
          })}

          {/* Premium orbiting satellite */}
          <div
            className="absolute w-3 h-3 bg-premium-gradient-gold rounded-full shadow-xl"
            style={{
              left: `calc(50% + ${orbitX}px)`,
              top: `calc(50% + ${orbitY}px)`,
              boxShadow: '0 0 12px rgba(255, 167, 38, 0.6)'
            }}
          >
            <div className="absolute inset-0 bg-premium-accent-cream/60 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Premium orbital rings */}
        <div className="absolute inset-0 animate-spin-slow pointer-events-none">
          <div className="w-full h-full border border-premium-accent-gold/30 rounded-full shadow-lg"></div>
        </div>
        <div className="absolute inset-6 animate-spin-reverse pointer-events-none">
          <div className="w-full h-full border border-premium-accent-orange/20 rounded-full shadow-lg"></div>
        </div>
      </div>

      {/* Ultra Premium Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl relative z-10">
        <UltraPremiumCard
          icon={<Hospital size={28} />}
          title="Find a Hospital"
          subtitle="Global medical care network"
          description="Connect with top-rated hospitals and specialists worldwide"
          onClick={() => onNavigate('hospitals')}
          gradient="from-premium-accent-sage via-premium-accent-slate to-premium-accent-sage"
          shadowColor="rgba(139, 195, 74, 0.2)"
        />
        <UltraPremiumCard
          icon={<Heart size={28} />}
          title="Request/Donate Blood"
          subtitle="Save lives today"
          description="Join our life-saving donation network and help patients in need"
          onClick={() => onNavigate('donations')}
          gradient="from-premium-accent-coral via-premium-accent-orange to-premium-accent-coral"
          shadowColor="rgba(255, 140, 66, 0.2)"
        />
        <UltraPremiumCard
          icon={<FileText size={28} />}
          title="My Health Vault"
          subtitle="Secure medical records"
          description="Your complete health data, protected and accessible anywhere"
          onClick={() => onNavigate('vault')}
          gradient="from-premium-accent-orange via-premium-accent-gold to-premium-accent-orange"
          shadowColor="rgba(255, 107, 53, 0.2)"
        />
      </div>
    </div>
  );
};

interface UltraPremiumCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  onClick: () => void;
  gradient: string;
  shadowColor: string;
}

const UltraPremiumCard: React.FC<UltraPremiumCardProps> = ({ 
  icon, 
  title, 
  subtitle, 
  description, 
  onClick, 
  gradient,
  shadowColor
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-8 rounded-2xl bg-gradient-to-br ${gradient} text-white transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-premium-accent-gold/20 shadow-xl hover:shadow-2xl`}
      style={{
        boxShadow: isHovered 
          ? `0 25px 60px ${shadowColor}, 0 15px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 243, 224, 0.2)` 
          : `0 15px 35px ${shadowColor}, 0 8px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 243, 224, 0.1)`
      }}
    >
      {/* Ultra premium glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-premium-accent-cream/10 via-premium-accent-gold/5 to-transparent backdrop-blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-500">
          <div className="p-4 bg-premium-accent-cream/15 backdrop-blur-xl rounded-xl border border-premium-accent-gold/30 shadow-xl">
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-black mb-2 tracking-tight bg-premium-gradient-text-accent bg-clip-text text-transparent">{title}</h3>
        <p className="text-lg opacity-95 mb-3 font-bold text-premium-accent-cream">{subtitle}</p>
        <p className="text-sm opacity-85 leading-relaxed text-premium-text-secondary">{description}</p>
      </div>
      
      {/* Premium shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-premium-accent-gold/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
      
      {/* Luxury accent borders */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-premium-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-premium-accent-cream/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl"></div>
    </button>
  );
};