'use client';

import { motion } from 'framer-motion';
import { Leaf, User, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
            Vedic AI
          </span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link 
            href="/auth"
            className="text-gray-600 hover:text-amber-700 transition-colors font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-amber-50"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>
          <Link 
            href="/auth"
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Sign Up
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
