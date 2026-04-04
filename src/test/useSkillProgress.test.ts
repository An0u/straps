import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useSkillProgress } from '@/hooks/useSkillProgress';

const STORAGE_KEY = 'skill-tree-progress';
const FAVORITES_KEY = 'skill-tree-favorites';

describe('useSkillProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with no completed skills', () => {
    const { result } = renderHook(() => useSkillProgress());
    expect(result.current.completedSkills.size).toBe(0);
  });

  it('starts with no favorite skills', () => {
    const { result } = renderHook(() => useSkillProgress());
    expect(result.current.favoriteSkills.size).toBe(0);
  });

  it('toggles a skill on', () => {
    const { result } = renderHook(() => useSkillProgress());
    act(() => { result.current.toggleSkillCompletion('planche'); });
    expect(result.current.completedSkills.has('planche')).toBe(true);
  });

  it('toggles a skill off when already completed', () => {
    const { result } = renderHook(() => useSkillProgress());
    act(() => { result.current.toggleSkillCompletion('planche'); });
    act(() => { result.current.toggleSkillCompletion('planche'); });
    expect(result.current.completedSkills.has('planche')).toBe(false);
  });

  it('isSkillCompleted returns true for completed skill', () => {
    const { result } = renderHook(() => useSkillProgress());
    act(() => { result.current.toggleSkillCompletion('planche'); });
    expect(result.current.isSkillCompleted('planche')).toBe(true);
  });

  it('isSkillCompleted returns false for uncompleted skill', () => {
    const { result } = renderHook(() => useSkillProgress());
    expect(result.current.isSkillCompleted('planche')).toBe(false);
  });

  it('persists completed skills to localStorage', () => {
    const { result } = renderHook(() => useSkillProgress());
    act(() => { result.current.toggleSkillCompletion('planche'); });
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.completedSkills).toContain('planche');
  });

  it('removes skill from localStorage when toggled off', () => {
    const { result } = renderHook(() => useSkillProgress());
    act(() => { result.current.toggleSkillCompletion('planche'); });
    act(() => { result.current.toggleSkillCompletion('planche'); });
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.completedSkills).not.toContain('planche');
  });

  it('toggles a favorite on', () => {
    const { result } = renderHook(() => useSkillProgress());
    act(() => { result.current.toggleSkillFavorite('planche'); });
    expect(result.current.isSkillFavorite('planche')).toBe(true);
  });

  it('toggles a favorite off', () => {
    const { result } = renderHook(() => useSkillProgress());
    act(() => { result.current.toggleSkillFavorite('planche'); });
    act(() => { result.current.toggleSkillFavorite('planche'); });
    expect(result.current.isSkillFavorite('planche')).toBe(false);
  });

  it('resetProgress clears all completed skills', () => {
    const { result } = renderHook(() => useSkillProgress());
    act(() => { result.current.toggleSkillCompletion('planche'); });
    act(() => { result.current.toggleSkillCompletion('iron-cross'); });
    act(() => { result.current.resetProgress(); });
    expect(result.current.completedSkills.size).toBe(0);
  });

  it('resetProgress clears all favorites', () => {
    const { result } = renderHook(() => useSkillProgress());
    act(() => { result.current.toggleSkillFavorite('planche'); });
    act(() => { result.current.resetProgress(); });
    expect(result.current.favoriteSkills.size).toBe(0);
  });

  it('resetProgress removes localStorage entries', () => {
    const { result } = renderHook(() => useSkillProgress());
    act(() => { result.current.toggleSkillCompletion('planche'); });
    act(() => { result.current.resetProgress(); });
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(FAVORITES_KEY)).toBeNull();
  });

  it('loads existing progress from localStorage on mount', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ completedSkills: ['planche', 'iron-cross'], lastUpdated: new Date().toISOString() })
    );
    const { result } = renderHook(() => useSkillProgress());
    expect(result.current.completedSkills.has('planche')).toBe(true);
    expect(result.current.completedSkills.has('iron-cross')).toBe(true);
  });
});
