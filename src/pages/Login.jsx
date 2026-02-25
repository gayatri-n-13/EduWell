import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const user = await res.json();
        onLogin(user);
        navigate(user.role === 'admin' ? '/admin' : '/');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fffaf0] relative overflow-hidden">
      {/* Decorative Elements - Beach Vibes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 opacity-[0.05] rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500 opacity-[0.08] rounded-full blur-3xl" />
        {/* Wave pattern */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-5">
          <svg viewBox="0 0 1440 320" className="w-full h-full"><path fill="#008080" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-teal-100">
            <Heart size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-serif font-medium text-stone-900 mb-3 tracking-tight">Oceanic Wellness</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold">Your Sanctuary for Wellness</p>
        </div>

        <div className="bg-white p-10 md:p-12 rounded-[3rem] border border-stone-100 elegant-shadow">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-50 text-red-500 text-xs font-bold uppercase tracking-widest rounded-2xl text-center border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all font-medium text-stone-700"
                  placeholder="name@university.edu"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)] transition-all font-medium text-stone-700"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-[var(--color-brand-primary)] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-stone-200 hover:opacity-90 transition-all"
            >
              Enter Sanctuary
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-stone-50 text-center">
            <p className="text-stone-400 text-xs font-medium italic">
              &quot;Wellness is the natural state of being.&quot;
            </p>
          </div>
        </div>

        <div className="mt-8 text-center space-y-4">
          <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">Quick Access for Demo</p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => { setEmail('student@eduwell.com'); setPassword('student123'); }}
              className="px-4 py-2 bg-white border border-stone-100 rounded-full text-[10px] font-bold text-stone-500 hover:border-[var(--color-brand-primary)] transition-colors"
            >
              Student
            </button>
            <button 
              onClick={() => { setEmail('admin@eduwell.com'); setPassword('admin123'); }}
              className="px-4 py-2 bg-white border border-stone-100 rounded-full text-[10px] font-bold text-stone-500 hover:border-[var(--color-brand-primary)] transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
