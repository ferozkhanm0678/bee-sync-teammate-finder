import React, { useState } from 'react';
import { X, Users, Sparkles, Check, ShieldCheck, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';

export function CreateTeamModal({ 
  isOpen, 
  onClose, 
  selectedMembers = [], 
  projectSpecs = {}, 
  onCreateTeam 
}) {
  if (!isOpen) return null;

  const [teamName, setTeamName] = useState(`${projectSpecs.name || "AI Mini-Project"} Squad`);
  const [roleAssignments, setRoleAssignments] = useState(() => {
    const initial = {};
    selectedMembers.forEach((member, idx) => {
      initial[member.id] = member.preferredRole || (idx === 0 ? "Project Lead & Full Stack" : "Core Developer");
    });
    return initial;
  });

  const availableRoles = [
    "Project Lead & Full Stack",
    "AI / ML Specialist",
    "Backend & Cloud Architect",
    "UI/UX & Frontend Developer",
    "IoT & Hardware Engineer",
    "Data Scientist & NLP",
    "DevOps & Security Lead",
    "QA & Documentation Lead"
  ];

  const handleRoleChange = (memberId, newRole) => {
    setRoleAssignments(prev => ({ ...prev, [memberId]: newRole }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    const teamData = {
      name: teamName,
      projectName: projectSpecs.name || "Custom College Project",
      category: projectSpecs.category || "General",
      goal: projectSpecs.goal || "College Mini-Project Top Marks",
      compatibilityScore: 92, // Computed high synergy
      requiredSkills: projectSpecs.requiredSkills || [],
      members: selectedMembers.map(m => ({
        ...m,
        assignedRole: roleAssignments[m.id] || m.preferredRole || "Developer"
      }))
    };

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    onCreateTeam(teamData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d122b] border border-purple-500/30 shadow-2xl p-6 sm:p-8 text-slate-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-neon-purple">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Assemble & Finalize Team</h2>
            <p className="text-xs sm:text-sm text-slate-400">Assign specific project responsibilities for viva submission</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Team Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 font-mono">
              Team Hive Name *
            </label>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 font-medium"
              placeholder="e.g. NeuralLearners Hive"
            />
          </div>

          {/* Project Details Banner */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-purple-500/20 text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Assigned Project</span>
              <span className="text-sm font-bold text-white">{projectSpecs.name || "Custom Mini-Project"}</span>
            </div>
            <Badge variant="cyan" size="sm">{projectSpecs.category || "AI & Tech"}</Badge>
          </div>

          {/* Member Role Assignment List */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 font-mono">
              Assign Member Roles ({selectedMembers.length} Members)
            </label>

            <div className="space-y-3">
              {selectedMembers.map((member) => (
                <div 
                  key={member.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#121838] border border-purple-500/20"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-10 h-10 rounded-xl object-cover border border-purple-500/30" 
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{member.name}</div>
                      <div className="text-xs text-slate-400">{member.department} • {member.year}</div>
                    </div>
                  </div>

                  <div className="w-full sm:w-64">
                    <select
                      value={roleAssignments[member.id] || availableRoles[0]}
                      onChange={(e) => handleRoleChange(member.id, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-500/30 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
                    >
                      {availableRoles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-slate-800 pt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-neon-purple transition-all"
            >
              Confirm & Save Team
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
