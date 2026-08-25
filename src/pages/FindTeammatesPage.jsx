import React, { useState } from 'react';
import { 
  UserSearch, 
  Sparkles, 
  Filter, 
  Search, 
  Plus, 
  Check, 
  Layers, 
  SlidersHorizontal, 
  Zap, 
  HelpCircle,
  Users,
  Target
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { TeammateCard } from '../components/matching/TeammateCard';
import { TeamSynergyPanel } from '../components/matching/TeamSynergyPanel';
import { CreateTeamModal } from '../components/matching/CreateTeamModal';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { rankTeammates } from '../services/matchingEngine';

export function FindTeammatesPage({ onOpenVivaModal, setActivePage }) {
  const { currentUser } = useAuth();
  const { 
    students, 
    activeProjectSpec, 
    setActiveProjectSpec, 
    createTeam, 
    bookmarkedCandidateIds, 
    toggleBookmark 
  } = useData();

  const [projectSpec, setProjectSpec] = useState(activeProjectSpec || {
    name: "AI Study Buddy",
    description: "An AI-powered academic assistant for college students.",
    category: "AI & EdTech",
    goal: "College Mini-Project Top Marks",
    requiredSkills: ["React", "Python", "FastAPI", "NLP", "TailwindCSS"],
    teamSize: 3
  });

  const [skillInput, setSkillInput] = useState('');
  const [selectedMembers, setSelectedMembers] = useState(() => {
    // Current logged-in user is by default a member of their team
    return currentUser ? [currentUser] : [];
  });
  
  const [filterRole, setFilterRole] = useState('All');
  const [filterExp, setFilterExp] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCalculated, setIsCalculated] = useState(true);

  // Available popular tech skills for quick clicking
  const popularSkills = ["React", "Python", "Node.js", "FastAPI", "Docker", "PyTorch", "OpenCV", "PostgreSQL", "Flutter", "TailwindCSS"];

  const handleAddSkill = (skill) => {
    const s = skill.trim();
    if (s && !projectSpec.requiredSkills.includes(s)) {
      const updated = { ...projectSpec, requiredSkills: [...projectSpec.requiredSkills, s] };
      setProjectSpec(updated);
      setActiveProjectSpec(updated);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = {
      ...projectSpec,
      requiredSkills: projectSpec.requiredSkills.filter(s => s !== skillToRemove)
    };
    setProjectSpec(updated);
    setActiveProjectSpec(updated);
  };

  const handleToggleSelectMember = (student) => {
    setSelectedMembers(prev => {
      const exists = prev.some(m => m.id === student.id);
      if (exists) {
        return prev.filter(m => m.id !== student.id);
      } else {
        if (prev.length >= 6) {
          alert("Maximum team size is 6 members.");
          return prev;
        }
        return [...prev, student];
      }
    });
  };

  const handleRemoveMember = (studentId) => {
    setSelectedMembers(prev => prev.filter(m => m.id !== studentId));
  };

  // Run real-time rankTeammates matching engine
  // Filter out current user from candidate pool so they don't match with themselves
  const candidatePool = students.filter(s => s.id !== currentUser?.id);
  const rankedCandidates = rankTeammates(candidatePool, projectSpec);

  // Apply UI Filters
  const filteredCandidates = rankedCandidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = filterRole === 'All' || candidate.preferredRole.includes(filterRole);
    const matchesExp = filterExp === 'All' || candidate.experience === filterExp;

    return matchesSearch && matchesRole && matchesExp;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Find Teammates</h1>
            <Badge variant="purple" size="sm">AI Matching Active</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Specify project requirements and compute real-time compatibility scores for candidates.
          </p>
        </div>

        <button
          onClick={onOpenVivaModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:border-purple-400 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Formula & Weights Explanation</span>
        </button>
      </div>

      {/* Project Requirements Spec Box */}
      <GlassCard className="p-6 border-purple-500/30 bg-[#0e132c]/90 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Project Specification & Target Stack</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Dynamic AI Calibration</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
              Project Name
            </label>
            <input
              type="text"
              value={projectSpec.name}
              onChange={(e) => {
                const updated = { ...projectSpec, name: e.target.value };
                setProjectSpec(updated);
                setActiveProjectSpec(updated);
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-purple-500/25 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
              placeholder="e.g. Smart Face Recognition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
              Category / Domain
            </label>
            <select
              value={projectSpec.category}
              onChange={(e) => {
                const updated = { ...projectSpec, category: e.target.value };
                setProjectSpec(updated);
                setActiveProjectSpec(updated);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
            >
              <option value="AI & EdTech">AI & EdTech</option>
              <option value="Computer Vision & IoT">Computer Vision & IoT</option>
              <option value="FinTech & Machine Learning">FinTech & Machine Learning</option>
              <option value="Web & Mobile Platforms">Web & Mobile Platforms</option>
              <option value="AI & Career Analytics">AI & Career Analytics</option>
              <option value="IoT & Sustainable Tech">IoT & Sustainable Tech</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
              Project Goal
            </label>
            <select
              value={projectSpec.goal}
              onChange={(e) => {
                const updated = { ...projectSpec, goal: e.target.value };
                setProjectSpec(updated);
                setActiveProjectSpec(updated);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
            >
              <option value="College Mini-Project Top Marks">College Mini-Project Top Marks</option>
              <option value="Hackathon Win & MVP">Hackathon Win & MVP</option>
              <option value="Research Publication & Paper">Research Publication & Paper</option>
              <option value="Startup Showcase & Portfolio">Startup Showcase & Portfolio</option>
            </select>
          </div>
        </div>

        {/* Required Skills Manager */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 font-mono">
            Required Technical Skills (Weighted 40% in Matching Engine)
          </label>
          
          <div className="flex gap-2 mb-2.5">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(skillInput);
                }
              }}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
              placeholder="Type required skill (e.g. PyTorch, React, Docker) and press Enter"
            />
            <button
              type="button"
              onClick={() => handleAddSkill(skillInput)}
              className="px-4 py-2 rounded-xl bg-purple-600/50 hover:bg-purple-600 text-white text-xs font-semibold"
            >
              Add
            </button>
          </div>

          {/* Active Skills List */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="text-[11px] text-slate-400 font-semibold mr-1">Active:</span>
            {projectSpec.requiredSkills.map((skill) => (
              <Badge 
                key={skill} 
                variant="purple" 
                size="sm" 
                onRemove={() => handleRemoveSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Suggestions:</span>
            {popularSkills
              .filter(s => !projectSpec.requiredSkills.includes(s))
              .slice(0, 6)
              .map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleAddSkill(s)}
                  className="px-2 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-purple-500/20 text-[10px] text-purple-300 font-mono"
                >
                  + {s}
                </button>
              ))}
          </div>
        </div>

        {/* Find Best Teammates Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setIsCalculated(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-neon-purple transition-all"
          >
            <Zap className="w-4 h-4 text-cyan-300" />
            <span>Find Best Teammates</span>
          </button>
        </div>

      </GlassCard>

      {/* Main Content Layout: Candidate Ranking + Team Synergy Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Search, Filters, and Ranked Teammate Cards */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#0e1329]/80 border border-purple-500/20">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates by name, skill, or department..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/90 text-xs text-white border border-slate-800 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 text-xs text-slate-300 border border-slate-800 focus:outline-none"
              >
                <option value="All">All Roles</option>
                <option value="Full Stack">Full Stack</option>
                <option value="AI">AI / ML</option>
                <option value="Backend">Backend</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Data">Data Scientist</option>
              </select>

              <select
                value={filterExp}
                onChange={(e) => setFilterExp(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 text-xs text-slate-300 border border-slate-800 focus:outline-none"
              >
                <option value="All">All Experience</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span>Showing <strong>{filteredCandidates.length}</strong> matching candidate profiles</span>
            <span className="text-purple-400">Sorted by highest match score</span>
          </div>

          {/* Teammate Cards List */}
          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <TeammateCard
                key={candidate.id}
                student={candidate}
                isSelected={selectedMembers.some(m => m.id === candidate.id)}
                onToggleSelect={handleToggleSelectMember}
                isBookmarked={bookmarkedCandidateIds.includes(candidate.id)}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>

        </div>

        {/* Right 1 Col: AI Team Synergy Matrix Panel */}
        <div className="space-y-6">
          <TeamSynergyPanel
            selectedMembers={selectedMembers}
            onRemoveMember={handleRemoveMember}
            projectSpecs={projectSpec}
            onOpenCreateTeamModal={() => setIsCreateModalOpen(true)}
          />
        </div>

      </div>

      {/* Create Team Modal */}
      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        selectedMembers={selectedMembers}
        projectSpecs={projectSpec}
        onCreateTeam={(newTeam) => {
          createTeam(newTeam);
          setActivePage('my-teams');
        }}
      />

    </div>
  );
}
