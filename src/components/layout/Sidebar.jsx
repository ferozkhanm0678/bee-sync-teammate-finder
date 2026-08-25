import React from 'react';
import { 
  LayoutDashboard, 
  UserSearch, 
  Lightbulb, 
  FolderKanban, 
  Users, 
  UserCircle, 
  Bell, 
  SlidersHorizontal,
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export function Sidebar({ activePage, setActivePage, isOpen, onClose }) {
  const { unreadNotifsCount } = useData();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'find-teammates', label: 'Find Teammates', icon: UserSearch, badge: 'AI' },
    { id: 'project-ideas', label: 'Project Ideas', icon: Lightbulb, badge: '6' },
    { id: 'my-teams', label: 'My Teams', icon: Users, badge: null },
    { id: 'my-projects', label: 'My Projects', icon: FolderKanban, badge: null },
    { id: 'profile', label: 'My Profile', icon: UserCircle, badge: null },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifsCount > 0 ? unreadNotifsCount : null },
    { id: 'settings', label: 'Settings', icon: SlidersHorizontal, badge: null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside className={`
        fixed top-16 bottom-0 left-0 z-40 w-64 bg-[#080c1d]/95 backdrop-blur-xl border-r border-purple-500/15 p-4 flex flex-col justify-between
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Navigation Items */}
        <div className="space-y-1.5 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Main Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  if (onClose) onClose();
                }}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/20 text-white border border-purple-500/40 shadow-glow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isActive ? 'bg-purple-500 text-white shadow-neon-purple' : 'bg-slate-900/80 text-slate-400 group-hover:text-purple-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.badge === 'AI' 
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white' 
                      : typeof item.badge === 'number'
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer Widget: AI Algorithm Status */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-950/40 via-indigo-950/30 to-slate-900/60 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200">AI Recommender</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug mb-2.5">
            Matching engine active with 5-weight multi-factor compatibility evaluation.
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-purple-300 pt-1 border-t border-purple-500/20">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              94.2% Accuracy
            </span>
            <span className="text-cyan-400 font-bold">VIVA READY</span>
          </div>
        </div>

      </aside>
    </>
  );
}
