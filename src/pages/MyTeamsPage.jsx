import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Trash2, 
  Award, 
  CheckCircle2, 
  FileText, 
  Download, 
  Layers, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { MatchGauge } from '../components/common/MatchGauge';
import { ProgressBar } from '../components/common/ProgressBar';
import { useData } from '../context/DataContext';

export function MyTeamsPage({ setActivePage, onOpenVivaModal }) {
  const { teams, deleteTeam } = useData();
  const [selectedCharterTeam, setSelectedCharterTeam] = useState(null);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Formed Teams (Hives)</h1>
            <Badge variant="cyan" size="sm">{teams.length} Active Squads</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review assembled squads, assigned roles, team synergy metrics, and viva documentation.
          </p>
        </div>

        <button
          onClick={() => setActivePage('find-teammates')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-neon-purple transition-all"
        >
          <Users className="w-4 h-4" />
          <span>Assemble New Team</span>
        </button>
      </div>

      {teams.length === 0 ? (
        <GlassCard className="p-12 text-center border-purple-500/20 space-y-4">
          <Users className="w-12 h-12 text-purple-400 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white">No Teams Formed Yet</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Go to "Find Teammates", choose candidates with complementary skills, and assemble your first project squad.
            </p>
          </div>
          <button
            onClick={() => setActivePage('find-teammates')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold"
          >
            Find Teammates Now
          </button>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {teams.map((team) => {
            // Collect all unique skills in this team
            const allSkills = new Set();
            (team.members || []).forEach(m => (m.skills || []).forEach(s => allSkills.add(s)));

            return (
              <GlassCard key={team.id} className="p-6 sm:p-8 border-purple-500/30 bg-[#0e132e]/90 space-y-6">
                
                {/* Team Top Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-white tracking-tight">{team.name}</h2>
                      <Badge variant="purple" size="sm">{team.status || "Active"}</Badge>
                      <Badge variant="cyan" size="sm">{team.category || "AI & Tech"}</Badge>
                    </div>
                    <p className="text-xs text-slate-300">
                      Assigned Project: <strong className="text-purple-300">{team.projectName}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 self-end lg:self-center">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Team Compatibility</span>
                      <span className="text-xs font-semibold text-emerald-400 flex items-center justify-end gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> High Viva Synergy
                      </span>
                    </div>
                    <MatchGauge score={team.compatibilityScore || 92} size="md" label="SYNERGY" />
                  </div>
                </div>

                {/* Team Members Grid */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 font-mono">
                    Assigned Team Roster ({team.members?.length || 0} Members):
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(team.members || []).map((member) => (
                      <div 
                        key={member.id}
                        className="p-3.5 rounded-xl bg-slate-900/80 border border-purple-500/20 flex items-start gap-3"
                      >
                        <img 
                          src={member.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
                          alt={member.name} 
                          className="w-11 h-11 rounded-xl object-cover border border-purple-500/30 shrink-0" 
                        />
                        <div className="space-y-1 min-w-0">
                          <div className="text-xs font-bold text-white truncate">{member.name}</div>
                          <Badge variant="purple" size="sm" className="truncate max-w-full">
                            {member.assignedRole || member.preferredRole || "Developer"}
                          </Badge>
                          <div className="text-[10px] text-slate-400 truncate">
                            {member.department} • {member.year}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Combined Skill Stack */}
                <div className="pt-2 border-t border-purple-500/15">
                  <span className="text-[11px] uppercase font-bold text-slate-400 font-mono block mb-2">
                    Combined Team Technology Stack ({allSkills.size} Unique Competencies):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(allSkills).map((skill, idx) => (
                      <Badge key={idx} variant="emerald" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Team Actions */}
                <div className="pt-4 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedCharterTeam(team)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-colors"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>View College Viva Team Charter</span>
                  </button>

                  <button
                    onClick={() => deleteTeam(team.id)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 text-xs font-medium transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Disband Team</span>
                  </button>
                </div>

              </GlassCard>
            );
          })}
        </div>
      )}

      {/* College Viva Team Charter Modal */}
      {selectedCharterTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090d22] border border-purple-500/40 shadow-2xl p-6 sm:p-8 text-slate-100 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/30">
              <div className="flex items-center gap-2.5">
                <Award className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">College Project Team Charter</h3>
                  <p className="text-xs text-slate-400">Formal Team Specification & Role Distribution</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCharterTeam(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/20 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Team Name:</span>
                <span className="font-bold text-white">{selectedCharterTeam.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Project:</span>
                <span className="font-bold text-purple-300">{selectedCharterTeam.projectName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Synergy Rating:</span>
                <span className="font-mono text-emerald-400 font-bold">{selectedCharterTeam.compatibilityScore}%</span>
              </div>
            </div>

            {/* Member Allocations */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Individual Module Responsibilities:
              </h4>
              <div className="space-y-2">
                {(selectedCharterTeam.members || []).map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#111736] border border-purple-500/15 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white">{m.name}</span>
                      <span className="text-slate-400 ml-2">({m.department})</span>
                    </div>
                    <Badge variant="purple" size="sm">{m.assignedRole || "Developer"}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCharterTeam(null)}
                className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
              >
                Close Charter
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
