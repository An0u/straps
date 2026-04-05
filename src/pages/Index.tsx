import React, { lazy, Suspense, useState } from 'react';
import Menu from '@/components/Menu';
import FeedbackModal from '@/components/FeedbackModal';
import { useSkillProgress } from '@/hooks/useSkillProgress';
import { skillTreeData } from '@/data/skillTreeData';
import { useSheetSkills } from '@/hooks/useSheetSkills';
import { List, Trash2 } from 'lucide-react';

const SkillTree = lazy(() => import('@/components/SkillTree'));

function getLevel(completed: number, total: number): string {
  const pct = total > 0 ? completed / total : 0;
  if (pct >= 1) return 'Level 6: Master';
  if (pct >= 0.75) return 'Level 5: Expert';
  if (pct >= 0.5) return 'Level 4: Advanced';
  if (pct >= 0.25) return 'Level 3: Intermediate';
  if (pct >= 0.1) return 'Level 2: Beginner';
  return 'Level 1: Rookie';
}

const Index: React.FC = () => {
  const { completedSkills, resetProgress } = useSkillProgress();
  const { data: sheetSkills } = useSheetSkills();
  const skills = sheetSkills ?? skillTreeData;
  const totalSkills = skills.length;
  const completedCount = completedSkills.size;
  const progressPct = totalSkills > 0 ? (completedCount / totalSkills) * 100 : 0;
  const level = getLevel(completedCount, totalSkills);

  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleResetClick = () => {
    if (confirmReset) {
      resetProgress();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
    }
  };

  return (
    <div className="fixed inset-0 w-full bg-background overflow-hidden">

      {/* ── Top Bar ── */}
      <header className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-24px)] max-w-[960px]">

        {/* Desktop bar — horizontal single row */}
        <div
          className="hidden md:flex items-center justify-between px-4 rounded-lg border"
          style={{ background: '#1a1d23', borderColor: '#2b303b', height: 56 }}
        >
          {/* Left: hamburger + title */}
          <div className="flex items-center gap-2 w-[200px] shrink-0">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-white hover:text-white/70 transition-colors p-1"
              aria-label="Open menu"
            >
              <List size={22} />
            </button>
            <span
              className="text-white text-[18px] tracking-[0.44px] uppercase"
              style={{ fontFamily: "'Pirata One', sans-serif" }}
            >
              The Strapstree
            </span>
          </div>

          {/* Center: level + progress bar + count */}
          <div className="flex flex-1 items-center gap-2 mx-4 min-w-0">
            <span className="text-white text-[14px] leading-[20px] whitespace-nowrap shrink-0">{level}</span>
            <div className="relative flex-1 h-[6px] rounded-full overflow-hidden min-w-0">
              <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%`, background: '#9952e0' }}
              />
            </div>
            <span className="text-[12px] leading-[16px] whitespace-nowrap shrink-0" style={{ color: '#818898' }}>
              <span className="text-white">{completedCount}</span>/{totalSkills}
            </span>
          </div>

          {/* Right: reset */}
          <div className="flex items-center justify-end w-[200px] shrink-0 gap-3">
            {confirmReset ? (
              <>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="text-[14px] text-white/50 hover:text-white/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetClick}
                  className="flex items-center gap-1.5 text-[14px] font-medium transition-colors"
                  style={{ color: '#ee4f4f' }}
                >
                  <Trash2 size={16} />
                  Confirm reset
                </button>
              </>
            ) : (
              <button
                onClick={handleResetClick}
                className="flex items-center gap-1.5 pr-2 hover:opacity-80 transition-opacity"
              >
                <Trash2 size={16} style={{ color: '#ee4f4f' }} />
                <span className="text-[16px] leading-[26px]" style={{ color: '#ee4f4f' }}>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile bar — stacked */}
        <div
          className="flex md:hidden flex-col gap-3 px-4 py-4 rounded-lg border"
          style={{ background: '#1a1d23', borderColor: '#2b303b' }}
        >
          {/* Row 1: hamburger + title + reset */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMenuOpen(true)}
                className="text-white hover:text-white/70 transition-colors"
                aria-label="Open menu"
              >
                <List size={22} />
              </button>
              <span
                className="text-white text-[18px] tracking-[0.44px] uppercase"
                style={{ fontFamily: "'Pirata One', sans-serif" }}
              >
                The Strapstree
              </span>
            </div>
            {confirmReset ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="text-[13px] text-white/50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetClick}
                  className="flex items-center gap-1 text-[13px] font-medium"
                  style={{ color: '#ee4f4f' }}
                >
                  <Trash2 size={14} />
                  Confirm
                </button>
              </div>
            ) : (
              <button
                onClick={handleResetClick}
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                <Trash2 size={15} style={{ color: '#ee4f4f' }} />
                <span className="text-[15px]" style={{ color: '#ee4f4f' }}>Reset</span>
              </button>
            )}
          </div>

          {/* Row 2: level + progress + count */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-white text-[13px] leading-[20px] whitespace-nowrap shrink-0">{level}</span>
            <div className="relative flex-1 h-[6px] rounded-full overflow-hidden">
              <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%`, background: '#9952e0' }}
              />
            </div>
            <span className="text-[12px] whitespace-nowrap shrink-0" style={{ color: '#818898' }}>
              <span className="text-white">{completedCount}</span>/{totalSkills}
            </span>
          </div>
        </div>
      </header>

      {/* ── Skill Tree ── */}
      <main className="fixed inset-0 w-full h-full">
        <Suspense fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-xs text-muted-foreground">Loading skill tree...</p>
            </div>
          </div>
        }>
          <SkillTree onOpenFeedback={() => setFeedbackOpen(true)} />
        </Suspense>
      </main>

      {/* ── Legend (desktop only) ── */}
      <div className="hidden md:block absolute bottom-4 left-4 z-20 bg-card/80 backdrop-blur-sm rounded-lg p-3">
        <h3 className="text-xs font-medium text-foreground mb-2">Legend</h3>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <img src="/shapes/category-blue.svg" alt="Two Arm Category" className="w-5 h-5" />
            <span className="text-muted-foreground">Two Arm Category</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/shapes/category-ornate.svg" alt="One Arm Category" className="w-5 h-5" />
            <span className="text-muted-foreground">One Arm Category</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-sm bg-skill-gold shadow-[0_0_8px_hsl(45_100%_55%/0.7)]" />
            <span className="text-muted-foreground">Key Skill</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/shapes/regular-blue-new.svg" alt="Two Arm Skill" className="w-5 h-5" />
            <span className="text-muted-foreground">Two Arm Skill</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/shapes/regular-purple.svg" alt="One Arm Skill" className="w-5 h-5" />
            <span className="text-muted-foreground">One Arm Skill</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/shapes/regular-inactive.svg" alt="Skill Not Started" className="w-5 h-5 grayscale opacity-50" />
            <span className="text-muted-foreground">Skill Not Started</span>
          </div>
        </div>
      </div>

      {/* ── Slide-in Menu ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          <Menu
            onClose={() => setMenuOpen(false)}
            onReset={resetProgress}
            onOpenFeedback={() => setFeedbackOpen(true)}
            completedCount={completedCount}
            totalSkills={totalSkills}
            level={level}
            progressPct={progressPct}
          />
        </div>
      )}

      {/* ── Feedback Modal ── */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
    </div>
  );
};

export default Index;
