import { initialStudents } from '../data/initialStudents';
import { initialProjects } from '../data/initialProjects';
import { initialProjectIdeas } from '../data/initialIdeas';
import { initialNotifications } from '../data/initialNotifications';

const STORAGE_KEYS = {
  CURRENT_USER: 'bee_sync_current_user',
  STUDENTS: 'bee_sync_students',
  PROJECTS: 'bee_sync_projects',
  IDEAS: 'bee_sync_ideas',
  NOTIFICATIONS: 'bee_sync_notifications',
  TEAMS: 'bee_sync_teams',
  SETTINGS: 'bee_sync_settings',
  INITIALIZED: 'bee_sync_init_v1.2'
};

export const storageService = {
  initStorage() {
    if (localStorage.getItem(STORAGE_KEYS.INITIALIZED) !== 'true_v1.2') {
      this.resetAllData();
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true_v1.2');
    }
  },

  resetAllData() {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(initialStudents));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(initialProjectIdeas));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifications));
    
    // Initial user is student 1 (FEROZ KHAN)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(initialStudents[0]));

    // Seed sample formed teams
    const sampleTeams = [
      {
        id: "team-101",
        name: "NeuralLearners Hive",
        projectName: "AI Study Buddy & Note Summarizer",
        category: "AI & EdTech",
        goal: "College Mini-Project Top Marks",
        createdAt: "2026-08-15",
        compatibilityScore: 94,
        status: "Active",
        members: [
          { ...initialStudents[0], assignedRole: "Full Stack Lead" },
          { ...initialStudents[1], assignedRole: "AI / ML Specialist" },
          { ...initialStudents[3], assignedRole: "UI/UX & Frontend Developer" }
        ],
        requiredSkills: ["React", "Python", "FastAPI", "NLP", "TailwindCSS"]
      },
      {
        id: "team-102",
        name: "QuantumGuard Devs",
        projectName: "FinGuard AI: Anomaly Detector",
        category: "FinTech & ML",
        goal: "FinTech Hackathon",
        createdAt: "2026-08-20",
        compatibilityScore: 88,
        status: "Active",
        members: [
          { ...initialStudents[2], assignedRole: "Backend Architect" },
          { ...initialStudents[7], assignedRole: "Data Scientist" }
        ],
        requiredSkills: ["Python", "FastAPI", "Scikit-Learn", "PostgreSQL"]
      }
    ];
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(sampleTeams));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      themeAccent: 'purple',
      presentationMode: true,
      emailNotifications: true,
      profilePublic: true
    }));
  },

  getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : initialStudents[0];
  },

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  getStudents() {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return raw ? JSON.parse(raw) : initialStudents;
  },

  saveStudents(students) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  },

  getProjects() {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return raw ? JSON.parse(raw) : initialProjects;
  },

  saveProjects(projects) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  getIdeas() {
    const raw = localStorage.getItem(STORAGE_KEYS.IDEAS);
    return raw ? JSON.parse(raw) : initialProjectIdeas;
  },

  getTeams() {
    const raw = localStorage.getItem(STORAGE_KEYS.TEAMS);
    return raw ? JSON.parse(raw) : [];
  },

  saveTeams(teams) {
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
  },

  getNotifications() {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : initialNotifications;
  },

  saveNotifications(notifs) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  },

  getSettings() {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : { themeAccent: 'purple', presentationMode: true };
  },

  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
};
