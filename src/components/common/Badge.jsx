import React from 'react';

export function Badge({ 
  children, 
  variant = "purple", // purple, cyan, emerald, amber, rose, slate
  size = "md", // sm, md, lg
  className = "",
  onRemove
}) {
  const variantStyles = {
    purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    rose: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    indigo: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    slate: "bg-slate-800/80 text-slate-300 border-slate-700/50"
  };

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5 rounded-md",
    md: "text-xs font-medium px-2.5 py-1 rounded-lg",
    lg: "text-sm font-semibold px-3 py-1.5 rounded-xl"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 border font-sans backdrop-blur-md ${variantStyles[variant] || variantStyles.purple} ${sizeStyles[size] || sizeStyles.md} ${className}`}>
      {children}
      {onRemove && (
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="hover:opacity-75 focus:outline-none ml-1 text-xs"
        >
          ×
        </button>
      )}
    </span>
  );
}
