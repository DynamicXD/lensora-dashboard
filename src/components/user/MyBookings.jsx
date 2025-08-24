import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../user/Navbar';
import Footer from '../Footer';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data for event bookings
  const mockBookings = [
    {
      id: 1,
      title: "Birthday Function",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      date: "2025-09-15",
      time: "6:00 PM",
      location: "Grand Ballroom, City Hotel",
      status: "Confirmed",
      isUpcoming: true,
      photographer: "Sarah Wilson",
      eventType: "Birthday"
    },
    {
      id: 2,
      title: "Marriage Ceremony",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      date: "2025-10-22",
      time: "11:00 AM",
      location: "Rose Garden, Downtown",
      status: "Confirmed",
      isUpcoming: true,
      photographer: "Michael Chen",
      eventType: "Wedding"
    },
    {
      id: 3,
      title: "Corporate Celebration",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
      date: "2025-08-30",
      time: "7:30 PM",
      location: "Convention Center",
      status: "Completed",
      isUpcoming: false,
      photographer: "Emma Rodriguez",
      eventType: "Corporate"
    },
    {
      id: 4,
      title: "Anniversary Party",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      date: "2025-09-28",
      time: "5:00 PM",
      location: "Lakeside Venue",
      status: "Pending",
      isUpcoming: true,
      photographer: "David Park",
      eventType: "Anniversary"
    },
    {
      id: 5,
      title: "Graduation Ceremony",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
      date: "2025-07-10",
      time: "10:00 AM",
      location: "University Auditorium",
      status: "Completed",
      isUpcoming: false,
      photographer: "Lisa Thompson",
      eventType: "Graduation"
    },
    {
      id: 6,
      title: "Baby Shower",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      date: "2025-10-05",
      time: "2:00 PM",
      location: "Garden Villa Resort",
      status: "Confirmed",
      isUpcoming: true,
      photographer: "Anna Lee",
      eventType: "Baby Shower"
    }
  ];

  useEffect(() => {
    setBookings(mockBookings);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isUpcomingSoon = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  const upcomingBookings = bookings.filter(booking => booking.isUpcoming);
  const pastBookings = bookings.filter(booking => !booking.isUpcoming);

  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-primary">My</span>{' '}
              <span className="text-gray-900">Bookings</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Here are your upcoming celebrations and events.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-black text-white shadow-lg'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Upcoming ({upcomingBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'past'
                    ? 'bg-black text-white shadow-lg'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Past Events ({pastBookings.length})
              </button>
            </div>
          </motion.div>

          {/* Bookings Grid */}
          <AnimatePresence mode="wait">
            {displayBookings.length > 0 ? (
              <motion.div
                key={activeTab}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {displayBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1 
                    }}
                    whileHover={{ 
                      y: -8,
                      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Image Section */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={booking.image}
                        alt={booking.title}
                        className="w-full h-full object-cover transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      {/* Upcoming Soon Badge */}
                      {booking.isUpcoming && isUpcomingSoon(booking.date) && (
                        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Coming Soon</span>
                        </div>
                      )}

                      {/* Event Type */}
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {booking.eventType}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {booking.title}
                      </h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-gray-600">{formatDate(booking.date)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <span className="text-gray-600">{booking.time}</span>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-primary mt-0.5" />
                          <span className="text-gray-600 text-sm">{booking.location}</span>
                        </div>
                      </div>

                      {/* Photographer Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-600 text-sm">{booking.photographer}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-primary group-hover:text-primary-600 transition-colors">
                          <span className="text-sm font-semibold">View Details</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`empty-${activeTab}`}
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white rounded-3xl p-12 shadow-lg max-w-md mx-auto">
                  <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {activeTab === 'upcoming' ? 'No Upcoming Events' : 'No Past Events'}
                  </h3>
                  <p className="text-gray-600 mb-8">
                    {activeTab === 'upcoming' 
                      ? 'When you book your first event, it will appear here.'
                      : 'Your completed events will be shown here.'
                    }
                  </p>
                  {activeTab === 'upcoming' && (
                    <motion.button
                      className="bg-primary text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px -10px rgba(139, 121, 231, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse Photographers
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats Section */}
          {bookings.length > 0 && (
            <motion.div
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{bookings.length}</h3>
                <p className="text-gray-600">Total Events</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{upcomingBookings.length}</h3>
                <p className="text-gray-600">Upcoming Events</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{pastBookings.length}</h3>
                <p className="text-gray-600">Completed Events</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;
