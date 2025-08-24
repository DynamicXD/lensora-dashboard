import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, ShoppingCart, Package, Users, Download, TrendingUp, TrendingDown, Calendar, Camera, Star, Eye } from 'lucide-react';
import Navbar from './Navbar'; // Import your custom navbar
import Footer from '../Footer';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, growth, index, prefix = '', suffix = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isPositive = growth >= 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 transform transition-all duration-700 hover:shadow-xl ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            <AnimatedCounter end={value} prefix={prefix} suffix={suffix} />
          </p>
        </div>
        <div className={`p-3 rounded-full ${
          title.includes('Revenue') ? 'bg-green-100' :
          title.includes('Bookings') ? 'bg-blue-100' :
          title.includes('Events') ? 'bg-purple-100' :
          title.includes('Rating') ? 'bg-yellow-100' :
          'bg-orange-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            title.includes('Revenue') ? 'text-green-600' :
            title.includes('Bookings') ? 'text-blue-600' :
            title.includes('Events') ? 'text-purple-600' :
            title.includes('Rating') ? 'text-yellow-600' :
            'text-orange-600'
          }`} />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
        )}
        <span className={`text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {Math.abs(growth)}%
        </span>
        <span className="text-sm text-gray-500 ml-1">from last month</span>
      </div>
    </div>
  );
};

// Main Earnings Dashboard Component
const EarningsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [isLoading, setIsLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('revenue');

  // Enhanced stats data
  const stats = [
    { icon: DollarSign, title: 'Total Revenue', value: 125000, growth: 12.5, prefix: '₹' },
    { icon: ShoppingCart, title: 'Total Bookings', value: 87, growth: 8.2, suffix: '' },
    { icon: Package, title: 'Completed Events', value: 75, growth: -2.1, suffix: '' },
    { icon: Users, title: 'Happy Clients', value: 68, growth: 15.3, suffix: '' },
    { icon: Star, title: 'Average Rating', value: 4.8, growth: 5.2, suffix: '' },
    { icon: Eye, title: 'Profile Views', value: 1240, growth: 18.7, suffix: '' }
  ];

  // Enhanced monthly data
  const monthlyData = [
    { month: 'Jan', revenue: 15000, bookings: 8, events: 6, clients: 6, views: 180 },
    { month: 'Feb', revenue: 18000, bookings: 12, events: 10, clients: 10, views: 220 },
    { month: 'Mar', revenue: 22000, bookings: 15, events: 14, clients: 13, views: 280 },
    { month: 'Apr', revenue: 19000, bookings: 11, events: 9, clients: 8, views: 200 },
    { month: 'May', revenue: 25000, bookings: 18, events: 16, clients: 15, views: 320 },
    { month: 'Jun', revenue: 26000, bookings: 19, events: 17, clients: 16, views: 340 }
  ];

  // Event type distribution for pie chart
  const eventTypeData = [
    { name: 'Weddings', value: 45, color: '#8B5CF6' },
    { name: 'Corporate', value: 25, color: '#10B981' },
    { name: 'Birthdays', value: 15, color: '#F59E0B' },
    { name: 'Anniversaries', value: 10, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#6B7280' }
  ];

  // Weekly performance data
  const weeklyData = [
    { day: 'Mon', bookings: 3, revenue: 8000 },
    { day: 'Tue', bookings: 5, revenue: 12000 },
    { day: 'Wed', bookings: 2, revenue: 5000 },
    { day: 'Thu', bookings: 6, revenue: 15000 },
    { day: 'Fri', bookings: 4, revenue: 10000 },
    { day: 'Sat', bookings: 8, revenue: 20000 },
    { day: 'Sun', bookings: 7, revenue: 18000 }
  ];

  const recentTransactions = [
    { id: 1, client: 'Sarah & Mike Wedding', amount: 35000, date: '2025-01-20', status: 'Completed', type: 'Wedding' },
    { id: 2, client: 'Corporate Event - TechCorp', amount: 28000, date: '2025-01-18', status: 'Completed', type: 'Corporate' },
    { id: 3, client: 'Birthday Party - Johnson', amount: 15000, date: '2025-01-15', status: 'Completed', type: 'Birthday' },
    { id: 4, client: 'Anniversary Shoot', amount: 18000, date: '2025-01-12', status: 'Completed', type: 'Anniversary' },
    { id: 5, client: 'Baby Shower - Smith', amount: 12000, date: '2025-01-10', status: 'Completed', type: 'Baby Shower' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use your custom navbar */}
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Earnings Dashboard</h1>
              <p className="text-gray-600 mt-2">Track your photography business performance and growth</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="1week">Last Week</option>
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              growth={stat.growth}
              index={index}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          ))}
        </div>

        {/* Chart Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'revenue', label: 'Revenue Trends' },
                { key: 'bookings', label: 'Booking Analytics' },
                { key: 'performance', label: 'Weekly Performance' },
                { key: 'distribution', label: 'Event Distribution' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveChart(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeChart === tab.key
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dynamic Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            {activeChart === 'revenue' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend Analysis</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                      labelStyle={{ color: '#666' }}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </>
            )}

            {activeChart === 'bookings' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bookings vs Completed Events</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar dataKey="bookings" fill="#3B82F6" name="Total Bookings" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="events" fill="#10B981" name="Completed Events" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}

            {activeChart === 'performance' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Performance Overview</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis yAxisId="left" stroke="#666" />
                    <YAxis yAxisId="right" orientation="right" stroke="#666" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="bookings" 
                      stroke="#F59E0B" 
                      strokeWidth={3}
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                      name="Daily Bookings"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                      name="Daily Revenue (₹)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}

            {activeChart === 'distribution' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Type Distribution</h3>
                <div className="flex flex-col lg:flex-row items-center">
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={eventTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={150}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {eventTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">View All</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client/Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-600">₹{transaction.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(transaction.date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Camera className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">95%</p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Upcoming Events</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">4.9</p>
            <p className="text-sm text-gray-600">Client Rating</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">24%</p>
            <p className="text-sm text-gray-600">Growth This Month</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EarningsDashboard;
