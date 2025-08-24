import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, Camera, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import Navbar from './Navbar'; // Import your custom navbar
import Footer from '../Footer';

const PhotographerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  const mockBookings = [
    {
      id: 1,
      clientName: "Priya & Raj",
      eventType: "Marriage Ceremony",
      date: "2025-09-15",
      time: "10:00 AM",
      location: "Rose Garden, Downtown",
      phone: "+91 98765 43210",
      email: "priya.raj@email.com",
      status: "confirmed",
      amount: "₹25,000",
      duration: "8 hours",
      requirements: "Traditional wedding photography with candid shots"
    },
    {
      id: 2,
      clientName: "Sarah Johnson",
      eventType: "Birthday Function",
      date: "2025-09-20",
      time: "6:00 PM",
      location: "Grand Ballroom, City Hotel",
      phone: "+91 87654 32109",
      email: "sarah.j@email.com",
      status: "pending",
      amount: "₹15,000",
      duration: "4 hours",
      requirements: "Party photography with group shots and decorations"
    },
    {
      id: 3,
      clientName: "Tech Corp Ltd",
      eventType: "Corporate Event",
      date: "2025-08-25",
      time: "9:00 AM",
      location: "Convention Center",
      phone: "+91 76543 21098",
      email: "events@techcorp.com",
      status: "completed",
      amount: "₹35,000",
      duration: "6 hours",
      requirements: "Professional corporate event coverage"
    },
    {
      id: 4,
      clientName: "Maria & Carlos",
      eventType: "Anniversary Party",
      date: "2025-09-25",
      time: "7:00 PM",
      location: "Lakeside Venue",
      phone: "+91 65432 10987",
      email: "maria.carlos@email.com",
      status: "confirmed",
      amount: "₹18,000",
      duration: "5 hours",
      requirements: "Romantic anniversary celebration photography"
    },
    {
      id: 5,
      clientName: "Johnson Family",
      eventType: "Baby Shower",
      date: "2025-10-01",
      time: "2:00 PM",
      location: "Garden Villa Resort",
      phone: "+91 54321 09876",
      email: "johnson.family@email.com",
      status: "pending",
      amount: "₹12,000",
      duration: "3 hours",
      requirements: "Gentle baby shower photography with family portraits"
    }
  ];

  useEffect(() => {
    setBookings(mockBookings);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use your custom navbar */}
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your photography bookings and client requests</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All Bookings', count: bookings.length },
                { key: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
                { key: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
                { key: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    filter === tab.key
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{bookings.length}</p>
                <p className="text-gray-600">Total Bookings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
                <p className="text-gray-600">Confirmed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">
                  {bookings.filter(b => b.status === 'pending').length}
                </p>
                <p className="text-gray-600">Pending</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">
                  {bookings.filter(b => b.status === 'completed').length}
                </p>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{booking.clientName}</h3>
                      <p className="text-gray-600">{booking.eventType}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(booking.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{booking.time} ({booking.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{booking.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{booking.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{booking.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-purple-600">{booking.amount}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                    <p className="text-gray-600 text-sm">{booking.requirements}</p>
                  </div>

                  <div className="flex justify-end space-x-3">
                    {booking.status === 'pending' && (
                      <>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                          Accept
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                          Decline
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                        Mark Complete
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? "Your bookings will appear here once clients book your services." 
                : `No ${filter} bookings at the moment.`
              }
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PhotographerBookings;
