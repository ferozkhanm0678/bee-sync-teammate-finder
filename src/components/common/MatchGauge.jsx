import React from 'react';

export function MatchGauge({ score = 0, size = "md", label = "Match" }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  let colorClass = "text-purple-400 stroke-purple-500";
  let glowShadow = "rgba(168, 85, 247, 0.4)";
  let bgGradient = "from-purple-500/20 to-indigo-500/10";

  if (score >= 90) {
    colorClass = "text-emerald-400 stroke-emerald-400";
    glowShadow = "rgba(52, 211, 153, 0.45)";
    bgGradient = "from-emerald-500/20 to-cyan-500/10";
  } else if (score >= 75) {
    colorClass = "text-cyan-400 stroke-cyan-400";
    glowShadow = "rgba(6, 182, 212, 0.45)";
    bgGradient = "from-cyan-500/20 to-blue-500/10";
  } else if (score >= 60) {
    colorClass = "text-amber-400 stroke-amber-400";
    glowShadow = "rgba(251, 191, 36, 0.45)";
    bgGradient = "from-amber-500/20 to-orange-500/10";
  }

  const dimensions = {
    sm: { box: 64, cx: 32, cy: 32, r: 24, fontScore: "text-sm", fontLabel: "text-[10px]" },
    md: { box: 80, cx: 40, cy: 40, r: 32, fontScore: "text-lg", fontLabel: "text-xs" },
    lg: { box: 110, cx: 55, cy: 55, r: 44, fontScore: "text-2xl", fontLabel: "text-xs" }
  }[size] || { box: 80, cx: 40, cy: 40, r: 32, fontScore: "text-lg", fontLabel: "text-xs" };

  const activeRadius = dimensions.r;
  const activeCircumference = 2 * Math.PI * activeRadius;
  const activeOffset = activeCircumference - (Math.min(100, Math.max(0, score)) / 100) * activeCircumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div 
        className={`relative flex items-center justify-center rounded-full bg-gradient-to-br ${bgGradient} p-1`}
        style={{ filter: `drop-shadow(0 0 10px ${glowShadow})` }}
      >
        <svg 
          width={dimensions.box} 
          height={dimensions.box} 
          className="transform -rotate-90"
        >
          {/* Background track */}
          <circle
            cx={dimensions.cx}
            cy={dimensions.cy}
            r={activeRadius}
            stroke="currentColor"
            strokeWidth="5"
            fill="transparent"
            className="text-slate-800/80"
          />
          {/* Active progress */}
          <circle
            cx={dimensions.cx}
            cy={dimensions.cy}
            r={activeRadius}
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray={activeCircumference}
            strokeDashoffset={activeOffset}
            strokeLinecap="round"
            fill="transparent"
            className={`${colorClass} transition-all duration-700 ease-out`}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`font-black tracking-tight font-mono ${dimensions.fontScore} text-white`}>
            {score}%
          </span>
          {label && (
            <span className={`uppercase tracking-wider font-semibold text-slate-400 ${dimensions.fontLabel}`}>
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
