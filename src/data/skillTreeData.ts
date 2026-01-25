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
    connections: ['rotating-left'] // Level 2 → Level 3 only
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
    connections: ['twisting-left', 'bucket'] // Only horizontally adjacent Level 4
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
    connections: ['reverse-swing'] // Only horizontally adjacent Level 4
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
    connections: ['front-to-front'] // Only horizontally adjacent Level 4
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
    connections: ['normal-hang', 'reverse-hang', 'straddle-invert-flag'] // Level 3 connections + adjacent Level 4
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
    connections: ['meathook'] // Only horizontally adjacent Level 4
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
    connections: ['cruiser', 'split-grip-flag'] // Level 3 + horizontally adjacent Level 4
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
    connections: ['cruiser-spin'] // Only horizontally adjacent Level 4
  },

  // LEVEL 4: All other skills - HORIZONTAL connections only
  
  // Row y=60 (top row) - horizontal chain
  {
    id: 'double-twist',
    name: 'Double Twist',
    description: 'Double twisting motion. Advanced rotation.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 540,
    y: 60,
    connections: ['soleil'] // horizontal only
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
    connections: ['bucket'] // horizontal only
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
    connections: [] // end of row
  },
  
  // Row y=120 - horizontal chain
  {
    id: 'double-salta',
    name: 'Double Salta',
    description: 'Double salta technique.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 120,
    connections: ['1-5-arm-salta'] // horizontal only
  },
  {
    id: '1-5-arm-salta',
    name: '1.5 Arm Salta',
    description: 'One and a half arm salta.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 360,
    y: 120,
    connections: ['sailor'] // horizontal only
  },
  {
    id: 'sailor',
    name: 'Sailor',
    description: 'Sailor position.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 540,
    y: 120,
    connections: ['splits'] // horizontal only
  },
  {
    id: 'splits',
    name: 'Splits',
    description: 'Split position.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 120,
    connections: [], // end of row
    isBlue: true
  },

  // Row y=180 - horizontal chain with Swing and Twisting as parents
  {
    id: 'swing-in-armtie',
    name: 'Swing in Armtie',
    description: 'Swing with arm tie.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 180,
    connections: ['swing-to-flag'] // horizontal only
  },
  {
    id: 'swing-to-flag',
    name: 'Swing to Flag',
    description: 'Swing transition to flag.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 360,
    y: 180,
    connections: ['shoulder-pirouette'] // horizontal only
  },
  {
    id: 'shoulder-pirouette',
    name: 'Shoulder Pirouette',
    description: 'Pirouette from shoulder.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 180,
    connections: ['soleil-2'] // horizontal only
  },
  {
    id: 'soleil-2',
    name: 'Soleil',
    description: 'Soleil variation.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 480,
    y: 180,
    connections: ['reverse-swing'] // horizontal only
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
    connections: ['inside-pirouette'] // horizontal to parent-adjacent
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
    connections: ['kick'] // horizontal only
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
    connections: [] // end, adjacent to Swing parent
  },

  // Row y=300 - horizontal chain below Twisting/Basics
  {
    id: 'front-to-side',
    name: 'Front to Side',
    description: 'Transition from front to side.',
    prerequisites: ['twisting-left'],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 300,
    connections: ['front-to-front'] // horizontal only
  },
  {
    id: 'front-to-front',
    name: 'Front to Front',
    description: 'Front position maintenance.',
    prerequisites: ['basics'],
    type: 'regular',
    state: 'inactive',
    x: 660,
    y: 300,
    connections: [] // connects to Basics parent
  },

  // Row y=420 - horizontal chain (Hanging is adjacent parent)
  {
    id: 'inversion-flag',
    name: 'Inversion to Flag',
    description: 'Invert into flag position.',
    prerequisites: ['hanging-left'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 420,
    connections: ['inversion-meathook'] // horizontal only
  },
  {
    id: 'inversion-meathook',
    name: 'Inversion to Meathook',
    description: 'Invert directly to meathook.',
    prerequisites: ['hanging-left'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 360,
    y: 420,
    connections: ['inversion'] // horizontal only
  },
  {
    id: 'inversion',
    name: 'Inversion',
    description: 'Basic inversion technique.',
    prerequisites: ['hanging-left'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 420,
    connections: ['high-switch'] // horizontal only
  },
  {
    id: 'high-switch',
    name: 'High Switch',
    description: 'High position switch.',
    prerequisites: ['hanging-left'],
    type: 'regular',
    state: 'inactive',
    x: 480,
    y: 420,
    connections: ['straddle-invert-flag'] // horizontal only
  },
  {
    id: 'straddle-invert-flag',
    name: 'Straddle Invert Flag',
    description: 'Straddle into inverted flag.',
    prerequisites: ['hanging-left'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 540,
    y: 420,
    connections: [] // end of row, adjacent to Hanging
  },

  // Row y=540 - horizontal chain (Normal is adjacent parent at x=600)
  {
    id: 'double-full',
    name: 'Double Full',
    description: 'Double full rotation.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 540,
    connections: ['blanks'] // horizontal only
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
    connections: ['full'] // horizontal only
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
    connections: ['high-switch-left'] // horizontal only
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
    connections: ['barswrecker-switch'] // horizontal only
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
    connections: ['low-switch'] // horizontal only
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
    connections: ['flare-to-flag'] // horizontal only
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
    connections: ['reverse-meathook'] // horizontal only
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
    connections: ['barswrecker'] // horizontal only
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
    connections: ['flare'] // horizontal only
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
    connections: ['meathook'] // horizontal to parent-adjacent
  },

  // Row y=600 - horizontal chain (Reverse is adjacent parent at x=660)
  {
    id: 'reverse-blanks',
    name: 'Reverse Blanks',
    description: 'Reverse blanks position.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 600,
    connections: ['reverse-full'] // horizontal only
  },
  {
    id: 'reverse-full',
    name: 'Reverse Full',
    description: 'Reverse full rotation.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    x: 120,
    y: 600,
    connections: ['reverse-flag'] // horizontal only
  },
  {
    id: 'reverse-flag',
    name: 'Reverse Flag',
    description: 'Reverse flag position.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    x: 180,
    y: 600,
    connections: ['front-3-arm'] // horizontal only
  },
  {
    id: 'front-3-arm',
    name: 'Front 3 Arm',
    description: 'Front position with three arm contact.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    x: 240,
    y: 600,
    connections: ['flare-to-lockoff'] // horizontal only
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
    connections: ['split-grip-full'] // horizontal only
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
    connections: ['split-grip-flag'] // horizontal only
  },

  // Row y=660 - single node adjacent to Reverse
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
    connections: [] // end, adjacent to Reverse
  },

  // Row y=540 continued - Meathook (adjacent to Normal)
  {
    id: 'meathook',
    name: 'Meathook',
    description: 'Meathook position.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 660,
    y: 540,
    connections: [] // end, adjacent to Normal/Spin
  },

  // Row y=720 - horizontal chain (Cruiser is adjacent parent at x=660)
  {
    id: 'scorpion',
    name: 'Scorpion',
    description: 'Scorpion position.',
    prerequisites: ['cruiser'],
    type: 'regular',
    state: 'inactive',
    x: 480,
    y: 720,
    connections: ['dragon'] // horizontal only
  },
  {
    id: 'dragon',
    name: 'Dragon',
    description: 'Dragon position.',
    prerequisites: ['cruiser'],
    type: 'regular',
    state: 'inactive',
    x: 540,
    y: 720,
    connections: ['cruiser-spin'] // horizontal only
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
    connections: [] // end, adjacent to Cruiser
  },

  // ============ RIGHT SIDE - TWO ARM BRANCH ============
  // RIGHT SIDE HIERARCHY:
  // Level 1: Two Arm
  // Level 2: Static, Rotating, Support
  // Level 3: Sitting, Twisting, Hanging, Center, Split, Reverse, Normal
  // Level 4: Everything else (horizontal chains only)

  // LEVEL 2: Static, Rotating, Support (direct children of Two Arm)
  {
    id: 'static-right',
    name: 'Static',
    description: 'Two-arm static positions.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 450,
    connections: ['hanging-right'] // Level 2 → Level 3
  },
  {
    id: 'rotating-right',
    name: 'Rotating',
    description: 'Two-arm rotational movements.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 150,
    connections: ['sitting-right', 'twisting-right'] // Level 2 → Level 3
  },
  {
    id: 'support',
    name: 'Support',
    description: 'Support positions and transitions.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 360,
    connections: ['roll-ups'] // Level 2 → adjacent Level 4
  },

  // LEVEL 3: Sitting, Twisting, Hanging, Center, Split, Reverse, Normal
  {
    id: 'sitting-right',
    name: 'Sitting',
    description: 'Sitting position on apparatus.',
    prerequisites: ['rotating-right'],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 210,
    connections: ['ball-twists'] // Level 3 → adjacent Level 4
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
    connections: ['pull-to-hips'] // Level 3 → adjacent Level 4
  },
  {
    id: 'hanging-right',
    name: 'Hanging',
    description: 'Two-arm hanging techniques.',
    prerequisites: ['static-right'],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 540,
    connections: ['center', 'two-arm-inversion'] // Level 3 + adjacent Level 4
  },
  {
    id: 'center',
    name: 'Center',
    description: 'Center position.',
    prerequisites: ['hanging-right'],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 630,
    connections: ['spinning-meathook', 'split-right'] // Level 3 + adjacent Level 4
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
    connections: ['reverse-right'] // Level 3 → Level 3
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
    connections: ['normal-bottom', 'meathook-right'] // Level 3 + adjacent Level 4
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
    connections: ['flare-bottom'] // Level 3 → adjacent Level 4
  },

  // LEVEL 4: All other skills - HORIZONTAL connections only

  // Row y=60 - horizontal chain (Rotating is parent)
  {
    id: 'bengal-loops',
    name: 'Bengal Loops',
    description: 'Bengal loop technique.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1140,
    y: 60,
    connections: ['shaker'] // horizontal only
  },
  {
    id: 'shaker',
    name: 'Shaker',
    description: 'Shaker movement.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1200,
    y: 60,
    connections: ['staller'] // horizontal only
  },
  {
    id: 'staller',
    name: 'Staller',
    description: 'Staller position.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1260,
    y: 60,
    connections: ['giants'] // horizontal only
  },
  {
    id: 'giants',
    name: 'Giants',
    description: 'Giant swing movement.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1380,
    y: 60,
    connections: ['astro-plants'] // horizontal only
  },
  {
    id: 'astro-plants',
    name: 'Astro Plants',
    description: 'Astro plant position.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 60,
    connections: ['back-staller'] // horizontal only
  },
  {
    id: 'back-staller',
    name: 'Back Staller',
    description: 'Back staller variation.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1500,
    y: 60,
    connections: ['delacrew'] // horizontal only
  },
  {
    id: 'delacrew',
    name: 'Delacrew',
    description: 'Delacrew technique.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1560,
    y: 60,
    connections: ['tamazuki'] // horizontal only
  },
  {
    id: 'tamazuki',
    name: 'Tamazuki',
    description: 'Tamazuki skill.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1620,
    y: 60,
    connections: [] // end of row
  },

  // Row y=120 - horizontal chain
  {
    id: 'side-pull-push',
    name: 'Side Pull Push',
    description: 'Side pulling and pushing.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 120,
    connections: ['ball-turn'] // horizontal only
  },
  {
    id: 'ball-turn',
    name: 'Ball Turn',
    description: 'Ball position with turn.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1380,
    y: 120,
    connections: ['pirouette'] // horizontal only
  },
  {
    id: 'pirouette',
    name: 'Pirouette',
    description: 'Pirouette spin.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 120,
    connections: ['swing-to-handstand'] // horizontal only
  },
  {
    id: 'swing-to-handstand',
    name: 'Swing to Handstand',
    description: 'Swing into handstand.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1500,
    y: 120,
    connections: [] // end of row
  },

  // Row y=150 - Ball Twists and Tap Plank (Sitting is parent)
  {
    id: 'ball-twists',
    name: 'Ball Twists',
    description: 'Ball twisting technique.',
    prerequisites: ['sitting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1140,
    y: 150,
    connections: ['tap-plank'] // horizontal only
  },
  {
    id: 'tap-plank',
    name: 'Tap Plank',
    description: 'Tap into plank position.',
    prerequisites: ['sitting-right'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 1260,
    y: 150,
    connections: [] // end of row
  },

  // Row y=210 - horizontal chain (Twisting is parent)
  {
    id: 'pull-to-hips',
    name: 'Pull to Hips',
    description: 'Pull to hip position.',
    prerequisites: ['twisting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1200,
    y: 210,
    connections: ['swing-to-meathook'] // horizontal only
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
    connections: ['swing-to-full'] // horizontal only
  },
  {
    id: 'swing-to-full',
    name: 'Swing to Full',
    description: 'Swing to full rotation.',
    prerequisites: ['twisting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 210,
    connections: [] // end of row
  },

  // Row y=330 - horizontal chain (Support is parent)
  {
    id: 'roll-ups',
    name: 'Roll Ups',
    description: 'Roll up technique.',
    prerequisites: ['support'],
    type: 'key',
    state: 'active',
    x: 1260,
    y: 330,
    connections: ['front-armstand'] // horizontal only
  },
  {
    id: 'front-armstand',
    name: 'Front Armstand',
    description: 'Front arm stand.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 330,
    connections: ['starliar'] // horizontal only
  },
  {
    id: 'starliar',
    name: 'Starliar',
    description: 'Starliar position.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1380,
    y: 330,
    connections: [] // end of row
  },

  // Row y=390 - horizontal chain (Support is parent)
  {
    id: 'front-balance',
    name: 'Front Balance',
    description: 'Front balance position.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1260,
    y: 390,
    connections: ['side-balance'] // horizontal only
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
    connections: ['butterfly'] // horizontal only
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
    connections: ['pull-to-full'] // horizontal only
  },
  {
    id: 'pull-to-full',
    name: 'Pull to Full',
    description: 'Pull to full position.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 390,
    connections: [] // end of row
  },

  // Row y=540 - horizontal chain (Hanging is parent)
  {
    id: 'two-arm-inversion',
    name: '2 Arm Inversion',
    description: 'Two arm inversion.',
    prerequisites: ['hanging-right'],
    type: 'regular',
    state: 'inactive',
    x: 1260,
    y: 540,
    connections: ['inversion-meathook-right'] // horizontal only
  },
  {
    id: 'inversion-meathook-right',
    name: 'Inversion to Meathook',
    description: 'Invert into meathook.',
    prerequisites: ['hanging-right'],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 540,
    connections: ['back-flag'] // horizontal only
  },
  {
    id: 'back-flag',
    name: 'Back Flag',
    description: 'Back flag position.',
    prerequisites: ['hanging-right'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 1380,
    y: 540,
    connections: [] // end of row
  },

  // Row y=630 - Spinning Meathook (Center is parent)
  {
    id: 'spinning-meathook',
    name: 'Spinning Meathook',
    description: 'Meathook with spin.',
    prerequisites: ['center'],
    type: 'regular',
    state: 'inactive',
    x: 1200,
    y: 630,
    connections: [] // adjacent to Center
  },

  // Row y=720 - horizontal chain (Reverse is parent)
  {
    id: 'meathook-right',
    name: 'Meathook',
    description: 'Right side meathook.',
    prerequisites: ['reverse-right'],
    type: 'regular',
    state: 'inactive',
    x: 1200,
    y: 720,
    connections: ['straightstar'] // horizontal only
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
    connections: [] // end of row
  },

  // Row y=810 - horizontal chain (Normal is parent)
  {
    id: 'flare-bottom',
    name: 'Flare',
    description: 'Flare from bottom.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1200,
    y: 810,
    connections: ['barswrecker-bottom'] // horizontal only
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
    connections: ['meathook-bottom'] // horizontal only
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
    connections: ['straightstar-flag'] // horizontal only
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
    connections: ['flare-to-flag-right'] // horizontal only
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
    connections: ['flare-to-full'] // horizontal only
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
    connections: [] // end of row
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
