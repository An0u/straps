import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'skill-tree-progress';

interface SkillProgress {
  completedSkills: string[];
  lastUpdated: string;
}

export const useSkillProgress = () => {
  const [completedSkills, setCompletedSkills] = useState<Set<string>>(new Set());

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const progress: SkillProgress = JSON.parse(stored);
        setCompletedSkills(new Set(progress.completedSkills));
      }
    } catch (error) {
      console.error('Failed to load skill progress:', error);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  const saveProgress = useCallback((skills: Set<string>) => {
    try {
      const progress: SkillProgress = {
        completedSkills: Array.from(skills),
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save skill progress:', error);
    }
  }, []);

  const toggleSkillCompletion = useCallback((skillId: string) => {
    setCompletedSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      saveProgress(newSet);
      return newSet;
    });
  }, [saveProgress]);

  const isSkillCompleted = useCallback((skillId: string) => {
    return completedSkills.has(skillId);
  }, [completedSkills]);

  const resetProgress = useCallback(() => {
    setCompletedSkills(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getCompletionStats = useCallback(() => {
    return {
      completed: completedSkills.size,
      total: 0, // Will be calculated with actual skill count
    };
  }, [completedSkills]);

  return {
    completedSkills,
    toggleSkillCompletion,
    isSkillCompleted,
    resetProgress,
    getCompletionStats,
  };
};
