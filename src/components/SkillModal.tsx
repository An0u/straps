import React from 'react';
import { Skill, getPrerequisiteSkills } from '@/data/skillTreeData';
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
}

const SkillModal: React.FC<SkillModalProps> = ({
  skill,
  isOpen,
  onClose,
  isCompleted,
  isFavorite,
  onToggleComplete,
  onToggleFavorite,
}) => {
  if (!skill) return null;

  const prerequisites = getPrerequisiteSkills(skill);
  const isCategory = skill.type === 'category';
  const isKey = skill.type === 'key';
  const isActive = skill.state === 'active';

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
      <DialogContent className="modal-glass sm:max-w-md border-0">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
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
              <DialogTitle className="font-display text-2xl text-foreground">
                {skill.name}
              </DialogTitle>
            </div>
            {/* Favorite button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className={cn(
                'h-8 w-8 shrink-0',
                isFavorite && 'text-skill-gold'
              )}
            >
              <Star 
                size={20} 
                className={cn(isFavorite && 'fill-skill-gold')} 
              />
            </Button>
          </div>
          <DialogDescription className="text-muted-foreground mt-3">
            {skill.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Video embed section */}
          {skill.videoUrl && getYouTubeEmbedUrl(skill.videoUrl) && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Play size={14} className="text-muted-foreground" />
                Video Tutorial
              </h4>
              <AspectRatio ratio={9 / 16} className="overflow-hidden rounded-lg bg-muted">
                <iframe
                  src={getYouTubeEmbedUrl(skill.videoUrl)!}
                  title={`${skill.name} video tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </AspectRatio>
            </div>
          )}

          {/* Prerequisites section */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Lock size={14} className="text-muted-foreground" />
              Prerequisites
            </h4>
            {prerequisites.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {prerequisites.map(prereq => (
                  <div
                    key={prereq.id}
                    className={cn(
                      'flex items-center gap-1 px-3 py-1.5 rounded-md text-sm',
                      prereq.state === 'active'
                        ? 'bg-skill-active/20 text-skill-active border border-skill-active/30'
                        : 'bg-muted text-muted-foreground border border-border'
                    )}
                  >
                    {prereq.state === 'active' ? (
                      <Check size={12} />
                    ) : (
                      <X size={12} />
                    )}
                    {prereq.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No prerequisites - this is a foundational skill
              </p>
            )}
          </div>

          {/* Connections section */}
          {skill.connections.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <ChevronRight size={14} className="text-muted-foreground" />
                Unlocks
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.connections.slice(0, 5).map(connId => (
                  <Badge key={connId} variant="secondary" className="text-xs">
                    {connId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Badge>
                ))}
                {skill.connections.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{skill.connections.length - 5} more
                  </Badge>
                )}
              </div>
            </div>
          )}

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
      </DialogContent>
    </Dialog>
  );
};

export default SkillModal;
