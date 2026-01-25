import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Skill } from '@/data/skillTreeData';
import DraggableSkillNode from './DraggableSkillNode';
import ConnectionLines from './ConnectionLines';
import SkillModal from './SkillModal';
import { useSkillProgress } from '@/hooks/useSkillProgress';
import { useEditableSkillTree } from '@/hooks/useEditableSkillTree';
import { useIsMobile } from '@/hooks/use-mobile';
import { ZoomIn, ZoomOut, RotateCcw, Move, Lock, Unlock, Grid3X3, RotateCw, Copy, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const GRID_SIZE = 30;

const ADMIN_STORAGE_KEY = 'skill-tree-admin';

const SkillTree: React.FC = () => {
  const isMobile = useIsMobile();
  const [scale, setScale] = useState(isMobile ? 0.5 : 0.8);
  const [position, setPosition] = useState({ x: isMobile ? 50 : -200, y: isMobile ? 50 : -100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pinchDistance, setPinchDistance] = useState<number | null>(null);
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

  // Get pinch distance
  const getPinchDistance = useCallback((touches: React.TouchList) => {
    if (touches.length < 2) return null;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // Handle touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom start
      setPinchDistance(getPinchDistance(e.touches));
    } else if (e.touches.length === 1) {
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
  }, [position, isEditMode, clearSelection, clearConnectionSource, getPinchDistance]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      const newDistance = getPinchDistance(e.touches);
      if (pinchDistance && newDistance) {
        const delta = (newDistance - pinchDistance) * 0.005;
        setScale(prev => Math.min(Math.max(0.3, prev + delta), 2));
        setPinchDistance(newDistance);
      }
    } else if (isDragging && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart, pinchDistance, getPinchDistance]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setPinchDistance(null);
  }, []);

  // Reset view
  const resetView = useCallback(() => {
    setScale(isMobile ? 0.5 : 0.8);
    setPosition({ x: isMobile ? 50 : -200, y: isMobile ? 50 : -100 });
  }, [isMobile]);

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

      {/* Floating bottom toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        {/* Edit mode indicator */}
        {isEditMode && (
          <div className="bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-primary-foreground max-w-[90vw]">
            <div className="flex items-center gap-2 justify-between flex-wrap">
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

        {/* Main toolbar */}
        <div className="bg-card/80 backdrop-blur-sm rounded-full p-1.5 flex flex-row gap-1 shadow-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleZoom(0.2)}
                className="h-9 w-9 rounded-full"
              >
                <ZoomIn size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Zoom In</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleZoom(-0.2)}
                className="h-9 w-9 rounded-full"
              >
                <ZoomOut size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Zoom Out</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={resetView}
                className="h-9 w-9 rounded-full"
              >
                <RotateCcw size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Reset View</TooltipContent>
          </Tooltip>

          {/* Admin-only edit controls */}
          {isAdminMode && (
            <>
              <div className="w-px h-6 bg-border self-center mx-1" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isEditMode ? "default" : "ghost"}
                    size="icon"
                    onClick={toggleEditMode}
                    className="h-9 w-9 rounded-full"
                  >
                    {isEditMode ? <Unlock size={18} /> : <Lock size={18} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {isEditMode ? "Lock Layout (Save)" : "Edit Layout"}
                </TooltipContent>
              </Tooltip>

              {isEditMode && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={resetPositions}
                        className="h-9 w-9 rounded-full text-destructive hover:text-destructive"
                      >
                        <RotateCw size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Reset to Default</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const exportData = skills.map(s => ({
                            id: s.id,
                            name: s.name,
                            x: s.x,
                            y: s.y,
                            connections: s.connections,
                          }));
                          navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
                          toast.success('Layout copied to clipboard!');
                          console.log('Skill Tree Layout Export:', JSON.stringify(exportData, null, 2));
                        }}
                        className="h-9 w-9 rounded-full"
                      >
                        <Download size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Export Layout</TooltipContent>
                  </Tooltip>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Drag hint - hidden on mobile */}
      {!isMobile && (
        <div className="absolute top-4 right-4 z-20 bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Move size={14} />
          <span>{isEditMode ? "Drag nodes to reposition" : "Drag to pan • Scroll to zoom"}</span>
        </div>
      )}

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
          <ConnectionLines skills={skills} completedSkills={completedSkills} treeBounds={treeBounds} />

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
