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
import { Check, Lock, X, ChevronRight, Star, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useIsMobile } from '@/hooks/use-mobile';
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

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  isFavorite: boolean;
  onToggleComplete: () => void;
  onToggleFavorite: () => void;
  allSkills?: Skill[]; // Pass all skills to compute direct parents
  completedSkills?: Set<string>; // Pass completed skills to show unlock status
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

  // Compute direct parents: skills whose connections array includes this skill's id
  const directParents = allSkills.filter(s => s.connections.includes(skill.id));

  const isCategory = skill.type === 'category';
  const isKey = skill.type === 'key';
  const isActive = skill.state === 'active';
  const embedUrl = skill.videoUrl ? getYouTubeEmbedUrl(skill.videoUrl) : null;

  const getTypeLabel = () => {
    if (isCategory) return 'Category';
    if (isKey) return 'Key Skill';
    return 'Regular Skill';
  };

  const getTypeColor = () => {
    if (isCategory) return 'bg-skill-category text-primary-foreground';
    if (isKey) return 'bg-skill-key text-primary-foreground';
    return 'bg-skill-active text-primary-foreground';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "modal-glass border-0",
          isMobile 
            ? "!fixed !bottom-0 !left-0 !right-0 !top-auto rounded-t-3xl rounded-b-none max-h-[85vh] w-full !max-w-full !m-0 !p-0 !translate-x-0 !translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full" 
            : "sm:max-w-md"
        )}
      >
        {/* Mobile swipe handle */}
        {isMobile && (
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-muted rounded-full" />
          </div>
        )}
        
        <div className={cn("overflow-y-auto", isMobile ? "max-h-[85vh] px-6 pb-6" : "")}>
        <DialogHeader className="select-none caret-transparent">
          <div className="flex items-center gap-2 mb-2 select-none caret-transparent">
            <Badge className={cn('text-xs', getTypeColor())}>
              {getTypeLabel()}
            </Badge>
            {skill.isGoldBorder && (
              <Badge className="bg-skill-gold text-background text-xs">
                Gold Tier
              </Badge>
            )}
            <Badge 
              variant={isActive ? 'default' : 'secondary'}
              className={cn(
                'text-xs',
                isActive 
                  ? 'bg-skill-active/20 text-skill-active-glow border-skill-active/30' 
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {isActive ? 'Active' : 'Locked'}
            </Badge>
          </div>
          <DialogTitle className="font-sans text-2xl text-foreground flex items-center gap-2 select-none caret-transparent">
            {skill.name}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className={cn(
                'h-7 w-7 shrink-0 focus-visible:ring-0 focus-visible:ring-offset-0 select-none',
                isFavorite && 'text-skill-gold'
              )}
            >
              <Star 
                size={18} 
                className={cn(isFavorite && 'fill-skill-gold')} 
              />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-3 text-left">
            {skill.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Video embed section */}
          {embedUrl && (
            <>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Play size={14} className="text-muted-foreground" />
                  Video Tutorial
                </h4>
                {isMobile ? (
                  /* Mobile: Thumbnail that opens fullscreen */
                  <button
                    onClick={() => setIsVideoFullscreen(true)}
                    className="relative w-full overflow-hidden rounded-lg bg-muted group"
                  >
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                      <img
                        src={`https://img.youtube.com/vi/${embedUrl.split('/').pop()}/hqdefault.jpg`}
                        alt={`${skill.name} video thumbnail`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                          <Play size={24} className="text-background ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </AspectRatio>
                  </button>
                ) : (
                  /* Desktop: Inline embed */
                  <div className="w-56 mx-auto">
                    <AspectRatio ratio={9 / 16} className="overflow-hidden rounded-lg bg-muted">
                      <iframe
                        src={embedUrl}
                        title={`${skill.name} video tutorial`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                )}
              </div>

              {/* Fullscreen video player for mobile */}
              <FullscreenVideoPlayer
                videoUrl={embedUrl}
                title={`${skill.name} video tutorial`}
                isOpen={isVideoFullscreen}
                onClose={() => setIsVideoFullscreen(false)}
              />
            </>
          )}

          {/* Unlocks section - showing what this skill unlocks */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <ChevronRight size={14} className="text-muted-foreground" />
              Unlocks the Following
            </h4>
            {skill.connections.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skill.connections.map(connId => {
                  const connectedSkill = allSkills.find(s => s.id === connId);
                  const displayName = connectedSkill?.name || connId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                  const isUnlocked = connectedSkill ? completedSkills.has(connectedSkill.id) : false;
                  return (
                    <div
                      key={connId}
                      className={cn(
                        'flex items-center gap-1 px-3 py-1.5 rounded-md text-sm',
                        isUnlocked
                          ? 'bg-skill-active/20 text-skill-active border border-skill-active/30'
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
            ) : (
              <p className="text-sm text-muted-foreground italic">
                This skill doesn't unlock any other skills
              </p>
            )}
          </div>

          {/* Progress tracking */}
          <div className="pt-4 border-t border-border">
            <Button
              onClick={onToggleComplete}
              className={cn(
                'w-full',
                isCompleted
                  ? 'bg-skill-gold hover:bg-skill-gold/80 text-background'
                  : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
              )}
            >
              {isCompleted ? (
                <>
                  <Check size={16} className="mr-2" />
                  Completed - Click to Unmark
                </>
              ) : (
                <>
                  <Lock size={16} className="mr-2" />
                  Mark as Completed
                </>
              )}
            </Button>
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillModal;