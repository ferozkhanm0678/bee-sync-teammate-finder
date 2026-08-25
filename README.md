# 🐝 BEE SYNC
### AI Team Goal Finder & Teammate Recommendation System

> **Tagline**: Find the Right Team. Build Better Projects.  
> **Type**: College Mini-Project / Capstone Prototype  
> **Tech Stack**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti  
> **Architecture**: Client-Side Multi-Factor Weighted Optimization & Heuristic AI Synergy Engine (Zero paid APIs, 100% Free & Open Source)

---

## 📌 Project Overview & Problem Statement

In academic institutions and college hackathons, traditional group formation is often ad-hoc, random, or based solely on friendships. This routinely leads to:
1. **Unbalanced Skill Coverage**: Teams with all frontend developers and zero backend/database engineers.
2. **Goal & Ambition Mismatches**: Students aiming for top viva grades paired with teammates with low commitment.
3. **Bandwidth Conflicts**: High-availability students paired with students working only 2-3 hours/week.

**BEE SYNC** solves this by implementing an intelligent **5-Factor Weighted Recommendation Algorithm** and an **AI Team Synergy Matrix** that calculates candidate compatibility from 0% to 100%, highlights skill gaps, and recommends balanced team roles.

---

## 🧮 Mathematical Matching Engine (Viva Specification)

The total compatibility score between a project's technical specification and candidate student is calculated using the weighted equation:

$$\text{Total Match Score} = (0.40 \times S) + (0.25 \times I) + (0.20 \times G) + (0.10 \times E) + (0.05 \times A)$$

### Factor Breakdown:
| Factor | Weight | Evaluation Method |
| :--- | :---: | :--- |
| **1. Technical Skills ($S$)** | **40%** | Jaccard intersection of required stack vs candidate's skills + complementary skill bonus |
| **2. Domain Interests ($I$)** | **25%** | Semantic keyword overlap between student interests (AI, FinTech, Web3, IoT) and project category |
| **3. Project Ambition ($G$)** | **20%** | Synergy alignment across goals (Hackathon Winner, College Mini-Project Top Marks, Research Publication) |
| **4. Experience Level ($E$)** | **10%** | Academic year (2nd-4th), past repositories delivered, and self-assessed competency |
| **5. Availability ($A$)** | **5%** | Dedicated weekly hours commitment (10-25 hrs/week) to ensure team velocity |

---

## 🚀 Key Features & Pages

1. **Landing Page**: Futuristic hero with live matching simulator, feature pillars, and ideas showcase.
2. **Demo Auth & Switcher**: 1-Click test student persona switcher (Full Stack Lead, AI Specialist, Cloud Architect, UI/UX).
3. **Student Profile**: Dynamic skills tag manager, availability sliders, bio, GitHub/LinkedIn links, and profile strength gauge.
4. **Find Teammates**: Real-time matching engine with filter controls, candidate rank cards, formula breakdown expander, and AI explainability narratives.
5. **AI Team Synergy Matrix**: Aggregate team compatibility calculator, domain competency bars (Frontend, Backend, AI, Database, Hardware), gap alerts, and role assignment.
6. **Project Ideas Catalog**: 6 curated college mini-projects (*AI Study Buddy, Smart Face Recognition Attendance, Campus Event Planner, FinGuard AI, Student Skill Analyzer, EcoSmart Campus IoT*) with 1-click "Start Team" action.
7. **My Projects Workspace**: Project milestones checklist, progress percentage bar, and squad tracking.
8. **My Teams (Team Dashboard)**: Formed squads roster, assigned roles, combined tech stack badges, and Printable Viva Team Charter.
9. **Notifications & Activity**: Real-time team invitations, high match alerts, and milestone updates.
10. **Viva Presentation Mode & Settings**: Step-by-step formula explanations and 1-click demo database reset.

---

## 🛠️ How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Steps
```bash
# 1. Open the project folder in terminal
cd "bee sync folder"

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 🎓 College Viva Presentation Guide (Examiner FAQ)

- **Q: Does this require an expensive OpenAI/Gemini API key?**  
  *A: No. It uses a custom client-side rule-based AI heuristic engine and explicit mathematical optimization that runs completely in the browser without any latency, network dependency, or subscription costs.*
- **Q: How are scores calculated?**  
  *A: Open the built-in **Viva Mode** modal (top right navbar) to show the examiner the exact weighted multi-factor calculation breakdown with real-time variable values.*
- **Q: How does data persist?**  
  *A: Data is saved to browser `localStorage` with automated pre-seeding of 8+ realistic demo student profiles and reset capabilities.*
