import React, { useState, useCallback, useRef, forwardRef, useEffect } from 'react';
import { Skill } from '@/data/skillTreeData';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DraggableSkillNodeProps {
  skill: Skill;
  isCompleted: boolean;
  isFavorite: boolean;
  isAvailable: boolean;
  onClick: () => void;
  scale: number;
  isEditMode: boolean;
  isSelected: boolean;
  isConnectionSource: boolean;
  onSelect: (id: string, addToSelection: boolean) => Set<string>;
  onDragStart: (id: string, newSelection: Set<string>) => void;
  onDragMove: (deltaX: number, deltaY: number) => void;
  onDragEnd: () => void;
  onConnectionClick: (id: string, isCtrlShift: boolean) => boolean;
  gridSize: number;
  onNameChange?: (id: string, newName: string) => void;
  onToggleKeySkill?: (id: string) => void;
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
  inactive: '/shapes/regular-inactive.svg',
};

const DraggableSkillNode = forwardRef<HTMLDivElement, DraggableSkillNodeProps>(({
  skill,
  isCompleted,
  isFavorite,
  isAvailable,
  onClick,
  scale,
  isEditMode,
  isSelected,
  isConnectionSource,
  onSelect,
  onDragStart,
  onDragMove,
  onDragEnd,
  onConnectionClick,
  gridSize,
  onNameChange,
  onToggleKeySkill,
}, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(skill.name);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setEditValue(skill.name);
    }
  }, [skill.name, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const isCategory = skill.type === 'category';
  const isKey = skill.type === 'key';
  const isActive = isCompleted;
  const hasGoldBorder = skill.isGoldBorder || isKey;

  const getSize = () => {
    if (isCategory) return { width: 101, height: 101 };
    return { width: 80, height: 80 };
  };

  const { width, height } = getSize();

  const getSvgPath = () => {
    const useBlue = skill.isBlue || skill.x > 1020;
    
    if (isCategory) {
      return useBlue ? SVG_PATHS.category.blue : SVG_PATHS.category.purple;
    }
    
    if (isKey) {
      if (!isCompleted) {
        return SVG_PATHS.inactive;
      }
      return useBlue ? SVG_PATHS.key.blue : SVG_PATHS.key.purple;
    }
    
    return useBlue ? SVG_PATHS.regular.blue : SVG_PATHS.regular.purple;
  };

  const getGlowClass = () => {
    // Only apply glow for gold border skills (key skills)
    if (isKey || hasGoldBorder) return 'skill-node-svg-glow-gold';
    return '';
  };

  const getTextSize = () => {
    if (isCategory) return 'text-sm leading-[14px]';
    if (isKey) return 'text-[11px] leading-[11px]';
    return 'text-[10px] leading-[10px]';
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isEditMode) return;
    
    if (e.altKey && !e.ctrlKey && !e.shiftKey) {
      e.stopPropagation();
      e.preventDefault();
      onToggleKeySkill?.(skill.id);
      return;
    }
    
    if (e.ctrlKey && e.shiftKey) {
      e.stopPropagation();
      e.preventDefault();
      onConnectionClick(skill.id, true);
      return;
    }
    
    e.stopPropagation();
    e.preventDefault();
    
    const newSelection = onSelect(skill.id, e.shiftKey);
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    onDragStart(skill.id, newSelection);
  }, [isEditMode, skill.id, onSelect, onDragStart, onConnectionClick, onToggleKeySkill]);

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

  // Use regular click handler which works for both mouse and touch
  const handleNodeClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (isEditing) {
      e.stopPropagation();
      return;
    }
    
    if (isEditMode) {
      e.stopPropagation();
      onConnectionClick(skill.id, false);
      return;
    }
    
    // For non-edit mode, open the modal
    e.stopPropagation();
    onClick();
  }, [isEditMode, isEditing, onClick, onConnectionClick, skill.id]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.stopPropagation();
    e.preventDefault();
    setIsEditing(true);
  }, [isEditMode]);

  const handleInputBlur = useCallback(() => {
    setIsEditing(false);
    if (editValue.trim() && editValue !== skill.name) {
      onNameChange?.(skill.id, editValue.trim());
    } else {
      setEditValue(skill.name);
    }
  }, [editValue, skill.name, skill.id, onNameChange]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setEditValue(skill.name);
      setIsEditing(false);
    }
    e.stopPropagation();
  }, [handleInputBlur, skill.name]);

  // Mobile touch handling - track if it's a tap vs drag
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isEditMode && !isEditing) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
      e.stopPropagation(); // Prevent parent from handling
    }
  }, [isEditMode, isEditing]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isEditMode && !isEditing && touchStartRef.current) {
      const touch = e.changedTouches[0];
      const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
      const deltaTime = Date.now() - touchStartRef.current.time;
      
      // If it's a tap (not a drag), open modal
      if (deltaX < 10 && deltaY < 10 && deltaTime < 300) {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }
      
      touchStartRef.current = null;
    }
  }, [isEditMode, isEditing, onClick]);

  // Simple click handler that works for both mouse AND touch
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isEditing) {
      e.stopPropagation();
      return;
    }
    
    if (isEditMode) {
      e.stopPropagation();
      onConnectionClick(skill.id, false);
      return;
    }
    
    e.stopPropagation();
    onClick();
  }, [isEditMode, isEditing, onClick, onConnectionClick, skill.id]);

  // Determine availability ring color based on which side of the tree
  const useBlue = skill.isBlue || skill.x > 1020;
  const availableRingColor = useBlue
    ? 'hsl(220 80% 60%)'   // blue side
    : 'hsl(270 80% 65%)';  // purple side

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
        transition: isDragging ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
        pointerEvents: 'auto',
        zIndex: isAvailable ? 25 : 20,
        touchAction: 'none', // Prevent default touch behaviors
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
    >
      {/* Available skill highlight removed */}

      {/* Selection indicator */}
      {isEditMode && isSelected && !isEditing && (
        <div className="absolute -inset-3 border-2 border-primary rounded bg-primary/10 pointer-events-none z-30" />
      )}
      
      {/* Connection source indicator */}
      {isConnectionSource && (
        <div className="absolute -inset-3 border-2 border-accent rounded bg-accent/20 pointer-events-none z-30 animate-pulse" />
      )}
      
      {/* Editing indicator */}
      {isEditing && (
        <div className="absolute -inset-3 border-2 border-skill-gold rounded bg-skill-gold/10 pointer-events-none z-30" />
      )}
      
      {/* Edit mode hover indicator */}
      {isEditMode && !isSelected && !isEditing && !isConnectionSource && (
        <div className="absolute -inset-2 border-2 border-dashed border-muted-foreground/30 rounded pointer-events-none z-30" />
      )}

      {/* SVG Shape */}
      <img
        src={getSvgPath()}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn(
          'absolute inset-0 w-full h-full object-contain',
          'transition-[filter,opacity] duration-300',
          !isActive && !isKey && 'skill-node-grayscale opacity-70',
          (isActive || isKey) && getGlowClass()
        )}
        draggable={false}
      />

      {/* Gold glow overlay for key / gold border skills */}
      {hasGoldBorder && (
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none",
            isActive && "animate-glow-pulse"
          )}
          style={{
            background: isActive 
              ? 'radial-gradient(circle, hsl(45 90% 55% / 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(45 90% 55% / 0.15) 0%, transparent 60%)',
          }}
        />
      )}

      {/* Text Overlay / Edit Input */}
      <div 
        className="relative z-10 flex items-center justify-center text-center px-2"
        style={{ 
          maxWidth: width - 16,
          paddingTop: isCategory ? '8px' : '4px',
        }}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className={cn(
              'w-full bg-background/90 text-foreground rounded px-1 py-0.5 text-center border border-skill-gold focus:outline-none focus:ring-1 focus:ring-skill-gold',
              getTextSize()
            )}
            style={{ maxWidth: width - 20 }}
          />
        ) : (
          <span 
            className={cn(
              'skill-text font-display font-normal leading-tight text-white',
              getTextSize()
            )}
            style={{
              textShadow: '1px 1px 3px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.5)',
            }}
          >
            {skill.name}
          </span>
        )}
      </div>

      {/* Favorite star indicator */}
      {isFavorite && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-skill-gold rounded-full flex items-center justify-center z-20 shadow-lg">
          <Star size={12} className="text-background fill-background" />
        </div>
      )}
    </div>
  );
});

DraggableSkillNode.displayName = 'DraggableSkillNode';

export default DraggableSkillNode;