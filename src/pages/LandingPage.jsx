import React, { useState } from 'react';
import { 
  Hexagon, 
  Sparkles, 
  Users, 
  ArrowRight, 
  Cpu, 
  Target, 
  ShieldCheck, 
  Lightbulb, 
  CheckCircle2, 
  GraduationCap, 
  TrendingUp,
  Layers,
  Zap,
  BookOpenCheck,
  BrainCircuit,
  ScanFace
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { MatchGauge } from '../components/common/MatchGauge';
import { rankTeammates } from '../services/matchingEngine';
import { initialStudents } from '../data/initialStudents';

export function LandingPage({ onGetStarted, onOpenVivaModal }) {
  // Mini interactive teaser for landing page
  const [demoSkill, setDemoSkill] = useState("Python");
  const [demoGoal, setDemoGoal] = useState("College Mini-Project Top Marks");

  const sampleMatchCandidates = rankTeammates(initialStudents.slice(0, 3), {
    name: "Interactive Demo Project",
    requiredSkills: [demoSkill, "React"],
    category: "AI & Web",
    goal: demoGoal
  });

  return (
    <div className="relative overflow-hidden pt-6 pb-20 space-y-24">
      
      {/* Background Glow Spheres */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-purple-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 right-[-100px] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-500/30 backdrop-blur-xl shadow-neon-purple animate-pulse-slow">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-purple-200 tracking-wide">
            AI-Driven Teammate Recommendation & Synergy Engine
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            v1.0 Live
          </span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Find the <span className="gradient-text-purple">Right Team</span>.<br />
            Build <span className="gradient-text-gold">Better Projects</span>.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate random project grouping. Bee Sync matches students using an explicit multi-factor algorithm across <strong>Skills, Interests, Project Goals, Experience, and Availability</strong>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base shadow-neon-purple hover:scale-105 transition-all duration-300"
          >
            <span>Launch Bee Sync Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenVivaModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#0e1329]/90 hover:bg-slate-800/90 border border-purple-500/30 text-purple-200 text-sm font-semibold hover:border-purple-400 transition-all"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Algorithm & Viva Architecture</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
          <GlassCard className="p-4 sm:p-5 text-center border-purple-500/20">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">142+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Active Students (Demo)</div>
          </GlassCard>

          <GlassCard className="p-4 sm:p-5 text-center border-cyan-500/20">
            <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">94.2%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Match Accuracy</div>
          </GlassCard>

          <GlassCard className="p-4 sm:p-5 text-center border-emerald-500/20">
            <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">38+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Active Projects</div>
          </GlassCard>

          <GlassCard className="p-4 sm:p-5 text-center border-pink-500/20">
            <div className="text-2xl sm:text-3xl font-black text-pink-300 font-mono">29+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Successful Teams</div>
          </GlassCard>
        </div>

      </section>

      {/* Interactive Match Teaser Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard className="p-6 sm:p-8 border-purple-500/30 bg-gradient-to-b from-[#0e1329]/90 to-[#090d1f]/90 shadow-2xl">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-purple-500/20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Live Matching Simulator</h2>
                <Badge variant="cyan" size="sm">Interactive</Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Experience real-time compatibility calculation with formula weights.
              </p>
            </div>

            {/* Quick Teaser Selectors */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-purple-500/20 text-xs">
                <span className="text-slate-400">Target Skill:</span>
                <select
                  value={demoSkill}
                  onChange={(e) => setDemoSkill(e.target.value)}
                  className="bg-transparent text-purple-300 font-semibold focus:outline-none"
                >
                  <option value="Python">Python</option>
                  <option value="React">React</option>
                  <option value="Docker">Docker</option>
                  <option value="FastAPI">FastAPI</option>
                  <option value="C++">C++</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-purple-500/20 text-xs">
                <span className="text-slate-400">Goal:</span>
                <select
                  value={demoGoal}
                  onChange={(e) => setDemoGoal(e.target.value)}
                  className="bg-transparent text-cyan-300 font-semibold focus:outline-none"
                >
                  <option value="College Mini-Project Top Marks">Mini-Project (Top Marks)</option>
                  <option value="Hackathon Win & MVP">Hackathon Win</option>
                  <option value="Research Publication">Research Publication</option>
                </select>
              </div>
            </div>
          </div>

          {/* Matched Teammate Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            {sampleMatchCandidates.map((candidate) => (
              <div 
                key={candidate.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/20 space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={candidate.avatar} 
                      alt={candidate.name} 
                      className="w-10 h-10 rounded-xl object-cover border border-purple-500/30" 
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{candidate.name}</div>
                      <div className="text-[10px] text-purple-300">{candidate.preferredRole}</div>
                    </div>
                  </div>
                  <MatchGauge score={candidate.matchScore} size="sm" label="" />
                </div>

                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant={skill === demoSkill ? "emerald" : "purple"} size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="text-[11px] text-slate-300 italic line-clamp-2 pt-1 border-t border-slate-800">
                  "{candidate.aiRecommendation.rationale}"
                </div>
              </div>
            ))}
          </div>

        </GlassCard>
      </section>

      {/* 3 Pillars / Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="purple" size="md">Core Innovation</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Designed Specifically for College Projects
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Traditional group formation leads to unbalanced teams where only one person codes. Bee Sync builds balanced squads with guaranteed skill coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <GlassCard className="p-6 space-y-4 border-purple-500/20">
            <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300 w-fit">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white">5-Factor Weighted Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent mathematical optimization balancing Skills (40%), Interests (25%), Project Goal (20%), Experience (10%), and Weekly Availability (5%).
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-4 border-cyan-500/20">
            <div className="p-3 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 w-fit">
              <BrainCircuit className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Synergy & Skill Gap Radar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects if your team is missing critical domains like Database indexing or UI design and provides actionable advice before final submission.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-4 border-emerald-500/20">
            <div className="p-3 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 w-fit">
              <GraduationCap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Viva Presentation Mode</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built-in examiners panel displaying step-by-step formula derivations and team balance charters to impress college viva evaluators.
            </p>
          </GlassCard>

        </div>
      </section>

      {/* Curated Project Ideas Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Badge variant="cyan" size="md">Project Ideas Vault</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Pre-Configured College Mini-Projects
            </h2>
          </div>
          <button 
            onClick={onGetStarted}
            className="text-xs font-semibold text-purple-300 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Explore All 6 Ideas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 border-purple-500/20 space-y-3">
            <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-300 w-fit">
              <BookOpenCheck className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="text-base font-bold text-white">AI Study Buddy</h4>
            <p className="text-xs text-slate-400">Intelligent lecture summarizer and revision quiz generator using NLP transformers.</p>
            <div className="flex flex-wrap gap-1 pt-1">
              <Badge variant="purple" size="sm">NLP</Badge>
              <Badge variant="cyan" size="sm">FastAPI</Badge>
              <Badge variant="slate" size="sm">React</Badge>
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-cyan-500/20 space-y-3">
            <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-300 w-fit">
              <ScanFace className="w-5 h-5 text-cyan-400" />
            </div>
            <h4 className="text-base font-bold text-white">Smart Face Attendance</h4>
            <p className="text-xs text-slate-400">Automated classroom attendance tracking with edge computer vision and anti-spoofing.</p>
            <div className="flex flex-wrap gap-1 pt-1">
              <Badge variant="cyan" size="sm">OpenCV</Badge>
              <Badge variant="purple" size="sm">PyTorch</Badge>
              <Badge variant="slate" size="sm">PostgreSQL</Badge>
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-emerald-500/20 space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 w-fit">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-base font-bold text-white">FinGuard AI</h4>
            <p className="text-xs text-slate-400">Smart anomaly detector and student budget expense forecaster with machine learning.</p>
            <div className="flex flex-wrap gap-1 pt-1">
              <Badge variant="emerald" size="sm">FinTech</Badge>
              <Badge variant="purple" size="sm">Scikit-Learn</Badge>
              <Badge variant="slate" size="sm">React</Badge>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <GlassCard className="p-8 sm:p-12 border-purple-500/40 bg-gradient-to-b from-[#101633] to-[#080b1a] shadow-neon-purple space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Ready to Build Your College Mini-Project?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Find your ideal teammates in seconds, verify your team synergy score, and submit a high-grade project.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-neon-purple hover:scale-105 transition-all"
          >
            Get Started (Free Demo Access)
          </button>
        </GlassCard>
      </section>

    </div>
  );
}
