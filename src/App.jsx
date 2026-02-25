import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  PhoneCall, 
  UserCircle, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  Heart,
  Brain,
  Moon
} from 'lucide-react';
import { motion } from 'motion/react';

// Pages
import StudentDashboard from './pages/StudentDashboard';
import HealthResources from './pages/HealthResources';
import WellnessPrograms from './pages/WellnessPrograms';
import NutritionAdvice from './pages/NutritionAdvice';
import SupportServices from './pages/SupportServices';
import Profile from './pages/Profile';
import SleepTracker from './pages/SleepTracker';
import AdminDashboard from './pages/AdminDashboard';
import ManageResources from './pages/ManageResources';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-[var(--color-brand-bg)] text-stone-800 font-sans">
        {!user ? (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <div className="flex h-screen overflow-hidden">
            <Sidebar user={user} onLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto p-6 md:p-12">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  {user.role === 'admin' ? (
                    <>
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/admin/resources" element={<ManageResources />} />
                      <Route path="*" element={<Navigate to="/admin" />} />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<StudentDashboard user={user} />} />
                      <Route path="/resources" element={<HealthResources />} />
                      <Route path="/programs" element={<WellnessPrograms />} />
                      <Route path="/nutrition" element={<NutritionAdvice />} />
                      <Route path="/sleep" element={<SleepTracker />} />
                      <Route path="/support" element={<SupportServices />} />
                      <Route path="/profile" element={<Profile user={user} />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </>
                  )}
                </Routes>
              </div>
            </main>
          </div>
        )}
      </div>
    </Router>
  );
}

function Sidebar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const studentLinks = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/resources', icon: Brain, label: 'Mental Health' },
    { to: '/nutrition', icon: Utensils, label: 'Nutrition & Fitness' },
    { to: '/sleep', icon: Moon, label: 'Sleep Tracker' },
    { to: '/support', icon: PhoneCall, label: 'Support Concierge' },
    { to: '/profile', icon: UserCircle, label: 'Personal Details' },
  ];

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Curator Panel' },
    { to: '/admin/resources', icon: Settings, label: 'Collections' },
  ];

  const links = user.role === 'admin' ? adminLinks : studentLinks;

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 left-6 z-50 p-3 bg-white rounded-full shadow-lg border border-stone-100"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-stone-100 transform transition-transform duration-500 ease-in-out
        md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full py-8">
          <div className="px-8 mb-12 flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--color-brand-primary)] rounded-full flex items-center justify-center text-white shadow-xl shadow-teal-100">
              <Heart size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-medium tracking-tight text-stone-900 leading-none">Oceanic</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1 font-semibold">Wellness Sanctuary</p>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-6 py-3.5 text-stone-500 hover:text-[var(--color-brand-primary)] hover:bg-stone-50 rounded-2xl transition-all group relative"
              >
                <link.icon size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium tracking-wide">{link.label}</span>
                <div className="absolute left-0 w-1 h-0 bg-[var(--color-brand-primary)] group-hover:h-4 transition-all rounded-r-full" />
              </Link>
            ))}
          </nav>

          <div className="px-6 mt-auto">
            <div className="p-6 bg-stone-50 rounded-3xl border border-stone-100 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full border border-stone-200 flex items-center justify-center text-stone-400">
                  {user.role === 'admin' ? <ShieldCheck size={20} strokeWidth={1.5} /> : <UserCircle size={20} strokeWidth={1.5} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-serif font-medium text-stone-900 truncate">{user.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{user.role}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  navigate('/login');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-stone-200 text-stone-600 hover:text-red-500 hover:border-red-100 hover:bg-red-50 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm"
              >
                <LogOut size={14} strokeWidth={2} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
