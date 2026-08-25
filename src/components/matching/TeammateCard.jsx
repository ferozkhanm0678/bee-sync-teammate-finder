import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  GraduationCap, 
  Bookmark, 
  Plus, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Award,
  Zap,
  ExternalLink
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { Badge } from '../common/Badge';
import { MatchGauge } from '../common/MatchGauge';

export function TeammateCard({ 
  student, 
  isSelected = false, 
  onToggleSelect,
  isBookmarked = false,
  onToggleBookmark,
  onInvite
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    name,
    avatar,
    college,
    department,
    year,
    cgpa,
    preferredRole,
    experience,
    availability,
    skills = [],
    interests = [],
    goal,
    bio,
    matchScore = 85,
    breakdown,
    aiRecommendation
  } = student;

  const matchingSkills = breakdown?.skills?.matching || [];
  const missingSkills = breakdown?.skills?.missing || [];

  return (
    <GlassCard 
      className={`p-5 transition-all duration-300 ${
        isSelected 
          ? 'border-purple-500 bg-purple-950/20 shadow-neon-purple' 
          : 'border-purple-500/20 hover:border-purple-500/40'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left: Avatar & Basic Info */}
        <div className="flex items-start gap-3.5 flex-1">
          <div className="relative">
            <img 
              src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
              alt={name} 
              className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/30 shadow-md"
            />
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#070913] ${
              availability >= 15 ? 'bg-emerald-500' : 'bg-amber-500'
            }`} title={`${availability}h/week active`} />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">{name}</h3>
              <Badge variant="purple" size="sm">{preferredRole || "Developer"}</Badge>
              <Badge variant="slate" size="sm">CGPA {cgpa}</Badge>
            </div>
            
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              <span>{department} • {year}</span>
            </p>

            <p className="text-xs text-slate-300 line-clamp-1 italic">
              "{bio}"
            </p>
          </div>
        </div>

        {/* Center: Match Gauge & Quick Metric Badges */}
        <div className="flex items-center gap-4 self-center lg:self-auto">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] uppercase font-bold text-slate-400">Match Rank</div>
            <div className="text-xs font-semibold text-emerald-400 flex items-center justify-end gap-1">
              <Zap className="w-3.5 h-3.5" /> High Fit
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{availability} hrs/wk committed</div>
          </div>
          <MatchGauge score={matchScore} size="md" label="FIT" />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800/80">
          <button
            onClick={() => onToggleBookmark && onToggleBookmark(student.id)}
            className={`p-2.5 rounded-xl border transition-colors ${
              isBookmarked 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Bookmark student"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <button
            onClick={() => onToggleSelect && onToggleSelect(student)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              isSelected
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-neon-purple'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4" />
                <span>Selected</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Team</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Skills Matrix Preview */}
      <div className="mt-4 pt-3 border-t border-purple-500/15">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Matching Skills:</span>
          {matchingSkills.length > 0 ? (
            matchingSkills.map((skill, idx) => (
              <Badge key={idx} variant="emerald" size="sm">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {skill}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-slate-500">None directly listed</span>
          )}

          {missingSkills.length > 0 && (
            <>
              <span className="text-[11px] font-semibold text-slate-500 ml-2 mr-1">Unmatched:</span>
              {missingSkills.slice(0, 2).map((skill, idx) => (
                <Badge key={idx} variant="slate" size="sm">
                  {skill}
                </Badge>
              ))}
            </>
          )}
        </div>
      </div>

      {/* AI Recommendation Banner */}
      {aiRecommendation && (
        <div className="mt-3 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs">
          <div className="flex items-center gap-1.5 text-purple-300 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Match Rationale</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {aiRecommendation.rationale}
          </p>
        </div>
      )}

      {/* Expandable Mathematical Weight Breakdown for Viva */}
      <div className="mt-2 text-right">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[11px] text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 font-mono"
        >
          {isExpanded ? (
            <>Hide Formula Breakdown <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>View Formula Weights & Score Details <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>

      {isExpanded && breakdown && (
        <div className="mt-3 p-4 rounded-xl bg-[#090d20] border border-purple-500/25 space-y-3 font-mono text-xs animate-in fade-in">
          <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
            Weighted Component Calculation:
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
            <div className="p-2 rounded-lg bg-slate-900/80 border border-purple-500/20">
              <div className="text-[10px] text-slate-400">Skills (40%)</div>
              <div className="text-sm font-bold text-purple-300">{breakdown.skills.score}%</div>
              <div className="text-[9px] text-emerald-400">+{breakdown.weights.skillsContribution} pts</div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/80 border border-cyan-500/20">
              <div className="text-[10px] text-slate-400">Interests (25%)</div>
              <div className="text-sm font-bold text-cyan-300">{breakdown.interests.score}%</div>
              <div className="text-[9px] text-cyan-400">+{breakdown.weights.interestsContribution} pts</div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/80 border border-emerald-500/20">
              <div className="text-[10px] text-slate-400">Goal (20%)</div>
              <div className="text-sm font-bold text-emerald-300">{breakdown.goal.score}%</div>
              <div className="text-[9px] text-emerald-400">+{breakdown.weights.goalContribution} pts</div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/80 border border-amber-500/20">
              <div className="text-[10px] text-slate-400">Experience (10%)</div>
              <div className="text-sm font-bold text-amber-300">{breakdown.experience.score}%</div>
              <div className="text-[9px] text-amber-400">+{breakdown.weights.expContribution} pts</div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900/80 border border-indigo-500/20 col-span-2 sm:col-span-1">
              <div className="text-[10px] text-slate-400">Availability (5%)</div>
              <div className="text-sm font-bold text-indigo-300">{breakdown.availability.score}%</div>
              <div className="text-[9px] text-indigo-400">+{breakdown.weights.availContribution} pts</div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 pt-1">
            <strong>Formula Result:</strong> ({breakdown.weights.skillsContribution}) + ({breakdown.weights.interestsContribution}) + ({breakdown.weights.goalContribution}) + ({breakdown.weights.expContribution}) + ({breakdown.weights.availContribution}) = <span className="text-cyan-300 font-bold">{matchScore}% Overall Compatibility</span>
          </div>
        </div>
      )}

    </GlassCard>
  );
}
