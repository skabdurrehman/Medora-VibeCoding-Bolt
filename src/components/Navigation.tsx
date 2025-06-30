import React from 'react';
import { Home, Guitar as Hospital, Heart, FileText, Bell, User, Stethoscope, Crown, Settings } from 'lucide-react';
import { Screen } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

// Single Patient ID for the entire app
const PATIENT_ID = Math.floor(Math.random() * 9000000) + 1000000; // 7 digits

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate
}) => {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'hospitals' as Screen, icon: Hospital, label: 'Hospitals' },
    { id: 'donations' as Screen, icon: Heart, label: 'Donations' },
    { id: 'vault' as Screen, icon: FileText, label: 'Vault' },
    { id: 'mentor' as Screen, icon: Crown, label: 'Human Mentor', premium: true },
  ];

  const bottomItems = [
    { id: 'notifications' as Screen, icon: Bell, label: 'Notifications', hasNotification: true },
    { id: 'settings' as Screen, icon: Settings, label: 'Settings' },
    { id: 'profile' as Screen, icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
        <div className="bg-premium-bg-primary/95 backdrop-blur-xl border-t border-premium-accent-gold/15 px-3 py-2">
          <div className="flex justify-around items-center">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center gap-1 py-2 px-2 rounded-lg transition-all duration-300 relative ${
                    isActive 
                      ? 'bg-premium-gradient-primary text-white shadow-md border border-premium-accent-gold/20' 
                      : 'text-premium-text-secondary hover:text-premium-text-primary'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => onNavigate('profile')}
              className={`flex flex-col items-center gap-1 py-2 px-2 rounded-lg transition-all duration-300 relative ${
                currentScreen === 'profile' 
                  ? 'bg-premium-gradient-primary text-white shadow-md border border-premium-accent-gold/20' 
                  : 'text-premium-text-secondary hover:text-premium-text-primary'
              }`}
            >
              <User size={16} />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - INCREASED WIDTH */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-72 z-50">
        <div className="h-full bg-premium-bg-primary/95 backdrop-blur-xl border-r border-premium-accent-gold/15 shadow-lg overflow-y-auto scrollbar-thin">
          <div className="p-4 space-y-5">
            
            {/* Brand Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-premium-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                <Stethoscope size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">Medora</h1>
                <p className="text-xs text-premium-text-secondary">Health beyond borders</p>
              </div>
            </div>
            
            {/* Profile Section */}
            <div className="bg-premium-bg-secondary/60 backdrop-blur-sm rounded-xl p-4 border border-premium-accent-gold/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-premium-gradient-secondary rounded-lg flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-premium-text-primary text-sm">Welcome back</h3>
                  <p className="text-xs text-premium-text-secondary">Patient ID: #{PATIENT_ID}</p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <div>
              <h4 className="text-xs font-medium text-premium-text-muted uppercase tracking-wide mb-3 px-2">Navigation</h4>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 text-sm relative ${
                        isActive 
                          ? 'bg-premium-gradient-primary text-white shadow-md border border-premium-accent-gold/20' 
                          : 'text-premium-text-secondary hover:text-premium-text-primary hover:bg-premium-bg-secondary/30'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.label}</span>
                      {item.premium && (
                        <div className="ml-auto">
                          <span className="px-2 py-0.5 bg-premium-gradient-gold text-white text-xs font-bold rounded-full">PRO</span>
                        </div>
                      )}
                      {isActive && !item.premium && (
                        <div className="ml-auto w-1.5 h-1.5 bg-premium-accent-gold rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Items */}
            <div>
              <h4 className="text-xs font-medium text-premium-text-muted uppercase tracking-wide mb-3 px-2">Account</h4>
              <div className="space-y-1">
                {bottomItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 text-sm relative ${
                        isActive 
                          ? 'bg-premium-gradient-primary text-white shadow-md border border-premium-accent-gold/20' 
                          : 'text-premium-text-secondary hover:text-premium-text-primary hover:bg-premium-bg-secondary/30'
                      }`}
                    >
                      <div className="relative">
                        <Icon size={18} />
                        {item.hasNotification && (
                          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-premium-accent-coral rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 bg-premium-accent-gold rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra spacing for scroll */}
            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </>
  );
};