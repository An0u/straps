import { useState, useCallback, useEffect, useRef } from 'react';
import { Skill, skillTreeData as originalData } from '@/data/skillTreeData';

const STORAGE_KEY = 'skillTreePositions';
const NAMES_STORAGE_KEY = 'skillTreeNames';
const CONNECTIONS_STORAGE_KEY = 'skillTreeConnections';

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
  const [connectionSourceId, setConnectionSourceId] = useState<string | null>(null);
  const dragStartPositions = useRef<Map<string, { x: number; y: number }>>(new Map());
  const accumulatedDelta = useRef({ x: 0, y: 0 });
  
  const [skills, setSkills] = useState<Skill[]>(() => {
    let result = [...originalData];
    
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
    
    // Load saved connections
    const savedConnections = localStorage.getItem(CONNECTIONS_STORAGE_KEY);
    if (savedConnections) {
      try {
        const connections: StoredConnection[] = JSON.parse(savedConnections);
        // Build connection map: from -> [to1, to2, ...]
        const connectionMap = new Map<string, string[]>();
        connections.forEach(c => {
          const existing = connectionMap.get(c.from) || [];
          existing.push(c.to);
          connectionMap.set(c.from, existing);
        });
        result = result.map(skill => {
          const savedConns = connectionMap.get(skill.id);
          return savedConns ? { ...skill, connections: savedConns } : skill;
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
    setConnectionSourceId(null);
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(skills.map(s => s.id)));
  }, [skills]);

  // Connection editing
  const startConnection = useCallback((sourceId: string) => {
    setConnectionSourceId(sourceId);
  }, []);

  const completeConnection = useCallback((targetId: string) => {
    if (!connectionSourceId || connectionSourceId === targetId) {
      setConnectionSourceId(null);
      return;
    }

    setSkills(prev => prev.map(skill => {
      if (skill.id === connectionSourceId) {
        // Check if connection already exists
        if (skill.connections.includes(targetId)) {
          // Remove the connection (toggle behavior)
          return { ...skill, connections: skill.connections.filter(c => c !== targetId) };
        }
        // Add the connection
        return { ...skill, connections: [...skill.connections, targetId] };
      }
      return skill;
    }));

    setConnectionSourceId(null);
  }, [connectionSourceId]);

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

  const updateNodeName = useCallback((id: string, newName: string) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id ? { ...skill, name: newName } : skill
    ));
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
          connections: [],
          prerequisites: [],
        });
      }
    });
    
    setSkills(prev => [...prev, ...newNodes]);
    setSelectedIds(new Set(newIds));
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
      clearSelection();
    }
    setIsEditMode(prev => !prev);
  }, [isEditMode, savePositions, saveNames, saveConnections, clearSelection]);

  const resetPositions = useCallback(() => {
    setSkills(originalData);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NAMES_STORAGE_KEY);
    localStorage.removeItem(CONNECTIONS_STORAGE_KEY);
    clearSelection();
  }, [clearSelection]);

  // Auto-save when positions, names, or connections change in edit mode
  useEffect(() => {
    if (isEditMode) {
      const timeout = setTimeout(() => {
        savePositions();
        saveNames();
        saveConnections();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [skills, isEditMode, savePositions, saveNames, saveConnections]);

  return {
    skills,
    isEditMode,
    selectedIds,
    connectionSourceId,
    toggleEditMode,
    selectNode,
    clearSelection,
    selectAll,
    startConnection,
    completeConnection,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    resetPositions,
    updateNodeName,
    duplicateSelected,
    deleteSelected,
  };
};
