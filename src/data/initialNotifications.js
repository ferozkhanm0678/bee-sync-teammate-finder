export const initialNotifications = [
  {
    id: "notif-1",
    type: "team_invite",
    title: "Team Invitation: NeuralLearners Hive",
    message: "FEROZ KHAN invited you to join the 'AI Study Buddy' project as AI/ML Specialist.",
    timestamp: "10 mins ago",
    read: false,
    actionRequired: true,
    data: {
      projectId: "proj-1",
      teamName: "NeuralLearners Hive",
      inviterName: "FEROZ KHAN",
      role: "AI / ML Specialist"
    }
  },
  {
    id: "notif-2",
    type: "match_alert",
    title: "High Compatibility Match Found! (96%)",
    message: "Ananya Iyer matches 96% of your requested skills for 'Campus Event Planner'.",
    timestamp: "1 hour ago",
    read: false,
    actionRequired: false,
    data: {
      studentId: "std-102"
    }
  },
  {
    id: "notif-3",
    type: "milestone",
    title: "Project Milestone Completed",
    message: "Milestone 'NLP Summarization Model Pipeline' was marked complete by Ananya.",
    timestamp: "Yesterday",
    read: true,
    actionRequired: false
  },
  {
    id: "notif-4",
    type: "viva_alert",
    title: "Viva Readiness Review",
    message: "Your project team 'NeuralLearners Hive' has reached 94% team synergy score.",
    timestamp: "2 days ago",
    read: true,
    actionRequired: false
  }
];
