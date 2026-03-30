import { useQuery } from '@tanstack/react-query';
import { skillTreeData, Skill } from '@/data/skillTreeData';

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTonXeCX8scjv-zj5-K9kovfa69qTWkJXD4EwpmMhNg81dpH38zPAQqN67Yr3V_NaLkZouyVI_ZNajg/pub?gid=2087969470&single=true&output=csv';

interface SheetRow {
  name: string;
  isKey: boolean;
  videoUrl: string;
  description: string;
}

function parseCSV(csv: string): SheetRow[] {
  const lines = csv.split('\n').filter(Boolean);
  // Skip header row
  return lines.slice(1).map(line => {
    // Handle quoted fields that may contain commas
    const cols: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        cols.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    cols.push(current.trim());

    return {
      name:        cols[0] || '',
      isKey:       (cols[1] || '').toLowerCase() === 'yes',
      videoUrl:    cols[6] || '',
      description: cols[7] || '',
    };
  }).filter(r => r.name);
}

async function fetchAndMerge(): Promise<Skill[]> {
  const res = await fetch(SHEET_CSV_URL);
  if (!res.ok) throw new Error('Failed to fetch sheet');
  const csv = await res.text();
  const rows = parseCSV(csv);

  // Build lookup by lowercase name
  const sheetMap = new Map<string, SheetRow>();
  rows.forEach(r => sheetMap.set(r.name.toLowerCase(), r));

  // Merge: sheet overrides name, description, videoUrl, isKey on matching skills
  return skillTreeData.map(skill => {
    const match = sheetMap.get(skill.name.toLowerCase());
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
    queryKey: ['sheet-skills'],
    queryFn: fetchAndMerge,
    staleTime: 1000 * 60 * 10, // 10 min cache
    // Fall back to hardcoded data on error
    placeholderData: skillTreeData,
  });
};
