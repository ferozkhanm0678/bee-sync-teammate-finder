import React, { useState } from 'react';
import { Hexagon, User, Mail, GraduationCap, Code2, Clock, Target, ArrowRight, Plus } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';

export function RegisterPage({ onNavigateLogin, onRegisterSuccess }) {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: 'Institute of Technology & Science',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    cgpa: '8.80',
    preferredRole: 'Full Stack Lead',
    experience: 'Intermediate',
    availability: 15,
    goal: 'College Mini-Project Top Marks',
    bio: '',
    github: 'github.com/myusername',
    linkedin: 'linkedin.com/in/myusername'
  });

  const [skills, setSkills] = useState(['React', 'Node.js', 'Python', 'TailwindCSS']);
  const [skillInput, setSkillInput] = useState('');

  const [interests, setInterests] = useState(['Web Development', 'Artificial Intelligence', 'Hackathons']);
  const [interestInput, setInterestInput] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (item) => {
    setSkills(skills.filter(s => s !== item));
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (item) => {
    setInterests(interests.filter(i => i !== item));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    register({
      ...formData,
      skills,
      interests,
      experienceYears: formData.experience === 'Advanced' ? 3.0 : formData.experience === 'Intermediate' ? 2.0 : 1.0
    });

    if (onRegisterSuccess) onRegisterSuccess();
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-neon-purple mb-2">
            <div className="w-full h-full bg-[#070913] rounded-[14px] flex items-center justify-center">
              <Hexagon className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-mono">STUDENT ONBOARDING</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Create your student profile to calculate high-accuracy teammate match scores
          </p>
        </div>

        <GlassCard className="p-6 sm:p-8 border-purple-500/30">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                  Student Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                  placeholder="rahul@college.edu"
                />
              </div>
            </div>

            {/* Academic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
                >
                  <option value="Computer Science & Engineering">CSE</option>
                  <option value="Information Technology">IT</option>
                  <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                  <option value="Electronics & Communication">ECE</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                  Academic Year
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                  CGPA
                </label>
                <input
                  type="text"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
                  placeholder="8.85"
                />
              </div>
            </div>

            {/* Role & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                  Preferred Project Role
                </label>
                <select
                  value={formData.preferredRole}
                  onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
                >
                  <option value="Full Stack Lead">Full Stack Lead</option>
                  <option value="AI / ML Engineer">AI / ML Engineer</option>
                  <option value="Backend & Cloud Architect">Backend & Cloud Architect</option>
                  <option value="UI/UX & Frontend Developer">UI/UX & Frontend Developer</option>
                  <option value="IoT & Hardware Lead">IoT & Hardware Lead</option>
                  <option value="Cybersecurity & DevOps">Cybersecurity & DevOps</option>
                  <option value="Data Scientist & NLP">Data Scientist & NLP</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                  Experience Level
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
                >
                  <option value="Beginner">Beginner (1 yr)</option>
                  <option value="Intermediate">Intermediate (2 yrs)</option>
                  <option value="Advanced">Advanced (3+ yrs & Hackathons)</option>
                </select>
              </div>
            </div>

            {/* Goal & Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                  Project Ambition / Goal
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
                >
                  <option value="College Mini-Project Top Marks">College Mini-Project Top Marks</option>
                  <option value="Hackathon Win & MVP">Hackathon Win & MVP</option>
                  <option value="Research Publication & Paper">Research Publication & Paper</option>
                  <option value="Startup Showcase & Portfolio">Startup Showcase & Portfolio</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                  Weekly Availability: <span className="text-cyan-400 font-mono">{formData.availability} hrs/week</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: Number(e.target.value) })}
                  className="w-full accent-purple-500 mt-2"
                />
              </div>
            </div>

            {/* Skills Tag Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                Technical Skills (Press Enter to Add)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(e);
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-white focus:outline-none focus:border-purple-400"
                  placeholder="e.g. PyTorch, React, Docker"
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
                {skills.map((skill) => (
                  <Badge key={skill} variant="purple" size="sm" onRemove={() => handleRemoveSkill(skill)}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                Short Bio / Pitch
              </label>
              <textarea
                rows={2}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-purple-500/25 text-white text-xs focus:outline-none focus:border-purple-400"
                placeholder="Briefly describe your passions, favorite stacks, or what you want to build..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-neon-purple transition-all"
            >
              <span>Complete Profile & Enter Bee Sync</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          <div className="mt-4 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <button
              onClick={onNavigateLogin}
              className="font-bold text-purple-400 hover:text-purple-300 underline underline-offset-2 ml-1"
            >
              Sign In
            </button>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
