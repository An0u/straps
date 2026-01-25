import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Skill } from '@/data/skillTreeData';
import DraggableSkillNode from './DraggableSkillNode';
import ConnectionLines from './ConnectionLines';
import SkillModal from './SkillModal';
import { useSkillProgress } from '@/hooks/useSkillProgress';
import { useEditableSkillTree } from '@/hooks/useEditableSkillTree';
import { ZoomIn, ZoomOut, RotateCcw, Move, Lock, Unlock, Grid3X3, RotateCw, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const GRID_SIZE = 30;

const ADMIN_STORAGE_KEY = 'skill-tree-admin';

const SkillTree: React.FC = () => {
  const [scale, setScale] = useState(0.8);
  const [position, setPosition] = useState({ x: -200, y: -100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(() => {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { isSkillCompleted, isSkillFavorite, toggleSkillCompletion, toggleSkillFavorite, completedSkills } = useSkillProgress();
  const { 
    skills, 
    isEditMode, 
    selectedIds,
    connectionSource,
    toggleEditMode, 
    selectNode,
    clearSelection,
    selectAll,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    resetPositions,
    updateNodeName,
    duplicateSelected,
    deleteSelected,
    handleConnectionClick,
    clearConnectionSource,
  } = useEditableSkillTree(GRID_SIZE);

  // Keyboard shortcuts for edit mode and admin toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+E to toggle admin mode (show/hide edit button)
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        setIsAdminMode(prev => {
          const newValue = !prev;
          localStorage.setItem(ADMIN_STORAGE_KEY, String(newValue));
          return newValue;
        });
        return;
      }
      
      if (!isEditMode) return;
      
      // Ctrl+D or Cmd+D to duplicate
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        duplicateSelected();
      }
      
      // Delete or Backspace to remove
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Don't delete if user is typing in an input
        if ((e.target as HTMLElement).tagName === 'INPUT') return;
        e.preventDefault();
        deleteSelected();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditMode, duplicateSelected, deleteSelected]);

  // Calculate tree bounds
  const treeBounds = {
    minX: Math.min(...skills.map(s => s.x)) - 100,
    maxX: Math.max(...skills.map(s => s.x)) + 100,
    minY: Math.min(...skills.map(s => s.y)) - 100,
    maxY: Math.max(...skills.map(s => s.y)) + 100,
  };

  const treeWidth = treeBounds.maxX - treeBounds.minX;
  const treeHeight = treeBounds.maxY - treeBounds.minY;

  // Handle zoom
  const handleZoom = useCallback((delta: number) => {
    setScale(prev => Math.min(Math.max(0.3, prev + delta), 2));
  }, []);

  // Handle wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    handleZoom(delta);
  }, [handleZoom]);

  // Handle mouse down for dragging or clearing selection
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      // Always allow panning
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      
      // In edit mode, also clear selection and connection source when clicking empty space
      if (isEditMode) {
        clearSelection();
        clearConnectionSource();
      }
    }
  }, [position, isEditMode, clearSelection, clearConnectionSource]);

  // Handle mouse move for dragging (panning works in both modes)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
      
      if (isEditMode) {
        clearSelection();
        clearConnectionSource();
      }
    }
  }, [position, isEditMode, clearSelection, clearConnectionSource]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Reset view
  const resetView = useCallback(() => {
    setScale(0.8);
    setPosition({ x: -200, y: -100 });
  }, []);

  // Handle skill click
  const handleSkillClick = useCallback((skill: Skill) => {
    if (!isEditMode) {
      setSelectedSkill(skill);
      setIsModalOpen(true);
    }
  }, [isEditMode]);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedSkill(null);
  }, []);

  // Toggle completion for selected skill
  const handleToggleComplete = useCallback(() => {
    if (selectedSkill) {
      toggleSkillCompletion(selectedSkill.id);
    }
  }, [selectedSkill, toggleSkillCompletion]);

  const handleToggleFavorite = useCallback(() => {
    if (selectedSkill) {
      toggleSkillFavorite(selectedSkill.id);
    }
  }, [selectedSkill, toggleSkillFavorite]);

  // Stats
  const totalSkills = skills.length;
  const completedCount = completedSkills.size;

  return (
    <div className="relative w-full h-full overflow-hidden tree-canvas">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-2 flex flex-col gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleZoom(0.2)}
                className="h-8 w-8"
              >
                <ZoomIn size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Zoom In</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleZoom(-0.2)}
                className="h-8 w-8"
              >
                <ZoomOut size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Zoom Out</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={resetView}
                className="h-8 w-8"
              >
                <RotateCcw size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Reset View</TooltipContent>
          </Tooltip>

          {/* Admin-only edit controls */}
          {isAdminMode && (
            <>
              <div className="h-px bg-border my-1" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isEditMode ? "default" : "ghost"}
                    size="icon"
                    onClick={toggleEditMode}
                    className="h-8 w-8"
                  >
                    {isEditMode ? <Unlock size={18} /> : <Lock size={18} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {isEditMode ? "Lock Layout (Save)" : "Edit Layout"}
                </TooltipContent>
              </Tooltip>

              {isEditMode && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={resetPositions}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <RotateCw size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Reset to Default</TooltipContent>
                </Tooltip>
              )}
            </>
          )}
        </div>

        {/* Edit mode indicator */}
        {isEditMode && (
          <div className="bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-primary-foreground">
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <Grid3X3 size={14} />
                <span>Grid: {GRID_SIZE}px</span>
              </div>
              {selectedIds.size > 0 && (
                <div className="flex gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={duplicateSelected}
                        className="h-6 px-2 text-xs"
                      >
                        <Copy size={12} className="mr-1" />
                        Duplicate
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ctrl+D</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={deleteSelected}
                        className="h-6 px-2 text-xs text-destructive hover:text-destructive"
                      >
                        <Trash2 size={12} className="mr-1" />
                        Delete
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete / Backspace</TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>
            <div className="text-xs opacity-80 mt-1">
              Click to select • Shift+click for multi • Double-click to rename
            </div>
            <div className="text-xs opacity-80">
              Ctrl+Shift+click to start connection, then click target
            </div>
            {connectionSource && (
              <div className="text-xs text-accent mt-1">
                ✓ Connection source selected - click target node
              </div>
            )}
            <div className="text-xs opacity-80">
              {selectedIds.size} selected
            </div>
          </div>
        )}

        <div className="bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
          <div className="text-muted-foreground text-xs mb-1">Progress</div>
          <div className="text-foreground font-medium">
            {completedCount} / {totalSkills}
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
            <div 
              className="h-full bg-skill-gold rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalSkills) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Drag hint */}
      <div className="absolute top-4 right-4 z-20 bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Move size={14} />
        <span>{isEditMode ? "Drag nodes to reposition" : "Drag to pan • Scroll to zoom"}</span>
      </div>

      {/* Tree container */}
      <div
        ref={containerRef}
        className={`w-full h-full ${isEditMode ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            width: treeWidth,
            height: treeHeight,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {/* Grid overlay in edit mode */}
          {isEditMode && (
            <svg
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{ width: treeWidth, height: treeHeight }}
            >
              <defs>
                <pattern
                  id="grid"
                  width={GRID_SIZE}
                  height={GRID_SIZE}
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          )}

          {/* Connection lines */}
          <ConnectionLines skills={skills} />

          {/* Skill nodes */}
          {skills.map(skill => (
            <DraggableSkillNode
              key={skill.id}
              skill={skill}
              isCompleted={isSkillCompleted(skill.id)}
              isFavorite={isSkillFavorite(skill.id)}
              onClick={() => handleSkillClick(skill)}
              scale={scale}
              isEditMode={isEditMode}
              isSelected={selectedIds.has(skill.id)}
              isConnectionSource={connectionSource === skill.id}
              onSelect={selectNode}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
              onDragEnd={handleDragEnd}
              onConnectionClick={handleConnectionClick}
              gridSize={GRID_SIZE}
              onNameChange={updateNodeName}
            />
          ))}
        </div>
      </div>

      {/* Skill modal */}
      <SkillModal
        skill={selectedSkill}
        isOpen={isModalOpen}
        onClose={closeModal}
        isCompleted={selectedSkill ? isSkillCompleted(selectedSkill.id) : false}
        isFavorite={selectedSkill ? isSkillFavorite(selectedSkill.id) : false}
        onToggleComplete={handleToggleComplete}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default SkillTree;
