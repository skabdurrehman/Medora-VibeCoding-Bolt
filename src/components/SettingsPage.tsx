import React, { useState } from 'react';
import { ArrowLeft, Shield, Bell, Heart, MapPin, Clock, Globe, Smartphone, Lock, Eye, EyeOff, Save, AlertTriangle, CheckCircle } from 'lucide-react';
import { Screen } from '../App';

interface SettingsPageProps {
  onNavigate: (screen: Screen) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Health-specific settings state
  const [settings, setSettings] = useState({
    // Emergency & Safety
    emergencyContacts: true,
    locationSharing: true,
    autoEmergencyCall: false,
    
    // Health Notifications
    donationAlerts: true,
    appointmentReminders: true,
    medicationReminders: true,
    labResultNotifications: true,
    healthTipsDaily: false,
    
    // Privacy & Data
    shareHealthData: false,
    anonymousMatching: true,
    dataRetention: '5years',
    
    // Communication
    language: 'english',
    timeZone: 'auto',
    communicationMethod: 'both',
    
    // Medical Preferences
    bloodDonationEligible: true,
    organDonationConsent: false,
    allergies: '',
    chronicConditions: '',
    
    // App Behavior
    biometricLogin: false,
    autoLogout: '30min',
    offlineMode: true
  });

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-premium-gradient-dark px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-premium-text-secondary hover:text-premium-text-primary transition-colors bg-premium-bg-secondary/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-premium-accent-gold/20"
        >
          <ArrowLeft size={16} />
          <span className="font-medium text-sm">Back to Home</span>
        </button>
        <h1 className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">Health Settings</h1>
        <div className="flex items-center gap-2 bg-premium-accent-sage/10 px-3 py-2 rounded-lg border border-premium-accent-sage/20 mr-16">
          <Shield size={16} className="text-premium-accent-sage" />
          <span className="font-medium text-premium-accent-sage text-sm">Secure</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Emergency & Safety Settings */}
        <SettingsSection
          title="Emergency & Safety"
          description="Configure emergency response and safety features"
          icon={<AlertTriangle size={24} className="text-premium-accent-coral" />}
        >
          <ToggleSetting
            label="Emergency Contact Alerts"
            description="Automatically notify emergency contacts during health emergencies"
            checked={settings.emergencyContacts}
            onChange={(checked) => updateSetting('emergencyContacts', checked)}
          />
          <ToggleSetting
            label="Location Sharing"
            description="Share your location with emergency services and hospitals"
            checked={settings.locationSharing}
            onChange={(checked) => updateSetting('locationSharing', checked)}
          />
          <ToggleSetting
            label="Auto Emergency Call"
            description="Automatically call emergency services if critical health metrics detected"
            checked={settings.autoEmergencyCall}
            onChange={(checked) => updateSetting('autoEmergencyCall', checked)}
          />
        </SettingsSection>

        {/* Health Notifications */}
        <SettingsSection
          title="Health Notifications"
          description="Manage health-related alerts and reminders"
          icon={<Bell size={24} className="text-premium-accent-orange" />}
        >
          <ToggleSetting
            label="Blood Donation Alerts"
            description="Get notified when someone nearby needs your blood type"
            checked={settings.donationAlerts}
            onChange={(checked) => updateSetting('donationAlerts', checked)}
          />
          <ToggleSetting
            label="Appointment Reminders"
            description="Receive reminders for upcoming medical appointments"
            checked={settings.appointmentReminders}
            onChange={(checked) => updateSetting('appointmentReminders', checked)}
          />
          <ToggleSetting
            label="Medication Reminders"
            description="Get alerts for medication schedules and refills"
            checked={settings.medicationReminders}
            onChange={(checked) => updateSetting('medicationReminders', checked)}
          />
          <ToggleSetting
            label="Lab Result Notifications"
            description="Be notified when lab results are available"
            checked={settings.labResultNotifications}
            onChange={(checked) => updateSetting('labResultNotifications', checked)}
          />
          <ToggleSetting
            label="Daily Health Tips"
            description="Receive personalized health tips and wellness advice"
            checked={settings.healthTipsDaily}
            onChange={(checked) => updateSetting('healthTipsDaily', checked)}
          />
        </SettingsSection>

        {/* Medical Preferences */}
        <SettingsSection
          title="Medical Preferences"
          description="Set your medical information and donation preferences"
          icon={<Heart size={24} className="text-premium-accent-coral" />}
        >
          <ToggleSetting
            label="Blood Donation Eligible"
            description="Include me in blood donation matching system"
            checked={settings.bloodDonationEligible}
            onChange={(checked) => updateSetting('bloodDonationEligible', checked)}
          />
          <ToggleSetting
            label="Organ Donation Consent"
            description="I consent to organ donation (legal documentation required)"
            checked={settings.organDonationConsent}
            onChange={(checked) => updateSetting('organDonationConsent', checked)}
          />
          <TextSetting
            label="Known Allergies"
            description="List any known allergies for emergency reference"
            value={settings.allergies}
            onChange={(value) => updateSetting('allergies', value)}
            placeholder="e.g., Penicillin, Peanuts, Latex"
          />
          <TextSetting
            label="Chronic Conditions"
            description="List any chronic medical conditions"
            value={settings.chronicConditions}
            onChange={(value) => updateSetting('chronicConditions', value)}
            placeholder="e.g., Diabetes, Hypertension, Asthma"
          />
        </SettingsSection>

        {/* Privacy & Data Security */}
        <SettingsSection
          title="Privacy & Data Security"
          description="Control how your health data is used and shared"
          icon={<Lock size={24} className="text-premium-accent-sage" />}
        >
          <ToggleSetting
            label="Share Health Data for Research"
            description="Allow anonymized health data to be used for medical research"
            checked={settings.shareHealthData}
            onChange={(checked) => updateSetting('shareHealthData', checked)}
          />
          <ToggleSetting
            label="Anonymous Matching"
            description="Keep your identity private during donation matching"
            checked={settings.anonymousMatching}
            onChange={(checked) => updateSetting('anonymousMatching', checked)}
          />
          <SelectSetting
            label="Data Retention Period"
            description="How long to keep your health records"
            value={settings.dataRetention}
            onChange={(value) => updateSetting('dataRetention', value)}
            options={[
              { value: '1year', label: '1 Year' },
              { value: '5years', label: '5 Years' },
              { value: '10years', label: '10 Years' },
              { value: 'lifetime', label: 'Lifetime' }
            ]}
          />
          <ToggleSetting
            label="Biometric Login"
            description="Use fingerprint or face recognition to access app"
            checked={settings.biometricLogin}
            onChange={(checked) => updateSetting('biometricLogin', checked)}
          />
          <SelectSetting
            label="Auto Logout"
            description="Automatically log out after inactivity"
            value={settings.autoLogout}
            onChange={(value) => updateSetting('autoLogout', value)}
            options={[
              { value: '5min', label: '5 Minutes' },
              { value: '15min', label: '15 Minutes' },
              { value: '30min', label: '30 Minutes' },
              { value: '1hour', label: '1 Hour' },
              { value: 'never', label: 'Never' }
            ]}
          />
        </SettingsSection>

        {/* Communication Preferences */}
        <SettingsSection
          title="Communication Preferences"
          description="Set language and communication preferences"
          icon={<Globe size={24} className="text-premium-accent-gold" />}
        >
          <SelectSetting
            label="Language"
            description="Choose your preferred language"
            value={settings.language}
            onChange={(value) => updateSetting('language', value)}
            options={[
              { value: 'english', label: 'English' },
              { value: 'spanish', label: 'Español' },
              { value: 'french', label: 'Français' },
              { value: 'german', label: 'Deutsch' },
              { value: 'hindi', label: 'हिंदी' },
              { value: 'mandarin', label: '中文' }
            ]}
          />
          <SelectSetting
            label="Communication Method"
            description="How you prefer to receive important health communications"
            value={settings.communicationMethod}
            onChange={(value) => updateSetting('communicationMethod', value)}
            options={[
              { value: 'app', label: 'App Notifications Only' },
              { value: 'sms', label: 'SMS Only' },
              { value: 'email', label: 'Email Only' },
              { value: 'both', label: 'App + SMS' },
              { value: 'all', label: 'All Methods' }
            ]}
          />
          <ToggleSetting
            label="Offline Mode"
            description="Allow app to work without internet for emergency access"
            checked={settings.offlineMode}
            onChange={(checked) => updateSetting('offlineMode', checked)}
          />
        </SettingsSection>

        {/* Save Button */}
        <div className="flex gap-4 pt-8">
          <button
            onClick={handleSave}
            className="flex-1 bg-premium-gradient-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Save size={20} />
            Save All Settings
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-4 bg-premium-bg-secondary/60 text-premium-text-primary rounded-xl font-medium hover:bg-premium-bg-secondary/80 transition-colors border border-premium-accent-gold/20"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {saveSuccess && (
        <div className="fixed inset-0 bg-premium-bg-primary/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-premium-bg-secondary/90 backdrop-blur-xl rounded-2xl p-8 text-center border border-premium-accent-sage/30 shadow-2xl">
            <CheckCircle size={64} className="text-premium-accent-sage mx-auto mb-4" />
            <h3 className="text-2xl font-bold bg-premium-gradient-text-secondary bg-clip-text text-transparent mb-2">Settings Saved!</h3>
            <p className="text-premium-text-secondary">Your health settings have been updated successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, icon, children }) => (
  <div className="bg-premium-bg-secondary/60 backdrop-blur-sm rounded-xl p-6 border border-premium-accent-gold/15">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-premium-gradient-primary rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">{title}</h2>
        <p className="text-premium-text-secondary text-sm">{description}</p>
      </div>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

interface ToggleSettingProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSetting: React.FC<ToggleSettingProps> = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 bg-premium-bg-primary/40 rounded-lg border border-premium-accent-gold/10">
    <div className="flex-1">
      <h3 className="font-medium text-premium-text-primary">{label}</h3>
      <p className="text-sm text-premium-text-secondary">{description}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
        checked ? 'bg-premium-gradient-primary' : 'bg-premium-bg-secondary'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
          checked ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

interface SelectSettingProps {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const SelectSetting: React.FC<SelectSettingProps> = ({ label, description, value, onChange, options }) => (
  <div className="p-4 bg-premium-bg-primary/40 rounded-lg border border-premium-accent-gold/10">
    <div className="mb-3">
      <h3 className="font-medium text-premium-text-primary">{label}</h3>
      <p className="text-sm text-premium-text-secondary">{description}</p>
    </div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 bg-premium-bg-secondary/60 border border-premium-accent-gold/20 rounded-lg text-premium-text-primary focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-premium-bg-secondary text-premium-text-primary">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

interface TextSettingProps {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const TextSetting: React.FC<TextSettingProps> = ({ label, description, value, onChange, placeholder }) => (
  <div className="p-4 bg-premium-bg-primary/40 rounded-lg border border-premium-accent-gold/10">
    <div className="mb-3">
      <h3 className="font-medium text-premium-text-primary">{label}</h3>
      <p className="text-sm text-premium-text-secondary">{description}</p>
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 bg-premium-bg-secondary/60 border border-premium-accent-gold/20 rounded-lg text-premium-text-primary placeholder-premium-text-secondary focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20"
    />
  </div>
);