import React, { useState, useCallback, useRef } from 'react';
import { Skill } from '@/data/skillTreeData';
import { Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DraggableSkillNodeProps {
  skill: Skill;
  isCompleted: boolean;
  onClick: () => void;
  scale: number;
  isEditMode: boolean;
  onPositionChange: (id: string, x: number, y: number) => void;
  gridSize: number;
}

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

const DraggableSkillNode: React.FC<DraggableSkillNodeProps> = ({
  skill,
  isCompleted,
  onClick,
  scale,
  isEditMode,
  onPositionChange,
  gridSize,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const isCategory = skill.type === 'category';
  const isKey = skill.type === 'key';
  const isActive = skill.state === 'active';
  const hasGoldBorder = skill.isGoldBorder;

  const getSize = () => {
    if (isCategory) return { width: 101, height: 101 };
    return { width: 80, height: 80 };
  };

  const { width, height } = getSize();

  const getSvgPath = () => {
    if (isCategory) return SVG_PATHS.categoryOrnate;
    if (isKey) {
      const useBlue = (skill.x + skill.y) % 200 < 100;
      return useBlue ? SVG_PATHS.key.blue : SVG_PATHS.key.purple;
    }
    const useBlue = (skill.x + skill.y) % 200 < 100;
    return useBlue ? SVG_PATHS.regular.blue : SVG_PATHS.regular.purple;
  };

  const getGlowClass = () => {
    if (!isActive) return '';
    if (hasGoldBorder) return 'skill-node-svg-glow-gold';
    if (isKey) return 'skill-node-svg-glow-blue';
    return 'skill-node-svg-glow';
  };

  const getTextSize = () => {
    if (isCategory) return 'text-sm';
    if (isKey) return 'text-[11px]';
    return 'text-[10px]';
  };

  const snapToGrid = (value: number) => {
    return Math.round(value / gridSize) * gridSize;
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.stopPropagation();
    e.preventDefault();
    
    const rect = nodeRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    }
    setIsDragging(true);
  }, [isEditMode]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !isEditMode || !nodeRef.current) return;
    
    const parent = nodeRef.current.parentElement;
    if (!parent) return;
    
    const parentRect = parent.getBoundingClientRect();
    const newX = (e.clientX - parentRect.left - dragOffset.x) / scale;
    const newY = (e.clientY - parentRect.top - dragOffset.y) / scale;
    
    const snappedX = snapToGrid(newX);
    const snappedY = snapToGrid(newY);
    
    onPositionChange(skill.id, snappedX, snappedY);
  }, [isDragging, isEditMode, scale, dragOffset, gridSize, skill.id, onPositionChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isEditMode) {
      e.stopPropagation();
      return;
    }
    onClick();
  }, [isEditMode, onClick]);

  return (
    <div
      ref={nodeRef}
      className={cn(
        "skill-node absolute flex items-center justify-center transition-all duration-300",
        !isEditMode && "hover:scale-110 cursor-pointer",
        isEditMode && "cursor-move",
        isDragging && "z-50"
      )}
      style={{
        left: skill.x - width / 2,
        top: skill.y - height / 2,
        width,
        height,
        transition: isDragging ? 'none' : 'all 0.3s',
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {/* Edit mode indicator */}
      {isEditMode && (
        <div className="absolute -inset-2 border-2 border-dashed border-primary/50 rounded pointer-events-none z-30" />
      )}

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

      {/* Gold glow overlay */}
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

export default DraggableSkillNode;
