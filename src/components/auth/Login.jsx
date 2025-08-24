import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaLock, FaEnvelope } from "react-icons/fa";
import loginImg from "../../../images/login.jpg";
import axios from 'axios';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const formRef = useRef(null);
  const submitTimeout = useRef(null);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation (changed from 8 to 6 characters)
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Terms validation
    if (!formData.terms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      // Add shake animation on validation error
      const form = formRef.current;
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 500);
      return;
    }

    setIsSubmitting(true);
    setErrors(prev => ({ ...prev, submit: '' }));

    try {
      // Call your login API
      const response = await axios.post('https://lensora-api.onrender.com/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (!isMounted) return;

      if (response.status === 200 && response.data.token) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        console.log("Login successful", response.data);

        // Check if user is photographer and redirect accordingly
        if (response.data.user.role === 'photographer') {
          navigate("/photographer/dashboard");
        } else {
          // If not photographer, redirect to regular dashboard
          navigate("/dashboard");
        }
      }
    } catch (error) {
      if (!isMounted) return;

      let errorMessage = "Invalid email or password. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      setErrors(prev => ({ ...prev, submit: errorMessage }));
    } finally {
      if (isMounted) {
        setIsSubmitting(false);
      }
    }
  };

  // Calculate password strength
  const getPasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 1;  // Changed from 8 to 6
    if (password.length >= 10) strength += 1; // Changed from 12 to 10
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return Math.min(Math.floor((strength / 5) * 100), 100);
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColor = passwordStrength < 40 ? 'red' : passwordStrength < 70 ? 'yellow' : 'green';

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      if (submitTimeout.current) clearTimeout(submitTimeout.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-violet-100 opacity-20"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              scale: [1, 1 + Math.random() * 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Image */}
        <motion.div
          className="hidden md:block flex-1 relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-white/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent z-10"></div>
          <img
            src={loginImg}
            alt="Login visual"
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Right Form */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            ref={formRef}
          >
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-indigo-100 rounded-full opacity-50"></div>

            <div className="relative z-10">
              <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
                <button
                  className="flex items-center text-gray-600 hover:text-violet-700 transition-colors group"
                  onClick={() => navigate(-1)}
                  aria-label="Go back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Back</span>
                </button>

                <div className="text-right">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Welcome Back</h2>
                  <p className="text-gray-600 text-sm">Sign in to your account</p>
                </div>
              </motion.div>

              {errors.submit && (
                <motion.div
                  className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-start mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.submit}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div variants={itemVariants} className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200 ${errors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-200 focus:border-violet-500 focus:ring-violet-100'
                        }`}
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm ml-1">
                      {errors.email}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Your password"
                      className={`w-full pl-10 pr-12 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200 ${errors.password
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-gray-200 focus:border-violet-500 focus:ring-violet-100'
                        }`}
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-violet-600 focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {formData.password && (
                    <div className="mt-2">
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passwordStrength < 40
                            ? 'bg-red-500'
                            : passwordStrength < 70
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            }`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Password strength:
                        <span className={`font-medium ${passwordStrength < 40
                          ? 'text-red-500'
                          : passwordStrength < 70
                            ? 'text-yellow-500'
                            : 'text-green-500'
                          }`}>
                          {passwordStrength < 40 ? 'Weak' : passwordStrength < 70 ? 'Good' : 'Strong'}
                        </span>
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p id="password-error" className="text-red-500 text-sm ml-1">
                      {errors.password}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        className="sr-only"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${formData.rememberMe
                        ? 'bg-violet-600 border-violet-600'
                        : 'border-gray-300 hover:border-violet-400'
                        }`}>
                        {formData.rememberMe && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span>Remember me</span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-violet-600 hover:text-violet-700 hover:underline focus:outline-none focus:ring-2 focus:ring-violet-300 rounded transition-colors"
                  >
                    Forgot password?
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                        checked={formData.terms}
                        onChange={handleChange}
                        aria-invalid={!!errors.terms}
                        aria-describedby={errors.terms ? 'terms-error' : undefined}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-medium text-gray-700">
                        I agree to the{' '}
                        <a href="#" className="text-violet-600 hover:text-violet-500 hover:underline">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-violet-600 hover:text-violet-500 hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                      {errors.terms && (
                        <p id="terms-error" className="text-red-500 text-sm mt-1">
                          {errors.terms}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <motion.button
                    type="submit"
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-200 flex items-center justify-center ${isSubmitting || !formData.terms
                      ? 'bg-violet-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg hover:shadow-violet-200'
                      }`}
                    disabled={isSubmitting || !formData.terms}
                    whileTap={{
                      scale: isSubmitting || !formData.terms ? 1 : 0.98,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      <span className="flex items-center">
                        <span>Sign in</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              </form>

              <motion.div variants={itemVariants} className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-3"
                variants={itemVariants}
              >
                <motion.button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all"
                  whileHover={{ y: -2, boxShadow: '0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { }}
                >
                  <FaGoogle className="w-5 h-5 text-red-500 mr-2" />
                  Google
                </motion.button>
                <motion.button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all"
                  whileHover={{ y: -2, boxShadow: '0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { }}
                >
                  <FaFacebook className="w-5 h-5 text-blue-600 mr-2" />
                  Facebook
                </motion.button>
              </motion.div>

              <motion.p
                className="text-sm text-center text-gray-600 mt-6"
                variants={itemVariants}
              >
                Don't have an account?{' '}
                <Link
                  to="/photographer/signup"
                  className="font-semibold text-violet-600 hover:text-violet-700 hover:underline focus:outline-none focus:ring-2 focus:ring-violet-300 rounded transition-colors"
                >
                  Sign up now
                </Link>
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
