import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Star, Brain, Sparkles, Anchor, Waves, Heart } from 'lucide-react';

export default function HealthResources() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/resources')
      .then(res => res.json())
      .then(data => {
        setResources(data);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Mental Health', 'Fitness', 'Nutrition', 'Sleep Improvement'];

  const filteredResources = resources.filter(res => {
    const matchesFilter = filter === 'All' || res.category === filter;
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase()) || 
                         res.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selfCheckQuestions = [
    "How have I been feeling lately? (Calm, Anxious, Tired, Energized)",
    "What's one thing that's been on my mind today?",
    "Have I taken a moment to breathe deeply today?",
    "What's one small win I can celebrate right now?"
  ];

  if (loading) return <div className="h-screen flex items-center justify-center text-stone-400 font-serif italic">Gathering wisdom from the tides...</div>;

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-teal-600 font-bold mb-3">Oceanic Wisdom</p>
          <h1 className="text-5xl font-serif font-medium text-stone-900 leading-tight">Treasures of <span className="italic text-[var(--color-brand-accent)]">Wisdom</span></h1>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300" size={20} strokeWidth={1.5} />
          <input 
            type="text"
            placeholder="Search the collection..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border border-stone-100 rounded-3xl outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/10 focus:border-[var(--color-brand-primary)] transition-all elegant-shadow font-medium text-stone-700"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                  filter === cat 
                    ? 'bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)] shadow-lg shadow-stone-200' 
                    : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredResources.map((resource, i) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-[2.5rem] border border-stone-100 elegant-shadow overflow-hidden flex flex-col relative"
              >
                <div className="h-48 bg-stone-50 relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${resource.id}/600/400`} 
                    alt={resource.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-400 hover:text-red-400 transition-colors">
                      <Star size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-[var(--color-brand-primary)] text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                      {resource.type}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--color-brand-accent)] font-bold mb-3">{resource.category}</p>
                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-4 group-hover:text-[var(--color-brand-primary)] transition-colors leading-snug">{resource.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-8 line-clamp-2 italic font-serif">
                    {resource.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-stone-50 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">5 min read</span>
                    <a 
                      href={resource.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[var(--color-brand-primary)] text-[10px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all"
                    >
                      Explore
                    </a>
                  </div>
                </div>
                {/* Subtle beach icon in background */}
                <div className="absolute -bottom-4 -right-4 opacity-[0.02] pointer-events-none">
                  <Sparkles size={100} />
                </div>
              </motion.div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-stone-100">
              <p className="text-stone-400 font-serif italic text-lg">No treasures found in the collection.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section className="bg-white p-10 rounded-[3rem] border border-stone-100 elegant-shadow relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-serif font-medium text-stone-800 mb-8 flex items-center gap-3">
                <Brain size={24} strokeWidth={1.5} className="text-teal-500" />
                Mental Well-being
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Exam Stress', icon: Anchor },
                  { title: 'Anxiety Management', icon: Waves },
                  { title: 'Emotional Well-being', icon: Heart },
                  { title: 'Burnout Prevention', icon: Sparkles },
                  { title: 'Mindfulness', icon: Brain }
                ].map((topic, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100 hover:border-teal-200 transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform shadow-sm">
                      <topic.icon size={18} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-serif font-medium text-stone-900">{topic.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[var(--color-brand-primary)] text-white p-10 rounded-[3rem] shadow-2xl shadow-teal-100 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-serif font-medium mb-8 flex items-center gap-3">
                <Sparkles size={24} strokeWidth={1.5} className="text-orange-300" />
                Self-Check
              </h2>
              <div className="space-y-6">
                {selfCheckQuestions.map((q, i) => (
                  <div key={i} className="p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-sm font-serif italic leading-relaxed">{q}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 bg-white text-[var(--color-brand-primary)] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                Reflect Now
              </button>
            </div>
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          </section>
        </div>
      </div>
    </div>
  );
}
