import React, { useState } from 'react';
import { FolderKanban, Plus, Filter, Sparkles, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { ProjectCard } from '../components/projects/ProjectCard';
import { CreateProjectModal } from '../components/projects/CreateProjectModal';
import { useData } from '../context/DataContext';

export function MyProjectsPage({ setActivePage }) {
  const { projects, createProject, deleteProject, updateProjectProgress, setActiveProjectSpec } = useData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredProjects = filterStatus === 'All' 
    ? projects 
    : projects.filter(p => p.status === filterStatus);

  const handleUpdateMilestone = (projectId, milestoneIndex) => {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    const milestones = proj.milestones.map((m, idx) => 
      idx === milestoneIndex ? { ...m, completed: !m.completed } : m
    );
    const completedCount = milestones.filter(m => m.completed).length;
    const progress = Math.round((completedCount / milestones.length) * 100);

    updateProjectProgress(projectId, progress, milestoneIndex);
  };

  const handleFindTeammates = (project) => {
    setActiveProjectSpec({
      name: project.title,
      description: project.description,
      category: project.category,
      goal: project.goal || "College Mini-Project Top Marks",
      requiredSkills: project.requiredSkills || ["React", "Python"],
      teamSize: 3
    });
    setActivePage('find-teammates');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & New Project CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Projects Workspace</h1>
            <Badge variant="purple" size="sm">{projects.length} Total</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your semester project deliverables, track milestones, and assemble squads.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-neon-purple transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['All', 'In Progress', 'Completed', 'Planning'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === status
                ? 'bg-purple-600 text-white shadow-neon-purple'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-purple-500/15'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <GlassCard className="p-12 text-center border-purple-500/20 space-y-4">
          <FolderKanban className="w-12 h-12 text-purple-400 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white">No Projects Found</h3>
            <p className="text-xs text-slate-400 mt-1">Start by creating a new college project or exploring project ideas.</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
          >
            Create Project
          </button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onUpdateMilestone={handleUpdateMilestone}
              onDelete={deleteProject}
              onFindTeammatesForProject={handleFindTeammates}
            />
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateProject={createProject}
      />

    </div>
  );
}
