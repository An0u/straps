import React from 'react';
import { Skill } from '@/data/skillTreeData';

interface ConnectionLinesProps {
  skills: Skill[];
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ skills }) => {
  const getSkillPosition = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? { x: skill.x, y: skill.y } : null;
  };

  const lines: { from: { x: number; y: number }; to: { x: number; y: number }; isActive: boolean }[] = [];

  skills.forEach(skill => {
    skill.connections.forEach(connectionId => {
      const toPos = getSkillPosition(connectionId);
      const toSkill = skills.find(s => s.id === connectionId);
      
      if (toPos && toSkill) {
        const isActive = skill.state === 'active' && toSkill.state === 'active';
        lines.push({
          from: { x: skill.x, y: skill.y },
          to: toPos,
          isActive,
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
        <linearGradient id="lineGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(270 70% 55%)" />
          <stop offset="100%" stopColor="hsl(220 70% 55%)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {lines.map((line, index) => (
        <line
          key={index}
          x1={line.from.x}
          y1={line.from.y}
          x2={line.to.x}
          y2={line.to.y}
          className={line.isActive ? 'connection-line' : 'connection-line-inactive'}
          filter={line.isActive ? 'url(#glow)' : undefined}
        />
      ))}
    </svg>
  );
};

export default ConnectionLines;
