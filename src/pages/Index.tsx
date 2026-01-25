import React from 'react';
import SkillTree from '@/components/SkillTree';
import FeedbackButton from '@/components/FeedbackButton';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="inline-block bg-card/80 backdrop-blur-sm rounded-lg px-4 py-3">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-wide">
            Skill Tree
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Track your progress and master new skills
          </p>
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
