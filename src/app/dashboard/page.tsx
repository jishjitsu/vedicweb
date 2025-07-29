'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createClient } from '../../../lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Leaf, LogOut, Sparkles, BookOpen, Heart, Star } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
      
      if (!user) {
        router.push('/auth');
      }
    };

    getUser();
  }, [router, supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
            Vedic AI
          </span>
        </div>
        
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-700 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-amber-50"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to your spiritual journey
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Hello, {user.user_metadata?.name || user.email?.split('@')[0]}! 🙏
          </p>
          <p className="text-gray-500">
            Your path to inner wisdom begins here
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI Wisdom Guide
            </h3>
            <p className="text-gray-600">
              Get personalized insights from ancient Vedic texts powered by AI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Sacred Texts
            </h3>
            <p className="text-gray-600">
              Explore timeless wisdom from Bhagavad Gita and other sacred texts
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Mindful Living
            </h3>
            <p className="text-gray-600">
              Daily practices and meditations for a balanced spiritual life
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-center text-white"
        >
          <Star className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            Begin Your Journey Today
          </h2>
          <p className="text-amber-100 mb-6">
            Start your first conversation with our AI wisdom guide and discover insights tailored to your spiritual path.
          </p>
          <button className="bg-white text-amber-600 px-8 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-colors">
            Start Your First Session
          </button>
        </motion.div>
      </div>
    </div>
  );
}
