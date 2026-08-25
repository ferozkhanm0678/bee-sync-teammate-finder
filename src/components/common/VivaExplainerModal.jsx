import React from 'react';
import { X, Sparkles, Cpu, Calculator, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Badge } from './Badge';

export function VivaExplainerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b0f24] border border-purple-500/30 shadow-2xl shadow-purple-950/60 text-slate-100 p-6 sm:p-8">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-neon-purple">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Algorithm & Viva Architecture</h2>
              <Badge variant="emerald" size="sm">Viva Ready</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">Mathematical specification of the Bee Sync multi-factor matching engine</p>
          </div>
        </div>

        {/* Core Formula Box */}
        <div className="mb-6 p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-purple-500/25">
          <div className="text-xs uppercase tracking-wider font-semibold text-purple-400 mb-2 flex items-center gap-1.5 font-mono">
            <Calculator className="w-4 h-4" /> Core Weighted Optimization Formula
          </div>
          <div className="p-3 rounded-lg bg-black/60 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto border border-cyan-500/20">
            Total Compatibility (%) = (Skills × 0.40) + (Interests × 0.25) + (Project Goal × 0.20) + (Experience × 0.10) + (Availability × 0.05)
          </div>
        </div>

        {/* 5 Factors Breakdown */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Weighted Component Breakdown:</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#121733] border border-purple-500/15">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-purple-300 text-sm">1. Skills Overlap (40%)</span>
                <Badge variant="purple" size="sm">0.40 W</Badge>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Uses Jaccard intersection of required project tech stack vs candidate's verified skills + complementary bonus.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#121733] border border-cyan-500/15">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-cyan-300 text-sm">2. Domain Interests (25%)</span>
                <Badge variant="cyan" size="sm">0.25 W</Badge>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates keyword semantic intersection between student interest tags (e.g., AI/ML, Web3, FinTech) and project category.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#121733] border border-emerald-500/15">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-emerald-300 text-sm">3. Project Goal (20%)</span>
                <Badge variant="emerald" size="sm">0.20 W</Badge>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Matches student career ambition (Hackathon Podium, Mini-Project Top Marks, Research Publication) with project goal.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#121733] border border-amber-500/15">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-amber-300 text-sm">4. Experience Level (10%)</span>
                <Badge variant="amber" size="sm">0.10 W</Badge>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ranks past completed projects count, current academic year (2nd-4th year), and self-assessed competency level.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#121733] border border-indigo-500/15">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-indigo-300 text-sm">5. Availability Commitment (5%)</span>
              <Badge variant="indigo" size="sm">0.05 W</Badge>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates weekly hours dedication alignment (e.g., 15-20 hrs/week) to ensure team velocity and prevent student burnout.
            </p>
          </div>
        </div>

        {/* AI Synergy & Explainability */}
        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-300 mb-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Rule-Based Explainability Engine</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rather than a black-box model, Bee Sync implements transparent rule-based cognitive heuristics. It generates explicit rationale text explaining: (1) why each student is recommended, (2) which complementary skills they bring, (3) which skills are still missing, and (4) recommended role distribution.
          </p>
        </div>

        {/* Viva Tips */}
        <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero paid APIs • 100% Client-Side Evaluation • Free & Open Source</span>
          </div>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all"
          >
            Understood & Close
          </button>
        </div>

      </div>
    </div>
  );
}
