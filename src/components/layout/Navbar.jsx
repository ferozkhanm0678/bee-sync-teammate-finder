import React, { useState } from 'react';
import { 
  Hexagon, 
  Bell, 
  User, 
  LogOut, 
  Sparkles, 
  ChevronDown, 
  Menu, 
  X, 
  Cpu, 
  Compass, 
  FolderKanban, 
  Users, 
  Lightbulb, 
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Badge } from '../common/Badge';

export function Navbar({ activePage, setActivePage, onOpenVivaModal, onToggleSidebar, isSidebarOpen }) {
  const { currentUser, switchDemoUser, demoStudents, logout } = useAuth();
  const { unreadNotifsCount } = useData();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDemoSwitcher, setShowDemoSwitcher] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-500/20 bg-[#070913]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <div 
              onClick={() => setActivePage('dashboard')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-neon-purple group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center">
                  <Hexagon className="w-5 h-5 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-white font-mono">BEE<span className="text-purple-400">SYNC</span></span>
                  <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[9px] font-bold rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">AI</span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wider hidden sm:block font-medium">Team Recommendation System</span>
              </div>
            </div>
          </div>

          {/* Center Navigation for quick desktop jumping */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActivePage('find-teammates')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePage === 'find-teammates' 
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-glow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Find Teammates
            </button>
            <button
              onClick={() => setActivePage('project-ideas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePage === 'project-ideas' 
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-glow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Project Ideas
            </button>
            <button
              onClick={() => setActivePage('my-teams')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePage === 'my-teams' 
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-glow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              My Teams
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Viva Formula / Architecture Button */}
            <button
              onClick={onOpenVivaModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/40 text-purple-200 text-xs font-semibold hover:border-purple-400 hover:shadow-neon-purple transition-all"
              title="Inspect Algorithm Formula & Viva Specifications"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Viva Mode</span>
            </button>

            {/* Notifications */}
            <button
              onClick={() => setActivePage('notifications')}
              className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/30 text-slate-300 hover:text-white transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-lg shadow-rose-500/50">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Demo User Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowDemoSwitcher(!showDemoSwitcher);
                  setShowUserMenu(false);
                }}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 hover:border-slate-700"
                title="Switch Demo Student Persona"
              >
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-400">Demo Persona:</span>
                <span className="font-semibold text-white truncate max-w-[90px]">{currentUser?.name?.split(' ')[0] || "FEROZ"}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showDemoSwitcher && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0e1329] border border-purple-500/30 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-2.5 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Switch Test Student Profile
                  </div>
                  <div className="space-y-1">
                    {demoStudents.map((std) => (
                      <button
                        key={std.id}
                        onClick={() => {
                          switchDemoUser(std.id);
                          setShowDemoSwitcher(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left text-xs transition-colors ${
                          currentUser?.id === std.id ? 'bg-purple-600/30 text-white border border-purple-500/40' : 'text-slate-300 hover:bg-slate-800/70'
                        }`}
                      >
                        <img src={std.avatar} alt={std.name} className="w-6 h-6 rounded-full object-cover border border-purple-500/30" />
                        <div className="truncate">
                          <div className="font-medium text-white">{std.name}</div>
                          <div className="text-[10px] text-slate-400 truncate">{std.preferredRole}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Current User Pill / Avatar Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowDemoSwitcher(false);
                }}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-purple-500/20 hover:border-purple-500/50 transition-all"
              >
                <img 
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
                  alt={currentUser?.name || "User"} 
                  className="w-7 h-7 rounded-lg object-cover border border-purple-500/30" 
                />
                <span className="hidden sm:block text-xs font-semibold text-white pr-1">
                  {currentUser?.name || "FEROZ KHAN"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0e1329] border border-purple-500/30 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                    <p className="text-xs font-bold text-white">{currentUser?.name || "FEROZ KHAN"}</p>
                    <p className="text-[10px] text-purple-400">{currentUser?.preferredRole || "Student"}</p>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser?.college}</p>
                  </div>
                  <div className="space-y-0.5">
                    <button
                      onClick={() => { setActivePage('profile'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-purple-400" /> My Profile
                    </button>
                    <button
                      onClick={() => { setActivePage('my-teams'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                    >
                      <Users className="w-3.5 h-3.5 text-cyan-400" /> My Teams
                    </button>
                    <button
                      onClick={() => { setActivePage('my-projects'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                    >
                      <FolderKanban className="w-3.5 h-3.5 text-emerald-400" /> My Projects
                    </button>
                    <button
                      onClick={() => { setActivePage('settings'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" /> Settings & Reset
                    </button>
                    <div className="border-t border-slate-800/80 my-1"></div>
                    <button
                      onClick={() => { logout(); setActivePage('login'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
