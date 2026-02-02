import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] bg-black flex items-center justify-center",
        "animate-in fade-in duration-200"
      )}
      onClick={onClose}
    >
      {/* Close button - generous 44x44 hit area */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        aria-label="Close video"
      >
        <X size={24} />
      </button>

      {/* Video container - fills height, centered horizontally */}
      <div 
        className="relative w-full h-full max-w-[100vh*9/16] flex items-center justify-center"
        style={{ maxWidth: 'calc(100dvh * 9 / 16)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`${videoUrl}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full max-h-dvh"
        />
      </div>
    </div>
  );
};

export default FullscreenVideoPlayer;
