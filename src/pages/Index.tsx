import React from 'react';
import SkillTree from '@/components/SkillTree';
import FeedbackButton from '@/components/FeedbackButton';
import { useSkillProgress } from '@/hooks/useSkillProgress';
import { skillTreeData } from '@/data/skillTreeData';

const Index: React.FC = () => {
  const { completedSkills } = useSkillProgress();
  const totalSkills = skillTreeData.length;
  const completedCount = completedSkills.size;

  return (
    <div className="min-h-dvh h-dvh w-full bg-background relative overflow-hidden overscroll-none touch-none">
      {/* Header with Progress */}
      <header className="fixed md:absolute top-4 left-4 right-4 md:left-4 md:right-auto z-30 pointer-events-none">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg px-4 py-3 flex flex-col items-center text-center md:items-start md:text-left w-full md:w-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            Straps Skill Tree
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Your complete guide to mastering aerial straps. Track your journey from foundational holds to advanced dynamic skills.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Missing a skill? Hit the feedback button to suggest additions!
          </p>
          <div className="flex items-center gap-3 mt-4 w-full min-w-[200px]">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Progress</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-skill-gold rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalSkills) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium text-foreground whitespace-nowrap">{completedCount}/{totalSkills}</span>
          </div>
        </div>
      </header>

      {/* Main skill tree area */}
      <main className="w-full h-screen">
        <SkillTree />
      </main>

      {/* Feedback button */}
      <FeedbackButton />

      {/* Legend - hidden on mobile */}
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
            <img src="/shapes/regular-blue.svg" alt="Two Arm Straps Skill" className="w-5 h-5" />
            <span className="text-muted-foreground">Two Arm Straps Skill</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/shapes/regular-purple.svg" alt="One Arm Straps Skill" className="w-5 h-5" />
            <span className="text-muted-foreground">One Arm Straps Skill</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/shapes/regular-inactive.svg" alt="Skill Not Started" className="w-5 h-5 grayscale opacity-50" />
            <span className="text-muted-foreground">Skill Not Started</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
