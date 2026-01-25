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
// All connections cleared - use edit mode to create connections
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
    connections: []
  },
  {
    id: 'two-arm',
    name: 'Two Arm',
    description: 'Foundation for all two-arm skills. Essential grip and positioning.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1020,
    y: 450,
    connections: []
  },

  // ============ LEFT SIDE - ONE ARM BRANCH ============
  
  // LEVEL 2: Swing, Static, Spin
  {
    id: 'swing-left',
    name: 'Swing',
    description: 'Swinging from rotation. Momentum-based skills.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 780,
    y: 240,
    connections: []
  },
  {
    id: 'static-left',
    name: 'Static',
    description: 'Static holds and positions. Focus on stability and control.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 780,
    y: 450,
    connections: []
  },
  {
    id: 'spin-hang',
    name: 'Spin',
    description: 'Spinning from hang position. Dynamic movement skills.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 720,
    y: 540,
    connections: []
  },

  // LEVEL 3
  {
    id: 'rotating-left',
    name: 'Rotating',
    description: 'Rotating movements and spins. Dynamic one-arm rotations.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 720,
    y: 150,
    connections: []
  },
  {
    id: 'twisting-left',
    name: 'Twisting',
    description: 'Twisting movements from rotation. Advanced coordination.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 660,
    y: 240,
    connections: []
  },
  {
    id: 'basics',
    name: 'Basics',
    description: 'Fundamental movements and positions. Essential foundation.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 720,
    y: 330,
    connections: []
  },
  {
    id: 'hanging-left',
    name: 'Hanging',
    description: 'Hanging positions using one arm. Build endurance and grip strength.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 660,
    y: 450,
    connections: []
  },
  {
    id: 'normal-hang',
    name: 'Normal',
    description: 'Standard hanging position. Entry point for hang variations.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 600,
    y: 540,
    connections: []
  },
  {
    id: 'reverse-hang',
    name: 'Reverse',
    description: 'Inverted hanging position. Builds core and grip.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 660,
    y: 630,
    connections: []
  },
  {
    id: 'cruiser',
    name: 'Cruiser',
    description: 'Advanced cruiser position. Signature skill for flow.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 660,
    y: 720,
    connections: []
  },

  // LEVEL 4 - Row y=60
  {
    id: 'double-twist',
    name: 'Double Twist',
    description: 'Double twisting motion. Advanced rotation.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 540,
    y: 60,
    connections: []
  },
  {
    id: 'soleil',
    name: 'Soleil',
    description: 'Soleil position. Sun-like extension.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 60,
    connections: []
  },
  {
    id: 'bucket',
    name: 'Bucket',
    description: 'Bucket position. Compact hold.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 660,
    y: 60,
    connections: []
  },
  
  // Row y=120
  {
    id: 'double-salta',
    name: 'Double Salta',
    description: 'Double salta technique.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 120,
    connections: []
  },
  {
    id: '1-5-arm-salta',
    name: '1.5 Arm Salta',
    description: 'One and a half arm salta.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 360,
    y: 120,
    connections: []
  },
  {
    id: 'sailor',
    name: 'Sailor',
    description: 'Sailor position.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 540,
    y: 120,
    connections: []
  },
  {
    id: 'splits',
    name: 'Splits',
    description: 'Split position.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 120,
    connections: [],
    isBlue: true
  },

  // Row y=180
  {
    id: 'swing-in-armtie',
    name: 'Swing in Armtie',
    description: 'Swing with arm tie.',
    prerequisites: [],
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
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 360,
    y: 180,
    connections: []
  },
  {
    id: 'shoulder-pirouette',
    name: 'Shoulder Pirouette',
    description: 'Pirouette from shoulder.',
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 720,
    y: 180,
    connections: []
  },

  // Row y=150
  {
    id: 'kick',
    name: 'Kick',
    description: 'Kick movement. Dynamic power move.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 780,
    y: 150,
    connections: []
  },

  // Row y=300
  {
    id: 'front-to-side',
    name: 'Front to Side',
    description: 'Transition from front to side.',
    prerequisites: [],
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
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 660,
    y: 300,
    connections: []
  },

  // Row y=420
  {
    id: 'inversion-flag',
    name: 'Inversion to Flag',
    description: 'Invert into flag position.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 420,
    connections: []
  },
  {
    id: 'inversion-meathook',
    name: 'Inversion to Meathook',
    description: 'Invert directly to meathook.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 360,
    y: 420,
    connections: []
  },
  {
    id: 'inversion',
    name: 'Inversion',
    description: 'Basic inversion technique.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 420,
    connections: []
  },
  {
    id: 'high-switch',
    name: 'High Switch',
    description: 'High position switch.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 480,
    y: 420,
    connections: []
  },
  {
    id: 'straddle-invert-flag',
    name: 'Straddle Invert Flag',
    description: 'Straddle into inverted flag.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 540,
    y: 420,
    connections: []
  },

  // Row y=540
  {
    id: 'double-full',
    name: 'Double Full',
    description: 'Double full rotation.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 540,
    connections: []
  },
  {
    id: 'blanks',
    name: 'Blanks',
    description: 'Blanks position.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 120,
    y: 540,
    connections: []
  },
  {
    id: 'full',
    name: 'Full',
    description: 'Full rotation skill.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 180,
    y: 540,
    connections: []
  },
  {
    id: 'high-switch-left',
    name: 'High Switch',
    description: 'High switch variation.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 240,
    y: 540,
    connections: []
  },
  {
    id: 'barswrecker-switch',
    name: 'Barswrecker Switch',
    description: 'Barswrecker with switch.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 540,
    connections: []
  },
  {
    id: 'low-switch',
    name: 'Low Switch',
    description: 'Low position switch.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 360,
    y: 540,
    connections: []
  },
  {
    id: 'flare-to-flag',
    name: 'Flare to Flag',
    description: 'Flare transition to flag.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 540,
    connections: []
  },
  {
    id: 'reverse-meathook',
    name: 'Reverse Meathook',
    description: 'Reverse grip meathook.',
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 540,
    connections: []
  },

  // Row y=600
  {
    id: 'reverse-blanks',
    name: 'Reverse Blanks',
    description: 'Reverse blanks position.',
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 360,
    y: 600,
    connections: []
  },

  // Row y=660
  {
    id: 'split-grip-flag',
    name: 'Split Grip Flag',
    description: 'Flag with split grip.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 420,
    y: 660,
    connections: []
  },

  // Row y=540 continued
  {
    id: 'meathook',
    name: 'Meathook',
    description: 'Meathook position.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 660,
    y: 540,
    connections: []
  },

  // Row y=720
  {
    id: 'scorpion',
    name: 'Scorpion',
    description: 'Scorpion position.',
    prerequisites: [],
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
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 540,
    y: 720,
    connections: []
  },
  {
    id: 'cruiser-spin',
    name: 'Cruiser Spin',
    description: 'Spinning cruiser variation.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 600,
    y: 720,
    connections: []
  },

  // ============ RIGHT SIDE - TWO ARM BRANCH ============

  // LEVEL 2
  {
    id: 'static-right',
    name: 'Static',
    description: 'Two-arm static positions.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 450,
    connections: []
  },
  {
    id: 'rotating-right',
    name: 'Rotating',
    description: 'Two-arm rotational movements.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 150,
    connections: []
  },
  {
    id: 'support',
    name: 'Support',
    description: 'Support positions and transitions.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 360,
    connections: []
  },

  // LEVEL 3
  {
    id: 'sitting-right',
    name: 'Sitting',
    description: 'Sitting position on apparatus.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 210,
    connections: []
  },
  {
    id: 'twisting-right',
    name: 'Twisting',
    description: 'Twisting from rotation.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 270,
    connections: []
  },
  {
    id: 'hanging-right',
    name: 'Hanging',
    description: 'Two-arm hanging techniques.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 540,
    connections: []
  },
  {
    id: 'center',
    name: 'Center',
    description: 'Center position.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 630,
    connections: []
  },
  {
    id: 'split-right',
    name: 'Split',
    description: 'Split position in hang.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1080,
    y: 720,
    connections: []
  },
  {
    id: 'reverse-right',
    name: 'Reverse',
    description: 'Reverse hanging position.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 720,
    connections: []
  },
  {
    id: 'normal-bottom',
    name: 'Normal',
    description: 'Normal bottom position.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 1140,
    y: 810,
    connections: []
  },

  // LEVEL 4 - Row y=60
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

  // Row y=120
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

  // Row y=150
  {
    id: 'ball-twists',
    name: 'Ball Twists',
    description: 'Ball twisting technique.',
    prerequisites: [],
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

  // Row y=210
  {
    id: 'pull-to-hips',
    name: 'Pull to Hips',
    description: 'Pull to hip position.',
    prerequisites: [],
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
    prerequisites: [],
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

  // Row y=330
  {
    id: 'roll-ups',
    name: 'Roll Ups',
    description: 'Roll up technique.',
    prerequisites: [],
    type: 'key',
    state: 'active',
    x: 1260,
    y: 330,
    connections: []
  },
  {
    id: 'front-armstand',
    name: 'Front Armstand',
    description: 'Front arm stand.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 330,
    connections: []
  },
  {
    id: 'starliar',
    name: 'Starliar',
    description: 'Starliar position.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1380,
    y: 330,
    connections: []
  },

  // Row y=390
  {
    id: 'front-balance',
    name: 'Front Balance',
    description: 'Front balance position.',
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1380,
    y: 390,
    connections: []
  },
  {
    id: 'pull-to-full',
    name: 'Pull to Full',
    description: 'Pull to full position.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 390,
    connections: []
  },

  // Row y=540
  {
    id: 'two-arm-inversion',
    name: '2 Arm Inversion',
    description: 'Two arm inversion.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1260,
    y: 540,
    connections: []
  },
  {
    id: 'inversion-meathook-right',
    name: 'Inversion to Meathook',
    description: 'Invert into meathook.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 540,
    connections: []
  },
  {
    id: 'back-flag',
    name: 'Back Flag',
    description: 'Back flag position.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 1380,
    y: 540,
    connections: []
  },

  // Row y=630
  {
    id: 'spinning-meathook',
    name: 'Spinning Meathook',
    description: 'Meathook with spin.',
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1200,
    y: 630,
    connections: []
  },

  // Row y=720
  {
    id: 'meathook-right',
    name: 'Meathook',
    description: 'Right side meathook.',
    prerequisites: [],
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
    prerequisites: [],
    type: 'regular',
    state: 'inactive',
    x: 1260,
    y: 720,
    connections: []
  },

  // Row y=810
  {
    id: 'flare-bottom',
    name: 'Flare',
    description: 'Flare from bottom.',
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
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
    prerequisites: [],
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
