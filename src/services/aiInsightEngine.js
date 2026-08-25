/**
 * BEE SYNC - AI Team Insight & Synergy Analyzer
 * Evaluates team composition balance, skill coverage, role distribution, and viva readiness.
 */

export function analyzeTeamSynergy(members = [], projectSpecs = {}) {
  if (!members || members.length === 0) {
    return {
      overallScore: 0,
      skillCoveragePct: 0,
      strengths: ["Add candidates to evaluate team synergy."],
      missingSkills: [],
      roleDistribution: [],
      vivaRecommendations: ["Select at least 2 team members to begin AI analysis."],
      balanceRating: "Empty Team"
    };
  }

  const requiredSkills = projectSpecs.requiredSkills || ["React", "Python", "Node.js"];
  
  // Aggregate all unique skills
  const allTeamSkills = new Set();
  const skillCountMap = {};
  
  members.forEach(member => {
    (member.skills || []).forEach(skill => {
      allTeamSkills.add(skill);
      skillCountMap[skill] = (skillCountMap[skill] || 0) + 1;
    });
  });

  // Calculate Required Skill Coverage
  const coveredRequiredSkills = requiredSkills.filter(req => {
    const normReq = req.toLowerCase().trim();
    return Array.from(allTeamSkills).some(s => s.toLowerCase().includes(normReq) || normReq.includes(s.toLowerCase()));
  });

  const missingSkills = requiredSkills.filter(req => !coveredRequiredSkills.includes(req));
  const skillCoveragePct = Math.round((coveredRequiredSkills.length / Math.max(1, requiredSkills.length)) * 100);

  // Role Diversity Analysis
  const roleCategories = {
    "Frontend & UI": ["React", "Next.js", "TailwindCSS", "Figma", "UI/UX Design", "Flutter", "TypeScript"],
    "Backend & APIs": ["Node.js", "Express", "Python", "FastAPI", "Django", "REST APIs", "GraphQL"],
    "Database & Cloud": ["MongoDB", "PostgreSQL", "Docker", "Kubernetes", "AWS", "Redis", "SQL"],
    "AI & Data Science": ["PyTorch", "TensorFlow", "Scikit-Learn", "NLP", "OpenCV", "Pandas", "Transformers"],
    "Hardware / Embedded": ["C++", "Arduino", "Raspberry Pi", "MQTT", "IoT"]
  };

  const domainScores = {};
  Object.keys(roleCategories).forEach(domain => {
    const domainSkills = roleCategories[domain];
    const matchCount = domainSkills.filter(ds => allTeamSkills.has(ds)).length;
    domainScores[domain] = Math.min(100, Math.round((matchCount / Math.min(4, domainSkills.length)) * 100));
  });

  // Role distribution among members
  const roles = members.map(m => m.preferredRole || m.role || "Developer");
  const uniqueRoles = Array.from(new Set(roles));

  // Compute Overall Synergy Score
  let synergy = 50;
  synergy += (skillCoveragePct * 0.35); // 35 pts from required coverage
  synergy += (Math.min(members.length, 4) * 5); // 20 pts from team capacity
  if (uniqueRoles.length >= Math.min(members.length, 3)) synergy += 10; // Role diversity bonus
  if (members.some(m => (m.experience || "").toLowerCase().includes("advanced"))) synergy += 5; // Lead experience bonus

  const overallScore = Math.min(98, Math.max(40, Math.round(synergy)));

  // Strengths identification
  const strengths = [];
  if (skillCoveragePct >= 80) {
    strengths.push(`High Skill Coverage (${skillCoveragePct}%): The team possesses ${coveredRequiredSkills.length} of ${requiredSkills.length} required technology stacks.`);
  }
  if (uniqueRoles.length >= 2) {
    strengths.push(`Diverse Role Distribution: Distinct specialties in ${uniqueRoles.slice(0, 3).join(", ")} prevent internal task conflicts.`);
  }
  const avgExp = members.reduce((acc, m) => acc + (m.experienceYears || 2), 0) / members.length;
  if (avgExp >= 2.2) {
    strengths.push(`Strong Cumulative Experience: Combined average ${avgExp.toFixed(1)} years hands-on project velocity.`);
  }

  // Viva Examination Recommendations
  const vivaRecommendations = [];
  if (missingSkills.length > 0) {
    vivaRecommendations.push(`Address Skill Gap: Consider onboarding or self-learning ${missingSkills.join(", ")} before final demonstration.`);
  } else {
    vivaRecommendations.push(`Complete Stack Mastery: The team covers 100% of core deliverables. Focus on testing & deployment.`);
  }
  vivaRecommendations.push(`Assign Clear Module Ownership: Ensure each member can individually explain their component during the viva examination.`);
  vivaRecommendations.push(`Prepare Live Demonstration: Allocate ${members[0]?.name || "Lead"} for system architecture overview and others for core implementation.`);

  let balanceRating = "Optimal Synergy";
  if (overallScore < 70) balanceRating = "Needs Additional Coverage";
  else if (overallScore < 85) balanceRating = "Good Team Synergy";

  return {
    overallScore,
    skillCoveragePct,
    coveredRequiredSkills,
    missingSkills,
    domainScores,
    strengths,
    vivaRecommendations,
    balanceRating,
    totalSkillsCount: allTeamSkills.size,
    membersCount: members.length
  };
}
