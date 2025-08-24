import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signinImg from "../../../images/signin.jpg";
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Add this name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'photographer',
        businessName: "Jane Photography Studio",
        description: "Professional wedding and portrait photographer with 5+ years experience",
        specializations: ["wedding", "portrait", "event"]
      };

      const response = await axios.post('http://localhost:5000/api/auth/register', payload);

      if (response.status === 201 || response.status === 200) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        navigate("/photographer/dashboard"); // Redirect to photographer dashboard
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: error.response?.data?.message || "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left form section */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <button
            className="text-gray-600 mb-6 text-sm flex items-center hover:text-gray-800 transition-colors"
            onClick={() => navigate(-1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 text-sm mt-2">Get started with your free account</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-violet-600 text-white py-3 mt-2 rounded-lg font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : "Sign Up"}
            </button>

            {errors.submit && <p className="text-red-500 text-xs text-center">{errors.submit}</p>}
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-200" />
            <span className="px-3 text-gray-400 text-sm">or continue with</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              className="flex-1 flex items-center justify-center py-2.5 bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-colors text-sm font-medium"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="flex-1 flex items-center justify-center py-2.5 bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-colors text-sm font-medium"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link className="text-violet-600 font-medium hover:text-violet-700 transition-colors" to="/login">
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Right image section */}
      <div className="hidden md:block flex-1 relative">
        <img src={signinImg} alt="Sign up visual" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent"></div>
      </div>
    </div>
  );
}

export default SignUp;