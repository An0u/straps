import { useQuery } from '@tanstack/react-query';
import { skillTreeData, Skill } from '@/data/skillTreeData';
import { supabase, SkillRow } from '@/lib/supabase';

interface SkillRecord {
  name: string;
  isKey: boolean;
  videoUrl: string;
  description: string;
}

async function fetchSkillsFromSupabase(): Promise<SkillRecord[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('id, name, is_key_skill, direction, link, description, connects_to');

  if (error) throw error;

  return (data ?? []).map((row: Pick<SkillRow, 'name' | 'is_key_skill' | 'link' | 'description'>) => ({
    name: row.name,
    isKey: row.is_key_skill,
    videoUrl: row.link ?? '',
    description: row.description ?? '',
  }));
}

async function fetchAndMerge(): Promise<Skill[]> {
  const rows = await fetchSkillsFromSupabase();

  // Build lookup by lowercase name
  const skillMap = new Map<string, SkillRecord>();
  rows.forEach(r => skillMap.set(r.name.toLowerCase(), r));

  // Merge: Supabase overrides name, description, videoUrl, isKey on matching skills
  return skillTreeData.map(skill => {
    const match = skillMap.get(skill.name.toLowerCase());
    if (!match) return skill;
    return {
      ...skill,
      name:        match.name || skill.name,
      description: match.description || skill.description,
      videoUrl:    match.videoUrl || skill.videoUrl,
      ...(match.isKey && skill.type === 'regular'
        ? { type: 'key' as const, isGoldBorder: true }
        : {}),
    };
  });
}

export const useSheetSkills = () => {
  return useQuery({
    queryKey: ['supabase-skills'],
    queryFn: fetchAndMerge,
    staleTime: 1000 * 60 * 10, // 10 min cache
    // Fall back to hardcoded data on error
    placeholderData: skillTreeData,
  });
};
