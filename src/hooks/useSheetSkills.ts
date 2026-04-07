import { useQuery } from '@tanstack/react-query';
import { skillTreeData, Skill } from '@/data/skillTreeData';
import { supabase } from '@/lib/supabase';

interface SkillRow {
  id: number;
  slug: string;
  name: string;
  is_key_skill: boolean;
  link: string | null;
  description: string | null;
  connects_to: number | null;
}

interface SkillRecord {
  slug: string;
  name: string;
  isKey: boolean;
  videoUrl: string;
  description: string;
  connectsToSlug: string | null;
}

interface HierarchyRow { slug: string; name: string }

async function fetchAllFromSupabase() {
  const [skillsRes, catsRes, groupsRes, subsRes] = await Promise.all([
    supabase.from('skills').select('id, slug, name, is_key_skill, direction, link, description, connects_to'),
    supabase.from('categories').select('slug, name'),
    supabase.from('groups').select('slug, name'),
    supabase.from('subgroups').select('slug, name'),
  ]);

  if (skillsRes.error) throw skillsRes.error;
  if (catsRes.error)   throw catsRes.error;
  if (groupsRes.error) throw groupsRes.error;
  if (subsRes.error)   throw subsRes.error;

  const skillRows = (skillsRes.data ?? []) as SkillRow[];

  // id → slug map for resolving the connects_to FK to a stable identifier
  const idToSlug = new Map<number, string>();
  skillRows.forEach(r => idToSlug.set(r.id, r.slug));

  const skills: SkillRecord[] = skillRows.map(row => ({
    slug: row.slug,
    name: row.name,
    isKey: row.is_key_skill,
    videoUrl: row.link ?? '',
    description: row.description ?? '',
    connectsToSlug: row.connects_to != null ? idToSlug.get(row.connects_to) ?? null : null,
  }));

  // slug → name map across all hierarchy tables (L1/L2/L3)
  const slugToName = new Map<string, string>();
  ((catsRes.data   ?? []) as HierarchyRow[]).forEach(r => slugToName.set(r.slug, r.name));
  ((groupsRes.data ?? []) as HierarchyRow[]).forEach(r => slugToName.set(r.slug, r.name));
  ((subsRes.data   ?? []) as HierarchyRow[]).forEach(r => slugToName.set(r.slug, r.name));

  return { skills, slugToName };
}

async function fetchAndMerge(): Promise<Skill[]> {
  const { skills, slugToName } = await fetchAllFromSupabase();

  // slug → skill record
  const skillMap = new Map<string, SkillRecord>();
  skills.forEach(r => skillMap.set(r.slug, r));

  return skillTreeData.map(skill => {
    // Hierarchy nodes (L1/L2/L3) — match by slug (= local id), override name from DB.
    if (skill.type === 'category') {
      const dbName = slugToName.get(skill.id);
      return dbName ? { ...skill, name: dbName } : skill;
    }

    // Skill nodes (L4) — match by slug (= local id).
    const match = skillMap.get(skill.id);
    if (!match) return skill;
    const resolvedConnections = match.connectsToSlug ? [match.connectsToSlug] : undefined;
    return {
      ...skill,
      name:        match.name,
      description: match.description,
      videoUrl:    match.videoUrl || skill.videoUrl,
      ...(resolvedConnections ? { connections: resolvedConnections } : {}),
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
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};
