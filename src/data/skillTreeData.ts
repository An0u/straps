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
  isBlue?: boolean;
  x: number;
  y: number;
  connections: string[];
}

export interface SkillTreeSection {
  id: string;
  name: string;
  skills: Skill[];
}

// Skill tree layout matching reference image
// Central horizontal axis with One Arm (left) and Two Arm (right)
// LEFT SIDE HIERARCHY:
// Level 1: One Arm
// Level 2: Swing, Static, Spin
// Level 3: Rotating, Twisting, Basics, Hanging, Normal, Reverse, Cruiser
// Level 4: Everything else to the left
export const skillTreeData: Skill[] = [
  // ============ CENTRAL SPINE ============
  {
    id: 'one-arm',
    name: 'One Arm',
    description: 'Foundation for all one-arm skills. Master single arm grip and control.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 900,
    y: 450,
    connections: ['two-arm', 'swing-left', 'static-left', 'spin-hang'] // Level 1 → Level 2
  },
  {
    id: 'two-arm',
    name: 'Two Arm',
    description: 'Foundation for all two-arm skills. Essential grip and positioning.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 1020,
    y: 450,
    connections: ['static-right', 'support', 'hanging-right', 'rotating-right']
  },

  // ============ LEFT SIDE - ONE ARM BRANCH ============
  
  // LEVEL 2: Swing, Static, Spin (direct children of One Arm)
  {
    id: 'swing-left',
    name: 'Swing',
    description: 'Swinging from rotation. Momentum-based skills.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 780,
    y: 240,
    connections: ['rotating-left', 'inside-pirouette', 'kick'] // Level 2 → Level 3
  },
  {
    id: 'static-left',
    name: 'Static',
    description: 'Static holds and positions. Focus on stability and control.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 780,
    y: 450,
    connections: ['hanging-left', 'basics'] // Level 2 → Level 3
  },
  {
    id: 'spin-hang',
    name: 'Spin',
    description: 'Spinning from hang position. Dynamic movement skills.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 720,
    y: 540,
    connections: ['cruiser'] // Level 2 → Level 3
  },

  // LEVEL 3: Rotating, Twisting, Basics, Hanging, Normal, Reverse, Cruiser
  {
    id: 'rotating-left',
    name: 'Rotating',
    description: 'Rotating movements and spins. Dynamic one-arm rotations.',
    prerequisites: ['swing-left'],
    type: 'category',
    state: 'active',
    x: 720,
    y: 150,
    connections: ['twisting-left', 'double-twist', 'soleil', 'bucket'] // Level 3 → Level 4
  },
  {
    id: 'twisting-left',
    name: 'Twisting',
    description: 'Twisting movements from rotation. Advanced coordination.',
    prerequisites: ['rotating-left'],
    type: 'category',
    state: 'active',
    x: 660,
    y: 240,
    connections: ['front-to-side', 'front-to-front', 'reverse-swing'] // Level 3 → Level 4
  },
  {
    id: 'basics',
    name: 'Basics',
    description: 'Fundamental movements and positions. Essential foundation.',
    prerequisites: ['static-left'],
    type: 'category',
    state: 'active',
    x: 720,
    y: 330,
    connections: ['straddle-invert-flag', 'high-switch'] // Level 3 → Level 4
  },
  {
    id: 'hanging-left',
    name: 'Hanging',
    description: 'Hanging positions using one arm. Build endurance and grip strength.',
    prerequisites: ['static-left'],
    type: 'category',
    state: 'active',
    x: 660,
    y: 450,
    connections: ['normal-hang', 'reverse-hang'] // Level 3 → Level 3 sub-branches
  },
  {
    id: 'normal-hang',
    name: 'Normal',
    description: 'Standard hanging position. Entry point for hang variations.',
    prerequisites: ['hanging-left'],
    type: 'category',
    state: 'active',
    x: 600,
    y: 540,
    connections: ['meathook', 'scorpion', 'dragon', 'flare', 'barswrecker', 'reverse-meathook'] // Level 3 → Level 4
  },
  {
    id: 'reverse-hang',
    name: 'Reverse',
    description: 'Inverted hanging position. Builds core and grip.',
    prerequisites: ['hanging-left'],
    type: 'category',
    state: 'active',
    x: 660,
    y: 630,
    connections: ['split-grip-flag', 'cruiser', 'flare-to-lockoff', 'split-grip-full'] // Level 3 → Level 4
  },
  {
    id: 'cruiser',
    name: 'Cruiser',
    description: 'Advanced cruiser position. Signature skill for flow.',
    prerequisites: ['spin-hang', 'reverse-hang'],
    type: 'category',
    state: 'active',
    x: 660,
    y: 720,
    connections: ['cruiser-spin', 'scorpion', 'dragon'] // Level 3 → Level 4
  },

  // LEVEL 4: All other skills (connect from Level 3)
  
  // Top rows - connected from Rotating
  {
    id: 'double-twist',
    name: 'Double Twist',
    description: 'Double twisting motion. Advanced rotation.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 540,
    y: 60,
    connections: ['double-salta', 'sailor']
  },
  {
    id: 'soleil',
    name: 'Soleil',
    description: 'Soleil position. Sun-like extension.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 60,
    connections: ['splits']
  },
  {
    id: 'bucket',
    name: 'Bucket',
    description: 'Bucket position. Compact hold.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 660,
    y: 60,
    connections: []
  },
  {
    id: 'kick',
    name: 'Kick',
    description: 'Kick movement. Dynamic power move.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 780,
    y: 150,
    connections: []
  },

  // Second row from top - connected from double-twist
  {
    id: 'double-salta',
    name: 'Double Salta',
    description: 'Double salta technique.',
    prerequisites: ['double-twist'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 120,
    connections: ['swing-in-armtie']
  },
  {
    id: '1-5-arm-salta',
    name: '1.5 Arm Salta',
    description: 'One and a half arm salta.',
    prerequisites: ['double-salta'],
    type: 'regular',
    state: 'inactive',
    x: 360,
    y: 120,
    connections: ['swing-to-flag']
  },
  {
    id: 'sailor',
    name: 'Sailor',
    description: 'Sailor position.',
    prerequisites: ['double-twist'],
    type: 'regular',
    state: 'inactive',
    x: 540,
    y: 120,
    connections: ['soleil-2']
  },
  {
    id: 'splits',
    name: 'Splits',
    description: 'Split position.',
    prerequisites: ['soleil'],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 120,
    connections: ['reverse-swing'],
    isBlue: true
  },

  // Third row - connected from row above
  {
    id: 'swing-in-armtie',
    name: 'Swing in Armtie',
    description: 'Swing with arm tie.',
    prerequisites: ['double-salta'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 180,
    connections: []
  },
  {
    id: 'swing-to-flag',
    name: 'Swing to Flag',
    description: 'Swing transition to flag.',
    prerequisites: ['1-5-arm-salta'],
    type: 'regular',
    state: 'inactive',
    x: 360,
    y: 180,
    connections: ['shoulder-pirouette']
  },
  {
    id: 'shoulder-pirouette',
    name: 'Shoulder Pirouette',
    description: 'Pirouette from shoulder.',
    prerequisites: ['swing-to-flag'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 180,
    connections: []
  },
  {
    id: 'soleil-2',
    name: 'Soleil',
    description: 'Soleil variation.',
    prerequisites: ['sailor'],
    type: 'regular',
    state: 'inactive',
    x: 480,
    y: 180,
    connections: []
  },
  {
    id: 'reverse-swing',
    name: 'Reverse Swing',
    description: 'Reverse direction swing.',
    prerequisites: ['twisting-left'],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 180,
    connections: []
  },
  {
    id: 'inside-pirouette',
    name: 'Inside Pirouette',
    description: 'Inside pirouette spin.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 720,
    y: 180,
    connections: []
  },

  // Fourth row (below twisting)
  {
    id: 'front-to-side',
    name: 'Front to Side',
    description: 'Transition from front to side.',
    prerequisites: ['twisting-left'],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 300,
    connections: []
  },
  {
    id: 'front-to-front',
    name: 'Front to Front',
    description: 'Front position maintenance.',
    prerequisites: ['twisting-left'],
    type: 'regular',
    state: 'inactive',
    x: 660,
    y: 300,
    connections: []
  },

  // Inversion row (left side) - connected from Normal hang chain
  {
    id: 'inversion-flag',
    name: 'Inversion to Flag',
    description: 'Invert into flag position.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 420,
    connections: ['inversion-meathook']
  },
  {
    id: 'inversion-meathook',
    name: 'Inversion to Meathook',
    description: 'Invert directly to meathook.',
    prerequisites: ['inversion-flag'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 360,
    y: 420,
    connections: ['inversion']
  },
  {
    id: 'inversion',
    name: 'Inversion',
    description: 'Basic inversion technique.',
    prerequisites: ['inversion-meathook'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 420,
    connections: ['high-switch']
  },
  {
    id: 'high-switch',
    name: 'High Switch',
    description: 'High position switch.',
    prerequisites: ['inversion', 'basics'],
    type: 'regular',
    state: 'inactive',
    x: 480,
    y: 420,
    connections: ['straddle-invert-flag']
  },
  {
    id: 'straddle-invert-flag',
    name: 'Straddle Invert Flag',
    description: 'Straddle into inverted flag.',
    prerequisites: ['basics'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 540,
    y: 420,
    connections: []
  },

  // Bottom left rows - connected from Normal hang
  {
    id: 'double-full',
    name: 'Double Full',
    description: 'Double full rotation.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 540,
    connections: ['reverse-blanks']
  },
  {
    id: 'blanks',
    name: 'Blanks',
    description: 'Blanks position.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 120,
    y: 540,
    connections: ['reverse-full']
  },
  {
    id: 'full',
    name: 'Full',
    description: 'Full rotation skill.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 180,
    y: 540,
    connections: ['reverse-flag']
  },
  {
    id: 'high-switch-left',
    name: 'High Switch',
    description: 'High switch variation.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 240,
    y: 540,
    connections: ['front-3-arm']
  },
  {
    id: 'barswrecker-switch',
    name: 'Barswrecker Switch',
    description: 'Barswrecker with switch.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 540,
    connections: ['flare-to-lockoff']
  },
  {
    id: 'low-switch',
    name: 'Low Switch',
    description: 'Low position switch.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 360,
    y: 540,
    connections: ['split-grip-full']
  },
  {
    id: 'flare-to-flag',
    name: 'Flare to Flag',
    description: 'Flare transition to flag.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 540,
    connections: ['split-grip-flag']
  },
  {
    id: 'reverse-meathook',
    name: 'Reverse Meathook',
    description: 'Reverse grip meathook.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 480,
    y: 540,
    connections: []
  },
  {
    id: 'barswrecker',
    name: 'Barswrecker',
    description: 'Barswrecker skill.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 540,
    y: 540,
    connections: []
  },
  {
    id: 'flare',
    name: 'Flare',
    description: 'Flare movement.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 540,
    connections: ['meathook']
  },

  // Second bottom row - connected from row above
  {
    id: 'reverse-blanks',
    name: 'Reverse Blanks',
    description: 'Reverse blanks position.',
    prerequisites: ['double-full'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 600,
    connections: []
  },
  {
    id: 'reverse-full',
    name: 'Reverse Full',
    description: 'Reverse full rotation.',
    prerequisites: ['blanks'],
    type: 'regular',
    state: 'inactive',
    x: 120,
    y: 600,
    connections: []
  },
  {
    id: 'reverse-flag',
    name: 'Reverse Flag',
    description: 'Reverse flag position.',
    prerequisites: ['full'],
    type: 'regular',
    state: 'inactive',
    x: 180,
    y: 600,
    connections: []
  },
  {
    id: 'front-3-arm',
    name: 'Front 3 Arm',
    description: 'Front position with three arm contact.',
    prerequisites: ['high-switch-left'],
    type: 'regular',
    state: 'inactive',
    x: 240,
    y: 600,
    connections: []
  },
  {
    id: 'flare-to-lockoff',
    name: 'Flare to Lockoff',
    description: 'Flare into lockoff.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 300,
    y: 600,
    connections: []
  },
  {
    id: 'split-grip-full',
    name: 'Split Grip to Full',
    description: 'Split grip transition to full.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 360,
    y: 600,
    connections: []
  },

  // Meathook row
  {
    id: 'meathook',
    name: 'Meathook',
    description: 'Meathook position.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 660,
    y: 540,
    connections: []
  },

  // Bottom skills
  {
    id: 'scorpion',
    name: 'Scorpion',
    description: 'Scorpion position.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 480,
    y: 720,
    connections: []
  },
  {
    id: 'dragon',
    name: 'Dragon',
    description: 'Dragon position.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 540,
    y: 720,
    connections: []
  },
  {
    id: 'split-grip-flag',
    name: 'Split Grip Flag',
    description: 'Flag with split grip.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 420,
    y: 660,
    connections: []
  },
  {
    id: 'cruiser-spin',
    name: 'Cruiser Spin',
    description: 'Spinning cruiser variation.',
    prerequisites: ['cruiser'],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 720,
    connections: []
  },

  // ============ RIGHT SIDE - TWO ARM BRANCH ============

  // Static right
  {
    id: 'static-right',
    name: 'Static',
    description: 'Two-arm static positions.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 450,
    connections: ['hanging-right']
  },

  // Rotating right (upper)
  {
    id: 'rotating-right',
    name: 'Rotating',
    description: 'Two-arm rotational movements.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 150,
    connections: ['sitting-right', 'twisting-right']
  },
  {
    id: 'sitting-right',
    name: 'Sitting',
    description: 'Sitting position on apparatus.',
    prerequisites: ['rotating-right'],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 210,
    connections: ['ball-twists']
  },
  {
    id: 'twisting-right',
    name: 'Twisting',
    description: 'Twisting from rotation.',
    prerequisites: ['rotating-right'],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 270,
    connections: ['pull-to-hips', 'swing-to-meathook']
  },

  // Support branch
  {
    id: 'support',
    name: 'Support',
    description: 'Support positions and transitions.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 360,
    connections: ['front-balance', 'side-balance', 'butterfly']
  },

  // Hanging right branch
  {
    id: 'hanging-right',
    name: 'Hanging',
    description: 'Two-arm hanging techniques.',
    prerequisites: ['static-right'],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 540,
    connections: ['center', 'two-arm-inversion']
  },

  // Center/Split/Reverse cascade
  {
    id: 'center',
    name: 'Center',
    description: 'Center position.',
    prerequisites: ['hanging-right'],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 630,
    connections: ['spinning-meathook', 'split-right']
  },
  {
    id: 'split-right',
    name: 'Split',
    description: 'Split position in hang.',
    prerequisites: ['center'],
    type: 'category',
    state: 'active',
    x: 1080,
    y: 720,
    connections: ['reverse-right']
  },
  {
    id: 'reverse-right',
    name: 'Reverse',
    description: 'Reverse hanging position.',
    prerequisites: ['split-right'],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 720,
    connections: ['meathook-right', 'straightstar']
  },
  {
    id: 'normal-bottom',
    name: 'Normal',
    description: 'Normal bottom position.',
    prerequisites: ['reverse-right'],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 810,
    connections: ['flare-bottom', 'barswrecker-bottom', 'meathook-bottom', 'straightstar-flag', 'flare-to-flag-right', 'flare-to-full']
  },

  // Top right rows
  {
    id: 'bengal-loops',
    name: 'Bengal Loops',
    description: 'Bengal loop technique.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1140,
    y: 60,
    connections: []
  },
  {
    id: 'shaker',
    name: 'Shaker',
    description: 'Shaker movement.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1200,
    y: 60,
    connections: []
  },
  {
    id: 'staller',
    name: 'Staller',
    description: 'Staller position.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1260,
    y: 60,
    connections: []
  },
  {
    id: 'giants',
    name: 'Giants',
    description: 'Giant swing movement.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1380,
    y: 60,
    connections: []
  },
  {
    id: 'astro-plants',
    name: 'Astro Plants',
    description: 'Astro plant position.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 60,
    connections: []
  },
  {
    id: 'back-staller',
    name: 'Back Staller',
    description: 'Back staller variation.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1500,
    y: 60,
    connections: []
  },
  {
    id: 'delacrew',
    name: 'Delacrew',
    description: 'Delacrew technique.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1560,
    y: 60,
    connections: []
  },
  {
    id: 'tamazuki',
    name: 'Tamazuki',
    description: 'Tamazuki skill.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1620,
    y: 60,
    connections: []
  },

  // Second right row
  {
    id: 'ball-twists',
    name: 'Ball Twists',
    description: 'Ball twisting technique.',
    prerequisites: ['sitting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1140,
    y: 150,
    connections: []
  },
  {
    id: 'tap-plank',
    name: 'Tap Plank',
    description: 'Tap into plank position.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 1260,
    y: 150,
    connections: []
  },
  {
    id: 'side-pull-push',
    name: 'Side Pull Push',
    description: 'Side pulling and pushing.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 120,
    connections: []
  },
  {
    id: 'ball-turn',
    name: 'Ball Turn',
    description: 'Ball position with turn.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1380,
    y: 120,
    connections: []
  },
  {
    id: 'pirouette',
    name: 'Pirouette',
    description: 'Pirouette spin.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 120,
    connections: []
  },
  {
    id: 'swing-to-handstand',
    name: 'Swing to Handstand',
    description: 'Swing into handstand.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1500,
    y: 120,
    connections: []
  },

  // Third right row
  {
    id: 'pull-to-hips',
    name: 'Pull to Hips',
    description: 'Pull to hip position.',
    prerequisites: ['twisting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1200,
    y: 210,
    connections: []
  },
  {
    id: 'swing-to-meathook',
    name: 'Swing to Meathook',
    description: 'Swing into meathook.',
    prerequisites: ['twisting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1260,
    y: 210,
    connections: []
  },
  {
    id: 'swing-to-full',
    name: 'Swing to Full',
    description: 'Swing to full rotation.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 210,
    connections: []
  },

  // Support sub-skills
  {
    id: 'roll-ups',
    name: 'Roll Ups',
    description: 'Roll up technique.',
    prerequisites: [],
    type: 'key',
    state: 'active',
    x: 1260,
    y: 330,
    connections: ['front-armstand']
  },
  {
    id: 'front-armstand',
    name: 'Front Armstand',
    description: 'Front arm stand.',
    prerequisites: ['roll-ups'],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 330,
    connections: ['starliar']
  },
  {
    id: 'starliar',
    name: 'Starliar',
    description: 'Starliar position.',
    prerequisites: ['front-armstand'],
    type: 'regular',
    state: 'inactive',
    x: 1380,
    y: 330,
    connections: []
  },

  {
    id: 'front-balance',
    name: 'Front Balance',
    description: 'Front balance position.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1260,
    y: 390,
    connections: []
  },
  {
    id: 'side-balance',
    name: 'Side Balance',
    description: 'Side balance position.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 390,
    connections: []
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    description: 'Butterfly position.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1380,
    y: 390,
    connections: ['pull-to-full']
  },
  {
    id: 'pull-to-full',
    name: 'Pull to Full',
    description: 'Pull to full position.',
    prerequisites: ['butterfly'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 390,
    connections: []
  },

  // Two arm inversion row
  {
    id: 'two-arm-inversion',
    name: '2 Arm Inversion',
    description: 'Two arm inversion.',
    prerequisites: ['hanging-right'],
    type: 'regular',
    state: 'inactive',
    x: 1260,
    y: 540,
    connections: ['inversion-meathook-right']
  },
  {
    id: 'inversion-meathook-right',
    name: 'Inversion to Meathook',
    description: 'Invert into meathook.',
    prerequisites: ['two-arm-inversion'],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 540,
    connections: ['back-flag']
  },
  {
    id: 'back-flag',
    name: 'Back Flag',
    description: 'Back flag position.',
    prerequisites: ['inversion-meathook-right'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 1380,
    y: 540,
    connections: []
  },

  // Center sub-skills
  {
    id: 'spinning-meathook',
    name: 'Spinning Meathook',
    description: 'Meathook with spin.',
    prerequisites: ['center'],
    type: 'regular',
    state: 'inactive',
    x: 1200,
    y: 630,
    connections: []
  },

  // Reverse right sub-skills
  {
    id: 'meathook-right',
    name: 'Meathook',
    description: 'Right side meathook.',
    prerequisites: ['reverse-right'],
    type: 'regular',
    state: 'inactive',
    x: 1200,
    y: 720,
    connections: []
  },
  {
    id: 'straightstar',
    name: 'Straightstar',
    description: 'Straightstar position.',
    prerequisites: ['reverse-right'],
    type: 'regular',
    state: 'inactive',
    x: 1260,
    y: 720,
    connections: []
  },

  // Bottom right skills
  {
    id: 'flare-bottom',
    name: 'Flare',
    description: 'Flare from bottom.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1200,
    y: 810,
    connections: []
  },
  {
    id: 'barswrecker-bottom',
    name: 'Barswrecker',
    description: 'Barswrecker from bottom.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1260,
    y: 810,
    connections: []
  },
  {
    id: 'meathook-bottom',
    name: 'Meathook',
    description: 'Meathook from bottom.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 810,
    connections: []
  },
  {
    id: 'straightstar-flag',
    name: 'Straightstar Flag',
    description: 'Straightstar into flag.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1380,
    y: 810,
    connections: []
  },
  {
    id: 'flare-to-flag-right',
    name: 'Flare to Flag',
    description: 'Flare to flag.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 810,
    connections: []
  },
  {
    id: 'flare-to-full',
    name: 'Flare to Full',
    description: 'Flare into full.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1500,
    y: 810,
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
