import React from 'react';
import { Hexagon, Sparkles, Heart, ShieldCheck } from 'lucide-react';

export function Footer({ onOpenVivaModal }) {
  return (
    <footer className="w-full border-t border-purple-500/15 bg-[#060814] py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Project Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#070913] rounded-[6px] flex items-center justify-center">
              <Hexagon className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-mono">BEE SYNC</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">College Mini-Project</span>
            </div>
            <p className="text-xs text-slate-400">Find the Right Team. Build Better Projects.</p>
          </div>
        </div>

        {/* Viva Quick Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <button 
            onClick={onOpenVivaModal}
            className="hover:text-purple-300 flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Algorithm Specs
          </button>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Client-Side AI Engine
          </span>
          <span className="text-slate-700">•</span>
          <span>Zero Paid APIs</span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 text-center md:text-right">
          <p>© {new Date().getFullYear()} Bee Sync • Built with React & Vite</p>
        </div>

      </div>
    </footer>
  );
}
