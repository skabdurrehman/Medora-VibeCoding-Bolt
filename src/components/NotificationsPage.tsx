import React, { useState } from 'react';
import { ArrowLeft, Heart, MapPin, FileText, Clock, Bell, CheckCircle, AlertTriangle, Calendar, Filter, Search, Trash2 } from 'lucide-react';
import { Screen } from '../App';

interface NotificationsPageProps {
  onNavigate: (screen: Screen) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All', count: 12 },
    { id: 'urgent', label: 'Urgent', count: 3 },
    { id: 'donations', label: 'Donations', count: 4 },
    { id: 'appointments', label: 'Appointments', count: 2 },
    { id: 'health', label: 'Health Updates', count: 3 }
  ];

  const notifications = [
    {
      id: 1,
      type: 'urgent',
      category: 'donor_match',
      title: 'Critical Blood Match Found!',
      message: 'A compatible O+ donor is available 2.3km away. Contact immediately for emergency transfusion.',
      time: '5 min ago',
      date: '2024-01-15',
      icon: <Heart size={22} className="text-premium-accent-coral" />,
      urgent: true,
      read: false,
      actionRequired: true
    },
    {
      id: 2,
      type: 'appointments',
      category: 'hospital_alert',
      title: 'Appointment Confirmed',
      message: 'Your cardiology consultation at Mayo Clinic is confirmed for tomorrow at 2:00 PM.',
      time: '1 hour ago',
      date: '2024-01-15',
      icon: <Calendar size={22} className="text-premium-accent-orange" />,
      urgent: false,
      read: false,
      actionRequired: false
    },
    {
      id: 3,
      type: 'health',
      category: 'document_ready',
      title: 'Lab Results Available',
      message: 'Your recent blood work results are now available in your Health Vault. All values are within normal range.',
      time: '3 hours ago',
      date: '2024-01-15',
      icon: <FileText size={22} className="text-premium-accent-sage" />,
      urgent: false,
      read: true,
      actionRequired: false
    },
    {
      id: 4,
      type: 'donations',
      category: 'donation_request',
      title: 'Donation Request Nearby',
      message: 'A patient 5km away urgently needs B+ blood donation. You are a compatible donor.',
      time: '6 hours ago',
      date: '2024-01-15',
      icon: <Heart size={22} className="text-premium-accent-coral" />,
      urgent: true,
      read: false,
      actionRequired: true
    },
    {
      id: 5,
      type: 'health',
      category: 'medication_reminder',
      title: 'Medication Reminder',
      message: 'Time to take your evening medication: Metformin 500mg',
      time: '8 hours ago',
      date: '2024-01-15',
      icon: <Clock size={22} className="text-premium-accent-gold" />,
      urgent: false,
      read: true,
      actionRequired: false
    },
    {
      id: 6,
      type: 'donations',
      category: 'donation_success',
      title: 'Donation Impact Update',
      message: 'Your recent blood donation helped save 3 lives! Thank you for your contribution.',
      time: '1 day ago',
      date: '2024-01-14',
      icon: <CheckCircle size={22} className="text-premium-accent-sage" />,
      urgent: false,
      read: true,
      actionRequired: false
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = selectedFilter === 'all' || notification.type === selectedFilter;
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const markAsRead = (id: number) => {
    // In a real app, this would update the notification status
    console.log(`Marking notification ${id} as read`);
  };

  const deleteNotification = (id: number) => {
    // In a real app, this would delete the notification
    console.log(`Deleting notification ${id}`);
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
        <h1 className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">Health Notifications</h1>
        <div className="flex items-center gap-2 bg-premium-accent-coral/10 px-3 py-2 rounded-lg border border-premium-accent-coral/20 mr-16">
          <Bell size={16} className="text-premium-accent-coral" />
          <span className="font-medium text-premium-accent-coral text-sm">{notifications.filter(n => !n.read).length} Unread</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="relative bg-premium-bg-secondary/60 backdrop-blur-sm rounded-xl p-4 border border-premium-accent-gold/15">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-premium-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 bg-transparent text-premium-text-primary placeholder-premium-text-secondary focus:outline-none font-medium"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Filter size={18} className="text-premium-text-secondary" />
          <span className="font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">Filter by Type</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${
                selectedFilter === filter.id
                  ? 'bg-premium-gradient-primary text-white shadow-md border-premium-accent-gold/30'
                  : 'bg-premium-bg-secondary/60 text-premium-text-primary hover:bg-premium-bg-secondary/80 border-premium-accent-gold/15 hover:border-premium-accent-gold/30'
              }`}
            >
              {filter.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedFilter === filter.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-premium-accent-gold/20 text-premium-accent-gold'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={markAsRead}
            onDelete={deleteNotification}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell size={48} className="text-premium-text-secondary mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-premium-text-secondary mb-2">No notifications found</h3>
          <p className="text-premium-text-secondary opacity-70">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 flex gap-4">
        <button className="flex-1 bg-premium-gradient-primary text-white py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
          Mark All as Read
        </button>
        <button className="flex-1 bg-premium-bg-secondary/60 text-premium-text-primary py-3 rounded-lg font-medium hover:bg-premium-bg-secondary/80 transition-colors border border-premium-accent-gold/20">
          Clear Read Notifications
        </button>
      </div>
    </div>
  );
};

interface NotificationCardProps {
  notification: {
    id: number;
    type: string;
    category: string;
    title: string;
    message: string;
    time: string;
    date: string;
    icon: React.ReactNode;
    urgent: boolean;
    read: boolean;
    actionRequired: boolean;
  };
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkAsRead, onDelete }) => {
  return (
    <div className={`relative p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer border ${
      notification.urgent 
        ? 'bg-premium-gradient-primary text-white border-premium-accent-gold/40 shadow-lg' 
        : notification.read
        ? 'bg-premium-bg-secondary/40 border-premium-accent-gold/10 opacity-75'
        : 'bg-premium-bg-secondary/60 border-premium-accent-gold/20 hover:bg-premium-bg-secondary/80'
    }`}>
      {/* Urgent indicator */}
      {notification.urgent && (
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <AlertTriangle size={16} className="text-premium-accent-gold animate-pulse" />
          <span className="text-xs font-bold bg-premium-accent-gold text-premium-bg-primary px-2 py-1 rounded-full">URGENT</span>
        </div>
      )}

      {/* Unread indicator */}
      {!notification.read && !notification.urgent && (
        <div className="absolute top-3 right-3 w-3 h-3 bg-premium-accent-coral rounded-full animate-pulse"></div>
      )}

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          {notification.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-premium-text-primary text-lg">{notification.title}</h3>
            <div className="flex items-center gap-2 text-xs text-premium-text-secondary">
              <Clock size={12} />
              <span className="font-medium">{notification.time}</span>
            </div>
          </div>
          
          <p className="text-sm text-premium-text-secondary leading-relaxed mb-4">{notification.message}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {notification.actionRequired && (
                <button className="px-4 py-2 bg-premium-accent-gold text-premium-bg-primary text-sm rounded-lg font-bold hover:bg-premium-accent-cream transition-colors">
                  Take Action
                </button>
              )}
              {!notification.read && (
                <button 
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-sm text-premium-accent-sage hover:text-premium-accent-sage/80 font-medium"
                >
                  Mark as Read
                </button>
              )}
            </div>
            
            <button 
              onClick={() => onDelete(notification.id)}
              className="p-2 text-premium-text-secondary hover:text-premium-accent-coral transition-colors rounded-lg hover:bg-premium-bg-primary/20"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Category indicator */}
      <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r ${
        notification.category === 'donor_match' || notification.category === 'donation_request' ? 'bg-premium-accent-coral' :
        notification.category === 'hospital_alert' ? 'bg-premium-accent-orange' :
        notification.category === 'document_ready' ? 'bg-premium-accent-sage' :
        notification.category === 'medication_reminder' ? 'bg-premium-accent-gold' :
        'bg-premium-accent-slate'
      }`} />
    </div>
  );
};