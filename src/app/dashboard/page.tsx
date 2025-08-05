'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../../lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { 
  Leaf, 
  LogOut, 
  MessageCircle, 
  BookOpen, 
  Headphones,
  ArrowRight
} from 'lucide-react';

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
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-amber-600 hover:bg-amber-50"
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your AI Spiritual Therapist
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            Welcome back, {user.user_metadata?.name || user.email?.split('@')[0]}! 🙏
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Find peace, guidance, and healing through personalized therapy sessions powered by ancient wisdom from Hindu scriptures
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-1 gap-8 mb-16 max-w-4xl mx-auto">
          {/* Primary Therapy Card - Featured */}
          <div 
            onClick={() => router.push('/dashboard/chat')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-12 shadow-2xl cursor-pointer group hover:shadow-3xl transition-all hover:-translate-y-2 text-white"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">
                Start Your Therapy Session
              </h3>
              <p className="text-xl text-amber-100 mb-8 leading-relaxed">
                Connect with your AI spiritual therapist for personalized guidance, emotional support, and wisdom from ancient Hindu scriptures. Whether you're dealing with anxiety, seeking purpose, or need spiritual guidance.
              </p>
              <div className="flex items-center justify-center text-white font-semibold text-lg group-hover:gap-4 transition-all">
                Begin Session Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
          
          {/* Supporting Features */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Learn Card */}
            <div 
              onClick={() => router.push('/dashboard/learn')}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100 cursor-pointer group hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Therapeutic Reading
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Explore verses from sacred texts for healing and reflection. Build positive habits through daily spiritual practice.
              </p>
              <div className="flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                Explore Verses
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Audiobooks Card */}
            <div 
              onClick={() => router.push('/dashboard/audiobooks')}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-100 cursor-pointer group hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Mindful Listening
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Relax and heal through guided spiritual audio sessions. Listen to calming recitations for meditation and peace.
              </p>
              <div className="flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                Start Listening
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start CTA */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to begin your spiritual journey?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Start with a conversation with our AI guide, explore ancient wisdom, or listen to sacred texts - choose your path
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/dashboard/chat')}
              className="bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
            >
              Start AI Chat Session
            </button>
            <button 
              onClick={() => router.push('/dashboard/learn')}
              className="bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors"
            >
              Explore Verses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
