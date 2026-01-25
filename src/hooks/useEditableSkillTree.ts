import { useState, useCallback, useEffect } from 'react';
import { Skill, skillTreeData as originalData } from '@/data/skillTreeData';

const STORAGE_KEY = 'skillTreePositions';

interface StoredPosition {
  id: string;
  x: number;
  y: number;
}

export const useEditableSkillTree = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [skills, setSkills] = useState<Skill[]>(() => {
    // Load saved positions from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const positions: StoredPosition[] = JSON.parse(saved);
        const positionMap = new Map(positions.map(p => [p.id, { x: p.x, y: p.y }]));
        return originalData.map(skill => {
          const savedPos = positionMap.get(skill.id);
          return savedPos ? { ...skill, x: savedPos.x, y: savedPos.y } : skill;
        });
      } catch {
        return originalData;
      }
    }
    return originalData;
  });

  const updatePosition = useCallback((id: string, x: number, y: number) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id ? { ...skill, x, y } : skill
    ));
  }, []);

  const savePositions = useCallback(() => {
    const positions: StoredPosition[] = skills.map(s => ({ id: s.id, x: s.x, y: s.y }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  }, [skills]);

  const toggleEditMode = useCallback(() => {
    if (isEditMode) {
      // Leaving edit mode - save positions
      savePositions();
    }
    setIsEditMode(prev => !prev);
  }, [isEditMode, savePositions]);

  const resetPositions = useCallback(() => {
    setSkills(originalData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Auto-save when positions change in edit mode
  useEffect(() => {
    if (isEditMode) {
      const timeout = setTimeout(savePositions, 500);
      return () => clearTimeout(timeout);
    }
  }, [skills, isEditMode, savePositions]);

  return {
    skills,
    isEditMode,
    toggleEditMode,
    updatePosition,
    resetPositions,
  };
};
