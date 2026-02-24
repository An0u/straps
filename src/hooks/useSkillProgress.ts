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

  // Load progress from localStorage on mount and sync across hook instances
  useEffect(() => {
    const loadProgress = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const progress: SkillProgress = JSON.parse(stored);
          setCompletedSkills(new Set(progress.completedSkills));
        } else {
          setCompletedSkills(new Set());
        }
      } catch (error) {
        console.error('Failed to load skill progress:', error);
      }

      try {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          const favorites: SkillFavorites = JSON.parse(storedFavorites);
          setFavoriteSkills(new Set(favorites.favoriteSkills));
        } else {
          setFavoriteSkills(new Set());
        }
      } catch (error) {
        console.error('Failed to load skill favorites:', error);
      }
    };

    loadProgress();

    // Sync across hook instances (e.g. Index.tsx header + SkillTree) via storage events.
    // NOTE: storage events only fire in OTHER tabs by default in browsers, so we also
    // dispatch a custom event within the same tab when saving.
    const handleStorage = (e: StorageEvent | CustomEvent) => {
      if (
        e instanceof StorageEvent &&
        (e.key === STORAGE_KEY || e.key === FAVORITES_KEY || e.key === null)
      ) {
        loadProgress();
      } else if (e instanceof CustomEvent && e.type === 'skill-progress-updated') {
        loadProgress();
      }
    };

    window.addEventListener('storage', handleStorage as EventListener);
    window.addEventListener('skill-progress-updated', handleStorage as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorage as EventListener);
      window.removeEventListener('skill-progress-updated', handleStorage as EventListener);
    };
  }, []);

  // Save progress to localStorage and notify other hook instances in the same tab
  const saveProgress = useCallback((skills: Set<string>) => {
    try {
      const progress: SkillProgress = {
        completedSkills: Array.from(skills),
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      window.dispatchEvent(new CustomEvent('skill-progress-updated'));
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
      window.dispatchEvent(new CustomEvent('skill-progress-updated'));
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
    window.dispatchEvent(new CustomEvent('skill-progress-updated'));
  }, []);

  const getCompletionStats = useCallback(() => {
    return {
      completed: completedSkills.size,
      total: 0,
    };
  }, [completedSkills]);

  const getAvailableSkills = useCallback((skills: any[]) => {
    const available = new Set<string>();

    // Build a parent map: skillId -> list of skills that connect TO it
    const parentMap = new Map<string, any[]>();
    skills.forEach(skill => {
      skill.connections.forEach((childId: string) => {
        if (!parentMap.has(childId)) parentMap.set(childId, []);
        parentMap.get(childId)!.push(skill);
      });
    });

    // Walk up the parent chain to find the nearest category ancestor
    const findCategoryAncestor = (skillId: string, visited = new Set<string>()): any | null => {
      if (visited.has(skillId)) return null;
      visited.add(skillId);
      const parents = parentMap.get(skillId) || [];
      for (const parent of parents) {
        if (parent.type === 'category') return parent;
        const ancestor = findCategoryAncestor(parent.id, visited);
        if (ancestor) return ancestor;
      }
      return null;
    };

    skills.forEach(skill => {
      // Category nodes are always available
      if (skill.type === 'category') {
        available.add(skill.id);
        return;
      }

      const parents = parentMap.get(skill.id) || [];

      if (parents.length === 0) {
        // No prerequisites — always available
        available.add(skill.id);
        return;
      }

      // If any direct parent is a completed category, this skill is available
      // (covers the first L4 node in a chain)
      const hasCompletedCategoryParent = parents.some(
        p => p.type === 'category' && completedSkills.has(p.id)
      );
      if (hasCompletedCategoryParent) {
        available.add(skill.id);
        return;
      }

      // For L4 skills further down the chain: walk up to find the L3 category
      // ancestor. If it's completed, the entire chain is unlocked.
      const categoryAncestor = findCategoryAncestor(skill.id);
      if (categoryAncestor && completedSkills.has(categoryAncestor.id)) {
        available.add(skill.id);
        return;
      }

      // Fallback: all direct parents completed
      if (parents.every((p: any) => completedSkills.has(p.id))) {
        available.add(skill.id);
      }
    });

    return available;
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
    getAvailableSkills,
  };
};