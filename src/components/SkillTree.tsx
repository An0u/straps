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
  const [pinchMidpoint, setPinchMidpoint] = useState<{ x: number; y: number } | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(() => {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Refs to always have current scale/position in touch handlers without stale closures
  const scaleRef = useRef(scale);
  const positionRef = useRef(position);
  useEffect(() => { scaleRef.current = scale; }, [scale]);
  useEffect(() => { positionRef.current = position; }, [position]);

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
    toggleKeySkill,
  } = useEditableSkillTree(GRID_SIZE);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        duplicateSelected();
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if ((e.target as HTMLElement).tagName === 'INPUT') return;
        e.preventDefault();
        deleteSelected();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditMode, duplicateSelected, deleteSelected]);

  const treeBounds = {
    minX: Math.min(...skills.map(s => s.x)) - 100,
    maxX: Math.max(...skills.map(s => s.x)) + 100,
    minY: Math.min(...skills.map(s => s.y)) - 100,
    maxY: Math.max(...skills.map(s => s.y)) + 100,
  };
  const treeWidth = treeBounds.maxX - treeBounds.minX;
  const treeHeight = treeBounds.maxY - treeBounds.minY;

  const handleZoom = useCallback((delta: number) => {
    setScale(prev => Math.min(Math.max(0.3, prev + delta), 2));
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.min(Math.max(0.3, scale + delta), 2);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const worldX = (mouseX - position.x) / scale;
      const worldY = (mouseY - position.y) / scale;
      setPosition({ x: mouseX - worldX * newScale, y: mouseY - worldY * newScale });
    }
    setScale(newScale);
  }, [scale, position]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      if (isEditMode) {
        clearSelection();
        clearConnectionSource();
      }
    }
  }, [position, isEditMode, clearSelection, clearConnectionSource]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Returns distance between two touch points and their midpoint (relative to container)
  const getPinchInfo = useCallback((touches: React.TouchList) => {
    if (touches.length < 2) return null;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const clientMidX = (touches[0].clientX + touches[1].clientX) / 2;
    const clientMidY = (touches[0].clientY + touches[1].clientY) / 2;
    const rect = containerRef.current?.getBoundingClientRect();
    const midX = rect ? clientMidX - rect.left : clientMidX;
    const midY = rect ? clientMidY - rect.top : clientMidY;
    return { distance, midX, midY };
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const info = getPinchInfo(e.touches);
      if (info) {
        setPinchDistance(info.distance);
        setPinchMidpoint({ x: info.midX, y: info.midY });
      }
      // Stop any ongoing pan when pinch starts
      setIsDragging(false);
    } else if (e.touches.length === 1) {
      setPinchDistance(null);
      setPinchMidpoint(null);
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
  }, [position, isEditMode, clearSelection, clearConnectionSource, getPinchInfo]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2 && pinchDistance !== null && pinchMidpoint) {
      const info = getPinchInfo(e.touches);
      if (!info) return;

      const rawRatio = info.distance / pinchDistance;
      // Clamp each frame's ratio tightly so fast gestures feel controlled
      const clampedRatio = Math.max(0.94, Math.min(1.06, rawRatio));

      const currentScale = scaleRef.current;
      const currentPos = positionRef.current;
      const newScale = Math.min(Math.max(0.3, currentScale * clampedRatio), 2);

      // Keep the pinch midpoint fixed in world space as scale changes
      const worldX = (pinchMidpoint.x - currentPos.x) / currentScale;
      const worldY = (pinchMidpoint.y - currentPos.y) / currentScale;
      const newPosX = pinchMidpoint.x - worldX * newScale;
      const newPosY = pinchMidpoint.y - worldY * newScale;

      setScale(newScale);
      setPosition({ x: newPosX, y: newPosY });
      // Update distance for next frame, keep midpoint fixed to original pinch origin
      setPinchDistance(info.distance);
    } else if (isDragging && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart, pinchDistance, pinchMidpoint, getPinchInfo]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length < 2) {
      setPinchDistance(null);
      setPinchMidpoint(null);
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
    }
  }, []);

  const resetView = useCallback(() => {
    setScale(isMobile ? 0.5 : 0.8);
    setPosition({ x: isMobile ? 50 : -200, y: isMobile ? 50 : -100 });
  }, [isMobile]);

  const handleSkillClick = useCallback((skill: Skill) => {
    if (!isEditMode) {
      setSelectedSkill(skill);
      setIsModalOpen(true);
    }
  }, [isEditMode]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedSkill(null);
  }, []);

  const handleToggleComplete = useCallback(() => {
    if (selectedSkill) toggleSkillCompletion(selectedSkill.id);
  }, [selectedSkill, toggleSkillCompletion]);

  const handleToggleFavorite = useCallback(() => {
    if (selectedSkill) toggleSkillFavorite(selectedSkill.id);
  }, [selectedSkill, toggleSkillFavorite]);

  return (
    <div className="relative w-full h-full overflow-hidden tree-canvas overscroll-none">
      {/* Floating bottom toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
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
                      <Button variant="secondary" size="sm" onClick={duplicateSelected} className="h-6 px-2 text-xs">
                        <Copy size={12} className="mr-1" />Duplicate
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ctrl+D</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="secondary" size="sm" onClick={deleteSelected} className="h-6 px-2 text-xs text-destructive hover:text-destructive">
                        <Trash2 size={12} className="mr-1" />Delete
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete / Backspace</TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>
            <div className="text-xs opacity-80 mt-1">Click to select • Shift+click for multi • Double-click to rename</div>
            <div className="text-xs opacity-80">Ctrl+Shift+click to start connection • Alt+click to toggle key skill</div>
            {connectionSource && (
              <div className="text-xs text-accent mt-1">✓ Connection source selected - click target node</div>
            )}
            <div className="text-xs opacity-80">{selectedIds.size} selected</div>
          </div>
        )}

        <div className="bg-card/80 backdrop-blur-sm rounded-full p-1.5 flex flex-row gap-1 shadow-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => handleZoom(0.2)} className="h-9 w-9 rounded-full">
                <ZoomIn size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Zoom In</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => handleZoom(-0.2)} className="h-9 w-9 rounded-full">
                <ZoomOut size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Zoom Out</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={resetView} className="h-9 w-9 rounded-full">
                <RotateCcw size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Reset View</TooltipContent>
          </Tooltip>

          {isAdminMode && (
            <>
              <div className="w-px h-6 bg-border self-center mx-1" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={isEditMode ? "default" : "ghost"} size="icon" onClick={toggleEditMode} className="h-9 w-9 rounded-full">
                    {isEditMode ? <Unlock size={18} /> : <Lock size={18} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">{isEditMode ? "Lock Layout (Save)" : "Edit Layout"}</TooltipContent>
              </Tooltip>
              {isEditMode && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={resetPositions} className="h-9 w-9 rounded-full text-destructive hover:text-destructive">
                        <RotateCw size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Reset to Default</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost" size="icon"
                        onClick={() => {
                          const exportData = skills.map(s => ({
                            id: s.id, name: s.name, x: s.x, y: s.y,
                            connections: s.connections,
                            ...(s.type === 'key' ? { type: 'key' } : {}),
                          }));
                          navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
                          toast.success('Layout exported (includes key skills)!');
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

      {!isMobile && (
        <div className="absolute top-4 right-4 z-20 bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Move size={14} />
          <span>{isEditMode ? "Drag nodes to reposition" : "Drag to pan • Scroll to zoom"}</span>
        </div>
      )}

      <div
        ref={containerRef}
        className={`w-full h-full ${isEditMode ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
        style={{ touchAction: 'none' }}
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
            transformOrigin: '0 0',
            width: treeWidth,
            height: treeHeight,
            transition: isDragging || pinchDistance !== null ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {isEditMode && (
            <svg className="absolute inset-0 pointer-events-none opacity-20" style={{ width: treeWidth, height: treeHeight }}>
              <defs>
                <pattern id="grid" width={GRID_SIZE} height={GRID_SIZE} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          )}

          <ConnectionLines skills={skills} completedSkills={completedSkills} treeBounds={treeBounds} />

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
              onToggleKeySkill={toggleKeySkill}
            />
          ))}
        </div>
      </div>

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
