import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  ChevronRight,
  CheckCircle2,
  Clock,
  Heart,
  Utensils,
  Moon,
  Anchor,
  Waves
} from 'lucide-react';

export default function StudentDashboard({ user }) {
  const [myPrograms, setMyPrograms] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 'x-user-id': user.id.toString() };
        const [progRes, appRes, resRes] = await Promise.all([
          fetch('/api/my-programs', { headers }),
          fetch('/api/appointments', { headers }),
          fetch('/api/resources', { headers })
        ]);
        
        setMyPrograms(await progRes.json());
        setAppointments(await appRes.json());
        setResources(await resRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-stone-400 font-serif italic">Loading your sanctuary...</div>;

  const overviewCards = [
    { 
      title: 'Wellness Tip 🕊️', 
      content: 'Take a 5-minute deep breathing break between study sessions to reset your focus.', 
      icon: Heart, 
      color: 'bg-rose-50 text-rose-500',
      label: 'Daily Wisdom'
    },
    { 
      title: 'Nutrition Insight 🐚', 
      content: 'Hydration is key! Aim for 8 glasses of water today to keep your energy levels high.', 
      icon: Utensils, 
      color: 'bg-amber-50 text-amber-600',
      label: 'Fuel Your Body'
    },
    { 
      title: 'Sleep Summary 🌊', 
      content: 'You averaged 7.2 hours of sleep this week. Try to hit 8 hours tonight for peak recovery.', 
      icon: Moon, 
      color: 'bg-indigo-50 text-indigo-500',
      label: 'Restful Tides'
    },
    { 
      title: 'Support Access ⚓', 
      content: 'Counselors are available for walk-ins today from 2 PM to 4 PM at the Health Center.', 
      icon: Anchor, 
      color: 'bg-teal-50 text-teal-600',
      label: 'Safe Harbor'
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-teal-600 font-bold mb-3">Welcome to the Sanctuary 🐚</p>
          <h1 className="text-5xl font-serif font-medium text-stone-900 leading-tight">
            Aloha, <span className="italic text-[var(--color-brand-accent)]">{user.name.split(' ')[0]} 🌊</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-3xl border border-stone-100 shadow-xl shadow-teal-50">
          <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
            <TrendingUp size={24} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Wellness Streak 🕊️</p>
            <p className="text-xl font-serif font-medium text-stone-900">5 Days</p>
          </div>
        </div>
      </header>

      {/* Overview Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-stone-100 elegant-shadow relative overflow-hidden group"
          >
            <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <card.icon size={24} strokeWidth={1.5} />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">{card.label}</p>
            <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">{card.title}</h3>
            <p className="text-sm text-stone-500 font-serif italic leading-relaxed">{card.content}</p>
            
            {/* Decorative Shell/Starfish Icon in background */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Sparkles size={80} />
            </div>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Programs & Resources */}
        <div className="lg:col-span-8 space-y-12">
          {/* Enrolled Programs */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-medium text-stone-800 flex items-center gap-3">
                <Waves size={24} strokeWidth={1.5} className="text-[var(--color-brand-accent)]" />
                Active Journeys
              </h2>
              <button className="text-[var(--color-brand-primary)] text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity">Explore More</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myPrograms.length > 0 ? myPrograms.map(program => (
                <motion.div 
                  key={program.id}
                  whileHover={{ y: -6 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-stone-100 elegant-shadow group cursor-pointer relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-4 py-1.5 bg-stone-50 text-stone-500 text-[10px] font-bold rounded-full uppercase tracking-widest border border-stone-100">
                        {program.category}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-stone-100 flex items-center justify-center text-stone-300 group-hover:text-[var(--color-brand-primary)] group-hover:border-[var(--color-brand-primary)] transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6 leading-snug">{program.title}</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-stone-400">Progress</span>
                        <span className="text-stone-900">{program.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-stone-50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${program.progress}%` }}
                          className="h-full bg-[var(--color-brand-primary)] rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 opacity-[0.02]">
                    <Anchor size={100} />
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-2 p-12 bg-white rounded-[3rem] border border-dashed border-stone-200 text-center">
                  <p className="text-stone-400 font-serif italic text-lg">Your journey is waiting to begin...</p>
                </div>
              )}
            </div>
          </section>

          {/* Recommended Resources */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-medium text-stone-800 flex items-center gap-3">
                <BookOpen size={24} strokeWidth={1.5} className="text-stone-400" />
                Curated for You
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {resources.slice(0, 3).map(resource => (
                <div key={resource.id} className="flex items-center gap-6 bg-white p-6 rounded-[2rem] border border-stone-100 hover:border-stone-200 transition-all cursor-pointer group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    resource.type === 'video' ? 'bg-red-50 text-red-400' : 
                    resource.type === 'pdf' ? 'bg-orange-50 text-orange-400' : 'bg-stone-50 text-stone-400'
                  }`}>
                    <BookOpen size={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-serif font-medium text-stone-900 group-hover:text-[var(--color-brand-primary)] transition-colors">{resource.title}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mt-1">{resource.category} • {resource.type}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-stone-50 flex items-center justify-center text-stone-200 group-hover:text-stone-400 transition-colors">
                    <ChevronRight size={18} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Appointments & Activity */}
        <div className="lg:col-span-4 space-y-12">
          {/* Upcoming Appointments */}
          <section className="bg-[var(--color-brand-primary)] text-white p-10 rounded-[3rem] shadow-2xl shadow-stone-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-serif font-medium flex items-center gap-3">
                  <Calendar size={24} strokeWidth={1.5} className="text-[var(--color-brand-accent)]" />
                  Concierge
                </h2>
              </div>
              <div className="space-y-8">
                {appointments.length > 0 ? appointments.map(app => (
                  <div key={app.id} className="relative pl-8 border-l border-white/10">
                    <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-[var(--color-brand-accent)]" />
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2">{new Date(app.appointment_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</p>
                    <h4 className="text-xl font-serif font-medium mb-1">{app.counselor_name}</h4>
                    <p className="text-white/60 text-xs font-medium capitalize">{app.type.replace('_', ' ')} Session</p>
                  </div>
                )) : (
                  <div className="text-center py-6">
                    <p className="text-white/40 font-serif italic mb-6">No sessions scheduled.</p>
                    <button className="w-full py-4 bg-white text-[var(--color-brand-primary)] rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors">
                      Book Support
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          </section>

          {/* Activity Summary */}
          <section className="bg-white p-10 rounded-[3rem] border border-stone-100 elegant-shadow relative overflow-hidden">
            <h2 className="text-2xl font-serif font-medium text-stone-800 mb-8">Activity</h2>
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400">
                  <CheckCircle2 size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">3 Milestones Reached</p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mt-1">This week</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400">
                  <Clock size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">4.5 Hours Mindful</p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mt-1">Activity time</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 opacity-[0.03] rotate-45">
              <Waves size={100} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
