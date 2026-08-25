import React, { useState } from 'react';
import { X, FolderPlus, Sparkles, Calendar, Layers, Plus } from 'lucide-react';
import { Badge } from '../common/Badge';

export function CreateProjectModal({ isOpen, onClose, onCreateProject }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('AI & Machine Learning');
  const [goal, setGoal] = useState('College Mini-Project Top Marks');
  const [targetDeadline, setTargetDeadline] = useState('2026-11-30');
  const [skillInput, setSkillInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState(['React', 'Python', 'FastAPI']);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !requiredSkills.includes(skillInput.trim())) {
      setRequiredSkills([...requiredSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateProject({
      title,
      description,
      category,
      goal,
      targetDeadline,
      requiredSkills,
      teamName: `${title.split(' ')[0]} Devs`,
      members: [],
      compatibilityScore: 85
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c1029] border border-purple-500/30 shadow-2xl p-6 sm:p-8 text-slate-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 shadow-neon-purple">
            <FolderPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Create New College Project</h2>
            <p className="text-xs sm:text-sm text-slate-400">Initialize a project workspace with milestones and required skills</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
              placeholder="e.g. Smart Energy Monitoring System"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
              Abstract / Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
              placeholder="Describe the problem statement, objectives, and expected deliverables..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
              >
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Computer Vision & IoT">Computer Vision & IoT</option>
                <option value="Full Stack & Web3">Full Stack & Web3</option>
                <option value="FinTech & Security">FinTech & Security</option>
                <option value="EdTech & Utilities">EdTech & Utilities</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                Project Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
              >
                <option value="College Mini-Project Top Marks">College Mini-Project Top Marks</option>
                <option value="Hackathon Win & MVP">Hackathon Win & MVP</option>
                <option value="Research Paper Publication">Research Paper Publication</option>
                <option value="Startup Product Showcase">Startup Product Showcase</option>
              </select>
            </div>
          </div>

          {/* Required Skills input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
              Required Technology Skills
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (skillInput.trim() && !requiredSkills.includes(skillInput.trim())) {
                      setRequiredSkills([...requiredSkills, skillInput.trim()]);
                      setSkillInput('');
                    }
                  }
                }}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-purple-500/30 text-xs text-white focus:outline-none focus:border-purple-400"
                placeholder="Type a skill (e.g. Docker, OpenCV, React) and press Enter"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl bg-purple-600/50 hover:bg-purple-600 text-white text-xs font-semibold"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {requiredSkills.map((skill) => (
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
          </div>

          {/* Action Buttons */}
          <div className="border-t border-slate-800 pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-neon-purple"
            >
              Create Project
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
