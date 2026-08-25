import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  GraduationCap, 
  Check, 
  Palette,
  Calculator
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';

export function SettingsPage({ onOpenVivaModal }) {
  const { settings, updateSettings, resetAllDataToDefault } = useData();
  const [resetMessage, setResetMessage] = useState(false);

  const handleReset = () => {
    if (window.confirm("Reset all project, team, and candidate data back to fresh college demo state?")) {
      resetAllDataToDefault();
      setResetMessage(true);
      setTimeout(() => setResetMessage(false), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Settings & Viva Panel</h1>
            <Badge variant="purple" size="sm">v1.0 Ready</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure presentation modes, inspect formula weights, or reset local demo datasets.
          </p>
        </div>
      </div>

      {resetMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Local demo database has been reset to initial college sample state.</span>
        </div>
      )}

      {/* Presentation & Viva Inspector Section */}
      <GlassCard className="p-6 border-purple-500/30 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">College Viva Presentation Mode</h2>
          </div>
          <Badge variant="emerald" size="sm">Active</Badge>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Enables real-time formula breakdowns, mathematical weights display, and explainability cards on every matched candidate for demonstration to external examiners.
        </p>

        <div className="pt-2">
          <button
            onClick={onOpenVivaModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-semibold shadow-neon-purple transition-all"
          >
            <Calculator className="w-4 h-4 text-cyan-300" />
            <span>Open Interactive Formula Specification Modal</span>
          </button>
        </div>
      </GlassCard>

      {/* Formula Weights Reference Card */}
      <GlassCard className="p-6 border-purple-500/20 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-purple-500/20">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white">Configured Matching Weights</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/15 flex justify-between items-center">
            <span className="text-slate-300">Skills Overlap Match (Jaccard + Overlap)</span>
            <Badge variant="purple" size="sm">40% Weight</Badge>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/15 flex justify-between items-center">
            <span className="text-slate-300">Domain & Technical Interests</span>
            <Badge variant="cyan" size="sm">25% Weight</Badge>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/15 flex justify-between items-center">
            <span className="text-slate-300">Project Ambition & Goal Alignment</span>
            <Badge variant="emerald" size="sm">20% Weight</Badge>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/15 flex justify-between items-center">
            <span className="text-slate-300">Experience & Academic Year Level</span>
            <Badge variant="amber" size="sm">10% Weight</Badge>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-indigo-500/15 flex justify-between items-center sm:col-span-2">
            <span className="text-slate-300">Weekly Availability & Commitment Bandwidth</span>
            <Badge variant="indigo" size="sm">5% Weight</Badge>
          </div>
        </div>
      </GlassCard>

      {/* Reset Demo Data */}
      <GlassCard className="p-6 border-rose-500/30 bg-rose-950/10 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-rose-500/20">
          <RotateCcw className="w-4 h-4 text-rose-400" />
          <h3 className="text-sm font-bold text-white">Reset Demo Environment</h3>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Restore all demo student profiles, test teams, project milestones, and simulated notifications back to clean factory default state.
        </p>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-rose-200 text-xs font-semibold transition-colors"
        >
          Reset All Demo Data
        </button>
      </GlassCard>

    </div>
  );
}
