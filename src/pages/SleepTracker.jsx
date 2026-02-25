import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Clock, Sparkles, Wind, Waves, Anchor } from 'lucide-react';

export default function SleepTracker() {
  const [sleepHours, setSleepHours] = useState(7);
  const weeklyData = [
    { day: 'Mon', hours: 7.5 },
    { day: 'Tue', hours: 6.0 },
    { day: 'Wed', hours: 8.0 },
    { day: 'Thu', hours: 7.0 },
    { day: 'Fri', hours: 6.5 },
    { day: 'Sat', hours: 9.0 },
    { day: 'Sun', hours: 8.5 },
  ];

  const tips = [
    { title: 'Sunset Routine 🐚', desc: 'Dim the lights 1 hour before bed to mimic the setting sun.', icon: Sun },
    { title: 'Ocean Sounds 🌊', desc: 'Listen to white noise or waves to calm your mind.', icon: Waves },
    { title: 'Anchor Your Schedule ⚓', desc: 'Go to bed and wake up at the same time every day.', icon: Anchor },
    { title: 'Cool Breeze 🕊️', desc: 'Keep your room cool, like a night breeze on the shore.', icon: Wind },
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-teal-600 font-bold mb-3">Restful Tides 🌊</p>
          <h1 className="text-5xl font-serif font-medium text-stone-900 leading-tight">Sleep <span className="italic text-[var(--color-brand-accent)]">Sanctuary 🐚</span></h1>
        </div>
        <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-3xl border border-stone-100 shadow-sm">
          <Moon className="text-indigo-400" size={24} />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Goal 🕊️</p>
            <p className="text-xl font-serif font-medium text-stone-900">8.0 Hours</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sleep Summary Card */}
        <div className="lg:col-span-8 space-y-12">
          <section className="bg-white p-10 rounded-[3rem] border border-stone-100 elegant-shadow relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-serif font-medium text-stone-800 mb-10 flex items-center gap-4">
                <Clock size={24} strokeWidth={1.5} className="text-[var(--color-brand-accent)]" />
                Weekly Sleep Summary 📊
              </h2>
              
              <div className="flex items-end justify-between gap-4 h-64 mb-8">
                {weeklyData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 h-full justify-end">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.hours / 10) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                      className={`w-full max-w-[40px] rounded-t-2xl shadow-sm ${data.hours >= 8 ? 'bg-teal-400' : 'bg-indigo-300'}`}
                    />
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{data.day}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-50">
                <div className="text-center">
                  <p className="text-2xl font-serif font-medium text-stone-900">7.2h</p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Average 🐚</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-serif font-medium text-stone-900">85%</p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Quality 🌊</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-serif font-medium text-stone-900">11:15 PM</p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Avg Bedtime 🕊️</p>
                </div>
              </div>
            </div>
            {/* Decorative Starfish */}
            <div className="absolute -bottom-8 -right-8 opacity-5 rotate-12">
              <Sparkles size={120} />
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 elegant-shadow flex items-start gap-6 group hover:border-teal-200 transition-all">
                <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform">
                  <tip.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-stone-500 font-serif italic leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Log Sleep & Recommendations */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-[var(--color-brand-primary)] text-white p-10 rounded-[3rem] shadow-2xl shadow-teal-100 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-serif font-medium mb-8">Log Last Night 🐚</h3>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Hours Slept 🌊</label>
                    <span className="text-3xl font-serif font-medium">{sleepHours}h</span>
                  </div>
                  <input 
                    type="range" 
                    min="4" 
                    max="12" 
                    step="0.5"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
                <button className="w-full py-5 bg-white text-[var(--color-brand-primary)] rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl">
                  Save Record 🕊️
                </button>
              </div>
            </div>
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          </section>

          <section className="bg-white p-10 rounded-[3rem] border border-stone-100 elegant-shadow">
            <h3 className="text-xl font-serif font-medium text-stone-800 mb-6 flex items-center gap-3">
              <Sparkles size={20} className="text-orange-400" />
              Student Guide 🐚
            </h3>
            <div className="space-y-6">
              <div className="p-6 bg-stone-50 rounded-[2rem] border border-stone-100">
                <p className="text-sm text-stone-700 font-serif italic mb-2">&quot;Aim for 7-9 hours of sleep to consolidate memory and improve focus for lectures.&quot;</p>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">— Academic Success Tip 🌊</p>
              </div>
              <div className="p-6 bg-stone-50 rounded-[2rem] border border-stone-100">
                <p className="text-sm text-stone-700 font-serif italic mb-2">&quot;Avoid screens 30 mins before sleep. The blue light disrupts your natural rhythm.&quot;</p>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">— Digital Detox 🕊️</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
