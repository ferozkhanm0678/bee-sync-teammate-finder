import React from 'react';
import { 
  Sparkles, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  ArrowRight,
  UserX,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { MatchGauge } from '../common/MatchGauge';
import { analyzeTeamSynergy } from '../../services/aiInsightEngine';

export function TeamSynergyPanel({ 
  selectedMembers = [], 
  onRemoveMember, 
  projectSpecs = {}, 
  onOpenCreateTeamModal 
}) {
  const analysis = analyzeTeamSynergy(selectedMembers, projectSpecs);

  return (
    <GlassCard className="p-5 sm:p-6 border-purple-500/30 bg-[#0c1027]/90 sticky top-20 shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/30">
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AI Team Synergy Matrix</h3>
            <p className="text-xs text-slate-400">{selectedMembers.length} Teammates Selected</p>
          </div>
        </div>

        {selectedMembers.length > 0 && (
          <Badge variant="purple" size="md">
            {analysis.balanceRating}
          </Badge>
        )}
      </div>

      {selectedMembers.length === 0 ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-300">No Teammates Selected Yet</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Click "Add to Team" on any candidate card below to calculate aggregate synergy and skill coverage.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          
          {/* Top Score Banner */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-cyan-950/40 border border-purple-500/30">
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 font-mono">Team Compatibility</div>
              <div className="text-2xl font-black text-white font-mono mt-0.5">{analysis.overallScore}%</div>
              <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> High collaboration synergy
              </p>
            </div>
            <MatchGauge score={analysis.overallScore} size="md" label="SYNERGY" />
          </div>

          {/* Selected Member Chips */}
          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
              Current Roster ({selectedMembers.length}):
            </div>
            <div className="space-y-2">
              {selectedMembers.map((member) => (
                <div 
                  key={member.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-purple-500/15"
                >
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-7 h-7 rounded-lg object-cover border border-purple-500/30" 
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{member.name}</div>
                      <div className="text-[10px] text-purple-300">{member.preferredRole || "Developer"}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveMember && onRemoveMember(member.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors text-xs"
                    title="Remove from roster"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Coverage Index */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
              <span>Required Skill Coverage</span>
              <span className="text-cyan-400">{analysis.skillCoveragePct}%</span>
            </div>
            <ProgressBar value={analysis.skillCoveragePct} variant="gradient" height="h-2.5" />
          </div>

          {/* Domain Breakdown Bars */}
          <div className="space-y-2 pt-2 border-t border-purple-500/15">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Domain Competencies:
            </div>
            {Object.entries(analysis.domainScores).map(([domain, score]) => (
              <div key={domain} className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>{domain}</span>
                  <span className="font-mono text-purple-300">{score}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-purple-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* AI Insights & Missing Skills */}
          {analysis.missingSkills.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Skill Gaps Detected</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Team is still missing: <strong className="text-amber-200">{analysis.missingSkills.join(", ")}</strong>. Look for candidates with these skills to achieve 100% coverage.
              </p>
            </div>
          )}

          {/* Create Team CTA Button */}
          <button
            onClick={onOpenCreateTeamModal}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-neon-purple transition-all duration-300"
          >
            <span>Form & Confirm Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      )}

    </GlassCard>
  );
}
