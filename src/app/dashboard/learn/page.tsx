'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createClient } from '../../../../lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { 
  Leaf, 
  LogOut, 
  MessageCircle, 
  BookOpen, 
  Headphones,
  Trophy,
  Star,
  Clock,
  Award,
  Flame
} from 'lucide-react';

export default function LearnPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [dailyStreak] = useState(7);
  const [completedVerses] = useState([1, 2, 3, 5]);
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
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-amber-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
            Vedic AI
          </span>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center gap-2 bg-amber-100 rounded-xl p-1">
          <button
            onClick={() => router.push('/dashboard/chat')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-amber-600 hover:bg-amber-50"
          >
            <MessageCircle className="w-4 h-4" />
            Chat
          </button>
          <button
            onClick={() => router.push('/dashboard/learn')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all bg-white text-amber-700 shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            Learn
          </button>
          <button
            onClick={() => router.push('/dashboard/audiobooks')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-amber-600 hover:bg-amber-50"
          >
            <Headphones className="w-4 h-4" />
            Audiobooks
          </button>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-700 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-amber-50"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Learn Section */}
      <div className="p-6 max-w-6xl mx-auto">
        {/* Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-amber-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{dailyStreak}</p>
                <p className="text-sm text-gray-500">Day Streak</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-amber-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completedVerses.length}</p>
                <p className="text-sm text-gray-500">Verses Read</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-amber-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">25</p>
                <p className="text-sm text-gray-500">Min Today</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-amber-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1,250</p>
                <p className="text-sm text-gray-500">XP Points</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Verse of the Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Verse of the Day</h2>
          </div>
          <div className="bg-white/20 rounded-xl p-4 mb-4">
            <p className="text-lg font-medium mb-2">Bhagavad Gita 2.47</p>
            <p className="italic mb-3">
              &quot;कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
              मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥&quot;
            </p>
            <p className="text-amber-100">
              You have a right to perform your prescribed duty, but you are not entitled to the fruits of your actions.
            </p>
          </div>
          <button className="bg-white text-amber-600 px-6 py-2 rounded-lg font-medium hover:bg-amber-50 transition-colors">
            Study This Verse
          </button>
        </motion.div>

        {/* Verses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((verse) => (
            <motion.div
              key={verse}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * verse }}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                completedVerses.includes(verse) 
                  ? 'border-green-200 bg-green-50/50' 
                  : 'border-amber-100 hover:border-amber-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Chapter 2, Verse {verse}</h3>
                  <p className="text-sm text-gray-500">Bhagavad Gita</p>
                </div>
                {completedVerses.includes(verse) && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                Sanskrit verse with profound meaning about dharma, duty, and spiritual wisdom...
              </p>
              <div className="flex items-center gap-2">
                <button className="text-amber-600 text-sm font-medium hover:text-amber-700">
                  Read More
                </button>
                <button className="text-gray-400 hover:text-amber-600">
                  <Headphones className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
