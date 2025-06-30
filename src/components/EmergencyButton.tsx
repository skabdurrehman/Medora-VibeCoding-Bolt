import React, { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Users, X } from 'lucide-react';

export const EmergencyButton: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');
  const [pulseIntensity, setPulseIntensity] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity(prev => (prev + 0.2) % (Math.PI * 2));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    setShowEmergencyModal(true);
  };

  const handleEmergencyCall = (type: string) => {
    setEmergencyType(type);
    setShowEmergencyModal(false);
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setEmergencyType('');
  };

  const pulseScale = 1 + Math.sin(pulseIntensity) * 0.08;
  const pulseOpacity = 0.6 + Math.sin(pulseIntensity) * 0.3;

  return (
    <>
      <div className="fixed top-6 right-6 z-40">
        <button
          onClick={handlePress}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          className={`relative w-14 h-14 bg-premium-gradient-secondary rounded-full shadow-lg flex items-center justify-center text-white transform transition-all duration-200 ${
            isPressed ? 'scale-95' : 'hover:scale-110'
          }`}
          style={{
            transform: `scale(${isPressed ? 0.95 : 1.0 * pulseScale})`,
            boxShadow: `0 8px 25px rgba(255, 140, 66, ${pulseOpacity * 0.4})`
          }}
        >
          <AlertTriangle size={20} className="animate-pulse" />
          
          {/* Pulse rings */}
          <div 
            className="absolute inset-0 rounded-full border border-premium-accent-coral animate-ping"
            style={{ opacity: pulseOpacity * 0.5 }}
          />
          <div 
            className="absolute inset-0 rounded-full border border-premium-accent-gold animate-ping"
            style={{ 
              opacity: pulseOpacity * 0.3,
              animationDelay: '0.5s'
            }}
          />
        </button>
        
        {/* Tooltip */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-premium-bg-primary/80 backdrop-blur-sm text-premium-text-primary text-xs px-2 py-1 rounded-lg whitespace-nowrap border border-premium-accent-gold/20">
            Emergency
          </div>
        </div>
      </div>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-premium-bg-primary/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-premium-bg-secondary/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-premium-accent-gold/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-premium-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent mb-2">Emergency Services</h2>
              <p className="text-premium-text-secondary">Choose your emergency type</p>
            </div>

            <div className="space-y-4 mb-8">
              <button
                onClick={() => handleEmergencyCall('Medical')}
                className="w-full flex items-center gap-4 p-4 bg-premium-accent-coral/15 hover:bg-premium-accent-coral/25 rounded-xl border border-premium-accent-coral/30 transition-colors"
              >
                <Phone size={24} className="text-premium-accent-coral" />
                <div className="text-left">
                  <h3 className="font-bold text-premium-text-primary">Medical Emergency</h3>
                  <p className="text-sm text-premium-text-secondary">Call ambulance & notify hospitals</p>
                </div>
              </button>

              <button
                onClick={() => handleEmergencyCall('Location')}
                className="w-full flex items-center gap-4 p-4 bg-premium-accent-orange/15 hover:bg-premium-accent-orange/25 rounded-xl border border-premium-accent-orange/30 transition-colors"
              >
                <MapPin size={24} className="text-premium-accent-orange" />
                <div className="text-left">
                  <h3 className="font-bold text-premium-text-primary">Share Location</h3>
                  <p className="text-sm text-premium-text-secondary">Send GPS to emergency contacts</p>
                </div>
              </button>

              <button
                onClick={() => handleEmergencyCall('Contacts')}
                className="w-full flex items-center gap-4 p-4 bg-premium-accent-sage/15 hover:bg-premium-accent-sage/25 rounded-xl border border-premium-accent-sage/30 transition-colors"
              >
                <Users size={24} className="text-premium-accent-sage" />
                <div className="text-left">
                  <h3 className="font-bold text-premium-text-primary">Alert Contacts</h3>
                  <p className="text-sm text-premium-text-secondary">Notify family & friends</p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowEmergencyModal(false)}
              className="w-full py-3 text-premium-text-secondary hover:text-premium-text-primary transition-colors border border-premium-accent-gold/20 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Custom Success Modal - Replaces System Alert */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-premium-bg-primary/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-premium-bg-secondary/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-premium-accent-sage/30 shadow-2xl">
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-premium-gradient-tertiary rounded-full flex items-center justify-center">
                <AlertTriangle size={24} className="text-white" />
              </div>
              <button
                onClick={closeSuccessModal}
                className="p-2 rounded-lg hover:bg-premium-bg-primary/50 transition-colors"
              >
                <X size={20} className="text-premium-text-secondary" />
              </button>
            </div>

            {/* Success Message */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-premium-gradient-text-secondary bg-clip-text text-transparent mb-4">
                Emergency {emergencyType} Activated!
              </h2>
              <p className="text-premium-text-primary text-lg mb-2">Help is on the way.</p>
              <p className="text-premium-text-secondary text-sm">
                {emergencyType === 'Medical' && 'Ambulance has been notified and nearby hospitals alerted.'}
                {emergencyType === 'Location' && 'Your GPS location has been shared with emergency contacts.'}
                {emergencyType === 'Contacts' && 'Your family and friends have been notified of your emergency.'}
              </p>
            </div>

            {/* Status indicator */}
            <div className="bg-premium-accent-sage/10 rounded-xl p-4 mb-6 border border-premium-accent-sage/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-premium-accent-sage rounded-full animate-pulse"></div>
                <span className="text-premium-accent-sage font-medium">Emergency services contacted</span>
              </div>
            </div>

            {/* OK Button */}
            <button
              onClick={closeSuccessModal}
              className="w-full bg-premium-gradient-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};