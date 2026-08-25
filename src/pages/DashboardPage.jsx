import React from 'react';
import { 
  Sparkles, 
  Users, 
  FolderKanban, 
  Lightbulb, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Award,
  Layers
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { MatchGauge } from '../components/common/MatchGauge';
import { ProgressBar } from '../components/common/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { rankTeammates } from '../services/matchingEngine';

export function DashboardPage({ setActivePage, onOpenVivaModal }) {
  const { currentUser } = useAuth();
  const { students, projects, ideas, teams } = useData();

  // Filter out current user from candidate pool
  const candidatePool = students.filter(s => s.id !== currentUser?.id);
  
  // Calculate top recommended teammates for current user's profile
  const topMatchedTeammates = rankTeammates(candidatePool, {
    name: "Collaborative Mini-Project",
    category: currentUser?.interests?.[0] || "AI & Web",
    goal: currentUser?.goal || "College Mini-Project Top Marks",
    requiredSkills: currentUser?.skills || ["React", "Python"]
  }).slice(0, 3);

  const activeProjects = projects.filter(p => p.status !== "Completed").slice(0, 2);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Welcome Banner */}
      <GlassCard className="p-6 sm:p-8 border-purple-500/30 bg-gradient-to-r from-[#0f1430]/90 via-[#0d1024]/90 to-[#070913]/90 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-xs font-semibold text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Recommendation Engine Online</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Welcome back, <span className="gradient-text-purple">{currentUser?.name || "Student"}</span> 👋
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Bee Sync has matched you with <strong>{candidatePool.length} compatible candidates</strong> across {currentUser?.college || "the college network"}. Explore balanced squads below.
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActivePage('find-teammates')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-neon-purple transition-all"
            >
              <Zap className="w-4 h-4 text-cyan-300" />
              <span>Find Best Teammates</span>
            </button>

            <button
              onClick={onOpenVivaModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-200 text-xs font-semibold hover:border-purple-400"
            >
              <span>Viva Architecture</span>
            </button>
          </div>
        </div>
      </GlassCard>

      {/* 4 Stat Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <GlassCard className="p-4 sm:p-5 border-purple-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">Active Students</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">142+</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18 joined this semester
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5 border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">Match Accuracy</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">94.2%</div>
          <div className="text-[11px] text-cyan-400/80 mt-1">
            Multi-factor weighted optimization
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5 border-emerald-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">Active Projects</span>
            <FolderKanban className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
            {projects.length + 35}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">
            Across 5 college departments
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5 border-pink-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider font-mono">Formed Teams</span>
            <ShieldCheck className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-pink-300 font-mono">
            {teams.length + 27}
          </div>
          <div className="text-[11px] text-pink-400/80 mt-1">
            100% Viva Approved squads
          </div>
        </GlassCard>

      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Top Matched Teammates & Active Projects */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Top Matched Teammates Widget */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>Top Matched Teammates For You</span>
                </h2>
                <p className="text-xs text-slate-400">Ranked by 5-factor AI compatibility matrix</p>
              </div>

              <button
                onClick={() => setActivePage('find-teammates')}
                className="text-xs font-semibold text-purple-300 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>View Full Ranking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {topMatchedTeammates.map((student) => (
                <GlassCard key={student.id} className="p-4 sm:p-5 border-purple-500/20">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    <div className="flex items-start gap-3 flex-1">
                      <img 
                        src={student.avatar} 
                        alt={student.name} 
                        className="w-12 h-12 rounded-xl object-cover border border-purple-500/30" 
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{student.name}</h4>
                          <Badge variant="purple" size="sm">{student.preferredRole}</Badge>
                        </div>
                        <p className="text-xs text-slate-400">{student.department} • {student.year}</p>
                        
                        <div className="flex flex-wrap gap-1 pt-1">
                          {student.skills.slice(0, 3).map((s, idx) => (
                            <Badge key={idx} variant="emerald" size="sm">{s}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <MatchGauge score={student.matchScore} size="sm" label="FIT" />
                      <button
                        onClick={() => setActivePage('find-teammates')}
                        className="px-3.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-colors"
                      >
                        Match Spec
                      </button>
                    </div>

                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-slate-300 italic flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{student.aiRecommendation.rationale}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Active Projects Tracker Widget */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-purple-400" />
                  <span>Your Active Projects</span>
                </h2>
                <p className="text-xs text-slate-400">Track milestones and deliverables for submission</p>
              </div>

              <button
                onClick={() => setActivePage('my-projects')}
                className="text-xs font-semibold text-purple-300 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>All Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeProjects.map((proj) => (
                <GlassCard key={proj.id} className="p-5 border-purple-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={proj.status === "Completed" ? "emerald" : "cyan"} size="sm">
                      {proj.status}
                    </Badge>
                    <span className="text-[10px] text-slate-400 font-mono">{proj.targetDeadline}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{proj.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                  </div>

                  <ProgressBar value={proj.progress} showLabel={true} variant="gradient" height="h-2" />

                  <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-purple-300 font-medium">{proj.teamName}</span>
                    <span className="text-[10px] text-slate-400">{proj.milestones.filter(m => m.completed).length}/{proj.milestones.length} Milestones</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: User Profile Summary & Recommended Project Ideas */}
        <div className="space-y-6">
          
          {/* User Profile Card */}
          <GlassCard className="p-5 border-purple-500/30 bg-[#0e132c]/90 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
                alt={currentUser?.name} 
                className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/40 shadow-md" 
              />
              <div>
                <h3 className="text-base font-bold text-white">{currentUser?.name}</h3>
                <p className="text-xs text-purple-300 font-semibold">{currentUser?.preferredRole || "Developer"}</p>
                <p className="text-[11px] text-slate-400">{currentUser?.department}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-purple-500/20 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">College:</span>
                <span className="font-medium text-right truncate max-w-[170px]">{currentUser?.college}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Year & CGPA:</span>
                <span className="font-medium font-mono text-purple-300">{currentUser?.year} (CGPA {currentUser?.cgpa})</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Weekly Bandwidth:</span>
                <span className="font-medium font-mono text-cyan-300">{currentUser?.availability || 15} hrs/week</span>
              </div>
            </div>

            <div className="pt-2 border-t border-purple-500/20">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5 font-mono">My Primary Skills</span>
              <div className="flex flex-wrap gap-1">
                {(currentUser?.skills || []).map((s, idx) => (
                  <Badge key={idx} variant="purple" size="sm">{s}</Badge>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActivePage('profile')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-xs font-semibold text-purple-200 transition-colors"
            >
              Edit My Profile & Availability
            </button>
          </GlassCard>

          {/* Recommended Project Ideas Widget */}
          <GlassCard className="p-5 border-cyan-500/25 bg-[#0a1024]/90 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Recommended Ideas</h3>
              </div>
              <button 
                onClick={() => setActivePage('project-ideas')}
                className="text-[11px] text-cyan-400 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {ideas.slice(0, 3).map((idea) => (
                <div 
                  key={idea.id}
                  onClick={() => setActivePage('project-ideas')}
                  className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/15 hover:border-cyan-500/40 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{idea.title}</h5>
                    <Badge variant="cyan" size="sm">{idea.difficulty}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{idea.subtitle}</p>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

      </div>

    </div>
  );
}
