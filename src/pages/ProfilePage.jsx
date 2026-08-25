import React, { useState } from 'react';
import { 
  UserCircle, 
  Sparkles, 
  GraduationCap, 
  Clock, 
  Save, 
  Code2, 
  CheckCircle2, 
  Briefcase,
  Layers,
  Award,
  Globe
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { useAuth } from '../context/AuthContext';

export function ProfilePage() {
  const { currentUser, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    college: currentUser?.college || 'Institute of Technology & Science',
    department: currentUser?.department || 'Computer Science & Engineering',
    year: currentUser?.year || '3rd Year',
    cgpa: currentUser?.cgpa || '8.92',
    preferredRole: currentUser?.preferredRole || 'Full Stack Lead',
    experience: currentUser?.experience || 'Intermediate',
    availability: currentUser?.availability || 18,
    goal: currentUser?.goal || 'College Mini-Project Top Marks',
    bio: currentUser?.bio || '',
    github: currentUser?.github || 'github.com/myprofile',
    linkedin: currentUser?.linkedin || 'linkedin.com/in/myprofile'
  });

  const [skills, setSkills] = useState(currentUser?.skills || ['React', 'Node.js', 'Python', 'TailwindCSS']);
  const [skillInput, setSkillInput] = useState('');

  const [interests, setInterests] = useState(currentUser?.interests || ['Web Development', 'AI/ML', 'Hackathons']);
  const [interestInput, setInterestInput] = useState('');

  const [isSaved, setIsSaved] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      ...formData,
      skills,
      interests
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Calculate profile completeness score
  const completeness = Math.min(100, Math.round(
    ((formData.name ? 20 : 0) +
    (skills.length >= 3 ? 30 : skills.length * 10) +
    (formData.bio ? 15 : 0) +
    (formData.cgpa ? 15 : 0) +
    (formData.github ? 10 : 0) +
    (formData.availability ? 10 : 0))
  ));

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Profile & Preferences</h1>
            <Badge variant="purple" size="sm">Active Profile</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Keep your skills and availability updated to receive accurate recommendations.
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Saved Successfully!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Card & Completeness Gauge */}
        <div className="space-y-6">
          <GlassCard className="p-6 border-purple-500/30 text-center space-y-4">
            <div className="relative mx-auto w-24 h-24">
              <img 
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} 
                alt={currentUser?.name} 
                className="w-24 h-24 rounded-3xl object-cover border-2 border-purple-500/40 shadow-neon-purple mx-auto" 
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">{formData.name || "Student"}</h2>
              <p className="text-xs text-purple-300 font-semibold">{formData.preferredRole}</p>
              <p className="text-xs text-slate-400 mt-0.5">{formData.department}</p>
            </div>

            {/* Profile Completeness */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-purple-500/20 text-left space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Profile Match Readiness</span>
                <span className="text-cyan-400 font-mono">{completeness}%</span>
              </div>
              <ProgressBar value={completeness} variant="gradient" height="h-2" />
              <p className="text-[10px] text-slate-500 mt-1">
                Complete profiles match 3x faster with top-performing teams.
              </p>
            </div>

            {/* Availability Badge */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/15 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> Availability:
              </span>
              <span className="font-mono font-bold text-cyan-300">{formData.availability} hrs/week</span>
            </div>
          </GlassCard>
        </div>

        {/* Right 2 Columns: Edit Form */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 sm:p-8 border-purple-500/25">
            <form onSubmit={handleSave} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                    College / Institute
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                    Academic Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-slate-200 focus:outline-none"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Role & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                    Preferred Role
                  </label>
                  <select
                    value={formData.preferredRole}
                    onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-xs text-slate-200 focus:outline-none"
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
                  Verified Skills
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
                    placeholder="Add a new skill (e.g. Next.js, Kubernetes) and press Enter"
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
                  Short Bio
                </label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-white text-xs focus:outline-none focus:border-purple-400"
                  placeholder="Tell potential teammates about your project interests and working style..."
                />
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-white text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                    LinkedIn Profile
                  </label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-500/25 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-neon-purple transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Updates</span>
                </button>
              </div>

            </form>
          </GlassCard>
        </div>

      </div>

    </div>
  );
}
