import React, { useState, useEffect } from 'react';
import { ArrowLeft, Crown, Star, Globe, MessageCircle, Video, Calendar, Clock, Users, Award, Shield, Zap, Heart, Brain, Activity, User, UserCheck } from 'lucide-react';
import { Screen } from '../App';
import { revenueCat, PREMIUM_FEATURES } from '../utils/revenueCat';

interface HumanMentorProps {
  onNavigate: (screen: Screen) => void;
}

export const HumanMentor: React.FC<HumanMentorProps> = ({ onNavigate }) => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      country: 'United States',
      flag: '🇺🇸',
      gender: 'female',
      specialization: ['Cardiology', 'Internal Medicine'],
      experience: '15+ years',
      rating: 4.9,
      reviews: 2847,
      languages: ['English', 'Spanish'],
      price: '$179/month',
      verified: true,
      premium: true,
      availability: 'Available Now',
      responseTime: '< 2 hours'
    },
    {
      id: 2,
      name: 'Dr. Raj Patel',
      country: 'India',
      flag: '🇮🇳',
      gender: 'male',
      specialization: ['Neurology', 'Psychiatry'],
      experience: '12+ years',
      rating: 4.8,
      reviews: 1923,
      languages: ['English', 'Hindi', 'Gujarati'],
      price: '$179/month',
      verified: true,
      premium: true,
      availability: 'Available in 1 hour',
      responseTime: '< 3 hours'
    },
    {
      id: 3,
      name: 'Dr. Emma Schmidt',
      country: 'Germany',
      flag: '🇩🇪',
      gender: 'female',
      specialization: ['Oncology', 'Radiology'],
      experience: '18+ years',
      rating: 4.9,
      reviews: 3156,
      languages: ['German', 'English', 'French'],
      price: '$179/month',
      verified: true,
      premium: true,
      availability: 'Available Now',
      responseTime: '< 1 hour'
    }
  ];

  const premiumFeatures = [
    {
      icon: <MessageCircle size={24} />,
      title: 'Unlimited Chat Support',
      description: '24/7 direct messaging with your assigned human mentor for instant health guidance'
    },
    {
      icon: <Video size={24} />,
      title: 'Weekly Video Consultations',
      description: 'Face-to-face sessions to discuss your health reports and get personalized advice'
    },
    {
      icon: <Brain size={24} />,
      title: 'Report Analysis & Explanation',
      description: 'Detailed breakdown of your medical reports in simple, understandable language'
    },
    {
      icon: <Activity size={24} />,
      title: 'Personalized Health Plans',
      description: 'Custom diet, exercise, and lifestyle recommendations based on your health data'
    },
    {
      icon: <Calendar size={24} />,
      title: 'Health Tracking & Monitoring',
      description: 'Regular check-ins and progress tracking with detailed health trend analysis'
    },
    {
      icon: <Heart size={24} />,
      title: 'Emergency Health Support',
      description: 'Priority access to your mentor during health emergencies and urgent situations'
    },
    {
      icon: <Shield size={24} />,
      title: 'Second Opinion Network',
      description: 'Access to a network of specialists for complex cases and second opinions'
    },
    {
      icon: <Zap size={24} />,
      title: 'Instant Lab Result Interpretation',
      description: 'Same-day analysis and explanation of your lab results and diagnostic reports'
    }
  ];

  const handleSelectMentor = (mentor: any) => {
    setSelectedMentor(mentor);
    setShowPremiumModal(true);
  };

  const handlePurchasePremium = async () => {
    setIsPurchasing(true);
    
    try {
      const result = await revenueCat.purchasePremium('human_mentor_monthly');
      
      if (result.success) {
        setPurchaseSuccess(true);
        setTimeout(() => {
          setShowPremiumModal(false);
          setPurchaseSuccess(false);
          setSelectedMentor(null);
        }, 2000);
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsPurchasing(false);
    }
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
        <h1 className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">Human Health Mentors</h1>
        <div className="flex items-center gap-2 bg-premium-accent-gold/10 px-3 py-2 rounded-lg border border-premium-accent-gold/30 mr-16">
          <Crown size={16} className="text-premium-accent-gold" />
          <span className="font-medium text-premium-accent-gold text-sm">Premium Only</span>
        </div>
      </div>

      {/* Premium Info Banner */}
      <div className="bg-gradient-to-r from-premium-accent-gold/15 to-premium-accent-orange/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-premium-accent-gold/30">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-premium-gradient-gold rounded-xl flex items-center justify-center">
            <Users size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">Professional Human Health Mentors</h2>
            <p className="text-premium-text-secondary">Get personalized guidance from certified medical professionals worldwide</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-premium-accent-gold">200+</div>
            <div className="text-sm text-premium-text-secondary">Expert Mentors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-premium-accent-gold">50+</div>
            <div className="text-sm text-premium-text-secondary">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-premium-accent-gold">24/7</div>
            <div className="text-sm text-premium-text-secondary">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-premium-accent-gold">$179</div>
            <div className="text-sm text-premium-text-secondary">Per Month</div>
          </div>
        </div>
        <p className="text-premium-text-secondary text-sm">
          Our human mentors are licensed medical professionals who provide personalized health guidance, 
          report explanations, and ongoing support. Because you deserve professional care, there's a premium fee.
        </p>
      </div>

      {/* Featured Mentors */}
      <div className="mb-8">
        <h3 className="text-lg font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent mb-6">Featured Mentors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} onSelect={() => handleSelectMentor(mentor)} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button 
            onClick={() => setShowPremiumModal(true)}
            className="bg-premium-gradient-gold text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Buy Premium to View Full List
          </button>
          <p className="text-premium-text-secondary text-sm mt-3">200+ mentors from almost every country available</p>
        </div>
      </div>

      {/* Premium Features */}
      <div className="mb-8">
        <h3 className="text-lg font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent mb-6">What You Get with Premium</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="bg-premium-bg-secondary/60 backdrop-blur-sm rounded-xl p-4 border border-premium-accent-gold/15">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-premium-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-premium-text-primary mb-1">{feature.title}</h4>
                  <p className="text-premium-text-secondary text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Modal with RevenueCat Integration */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-premium-bg-primary/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-premium-bg-secondary/90 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full border border-premium-accent-gold/20 shadow-2xl max-h-[90vh] overflow-y-auto">
            {purchaseSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-premium-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent mb-2">Welcome to Premium!</h2>
                <p className="text-premium-text-secondary">Your subscription has been activated successfully.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-premium-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown size={32} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent mb-2">Premium Human Health Mentors</h2>
                  <p className="text-premium-text-secondary">Professional medical guidance from certified experts</p>
                </div>

                {selectedMentor && (
                  <div className="bg-premium-bg-primary/40 rounded-xl p-6 mb-6 border border-premium-accent-gold/15">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-premium-gradient-primary flex items-center justify-center border-2 border-premium-accent-gold/30">
                        {selectedMentor.gender === 'female' ? (
                          <UserCheck size={32} className="text-white" />
                        ) : (
                          <User size={32} className="text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-premium-text-primary text-lg">{selectedMentor.name}</h3>
                        <p className="text-premium-text-secondary">{selectedMentor.flag} {selectedMentor.country}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star size={14} className="text-premium-accent-gold fill-current" />
                          <span className="text-sm font-medium text-premium-accent-gold">{selectedMentor.rating}</span>
                          <span className="text-sm text-premium-text-secondary">({selectedMentor.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-premium-text-secondary">Specialization:</span>
                        <p className="text-premium-text-primary font-medium">{selectedMentor.specialization.join(', ')}</p>
                      </div>
                      <div>
                        <span className="text-premium-text-secondary">Experience:</span>
                        <p className="text-premium-text-primary font-medium">{selectedMentor.experience}</p>
                      </div>
                      <div>
                        <span className="text-premium-text-secondary">Languages:</span>
                        <p className="text-premium-text-primary font-medium">{selectedMentor.languages.join(', ')}</p>
                      </div>
                      <div>
                        <span className="text-premium-text-secondary">Response Time:</span>
                        <p className="text-premium-text-primary font-medium">{selectedMentor.responseTime}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-premium-accent-gold/10 rounded-xl border border-premium-accent-gold/20">
                    <h3 className="font-bold text-premium-text-primary mb-3">🌟 Premium Features Include:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-premium-text-secondary">
                      <div>• 24/7 unlimited chat support</div>
                      <div>• Weekly video consultations</div>
                      <div>• Detailed report explanations</div>
                      <div>• Personalized health plans</div>
                      <div>• Emergency health support</div>
                      <div>• Second opinion network</div>
                      <div>• Lab result interpretations</div>
                      <div>• Health tracking & monitoring</div>
                      <div>• Medication guidance</div>
                      <div>• Lifestyle recommendations</div>
                      <div>• Mental health support</div>
                      <div>• Family health planning</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent mb-2">$179/month</div>
                    <p className="text-premium-text-secondary text-sm mb-4">Professional medical guidance • Cancel anytime</p>
                    <div className="bg-premium-accent-sage/10 rounded-lg p-3 border border-premium-accent-sage/20">
                      <p className="text-premium-accent-sage text-sm font-medium">
                        ✅ 7-day free trial • ✅ Money-back guarantee • ✅ 200+ mentors worldwide
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handlePurchasePremium}
                    disabled={isPurchasing}
                    className="w-full bg-premium-gradient-gold text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPurchasing ? 'Processing...' : 'Start 7-Day Free Trial'}
                  </button>
                  <button
                    onClick={() => setShowPremiumModal(false)}
                    className="w-full py-3 text-premium-text-secondary hover:text-premium-text-primary transition-colors border border-premium-accent-gold/20 rounded-lg"
                  >
                    Maybe Later
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface MentorCardProps {
  mentor: {
    id: number;
    name: string;
    country: string;
    flag: string;
    gender: string;
    specialization: string[];
    experience: string;
    rating: number;
    reviews: number;
    languages: string[];
    price: string;
    verified: boolean;
    premium: boolean;
    availability: string;
    responseTime: string;
  };
  onSelect: () => void;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onSelect }) => {
  return (
    <div className="group relative bg-premium-bg-secondary/60 backdrop-blur-sm rounded-xl p-6 border border-premium-accent-gold/15 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
      {/* Premium Badge */}
      {mentor.premium && (
        <div className="absolute top-4 right-4 bg-premium-gradient-gold text-white px-2 py-1 rounded-full text-xs font-bold">
          PREMIUM
        </div>
      )}

      {/* Mentor Gender Symbol & Basic Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-premium-gradient-primary flex items-center justify-center border-2 border-premium-accent-gold/30">
            {mentor.gender === 'female' ? (
              <UserCheck size={32} className="text-white" />
            ) : (
              <User size={32} className="text-white" />
            )}
          </div>
          {mentor.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-premium-accent-sage rounded-full flex items-center justify-center border-2 border-premium-bg-secondary">
              <Award size={12} className="text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-premium-text-primary text-lg">{mentor.name}</h3>
          <p className="text-premium-text-secondary text-sm">{mentor.flag} {mentor.country}</p>
          <div className="flex items-center gap-2 mt-1">
            <Star size={14} className="text-premium-accent-gold fill-current" />
            <span className="text-sm font-medium text-premium-accent-gold">{mentor.rating}</span>
            <span className="text-sm text-premium-text-secondary">({mentor.reviews})</span>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {mentor.specialization.map((spec) => (
            <span
              key={spec}
              className="px-2 py-1 bg-premium-accent-orange/15 text-premium-accent-orange text-xs rounded-lg font-medium border border-premium-accent-orange/20"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-premium-text-secondary">Experience:</span>
          <span className="text-premium-text-primary font-medium">{mentor.experience}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-premium-text-secondary">Languages:</span>
          <span className="text-premium-text-primary font-medium">{mentor.languages.slice(0, 2).join(', ')}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-premium-text-secondary">Response:</span>
          <span className="text-premium-text-primary font-medium">{mentor.responseTime}</span>
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-premium-accent-sage rounded-full animate-pulse"></div>
        <span className="text-premium-accent-sage text-sm font-medium">{mentor.availability}</span>
      </div>

      {/* Price & Action */}
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">{mentor.price}</div>
        <button
          onClick={onSelect}
          className="bg-premium-gradient-primary text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Select Mentor
        </button>
      </div>
    </div>
  );
};