import React, { useState } from 'react';
import { ArrowLeft, User, Edit3, Save, Camera, Shield, Heart, MapPin, Calendar, Phone, Mail, AlertTriangle, CheckCircle, Crown, Award } from 'lucide-react';
import { Screen } from '../App';

interface ProfilePageProps {
  onNavigate: (screen: Screen) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [profile, setProfile] = useState({
    // Basic Information - Your details from Delhi
    firstName: 'SK ABDUR',
    lastName: 'REHMAN',
    dateOfBirth: 'Hidden', // Hidden for privacy
    gender: 'male',
    phone: 'Hidden',
    email: 'skrehman1950@gmail.com',
    
    // Medical Information
    bloodType: 'B+',
    height: '169',
    weight: '65',
    allergies: 'None',
    chronicConditions: 'None',
    emergencyContact: 'Hidden',
    
    // Location & Preferences
    country: 'India',
    city: 'Delhi',
    preferredLanguage: 'English',
    
    // Health Goals & Status
    donorStatus: 'active',
    lastDonation: '2024-01-10',
    totalDonations: 5,
    livesImpacted: 15,
    
    // Premium Status
    isPremium: false,
    memberSince: '2023-08-15'
  });

  const handleSave = () => {
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const updateProfile = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const calculateAge = (birthDate: string) => {
    if (birthDate === 'Hidden') return 17; // Your actual age
    
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
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
        <h1 className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">Health Profile</h1>
        <div className="flex items-center gap-2 mr-16">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-premium-gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-premium-gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-premium-bg-secondary/60 text-premium-text-primary rounded-lg font-medium hover:bg-premium-bg-secondary/80 transition-colors border border-premium-accent-gold/20"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Header Card */}
        <div className="bg-premium-bg-secondary/60 backdrop-blur-sm rounded-xl p-8 border border-premium-accent-gold/15">
          <div className="flex items-center gap-6 mb-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 bg-premium-gradient-primary rounded-full flex items-center justify-center border-4 border-premium-accent-gold/30">
                <User size={48} className="text-white" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-premium-accent-gold rounded-full flex items-center justify-center text-white hover:bg-premium-accent-cream transition-colors">
                  <Camera size={16} />
                </button>
              )}
            </div>
            
            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">
                  {profile.firstName} {profile.lastName}
                </h2>
                {profile.isPremium && (
                  <div className="flex items-center gap-1 bg-premium-gradient-gold text-white px-3 py-1 rounded-full text-sm font-bold">
                    <Crown size={14} />
                    Premium
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-premium-text-secondary mb-3">
                <span>{calculateAge(profile.dateOfBirth)} years old</span>
                <span>•</span>
                <span>{profile.bloodType} Blood Type</span>
                <span>•</span>
                <span>{profile.city}, {profile.country}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={14} className="text-premium-accent-sage" />
                <span className="text-premium-text-secondary">Member since {new Date(profile.memberSince).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Health Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={<Heart size={20} className="text-premium-accent-coral" />}
              label="Total Donations"
              value={profile.totalDonations.toString()}
              subtitle="Blood donations"
            />
            <StatCard
              icon={<Award size={20} className="text-premium-accent-gold" />}
              label="Lives Impacted"
              value={profile.livesImpacted.toString()}
              subtitle="People helped"
            />
            <StatCard
              icon={<Shield size={20} className="text-premium-accent-sage" />}
              label="Donor Status"
              value={profile.donorStatus === 'active' ? 'Active' : 'Inactive'}
              subtitle={`Last: ${new Date(profile.lastDonation).toLocaleDateString()}`}
            />
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-premium-accent-sage/10 rounded-xl p-4 border border-premium-accent-sage/20">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={20} className="text-premium-accent-sage" />
            <h3 className="font-bold text-premium-accent-sage">Privacy Protection</h3>
          </div>
          <p className="text-premium-text-secondary text-sm">
            Your personal information is protected. You can choose to keep sensitive details hidden while still maintaining your health profile. 
            Only share what you're comfortable with.
          </p>
        </div>

        {/* Personal Information */}
        <ProfileSection
          title="Personal Information"
          icon={<User size={24} className="text-premium-accent-orange" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileField
              label="First Name"
              value={profile.firstName}
              isEditing={isEditing}
              onChange={(value) => updateProfile('firstName', value)}
            />
            <ProfileField
              label="Last Name"
              value={profile.lastName}
              isEditing={isEditing}
              onChange={(value) => updateProfile('lastName', value)}
            />
            <ProfileField
              label="Date of Birth"
              value={profile.dateOfBirth}
              isEditing={isEditing}
              onChange={(value) => updateProfile('dateOfBirth', value)}
              type="text"
              placeholder="Hidden for privacy"
            />
            <ProfileField
              label="Gender"
              value={profile.gender}
              isEditing={isEditing}
              onChange={(value) => updateProfile('gender', value)}
              type="select"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'prefer-not-to-say', label: 'Prefer not to say' }
              ]}
            />
          </div>
        </ProfileSection>

        {/* Contact Information */}
        <ProfileSection
          title="Contact Information"
          icon={<Phone size={24} className="text-premium-accent-sage" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileField
              label="Phone Number"
              value={profile.phone}
              isEditing={isEditing}
              onChange={(value) => updateProfile('phone', value)}
              icon={<Phone size={16} />}
              placeholder="Hidden for privacy"
            />
            <ProfileField
              label="Email Address"
              value={profile.email}
              isEditing={isEditing}
              onChange={(value) => updateProfile('email', value)}
              icon={<Mail size={16} />}
            />
            <ProfileField
              label="Country"
              value={profile.country}
              isEditing={isEditing}
              onChange={(value) => updateProfile('country', value)}
              icon={<MapPin size={16} />}
            />
            <ProfileField
              label="City"
              value={profile.city}
              isEditing={isEditing}
              onChange={(value) => updateProfile('city', value)}
              icon={<MapPin size={16} />}
            />
          </div>
        </ProfileSection>

        {/* Medical Information */}
        <ProfileSection
          title="Medical Information"
          icon={<Heart size={24} className="text-premium-accent-coral" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileField
              label="Blood Type"
              value={profile.bloodType}
              isEditing={isEditing}
              onChange={(value) => updateProfile('bloodType', value)}
              type="select"
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' }
              ]}
            />
            <ProfileField
              label="Height (cm)"
              value={profile.height}
              isEditing={isEditing}
              onChange={(value) => updateProfile('height', value)}
              type="number"
            />
            <ProfileField
              label="Weight (kg)"
              value={profile.weight}
              isEditing={isEditing}
              onChange={(value) => updateProfile('weight', value)}
              type="number"
            />
            <ProfileField
              label="Emergency Contact"
              value={profile.emergencyContact}
              isEditing={isEditing}
              onChange={(value) => updateProfile('emergencyContact', value)}
              icon={<AlertTriangle size={16} />}
              placeholder="Hidden for privacy"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <ProfileField
              label="Known Allergies"
              value={profile.allergies}
              isEditing={isEditing}
              onChange={(value) => updateProfile('allergies', value)}
              type="textarea"
              placeholder="None - No known allergies"
            />
            <ProfileField
              label="Chronic Conditions"
              value={profile.chronicConditions}
              isEditing={isEditing}
              onChange={(value) => updateProfile('chronicConditions', value)}
              type="textarea"
              placeholder="None - No chronic conditions"
            />
          </div>
        </ProfileSection>

        {/* Health Goals & Achievements */}
        <ProfileSection
          title="Health Goals & Achievements"
          icon={<Award size={24} className="text-premium-accent-gold" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-premium-text-primary">Donation History</h4>
              <div className="bg-premium-bg-primary/40 rounded-lg p-4 border border-premium-accent-gold/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-premium-text-secondary">Total Donations</span>
                  <span className="font-bold text-premium-accent-coral">{profile.totalDonations}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-premium-text-secondary">Lives Impacted</span>
                  <span className="font-bold text-premium-accent-gold">{profile.livesImpacted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-premium-text-secondary">Last Donation</span>
                  <span className="font-bold text-premium-accent-sage">{new Date(profile.lastDonation).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-premium-text-primary">Health Achievements</h4>
              <div className="space-y-2">
                <AchievementBadge
                  title="Life Saver"
                  description="Donated blood 5+ times"
                  earned={profile.totalDonations >= 5}
                />
                <AchievementBadge
                  title="Health Hero"
                  description="Helped 15+ people"
                  earned={profile.livesImpacted >= 15}
                />
                <AchievementBadge
                  title="Young Donor"
                  description="Started donating at young age"
                  earned={calculateAge(profile.dateOfBirth) < 20}
                />
              </div>
            </div>
          </div>
        </ProfileSection>
      </div>

      {/* Success Modal */}
      {saveSuccess && (
        <div className="fixed inset-0 bg-premium-bg-primary/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-premium-bg-secondary/90 backdrop-blur-xl rounded-2xl p-8 text-center border border-premium-accent-sage/30 shadow-2xl">
            <CheckCircle size={64} className="text-premium-accent-sage mx-auto mb-4" />
            <h3 className="text-2xl font-bold bg-premium-gradient-text-secondary bg-clip-text text-transparent mb-2">Profile Updated!</h3>
            <p className="text-premium-text-secondary">Your health profile has been saved successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
interface ProfileSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, icon, children }) => (
  <div className="bg-premium-bg-secondary/60 backdrop-blur-sm rounded-xl p-6 border border-premium-accent-gold/15">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-premium-gradient-primary rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">{title}</h3>
    </div>
    {children}
  </div>
);

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, subtitle }) => (
  <div className="bg-premium-bg-primary/40 rounded-lg p-4 border border-premium-accent-gold/10">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <span className="text-sm font-medium text-premium-text-secondary">{label}</span>
    </div>
    <div className="text-2xl font-bold text-premium-text-primary mb-1">{value}</div>
    <div className="text-xs text-premium-text-secondary">{subtitle}</div>
  </div>
);

interface ProfileFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'date' | 'number' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
  placeholder?: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ 
  label, 
  value, 
  isEditing, 
  onChange, 
  type = 'text', 
  options = [], 
  icon,
  placeholder 
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-premium-text-secondary">{label}</label>
    {isEditing ? (
      type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 bg-premium-bg-primary/60 border border-premium-accent-gold/20 rounded-lg text-premium-text-primary focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-premium-bg-secondary text-premium-text-primary">
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full p-3 bg-premium-bg-primary/60 border border-premium-accent-gold/20 rounded-lg text-premium-text-primary placeholder-premium-text-secondary focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20 resize-none"
        />
      ) : (
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-premium-text-secondary">
              {icon}
            </div>
          )}
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full p-3 bg-premium-bg-primary/60 border border-premium-accent-gold/20 rounded-lg text-premium-text-primary placeholder-premium-text-secondary focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20 ${
              icon ? 'pl-10' : ''
            }`}
          />
        </div>
      )
    ) : (
      <div className={`p-3 bg-premium-bg-primary/20 rounded-lg text-premium-text-primary flex items-center gap-2 ${
        icon ? 'pl-3' : ''
      }`}>
        {icon && <span className="text-premium-text-secondary">{icon}</span>}
        <span>
          {value === 'Hidden' ? (
            <span className="text-premium-text-secondary italic">Hidden for privacy</span>
          ) : value === 'None' ? (
            <span className="text-premium-accent-sage">None</span>
          ) : (
            value || 'Not specified'
          )}
        </span>
      </div>
    )}
  </div>
);

interface AchievementBadgeProps {
  title: string;
  description: string;
  earned: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ title, description, earned }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg border ${
    earned 
      ? 'bg-premium-accent-gold/10 border-premium-accent-gold/30 text-premium-accent-gold' 
      : 'bg-premium-bg-primary/20 border-premium-accent-gold/10 text-premium-text-secondary'
  }`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
      earned ? 'bg-premium-accent-gold text-white' : 'bg-premium-bg-secondary text-premium-text-secondary'
    }`}>
      <Award size={16} />
    </div>
    <div>
      <div className="font-medium">{title}</div>
      <div className="text-xs opacity-80">{description}</div>
    </div>
  </div>
);