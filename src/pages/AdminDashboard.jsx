import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, BookOpen, Trophy, Calendar, TrendingUp, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const mockStats = {
      totalUsers: 1240,
      totalResources: 48,
      totalEnrollments: 872,
      totalAppointments: 156
    };
  
    setStats(mockStats);
    setLoading(false);
  }, []);
  const chartData = [
    { name: 'Mon', users: 400, enrollments: 240 },
    { name: 'Tue', users: 300, enrollments: 139 },
    { name: 'Wed', users: 200, enrollments: 980 },
    { name: 'Thu', users: 278, enrollments: 390 },
    { name: 'Fri', users: 189, enrollments: 480 },
    { name: 'Sat', users: 239, enrollments: 380 },
    { name: 'Sun', users: 349, enrollments: 430 },
  ];

  if (loading) return <div className="p-8 text-center">Loading admin insights...</div>;

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500' },
    { label: 'Resources', value: stats.totalResources, icon: BookOpen, color: 'bg-emerald-500' },
    { label: 'Enrollments', value: stats.totalEnrollments, icon: Trophy, color: 'bg-orange-500' },
    { label: 'Appointments', value: stats.totalAppointments, icon: Calendar, color: 'bg-purple-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-medium text-stone-900">Sanctuary Curator Panel</h1>
          <p className="text-stone-500 mt-1 font-serif italic">Platform-wide wellness metrics and analytics.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-600 rounded-2xl font-bold hover:border-teal-500 transition-all shadow-sm">
          <Download size={20} />
          Export Report
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
              <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                <TrendingUp size={14} />
                +12%
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">User Engagement</h2>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">Program Enrollments</h2>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="enrollments" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, fill: '#f59e0b'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
