import React, { useState, useRef, useCallback, useEffect } from 'react';
import { skillTreeData, Skill } from '@/data/skillTreeData';
import SkillNode from './SkillNode';
import ConnectionLines from './ConnectionLines';
import SkillModal from './SkillModal';
import { useSkillProgress } from '@/hooks/useSkillProgress';
import { ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const SkillTree: React.FC = () => {
  const [scale, setScale] = useState(0.8);
  const [position, setPosition] = useState({ x: -200, y: -100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { isSkillCompleted, toggleSkillCompletion, completedSkills } = useSkillProgress();

  // Calculate tree bounds
  const treeBounds = {
    minX: Math.min(...skillTreeData.map(s => s.x)) - 100,
    maxX: Math.max(...skillTreeData.map(s => s.x)) + 100,
    minY: Math.min(...skillTreeData.map(s => s.y)) - 100,
    maxY: Math.max(...skillTreeData.map(s => s.y)) + 100,
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

  // Handle mouse down for dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position]);

  // Handle mouse move for dragging
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
    }
  }, [position]);

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
    setSelectedSkill(skill);
    setIsModalOpen(true);
  }, []);

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

  // Stats
  const totalSkills = skillTreeData.length;
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
        </div>

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
        <span>Drag to pan • Scroll to zoom</span>
      </div>

      {/* Tree container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
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
          {/* Connection lines */}
          <ConnectionLines skills={skillTreeData} />

          {/* Skill nodes */}
          {skillTreeData.map(skill => (
            <SkillNode
              key={skill.id}
              skill={skill}
              isCompleted={isSkillCompleted(skill.id)}
              onClick={() => handleSkillClick(skill)}
              scale={scale}
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
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default SkillTree;
