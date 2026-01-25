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
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Header with Progress */}
      <header className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg px-4 py-3 flex flex-col items-center text-center">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-wide">
            Skill Tree
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Track your progress and master new skills
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
            <div className="w-4 h-4 skill-node-diamond skill-node-category" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <span className="text-muted-foreground">Category</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 skill-node-diamond skill-node-key" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <span className="text-muted-foreground">Key Skill</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 skill-node-diamond skill-node-active" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <span className="text-muted-foreground">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 skill-node-diamond skill-node-inactive" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <span className="text-muted-foreground">Inactive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 skill-node-diamond skill-node-inactive border-2 border-skill-gold" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <span className="text-muted-foreground">Gold Tier</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
