export const initialProjects = [
  {
    id: "proj-1",
    title: "AI Study Buddy & Note Summarizer",
    description: "An AI-powered academic assistant for college students that extracts key lecture insights, generates practice quizzes, and schedules spaced repetition reminders.",
    category: "AI & EdTech",
    goal: "College Mini-Project Top Marks",
    progress: 75,
    status: "In Progress", // "Planning", "In Progress", "Completed", "Review"
    targetDeadline: "2026-10-15",
    teamName: "NeuralLearners Hive",
    members: [
      { id: "std-101", name: "FEROZ KHAN", role: "Full Stack Lead", initials: "FK", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
      { id: "std-102", name: "Ananya Iyer", role: "AI / ML Specialist", initials: "AI", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" },
      { id: "std-104", name: "Priya Verma", role: "UI/UX & Frontend Developer", initials: "PV", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" }
    ],
    requiredSkills: ["React", "Python", "FastAPI", "NLP", "TailwindCSS", "Transformers"],
    milestones: [
      { title: "Literature Review & SRS Document", completed: true },
      { title: "NLP Summarization Model Pipeline", completed: true },
      { title: "React Frontend & Audio Ingestion UI", completed: true },
      { title: "Final Evaluation & Viva Presentation Prep", completed: false }
    ],
    compatibilityScore: 94
  },
  {
    id: "proj-2",
    title: "FinGuard AI: Anomaly Detector",
    description: "Real-time fraudulent transaction detection model with automated student budget analytics dashboard.",
    category: "FinTech & ML",
    goal: "FinTech Hackathon & Mini-Project",
    progress: 40,
    status: "In Progress",
    targetDeadline: "2026-11-20",
    teamName: "QuantumGuard",
    members: [
      { id: "std-103", name: "Vikram Patel", role: "Backend Architect", initials: "VP", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
      { id: "std-108", name: "Meera Nambiar", role: "Data Scientist", initials: "MN", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" }
    ],
    requiredSkills: ["Python", "FastAPI", "Scikit-Learn", "PostgreSQL", "Docker", "React"],
    milestones: [
      { title: "Dataset Cleaning & Feature Engineering", completed: true },
      { title: "Anomaly Classification Model", completed: true },
      { title: "FastAPI REST Endpoints", completed: false },
      { title: "Dashboard Integration", completed: false }
    ],
    compatibilityScore: 88
  },
  {
    id: "proj-3",
    title: "Smart Attendance IoT System",
    description: "Camera-enabled contactless face recognition attendance gateway with teacher dashboard.",
    category: "Computer Vision & IoT",
    goal: "Hardware Demo & Sustainable Project",
    progress: 100,
    status: "Completed",
    targetDeadline: "2026-06-30",
    teamName: "VisionCore Labs",
    members: [
      { id: "std-105", name: "Rohan Kulkarni", role: "IoT Hardware Lead", initials: "RK", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
      { id: "std-106", name: "Sneha Mukherjee", role: "Cloud & Security Engineer", initials: "SM", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" }
    ],
    requiredSkills: ["C++", "Python", "OpenCV", "Raspberry Pi", "React", "Docker"],
    milestones: [
      { title: "Hardware Enclosure & Camera Assembly", completed: true },
      { title: "Face Recognition Model", completed: true },
      { title: "Cloud Database Sync", completed: true },
      { title: "College Pilot Deployment", completed: true }
    ],
    compatibilityScore: 91
  }
];
