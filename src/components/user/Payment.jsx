import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Plus, Trash2, Edit3, Eye, EyeOff, Wifi } from 'lucide-react';
import Navbar from './Navbar'; // Your original navbar import
import Footer from '../Footer';

const Payment = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'credit',
      number: '**** **** **** 4242',
      fullNumber: '4242 4242 4242 4242',
      holder: 'JOHN DOE',
      expiry: '12/25',
      cvv: '123',
      brand: 'Visa',
      color: 'from-purple-600 to-purple-800',
      isActive: true
    },
    {
      id: 2,
      type: 'debit',
      number: '**** **** **** 5678',
      fullNumber: '5678 5678 5678 5678',
      holder: 'JOHN DOE',
      expiry: '08/27',
      cvv: '456',
      brand: 'Mastercard',
      color: 'from-blue-600 to-blue-800',
      isActive: false
    }
  ]);

  const [showCVV, setShowCVV] = useState({});

  const toggleCVV = (cardId) => {
    setShowCVV(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const Card3D = ({ card }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="relative w-80 h-48 cursor-pointer perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            rotateY: isHovered ? 180 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Front of Card */}
          <motion.div 
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${card.color} rounded-2xl shadow-2xl overflow-hidden`}
            style={{ 
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
              pointerEvents: 'none' // Prevent child elements from interfering
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Card Background Pattern */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 2 : 0
              }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute top-4 right-4 w-20 h-20 border border-white rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border border-white rounded-full"></div>
            </motion.div>
            
            {/* Chip with subtle animation */}
            <motion.div 
              className="absolute top-6 left-6 w-12 h-9 bg-yellow-400 rounded-md shadow-inner flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-6 bg-yellow-300 rounded border border-yellow-600 flex items-center justify-center">
                <div className="w-4 h-3 bg-gradient-to-b from-yellow-200 to-yellow-500 rounded-sm"></div>
              </div>
            </motion.div>
            
            {/* Contactless Symbol with pulse animation */}
            <motion.div 
              className="absolute top-6 right-20"
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
                opacity: isHovered ? [0.8, 1, 0.8] : 0.8
              }}
              transition={{ 
                duration: 1.5, 
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <Wifi className="w-6 h-6 text-white" />
            </motion.div>
            
            {/* Card Brand Logo */}
            <motion.div 
              className="absolute top-6 right-6 text-white font-bold text-lg"
              animate={{
                y: isHovered ? -2 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {card.brand}
            </motion.div>
            
            {/* Card Number with stagger animation */}
            <motion.div 
              className="absolute bottom-16 left-6 text-white font-mono text-xl tracking-widest"
              animate={{
                letterSpacing: isHovered ? '0.2em' : '0.1em'
              }}
              transition={{ duration: 0.5 }}
            >
              {card.number}
            </motion.div>
            
            {/* Card Details */}
            <motion.div 
              className="absolute bottom-4 left-6 right-6 flex justify-between items-end"
              animate={{
                y: isHovered ? -2 : 0
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div>
                <div className="text-white text-xs opacity-80 mb-1">CARD HOLDER</div>
                <div className="text-white text-sm font-semibold">{card.holder}</div>
              </div>
              <div>
                <div className="text-white text-xs opacity-80 mb-1">EXPIRES</div>
                <div className="text-white text-sm font-semibold">{card.expiry}</div>
              </div>
            </motion.div>
            
            {/* Card Type Badge */}
            <motion.div 
              className={`absolute top-16 left-6 px-2 py-1 rounded-full text-xs font-semibold ${
                card.type === 'credit' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {card.type.toUpperCase()}
            </motion.div>
          </motion.div>
          
          {/* Back of Card */}
          <motion.div 
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${card.color} rounded-2xl shadow-2xl overflow-hidden`}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              transformStyle: 'preserve-3d',
              pointerEvents: 'none' // Prevent child elements from interfering
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: isHovered ? 0.4 : 0 }}
          >
            {/* Magnetic Stripe with animation */}
            <motion.div 
              className="absolute top-8 left-0 right-0 h-12 bg-black"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />
            
            {/* CVV Section with highlight animation */}
            <motion.div 
              className="absolute top-24 right-6 w-16 h-8 bg-white rounded flex items-center justify-center"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
                boxShadow: isHovered 
                  ? ["0 0 0 0 rgba(139, 121, 231, 0.4)", "0 0 0 4px rgba(139, 121, 231, 0.4)", "0 0 0 0 rgba(139, 121, 231, 0.4)"]
                  : "0 0 0 0 rgba(139, 121, 231, 0)"
              }}
              transition={{ 
                duration: 1.5, 
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              <span className="text-black text-sm font-mono">
                {showCVV[card.id] ? card.cvv : '***'}
              </span>
            </motion.div>
            
            {/* CVV Label */}
            <motion.div 
              className="absolute top-32 right-6 text-white text-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10
              }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              CVV
            </motion.div>
            
            {/* Terms Text */}
            <motion.div 
              className="absolute bottom-8 left-6 right-6 text-white text-xs opacity-60 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.6 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              This card is property of the bank. If found, please return to any branch or call customer service.
            </motion.div>
            
            {/* Brand Logo on Back */}
            <motion.div 
              className="absolute bottom-4 right-6 text-white font-bold text-sm opacity-80"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: isHovered ? 0.8 : 0,
                x: isHovered ? 0 : 20
              }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              {card.brand}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  const transactions = [
    { id: 1, title: "Photography Course", date: "Jan 15, 2025", amount: "-$149.99", status: "completed" },
    { id: 2, title: "Video Editing Masterclass", date: "Jan 12, 2025", amount: "-$199.99", status: "completed" },
    { id: 3, title: "Event Management Course", date: "Jan 8, 2025", amount: "-$179.99", status: "completed" },
    { id: 4, title: "Refund - Photography Course", date: "Jan 5, 2025", amount: "+$149.99", status: "refund" },
    { id: 5, title: "Digital Marketing Workshop", date: "Jan 3, 2025", amount: "-$89.99", status: "completed" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Management</h1>
            <p className="text-gray-600 mb-12">Manage your payment methods and view transaction history</p>
          </motion.div>
          
          {/* Cards Section */}
          <div className="mb-12">
            <motion.div 
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900">Your Cards</h2>
              <motion.button 
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-700 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -12px rgba(139, 69, 19, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="w-5 h-5" />
                <span>Add New Card</span>
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-8 mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {cards.map((card, index) => (
                <motion.div 
                  key={card.id} 
                  className="relative group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <Card3D card={card} />
                  
                  {/* Card Controls */}
                  <motion.div 
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCVV(card.id);
                      }}
                      className="p-2 bg-white rounded-full shadow-lg border border-gray-200"
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      title="Toggle CVV"
                    >
                      {showCVV[card.id] ? 
                        <EyeOff className="w-4 h-4 text-gray-600" /> : 
                        <Eye className="w-4 h-4 text-gray-600" />
                      }
                    </motion.button>
                    <motion.button 
                      className="p-2 bg-white rounded-full shadow-lg border border-gray-200"
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit3 className="w-4 h-4 text-blue-600" />
                    </motion.button>
                    <motion.button 
                      className="p-2 bg-white rounded-full shadow-lg border border-gray-200"
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-sm text-gray-500 mb-4">Hover over any card to view CVV and details</p>
            </motion.div>
          </div>
          
          {/* Transactions Section */}
          <motion.div 
            className="bg-white rounded-3xl shadow-xl p-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Transactions</h2>
            
            <div className="space-y-4">
              <AnimatePresence>
                {transactions.map((transaction, index) => (
                  <motion.div 
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    whileHover={{ 
                      backgroundColor: "#f3f4f6",
                      scale: 1.02,
                      boxShadow: "0 4px 12px -4px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          transaction.status === 'refund' ? 'bg-green-100' : 'bg-blue-100'
                        }`}
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CreditCard className={`w-6 h-6 ${
                          transaction.status === 'refund' ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {transaction.title}
                        </h3>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${
                        transaction.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {transaction.amount}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'refund' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.button 
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Transactions →
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
