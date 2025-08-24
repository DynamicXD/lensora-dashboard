import React, { useState, useEffect } from 'react';
import { Star, Camera, Video, Mic, Calendar, Tag, TrendingUp, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar'; // Import your custom navbar
import Footer from '../Footer';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [displayRating, setDisplayRating] = useState(0);
  const [filterRating, setFilterRating] = useState('all');

  // Enhanced sample review data with ratings between 3.5-4.5
  const sampleReviews = [
    {
      id: 1,
      reviewerName: "Sarah Johnson",
      reviewerRole: "Event Coordinator",
      reviewerPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.5,
      reviewText: "Absolutely amazing work! This photographer captured every precious moment of our wedding day. Their attention to detail and creative eye made our photos truly special. The entire experience was seamless and professional.",
      date: "March 15, 2024",
      eventType: "Wedding Photography",
      location: "Central Park, NYC",
      duration: "8 hours",
      tags: ["Wedding", "Portrait", "Outdoor"]
    },
    {
      id: 2,
      reviewerName: "Mike Rodriguez",
      reviewerRole: "Marketing Director",
      reviewerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.2,
      reviewText: "Great videography skills and very professional approach. The final video exceeded our expectations and perfectly captured the energy of our corporate event. Highly recommend for business events!",
      date: "February 28, 2024",
      eventType: "Corporate Event Coverage",
      location: "Manhattan Convention Center",
      duration: "6 hours",
      tags: ["Corporate", "Event", "Professional"]
    },
    {
      id: 3,
      reviewerName: "Emily Chen",
      reviewerRole: "Art Director",
      reviewerPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviewText: "Incredible talent for making everyone feel comfortable during shoots. The family portraits came out beautifully and we couldn't be happier! The creativity and professionalism were outstanding.",
      date: "February 10, 2024",
      eventType: "Family Portrait Session",
      location: "Brooklyn Studio",
      duration: "3 hours",
      tags: ["Family", "Portrait", "Studio"]
    },
    {
      id: 4,
      reviewerName: "David Park",
      reviewerRole: "Content Creator",
      reviewerPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 3.9,
      reviewText: "Professional quality work delivered on time and within budget. Great communication throughout the project and excellent attention to detail. Would definitely work with them again!",
      date: "January 22, 2024",
      eventType: "Content Creation Shoot",
      location: "Queens Studio",
      duration: "4 hours",
      tags: ["Content", "Commercial", "Indoor"]
    },
    {
      id: 5,
      reviewerName: "Lisa Thompson",
      reviewerRole: "HR Manager",
      reviewerPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 4.1,
      reviewText: "Fantastic experience from start to finish. The photographer was punctual, creative, and delivered high-quality images that perfectly captured our team's personality and company culture.",
      date: "January 8, 2024",
      eventType: "Corporate Headshots",
      location: "Office Building, NYC",
      duration: "5 hours",
      tags: ["Corporate", "Headshots", "Professional"]
    },
    {
      id: 6,
      reviewerName: "James Wilson",
      reviewerRole: "Wedding Planner",
      reviewerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 4.6,
      reviewText: "Amazing work ethic and creative vision! The engagement shoot photos were stunning and the couple was thrilled. Professional, punctual, and produced exceptional results that exceeded all expectations.",
      date: "December 20, 2023",
      eventType: "Engagement Photography",
      location: "Brooklyn Bridge Park",
      duration: "2 hours",
      tags: ["Engagement", "Outdoor", "Romantic"]
    }
  ];

  // Calculate average rating
  useEffect(() => {
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      setAverageRating(avg);
    }
  }, [reviews]);

  // Rolling number animation for average rating
  useEffect(() => {
    if (averageRating > 0) {
      let current = 0;
      const increment = averageRating / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= averageRating) {
          current = averageRating;
          clearInterval(timer);
        }
        setDisplayRating(current);
      }, 50);
      return () => clearInterval(timer);
    }
  }, [averageRating]);

  // Load reviews
  useEffect(() => {
    const timer = setTimeout(() => {
      setReviews(sampleReviews);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Filter reviews by rating
  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(review => Math.floor(review.rating) === parseInt(filterRating));

  // Star component
  const StarRating = ({ rating, size = "w-4 h-4" }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : star === Math.ceil(rating) && rating % 1 !== 0
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Review Card Component with 3D Flip
  const ReviewCard = ({ review, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="relative w-full h-80 cursor-pointer perspective-1000"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
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
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="p-6 flex flex-col items-center text-center h-full">
              {/* Profile Photo */}
              <motion.div
                className="relative mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={review.reviewerPhoto}
                  alt={review.reviewerName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-purple-100 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              </motion.div>

              {/* Reviewer Info */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{review.reviewerName}</h3>
              <p className="text-purple-600 font-semibold mb-4">{review.reviewerRole}</p>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={review.rating} size="w-5 h-5" />
              </div>

              {/* Event Type */}
              <div className="bg-purple-50 px-4 py-2 rounded-full mb-4">
                <p className="text-purple-700 font-medium text-sm">{review.eventType}</p>
              </div>

              {/* Date */}
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{review.date}</span>
              </div>

              {/* Hover Indicator */}
              <div className="mt-auto">
                <p className="text-xs text-gray-400 italic">Hover to see review</p>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-lg overflow-hidden text-white"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center mb-4">
                <img
                  src={review.reviewerPhoto}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                />
                <div className="ml-3">
                  <h4 className="font-bold text-white">{review.reviewerName}</h4>
                  <StarRating rating={review.rating} size="w-4 h-4" />
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-1 mb-4">
                <p className="text-white/90 leading-relaxed text-sm">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Event Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-white/80">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{review.location}</span>
                </div>
                <div className="flex items-center text-white/80">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{review.duration}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {review.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use your custom navbar */}
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-purple-600">Client</span> Reviews
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what our amazing clients say about their photography experience
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-purple-600 fill-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {displayRating.toFixed(1)}
            </h3>
            <p className="text-gray-600">Average Rating</p>
            <div className="mt-2">
              <StarRating rating={displayRating} size="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{reviews.length}</h3>
            <p className="text-gray-600">Total Reviews</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            {['all', '5', '4', '3'].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filterRating === rating
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {rating === 'all' ? 'All Reviews' : `${rating}+ Stars`}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Reviews Grid */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl p-12 shadow-lg max-w-md mx-auto">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Reviews Found</h3>
              <p className="text-gray-600">
                No reviews match your current filter. Try selecting a different rating.
              </p>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
