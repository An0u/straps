import { useState, useCallback, useEffect, useRef } from 'react';
import { Skill, skillTreeData as originalData } from '@/data/skillTreeData';

const STORAGE_KEY = 'skillTreePositions';
const NAMES_STORAGE_KEY = 'skillTreeNames';
const CONNECTIONS_STORAGE_KEY = 'skillTreeConnections';
const KEY_SKILLS_STORAGE_KEY = 'skillTreeKeySkills';

interface StoredPosition {
  id: string;
  x: number;
  y: number;
}

interface StoredName {
  id: string;
  name: string;
}

interface StoredConnection {
  from: string;
  to: string;
}

export const useEditableSkillTree = (gridSize: number = 30) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [connectionSource, setConnectionSource] = useState<string | null>(null);
  const dragStartPositions = useRef<Map<string, { x: number; y: number }>>(new Map());
  const accumulatedDelta = useRef({ x: 0, y: 0 });
  
  const [skills, setSkills] = useState<Skill[]>(() => {
    // Start with original data including its connections
    let result = [...originalData].map(skill => ({ ...skill, connections: [...skill.connections] }));
    
    // Load saved positions
    const savedPositions = localStorage.getItem(STORAGE_KEY);
    if (savedPositions) {
      try {
        const positions: StoredPosition[] = JSON.parse(savedPositions);
        const positionMap = new Map(positions.map(p => [p.id, { x: p.x, y: p.y }]));
        result = result.map(skill => {
          const savedPos = positionMap.get(skill.id);
          return savedPos ? { ...skill, x: savedPos.x, y: savedPos.y } : skill;
        });
      } catch {
        // Ignore parse errors
      }
    }
    
    // Load saved names
    const savedNames = localStorage.getItem(NAMES_STORAGE_KEY);
    if (savedNames) {
      try {
        const names: StoredName[] = JSON.parse(savedNames);
        const nameMap = new Map(names.map(n => [n.id, n.name]));
        result = result.map(skill => {
          const savedName = nameMap.get(skill.id);
          return savedName ? { ...skill, name: savedName } : skill;
        });
      } catch {
        // Ignore parse errors
      }
    }
    
    // Load saved connections - only override if there are saved connections
    const savedConnections = localStorage.getItem(CONNECTIONS_STORAGE_KEY);
    if (savedConnections) {
      try {
        const connections: StoredConnection[] = JSON.parse(savedConnections);
        if (connections.length > 0) {
          const connectionMap = new Map<string, string[]>();
          connections.forEach(c => {
            if (!connectionMap.has(c.from)) {
              connectionMap.set(c.from, []);
            }
            connectionMap.get(c.from)!.push(c.to);
          });
          result = result.map(skill => ({
            ...skill,
            connections: connectionMap.get(skill.id) || []
          }));
        }
      } catch {
        // Ignore parse errors
      }
    }
    
    // Load saved key skills
    const savedKeySkills = localStorage.getItem(KEY_SKILLS_STORAGE_KEY);
    if (savedKeySkills) {
      try {
        const keySkillIds: string[] = JSON.parse(savedKeySkills);
        const keySkillSet = new Set(keySkillIds);
        result = result.map(skill => {
          // Apply key skill overrides - set to 'key' if in saved list, or revert to original type if not
          const originalSkill = originalData.find(o => o.id === skill.id);
          const originalType = originalSkill?.type || 'regular';
          
          if (keySkillSet.has(skill.id)) {
            return { ...skill, type: 'key' as const };
          } else if (skill.type === 'key' && originalType !== 'key') {
            return { ...skill, type: originalType };
          }
          return skill;
        });
      } catch {
        // Ignore parse errors
      }
    }
    
    return result;
  });

  const snapToGrid = useCallback((value: number) => {
    return Math.round(value / gridSize) * gridSize;
  }, [gridSize]);

  // Compute what the new selection should be
  const computeNewSelection = useCallback((id: string, addToSelection: boolean): Set<string> => {
    const prev = selectedIds;
    if (addToSelection) {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    }
    if (prev.has(id)) {
      return prev;
    }
    return new Set([id]);
  }, [selectedIds]);

  const selectNode = useCallback((id: string, addToSelection: boolean) => {
    const newSelection = computeNewSelection(id, addToSelection);
    setSelectedIds(newSelection);
    return newSelection;
  }, [computeNewSelection]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(skills.map(s => s.id)));
  }, [skills]);

  const handleDragStart = useCallback((id: string, newSelection: Set<string>) => {
    // Store starting positions of all selected nodes
    dragStartPositions.current.clear();
    accumulatedDelta.current = { x: 0, y: 0 };
    
    // Use the passed newSelection which is current
    const idsToMove = newSelection.has(id) ? newSelection : new Set([id]);
    
    skills.forEach(skill => {
      if (idsToMove.has(skill.id)) {
        dragStartPositions.current.set(skill.id, { x: skill.x, y: skill.y });
      }
    });
  }, [skills]);

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

  const saveNames = useCallback(() => {
    const names: StoredName[] = skills
      .filter(s => s.name !== originalData.find(o => o.id === s.id)?.name)
      .map(s => ({ id: s.id, name: s.name }));
    localStorage.setItem(NAMES_STORAGE_KEY, JSON.stringify(names));
  }, [skills]);

  const saveConnections = useCallback(() => {
    const connections: StoredConnection[] = [];
    skills.forEach(skill => {
      skill.connections.forEach(toId => {
        connections.push({ from: skill.id, to: toId });
      });
    });
    localStorage.setItem(CONNECTIONS_STORAGE_KEY, JSON.stringify(connections));
  }, [skills]);

  const saveKeySkills = useCallback(() => {
    // Save skills that are marked as 'key' but weren't originally, or vice versa
    const keySkillIds = skills
      .filter(s => s.type === 'key')
      .map(s => s.id);
    localStorage.setItem(KEY_SKILLS_STORAGE_KEY, JSON.stringify(keySkillIds));
  }, [skills]);

  const updateNodeName = useCallback((id: string, newName: string) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id ? { ...skill, name: newName } : skill
    ));
  }, []);

  const toggleKeySkill = useCallback((id: string) => {
    setSkills(prev => prev.map(skill => {
      if (skill.id !== id) return skill;
      // Don't allow toggling category nodes to key
      if (skill.type === 'category') return skill;
      // Toggle between 'key' and 'regular'
      return {
        ...skill,
        type: skill.type === 'key' ? 'regular' : 'key'
      };
    }));
  }, []);

  // Connection editing: Ctrl+Shift+click on first node, then click second node
  const handleConnectionClick = useCallback((targetId: string, isCtrlShift: boolean) => {
    if (!isEditMode) return false;
    
    if (isCtrlShift) {
      // Start connection from this node
      setConnectionSource(targetId);
      return true;
    }
    
    if (connectionSource && connectionSource !== targetId) {
      // Complete connection
      setSkills(prev => prev.map(skill => {
        if (skill.id === connectionSource) {
          // Toggle connection - remove if exists, add if not
          const hasConnection = skill.connections.includes(targetId);
          return {
            ...skill,
            connections: hasConnection
              ? skill.connections.filter(id => id !== targetId)
              : [...skill.connections, targetId]
          };
        }
        return skill;
      }));
      setConnectionSource(null);
      return true;
    }
    
    return false;
  }, [isEditMode, connectionSource]);

  const clearConnectionSource = useCallback(() => {
    setConnectionSource(null);
  }, []);

  const duplicateSelected = useCallback(() => {
    if (selectedIds.size === 0) return;
    
    const newNodes: Skill[] = [];
    const newIds: string[] = [];
    
    skills.forEach(skill => {
      if (selectedIds.has(skill.id)) {
        const newId = `${skill.id}-copy-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        newIds.push(newId);
        newNodes.push({
          ...skill,
          id: newId,
          name: `${skill.name} (copy)`,
          x: snapToGrid(skill.x + 60),
          y: snapToGrid(skill.y + 60),
          connections: [], // Clear connections for duplicates
          prerequisites: [],
        });
      }
    });
    
    setSkills(prev => [...prev, ...newNodes]);
    setSelectedIds(new Set(newIds)); // Select the new duplicates
  }, [selectedIds, skills, snapToGrid]);

  const deleteSelected = useCallback(() => {
    if (selectedIds.size === 0) return;
    
    setSkills(prev => prev.filter(skill => !selectedIds.has(skill.id)));
    clearSelection();
  }, [selectedIds, clearSelection]);

  const toggleEditMode = useCallback(() => {
    if (isEditMode) {
      savePositions();
      saveNames();
      saveConnections();
      saveKeySkills();
      clearSelection();
      setConnectionSource(null);
    }
    setIsEditMode(prev => !prev);
  }, [isEditMode, savePositions, saveNames, saveConnections, saveKeySkills, clearSelection]);

  const resetPositions = useCallback(() => {
    setSkills(originalData.map(s => ({ ...s, connections: [...s.connections] })));
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NAMES_STORAGE_KEY);
    localStorage.removeItem(CONNECTIONS_STORAGE_KEY);
    localStorage.removeItem(KEY_SKILLS_STORAGE_KEY);
    clearSelection();
    setConnectionSource(null);
  }, [clearSelection]);

  // Auto-save when positions, names, connections, or key skills change in edit mode
  useEffect(() => {
    if (isEditMode) {
      const timeout = setTimeout(() => {
        savePositions();
        saveNames();
        saveConnections();
        saveKeySkills();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [skills, isEditMode, savePositions, saveNames, saveConnections, saveKeySkills]);

  return {
    skills,
    isEditMode,
    selectedIds,
    connectionSource,
    toggleEditMode,
    selectNode,
    clearSelection,
    selectAll,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    resetPositions,
    updateNodeName,
    duplicateSelected,
    deleteSelected,
    handleConnectionClick,
    clearConnectionSource,
    toggleKeySkill,
  };
};
