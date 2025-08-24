import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userImg from "../../../images/user.png";
import photographerImg from "../../../images/photographer.png";

function UserTypeSelector() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleUserTypeSelect = (userType) => {
    setSelectedType(userType);
    setIsExiting(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      if (userType === "user") {
        navigate("/user/login", { state: { userType } });
      } else if (userType === "photographer") {
        navigate("/signup", { state: { userType } });
      }
    }, 500);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 transition-opacity duration-500 ${isExiting ? "opacity-0" : "opacity-100"}`}>
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Welcome to Capture Moments</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Whether you're looking to preserve memories or showcase your creative talent, 
          we're here to help you every step of the way.
        </p>
      </div>
      
      <div className="text-center mb-12 animate-fade-in-delay">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">How would you like to use our platform?</h2>
        <p className="text-gray-500">Select your role to get started</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 w-full max-w-5xl justify-center animate-fade-in-delay-2">
        {/* User Card */}
        <div 
          className={`flex flex-col items-center p-8 rounded-2xl bg-white shadow-xl border-2 transition-all duration-300 cursor-pointer transform ${
            selectedType === "user" 
              ? "border-violet-500 scale-105" 
              : "border-transparent hover:border-violet-200 hover:scale-105"
          }`}
          onClick={() => handleUserTypeSelect("user")}
        >
          <div className="w-52 h-52 flex items-center justify-center mb-6 rounded-full bg-gradient-to-br from-pink-50 to-violet-50 p-5 shadow-md">
            <img
              src={userImg}
              alt="User"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">User</h3>
          <p className="text-gray-600 text-center mb-6 max-w-xs leading-relaxed">
            Find and book professional photographers for your special events, portraits, or commercial needs
          </p>
          <div className="mt-auto">
            <button
              className={`px-10 py-4 rounded-full font-medium transition-all duration-300 ${
                selectedType === "user"
                  ? "bg-violet-600 text-white shadow-lg"
                  : "bg-pink-100 text-gray-800 hover:bg-pink-200 hover:shadow-md"
              }`}
            >
              Continue as User
            </button>
          </div>
        </div>

        {/* Divider for mobile */}
        <div className="flex items-center justify-center my-4 md:hidden">
          <div className="h-0.5 w-20 bg-gray-300"></div>
          <span className="px-4 text-gray-500 font-medium">or</span>
          <div className="h-0.5 w-20 bg-gray-300"></div>
        </div>

        {/* Photographer/Videographer Card */}
        <div 
          className={`flex flex-col items-center p-8 rounded-2xl bg-white shadow-xl border-2 transition-all duration-300 cursor-pointer transform ${
            selectedType === "photographer" 
              ? "border-violet-500 scale-105" 
              : "border-transparent hover:border-violet-200 hover:scale-105"
          }`}
          onClick={() => handleUserTypeSelect("photographer")}
        >
          <div className="w-52 h-52 flex items-center justify-center mb-6 rounded-full bg-gradient-to-br from-pink-50 to-violet-50 p-5 shadow-md">
            <img
              src={photographerImg}
              alt="Photographer/Videographer"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Creative Professional</h3>
          <p className="text-gray-600 text-center mb-6 max-w-xs leading-relaxed">
            Showcase your portfolio, manage bookings, and grow your photography or videography business
          </p>
          <div className="mt-auto">
            <button
              className={`px-10 py-4 rounded-full font-medium transition-all duration-300 ${
                selectedType === "photographer"
                  ? "bg-violet-600 text-white shadow-lg"
                  : "bg-pink-100 text-gray-800 hover:bg-pink-200 hover:shadow-md"
              }`}
            >
              Continue as Professional
            </button>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-16 text-center text-gray-500 animate-fade-in-delay-3">
        <p>You can always change your role later in settings</p>
      </div>
    </div>
  );
}

export default UserTypeSelector;