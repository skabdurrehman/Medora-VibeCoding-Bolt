import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Globe, Users, ArrowLeft, Filter, Award, Clock, Phone, Navigation } from 'lucide-react';
import { Screen } from '../App';
import hospitalsData from '../data/hospitals.json';

interface Hospital {
  id: number;
  name: string;
  city: string;
  country: string;
  specializations: string[];
  rating: number;
  distance: string;
  languages: string[];
  emergency: boolean;
  multilingual: boolean;
  verified: boolean;
  coordinates: string;
  phone: string;
  image: string;
}

interface HospitalFinderProps {
  onNavigate: (screen: Screen) => void;
}

export const HospitalFinder: React.FC<HospitalFinderProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(hospitalsData);

  const filters = [
    'cardiology', 'oncology', 'emergency', 'neurology', 'surgery', 
    'diabetes', 'pediatrics', 'orthopedics', 'multilingual', 'verified'
  ];

  useEffect(() => {
    let filtered = hospitalsData.filter((hospital: Hospital) => {
      // Search by name, specialization, or condition
      const matchesSearch = searchQuery === '' || 
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.specializations.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
        hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.country.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by selected filters
      const matchesFilters = selectedFilters.length === 0 || selectedFilters.every(filter => {
        if (filter === 'multilingual') return hospital.multilingual;
        if (filter === 'verified') return hospital.verified;
        return hospital.specializations.includes(filter);
      });

      return matchesSearch && matchesFilters;
    });

    setFilteredHospitals(filtered);
  }, [searchQuery, selectedFilters]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const getDirections = (coordinates: string, hospitalName: string) => {
    const url = `https://maps.google.com/?q=${coordinates}&query=${encodeURIComponent(hospitalName)}`;
    window.open(url, '_blank');
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
        <h1 className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">Find Hospitals</h1>
        <div className="flex items-center gap-2 bg-premium-accent-sage/10 px-3 py-2 rounded-lg border border-premium-accent-sage/20 mr-16">
          <Globe size={16} className="text-premium-accent-sage" />
          <span className="font-medium text-premium-accent-sage text-sm">{filteredHospitals.length} Hospitals</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="relative bg-premium-bg-secondary/60 backdrop-blur-sm rounded-xl p-4 border border-premium-accent-gold/15">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-premium-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search by condition, treatment, or hospital name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 bg-transparent text-premium-text-primary placeholder-premium-text-secondary focus:outline-none font-medium"
          />
        </div>
      </div>

      {/* Filter Tags */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Filter size={18} className="text-premium-text-secondary" />
          <span className="font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">Filters</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border capitalize ${
                selectedFilters.includes(filter)
                  ? 'bg-premium-gradient-primary text-white shadow-md border-premium-accent-gold/30'
                  : 'bg-premium-bg-secondary/60 text-premium-text-primary hover:bg-premium-bg-secondary/80 border-premium-accent-gold/15 hover:border-premium-accent-gold/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHospitals.map((hospital) => (
          <HospitalCard 
            key={hospital.id} 
            hospital={hospital} 
            onGetDirections={() => getDirections(hospital.coordinates, hospital.name)}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredHospitals.length === 0 && (
        <div className="text-center py-12">
          <Globe size={48} className="text-premium-text-secondary mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-premium-text-secondary mb-2">No hospitals found</h3>
          <p className="text-premium-text-secondary opacity-70">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

interface HospitalCardProps {
  hospital: Hospital;
  onGetDirections: () => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onGetDirections }) => {
  return (
    <div className="group relative bg-premium-bg-secondary/60 backdrop-blur-sm rounded-lg p-4 border border-premium-accent-gold/15 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <img 
          src={hospital.image} 
          alt={hospital.name}
          className="w-full h-full object-cover opacity-8 group-hover:opacity-12 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-premium-bg-secondary/70 to-premium-bg-primary/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-premium-text-primary">{hospital.name}</h3>
              {hospital.verified && (
                <Award size={12} className="text-premium-accent-gold" />
              )}
            </div>
            <div className="flex items-center gap-1 text-premium-text-secondary text-xs">
              <MapPin size={10} />
              <span className="font-medium">{hospital.city}, {hospital.country}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-premium-accent-sage/15 px-2 py-1 rounded-md border border-premium-accent-sage/20">
            <Star size={10} className="text-premium-accent-sage fill-current" />
            <span className="font-bold text-premium-accent-sage text-xs">{hospital.rating}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {hospital.emergency && (
            <span className="px-2 py-0.5 bg-premium-accent-coral/15 text-premium-accent-coral text-xs rounded-md font-medium border border-premium-accent-coral/20">
              Emergency
            </span>
          )}
          {hospital.multilingual && (
            <span className="px-2 py-0.5 bg-premium-accent-orange/15 text-premium-accent-orange text-xs rounded-md font-medium border border-premium-accent-orange/20">
              Multilingual
            </span>
          )}
          {hospital.specializations.slice(0, 2).map((spec) => (
            <span
              key={spec}
              className="px-2 py-0.5 bg-premium-accent-gold/15 text-premium-accent-gold text-xs rounded-md font-medium border border-premium-accent-gold/20 capitalize"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Details */}
        <div className="flex items-center justify-between text-xs text-premium-text-secondary mb-3">
          <div className="flex items-center gap-1">
            <Globe size={10} />
            <span className="font-medium">{hospital.languages.slice(0, 2).join(', ')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Navigation size={10} />
            <span className="font-medium">{hospital.distance}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button 
            onClick={onGetDirections}
            className="flex-1 bg-premium-gradient-primary text-white py-2 rounded-md font-medium text-xs hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1"
          >
            <Navigation size={12} />
            Directions
          </button>
          <button className="px-3 py-2 bg-premium-bg-secondary/60 text-premium-text-primary rounded-md font-medium text-xs hover:bg-premium-bg-secondary/80 transition-colors border border-premium-accent-gold/20">
            <Phone size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};