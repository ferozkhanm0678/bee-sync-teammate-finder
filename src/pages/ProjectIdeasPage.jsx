import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Layers, 
  BrainCircuit, 
  BookOpenCheck, 
  ScanFace, 
  CalendarDays, 
  ShieldAlert, 
  LeafyGreen 
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';

export function ProjectIdeasPage({ setActivePage }) {
  const { ideas, setActiveProjectSpec } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI & EdTech', 'Computer Vision & IoT', 'Web & Mobile Platforms', 'FinTech & Machine Learning', 'AI & Career Analytics', 'IoT & Sustainable Tech'];

  const filteredIdeas = selectedCategory === 'All' 
    ? ideas 
    : ideas.filter(i => i.category === selectedCategory);

  const handleStartTeamForIdea = (idea) => {
    setActiveProjectSpec({
      name: idea.title,
      description: idea.description,
      category: idea.category,
      goal: idea.goal,
      requiredSkills: idea.requiredSkills,
      teamSize: idea.suggestedTeamSize || 3
    });
    setActivePage('find-teammates');
  };

  const getIdeaIcon = (iconName) => {
    switch(iconName) {
      case 'BookOpenCheck': return <BookOpenCheck className="w-6 h-6 text-purple-400" />;
      case 'ScanFace': return <ScanFace className="w-6 h-6 text-cyan-400" />;
      case 'CalendarDays': return <CalendarDays className="w-6 h-6 text-pink-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-emerald-400" />;
      case 'BrainCircuit': return <BrainCircuit className="w-6 h-6 text-amber-400" />;
      case 'LeafyGreen': return <LeafyGreen className="w-6 h-6 text-lime-400" />;
      default: return <Lightbulb className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Project Ideas Catalog</h1>
            <Badge variant="cyan" size="sm">Curated</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            High-scoring college mini-project ideas with pre-configured tech stacks and recommended roles.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-neon-purple'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-purple-500/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <GlassCard 
            key={idea.id} 
            className="p-6 border-purple-500/20 hover:border-purple-500/40 flex flex-col justify-between"
          >
            <div className="space-y-4">
              
              <div className="flex items-start justify-between gap-3">
                <div className="p-3 rounded-2xl bg-slate-900 border border-purple-500/20 shadow-md">
                  {getIdeaIcon(idea.icon)}
                </div>
                <Badge variant={idea.difficulty === "Advanced" ? "rose" : "purple"} size="sm">
                  {idea.difficulty}
                </Badge>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider font-mono">
                  {idea.category}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">{idea.title}</h3>
                <p className="text-xs text-purple-300 font-medium mt-0.5">{idea.subtitle}</p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{idea.description}</p>
              </div>

              {/* Recommended Roles */}
              <div className="space-y-1 pt-2 border-t border-purple-500/15">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                  Recommended Team Roles ({idea.suggestedTeamSize || 3} Members):
                </span>
                <div className="flex flex-wrap gap-1">
                  {idea.recommendedRoles.map((role, idx) => (
                    <Badge key={idx} variant="slate" size="sm">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                  Target Tech Stack:
                </span>
                <div className="flex flex-wrap gap-1">
                  {idea.requiredSkills.map((skill, idx) => (
                    <Badge key={idx} variant="emerald" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

            </div>

            {/* Launch Button */}
            <div className="pt-6">
              <button
                onClick={() => handleStartTeamForIdea(idea)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-neon-purple transition-all group"
              >
                <span>Find Teammates For This Idea</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </GlassCard>
        ))}
      </div>

    </div>
  );
}
