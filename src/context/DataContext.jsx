import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { rankTeammates } from '../services/matchingEngine';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [teams, setTeams] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({ themeAccent: 'purple', presentationMode: true });
  const [activeProjectSpec, setActiveProjectSpec] = useState({
    name: "AI Study Buddy",
    description: "An AI-powered academic assistant that extracts key lecture insights, generates practice quizzes, and schedules revision reminders.",
    category: "AI & EdTech",
    goal: "College Mini-Project Top Marks",
    requiredSkills: ["React", "Python", "FastAPI", "NLP", "TailwindCSS"],
    teamSize: 3
  });
  const [bookmarkedCandidateIds, setBookmarkedCandidateIds] = useState([]);

  // Load from storage on mount
  useEffect(() => {
    storageService.initStorage();
    refreshAllData();
  }, []);

  const refreshAllData = () => {
    setStudents(storageService.getStudents());
    setProjects(storageService.getProjects());
    setIdeas(storageService.getIdeas());
    setTeams(storageService.getTeams());
    setNotifications(storageService.getNotifications());
    setSettings(storageService.getSettings());
  };

  // Team actions
  const createTeam = (teamData) => {
    const newTeam = {
      id: `team-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: "Active",
      ...teamData
    };
    const updated = [newTeam, ...teams];
    setTeams(updated);
    storageService.saveTeams(updated);

    // Also create corresponding notification
    addNotification({
      type: "team_created",
      title: `Team Formed: ${newTeam.name}`,
      message: `Successfully assembled team with ${newTeam.members.length} members and ${newTeam.compatibilityScore}% compatibility score.`,
      actionRequired: false
    });

    return newTeam;
  };

  const deleteTeam = (teamId) => {
    const updated = teams.filter(t => t.id !== teamId);
    setTeams(updated);
    storageService.saveTeams(updated);
  };

  // Project actions
  const createProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      progress: 10,
      status: "In Progress",
      milestones: [
        { title: "Project Proposal & SRS Approval", completed: true },
        { title: "System Design & Architecture Diagram", completed: false },
        { title: "Core Prototype Implementation", completed: false },
        { title: "Final Evaluation & Viva Demo", completed: false }
      ],
      ...projectData
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    storageService.saveProjects(updated);
    return newProj;
  };

  const updateProjectProgress = (projectId, progress, milestoneIndex = null) => {
    const updated = projects.map(proj => {
      if (proj.id === projectId) {
        let updatedMilestones = proj.milestones;
        if (milestoneIndex !== null && proj.milestones[milestoneIndex]) {
          updatedMilestones = proj.milestones.map((m, idx) => 
            idx === milestoneIndex ? { ...m, completed: !m.completed } : m
          );
        }
        return {
          ...proj,
          progress: progress !== undefined ? progress : proj.progress,
          milestones: updatedMilestones,
          status: progress >= 100 ? "Completed" : "In Progress"
        };
      }
      return proj;
    });
    setProjects(updated);
    storageService.saveProjects(updated);
  };

  const deleteProject = (projectId) => {
    const updated = projects.filter(p => p.id !== projectId);
    setProjects(updated);
    storageService.saveProjects(updated);
  };

  // Notification actions
  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      timestamp: "Just now",
      read: false,
      ...notif
    };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    storageService.saveNotifications(updated);
  };

  const markNotificationRead = (notifId) => {
    const updated = notifications.map(n => n.id === notifId ? { ...n, read: true } : n);
    setNotifications(updated);
    storageService.saveNotifications(updated);
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    storageService.saveNotifications(updated);
  };

  const acceptTeamInvite = (notifId) => {
    const notif = notifications.find(n => n.id === notifId);
    if (!notif) return;

    markNotificationRead(notifId);
    addNotification({
      type: "success",
      title: "Team Invitation Accepted!",
      message: `You have joined ${notif.data?.teamName || "the team"}. Access it from My Teams.`,
      actionRequired: false
    });
  };

  // Bookmark toggle
  const toggleBookmark = (studentId) => {
    setBookmarkedCandidateIds(prev => 
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  // Settings
  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    storageService.saveSettings(updated);
  };

  const resetAllDataToDefault = () => {
    storageService.resetAllData();
    refreshAllData();
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <DataContext.Provider value={{
      students,
      projects,
      ideas,
      teams,
      notifications,
      unreadNotifsCount,
      settings,
      activeProjectSpec,
      setActiveProjectSpec,
      bookmarkedCandidateIds,
      toggleBookmark,
      createTeam,
      deleteTeam,
      createProject,
      updateProjectProgress,
      deleteProject,
      addNotification,
      markNotificationRead,
      markAllNotificationsRead,
      acceptTeamInvite,
      updateSettings,
      resetAllDataToDefault,
      refreshAllData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
