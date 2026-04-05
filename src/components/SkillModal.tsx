import React, { useState } from 'react';
import { Skill } from '@/data/skillTreeData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Lock, Star, Play, Clock, X, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import FullscreenVideoPlayer from './FullscreenVideoPlayer';

const getYouTubeEmbedUrl = (url: string): string | null => {
  // Handle YouTube Shorts
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }
  
  // Handle regular YouTube URLs
  const regularMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (regularMatch) {
    return `https://www.youtube.com/embed/${regularMatch[1]}`;
  }
  
  return null;
};

const getCategorySvg = (skillName: string): string | null => {
  const lowerName = skillName.toLowerCase();
  
  if (lowerName.includes('one arm')) {
    return '/shapes/category-ornate.svg';
  } else if (lowerName.includes('two arm')) {
    return '/shapes/category.svg';
  } else if (lowerName.includes('c-shaping')) {
    return '/shapes/category.svg';
  }
  
  return '/shapes/category.svg';
};

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  isFavorite: boolean;
  onToggleComplete: () => void;
  onToggleFavorite: () => void;
  allSkills?: Skill[];
  completedSkills?: Set<string>;
}

const SkillModal: React.FC<SkillModalProps> = ({
  skill,
  isOpen,
  onClose,
  isCompleted,
  isFavorite,
  onToggleComplete,
  onToggleFavorite,
  allSkills = [],
  completedSkills = new Set(),
}) => {
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const isMobile = useIsMobile();

  // Build parent map for ancestor lookups — must be before early return (Rules of Hooks)
  const parentMap = React.useMemo(() => {
    const map = new Map<string, Skill[]>();
    allSkills.forEach(s => {
      s.connections.forEach(childId => {
        if (!map.has(childId)) map.set(childId, []);
        map.get(childId)!.push(s);
      });
    });
    return map;
  }, [allSkills]);

  // Follow the chain forward up to 3 skills deep — must be before early return (Rules of Hooks)
  const nextSkillsInChain = React.useMemo(() => {
    if (!skill) return [];
    const result: Skill[] = [];
    const visited = new Set<string>([skill.id]);
    let nextIds = skill.connections;

    while (result.length < 3 && nextIds.length > 0) {
      const nextId = nextIds[0];
      if (visited.has(nextId)) break;
      visited.add(nextId);
      const nextSkill = allSkills.find(s => s.id === nextId);
      if (!nextSkill) break;
      result.push(nextSkill);
      nextIds = nextSkill.connections;
    }

    return result;
  }, [skill, allSkills]);

  if (!skill) return null;

  // Walk up to find the nearest category ancestor
  const findCategoryAncestor = (skillId: string, visited = new Set<string>()): Skill | null => {
    if (visited.has(skillId)) return null;
    visited.add(skillId);
    const parents = parentMap.get(skillId) || [];
    for (const parent of parents) {
      if (parent.type === 'category') return parent;
      const ancestor = findCategoryAncestor(parent.id, visited);
      if (ancestor) return ancestor;
    }
    return null;
  };

  // Direct parents (skills whose connections array includes this skill's id)
  const directParents = allSkills.filter(s => s.connections.includes(skill.id));
  const totalPrereqs = directParents.length;

  // A non-category skill is unlocked if its L3 category ancestor is completed.
  // This means the entire L4 chain unlocks together when the L3 is done.
  const isLocked = (() => {
    if (skill.type === 'category') return false;
    if (totalPrereqs === 0) return false;

    // Check if any direct parent is a completed category
    const hasCompletedCategoryParent = directParents.some(
      p => p.type === 'category' && completedSkills.has(p.id)
    );
    if (hasCompletedCategoryParent) return false;

    // Walk up to find the L3 category ancestor — if completed, whole chain is unlocked
    const categoryAncestor = findCategoryAncestor(skill.id);
    if (categoryAncestor && completedSkills.has(categoryAncestor.id)) return false;

    // Fallback: locked if direct parents not all completed
    return true;
  })();

  // Category ancestor — used for the badge label on non-category skills
  const categoryAncestor = findCategoryAncestor(skill.id);

  const isCategory = skill.type === 'category';
  const isKey = skill.type === 'key';
  
  const embedUrl = skill.videoUrl ? getYouTubeEmbedUrl(skill.videoUrl) : null;
  const videoId = embedUrl?.split('/').pop();
  const isDirectVideo = !embedUrl && !!skill.videoUrl?.match(/\.(mp4|webm|ogg)(\?|$)/i);
  
  const categorySvg = isCategory ? getCategorySvg(skill.name) : null;

  const getButtonText = () => {
    if (isLocked) {
      return (
        <>
          <Lock size={16} />
          Locked
        </>
      );
    }
    if (isCompleted) {
      return (
        <>
          <Check size={16} />
          Unmark as complete
        </>
      );
    }
    return (
      <>
        <Check size={16} />
        Mark as complete
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "modal-glass border-0 !p-0 [&>button]:hidden overflow-hidden flex flex-col",
          isMobile 
            ? "!fixed !bottom-0 !left-0 !right-0 !top-auto !rounded-t-[24px] rounded-b-none max-h-[85vh] w-full !max-w-full !m-0 !translate-x-0 !translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full"
            : "sm:max-w-lg rounded-lg max-h-[90vh]"
        )}
      >
        {/* Content area */}
        <div className="flex-1 overflow-hidden">
          {/* Mobile swipe handle - only show if no video */}
          {isMobile && !embedUrl && (
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-muted rounded-full" />
            </div>
          )}
          
          {/* Video Hero Section or Category SVG or Empty State */}
          {isDirectVideo ? (
            <div className="relative w-full">
              {isMobile && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-10 h-1 bg-white/40 rounded-full" />
              )}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
              <button
                onClick={() => setIsVideoFullscreen(true)}
                className={cn(
                  "relative w-full overflow-hidden bg-black group",
                  isMobile && "rounded-t-[24px]"
                )}
              >
                <AspectRatio ratio={16 / 9}>
                  <video
                    src={skill.videoUrl!}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    muted
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform transition-all group-hover:scale-110 group-hover:bg-white shadow-2xl">
                      <Play size={28} className="text-black ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-white flex items-center gap-1">
                    <Clock size={12} />
                    <span>Tutorial</span>
                  </div>
                </AspectRatio>
              </button>
            </div>
          ) : embedUrl ? (
            <div className="relative w-full">
              {isMobile && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-10 h-1 bg-white/40 rounded-full" />
              )}

              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-white" />
              </button>

              <button
                onClick={() => setIsVideoFullscreen(true)}
                className={cn(
                  "relative w-full overflow-hidden bg-black group",
                  isMobile && "rounded-t-[24px]"
                )}
              >
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt={`${skill.name} video`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform transition-all group-hover:scale-110 group-hover:bg-white shadow-2xl">
                      <Play size={28} className="text-black ml-1" fill="currentColor" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-white flex items-center gap-1">
                    <Clock size={12} />
                    <span>Tutorial</span>
                  </div>
                </AspectRatio>
              </button>
            </div>
          ) : categorySvg ? (
            <div className={cn(
              "relative w-full bg-gradient-to-br from-purple-600/20 to-blue-600/20",
              isMobile && "rounded-t-[24px]"
            )}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-white" />
              </button>

              <AspectRatio ratio={16 / 9}>
                <div className="w-full h-full flex items-center justify-center p-8 relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/25 select-none pointer-events-none skill-text">
                    <div className="text-4xl tracking-wider uppercase mb-4">CATEGORY</div>
                    <div className="text-7xl sm:text-8xl tracking-wide uppercase whitespace-nowrap">{skill.name}</div>
                  </div>
                  
                  <img 
                    src={categorySvg} 
                    alt={skill.name}
                    className="w-32 h-32 object-contain relative z-10"
                  />
                </div>
              </AspectRatio>
            </div>
          ) : (
            <div className={cn(
              "relative w-full bg-muted/30",
              isMobile && "rounded-t-[24px]"
            )}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-white" />
              </button>

              <AspectRatio ratio={16 / 9}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <Camera size={48} strokeWidth={1.5} />
                    <span className="text-sm">No video available</span>
                  </div>
                </div>
              </AspectRatio>
            </div>
          )}

          {/* Content Section */}
          <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: isMobile ? '45vh' : '50vh' }}>
            <DialogHeader className="select-none caret-transparent space-y-3">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {isCategory ? (
                  <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs">
                    {skill.name}
                  </Badge>
                ) : categoryAncestor ? (
                  <Badge className="bg-muted text-muted-foreground border border-border text-xs">
                    {categoryAncestor.name}
                  </Badge>
                ) : null}
                {isCompleted && (
                  <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 text-xs">
                    Completed
                  </Badge>
                )}
                {isFavorite && (
                  <Badge className="bg-skill-gold/10 text-skill-gold border border-skill-gold/30 text-xs">
                    Favourite
                  </Badge>
                )}
              </div>

              {/* Title with star */}
              <div className="flex items-center gap-2">
                <DialogTitle className="font-sans text-2xl text-foreground select-none caret-transparent">
                  {skill.name}
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleFavorite}
                  className={cn(
                    'h-7 w-7 shrink-0',
                    isFavorite ? 'text-skill-gold hover:text-skill-gold/80' : 'text-muted-foreground hover:text-foreground',
                    'select-none caret-transparent'
                  )}
                >
                  <Star size={18} className={cn(isFavorite && 'fill-skill-gold')} />
                </Button>
              </div>

              {/* Description */}
              <DialogDescription className="text-muted-foreground text-left text-base">
                {skill.description}
              </DialogDescription>
            </DialogHeader>

            {/* Unlocks Section */}
            {nextSkillsInChain.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-foreground">Unlocks</h4>
                <p className="text-sm text-muted-foreground">
                  {nextSkillsInChain.map(s => s.name).join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Fixed CTA Buttons at Bottom */}
        <div className="p-6 pt-0 space-y-3 border-t border-border/50 bg-background/95 backdrop-blur-sm">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">
                <Button
                  onClick={() => { onToggleComplete(); if (!isCompleted) onClose(); }}
                  disabled={isLocked}
                  variant="ghost"
                  className={cn(
                    'w-full rounded-full font-medium transition-all text-white gap-2',
                    isCompleted
                      ? 'bg-purple-600 hover:!bg-purple-600 [&:not(:disabled)]:active:!bg-purple-700 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                      : isLocked
                      ? 'bg-purple-600/60 text-white/50 cursor-not-allowed hover:!bg-purple-600/60'
                      : 'bg-purple-600 hover:!bg-purple-600 [&:not(:disabled)]:active:!bg-purple-700 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                  )}
                >
                  {getButtonText()}
                </Button>
              </div>
            </TooltipTrigger>
            {isLocked && (
              <TooltipContent>
                <p>Complete {categoryAncestor?.name ?? 'prerequisites'} to unlock this skill</p>
              </TooltipContent>
            )}
          </Tooltip>

          {/* Dismiss Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full rounded-full font-medium bg-transparent text-white hover:!bg-transparent active:!bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background border border-white transition-all"
          >
            Dismiss
          </Button>
        </div>

        {/* Fullscreen video player */}
        {(embedUrl || isDirectVideo) && (
          <FullscreenVideoPlayer
            videoUrl={embedUrl ?? skill.videoUrl!}
            title={`${skill.name} tutorial`}
            isOpen={isVideoFullscreen}
            onClose={() => setIsVideoFullscreen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SkillModal;