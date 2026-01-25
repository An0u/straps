export type SkillState = 'active' | 'inactive';
export type SkillType = 'category' | 'regular' | 'key';

export interface Skill {
  id: string;
  name: string;
  description: string;
  prerequisites: string[];
  type: SkillType;
  state: SkillState;
  isGoldBorder?: boolean;
  x: number;
  y: number;
  connections: string[];
}

export interface SkillTreeSection {
  id: string;
  name: string;
  skills: Skill[];
}

// Main central tree structure
// Coordinates scaled 1.5x for proper spacing between nodes
export const skillTreeData: Skill[] = [
  // Central spine - One Arm / Two Arm
  {
    id: 'one-arm',
    name: 'One Arm',
    description: 'Foundation for all one-arm skills. Master single arm grip and control.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 600,
    connections: ['hanging-left', 'static-center', 'rotating-top']
  },
  {
    id: 'two-arm',
    name: 'Two Arm',
    description: 'Foundation for all two-arm skills. Essential grip and positioning.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 1500,
    y: 600,
    connections: ['static-right', 'support', 'hanging-right', 'rotating-right']
  },

  // Left branch from One Arm
  {
    id: 'hanging-left',
    name: 'Hanging',
    description: 'Hanging positions using one arm. Build endurance and grip strength.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 975,
    y: 600,
    connections: ['normal-hang', 'reverse-hang', 'spin-hang']
  },
  {
    id: 'static-center',
    name: 'Static',
    description: 'Static holds and positions. Focus on stability and control.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 1125,
    y: 600,
    connections: ['swing', 'basics']
  },
  {
    id: 'rotating-top',
    name: 'Rotating',
    description: 'Rotating movements and spins. Dynamic one-arm rotations.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 1050,
    y: 225,
    connections: ['twisting-top', 'swing-top']
  },

  // Right branch from Two Arm
  {
    id: 'static-right',
    name: 'Static',
    description: 'Two-arm static positions. Foundation for advanced holds.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1575,
    y: 600,
    connections: ['hanging-right-sub']
  },
  {
    id: 'support',
    name: 'Support',
    description: 'Support positions and transitions. Key for flow work.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1725,
    y: 480,
    connections: ['front-balance', 'side-balance', 'butterfly']
  },
  {
    id: 'hanging-right',
    name: 'Hanging',
    description: 'Two-arm hanging techniques. Build upper body strength.',
    prerequisites: ['two-arm'],
    type: 'key',
    state: 'active',
    x: 1650,
    y: 720,
    connections: ['center', 'split-right', 'reverse-right']
  },
  {
    id: 'rotating-right',
    name: 'Rotating',
    description: 'Two-arm rotational movements. Advanced spinning techniques.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1800,
    y: 225,
    connections: ['sitting', 'twisting-right']
  },

  // Normal/Reverse/Spin branch (left side)
  {
    id: 'normal-hang',
    name: 'Normal',
    description: 'Standard hanging position. Entry point for hang variations.',
    prerequisites: ['hanging-left'],
    type: 'category',
    state: 'active',
    x: 825,
    y: 750,
    connections: ['meathook', 'scorpion', 'dragon']
  },
  {
    id: 'reverse-hang',
    name: 'Reverse',
    description: 'Inverted hanging position. Builds core and grip.',
    prerequisites: ['hanging-left'],
    type: 'category',
    state: 'active',
    x: 900,
    y: 840,
    connections: ['split-grip-flag', 'cruiser']
  },
  {
    id: 'spin-hang',
    name: 'Spin',
    description: 'Spinning from hang position. Dynamic movement skills.',
    prerequisites: ['hanging-left'],
    type: 'category',
    state: 'active',
    x: 975,
    y: 750,
    connections: ['cruiser']
  },

  // Cruiser center
  {
    id: 'cruiser',
    name: 'Cruiser',
    description: 'Advanced cruiser position. Signature skill for flow.',
    prerequisites: ['reverse-hang', 'spin-hang'],
    type: 'category',
    state: 'active',
    x: 825,
    y: 975,
    connections: ['cruiser-spin']
  },

  // Swing and Basics
  {
    id: 'swing',
    name: 'Swing',
    description: 'Swinging movements. Build momentum and flow.',
    prerequisites: ['static-center'],
    type: 'category',
    state: 'active',
    x: 1050,
    y: 420,
    connections: ['inside-pirouette', 'reverse-swing']
  },
  {
    id: 'basics',
    name: 'Basics',
    description: 'Fundamental movements and positions. Essential foundation.',
    prerequisites: ['static-center'],
    type: 'category',
    state: 'active',
    x: 1050,
    y: 510,
    connections: ['front-to-side', 'front-to-front', 'straddle-invert-flag']
  },

  // Top rotating branch
  {
    id: 'twisting-top',
    name: 'Twisting',
    description: 'Twisting movements from rotation. Advanced coordination.',
    prerequisites: ['rotating-top'],
    type: 'category',
    state: 'active',
    x: 975,
    y: 300,
    connections: ['kick', 'sailor']
  },
  {
    id: 'swing-top',
    name: 'Swing',
    description: 'Swinging from rotation. Momentum-based skills.',
    prerequisites: ['rotating-top'],
    type: 'key',
    state: 'active',
    x: 1125,
    y: 300,
    connections: []
  },

  // Individual skills - Left side
  {
    id: 'kick',
    name: 'Kick',
    description: 'Kick movement from twist. Dynamic power move.',
    prerequisites: ['twisting-top'],
    type: 'regular',
    state: 'inactive',
    x: 900,
    y: 120,
    connections: []
  },
  {
    id: 'sailor',
    name: 'Sailor',
    description: 'Sailor position. Classic pose with style.',
    prerequisites: ['twisting-top'],
    type: 'regular',
    state: 'inactive',
    x: 975,
    y: 120,
    connections: ['splits']
  },
  {
    id: 'splits',
    name: 'Splits',
    description: 'Split position from sailor. Flexibility required.',
    prerequisites: ['sailor'],
    type: 'regular',
    state: 'inactive',
    x: 1050,
    y: 120,
    connections: []
  },
  {
    id: 'inside-pirouette',
    name: 'Inside Pirouette',
    description: 'Inside pirouette spin. Elegant rotation technique.',
    prerequisites: ['swing'],
    type: 'regular',
    state: 'inactive',
    x: 975,
    y: 375,
    connections: []
  },
  {
    id: 'reverse-swing',
    name: 'Reverse Swing',
    description: 'Reverse direction swing. Counter-momentum skill.',
    prerequisites: ['swing'],
    type: 'regular',
    state: 'inactive',
    x: 900,
    y: 420,
    connections: []
  },

  // Basics sub-skills
  {
    id: 'front-to-side',
    name: 'Front to Side',
    description: 'Transition from front to side position. Smooth flow.',
    prerequisites: ['basics'],
    type: 'regular',
    state: 'inactive',
    x: 930,
    y: 510,
    connections: []
  },
  {
    id: 'front-to-front',
    name: 'Front to Front',
    description: 'Front position maintenance. Control and stability.',
    prerequisites: ['basics'],
    type: 'regular',
    state: 'inactive',
    x: 930,
    y: 570,
    connections: []
  },
  {
    id: 'straddle-invert-flag',
    name: 'Straddle Invert Flag',
    description: 'Straddle position into inverted flag. Advanced combo.',
    prerequisites: ['basics'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 975,
    y: 630,
    connections: []
  },

  // Normal hang sub-skills
  {
    id: 'meathook',
    name: 'Meathook',
    description: 'Meathook position. Classic strength move.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 750,
    y: 840,
    connections: []
  },
  {
    id: 'scorpion',
    name: 'Scorpion',
    description: 'Scorpion position. Back flexibility required.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 675,
    y: 900,
    connections: []
  },
  {
    id: 'dragon',
    name: 'Dragon',
    description: 'Dragon position. Dramatic and powerful pose.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 840,
    connections: []
  },

  // Split grip flag
  {
    id: 'split-grip-flag',
    name: 'Split Grip Flag',
    description: 'Flag with split grip. Technical precision required.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 825,
    y: 900,
    connections: []
  },

  // Cruiser spin
  {
    id: 'cruiser-spin',
    name: 'Cruiser Spin',
    description: 'Spinning cruiser variation. Dynamic and flowing.',
    prerequisites: ['cruiser'],
    type: 'regular',
    state: 'inactive',
    x: 750,
    y: 1050,
    connections: []
  },

  // Far left skills - Inversions section
  {
    id: 'inversion-flag',
    name: 'Inversion to Flag',
    description: 'Invert into flag position. Classic transition.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 525,
    y: 570,
    connections: ['inversion-meathook']
  },
  {
    id: 'inversion-meathook',
    name: 'Inversion to Meathook',
    description: 'Invert directly to meathook. Strength intensive.',
    prerequisites: ['inversion-flag'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 600,
    y: 570,
    connections: ['inversion']
  },
  {
    id: 'inversion',
    name: 'Inversion',
    description: 'Basic inversion technique. Foundation movement.',
    prerequisites: ['inversion-meathook'],
    type: 'regular',
    state: 'inactive',
    x: 675,
    y: 570,
    connections: ['high-switch']
  },
  {
    id: 'high-switch',
    name: 'High Switch',
    description: 'High position switch. Smooth grip transition.',
    prerequisites: ['inversion'],
    type: 'regular',
    state: 'inactive',
    x: 750,
    y: 570,
    connections: []
  },

  // Bottom left row
  {
    id: 'double-full',
    name: 'Double Full',
    description: 'Double full rotation. Advanced spinning skill.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 150,
    y: 780,
    connections: []
  },
  {
    id: 'blanks',
    name: 'Blanks',
    description: 'Blanks position. Foundation hold.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 225,
    y: 780,
    connections: []
  },
  {
    id: 'full',
    name: 'Full',
    description: 'Full rotation skill. Complete spin.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 780,
    connections: []
  },
  {
    id: 'high-switch-left',
    name: 'High Switch',
    description: 'High switch variation. Grip change at height.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 375,
    y: 780,
    connections: []
  },
  {
    id: 'barswrecker-switch',
    name: 'Barswrecker Switch',
    description: 'Barswrecker with switch. Complex combination.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 450,
    y: 780,
    connections: []
  },
  {
    id: 'low-switch',
    name: 'Low Switch',
    description: 'Low position switch. Foundation skill.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 525,
    y: 780,
    connections: []
  },
  {
    id: 'flare-to-flag',
    name: 'Flare to Flag',
    description: 'Flare transition to flag. Smooth flow movement.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 780,
    connections: []
  },
  {
    id: 'reverse-meathook',
    name: 'Reverse Meathook',
    description: 'Reverse grip meathook. Opposite direction.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 675,
    y: 780,
    connections: []
  },
  {
    id: 'barswrecker',
    name: 'Barswrecker',
    description: 'Barswrecker skill. Technical precision.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 750,
    y: 780,
    connections: []
  },
  {
    id: 'flare',
    name: 'Flare',
    description: 'Flare movement. Dynamic and flowing.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 825,
    y: 780,
    connections: []
  },

  // Second bottom row
  {
    id: 'reverse-blanks',
    name: 'Reverse Blanks',
    description: 'Reverse blanks position. Inverted foundation.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 150,
    y: 870,
    connections: []
  },
  {
    id: 'reverse-full',
    name: 'Reverse Full',
    description: 'Reverse full rotation. Opposite spin.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 225,
    y: 870,
    connections: []
  },
  {
    id: 'reverse-flag',
    name: 'Reverse Flag',
    description: 'Reverse flag position. Classic inverted hold.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 870,
    connections: []
  },
  {
    id: 'front-3-arm',
    name: 'Front 3 Arm',
    description: 'Front position with three arm contact. Stability focus.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 375,
    y: 870,
    connections: []
  },
  {
    id: 'flare-to-takeoff',
    name: 'Flare to Takeoff',
    description: 'Flare into takeoff. Dynamic transition.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 450,
    y: 870,
    connections: []
  },
  {
    id: 'split-grip-full',
    name: 'Split Grip to Full',
    description: 'Split grip transition to full. Technical combo.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 525,
    y: 870,
    connections: []
  },

  // Right side - Support branch
  {
    id: 'front-balance',
    name: 'Front Balance',
    description: 'Front balance position. Core stability required.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1800,
    y: 420,
    connections: []
  },
  {
    id: 'side-balance',
    name: 'Side Balance',
    description: 'Side balance position. Lateral control.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1875,
    y: 480,
    connections: []
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    description: 'Butterfly position. Elegant and graceful pose.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1950,
    y: 540,
    connections: ['pull-to-full']
  },
  {
    id: 'pull-to-full',
    name: 'Pull to Full',
    description: 'Pull up to full position. Strength transition.',
    prerequisites: ['butterfly'],
    type: 'regular',
    state: 'inactive',
    x: 2025,
    y: 600,
    connections: []
  },

  // Right side - sitting/twisting
  {
    id: 'sitting',
    name: 'Sitting',
    description: 'Sitting position on apparatus. Comfortable base.',
    prerequisites: ['rotating-right'],
    type: 'category',
    state: 'active',
    x: 1725,
    y: 150,
    connections: ['ball-twists']
  },
  {
    id: 'twisting-right',
    name: 'Twisting',
    description: 'Twisting from rotation. Spiral movements.',
    prerequisites: ['rotating-right'],
    type: 'category',
    state: 'active',
    x: 1875,
    y: 150,
    connections: ['pull-to-hips', 'swing-to-meathook']
  },
  {
    id: 'ball-twists',
    name: 'Ball Twists',
    description: 'Ball twisting technique. Compact rotation.',
    prerequisites: ['sitting'],
    type: 'regular',
    state: 'inactive',
    x: 1725,
    y: 75,
    connections: []
  },
  {
    id: 'pull-to-hips',
    name: 'Pull to Hips',
    description: 'Pull transition to hip position. Controlled movement.',
    prerequisites: ['twisting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1875,
    y: 75,
    connections: []
  },
  {
    id: 'swing-to-meathook',
    name: 'Swing to Meathook',
    description: 'Swing directly into meathook. Dynamic power.',
    prerequisites: ['twisting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1950,
    y: 75,
    connections: []
  },

  // Top right row
  {
    id: 'bengal-loops',
    name: 'Bengal Loops',
    description: 'Bengal loop technique. Flowing circles.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1725,
    y: 45,
    connections: []
  },
  {
    id: 'shaker',
    name: 'Shaker',
    description: 'Shaker movement. Rhythmic oscillation.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1800,
    y: 45,
    connections: []
  },
  {
    id: 'staller',
    name: 'Staller',
    description: 'Staller position. Momentary pause in flow.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1875,
    y: 45,
    connections: []
  },
  {
    id: 'giants',
    name: 'Giants',
    description: 'Giant swing movement. Full rotation power.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1950,
    y: 45,
    connections: []
  },
  {
    id: 'astro-plants',
    name: 'Astro Plants',
    description: 'Astro plant position. Unique hold.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 2025,
    y: 45,
    connections: []
  },
  {
    id: 'back-staller',
    name: 'Back Staller',
    description: 'Back staller variation. Reverse pause.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 2100,
    y: 45,
    connections: []
  },
  {
    id: 'delacrew',
    name: 'Delacrew',
    description: 'Delacrew technique. Signature style.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 2175,
    y: 45,
    connections: []
  },
  {
    id: 'tamazuki',
    name: 'Tamazuki',
    description: 'Tamazuki skill. Named technique.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 2250,
    y: 45,
    connections: []
  },

  // Second top right row
  {
    id: 'tap-plank',
    name: 'Tap Plank',
    description: 'Tap into plank position. Quick transition.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 1800,
    y: 120,
    connections: []
  },
  {
    id: 'side-pull-push',
    name: 'Side Pull Push',
    description: 'Side pulling and pushing motion. Lateral power.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1875,
    y: 120,
    connections: []
  },
  {
    id: 'ball-turn',
    name: 'Ball Turn',
    description: 'Ball position with turn. Compact rotation.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1950,
    y: 120,
    connections: []
  },
  {
    id: 'pirouette',
    name: 'Pirouette',
    description: 'Pirouette spin. Elegant rotation.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 2025,
    y: 120,
    connections: []
  },
  {
    id: 'swing-to-handstand',
    name: 'Swing to Handstand',
    description: 'Swing momentum into handstand. Power move.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 2100,
    y: 120,
    connections: []
  },

  // Center hanging sub-skills
  {
    id: 'center',
    name: 'Center',
    description: 'Center position. Core alignment.',
    prerequisites: ['hanging-right'],
    type: 'category',
    state: 'active',
    x: 1650,
    y: 825,
    connections: ['spinning-meathook']
  },
  {
    id: 'split-right',
    name: 'Split',
    description: 'Split position in hang. Flexibility display.',
    prerequisites: ['hanging-right'],
    type: 'category',
    state: 'active',
    x: 1575,
    y: 930,
    connections: ['reverse-bottom']
  },
  {
    id: 'reverse-right',
    name: 'Reverse',
    description: 'Reverse hanging position. Inverted hold.',
    prerequisites: ['hanging-right'],
    type: 'category',
    state: 'active',
    x: 1725,
    y: 930,
    connections: ['meathook-right', 'straightstar']
  },
  {
    id: 'spinning-meathook',
    name: 'Spinning Meathook',
    description: 'Meathook with spin. Dynamic power skill.',
    prerequisites: ['center'],
    type: 'regular',
    state: 'inactive',
    x: 1725,
    y: 825,
    connections: []
  },

  // Bottom branch
  {
    id: 'reverse-bottom',
    name: 'Reverse',
    description: 'Bottom reverse position. Foundation hold.',
    prerequisites: ['split-right'],
    type: 'category',
    state: 'active',
    x: 1575,
    y: 1050,
    connections: ['normal-bottom']
  },
  {
    id: 'normal-bottom',
    name: 'Normal',
    description: 'Normal bottom position. Standard base.',
    prerequisites: ['reverse-bottom'],
    type: 'category',
    state: 'active',
    x: 1650,
    y: 1140,
    connections: ['flare-bottom', 'barswrecker-bottom', 'meathook-bottom']
  },
  {
    id: 'flare-bottom',
    name: 'Flare',
    description: 'Flare from bottom. Dynamic extension.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1725,
    y: 1140,
    connections: []
  },
  {
    id: 'barswrecker-bottom',
    name: 'Barswrecker',
    description: 'Barswrecker from bottom. Technical skill.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1800,
    y: 1140,
    connections: []
  },
  {
    id: 'meathook-bottom',
    name: 'Meathook',
    description: 'Meathook from bottom. Strength display.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1875,
    y: 1140,
    connections: []
  },

  // Bottom right additional skills
  {
    id: 'meathook-right',
    name: 'Meathook',
    description: 'Right side meathook. Power position.',
    prerequisites: ['reverse-right'],
    type: 'regular',
    state: 'inactive',
    x: 1800,
    y: 930,
    connections: []
  },
  {
    id: 'straightstar',
    name: 'Straightstar',
    description: 'Straightstar position. Extended hold.',
    prerequisites: ['reverse-right'],
    type: 'regular',
    state: 'inactive',
    x: 1875,
    y: 990,
    connections: []
  },
  {
    id: 'straightstar-flag',
    name: 'Straightstar Flag',
    description: 'Straightstar into flag. Combination skill.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1950,
    y: 1050,
    connections: []
  },
  {
    id: 'flare-to-flag-right',
    name: 'Flare to Flag',
    description: 'Flare transition to flag. Smooth combo.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 2025,
    y: 1140,
    connections: []
  },
  {
    id: 'flare-to-full',
    name: 'Flare to Full',
    description: 'Flare into full rotation. Power combo.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 2100,
    y: 1140,
    connections: []
  },

  // Right arm inversion section
  {
    id: 'two-arm-inversion',
    name: '2 Arm Inversion',
    description: 'Two arm inversion technique. Foundation skill.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1800,
    y: 720,
    connections: ['inversion-meathook-right']
  },
  {
    id: 'inversion-meathook-right',
    name: 'Inversion to Meathook',
    description: 'Invert into meathook. Strength transition.',
    prerequisites: ['two-arm-inversion'],
    type: 'regular',
    state: 'inactive',
    x: 1875,
    y: 720,
    connections: ['back-flag']
  },
  {
    id: 'back-flag',
    name: 'Back Flag',
    description: 'Back flag position. Classic hold.',
    prerequisites: ['inversion-meathook-right'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 1950,
    y: 720,
    connections: []
  },

  // Roll ups section
  {
    id: 'roll-ups',
    name: 'Roll Ups',
    description: 'Roll up technique. Smooth elevation.',
    prerequisites: [],
    type: 'key',
    state: 'active',
    x: 1800,
    y: 375,
    connections: ['front-armstand']
  },
  {
    id: 'front-armstand',
    name: 'Front Armstand',
    description: 'Front arm stand position. Balance skill.',
    prerequisites: ['roll-ups'],
    type: 'regular',
    state: 'inactive',
    x: 1875,
    y: 375,
    connections: ['starliar']
  },
  {
    id: 'starliar',
    name: 'Starliar',
    description: 'Starliar position. Named skill.',
    prerequisites: ['front-armstand'],
    type: 'regular',
    state: 'inactive',
    x: 1950,
    y: 375,
    connections: []
  },

  // Additional top skills
  {
    id: 'double-twist',
    name: 'Double Twist',
    description: 'Double twisting motion. Advanced rotation.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 750,
    y: 90,
    connections: []
  },
  {
    id: 'soleil',
    name: 'Soleil',
    description: 'Soleil position. Sun-like extension.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 825,
    y: 150,
    connections: []
  },
  {
    id: 'bucket',
    name: 'Bucket',
    description: 'Bucket position. Compact hold.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 825,
    y: 225,
    connections: []
  },

  // Additional left skills
  {
    id: 'double-salta',
    name: 'Double Salta',
    description: 'Double salta technique. Named skill.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 150,
    y: 225,
    connections: []
  },
  {
    id: '1-5-arm-salta',
    name: '1.5 Arm Salta',
    description: 'One and a half arm salta. Precision skill.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 225,
    y: 225,
    connections: []
  },
  {
    id: 'swing-in-armtie',
    name: 'Swing in Armtie',
    description: 'Swing with arm tie. Bound movement.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 150,
    y: 300,
    connections: []
  },
  {
    id: 'swing-to-flag',
    name: 'Swing to Flag',
    description: 'Swing transition to flag. Momentum skill.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 225,
    y: 300,
    connections: []
  },
  {
    id: 'shoulder-pirouette',
    name: 'Shoulder Pirouette',
    description: 'Pirouette from shoulder. Rotation skill.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 300,
    connections: []
  },
  {
    id: 'soleil-2',
    name: 'Soleil',
    description: 'Soleil variation. Sun extension.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 375,
    y: 300,
    connections: []
  },
];

export const getSkillById = (id: string): Skill | undefined => {
  return skillTreeData.find(skill => skill.id === id);
};

export const getPrerequisiteSkills = (skill: Skill): Skill[] => {
  return skill.prerequisites
    .map(prereqId => getSkillById(prereqId))
    .filter((s): s is Skill => s !== undefined);
};
