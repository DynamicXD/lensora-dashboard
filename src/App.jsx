import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute' // Add this import


import SignUp from '../src/components/auth/SignUp'
import Login from '../src/components/auth/Login'
import UserTypeSelector from '../src/components/auth/UserTypeSelector'
import UserLogin from '../src/components/auth/UserLogin'
import UserSignup from '../src/components/auth/UserSignup'
import UserDashboard from './components/user/UserDashboard'
import PhotographerDashboard from './components/photographer/PhotographerDashboard'
import Payment from './components/user/Payment'
import Showcase from './components/user/Showcase'
import Reviews from './components/photographer/Reviews'
import EarningsDashboard from './components/photographer/Earnings'
import PhotographerBookings from './components/photographer/PhotographerBooking'
import MyBookings from './components/user/MyBookings'
import AutoRedirect from './components/AutoRedirect'


function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes - Landing/Auth */}
        <Route path="/" element={
          <div>
            <AutoRedirect />
            <UserTypeSelector />
          </div>
        } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        
        {/* Protected User Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/payment" element={
          <ProtectedRoute allowedRoles={['user']}>
            <Payment />
          </ProtectedRoute>
        } />
        
        <Route path="/showcase" element={
          <ProtectedRoute allowedRoles={['user']}>
            <Showcase />
          </ProtectedRoute>
        } />


        <Route path="/bookings" element={
          <ProtectedRoute allowedRoles={['user']}>
            <MyBookings />
          </ProtectedRoute>
        } />
        
        {/* Protected Photographer Routes */}
        <Route path="/photographer/dashboard" element={
          <ProtectedRoute allowedRoles={['photographer']}>
            <PhotographerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/photographer/reviews" element={
          <ProtectedRoute allowedRoles={['photographer']}>
            <Reviews />
          </ProtectedRoute>
        } />
        
        <Route path="/photographer/earnings" element={
          <ProtectedRoute allowedRoles={['photographer']}>
            <EarningsDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/photographer/bookings" element={
          <ProtectedRoute allowedRoles={['photographer']}>
            <PhotographerBookings />
          </ProtectedRoute>
        } />
        
        {/* Catch all route - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}


export default App