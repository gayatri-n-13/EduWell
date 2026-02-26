import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Users, Shield, Sparkles, X, ChevronRight, User, Calendar, Mail, Lock, AtSign } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();   // ✅ Added
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1);
  const [formData, setFormData] = useState({ 
    name: '', 
    username: '',
    email: '',
    password: '',
    age: '', 
    role: '' 
  });

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const mockUser = {
      id: Date.now(),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      role: formData.role,
      age: formData.age
    };

    localStorage.setItem('user', JSON.stringify(mockUser));

    // ✅ Replaced window.location.href
    navigate(mockUser.role === 'admin' ? '/admin' : '/');
  };

  return (
    <div className="min-h-screen bg-[#fffaf0]">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-[#87CEEB] to-[#008080] overflow-hidden">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-12 backdrop-blur-sm">
            <Heart size={14} className="text-white" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">
              Oceanic Wellness Sanctuary
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-medium text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
            Your Path to Better 
            <span className="block italic text-white/50 mt-2">
              Health & Wellness
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 font-serif italic mb-12 max-w-2xl mx-auto leading-relaxed">
            Breathe in the tranquility. Access personalized wellness programs and support services designed for the modern student.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/login"
              className="w-full sm:w-auto px-10 py-5 bg-white text-[#008080] rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all"
            >
              Log In
            </Link>
            <button 
              onClick={() => { setShowSignUp(true); setSignUpStep(1); }}
              className="w-full sm:w-auto px-10 py-5 bg-[#f4a460] text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all"
            >
              Sign Up
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- Everything else in your file remains EXACTLY the same --- */}
      
      {/* Sign Up Modal */}
      <AnimatePresence>
        {showSignUp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSignUp(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              {/* Your entire modal form stays unchanged */}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}