import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, MapPin, Camera, Award, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar'; // Using your theme navbar
import Footer from '../Footer';

const Showcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Sample photographers data with their best work
  const photographers = [
    {
      id: 1,
      name: "Sarah Johnson",
      speciality: "Wedding Photography",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop&crop=center",
      location: "New York, NY",
      experience: "8 years",
      rating: 3.7,
      reviews: 248,
      category: "Wedding",
      description: "Capturing love stories with an artistic eye and emotional depth. Specializing in candid moments and stunning portraits.",
      gallery: [
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&h=300&fit=crop"
      ],
      achievements: ["Wedding Wire Couple's Choice", "Top 10 Wedding Photographers NYC", "Featured in Bridal Magazine"]
    },
    {
      id: 2,
      name: "Michael Chen",
      speciality: "Corporate Photography",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=center",
      location: "San Francisco, CA",
      experience: "6 years",
      rating: 4.2,
      reviews: 156,
      category: "Corporate",
      description: "Professional corporate headshots and business photography. Creating powerful images that elevate your professional brand.",
      gallery: [
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop"
      ],
      achievements: ["LinkedIn Featured Photographer", "Corporate Photography Award 2023", "Fortune 500 Client Portfolio"]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      speciality: "Fashion Photography",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop&crop=center",
      location: "Los Angeles, CA",
      experience: "10 years",
      rating: 4.5,
      reviews: 203,
      category: "Fashion",
      description: "High-fashion photography with creative vision. Working with top models and brands to create stunning visual narratives.",
      gallery: [
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506629905607-24b1c9e6b021?w=400&h=300&fit=crop"
      ],
      achievements: ["Vogue Featured Artist", "Fashion Week Official Photographer", "International Fashion Awards Winner"]
    },
    {
      id: 4,
      name: "David Thompson",
      speciality: "Portrait Photography",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop&crop=center",
      location: "Austin, TX",
      experience: "7 years",
      rating: 4.7,
      reviews: 189,
      category: "Portrait",
      description: "Natural light portrait specialist. Capturing authentic personalities and creating timeless portraits for individuals and families.",
      gallery: [
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=300&fit=crop"
      ],
      achievements: ["Portrait Masters Certificate", "Natural Light Specialist", "Family Photography Expert"]
    },
    {
      id: 5,
      name: "Alex Rivera",
      speciality: "Landscape Photography",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
      location: "Denver, CO",
      experience: "12 years",
      rating: 3.8,
      reviews: 312,
      category: "Landscape",
      description: "Adventure and landscape photographer capturing the world's most breathtaking locations. Specializing in dramatic natural scenes.",
      gallery: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
      ],
      achievements: ["National Geographic Featured", "Landscape Photography of the Year", "Adventure Photographer Award"]
    },
    {
      id: 6,
      name: "Lisa Park",
      speciality: "Event Photography",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
      coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop&crop=center",
      location: "Miami, FL",
      experience: "5 years",
      rating: 3.9,
      reviews: 167,
      category: "Event",
      description: "Dynamic event photographer specializing in corporate events, parties, and celebrations. Capturing moments that matter.",
      gallery: [
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&h=300&fit=crop"
      ],
      achievements: ["Event Photography Specialist", "Corporate Client Preferred", "Miami's Top Event Photographer"]
    }
  ];

  const categories = ['All', 'Wedding', 'Corporate', 'Fashion', 'Portrait', 'Landscape', 'Event'];

  const filteredPhotographers = selectedCategory === 'All' 
    ? photographers 
    : photographers.filter(photographer => photographer.category === selectedCategory);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  if (selectedPhotographer) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.button
              onClick={() => setSelectedPhotographer(null)}
              className="flex items-center space-x-2 text-primary hover:text-primary-600 mb-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Showcase</span>
            </motion.button>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 p-8 bg-accent">
                  <div className="text-center">
                    <img
                      src={selectedPhotographer.avatar}
                      alt={selectedPhotographer.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                    />
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedPhotographer.name}
                    </h1>
                    <p className="text-primary font-semibold mb-4">
                      {selectedPhotographer.speciality}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="flex space-x-1">
                        {renderStars(selectedPhotographer.rating)}
                      </div>
                      <span className="text-gray-600 text-sm">
                        {selectedPhotographer.rating} ({selectedPhotographer.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{selectedPhotographer.location}</span>
                    </div>

                    <div className="flex items-center justify-center space-x-2 mb-6">
                      <Camera className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{selectedPhotographer.experience} experience</span>
                    </div>

                    <button className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300">
                      Book Now
                    </button>
                  </div>
                </div>

                <div className="md:w-2/3 p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
                  <p className="text-gray-600 mb-6">{selectedPhotographer.description}</p>

                  <h3 className="text-xl font-bold text-gray-800 mb-4">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {selectedPhotographer.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-4">Portfolio</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedPhotographer.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-primary">Best</span>{' '}
              <span className="text-gray-900">Recent Works</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore the latest and top-rated work from our professionals
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Photographers Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {filteredPhotographers.map((photographer, index) => (
                <motion.div
                  key={photographer.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPhotographer(photographer)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={photographer.coverImage}
                      alt={photographer.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {photographer.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={photographer.avatar}
                        alt={photographer.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {photographer.name}
                        </h3>
                        <p className="text-primary font-semibold text-sm">
                          {photographer.speciality}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {photographer.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {renderStars(photographer.rating)}
                        </div>
                        <span className="text-gray-600 text-sm">
                          ({photographer.reviews})
                        </span>
                      </div>

                      <div className="flex items-center space-x-1 text-primary">
                        <span className="text-sm font-semibold">View Work</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-sm">{photographer.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Camera className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-sm">{photographer.experience}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Showcase;
