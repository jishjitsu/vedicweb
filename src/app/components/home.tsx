'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Heart, 
  Brain, 
  Leaf, 
  Star, 
  ArrowRight, 
  Check, 
  Quote, 
  Download,
  PlayCircle,
  Shield,
  Clock,
  Users,
  Smartphone,
  ChevronDown
} from 'lucide-react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4">
        {/* Animated Background Elements */}
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-orange-100/20 to-red-100/20"
        />
        
        {/* Sacred Geometry Background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <pattern id="sacred-geometry" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#D97706" strokeWidth="1"/>
              <circle cx="20" cy="20" r="15" fill="none" stroke="#EA580C" strokeWidth="0.5"/>
              <circle cx="80" cy="80" r="15" fill="none" stroke="#EA580C" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#sacred-geometry)"/>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Ancient Wisdom, Modern Healing
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6 leading-tight"
          >
            Find Peace in
            <br />
            Life&apos;s Chaos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Vedic AI transforms your struggles into wisdom using personalized insights from the Bhagavad Gita. 
            Experience therapy that understands your cultural roots and guides you toward inner peace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button className="group bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Start Free Session
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-amber-600 text-amber-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-amber-50 transition-all duration-300 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download App
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center justify-center gap-8 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              Completely Confidential
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Available 24/7
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              10,000+ Sessions
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-amber-600" />
        </motion.div>
      </section>

      {/* Problem Section */}
      <ProblemSection />

      {/* Solution Section */}
      <SolutionSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Pricing */}
      <PricingSection />

      {/* Call to Action */}
      <CTASection />
    </div>
  );
}

function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Modern Life, Ancient Struggles
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You&apos;re successful on paper, but inside, you&apos;re battling stress, anxiety, and a deep sense that something&apos;s missing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "Mental Overwhelm",
              description: "Work stress, family pressure, and social expectations leave you emotionally drained and searching for purpose."
            },
            {
              icon: Heart,
              title: "Cultural Disconnect",
              description: "Western therapy feels foreign. You need guidance that resonates with your Indian values and spiritual understanding."
            },
            {
              icon: Star,
              title: "Affordable Access",
              description: "Quality mental health support shouldn't cost ₹3000+ per session. You deserve accessible, culturally-relevant help."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Therapy That Speaks Your Language
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vedic AI bridges ancient wisdom with modern AI to provide personalized mental health support rooted in your cultural heritage.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              {[
                {
                  title: "Culturally Rooted Wisdom",
                  description: "Every insight connects your personal struggles to timeless verses from the Bhagavad Gita, making healing feel familiar and meaningful."
                },
                {
                  title: "AI-Powered Personalization",
                  description: "Advanced AI analyzes your unique situation and matches you with the most relevant spiritual guidance and practical solutions."
                },
                {
                  title: "Affordable Mental Wellness",
                  description: "Professional-grade support starting at just ₹200 per month. Mental health shouldn't be a luxury."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Bhagavad Gita • Chapter 2, Verse 47</p>
                  <p className="text-gray-800 italic mb-3">
                    &ldquo;You have a right to perform your prescribed duty, but do not be attached to the fruits of your actions...&rdquo;
                  </p>
                  <p className="text-gray-600 text-sm">
                    This verse relates to your work stress. Focus on doing your best without obsessing over outcomes. 
                    Let&apos;s explore practical ways to apply this wisdom to your daily routine.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      title: "Share Your Story",
      description: "Tell Vedic AI about your challenges, emotions, and what's weighing on your mind in a safe, judgment-free space."
    },
    {
      number: "02", 
      title: "Receive Personalized Guidance",
      description: "Our AI analyzes your situation and provides relevant verses from the Bhagavad Gita with modern interpretations and actionable advice."
    },
    {
      number: "03",
      title: "Practice & Progress",
      description: "Follow personalized exercises, meditation practices, and daily wisdom to build resilience and find lasting peace."
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Journey to Inner Peace
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your struggles into wisdom and find the peace you&apos;ve been searching for.
          </p>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                  Step {step.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-lg text-gray-600">{step.description}</p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl flex items-center justify-center">
                  <span className="text-6xl font-bold text-amber-600/20">{step.number}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer, Bangalore",
      content: "Vedic AI helped me understand that my work anxiety wasn't a personal failing. The Gita verses gave me a new perspective on duty without attachment. I feel so much lighter now.",
      rating: 5
    },
    {
      name: "Rahul Gupta", 
      role: "Marketing Manager, Mumbai",
      content: "Finally, therapy that gets our culture. Instead of feeling guilty about family expectations, I learned to navigate them with wisdom. The insights are profound yet practical.",
      rating: 5
    },
    {
      name: "Anjali Reddy",
      role: "Entrepreneur, Hyderabad", 
      content: "At ₹200 per month, this is more affordable than my coffee budget, but infinitely more valuable. The personalized guidance feels like having a wise guru in my pocket.",
      rating: 5
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stories of Transformation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real people finding real peace through the timeless wisdom of the Bhagavad Gita.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const plans = [
    {
      name: "Seeker",
      price: "₹200",
      period: "/month",
      description: "Perfect for those beginning their journey to inner peace",
      features: [
        "5 AI therapy sessions per month",
        "Daily Gita verse with insights",
        "Basic meditation guides",
        "Community support access",
        "Progress tracking"
      ],
      popular: false
    },
    {
      name: "Devotee", 
      price: "₹500",
      period: "/month",
      description: "For deeper transformation and unlimited support",
      features: [
        "Unlimited AI therapy sessions",
        "Personalized daily wisdom",
        "Advanced meditation programs",
        "1-on-1 spiritual mentoring",
        "Priority support",
        "Exclusive workshops",
        "Family plan (up to 4 members)"
      ],
      popular: true
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Affordable Wellness for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mental health support shouldn&apos;t be a luxury. Choose the plan that fits your journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative p-8 rounded-3xl border-2 ${
                plan.popular 
                  ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50' 
                  : 'border-gray-200 bg-white'
              } hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg transform hover:-translate-y-1'
                  : 'border-2 border-amber-600 text-amber-700 hover:bg-amber-50'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">✨ 7-day free trial for all plans • Cancel anytime • No hidden costs</p>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Available on All Devices
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Journey to Peace Starts Today
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands who&apos;ve found clarity, purpose, and inner peace through the timeless wisdom of the Bhagavad Gita.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-amber-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-amber-50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Start Your Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download App
            </button>
          </div>

          <p className="text-amber-100 text-sm">
            &ldquo;Just as a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.&rdquo; - Bhagavad Gita 2.22
          </p>
        </motion.div>
      </div>
    </section>
  );
}