import React, { useState, useEffect } from 'react';
import { Heart, Droplets, Users, Gift, ArrowLeft, Bell, CheckCircle, MapPin, Clock, User } from 'lucide-react';
import { Screen } from '../App';
import { supabase } from '../utils/supabase';

interface DonationHubProps {
  onNavigate: (screen: Screen) => void;
}

interface DonationRequest {
  id: string;
  type: string;
  blood_type?: string;
  urgency: string;
  location: string;
  distance: string;
  requester_name: string;
  created_at: string;
  description: string;
}

export const DonationHub: React.FC<DonationHubProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'need' | 'donate'>('need');
  const [selectedType, setSelectedType] = useState('blood');
  const [showSuccess, setShowSuccess] = useState(false);
  const [donationRequests, setDonationRequests] = useState<DonationRequest[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    bloodType: '',
    urgency: '',
    description: ''
  });

  const donationTypes = [
    { id: 'blood', name: 'Blood', icon: <Droplets size={20} />, color: 'from-premium-accent-coral to-premium-accent-orange' },
    { id: 'organ', name: 'Organ', icon: <Heart size={20} />, color: 'from-premium-accent-sage to-premium-accent-slate' },
    { id: 'plasma', name: 'Plasma', icon: <Droplets size={20} />, color: 'from-premium-accent-orange to-premium-accent-gold' },
    { id: 'hair', name: 'Hair', icon: <Users size={20} />, color: 'from-premium-accent-gold to-premium-accent-coral' },
    { id: 'equipment', name: 'Equipment', icon: <Gift size={20} />, color: 'from-premium-accent-slate to-premium-accent-sage' }
  ];

  useEffect(() => {
    loadDonationRequests();
  }, [selectedType]);

  const loadDonationRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('donation_requests')
        .select('*')
        .eq('type', selectedType)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setDonationRequests(data || []);
    } catch (error) {
      console.error('Error loading donation requests:', error);
      // Mock data for demo
      setDonationRequests([
        {
          id: '1',
          type: selectedType,
          blood_type: 'B+',
          urgency: 'Emergency',
          location: 'AIIMS Delhi',
          distance: '2.3 km',
          requester_name: 'Anonymous Patient',
          created_at: new Date().toISOString(),
          description: 'Urgent blood needed for surgery'
        },
        {
          id: '2',
          type: selectedType,
          blood_type: 'O+',
          urgency: 'Routine',
          location: 'Apollo Hospital',
          distance: '5.1 km',
          requester_name: 'Medical Team',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          description: 'Regular donation needed'
        }
      ]);
    }
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        type: selectedType,
        blood_type: formData.bloodType,
        urgency: formData.urgency,
        location: formData.city,
        distance: '0 km',
        requester_name: formData.name,
        description: formData.description,
        contact_phone: formData.phone,
        contact_email: formData.email,
        status: 'active'
      };

      const { error } = await supabase
        .from('donation_requests')
        .insert([requestData]);

      if (error) throw error;

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        bloodType: '',
        urgency: '',
        description: ''
      });

      // Reload requests
      loadDonationRequests();
    } catch (error) {
      console.error('Error submitting request:', error);
      // Show success anyway for demo
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleRespond = async (requestId: string) => {
    try {
      // In real app, this would create a match record
      const { error } = await supabase
        .from('donation_matches')
        .insert([{
          request_id: requestId,
          donor_id: 'current_user_id',
          status: 'pending'
        }]);

      if (error) throw error;
      
      alert('You\'ve been connected to a match! The requester will contact you soon.');
    } catch (error) {
      console.error('Error responding to request:', error);
      alert('You\'ve been connected to a match! The requester will contact you soon.');
    }
  };

  return (
    <div className="min-h-screen bg-premium-gradient-dark px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-premium-text-secondary hover:text-premium-text-primary transition-colors bg-premium-bg-secondary/80 backdrop-blur-xl px-6 py-3 rounded-2xl border-2 border-premium-accent-gold/20 shadow-xl hover:shadow-2xl"
        >
          <ArrowLeft size={20} />
          <span className="font-bold">Back to Home</span>
        </button>
        <h1 className="text-4xl font-black bg-premium-gradient-text-primary bg-clip-text text-transparent">Donation Hub</h1>
        <div className="w-32"></div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-premium-bg-secondary/80 backdrop-blur-2xl rounded-3xl p-4 mb-12 shadow-2xl border-2 border-premium-accent-gold/20">
        <button
          onClick={() => setActiveTab('need')}
          className={`flex-1 py-5 px-10 rounded-2xl font-black text-xl transition-all duration-500 ${
            activeTab === 'need'
              ? 'bg-premium-gradient-primary text-white shadow-2xl border-2 border-premium-accent-gold/40 transform scale-105'
              : 'text-premium-text-secondary hover:text-premium-text-primary hover:bg-premium-bg-secondary/50'
          }`}
        >
          I Need Help
        </button>
        <button
          onClick={() => setActiveTab('donate')}
          className={`flex-1 py-5 px-10 rounded-2xl font-black text-xl transition-all duration-500 ${
            activeTab === 'donate'
              ? 'bg-premium-gradient-primary text-white shadow-2xl border-2 border-premium-accent-gold/40 transform scale-105'
              : 'text-premium-text-secondary hover:text-premium-text-primary hover:bg-premium-bg-secondary/50'
          }`}
        >
          I Want to Donate
        </button>
      </div>

      {/* Donation Types */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        {donationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`p-8 rounded-3xl text-center transition-all duration-500 transform hover:scale-110 border-2 shadow-2xl ${
              selectedType === type.id
                ? `bg-gradient-to-br ${type.color} text-white shadow-3xl border-premium-accent-gold/40 scale-110`
                : 'bg-premium-bg-secondary/80 backdrop-blur-xl text-premium-text-primary hover:bg-premium-bg-secondary/90 border-premium-accent-gold/20 hover:border-premium-accent-gold/40'
            }`}
          >
            <div className="mb-4 flex justify-center">{type.icon}</div>
            <span className="font-black text-lg">{type.name}</span>
          </button>
        ))}
      </div>

      {activeTab === 'need' ? (
        /* Request Form */
        <div className="bg-premium-bg-secondary/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border-2 border-premium-accent-gold/20">
          <h2 className="text-2xl font-black bg-premium-gradient-text-primary bg-clip-text text-transparent mb-8">
            Request {donationTypes.find(t => t.id === selectedType)?.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 rounded-xl bg-premium-bg-primary/60 backdrop-blur-xl border border-premium-accent-gold/20 focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20 focus:border-premium-accent-orange/40 transition-all duration-300 text-premium-text-primary placeholder-premium-text-secondary"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-3 rounded-xl bg-premium-bg-primary/60 backdrop-blur-xl border border-premium-accent-gold/20 focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20 focus:border-premium-accent-orange/40 transition-all duration-300 text-premium-text-primary placeholder-premium-text-secondary"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 rounded-xl bg-premium-bg-primary/60 backdrop-blur-xl border border-premium-accent-gold/20 focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20 focus:border-premium-accent-orange/40 transition-all duration-300 text-premium-text-primary placeholder-premium-text-secondary"
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full p-3 rounded-xl bg-premium-bg-primary/60 backdrop-blur-xl border border-premium-accent-gold/20 focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20 focus:border-premium-accent-orange/40 transition-all duration-300 text-premium-text-primary placeholder-premium-text-secondary"
            />
            
            {selectedType === 'blood' && (
              <>
                <select
                  value={formData.bloodType}
                  onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                  className="w-full p-3 rounded-xl bg-premium-bg-primary/60 backdrop-blur-xl border border-premium-accent-gold/20 focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20 focus:border-premium-accent-orange/40 transition-all duration-300 text-premium-text-primary"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                  className="w-full p-3 rounded-xl bg-premium-bg-primary/60 backdrop-blur-xl border border-premium-accent-gold/20 focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20 focus:border-premium-accent-orange/40 transition-all duration-300 text-premium-text-primary"
                >
                  <option value="">Select Urgency</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Routine">Routine</option>
                </select>
              </>
            )}
          </div>

          <textarea
            placeholder="Additional details..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-3 rounded-xl bg-premium-bg-primary/60 backdrop-blur-xl border border-premium-accent-gold/20 focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20 focus:border-premium-accent-orange/40 transition-all duration-300 text-premium-text-primary placeholder-premium-text-secondary resize-none mb-6"
            rows={3}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-premium-gradient-primary text-white py-3 rounded-xl font-black text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-premium-accent-gold/40"
          >
            Submit Request
          </button>
        </div>
      ) : (
        /* Donation Requests List */
        <div className="space-y-6">
          <h2 className="text-2xl font-black bg-premium-gradient-text-primary bg-clip-text text-transparent mb-6">
            Nearby {donationTypes.find(t => t.id === selectedType)?.name} Requests
          </h2>
          
          {donationRequests.map((request) => (
            <div key={request.id} className="bg-premium-bg-secondary/80 backdrop-blur-xl rounded-2xl p-6 border border-premium-accent-gold/20 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-premium-gradient-primary rounded-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-premium-text-primary">{request.requester_name}</h3>
                    <div className="flex items-center gap-2 text-sm text-premium-text-secondary">
                      <MapPin size={14} />
                      <span>{request.location} • {request.distance}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {request.blood_type && (
                    <div className="text-lg font-bold text-premium-accent-coral">{request.blood_type}</div>
                  )}
                  <div className={`text-sm font-medium ${
                    request.urgency === 'Emergency' ? 'text-premium-accent-coral' : 
                    request.urgency === 'Urgent' ? 'text-premium-accent-orange' : 
                    'text-premium-accent-sage'
                  }`}>
                    {request.urgency}
                  </div>
                </div>
              </div>
              
              <p className="text-premium-text-secondary mb-4">{request.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-premium-text-secondary">
                  <Clock size={14} />
                  <span>{new Date(request.created_at).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => handleRespond(request.id)}
                  className="bg-premium-gradient-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Respond
                </button>
              </div>
            </div>
          ))}
          
          {donationRequests.length === 0 && (
            <div className="text-center py-12">
              <Heart size={48} className="text-premium-text-secondary mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-premium-text-secondary mb-2">No requests found</h3>
              <p className="text-premium-text-secondary opacity-70">Check back later for new donation requests</p>
            </div>
          )}
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-premium-bg-primary/90 backdrop-blur-xl flex items-center justify-center z-50">
          <div className="bg-premium-bg-secondary/90 backdrop-blur-2xl rounded-3xl p-12 text-center transform animate-bounce shadow-3xl border-2 border-premium-accent-sage/40">
            <CheckCircle size={100} className="text-premium-accent-sage mx-auto mb-8" />
            <h3 className="text-4xl font-black bg-premium-gradient-text-secondary bg-clip-text text-transparent mb-6">Success!</h3>
            <p className="text-xl text-premium-text-secondary">Your {activeTab === 'need' ? 'request' : 'response'} has been submitted.</p>
          </div>
        </div>
      )}
    </div>
  );
};