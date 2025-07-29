'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase';
import { Leaf, CheckCircle, XCircle, Mail } from 'lucide-react';
import Link from 'next/link';

function VerifyEmailContent() {
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Get all possible URL parameters
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        const code = searchParams.get('code');

        console.log('URL params:', { token_hash, type, token, email, code });

        // Method 1: Use token_hash (newer Supabase format)
        if (token_hash && type) {
          console.log('Using token_hash method');
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as 'email',
          });

          if (error) {
            console.error('Verification error (token_hash):', error);
            setError(error.message);
          } else {
            setVerified(true);
            setTimeout(() => {
              router.push('/dashboard');
            }, 3000);
          }
        }
        // Method 2: Handle auth code with PKCE flow (client-side)
        else if (code) {
          console.log('Using code method with PKCE flow');
          try {
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) {
              console.error('Verification error (code):', error);
              // Check if user is already logged in
              const { data: userData } = await supabase.auth.getUser();
              if (userData?.user) {
                // User is already authenticated, treat as success
                setVerified(true);
                setTimeout(() => {
                  router.push('/dashboard');
                }, 3000);
              } else {
                setError(error.message);
              }
            } else if (data.session) {
              console.log('Session established successfully');
              setVerified(true);
              setTimeout(() => {
                router.push('/dashboard');
              }, 3000);
            } else {
              setError('No session created after code exchange');
            }
          } catch (codeError) {
            console.error('Code exchange error:', codeError);
            setError(codeError instanceof Error ? codeError.message : 'Failed to exchange code for session');
          }
        }
        // Method 3: Use token and email (legacy format)
        else if (token && email) {
          console.log('Using token/email method');
          const { error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email',
          });

          if (error) {
            console.error('Verification error (token/email):', error);
            setError(error.message);
          } else {
            setVerified(true);
            setTimeout(() => {
              router.push('/dashboard');
            }, 3000);
          }
        }
        // No valid parameters found
        else {
          console.error('Missing verification parameters');
          setError('Invalid verification link - missing required parameters');
        }
      } catch (error) {
        console.error('Verification process error:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
      
      setVerifying(false);
    };

    verifyEmail();
  }, [searchParams, router, supabase.auth]);

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
            {verifying ? (
              <>
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-6"></div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Verifying your email...
                </h1>
                <p className="text-gray-600">
                  Please wait while we confirm your email address.
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left text-xs">
                    <p><strong>Debug info:</strong></p>
                    <p>token_hash: {searchParams.get('token_hash') || 'missing'}</p>
                    <p>type: {searchParams.get('type') || 'missing'}</p>
                    <p>token: {searchParams.get('token') || 'missing'}</p>
                    <p>email: {searchParams.get('email') || 'missing'}</p>
                    <p>code: {searchParams.get('code') || 'missing'}</p>
                  </div>
                )}
              </>
            ) : verified ? (
              <>
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
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Verification failed
                </h1>
                <p className="text-gray-600 mb-6">
                  {error || 'There was an error verifying your email. Please try again.'}
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left text-xs">
                    <p><strong>Debug info:</strong></p>
                    <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'unknown'}</p>
                    <p>token_hash: {searchParams.get('token_hash') || 'missing'}</p>
                    <p>type: {searchParams.get('type') || 'missing'}</p>
                    <p>token: {searchParams.get('token') || 'missing'}</p>
                    <p>email: {searchParams.get('email') || 'missing'}</p>
                    <p>code: {searchParams.get('code') || 'missing'}</p>
                    <p>Error: {error}</p>
                  </div>
                )}
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
