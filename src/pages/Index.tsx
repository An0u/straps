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
          <h1 className="font-display text-2xl md:text-3xl text-foreground tracking-wide">
            Straps Skill Tree
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Complete skill tree of all existing strap skills. Missing something? Use the feedback button!
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
            <img src="/shapes/category-ornate.svg" alt="Category" className="w-5 h-5" />
            <span className="text-muted-foreground">Category</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/shapes/key-blue.svg" alt="Key Skill" className="w-5 h-5" />
            <span className="text-muted-foreground">Key Skill</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/shapes/regular-purple-active.svg" alt="Skill" className="w-5 h-5" />
            <span className="text-muted-foreground">Skill</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/shapes/regular-inactive.svg" alt="Inactive" className="w-5 h-5" />
            <span className="text-muted-foreground">Inactive</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/shapes/regular-purple.svg" alt="One Arm" className="w-5 h-5" />
            <span className="text-muted-foreground">One Arm (Purple)</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/shapes/regular-blue.svg" alt="Two Arm" className="w-5 h-5" />
            <span className="text-muted-foreground">Two Arm (Blue)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
