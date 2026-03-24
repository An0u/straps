import React, { useState, useRef, useCallback, useEffect, lazy, Suspense } from 'react';
import { Skill } from '@/data/skillTreeData';
import DraggableSkillNode from './DraggableSkillNode';
import ConnectionLines from './ConnectionLines';

// Lazy-load modals — they're only shown on user interaction, not on initial render
const SkillModal = lazy(() => import('./SkillModal'));
const OnboardingModal = lazy(() => import('./OnboardingModal'));
import { useSkillProgress } from '@/hooks/useSkillProgress';
import { useEditableSkillTree } from '@/hooks/useEditableSkillTree';
import { useIsMobile } from '@/hooks/use-mobile';
import { useOnboarding } from '@/hooks/useOnboarding';
import { ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const SkillTree: React.FC = () => {
  const isMobile = useIsMobile();
  const [scale, setScale] = useState(isMobile ? 0.5 : 0.8);
  const [position, setPosition] = useState({ x: isMobile ? 50 : -200, y: isMobile ? 50 : -100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Onboarding state
  const { 
    showOnboarding, 
    setShowOnboarding, 
    handleOnboardingComplete 
  } = useOnboarding();

  // Delay mounting the onboarding modal until after first paint
  // so it doesn't count as LCP content for Lighthouse/PageSpeed
  const [onboardingMounted, setOnboardingMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setOnboardingMounted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Defer rendering nodes until after first paint — shows spinner first
  const [treeReady, setTreeReady] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setTimeout(() => setTreeReady(true), 50);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Pinch zoom refs
  const pinchRef = useRef<{ 
    distance: number; 
    scale: number;
    originX: number;
    originY: number;
  } | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const hasMoved = useRef(false);

  // Live values during gesture - updated every frame without triggering re-renders
  const liveTransform = useRef({ scale: 0, x: 0, y: 0 });

  const scaleRef = useRef(scale);
  const positionRef = useRef(position);
  useEffect(() => { 
    scaleRef.current = scale;
    liveTransform.current.scale = scale;
  }, [scale]);
  useEffect(() => { 
    positionRef.current = position;
    liveTransform.current.x = position.x;
    liveTransform.current.y = position.y;
  }, [position]);

  const containerRef = useRef<HTMLDivElement>(null);
  // Ref to the inner transform div - we mutate its style directly during gestures
  const transformDivRef = useRef<HTMLDivElement>(null);

  // Apply transform directly to DOM - zero React overhead during gesture
  const applyTransformDirect = useCallback((x: number, y: number, s: number) => {
    liveTransform.current = { x, y, scale: s };
    if (transformDivRef.current) {
      transformDivRef.current.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    }
  }, []);

  const {
    isSkillCompleted,
    isSkillFavorite,
    toggleSkillCompletion,
    toggleSkillFavorite,
    completedSkills,
    getAvailableSkills,
  } = useSkillProgress();

  const { skills } = useEditableSkillTree();

  // Derive available skills — updates any time completedSkills or skills change
  const availableSkills = getAvailableSkills(skills);

  // Viewport culling — only render nodes visible in the current viewport
  // Adds a generous 200px buffer so nodes pop in before they're visible
  const visibleSkills = React.useMemo(() => {
    const vpWidth = window.innerWidth;
    const vpHeight = window.innerHeight;
    const buffer = 200;
    return skills.filter(skill => {
      const screenX = skill.x * scale + position.x;
      const screenY = skill.y * scale + position.y;
      return (
        screenX > -buffer &&
        screenX < vpWidth + buffer &&
        screenY > -buffer &&
        screenY < vpHeight + buffer
      );
    });
  }, [skills, scale, position]);

  // Tree bounds — memoized so it only recalculates when skills change.
  // Uses reduce instead of Math.min/max(...spread) to avoid call stack limits on large arrays.
  const treeBounds = React.useMemo(() => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const s of skills) {
      if (s.x < minX) minX = s.x;
      if (s.x > maxX) maxX = s.x;
      if (s.y < minY) minY = s.y;
      if (s.y > maxY) maxY = s.y;
    }
    return { minX: minX - 100, maxX: maxX + 100, minY: minY - 100, maxY: maxY + 100 };
  }, [skills]);
  const treeWidth = treeBounds.maxX - treeBounds.minX;
  const treeHeight = treeBounds.maxY - treeBounds.minY;

  // Zoom button handler
  const handleZoom = useCallback((delta: number) => {
    setScale(prev => Math.min(Math.max(0.3, prev + delta), 2));
  }, []);

  // Wheel zoom (desktop)
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

  // Mouse pan
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => { setIsDragging(false); }, []);

  // Touch helpers
  const getTouchInfo = useCallback((touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const midX = (touches[0].clientX + touches[1].clientX) / 2;
    const midY = (touches[0].clientY + touches[1].clientY) / 2;
    return { distance, midX, midY };
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Two finger pinch zoom
      e.preventDefault(); // Prevent browser zoom
      const { distance, midX, midY } = getTouchInfo(e.touches);
      const rect = containerRef.current?.getBoundingClientRect();
      
      // Calculate screen position of midpoint
      const screenMidX = midX - (rect?.left ?? 0);
      const screenMidY = midY - (rect?.top ?? 0);
      
      // Calculate and LOCK the world position at touch start
      const currentPos = positionRef.current;
      const currentScale = scaleRef.current;
      const worldOriginX = (screenMidX - currentPos.x) / currentScale;
      const worldOriginY = (screenMidY - currentPos.y) / currentScale;
      
      pinchRef.current = {
        distance,
        scale: currentScale,
        originX: worldOriginX,  // Lock this world position
        originY: worldOriginY,
      };
      
      touchStartRef.current = null;
      hasMoved.current = false;
    } else if (e.touches.length === 1) {
      // Single finger pan
      pinchRef.current = null;
      hasMoved.current = false;
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
      setDragStart({
        x: e.touches[0].clientX - positionRef.current.x,
        y: e.touches[0].clientY - positionRef.current.y,
      });
    }
  }, [getTouchInfo]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasMoved.current = true;

      const { distance: newDistance, midX: rawMidX, midY: rawMidY } = getTouchInfo(e.touches);
      const rect = containerRef.current?.getBoundingClientRect();
      const screenMidX = rawMidX - (rect?.left ?? 0);
      const screenMidY = rawMidY - (rect?.top ?? 0);

      let ratio = newDistance / pinchRef.current.distance;
      const dampening = 0.5;
      ratio = 1 + (ratio - 1) * dampening;

      let newScale = pinchRef.current.scale * ratio;
      newScale = Math.min(Math.max(0.3, newScale), 2);

      const lockedWorldX = pinchRef.current.originX;
      const lockedWorldY = pinchRef.current.originY;
      const newX = screenMidX - lockedWorldX * newScale;
      const newY = screenMidY - lockedWorldY * newScale;

      // ✅ Direct DOM update — no React re-render during pinch
      applyTransformDirect(newX, newY, newScale);

    } else if (e.touches.length === 1 && touchStartRef.current) {
      const deltaX = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
      const deltaY = Math.abs(e.touches[0].clientY - touchStartRef.current.y);

      if (deltaX > 10 || deltaY > 10) {
        e.preventDefault();
        hasMoved.current = true;

        if (!isDragging) setIsDragging(true);

        const newX = e.touches[0].clientX - dragStart.x;
        const newY = e.touches[0].clientY - dragStart.y;

        // ✅ Direct DOM update — no React re-render during pan
        applyTransformDirect(newX, newY, liveTransform.current.scale);
      }
    }
  }, [isDragging, dragStart, getTouchInfo, applyTransformDirect]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      pinchRef.current = null;
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
      touchStartRef.current = null;

      // ✅ Commit the live DOM transform to React state only once, on finger lift
      const { x, y, scale: s } = liveTransform.current;
      setScale(s);
      setPosition({ x, y });

      hasMoved.current = false;
    }
  }, []);

  const resetView = useCallback(() => {
    setScale(isMobile ? 0.5 : 0.8);
    setPosition({ x: isMobile ? 50 : -200, y: isMobile ? 50 : -100 });
  }, [isMobile]);

  const handleSkillClick = useCallback((skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  }, []);

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
        </div>
      </div>

      {/* Tree container */}
      <div
        ref={containerRef}
        className={'w-full h-full cursor-grab active:cursor-grabbing'}
        style={{ touchAction: 'none' }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStartCapture={handleTouchStart}
        onTouchMoveCapture={handleTouchMove}
        onTouchEndCapture={handleTouchEnd}
      >
        <div
          ref={transformDivRef}
          className="relative"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            width: treeWidth,
            height: treeHeight,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            willChange: isDragging ? 'transform' : 'auto',
          }}
        >
          <ConnectionLines skills={skills} completedSkills={completedSkills} treeBounds={treeBounds} />

          {!treeReady && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'hsl(220 15% 8%)',
                zIndex: 50,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '2px solid hsl(270 70% 60%)',
                  borderTopColor: 'transparent',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <p style={{ fontSize: 12, color: 'hsl(220 10% 55%)' }}>Loading skill tree...</p>
              </div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {treeReady && visibleSkills.map(skill => (
            <DraggableSkillNode
              key={skill.id}
              skill={skill}
              isCompleted={isSkillCompleted(skill.id)}
              isFavorite={isSkillFavorite(skill.id)}
              isAvailable={availableSkills.has(skill.id)}
              onClick={() => handleSkillClick(skill)}
              scale={scale}
              isEditMode={false}
              isSelected={false}
              isConnectionSource={false}
              onSelect={() => new Set<string>()}
              onDragStart={() => {}}
              onDragMove={() => {}}
              onDragEnd={() => {}}
              onConnectionClick={() => false}
              gridSize={30}
              onNameChange={() => {}}
              onToggleKeySkill={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Skill Modal — stays mounted so Radix Dialog animations work correctly */}
      <Suspense fallback={null}>
        <SkillModal
          skill={selectedSkill}
          isOpen={isModalOpen}
          onClose={closeModal}
          isCompleted={selectedSkill ? isSkillCompleted(selectedSkill.id) : false}
          isFavorite={selectedSkill ? isSkillFavorite(selectedSkill.id) : false}
          onToggleComplete={handleToggleComplete}
          onToggleFavorite={handleToggleFavorite}
          allSkills={skills}
          completedSkills={completedSkills}
        />
      </Suspense>

      {/* Onboarding Modal — delayed mount so it doesn't affect LCP */}
      {onboardingMounted && (
        <Suspense fallback={null}>
          <OnboardingModal
            isOpen={showOnboarding}
            onClose={() => setShowOnboarding(false)}
            onComplete={handleOnboardingComplete}
          />
        </Suspense>
      )}
    </div>
  );
};

export default SkillTree;