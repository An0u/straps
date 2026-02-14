import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface FullscreenVideoPlayerProps {
  videoUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const FullscreenVideoPlayer: React.FC<FullscreenVideoPlayerProps> = ({
  videoUrl,
  title,
  isOpen,
  onClose,
}) => {
  const isMobile = useIsMobile();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "p-0 border-0 bg-black [&>button]:hidden",
          isMobile
            ? "!fixed !inset-0 !max-w-full !max-h-full w-full h-full !m-0 !rounded-none !translate-x-0 !translate-y-0"
            : "max-w-4xl w-full aspect-video"
        )}
      >
        <div className="relative w-full h-full">
          {/* Close button overlay */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white"
          >
            <X size={24} />
          </Button>

          {/* Video iframe */}
          <iframe
            src={videoUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullscreenVideoPlayer;