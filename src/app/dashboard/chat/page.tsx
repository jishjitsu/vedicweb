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
  Send,
  Mic,
  Smile,
  Bookmark,
  Calendar,
  Heart
} from 'lucide-react';

export default function ChatPage() {
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
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all bg-white text-amber-700 shadow-sm"
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

      {/* Chat Section */}
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Chat Header */}
        <div className="p-4 bg-white/60 backdrop-blur-sm border-b border-amber-100">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Spiritual Guide</h2>
                <p className="text-sm text-gray-500">Online • Ready to guide you</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <Calendar className="w-4 h-4 inline mr-1" />
              Today's Session
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* AI Message */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-md p-4 shadow-sm border border-amber-100">
                  <p className="text-gray-800">
                    Namaste! 🙏 Welcome to your spiritual guidance session. I'm here to help you explore the wisdom of ancient texts like the Bhagavad Gita. What's on your mind today?
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <span>2:34 PM</span>
                  <Bookmark className="w-3 h-3 cursor-pointer hover:text-amber-600" />
                </div>
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-start gap-3 flex-row-reverse">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-semibold">
                  {user.user_metadata?.name?.[0] || user.email?.[0]?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl rounded-tr-md p-4 text-white ml-auto max-w-md">
                  <p>
                    I've been struggling with anxiety lately. Can you share some wisdom from the Gita that might help?
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 justify-end">
                  <span>2:35 PM</span>
                </div>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-tl-md p-4 shadow-sm border border-amber-100">
                  <p className="text-gray-800 mb-3">
                    I understand your struggle with anxiety. The Bhagavad Gita offers beautiful guidance on this. In Chapter 2, Verse 47, Krishna teaches:
                  </p>
                  <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-400 mb-3">
                    <p className="italic text-amber-900">
                      "You have a right to perform your prescribed duty, but you are not entitled to the fruits of your actions."
                    </p>
                  </div>
                  <p className="text-gray-800">
                    This teaches us to focus on our actions rather than worrying about outcomes. When we detach from results, anxiety naturally diminishes. Would you like to explore this concept further?
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <span>2:36 PM</span>
                  <Bookmark className="w-3 h-3 cursor-pointer hover:text-amber-600" />
                  <Heart className="w-3 h-3 cursor-pointer hover:text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white/60 backdrop-blur-sm border-t border-amber-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-amber-100">
              <Smile className="w-5 h-5 text-gray-400 cursor-pointer hover:text-amber-600" />
              <input
                type="text"
                placeholder="Share your thoughts or ask for guidance..."
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
              <Mic className="w-5 h-5 text-gray-400 cursor-pointer hover:text-amber-600" />
              <button className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white hover:shadow-md transition-all">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
