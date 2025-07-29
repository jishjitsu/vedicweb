'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function VerificationSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
            Vedic AI
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-amber-100 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Email verified successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Welcome to Vedic AI! You&apos;ll be redirected to your dashboard shortly.
            </p>
            <div className="flex items-center justify-center gap-2 text-amber-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
              <span className="text-sm">Redirecting...</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
