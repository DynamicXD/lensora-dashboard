import React, { useState } from 'react';
import { ArrowRight, CreditCard, HelpCircle, Calendar, User, Bell } from 'lucide-react';
import Navbar from './Navbar';
import Layout from '../Layout';

// Dashboard Content Components
const DiscoverContent = () => {
  const instructorData = {
    photographers: [
      { name: "Jon Kantner", role: "Designer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      { name: "Debbie LaChusa", role: "SEO", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
      { name: "Edwin Diaz", role: "Composer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
      { name: "Cassie Evans", role: "Photographer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
      { name: "Erich Andreas", role: "Programmer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
      { name: "Jason Allen", role: "Accounting", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face" }
    ],
    videographers: [
      { name: "Jon Kantner", role: "Designer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      { name: "Debbie LaChusa", role: "SEO", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
      { name: "Edwin Diaz", role: "Composer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
      { name: "Cassie Evans", role: "Photographer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
      { name: "Erich Andreas", role: "Programmer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
      { name: "Jason Allen", role: "Accounting", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face" }
    ],
    eventOrganisers: [
      { name: "Jon Kantner", role: "Designer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      { name: "Debbie LaChusa", role: "SEO", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
      { name: "Edwin Diaz", role: "Composer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
      { name: "Cassie Evans", role: "Photographer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
      { name: "Erich Andreas", role: "Programmer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
      { name: "Jason Allen", role: "Accounting", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face" }
    ]
  };

  const InstructorCard = ({ instructor }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      <div className="aspect-square overflow-hidden">
        <img
          src={instructor.image}
          alt={instructor.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{instructor.name}</h3>
        <p className="text-xs text-gray-500">{instructor.role}</p>
      </div>
    </div>
  );

  const Section = ({ title, highlightWord, instructors, isReversed = false, bgColor = "bg-gray-50" }) => (
    <section className={`min-h-screen ${bgColor} relative overflow-hidden`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute ${isReversed ? '-left-64' : '-right-64'} top-1/4 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl`}></div>
        <div className={`absolute ${isReversed ? '-left-32' : '-right-32'} bottom-1/4 w-64 h-64 bg-purple-300 rounded-full opacity-20 blur-2xl`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className={`flex items-center min-h-[80vh] ${isReversed ? 'flex-row-reverse' : ''} gap-16`}>
          <div className="flex-1">
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-purple-400">{highlightWord}</span>{' '}
              <span className="text-gray-900">{title.replace(highlightWord, '')}</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg">
              At The Academy, We Strive To Bring Together The Best Professors For The Best Courses
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2 group">
                All Instructors
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium">
                54 Instructors
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-6">
              {instructors.map((instructor, index) => (
                <InstructorCard key={index} instructor={instructor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      <Section
        title="Best Photographer"
        highlightWord="Best"
        instructors={instructorData.photographers}
        bgColor="bg-white"
      />
      <Section
        title="Best Videographers"
        highlightWord="Best"
        instructors={instructorData.videographers}
        isReversed={true}
        bgColor="bg-gray-50"
      />
      <Section
        title="Best Event Organiser"
        highlightWord="Best"
        instructors={instructorData.eventOrganisers}
        bgColor="bg-white"
      />
    </div>
  );
};

const PaymentContent = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/25</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-medium">Active</span>
            </div>
            <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-purple-400 hover:text-purple-600 transition-colors duration-300">
              + Add New Payment Method
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Photography Course</p>
                <p className="text-sm text-gray-500">Jan 15, 2025</p>
              </div>
              <span className="font-medium text-green-600">-$149.99</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Video Editing Masterclass</p>
                <p className="text-sm text-gray-500">Jan 12, 2025</p>
              </div>
              <span className="font-medium text-green-600">-$199.99</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Event Management Course</p>
                <p className="text-sm text-gray-500">Jan 8, 2025</p>
              </div>
              <span className="font-medium text-green-600">-$179.99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SupportContent = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Support Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <HelpCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">FAQ</h3>
          <p className="text-gray-600 text-sm">Find answers to common questions</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <User className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
          <p className="text-gray-600 text-sm">Chat with our support team</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <Bell className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-600 text-sm">Email us your questions</p>
        </div>
      </div>

      {/* Additional Support Content */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Popular Help Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-1">How to book a session?</h4>
            <p className="text-sm text-gray-600">Learn how to schedule and join your sessions</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-1">Payment & Refunds</h4>
            <p className="text-sm text-gray-600">Information about payments and refund policies</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-1">Technical Issues</h4>
            <p className="text-sm text-gray-600">Troubleshooting common technical problems</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
            <h4 className="font-medium text-gray-900 mb-1">Account Management</h4>
            <p className="text-sm text-gray-600">Managing your profile and account settings</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MyBookingsContent = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 1, title: "Photography Masterclass", instructor: "Jon Kantner", date: "March 15, 2025", time: "2:00 PM", status: "upcoming" },
          { id: 2, title: "Video Editing Bootcamp", instructor: "Debbie LaChusa", date: "March 18, 2025", time: "10:00 AM", status: "upcoming" },
          { id: 3, title: "Event Planning Workshop", instructor: "Edwin Diaz", date: "March 20, 2025", time: "3:00 PM", status: "confirmed" },
          { id: 4, title: "Digital Marketing Course", instructor: "Cassie Evans", date: "March 12, 2025", time: "1:00 PM", status: "completed" },
          { id: 5, title: "Business Photography", instructor: "Erich Andreas", date: "March 25, 2025", time: "11:00 AM", status: "upcoming" },
          { id: 6, title: "Creative Writing", instructor: "Jason Allen", date: "March 8, 2025", time: "4:00 PM", status: "completed" }
        ].map((booking) => (
          <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{booking.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p><Calendar className="h-4 w-4 inline mr-2" />{booking.date} at {booking.time}</p>
              <p><User className="h-4 w-4 inline mr-2" />{booking.instructor}</p>
            </div>
            {booking.status !== 'completed' ? (
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Join Session
              </button>
            ) : (
              <button className="w-full bg-gray-200 text-gray-600 py-2 rounded-lg cursor-not-allowed">
                Session Completed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Main Dashboard Component
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('discover');

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return <DiscoverContent />;
      case 'payment':
        return <PaymentContent />;
      case 'support':
        return <SupportContent />;
      case 'mybookings':
        return <MyBookingsContent />;
      default:
        return <DiscoverContent />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="pt-16">
          {renderContent()}
        </div>
      </div>
    </Layout>

  );
};

export default UserDashboard;