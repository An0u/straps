import React from 'react';
import { Skill } from '@/data/skillTreeData';

interface ConnectionLinesProps {
  skills: Skill[];
  completedSkills: Set<string>;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ skills, completedSkills }) => {
  const getSkillById = (skillId: string) => {
    return skills.find(s => s.id === skillId);
  };

  const getNodeRadius = (skill: Skill) => {
    // Return approximate radius based on node type
    if (skill.type === 'category') return 50;
    return 40;
  };

  const shortenLine = (
    fromX: number, 
    fromY: number, 
    toX: number, 
    toY: number, 
    fromRadius: number, 
    toRadius: number
  ) => {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    if (length === 0) return { x1: fromX, y1: fromY, x2: toX, y2: toY };
    
    // Normalize direction
    const nx = dx / length;
    const ny = dy / length;
    
    // Shorten from both ends
    return {
      x1: fromX + nx * fromRadius,
      y1: fromY + ny * fromRadius,
      x2: toX - nx * toRadius,
      y2: toY - ny * toRadius,
    };
  };

  // Determine if connection should use blue or purple based on position
  const getConnectionColor = (fromSkill: Skill, toSkill: Skill) => {
    // Use blue if either node is on the right side (x > 1020)
    const useBlue = fromSkill.x > 1020 || toSkill.x > 1020 || fromSkill.isBlue || toSkill.isBlue;
    return useBlue ? 'blue' : 'purple';
  };

  const lines: { 
    x1: number; 
    y1: number; 
    x2: number; 
    y2: number; 
    isActive: boolean;
    colorType: 'blue' | 'purple';
  }[] = [];

  skills.forEach(skill => {
    skill.connections.forEach(connectionId => {
      const toSkill = getSkillById(connectionId);
      
      if (toSkill) {
        // Connection is active only when BOTH connected nodes are completed
        const isActive = completedSkills.has(skill.id) && completedSkills.has(toSkill.id);
        const fromRadius = getNodeRadius(skill);
        const toRadius = getNodeRadius(toSkill);
        const colorType = getConnectionColor(skill, toSkill);
        
        const shortened = shortenLine(
          skill.x, skill.y,
          toSkill.x, toSkill.y,
          fromRadius, toRadius
        );
        
        lines.push({
          ...shortened,
          isActive,
          colorType,
        });
      }
    });
  });

  return (
    <svg 
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="lineGradientPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(270 70% 55%)" />
          <stop offset="100%" stopColor="hsl(280 60% 50%)" />
        </linearGradient>
        <linearGradient id="lineGradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(220 70% 55%)" />
          <stop offset="100%" stopColor="hsl(230 60% 50%)" />
        </linearGradient>
        <filter id="glowPurple">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowBlue">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {lines.map((line, index) => (
        <line
          key={index}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={
            line.isActive 
              ? `url(#lineGradient${line.colorType === 'blue' ? 'Blue' : 'Purple'})` 
              : 'hsl(220 15% 45%)'
          }
          strokeWidth={line.isActive ? 4 : 3}
          strokeLinecap="round"
          filter={line.isActive ? `url(#glow${line.colorType === 'blue' ? 'Blue' : 'Purple'})` : undefined}
          className="transition-all duration-300"
        />
      ))}
    </svg>
  );
};

export default ConnectionLines;
