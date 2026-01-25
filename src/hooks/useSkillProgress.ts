import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'skill-tree-progress';
const FAVORITES_KEY = 'skill-tree-favorites';

interface SkillProgress {
  completedSkills: string[];
  lastUpdated: string;
}

interface SkillFavorites {
  favoriteSkills: string[];
  lastUpdated: string;
}

export const useSkillProgress = () => {
  const [completedSkills, setCompletedSkills] = useState<Set<string>>(new Set());
  const [favoriteSkills, setFavoriteSkills] = useState<Set<string>>(new Set());

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

    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        const favorites: SkillFavorites = JSON.parse(storedFavorites);
        setFavoriteSkills(new Set(favorites.favoriteSkills));
      }
    } catch (error) {
      console.error('Failed to load skill favorites:', error);
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

  const saveFavorites = useCallback((skills: Set<string>) => {
    try {
      const favorites: SkillFavorites = {
        favoriteSkills: Array.from(skills),
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save skill favorites:', error);
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

  const toggleSkillFavorite = useCallback((skillId: string) => {
    setFavoriteSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      saveFavorites(newSet);
      return newSet;
    });
  }, [saveFavorites]);

  const isSkillCompleted = useCallback((skillId: string) => {
    return completedSkills.has(skillId);
  }, [completedSkills]);

  const isSkillFavorite = useCallback((skillId: string) => {
    return favoriteSkills.has(skillId);
  }, [favoriteSkills]);

  const resetProgress = useCallback(() => {
    setCompletedSkills(new Set());
    setFavoriteSkills(new Set());
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(FAVORITES_KEY);
  }, []);

  const getCompletionStats = useCallback(() => {
    return {
      completed: completedSkills.size,
      total: 0, // Will be calculated with actual skill count
    };
  }, [completedSkills]);

  return {
    completedSkills,
    favoriteSkills,
    toggleSkillCompletion,
    toggleSkillFavorite,
    isSkillCompleted,
    isSkillFavorite,
    resetProgress,
    getCompletionStats,
  };
};
