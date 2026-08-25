/**
 * BEE SYNC - AI Teammate Matching Engine
 * 
 * Algorithm Weighting Formula:
 * Total Score = (Skills * 0.40) + (Interests * 0.25) + (Project Goal * 0.20) + (Experience * 0.10) + (Availability * 0.05)
 * Range: 0 to 100
 */

export const WEIGHTS = {
  SKILLS: 0.40,
  INTERESTS: 0.25,
  GOAL: 0.20,
  EXPERIENCE: 0.10,
  AVAILABILITY: 0.05,
};

/**
 * Normalizes string for fuzzy/case-insensitive matching
 */
const normalize = (str) => (str || "").toLowerCase().trim();

/**
 * Calculates Jaccard / Overlap Skills Score (0 - 100)
 */
export function calculateSkillsScore(studentSkills = [], requiredSkills = []) {
  const sSkills = Array.isArray(studentSkills) ? studentSkills : [];
  const rSkills = Array.isArray(requiredSkills) ? requiredSkills : [];

  if (rSkills.length === 0) {
    const defaultMatching = sSkills.slice(0, 3);
    return {
      score: 85,
      matching: defaultMatching,
      matchingSkills: defaultMatching,
      missing: [],
      missingSkills: [],
      unmatchedStudentSkills: sSkills.slice(3)
    };
  }
  
  const normalizedReq = rSkills.map(normalize);
  const normalizedStudent = sSkills.map(normalize);
  
  const matching = [];
  const missing = [];

  rSkills.forEach(req => {
    const isMatch = normalizedStudent.some(s => s.includes(normalize(req)) || normalize(req).includes(s));
    if (isMatch) {
      matching.push(req);
    } else {
      missing.push(req);
    }
  });

  // Calculate percentage of required skills possessed
  const rawScore = (matching.length / rSkills.length) * 100;
  
  // Bonus for extra complementary skills
  const extraSkillsCount = Math.max(0, sSkills.length - matching.length);
  const bonus = Math.min(10, extraSkillsCount * 2);
  
  const finalScore = Math.min(100, Math.round(rawScore + (rawScore > 0 ? bonus : 0)));
  
  return {
    score: finalScore,
    matching,
    matchingSkills: matching,
    missing,
    missingSkills: missing,
    unmatchedStudentSkills: sSkills.filter(s => !matching.includes(s))
  };
}

/**
 * Calculates Interests / Domain Alignment Score (0 - 100)
 */
export function calculateInterestsScore(studentInterests = [], projectCategory = "", projectDescription = "") {
  const sInterests = Array.isArray(studentInterests) ? studentInterests : [];
  if (sInterests.length === 0) return { score: 60, shared: [] };

  const searchCorpus = `${normalize(projectCategory)} ${normalize(projectDescription)}`;
  const shared = [];

  sInterests.forEach(interest => {
    const normInt = normalize(interest);
    if (searchCorpus.includes(normInt) || normInt.split(" ").some(word => word.length > 3 && searchCorpus.includes(word))) {
      shared.push(interest);
    }
  });

  let score = 50; // base baseline
  if (shared.length >= 3) score = 100;
  else if (shared.length === 2) score = 90;
  else if (shared.length === 1) score = 75;
  else {
    // If no direct keyword match, assign moderate baseline based on STEM domain
    score = 65;
    shared.push(sInterests[0] || "General Computing");
  }

  return { score, shared };
}

/**
 * Calculates Project Goal Alignment Score (0 - 100)
 */
export function calculateGoalScore(studentGoal = "", projectGoal = "") {
  const normStudentGoal = normalize(studentGoal);
  const normProjGoal = normalize(projectGoal);

  if (!projectGoal) return { score: 85, reason: "Broad alignment on academic objectives" };

  if (normStudentGoal === normProjGoal) {
    return { score: 100, reason: "Perfect match on project ambition and expectations" };
  }

  // Cross-category goal synergies
  const isHackathonMatch = (normStudentGoal.includes("hackathon") && normProjGoal.includes("hackathon"));
  const isMarksMatch = (normStudentGoal.includes("marks") || normStudentGoal.includes("viva")) && 
                       (normProjGoal.includes("marks") || normProjGoal.includes("viva") || normProjGoal.includes("mini-project"));
  const isResearchMatch = normStudentGoal.includes("research") && normProjGoal.includes("research");
  const isStartupMatch = normStudentGoal.includes("startup") && (normProjGoal.includes("startup") || normProjGoal.includes("mvp"));

  if (isHackathonMatch || isMarksMatch || isResearchMatch || isStartupMatch) {
    return { score: 95, reason: "High alignment on project timeline and performance milestones" };
  }

  if (normStudentGoal.includes("mini-project") || normProjGoal.includes("mini-project")) {
    return { score: 85, reason: "Strong alignment on college syllabus deliverables" };
  }

  return { score: 70, reason: "Complementary ambitions suitable for flexible project roadmap" };
}

/**
 * Calculates Experience Score (0 - 100)
 */
export function calculateExperienceScore(experienceLevel = "Intermediate", experienceYears = 2) {
  const norm = normalize(experienceLevel);
  if (norm.includes("advanced")) {
    return { score: 95, levelLabel: "Advanced (3+ yrs & high project velocity)" };
  } else if (norm.includes("intermediate")) {
    return { score: 85, levelLabel: "Intermediate (Solid foundation & practical repos)" };
  } else {
    return { score: 75, levelLabel: "Beginner / Enthusiastic (High growth potential)" };
  }
}

/**
 * Calculates Availability Score (0 - 100)
 */
export function calculateAvailabilityScore(hoursPerWeek = 15, expectedHours = 12) {
  const hrs = typeof hoursPerWeek === 'number' ? hoursPerWeek : 15;
  if (hrs >= 20) {
    return { score: 100, commitment: `${hrs} hrs/week (High Availability)` };
  } else if (hrs >= 15) {
    return { score: 92, commitment: `${hrs} hrs/week (Optimal for Mini-Projects)` };
  } else if (hrs >= 10) {
    return { score: 80, commitment: `${hrs} hrs/week (Moderate Availability)` };
  } else {
    return { score: 65, commitment: `${hrs} hrs/week (Constrained Availability)` };
  }
}

/**
 * Generates an intelligent AI-rule based explanation for a candidate match
 */
export function generateAiRecommendation(student = {}, breakdown = {}, projectRequirements = {}) {
  const matchingSkills = breakdown?.skills?.matching || breakdown?.skills?.matchingSkills || [];
  const missingSkills = breakdown?.skills?.missing || breakdown?.skills?.missingSkills || [];
  const shared = breakdown?.interests?.shared || [];
  const score = typeof breakdown?.totalScore === 'number' ? breakdown.totalScore : 85;
  const studentSkills = Array.isArray(student?.skills) ? student.skills : [];
  const studentName = student?.name || "Student";
  const studentGoal = student?.goal || "College Project";

  let rationale = "";
  let roleRecommendation = student?.preferredRole || "Core Developer";
  let strengths = [];

  if (matchingSkills.length >= 2) {
    strengths.push(`Direct mastery of required stack: ${matchingSkills.slice(0, 3).join(", ")}`);
  }
  if (student?.experience === "Advanced") {
    strengths.push(`Senior engineering capability with ${student?.pastProjectsCount || 3}+ delivered repositories`);
  }
  if ((student?.availability || 0) >= 16) {
    strengths.push(`High bandwidth availability (${student.availability}h/week) for rapid sprint iterations`);
  }

  if (score >= 90) {
    rationale = `Exceptional ${score}% synergy. ${studentName} provides exact core expertise in ${matchingSkills.length > 0 ? matchingSkills.join(", ") : studentSkills.slice(0, 2).join(", ")} with a matching '${studentGoal}' mindset. Perfect fit as ${roleRecommendation}.`;
  } else if (score >= 80) {
    rationale = `Strong ${score}% match. ${studentName} brings valuable experience in ${matchingSkills.length > 0 ? matchingSkills.join(", ") : studentSkills.slice(0, 2).join(", ")} and overlaps in ${shared[0] || "project domain"}.`;
  } else if (score >= 65) {
    rationale = `Viable ${score}% candidate with complementary skills (${studentSkills.slice(0, 3).join(", ")}). Can support as ${roleRecommendation} with quick ramp-up.`;
  } else {
    rationale = `Foundational ${score}% match. Has strong foundational skills in ${studentSkills.slice(0, 2).join(", ")}, ideal for auxiliary support and documentation.`;
  }

  return {
    rationale,
    roleRecommendation,
    strengths,
    complementarySkills: studentSkills.filter(s => !matchingSkills.includes(s)).slice(0, 3),
    improvementTip: missingSkills.length > 0 
      ? `Pair ${studentName} with a teammate possessing ${missingSkills[0]} to cover skill gaps.` 
      : `High solo coverage! Pair with a dedicated UI or Project Lead for maximum team balance.`
  };
}

/**
 * Main Matching Function: Evaluates student against a project requirement
 */
export function matchStudentToProject(student = {}, projectRequirements = {}) {
  const {
    name = "College Mini-Project",
    description = "",
    category = "General Computer Science",
    goal = "College Mini-Project Top Marks",
    requiredSkills = ["React", "Python"],
    teamSize = 3,
  } = projectRequirements;

  // 1. Skills (40%)
  const skillsRes = calculateSkillsScore(student?.skills || [], requiredSkills);
  
  // 2. Interests (25%)
  const interestsRes = calculateInterestsScore(student?.interests || [], category, description);
  
  // 3. Project Goal (20%)
  const goalRes = calculateGoalScore(student?.goal || "", goal);
  
  // 4. Experience (10%)
  const expRes = calculateExperienceScore(student?.experience || "Intermediate", student?.experienceYears || 2);
  
  // 5. Availability (5%)
  const availRes = calculateAvailabilityScore(student?.availability || 15, 12);

  // Calculate Weighted Total Score
  const rawTotal = 
    (skillsRes.score * WEIGHTS.SKILLS) +
    (interestsRes.score * WEIGHTS.INTERESTS) +
    (goalRes.score * WEIGHTS.GOAL) +
    (expRes.score * WEIGHTS.EXPERIENCE) +
    (availRes.score * WEIGHTS.AVAILABILITY);

  const totalScore = Math.min(99, Math.max(35, Math.round(rawTotal)));

  const breakdown = {
    totalScore,
    skills: skillsRes,
    interests: interestsRes,
    goal: goalRes,
    experience: expRes,
    availability: availRes,
    weights: {
      skillsContribution: Math.round(skillsRes.score * WEIGHTS.SKILLS * 10) / 10,
      interestsContribution: Math.round(interestsRes.score * WEIGHTS.INTERESTS * 10) / 10,
      goalContribution: Math.round(goalRes.score * WEIGHTS.GOAL * 10) / 10,
      expContribution: Math.round(expRes.score * WEIGHTS.EXPERIENCE * 10) / 10,
      availContribution: Math.round(availRes.score * WEIGHTS.AVAILABILITY * 10) / 10,
    }
  };

  const aiRecommendation = generateAiRecommendation(student, breakdown, projectRequirements);

  return {
    ...student,
    matchScore: totalScore,
    breakdown,
    aiRecommendation
  };
}

/**
 * Ranks all students for a given project spec
 */
export function rankTeammates(students = [], projectRequirements = {}) {
  const sList = Array.isArray(students) ? students : [];
  const matched = sList.map(student => matchStudentToProject(student, projectRequirements));
  // Sort descending by match score
  return matched.sort((a, b) => b.matchScore - a.matchScore);
}
