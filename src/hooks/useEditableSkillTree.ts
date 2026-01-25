import { useState, useCallback, useEffect, useRef } from 'react';
import { Skill, skillTreeData as originalData } from '@/data/skillTreeData';

const STORAGE_KEY = 'skillTreePositions';

interface StoredPosition {
  id: string;
  x: number;
  y: number;
}

export const useEditableSkillTree = (gridSize: number = 30) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const dragStartPositions = useRef<Map<string, { x: number; y: number }>>(new Map());
  const accumulatedDelta = useRef({ x: 0, y: 0 });
  
  const [skills, setSkills] = useState<Skill[]>(() => {
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

  const snapToGrid = useCallback((value: number) => {
    return Math.round(value / gridSize) * gridSize;
  }, [gridSize]);

  const selectNode = useCallback((id: string, addToSelection: boolean) => {
    setSelectedIds(prev => {
      // If adding to selection (shift held)
      if (addToSelection) {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      }
      
      // If clicking on an already selected node without shift, keep selection
      if (prev.has(id)) {
        return prev;
      }
      
      // Otherwise, select only this node
      return new Set([id]);
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(skills.map(s => s.id)));
  }, [skills]);

  const handleDragStart = useCallback((id: string) => {
    // Store starting positions of all selected nodes
    dragStartPositions.current.clear();
    accumulatedDelta.current = { x: 0, y: 0 };
    
    const idsToMove = selectedIds.has(id) ? selectedIds : new Set([id]);
    
    skills.forEach(skill => {
      if (idsToMove.has(skill.id)) {
        dragStartPositions.current.set(skill.id, { x: skill.x, y: skill.y });
      }
    });
    
    // If dragging an unselected node, select only it
    if (!selectedIds.has(id)) {
      setSelectedIds(new Set([id]));
    }
  }, [selectedIds, skills]);

  const handleDragMove = useCallback((deltaX: number, deltaY: number) => {
    accumulatedDelta.current.x += deltaX;
    accumulatedDelta.current.y += deltaY;
    
    setSkills(prev => prev.map(skill => {
      const startPos = dragStartPositions.current.get(skill.id);
      if (!startPos) return skill;
      
      const newX = snapToGrid(startPos.x + accumulatedDelta.current.x);
      const newY = snapToGrid(startPos.y + accumulatedDelta.current.y);
      
      return { ...skill, x: newX, y: newY };
    }));
  }, [snapToGrid]);

  const handleDragEnd = useCallback(() => {
    dragStartPositions.current.clear();
    accumulatedDelta.current = { x: 0, y: 0 };
  }, []);

  const savePositions = useCallback(() => {
    const positions: StoredPosition[] = skills.map(s => ({ id: s.id, x: s.x, y: s.y }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  }, [skills]);

  const toggleEditMode = useCallback(() => {
    if (isEditMode) {
      savePositions();
      clearSelection();
    }
    setIsEditMode(prev => !prev);
  }, [isEditMode, savePositions, clearSelection]);

  const resetPositions = useCallback(() => {
    setSkills(originalData);
    localStorage.removeItem(STORAGE_KEY);
    clearSelection();
  }, [clearSelection]);

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
    selectedIds,
    toggleEditMode,
    selectNode,
    clearSelection,
    selectAll,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    resetPositions,
  };
};
