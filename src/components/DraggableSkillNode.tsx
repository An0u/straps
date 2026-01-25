import React, { useState, useCallback, useRef, forwardRef } from 'react';
import { Skill } from '@/data/skillTreeData';
import { Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DraggableSkillNodeProps {
  skill: Skill;
  isCompleted: boolean;
  onClick: () => void;
  scale: number;
  isEditMode: boolean;
  isSelected: boolean;
  onSelect: (id: string, addToSelection: boolean) => Set<string>;
  onDragStart: (id: string, newSelection: Set<string>) => void;
  onDragMove: (deltaX: number, deltaY: number) => void;
  onDragEnd: () => void;
  gridSize: number;
}

const SVG_PATHS = {
  category: {
    purple: '/shapes/category-ornate.svg',
    blue: '/shapes/category-blue.svg',
  },
  key: {
    blue: '/shapes/key-blue-new.svg',
    purple: '/shapes/key-purple.svg',
  },
  regular: {
    blue: '/shapes/regular-blue-new.svg',
    purple: '/shapes/regular-purple.svg',
  },
};

const DraggableSkillNode = forwardRef<HTMLDivElement, DraggableSkillNodeProps>(({
  skill,
  isCompleted,
  onClick,
  scale,
  isEditMode,
  isSelected,
  onSelect,
  onDragStart,
  onDragMove,
  onDragEnd,
  gridSize,
}, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
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
    // Nodes to the right of "Two Arm" (x > 1020) use blue, left side uses purple
    // isBlue property can override this for specific nodes
    const useBlue = skill.isBlue || skill.x > 1020;
    
    if (isCategory) {
      return useBlue ? SVG_PATHS.category.blue : SVG_PATHS.category.purple;
    }
    if (isKey) {
      return useBlue ? SVG_PATHS.key.blue : SVG_PATHS.key.purple;
    }
    return useBlue ? SVG_PATHS.regular.blue : SVG_PATHS.regular.purple;
  };

  const getGlowClass = () => {
    if (!isActive) return '';
    if (hasGoldBorder) return 'skill-node-svg-glow-gold';
    // Use blue glow for right side (x > 1020) or nodes with isBlue, purple for left
    if (skill.isBlue || skill.x > 1020) return 'skill-node-svg-glow-blue';
    return 'skill-node-svg-glow';
  };

  const getTextSize = () => {
    if (isCategory) return 'text-sm';
    if (isKey) return 'text-[11px]';
    return 'text-[10px]';
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.stopPropagation();
    e.preventDefault();
    
    // Select this node (shift adds to selection) and get the new selection
    const newSelection = onSelect(skill.id, e.shiftKey);
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    onDragStart(skill.id, newSelection);
  }, [isEditMode, skill.id, onSelect, onDragStart]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !isEditMode) return;
    
    const deltaX = (e.clientX - lastMousePos.current.x) / scale;
    const deltaY = (e.clientY - lastMousePos.current.y) / scale;
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    onDragMove(deltaX, deltaY);
  }, [isDragging, isEditMode, scale, onDragMove]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd();
    }
  }, [isDragging, onDragEnd]);

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
      {/* Selection indicator */}
      {isEditMode && isSelected && (
        <div className="absolute -inset-3 border-2 border-primary rounded bg-primary/10 pointer-events-none z-30" />
      )}
      
      {/* Edit mode hover indicator */}
      {isEditMode && !isSelected && (
        <div className="absolute -inset-2 border-2 border-dashed border-muted-foreground/30 rounded pointer-events-none z-30" />
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
});

DraggableSkillNode.displayName = 'DraggableSkillNode';

export default DraggableSkillNode;
