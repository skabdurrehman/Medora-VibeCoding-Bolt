import React, { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { HospitalFinder } from './components/HospitalFinder';
import { DonationHub } from './components/DonationHub';
import { HealthVault } from './components/HealthVault';
import { HumanMentor } from './components/HumanMentor';
import { NotificationsPage } from './components/NotificationsPage';
import { SettingsPage } from './components/SettingsPage';
import { ProfilePage } from './components/ProfilePage';
import { Navigation } from './components/Navigation';
import { BoltBadge } from './components/BoltBadge';
import { EmergencyButton } from './components/EmergencyButton';
import { initializeRevenueCat } from './utils/revenueCat';

export type Screen = 'home' | 'hospitals' | 'donations' | 'vault' | 'mentor' | 'notifications' | 'settings' | 'profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize RevenueCat on app start
  useEffect(() => {
    initializeRevenueCat();
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'hospitals':
        return <HospitalFinder onNavigate={setCurrentScreen} />;
      case 'donations':
        return <DonationHub onNavigate={setCurrentScreen} />;
      case 'vault':
        return <HealthVault onNavigate={setCurrentScreen} />;
      case 'mentor':
        return <HumanMentor onNavigate={setCurrentScreen} />;
      case 'notifications':
        return <NotificationsPage onNavigate={setCurrentScreen} />;
      case 'settings':
        return <SettingsPage onNavigate={setCurrentScreen} />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-premium-gradient-dark transition-all duration-500">
      <div className="relative">
        <Navigation 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        
        <div className="md:ml-72">
          {renderScreen()}
        </div>
        
        <EmergencyButton />
        <BoltBadge />
      </div>
    </div>
  );
}

export default App;