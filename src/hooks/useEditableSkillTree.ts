import { useState } from 'react';
import { Skill, skillTreeData as originalData } from '@/data/skillTreeData';

const STORAGE_KEY = 'skillTreePositions';
const NAMES_STORAGE_KEY = 'skillTreeNames';
const CONNECTIONS_STORAGE_KEY = 'skillTreeConnections';
const KEY_SKILLS_STORAGE_KEY = 'skillTreeKeySkills';

interface StoredPosition { id: string; x: number; y: number; }
interface StoredName { id: string; name: string; }
interface StoredConnection { from: string; to: string; }

export const useEditableSkillTree = (_gridSize: number = 30) => {
  const [skills] = useState<Skill[]>(() => {
    let result = [...originalData].map(skill => ({ ...skill, connections: [...skill.connections] }));

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const positions: StoredPosition[] = JSON.parse(saved);
        const map = new Map(positions.map(p => [p.id, { x: p.x, y: p.y }]));
        result = result.map(s => { const p = map.get(s.id); return p ? { ...s, ...p } : s; });
      }
    } catch {}

    try {
      const saved = localStorage.getItem(NAMES_STORAGE_KEY);
      if (saved) {
        const names: StoredName[] = JSON.parse(saved);
        const map = new Map(names.map(n => [n.id, n.name]));
        result = result.map(s => { const n = map.get(s.id); return n ? { ...s, name: n } : s; });
      }
    } catch {}

    try {
      const saved = localStorage.getItem(CONNECTIONS_STORAGE_KEY);
      if (saved) {
        const connections: StoredConnection[] = JSON.parse(saved);
        if (connections.length > 0) {
          const map = new Map<string, string[]>();
          connections.forEach(c => {
            if (!map.has(c.from)) map.set(c.from, []);
            map.get(c.from)!.push(c.to);
          });
          result = result.map(s => ({ ...s, connections: map.get(s.id) || [] }));
        }
      }
    } catch {}

    try {
      const saved = localStorage.getItem(KEY_SKILLS_STORAGE_KEY);
      if (saved) {
        const keySkillIds: string[] = JSON.parse(saved);
        const keySet = new Set(keySkillIds);
        result = result.map(skill => {
          const orig = originalData.find(o => o.id === skill.id);
          const origType = orig?.type || 'regular';
          if (keySet.has(skill.id)) return { ...skill, type: 'key' as const };
          if (skill.type === 'key' && origType !== 'key') return { ...skill, type: origType };
          return skill;
        });
      }
    } catch {}

    return result;
  });

  return { skills };
};