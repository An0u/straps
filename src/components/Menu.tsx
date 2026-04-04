import React, { useState } from 'react';
import { ChevronLeft, X, Trophy, SlidersHorizontal, MessageCircle, ExternalLink, Handshake, Trash2 } from 'lucide-react';

interface MenuProps {
  onClose: () => void;
  onReset: () => void;
  onOpenFeedback: () => void;
  completedCount: number;
  totalSkills: number;
  level: string;
  progressPct: number;
}

const Menu: React.FC<MenuProps> = ({ onClose, onReset, onOpenFeedback, completedCount, totalSkills, level, progressPct }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleResetConfirm = () => {
    onReset();
    setShowConfirm(false);
    onClose();
  };

  return (
    <div
      // Mobile: full-width, rounded top corners, starts below the ~108px mobile header
      // Desktop: 320px wide, full height from top-0, rounded right side
      className="absolute left-0 bottom-0 w-full top-[108px] md:top-0 md:w-[320px] md:bottom-auto md:h-full flex flex-col overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-r-lg"
      style={{
        background: '#1a1d23',
        border: '1px solid #2b303b',
        boxShadow: '12px 0 27px rgba(0,0,0,0.1), 49px 0 49px rgba(0,0,0,0.09)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between h-[50px] px-3 shrink-0"
        style={{ borderBottom: '1px solid #2b303b' }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="text-white hover:text-white/70 transition-colors p-1"
            aria-label="Close menu"
          >
            <ChevronLeft size={22} />
          </button>
          <span className="text-white text-[16px] leading-[26px]">Menu</span>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-white/70 transition-colors p-1"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Stats / Progress */}
      <div className="flex flex-col gap-1 px-6 pt-5 pb-3 shrink-0">
        <span className="text-white text-[16px] leading-[26px]">{level}</span>
        <div className="flex items-center gap-4 w-full">
          <div className="relative flex-1 h-[6px] rounded-full overflow-hidden">
            <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%`, background: '#9952e0' }}
            />
          </div>
          <span className="text-[12px] leading-[16px] shrink-0" style={{ color: '#818898' }}>
            <span className="text-white">{completedCount}</span>/{totalSkills}
          </span>
        </div>
        <p className="text-[12px] leading-[16px] opacity-90" style={{ color: '#818898' }}>
          Your complete guide to aerial straps skills. Follow along and mark your progress as you get stronger.
        </p>
      </div>

      {/* Nav items — scrollable middle */}
      <div className="flex flex-col flex-1 justify-between overflow-y-auto">
        <div className="flex flex-col gap-4 pt-2">

          {/* Profile section */}
          <div className="flex flex-col gap-2 px-3">
            <span className="text-[12px] leading-[16px] px-3" style={{ color: '#818898' }}>Profile</span>
            <div className="flex items-center gap-2 h-10 px-3 opacity-50">
              <Trophy size={20} className="text-white shrink-0" />
              <span className="text-white text-[14px] leading-[20px]">Level</span>
              <span className="text-[12px] leading-[16px] font-medium" style={{ color: '#9952e0' }}>Coming soon</span>
            </div>
            <div className="flex items-center gap-2 h-10 px-3 opacity-50">
              <SlidersHorizontal size={20} className="text-white shrink-0" />
              <span className="text-white text-[14px] leading-[20px]">Settings</span>
              <span className="text-[12px] leading-[16px] font-medium" style={{ color: '#9952e0' }}>Coming soon</span>
            </div>
          </div>

          {/* Volunteer section */}
          <div className="flex flex-col gap-2 px-3">
            <span className="text-[12px] leading-[16px] px-3" style={{ color: '#818898' }}>Volunteer</span>
            <button
              onClick={() => { onClose(); onOpenFeedback(); }}
              className="flex items-center gap-2 h-10 px-3 hover:bg-white/5 rounded-lg transition-colors w-full text-left"
            >
              <MessageCircle size={20} className="text-white shrink-0" />
              <span className="text-white text-[14px] leading-[20px]">Give feedback</span>
            </button>
            <div className="flex items-center gap-2 h-10 px-3 opacity-50">
              <Handshake size={20} className="text-white shrink-0" />
              <span className="text-white text-[14px] leading-[20px]">Volunteer to help</span>
              <ExternalLink size={16} className="ml-auto shrink-0" style={{ color: '#818898' }} />
              <span className="text-[12px] leading-[16px] font-medium shrink-0" style={{ color: '#9952e0' }}>Coming soon</span>
            </div>
          </div>
        </div>

        {/* Bottom: Reset + Credits */}
        <div className="flex flex-col gap-4 px-3 pb-2">

          {/* Reset */}
          {showConfirm ? (
            <div
              className="flex flex-col gap-3 p-3 rounded-lg"
              style={{ background: 'rgba(238,79,79,0.08)', border: '1px solid rgba(238,79,79,0.25)' }}
            >
              <div>
                <p className="text-white text-[14px] leading-[20px] font-medium mb-1">Reset all progress?</p>
                <p className="text-[12px] leading-[16px]" style={{ color: '#818898' }}>
                  Be careful — this will permanently reset everything. All your completed skills will be lost.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 h-9 rounded-md text-[13px] text-white/60 hover:text-white transition-colors"
                  style={{ border: '1px solid #2b303b' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetConfirm}
                  className="flex-1 h-9 rounded-md text-[13px] font-medium transition-colors hover:opacity-90"
                  style={{ background: '#ee4f4f', color: 'white' }}
                >
                  Yes, reset
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 h-10 px-3 hover:bg-white/5 rounded-lg transition-colors w-full"
            >
              <Trash2 size={20} style={{ color: '#ee4f4f' }} className="shrink-0" />
              <span className="text-[16px] leading-[26px]" style={{ color: '#ee4f4f' }}>Reset</span>
            </button>
          )}

          {/* Credits */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] leading-[16px] px-3" style={{ color: '#818898' }}>Credits to</span>
            <div className="px-3">
              <p className="text-white text-[14px] leading-[20px]">
                Alvaro Medrano, Mathis Machure, Garrett Schneweid, Julian Acrobat
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dismiss button — mobile only */}
      <button
        onClick={onClose}
        className="md:hidden shrink-0 mx-3 mb-6 mt-2 h-10 rounded-full text-[14px] font-medium text-white/90 hover:text-white transition-colors"
        style={{ border: '1px solid #818898' }}
      >
        Dismiss
      </button>
    </div>
  );
};

export default Menu;
