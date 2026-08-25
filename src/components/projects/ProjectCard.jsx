import React from 'react';
import { 
  FolderKanban, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  MoreVertical, 
  Trash2,
  Sparkles
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';

export function ProjectCard({ 
  project, 
  onUpdateMilestone, 
  onDelete, 
  onFindTeammatesForProject 
}) {
  const {
    id,
    title,
    description,
    category,
    goal,
    progress = 0,
    status = "In Progress",
    targetDeadline,
    teamName,
    members = [],
    requiredSkills = [],
    milestones = [],
    compatibilityScore = 90
  } = project;

  const statusVariant = {
    "Completed": "emerald",
    "In Progress": "cyan",
    "Planning": "amber",
    "Review": "purple"
  }[status] || "purple";

  return (
    <GlassCard className="p-5 sm:p-6 flex flex-col justify-between h-full border-purple-500/20 hover:border-purple-500/40">
      <div className="space-y-4">
        
        {/* Top Badges & Title */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <Badge variant={statusVariant} size="sm">{status}</Badge>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>{targetDeadline || "Q4 2026"}</span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{description}</p>
        </div>

        {/* Team Banner */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-600/20 text-purple-300">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono">Squad</span>
              <span className="text-xs font-bold text-slate-200">{teamName || "Unassigned Squad"}</span>
            </div>
          </div>

          {/* Member Avatars */}
          <div className="flex -space-x-2">
            {members.length > 0 ? (
              members.slice(0, 3).map((m, idx) => (
                <img 
                  key={idx} 
                  src={m.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
                  alt={m.name} 
                  title={`${m.name} (${m.role || "Dev"})`}
                  className="w-7 h-7 rounded-full object-cover border-2 border-[#0e1329]"
                />
              ))
            ) : (
              <span className="text-[10px] text-purple-400 italic">Looking for members</span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <ProgressBar value={progress} showLabel={true} variant="gradient" height="h-2" />
        </div>

        {/* Milestones Checklist */}
        {milestones.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              College Milestones:
            </div>
            <div className="space-y-1">
              {milestones.map((m, idx) => (
                <div 
                  key={idx}
                  onClick={() => onUpdateMilestone && onUpdateMilestone(id, idx)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors group"
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    m.completed 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                      : 'border-slate-700 bg-slate-900 group-hover:border-purple-500'
                  }`}>
                    {m.completed && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                  <span className={`text-xs ${m.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                    {m.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer Actions */}
      <div className="mt-5 pt-3 border-t border-purple-500/15 flex items-center justify-between gap-2">
        <button
          onClick={() => onFindTeammatesForProject && onFindTeammatesForProject(project)}
          className="flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-cyan-300 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Find Teammates</span>
        </button>

        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Delete project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

    </GlassCard>
  );
}
