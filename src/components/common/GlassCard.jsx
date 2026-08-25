import React from 'react';

export function GlassCard({ 
  children, 
  className = "", 
  glow = false, 
  hover = true,
  onClick,
  ...props 
}) {
  return (
    <div 
      onClick={onClick}
      className={`
        relative rounded-2xl bg-[#0e1329]/80 backdrop-blur-xl border border-purple-500/20
        ${glow ? 'shadow-neon-purple border-purple-500/40' : 'shadow-xl shadow-black/40'}
        ${hover ? 'hover:border-purple-500/40 hover:shadow-neon-purple hover:-translate-y-0.5 transition-all duration-300' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
