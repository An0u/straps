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
import { Check, Lock, ChevronRight, Star, Play, Clock, X, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useIsMobile } from '@/hooks/use-mobile';
import { Progress } from '@/components/ui/progress';
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
  
  if (!skill) return null;

  // Build parent map for ancestor lookups
  const parentMap = new Map<string, Skill[]>();
  allSkills.forEach(s => {
    s.connections.forEach(childId => {
      if (!parentMap.has(childId)) parentMap.set(childId, []);
      parentMap.get(childId)!.push(s);
    });
  });

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

  // For the prerequisites display, show the category ancestor as the requirement
  // when the direct parent is a non-category L4 skill
  const categoryAncestor = findCategoryAncestor(skill.id);
  const showChainPrereqs = directParents.length > 0 && directParents.every(p => p.type !== 'category');

  // What to show in the prerequisites section
  const prereqsToShow: Skill[] = showChainPrereqs && categoryAncestor
    ? [categoryAncestor]
    : directParents;

  const completedPrereqsCount = prereqsToShow.filter(p => completedSkills.has(p.id)).length;
  const prereqProgress = prereqsToShow.length > 0
    ? (completedPrereqsCount / prereqsToShow.length) * 100
    : 100;

  const isCategory = skill.type === 'category';
  const isKey = skill.type === 'key';
  
  const embedUrl = skill.videoUrl ? getYouTubeEmbedUrl(skill.videoUrl) : null;
  const videoId = embedUrl?.split('/').pop();
  
  const categorySvg = isCategory ? getCategorySvg(skill.name) : null;

  const getTypeLabel = () => {
    if (isCategory) return 'Category';
    if (isKey) return 'Key Skill';
    return 'Regular Skill';
  };

  const getTypeBadgeColor = () => {
    if (isCategory) return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    if (isKey) return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    return 'bg-muted text-muted-foreground border-border';
  };

  const getStatusBadge = () => {
    if (isCompleted) {
      return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Completed</Badge>;
    }
    if (isLocked) {
      return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30">Locked</Badge>;
    }
    return <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Ready to Learn</Badge>;
  };

  const getButtonText = () => {
    if (isLocked) {
      return (
        <>
          <Lock size={16} />
          Locked
        </>
      );
    }
    
    if (isCategory) {
      if (isCompleted) {
        return (
          <>
            <Check size={16} />
            Started
          </>
        );
      } else {
        return (
          <>
            <Play size={16} />
            Start Now
          </>
        );
      }
    }
    
    if (isCompleted) {
      return (
        <>
          <Check size={16} />
          Mark as Incomplete
        </>
      );
    } else {
      return (
        <>
          <Check size={16} />
          Mark as Complete
        </>
      );
    }
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
          {embedUrl ? (
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
                <Badge className={cn('text-xs border', getTypeBadgeColor())}>
                  {getTypeLabel()}
                </Badge>
                {getStatusBadge()}
                {skill.isGoldBorder && (
                  <Badge className="bg-skill-gold/10 text-skill-gold border-skill-gold/30 text-xs">
                    Gold Tier
                  </Badge>
                )}
              </div>

              {/* Title with star */}
              <div className="flex items-center gap-2">
                <DialogTitle className="font-sans text-2xl text-foreground select-none caret-transparent">
                  {skill.name}
                </DialogTitle>
                {!isMobile ? (
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
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
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={5}>
                      {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    </TooltipContent>
                  </Tooltip>
                ) : (
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
                )}
              </div>

              {/* Description */}
              <DialogDescription className="text-muted-foreground text-left text-base">
                {skill.description}
              </DialogDescription>
            </DialogHeader>

            {/* Prerequisites Progress */}
            {prereqsToShow.length > 0 && (
              <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Lock size={14} />
                    Prerequisites
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {completedPrereqsCount}/{prereqsToShow.length} completed
                  </span>
                </div>
                
                <Progress value={prereqProgress} className="h-2" />

                <div className="space-y-2">
                  {prereqsToShow.map(parent => {
                    const isDone = completedSkills.has(parent.id);
                    return (
                      <div
                        key={parent.id}
                        className={cn(
                          'flex items-center justify-between p-2 rounded-md text-sm',
                          isDone
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {isDone ? (
                            <Check size={14} className="shrink-0" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-current shrink-0" />
                          )}
                          <span>{parent.name}</span>
                        </div>
                        {!isDone && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => onClose()}
                          >
                            View
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Unlocks Section */}
            {skill.connections.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <ChevronRight size={14} className="text-muted-foreground" />
                  Unlocks the Following
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skill.connections.map(connId => {
                    const connectedSkill = allSkills.find(s => s.id === connId);
                    const displayName = connectedSkill?.name || connId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    const isUnlocked = connectedSkill ? completedSkills.has(connectedSkill.id) : false;
                    return (
                      <div
                        key={connId}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm',
                          isUnlocked
                            ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                            : 'bg-muted text-muted-foreground border border-border'
                        )}
                      >
                        {isUnlocked ? (
                          <Check size={12} />
                        ) : (
                          <Lock size={12} />
                        )}
                        {displayName}
                      </div>
                    );
                  })}
                </div>
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
                  onClick={onToggleComplete}
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
                <p>Complete {prereqsToShow.find(p => !completedSkills.has(p.id))?.name} to unlock this skill</p>
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
        {embedUrl && (
          <FullscreenVideoPlayer
            videoUrl={embedUrl}
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