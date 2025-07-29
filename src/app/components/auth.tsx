'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Leaf, 
  ArrowRight,
  User,
  ArrowLeft,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export default function Auth() {
  const [step, setStep] = useState(1); // 1: email, 2: details
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const router = useRouter();
  const supabase = createClient();

  // Check for error in URL params (from auth callback)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error');
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      setStep(2);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isLogin) {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        if (data.user) {
          router.push('/dashboard');
        }
      } else {
        // Sign up new user
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            },
            emailRedirectTo: `${window.location.origin}/verify`,
          },
        });

        if (error) throw error;

        if (data.user && !data.session) {
          setMessage('Please check your email for verification link!');
        } else if (data.session) {
          router.push('/dashboard');
        }
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setLoading(false);
    }
  };

  const goBackToEmail = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex flex-col">
      {/* Sacred Geometry Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <pattern id="sacred-geometry-auth" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#D97706" strokeWidth="1"/>
            <circle cx="20" cy="20" r="15" fill="none" stroke="#EA580C" strokeWidth="0.5"/>
            <circle cx="80" cy="80" r="15" fill="none" stroke="#EA580C" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#sacred-geometry-auth)"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        {/* Left side - Auth content */}
        <div className="w-full max-w-lg relative z-10 ml-20 flex flex-col items-center">
          {/* Logo and Back Button Container */}
          <div className="mb-8 relative flex justify-center w-full">
            {/* Back Button - positioned to the left */}
            <div className="absolute left-10 top-1/2 transform -translate-y-1/2">
              <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-amber-600 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-400 transition-all duration-200 backdrop-blur-sm">
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M19 12H5" />
                    <path d="M12 19L5 12L12 5" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Back</span>
              </Link>
            </div>
            
            {/* Logo - centered */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-20 h-20 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
                Vedic AI
              </span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-5 border border-amber-100 max-w-md min-h-[400px] flex flex-col justify-start"
          >
            {step === 1 ? (
              // Step 1: Email Input
              <>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-500 text-center mb-4"
                >
                  Get started with your email below
                </motion.p>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  {/* Error/Success Messages */}
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                  {message && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      {message}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-gray-900"
                        placeholder="Enter your email"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {loading ? 'Connecting...' : 'Continue with Google'}
                  </button>
                </form>
              </>
            ) : (
              // Step 2: Additional Details
              
              <>
                <div className="flex items-center mb-4">
                  <button
                    onClick={goBackToEmail}
                    className="text-amber-600 hover:text-amber-700 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <div className="flex-1 text-center">
                    <p className="text-sm text-gray-500">
                      {formData.email}
                    </p>
                  </div>
                </div>

                {/* Auth Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      isLogin 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      !isLogin 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  {/* Error/Success Messages */}
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                  {message && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      {message}
                    </div>
                  )}

                  <AnimatePresence>
                    {!isLogin && (
                      <motion.div
                        key="fullname"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-gray-900"
                            placeholder="Enter your full name"
                            required={!isLogin}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-gray-900"
                        placeholder="Enter your password"
                        required
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {isLogin && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                        <span className="ml-2 text-gray-600">Remember me</span>
                      </label>
                      <button type="button" className="text-amber-600 hover:text-amber-700 font-medium">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                      </>
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            )}

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center mt-6">
              By continuing, you agree to Vedic AI&apos;s{' '}
              <button className="text-amber-600 hover:underline">Terms of Service</button> and{' '}
              <button className="text-amber-600 hover:underline">Privacy Policy</button>, and acknowledge their{' '}
              <button className="text-amber-600 hover:underline">AI Notice</button>.
            </p>
          </motion.div>
        </div>

        {/* Right side - Image placeholder */}
        <div className="hidden lg:flex flex-1 relative z-10 h-screen">
                <Image
                width={900}
                height={600}
                src="/authkosam.jpg"
                alt="Authentication Illustration"
                className="ml-20 object-cover w-full h-full"
                />
        </div>
      </div>
    </div>
  );
}
