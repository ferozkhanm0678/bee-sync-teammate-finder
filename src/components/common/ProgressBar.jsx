import React from 'react';

export function ProgressBar({ 
  value = 0, 
  max = 100, 
  variant = "gradient", // gradient, purple, cyan, emerald, amber
  showLabel = false,
  height = "h-2",
  className = "" 
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const variantGradients = {
    gradient: "bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400",
    purple: "bg-gradient-to-r from-purple-600 to-purple-400",
    cyan: "bg-gradient-to-r from-cyan-600 to-cyan-400",
    emerald: "bg-gradient-to-r from-emerald-600 to-emerald-400",
    amber: "bg-gradient-to-r from-amber-600 to-amber-400",
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-mono">
          <span>Progress</span>
          <span className="font-semibold text-slate-200">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-900/90 rounded-full overflow-hidden border border-slate-800/80 p-0.5 ${height}`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${variantGradients[variant] || variantGradients.gradient}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
