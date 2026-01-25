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

export const skillTreeData: Skill[] = [
  // ============ CENTRAL SPINE ============
  {
    id: 'one-arm',
    name: 'One Arm',
    description: 'Foundation for all one-arm skills. Master single arm grip and control.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 870,
    y: 450,
    connections: ['static-left', 'spin-hang']
  },
  {
    id: 'two-arm',
    name: 'Two Arm',
    description: 'Foundation for all two-arm skills. Essential grip and positioning.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 1050,
    y: 450,
    connections: []
  },

  // ============ LEFT SIDE - ONE ARM BRANCH ============
  
  // LEVEL 2: Swing, Static, Spin
  {
    id: 'swing-left',
    name: 'Swing',
    description: 'Swinging from rotation. Momentum-based skills.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 750,
    y: 90,
    connections: ['one-arm', 'twisting-left']
  },
  {
    id: 'static-left',
    name: 'Static',
    description: 'Static holds and positions. Focus on stability and control.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 750,
    y: 450,
    connections: []
  },
  {
    id: 'spin-hang',
    name: 'Spin',
    description: 'Spinning from hang position. Dynamic movement skills.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 750,
    y: 840,
    connections: ['cruiser', 'reverse-hang']
  },

  // LEVEL 3: Rotating, Twisting, Basics, Hanging, Normal, Reverse, Cruiser
  {
    id: 'rotating-left',
    name: 'Rotating',
    description: 'Rotating movements and spins. Dynamic one-arm rotations.',
    prerequisites: ['swing-left'],
    type: 'category',
    state: 'active',
    x: 630,
    y: -30,
    connections: ['swing-left', 'kick']
  },
  {
    id: 'twisting-left',
    name: 'Twisting',
    description: 'Twisting movements from rotation. Advanced coordination.',
    prerequisites: ['rotating-left'],
    type: 'category',
    state: 'active',
    x: 630,
    y: 90,
    connections: []
  },
  {
    id: 'basics',
    name: 'Basics',
    description: 'Fundamental movements and positions. Essential foundation.',
    prerequisites: ['static-left'],
    type: 'category',
    state: 'active',
    x: 630,
    y: 210,
    connections: ['swing-left']
  },
  {
    id: 'hanging-left',
    name: 'Hanging',
    description: 'Hanging positions using one arm. Build endurance and grip strength.',
    prerequisites: ['static-left'],
    type: 'category',
    state: 'active',
    x: 630,
    y: 450,
    connections: ['barswrecker', 'static-left']
  },
  {
    id: 'normal-hang',
    name: 'Normal',
    description: 'Standard hanging position. Entry point for hang variations.',
    prerequisites: ['hanging-left'],
    type: 'category',
    state: 'active',
    x: 630,
    y: 720,
    connections: ['spin-hang', 'flare']
  },
  {
    id: 'reverse-hang',
    name: 'Reverse',
    description: 'Inverted hanging position. Builds core and grip.',
    prerequisites: ['hanging-left'],
    type: 'category',
    state: 'active',
    x: 630,
    y: 840,
    connections: []
  },
  {
    id: 'cruiser',
    name: 'Cruiser',
    description: 'Advanced cruiser position. Signature skill for flow.',
    prerequisites: ['spin-hang', 'reverse-hang'],
    type: 'category',
    state: 'active',
    x: 630,
    y: 960,
    connections: ['cruiser-spin']
  },

  // LEVEL 4: All other skills
  
  // Row y=-120
  {
    id: 'double-twist',
    name: 'Front',
    description: 'Front rotation technique.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 510,
    y: -120,
    connections: ['rotating-left']
  },
  {
    id: 'splits',
    name: 'Inloc',
    description: 'Inloc position.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: -120,
    connections: []
  },
  {
    id: 'inside-pirouette',
    name: 'Double front',
    description: 'Double front rotation.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 330,
    y: -120,
    connections: []
  },

  // Row y=-30
  {
    id: 'soleil',
    name: 'Salto',
    description: 'Salto technique.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 330,
    y: -30,
    connections: []
  },
  {
    id: 'bucket',
    name: 'Disloc',
    description: 'Dislocation technique.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: -30,
    connections: []
  },
  {
    id: 'double-salta',
    name: 'Double salto',
    description: 'Double salto technique.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 150,
    y: -30,
    connections: []
  },
  {
    id: '1-5-arm-salta',
    name: '1.5 Arm Salta',
    description: 'One and a half arm salta.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 240,
    y: -30,
    connections: []
  },
  {
    id: 'kick',
    name: 'Back',
    description: 'Back rotation technique.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 510,
    y: -30,
    connections: []
  },

  // Row y=90
  {
    id: 'sailor',
    name: 'Inside pirouette',
    description: 'Inside pirouette spin.',
    prerequisites: ['rotating-left'],
    type: 'regular',
    state: 'inactive',
    x: 510,
    y: 90,
    connections: ['twisting-left']
  },
  {
    id: 'swing-in-armtie',
    name: 'Swing to Mushu',
    description: 'Swing to mushu position.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 90,
    connections: []
  },
  {
    id: 'swing-to-flag',
    name: 'Swing to Flag',
    description: 'Swing transition to flag.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 150,
    y: 90,
    connections: []
  },
  {
    id: 'shoulder-pirouette',
    name: 'Outside Pirouette',
    description: 'Outside pirouette spin.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 240,
    y: 90,
    connections: []
  },
  {
    id: 'soleil-2',
    name: 'Soleil',
    description: 'Soleil variation.',
    prerequisites: ['swing-left'],
    type: 'regular',
    state: 'inactive',
    x: 330,
    y: 90,
    connections: []
  },
  {
    id: 'reverse-swing',
    name: 'Reverse soleil',
    description: 'Reverse soleil technique.',
    prerequisites: ['twisting-left'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 90,
    connections: []
  },

  // Row y=210
  {
    id: 'front-to-side',
    name: 'Front to Side',
    description: 'Transition from front to side.',
    prerequisites: ['twisting-left'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 210,
    connections: []
  },
  {
    id: 'front-to-front',
    name: 'Front to Front',
    description: 'Front position maintenance.',
    prerequisites: ['basics'],
    type: 'regular',
    state: 'inactive',
    x: 510,
    y: 210,
    connections: ['basics']
  },

  // Row y=450
  {
    id: 'inversion-flag',
    name: 'Inversion to Flag',
    description: 'Invert into flag position.',
    prerequisites: ['hanging-left'],
    type: 'regular',
    state: 'inactive',
    x: 150,
    y: 450,
    connections: []
  },
  {
    id: 'low-switch',
    name: 'Inversion to meathook',
    description: 'Invert directly to meathook.',
    prerequisites: ['hanging-left'],
    type: 'regular',
    state: 'inactive',
    x: 240,
    y: 450,
    connections: []
  },
  {
    id: 'flare-to-flag',
    name: 'Inversion',
    description: 'Basic inversion technique.',
    prerequisites: ['hanging-left'],
    type: 'regular',
    state: 'inactive',
    x: 330,
    y: 450,
    connections: []
  },
  {
    id: 'reverse-meathook',
    name: 'High switch',
    description: 'High position switch.',
    prerequisites: ['hanging-left'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 450,
    connections: []
  },
  {
    id: 'barswrecker',
    name: 'Straddle rock to flag',
    description: 'Straddle into flag.',
    prerequisites: ['hanging-left'],
    type: 'regular',
    state: 'inactive',
    x: 510,
    y: 450,
    connections: []
  },

  // Row y=720
  {
    id: 'double-full',
    name: 'Double Full',
    description: 'Double full rotation.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: -300,
    y: 720,
    connections: []
  },
  {
    id: 'blanks',
    name: 'Mushu',
    description: 'Mushu position.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: -210,
    y: 720,
    connections: []
  },
  {
    id: 'full',
    name: 'Full',
    description: 'Full rotation skill.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: -120,
    y: 720,
    connections: []
  },
  {
    id: 'high-switch-left',
    name: 'High Switch',
    description: 'High switch variation.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: -30,
    y: 720,
    connections: []
  },
  {
    id: 'barswrecker-switch',
    name: 'Nutcracker',
    description: 'Nutcracker technique.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 720,
    connections: []
  },
  {
    id: 'high-switch',
    name: 'Low switch',
    description: 'Low position switch.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 150,
    y: 720,
    connections: []
  },
  {
    id: 'straddle-invert-flag',
    name: 'Flare to flag',
    description: 'Flare transition to flag.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 240,
    y: 720,
    connections: []
  },
  {
    id: 'inversion-meathook',
    name: 'Reverse Meathook',
    description: 'Reverse grip meathook.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 330,
    y: 720,
    connections: []
  },
  {
    id: 'inversion',
    name: 'Nutcracker',
    description: 'Nutcracker technique.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 720,
    connections: []
  },
  {
    id: 'flare',
    name: 'Flare',
    description: 'Flare movement.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 510,
    y: 720,
    connections: []
  },

  // Row y=840
  {
    id: 'reverse-blanks',
    name: 'Reverse Blanks',
    description: 'Reverse blanks position.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    x: -120,
    y: 840,
    connections: []
  },
  {
    id: 'reverse-full',
    name: 'Reverse Full',
    description: 'Reverse full rotation.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    x: -30,
    y: 840,
    connections: []
  },
  {
    id: 'reverse-flag',
    name: 'Reverse Flag',
    description: 'Reverse flag position.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 840,
    connections: []
  },
  {
    id: 'flare-to-lockoff',
    name: 'Beat to 1 arm',
    description: 'Beat transition to one arm.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    x: 150,
    y: 840,
    connections: []
  },
  {
    id: 'front-3-arm',
    name: 'Flare to lockoff',
    description: 'Flare into lockoff.',
    prerequisites: ['reverse-hang'],
    type: 'regular',
    state: 'inactive',
    x: 240,
    y: 840,
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
    x: 330,
    y: 840,
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
    y: 840,
    connections: []
  },
  {
    id: 'meathook',
    name: 'Meathook',
    description: 'Meathook position.',
    prerequisites: ['normal-hang'],
    type: 'regular',
    state: 'inactive',
    x: 510,
    y: 840,
    connections: ['reverse-hang']
  },

  // Row y=960
  {
    id: 'scorpion',
    name: 'Scorpion',
    description: 'Scorpion position.',
    prerequisites: ['cruiser'],
    type: 'regular',
    state: 'inactive',
    x: 330,
    y: 960,
    connections: []
  },
  {
    id: 'dragon',
    name: 'Nugget',
    description: 'Nugget position.',
    prerequisites: ['cruiser'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 960,
    connections: []
  },
  {
    id: 'cruiser-spin',
    name: 'Cruiser Spin',
    description: 'Spinning cruiser variation.',
    prerequisites: ['cruiser'],
    type: 'regular',
    state: 'inactive',
    x: 510,
    y: 960,
    connections: []
  },

  // ============ RIGHT SIDE - TWO ARM BRANCH ============

  // LEVEL 2: Static, Rotating, Support
  {
    id: 'static-right',
    name: 'Static',
    description: 'Two-arm static positions.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 450,
    connections: ['two-arm']
  },
  {
    id: 'rotating-right',
    name: 'Rotating',
    description: 'Two-arm rotational movements.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1320,
    y: -60,
    connections: ['bengal-loops']
  },
  {
    id: 'support',
    name: 'Support',
    description: 'Support positions and transitions.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    x: 1320,
    y: 390,
    connections: ['static-right']
  },

  // LEVEL 3
  {
    id: 'sitting-right',
    name: 'Sitting',
    description: 'Sitting position on apparatus.',
    prerequisites: ['rotating-right'],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 30,
    connections: ['two-arm', 'rotating-right']
  },
  {
    id: 'twisting-right',
    name: 'Twisting',
    description: 'Twisting from rotation.',
    prerequisites: ['rotating-right'],
    type: 'category',
    state: 'active',
    x: 1320,
    y: 120,
    connections: ['sitting-right', 'ball-twists', 'pull-to-hips']
  },
  {
    id: 'hanging-right',
    name: 'Hanging',
    description: 'Two-arm hanging techniques.',
    prerequisites: ['static-right'],
    type: 'category',
    state: 'active',
    x: 1320,
    y: 510,
    connections: ['static-right', 'two-arm-inversion']
  },
  {
    id: 'center',
    name: 'Center',
    description: 'Center position.',
    prerequisites: ['hanging-right'],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 750,
    connections: ['split-right', 'spinning-meathook']
  },
  {
    id: 'split-right',
    name: 'Split',
    description: 'Split position in hang.',
    prerequisites: ['center'],
    type: 'category',
    state: 'active',
    x: 1080,
    y: 870,
    connections: ['two-arm']
  },
  {
    id: 'reverse-right',
    name: 'Reverse',
    description: 'Reverse hanging position.',
    prerequisites: ['split-right'],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 870,
    connections: ['split-right', 'meathook-right']
  },
  {
    id: 'normal-bottom',
    name: 'Normal',
    description: 'Normal bottom position.',
    prerequisites: ['reverse-right'],
    type: 'category',
    state: 'active',
    x: 1200,
    y: 990,
    connections: ['split-right', 'flare-bottom']
  },

  // LEVEL 4 - Right side

  // Row y=-60
  {
    id: 'bengal-loops',
    name: 'Armpit beats',
    description: 'Armpit beat technique.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: -60,
    connections: []
  },
  {
    id: 'shaker',
    name: 'Disloc',
    description: 'Dislocation technique.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1530,
    y: -60,
    connections: []
  },
  {
    id: 'staller',
    name: 'Inloc',
    description: 'Inloc position.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1620,
    y: -60,
    connections: []
  },
  {
    id: 'giants',
    name: 'Giants',
    description: 'Giant swing movement.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1710,
    y: -60,
    connections: []
  },
  {
    id: 'astro-plants',
    name: 'Inloc Giants',
    description: 'Inloc giants technique.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1800,
    y: -60,
    connections: []
  },
  {
    id: 'back-staller',
    name: 'Back Salto',
    description: 'Back salto technique.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1890,
    y: -60,
    connections: []
  },
  {
    id: 'delacrew',
    name: 'Delchev',
    description: 'Delchev technique.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1980,
    y: -60,
    connections: []
  },
  {
    id: 'tamazuki',
    name: 'Yamawaki',
    description: 'Yamawaki skill.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 2070,
    y: -60,
    connections: []
  },

  // Row y=60
  {
    id: 'ball-twists',
    name: 'Bell beats',
    description: 'Bell beat technique.',
    prerequisites: ['sitting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 60,
    connections: []
  },
  {
    id: 'tap-plank',
    name: 'To plank',
    description: 'Tap into plank position.',
    prerequisites: ['sitting-right'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 1530,
    y: 60,
    connections: []
  },
  {
    id: 'side-pull-push',
    name: 'Side Pull Push',
    description: 'Side pulling and pushing.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1620,
    y: 60,
    connections: []
  },
  {
    id: 'ball-turn',
    name: 'Half Turn',
    description: 'Half turn technique.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1710,
    y: 60,
    connections: []
  },
  {
    id: 'pirouette',
    name: 'Pirouette',
    description: 'Pirouette spin.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1800,
    y: 60,
    connections: []
  },
  {
    id: 'swing-to-handstand',
    name: 'Swing to Handstand',
    description: 'Swing into handstand.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1890,
    y: 60,
    connections: []
  },

  // Row y=150
  {
    id: 'pull-to-hips',
    name: 'Pull to Hips',
    description: 'Pull to hip position.',
    prerequisites: ['twisting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 150,
    connections: []
  },
  {
    id: 'swing-to-meathook',
    name: 'Swing to Meathook',
    description: 'Swing into meathook.',
    prerequisites: ['twisting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1530,
    y: 150,
    connections: []
  },
  {
    id: 'swing-to-full',
    name: 'Swing to Full',
    description: 'Swing to full rotation.',
    prerequisites: ['twisting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1620,
    y: 150,
    connections: []
  },

  // Row y=300
  {
    id: 'roll-ups',
    name: 'Roll Ups',
    description: 'Roll up technique.',
    prerequisites: ['support'],
    type: 'key',
    state: 'active',
    x: 1530,
    y: 300,
    connections: []
  },
  {
    id: 'front-armstand',
    name: 'Press Handstand',
    description: 'Press to handstand.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1620,
    y: 300,
    connections: []
  },
  {
    id: 'starliar',
    name: 'Azarian',
    description: 'Azarian technique.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1710,
    y: 300,
    connections: []
  },

  // Row y=390
  {
    id: 'front-balance',
    name: 'Front Balance',
    description: 'Front balance position.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 390,
    connections: ['support']
  },
  {
    id: 'side-balance',
    name: 'Side Balance',
    description: 'Side balance position.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1530,
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
    x: 1620,
    y: 390,
    connections: []
  },
  {
    id: 'pull-to-full',
    name: 'Full to full',
    description: 'Full to full transition.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1710,
    y: 390,
    connections: []
  },

  // Row y=510
  {
    id: 'two-arm-inversion',
    name: '2 Arm Inversion',
    description: 'Two arm inversion.',
    prerequisites: ['hanging-right'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 510,
    connections: []
  },
  {
    id: 'inversion-meathook-right',
    name: 'Inversion to Meathook',
    description: 'Invert into meathook.',
    prerequisites: ['hanging-right'],
    type: 'regular',
    state: 'inactive',
    x: 1530,
    y: 510,
    connections: []
  },
  {
    id: 'back-flag',
    name: 'Back Flag',
    description: 'Back flag position.',
    prerequisites: ['hanging-right'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 1620,
    y: 510,
    connections: []
  },

  // Row y=750
  {
    id: 'spinning-meathook',
    name: 'Spinning muscle up',
    description: 'Meathook with spin.',
    prerequisites: ['center'],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 750,
    connections: []
  },

  // Row y=870
  {
    id: 'meathook-right',
    name: 'Meathook',
    description: 'Right side meathook.',
    prerequisites: ['reverse-right'],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 870,
    connections: []
  },
  {
    id: 'straightstar',
    name: 'Straightjacket',
    description: 'Straightjacket position.',
    prerequisites: ['reverse-right'],
    type: 'regular',
    state: 'inactive',
    x: 1410,
    y: 870,
    connections: []
  },

  // Row y=990
  {
    id: 'flare-bottom',
    name: 'Flare',
    description: 'Flare from bottom.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1320,
    y: 990,
    connections: []
  },
  {
    id: 'barswrecker-bottom',
    name: 'Nutcracker',
    description: 'Nutcracker from bottom.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1410,
    y: 990,
    connections: []
  },
  {
    id: 'meathook-bottom',
    name: 'Meathook',
    description: 'Meathook from bottom.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1500,
    y: 990,
    connections: []
  },
  {
    id: 'straightstar-flag',
    name: 'Straightjacket',
    description: 'Straightjacket into flag.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1590,
    y: 990,
    connections: []
  },
  {
    id: 'flare-to-flag-right',
    name: 'Flare to Flag',
    description: 'Flare to flag.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1680,
    y: 990,
    connections: []
  },
  {
    id: 'flare-to-full',
    name: 'Flare to Full',
    description: 'Flare into full.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1770,
    y: 990,
    connections: []
  },

  // New node: Bent arm to handstand
  {
    id: 'front-balance-copy-1769358407899-puhwc',
    name: 'Bent arm to handstand',
    description: 'Bent arm press to handstand.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 300,
    connections: ['support']
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
