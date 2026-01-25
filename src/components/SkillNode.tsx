import React from 'react';
import { Skill } from '@/data/skillTreeData';
import { Info, Lock, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillNodeProps {
  skill: Skill;
  isCompleted: boolean;
  onClick: () => void;
  scale: number;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skill, isCompleted, onClick, scale }) => {
  const isCategory = skill.type === 'category';
  const isKey = skill.type === 'key';
  const isActive = skill.state === 'active';
  const hasGoldBorder = skill.isGoldBorder;

  // Size based on type
  const size = isCategory ? 100 : 70;
  const iconSize = isCategory ? 20 : 14;

  // Determine visual state
  const getNodeClasses = () => {
    const base = 'skill-node absolute flex flex-col items-center justify-center transition-all duration-300 hover:scale-110';
    
    if (isCategory) {
      if (isActive) {
        return cn(base, 'skill-glow-pulse');
      }
      return base;
    }
    
    if (hasGoldBorder) {
      return cn(base, 'skill-node-gold-border');
    }
    
    return base;
  };

  const getDiamondClasses = () => {
    const base = 'skill-node-diamond absolute inset-0 transition-all duration-300';
    
    if (isCategory) {
      return cn(base, isActive ? 'skill-node-category' : 'skill-node-inactive');
    }
    
    if (isKey) {
      return cn(base, isActive ? 'skill-node-key' : 'skill-node-inactive');
    }
    
    return cn(base, isActive ? 'skill-node-active' : 'skill-node-inactive');
  };

  // Get icon based on skill type
  const getIcon = () => {
    if (isCategory) {
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    }
    if (isKey) {
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor" />
          <path d="M12 3L14.5 8.5L20.5 9.5L16 14L17 20L12 17L7 20L8 14L3.5 9.5L9.5 8.5L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      );
    }
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" className="text-primary-foreground/80">
        <path d="M18 11V6C18 4.34 16.66 3 15 3H9C7.34 3 6 4.34 6 6V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 12H20V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V12Z" fill="currentColor" />
      </svg>
    );
  };

  return (
    <div
      className={getNodeClasses()}
      style={{
        left: skill.x - size / 2,
        top: skill.y - size / 2,
        width: size,
        height: size,
      }}
      onClick={onClick}
    >
      {/* Decorative frame for category nodes */}
      {isCategory && (
        <>
          <div className="absolute -inset-3 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 120 120" className="absolute inset-0">
              {/* Ornate corner decorations */}
              <path
                d="M60 5 L70 15 L60 25 L50 15 Z"
                fill="none"
                stroke={isActive ? 'hsl(var(--skill-category-glow))' : 'hsl(var(--skill-inactive))'}
                strokeWidth="1"
                opacity="0.7"
              />
              <path
                d="M115 60 L105 70 L95 60 L105 50 Z"
                fill="none"
                stroke={isActive ? 'hsl(var(--skill-category-glow))' : 'hsl(var(--skill-inactive))'}
                strokeWidth="1"
                opacity="0.7"
              />
              <path
                d="M60 115 L50 105 L60 95 L70 105 Z"
                fill="none"
                stroke={isActive ? 'hsl(var(--skill-category-glow))' : 'hsl(var(--skill-inactive))'}
                strokeWidth="1"
                opacity="0.7"
              />
              <path
                d="M5 60 L15 50 L25 60 L15 70 Z"
                fill="none"
                stroke={isActive ? 'hsl(var(--skill-category-glow))' : 'hsl(var(--skill-inactive))'}
                strokeWidth="1"
                opacity="0.7"
              />
            </svg>
          </div>
          {/* Inner decorative border */}
          <div 
            className="absolute -inset-1 pointer-events-none"
            style={{
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              border: `2px solid ${isActive ? 'hsl(var(--skill-category-glow) / 0.5)' : 'hsl(var(--skill-inactive) / 0.3)'}`,
            }}
          />
        </>
      )}

      {/* Gold glow effect */}
      {hasGoldBorder && (
        <div 
          className="absolute -inset-2 pointer-events-none animate-glow-pulse"
          style={{
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            background: 'linear-gradient(135deg, hsl(45 90% 55% / 0.3), transparent)',
            filter: 'blur(4px)',
          }}
        />
      )}

      {/* Main diamond shape */}
      <div className={getDiamondClasses()} />

      {/* Border */}
      <div 
        className="absolute inset-0.5 pointer-events-none"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          border: hasGoldBorder 
            ? '2px solid hsl(var(--skill-gold))' 
            : isActive 
              ? '1px solid hsl(var(--foreground) / 0.3)' 
              : '1px solid hsl(var(--foreground) / 0.1)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-2" style={{ transform: 'rotate(0deg)' }}>
        {/* Icon at top */}
        <div className="mb-0.5">
          {getIcon()}
        </div>
        
        {/* Skill name */}
        <span 
          className={cn(
            'font-display font-medium leading-tight',
            isCategory ? 'text-xs' : 'text-[9px]',
            isActive ? 'text-primary-foreground' : 'text-muted-foreground'
          )}
          style={{
            textShadow: isActive ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
            maxWidth: size - 16,
          }}
        >
          {skill.name}
        </span>

        {/* Info indicator */}
        <div className="absolute -bottom-1">
          <Info 
            size={10} 
            className={cn(
              'transition-colors',
              isActive ? 'text-primary-foreground/60' : 'text-muted-foreground/40'
            )} 
          />
        </div>
      </div>

      {/* Completion indicator */}
      {isCompleted && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-skill-gold rounded-full flex items-center justify-center z-20">
          <Unlock size={10} className="text-background" />
        </div>
      )}
    </div>
  );
};

export default SkillNode;
