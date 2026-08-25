import React, { useState } from 'react';
import { Hexagon, Lock, Mail, ArrowRight, Sparkles, GraduationCap, ShieldCheck, UserCheck } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';

export function LoginPage({ onNavigateRegister, onLoginSuccess }) {
  const { login, switchDemoUser, demoStudents } = useAuth();
  const [email, setEmail] = useState('feroz.khan@college.edu');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your student email or name.');
      return;
    }
    login(email, password);
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleQuickDemoLogin = (stdId) => {
    switchDemoUser(stdId);
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-neon-purple mb-2">
            <div className="w-full h-full bg-[#070913] rounded-[14px] flex items-center justify-center">
              <Hexagon className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white font-mono">BEE SYNC LOGIN</h1>
          <p className="text-xs text-slate-400">Sign in to find college project teammates & manage teams</p>
        </div>

        {/* 1-Click Fast Demo Switcher */}
        <GlassCard className="p-4 border-purple-500/30 bg-purple-950/20 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> 1-Click Quick Demo Login
            </span>
            <Badge variant="cyan" size="sm">Instant</Badge>
          </div>
          <p className="text-[11px] text-slate-400">
            Click any test student persona below to login instantly without typing:
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {demoStudents.slice(0, 4).map((std) => (
              <button
                key={std.id}
                type="button"
                onClick={() => handleQuickDemoLogin(std.id)}
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 hover:bg-purple-600/30 border border-purple-500/20 text-left transition-all group"
              >
                <img 
                  src={std.avatar} 
                  alt={std.name} 
                  className="w-7 h-7 rounded-lg object-cover border border-purple-500/30 group-hover:scale-105 transition-transform" 
                />
                <div className="truncate">
                  <div className="text-xs font-bold text-white group-hover:text-purple-300 truncate">{std.name.split(' ')[0]}</div>
                  <div className="text-[9px] text-slate-400 truncate">{std.preferredRole.split(' ')[0]}</div>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Standard Form */}
        <GlassCard className="p-6 sm:p-8 border-purple-500/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                Student Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/25 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                  placeholder="feroz.khan@college.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/25 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-neon-purple transition-all"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-slate-400">
            Don't have a profile yet?{' '}
            <button
              onClick={onNavigateRegister}
              className="font-bold text-purple-400 hover:text-purple-300 underline underline-offset-2 ml-1"
            >
              Register New Student Profile
            </button>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
