import React from 'react';
import { Skill } from '@/data/skillTreeData';
import { Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillNodeProps {
  skill: Skill;
  isCompleted: boolean;
  onClick: () => void;
  scale: number;
}

// SVG paths for different node types - full color versions only
// CSS grayscale filter is applied for inactive states
const SVG_PATHS = {
  category: '/shapes/category.svg',
  categoryOrnate: '/shapes/category-ornate.svg',
  key: {
    blue: '/shapes/key-blue.svg',
    purple: '/shapes/key-purple.svg',
  },
  regular: {
    blue: '/shapes/regular-blue.svg',
    purple: '/shapes/regular-purple.svg',
  },
};

const SkillNode: React.FC<SkillNodeProps> = ({ skill, isCompleted, onClick, scale }) => {
  const isCategory = skill.type === 'category';
  const isKey = skill.type === 'key';
  const isActive = skill.state === 'active';
  const hasGoldBorder = skill.isGoldBorder;

  // Size based on type - matching SVG dimensions
  const getSize = () => {
    if (isCategory) return { width: 101, height: 101 };
    return { width: 80, height: 80 };
  };

  const { width, height } = getSize();

  // Determine which SVG to use - always use full color versions
  // CSS grayscale filter handles inactive state
  const getSvgPath = () => {
    if (isCategory) {
      // Use ornate frame for categories
      return SVG_PATHS.categoryOrnate;
    }
    
    if (isKey) {
      // Alternate between blue and purple for key items
      const useBlue = (skill.x + skill.y) % 200 < 100;
      return useBlue ? SVG_PATHS.key.blue : SVG_PATHS.key.purple;
    }
    
    // Regular items - alternate between blue and purple based on position
    const useBlue = (skill.x + skill.y) % 200 < 100;
    return useBlue ? SVG_PATHS.regular.blue : SVG_PATHS.regular.purple;
  };

  // Get glow class based on type - no pulse animation
  const getGlowClass = () => {
    if (!isActive) return '';
    if (hasGoldBorder) return 'skill-node-svg-glow-gold';
    if (isKey) return 'skill-node-svg-glow-blue';
    return 'skill-node-svg-glow';
  };

  // Text size based on node type
  const getTextSize = () => {
    if (isCategory) return 'text-sm';
    if (isKey) return 'text-[11px]';
    return 'text-[10px]';
  };

  return (
    <div
      className="skill-node absolute flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
      style={{
        left: skill.x - width / 2,
        top: skill.y - height / 2,
        width,
        height,
      }}
      onClick={onClick}
    >
      {/* SVG Shape */}
      <img
        src={getSvgPath()}
        alt=""
        className={cn(
          'absolute inset-0 w-full h-full object-contain transition-all duration-300',
          !isActive && 'skill-node-grayscale opacity-70',
          isActive && getGlowClass()
        )}
        draggable={false}
      />

      {/* Gold glow overlay for gold border items */}
      {hasGoldBorder && isActive && (
        <div 
          className="absolute inset-0 pointer-events-none animate-glow-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(45 90% 55% / 0.2) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Text Overlay */}
      <div 
        className="relative z-10 flex items-center justify-center text-center px-2"
        style={{ 
          maxWidth: width - 16,
          paddingTop: isCategory ? '8px' : '4px',
        }}
      >
        <span 
          className={cn(
            'skill-text font-display font-normal leading-tight',
            getTextSize(),
            isActive ? 'text-primary-foreground' : 'text-muted-foreground'
          )}
          style={{
            textShadow: isActive 
              ? '1px 1px 3px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.5)' 
              : '1px 1px 2px rgba(0,0,0,0.8)',
          }}
        >
          {skill.name}
        </span>
      </div>

      {/* Completion indicator */}
      {isCompleted && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-skill-gold rounded-full flex items-center justify-center z-20 shadow-lg">
          <Unlock size={12} className="text-background" />
        </div>
      )}
    </div>
  );
};

export default SkillNode;
