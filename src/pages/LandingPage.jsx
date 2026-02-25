import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Users, Shield, Sparkles, X, ChevronRight, User, Calendar, Mail, Lock, AtSign } from 'lucide-react';

export default function LandingPage() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1); // 1: Role, 2: Details
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
    // In a real app, we'd send this to the server. 
    // For the demo, we'll just simulate a login.
    const mockUser = {
      id: Date.now(),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      role: formData.role,
      age: formData.age
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    window.location.href = mockUser.role === 'admin' ? '/admin' : '/';
  };

  return (
    <div className="min-h-screen bg-[#fffaf0]">
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-[#87CEEB] to-[#008080] overflow-hidden">
        {/* Background Pattern - Waves */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 50 Q 25 40 50 50 T 100 50 V 100 H 0 Z" fill="white" opacity="0.1" />
            <path d="M0 60 Q 25 50 50 60 T 100 60 V 100 H 0 Z" fill="white" opacity="0.1" />
          </svg>
        </div>
        
        {/* Decorative Glows - Sun */}
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-yellow-200/20 rounded-full blur-[100px]" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-12 backdrop-blur-sm">
            <Heart size={14} className="text-white" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">Oceanic Wellness Sanctuary</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-medium text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
            Your Path to Better 
<<<<<<< HEAD
            <span className="block italic text-white/50 mt-2">Health & Wellness </span>
=======
            <span className="block italic text-white/50 mt-2">Health & Wellness</span>
>>>>>>> 5cac03defc43eba7a5eaa45fe9f50553aed774ec
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

      {/* Section 2: Features */}
      <section className="py-32 px-6 bg-[#fffaf0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-6">Why Choose Our Platform?</h2>
            <p className="text-stone-500 font-serif italic text-lg max-w-2xl mx-auto">
              Comprehensive wellness support tailored to the unique needs of university students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Personalized Care',
                desc: 'Access resources and programs tailored to your individual wellness journey and goals.',
                icon: Heart,
                color: 'bg-teal-50 text-teal-600'
              },
              {
                title: 'Expert Support',
                desc: 'Connect with trained professionals who understand student life and mental health.',
                icon: Users,
                color: 'bg-orange-50 text-orange-600'
              },
              {
                title: 'Safe & Confidential',
                desc: 'Your privacy and security are our top priorities. All information is kept confidential.',
                icon: Shield,
                color: 'bg-stone-50 text-stone-600'
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[3rem] border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">{feature.title}</h3>
                <p className="text-stone-500 font-serif italic leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: CTA & Footer */}
      <section className="relative pt-32 bg-gradient-to-t from-[#004d40] to-[#008080] overflow-hidden">
        {/* CTA Area */}
        <div className="px-6 pb-32 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Sparkles size={48} className="text-orange-300 mx-auto mb-8" strokeWidth={1} />
              <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-8">Ready to Start Your Wellness Journey?</h2>
              <p className="text-white/60 font-serif italic text-xl mb-12 max-w-2xl mx-auto">
                Join thousands of students who are taking control of their health and well-being.
              </p>
              <button 
                onClick={() => { setShowSignUp(true); setSignUpStep(1); }}
                className="inline-flex items-center gap-3 px-12 py-6 bg-[#f4a460] text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all"
              >
                Get Started Today
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-20 bg-[#002d26]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <Heart size={24} className="text-teal-400" />
                  <span className="text-2xl font-serif font-medium text-white">Oceanic Wellness</span>
                </div>
                <p className="text-white/40 font-serif italic max-w-xs">
                  Supporting student health and well-being across campus.
                </p>
              </div>

              <div>
                <h4 className="text-white text-[10px] uppercase tracking-widest font-bold mb-8">Quick Links</h4>
                <ul className="space-y-4 text-white/50 text-sm font-serif italic">
                  <li><Link to="/login" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/login" className="hover:text-white transition-colors">Resources</Link></li>
                  <li><Link to="/login" className="hover:text-white transition-colors">Support</Link></li>
                  <li><Link to="/login" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white text-[10px] uppercase tracking-widest font-bold mb-8">Emergency</h4>
                <p className="text-white/50 text-sm font-serif italic mb-4">If you&apos;re in crisis, call:</p>
                <p className="text-white text-xl font-serif font-medium">988 - Crisis Hotline</p>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 text-center">
              <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
                © 2026 Oceanic Wellness Sanctuary. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </section>

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
              <button 
                onClick={() => setShowSignUp(false)}
                className="absolute top-8 right-8 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="p-12">
                {signUpStep === 1 ? (
                  <div className="text-center">
                    <h2 className="text-4xl font-serif font-medium text-stone-900 mb-4">Join the Sanctuary</h2>
                    <p className="text-stone-500 font-serif italic mb-12">Choose your path in our wellness community.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <button 
                        onClick={() => { setFormData({...formData, role: 'student'}); setSignUpStep(2); }}
                        className="p-8 bg-teal-50 border border-teal-100 rounded-[2rem] text-center group hover:bg-teal-100 transition-all"
                      >
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-6 shadow-sm">
                          <Users size={24} />
                        </div>
                        <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">I want to be a student</h3>
                        <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Access Resources</p>
                      </button>

                      <button 
                        onClick={() => { setFormData({...formData, role: 'admin'}); setSignUpStep(2); }}
                        className="p-8 bg-orange-50 border border-orange-100 rounded-[2rem] text-center group hover:bg-orange-100 transition-all"
                      >
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 mx-auto mb-6 shadow-sm">
                          <Shield size={24} />
                        </div>
                        <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">I want to be an admin</h3>
                        <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Manage Content</p>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-center mb-10">
                      <h2 className="text-4xl font-serif font-medium text-stone-900 mb-4">Tell us about yourself</h2>
                      <p className="text-stone-500 font-serif italic">We&apos;ll tailor your experience to your needs.</p>
                    </div>

                    <form onSubmit={handleSignUpSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                          <input 
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full pl-14 pr-6 py-3 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium text-sm"
                            placeholder="Alex Johnson"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Username</label>
                          <div className="relative">
                            <AtSign className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                            <input 
                              type="text"
                              required
                              value={formData.username}
                              onChange={(e) => setFormData({...formData, username: e.target.value})}
                              className="w-full pl-14 pr-6 py-3 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium text-sm"
                              placeholder="alexj"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Age</label>
                          <div className="relative">
                            <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                            <input 
                              type="number"
                              required
                              value={formData.age}
                              onChange={(e) => setFormData({...formData, age: e.target.value})}
                              className="w-full pl-14 pr-6 py-3 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium text-sm"
                              placeholder="21"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                          <input 
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full pl-14 pr-6 py-3 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium text-sm"
                            placeholder="alex@university.edu"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                          <input 
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full pl-14 pr-6 py-3 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium text-sm"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex gap-4">
                        <button 
                          type="button"
                          onClick={() => setSignUpStep(1)}
                          className="flex-1 py-5 border border-stone-100 text-stone-400 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-stone-50 transition-all"
                        >
                          Back
                        </button>
                        <button 
                          type="submit"
                          className="flex-[2] py-5 bg-teal-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-teal-100 hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                        >
                          Complete Registration
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
