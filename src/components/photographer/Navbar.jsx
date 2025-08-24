import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, DollarSign, Star, Bell, User, LogOut, Settings, ChevronDown, CreditCard } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'HOME', icon: Home, path: '/photographer/dashboard' },
    { id: 'bookings', label: 'BOOKINGS', icon: Calendar, path: '/photographer/bookings' },
    { id: 'earnings', label: 'EARNINGS', icon: DollarSign, path: '/photographer/earnings' },
    { id: 'reviews', label: 'REVIEWS', icon: Star, path: '/photographer/reviews' }
  ];

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const response = await axios.get('https://lensora-api.onrender.com/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      navigate('/');
    }
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
    setIsProfileOpen(false);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  const isActiveTab = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <button
            onClick={() => navigate('/photographer-dashboard')}
            className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors duration-300"
          >
            Lensora
          </button>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveTab(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors duration-300"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                {loading ? (
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                ) : (
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />
                    )}
                  </div>
                )}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {loading ? 'Loading...' : user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {loading ? '' : user?.role || ''}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && !loading && user && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full capitalize">
                      {user.role}
                    </span>
                  </div>
                  
                  <div className="py-2">
                    <button
                      onClick={openProfileModal}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">View Profile</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        handleNavigation('/photographer/earnings');
                        setIsProfileOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Earnings</span>
                    </button>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isProfileOpen && (
            <div
              className="fixed inset-0 z-40 lg:hidden"
              onClick={() => setIsProfileOpen(false)}
            />
          )}
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfileModal && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
                <button
                  onClick={closeProfileModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.name?.charAt(0)?.toUpperCase() || <User className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
                    <p className="text-gray-600 capitalize">{user.role}</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <p className="text-gray-900 capitalize">{user.role}</p>
                  </div>
                  
                  {user.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <p className="text-gray-900">{user.phone}</p>
                    </div>
                  )}
                  
                  {user.createdAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                      <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  )}
                  
                  {user.lastLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                      <p className="text-gray-900">{new Date(user.lastLogin).toLocaleString()}</p>
                    </div>
                  )}
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={closeProfileModal}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
