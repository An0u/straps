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
  videoUrl?: string;
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
    name: 'Center',
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
    description: 'Forward shoulder rotation. Body passes forward through arms.',
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
    type: 'key',
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
    description: 'Shoulder rotation backward through full range. Continuous wrist rotation.',
    prerequisites: ['rotating-left'],
    type: 'key',
    state: 'inactive',
    x: 420,
    y: -30,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/uFZ2-c1vePE?si=NNe87_Q2NvrFPEfP'
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
    type: 'key',
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
    type: 'key',
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
    type: 'key',
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
    description: 'Inverted position with legs separated and turned out. Back stretched pushing hips toward wrist.',
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
    description: 'Transition from flare to flag while rotating. Continuous arm rotation from wrist through body.',
    prerequisites: ['normal-hang'],
    type: 'key',
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
    description: 'Inverted position with legs separated and turned out. Back stretched pushing hips toward wrist.',
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
    description: 'Horizontal flag position performed in rotation. Body tilted to one side with arm tucked to back.',
    prerequisites: ['normal-hang'],
    type: 'key',
    state: 'inactive',
    x: 510,
    y: 720,
    connections: []
  },

  // Row y=840
  {
    id: 'reverse-blanks',
    name: 'Reverse Mushu',
    description: 'Reverse mushu position.',
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
    type: 'key',
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
    type: 'key',
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
    description: 'Hanging with legs raised and pelvis lifted to the side. Arm held tight to body.',
    prerequisites: ['normal-hang'],
    type: 'key',
    state: 'inactive',
    x: 510,
    y: 840,
    connections: ['reverse-hang']
  },

  // Row y=960
  {
    id: 'dragon',
    name: 'Nugget',
    description: 'Nugget position.',
    prerequisites: ['cruiser'],
    type: 'regular',
    state: 'inactive',
    x: 240,
    y: 960,
    connections: []
  },
  {
    id: 'dragon-copy-1771019062590-45xoc-copy-1771019070693-ttg5b',
    name: 'back candle',
    description: 'Back candle position.',
    prerequisites: ['cruiser'],
    type: 'regular',
    state: 'inactive',
    x: 330,
    y: 960,
    connections: []
  },
  {
    id: 'dragon-copy-1771019062590-45xoc',
    name: 'Front candle',
    description: 'Front candle position.',
    prerequisites: ['cruiser'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 960,
    connections: []
  },
  {
    id: 'cruiser-spin',
    name: 'Center Spin',
    description: 'Spinning cruiser variation.',
    prerequisites: ['cruiser'],
    type: 'key',
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
    name: 'Swing',
    description: 'Swing position on apparatus.',
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
    name: 'Spin',
    description: 'Spin position in hang.',
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
    description: 'Swinging with straps in armpit area. Different rotation axis.',
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
    description: 'Shoulder rotation backward through full range. Continuous wrist rotation.',
    prerequisites: ['rotating-right'],
    type: 'key',
    state: 'inactive',
    x: 1530,
    y: -60,
    connections: []
  },
  {
    id: 'staller',
    name: 'Inloc',
    description: 'Forward shoulder rotation. Body passes forward through arms.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1620,
    y: -60,
    connections: [],
    videoUrl:'https://youtube.com/shorts/G5TW1kj028g'
  },
  {
    id: 'giants',
    name: 'Giants',
    description: 'Full 360-degree rotations around straps axis. Continuous circular swinging.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1710,
    y: -60,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/CSCpzHYiBqA?si=d3td_sI2NW6nMx5c'
  },
  {
    id: 'astro-plants',
    name: 'Inloc Giants',
    description: 'Giant swings with forward shoulder rotation pattern.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1800,
    y: -60,
    connections: [],
    videoUrl:'https://youtube.com/shorts/6zuzT9qCQlk?si=U1gfY5vPGEtA-V4H'
  },
  {
    id: 'back-staller',
    name: 'Back Salto',
    description: 'Backward somersault, likely with release or loose grip.',
    prerequisites: ['rotating-right'],
    type: 'key',
    state: 'inactive',
    x: 1890,
    y: -60,
    connections: [],
    videoUrl:'https://youtube.com/shorts/uFZ2-c1vePE'
  },
  {
    id: 'delacrew',
    name: 'Delchev',
    description: 'Named skill involving release and re-catch with rotation.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1980,
    y: -60,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/ggkSz6urQko?si=b77McRYXk1niVMXp'
  },
  {
    id: 'tamazuki',
    name: 'Yamawaki',
    description: 'Named gymnastics skill adapted to straps. Specific rotation pattern.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 2070,
    y: -60,
    connections: [],
    videoUrl:''
  },

  // Row y=60
  {
    id: 'ball-twists',
    name: 'Bell beats',
    description: 'Rhythmic swinging similar to rings. Arched position to dish position at vertical.',
    prerequisites: ['sitting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 60,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=py7b6Q04-nQ'
  },
  {
    id: 'tap-plank',
    name: 'To plank',
    description: 'Swing transitioning to horizontal plank position using momentum.',
    prerequisites: ['sitting-right'],
    type: 'regular',
    state: 'inactive',
    isGoldBorder: true,
    x: 1530,
    y: 60,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=aoJzgNtjdjQ'
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
    connections: [],
    videoUrl: 'https://youtube.com/shorts/aoJzgNtjdjQ'
  },
  {
    id: 'ball-turn',
    name: 'Half Turn',
    description: '180-degree rotation during swing. Turn initiated by feet at peak.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1710,
    y: 60,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=UQ0fme2tGIo'
  },
  {
    id: 'pirouette',
    name: 'Pirouette',
    description: 'Full 360-degree rotation during swing phase.',
    prerequisites: ['rotating-right'],
    type: 'regular',
    state: 'inactive',
    x: 1800,
    y: 60,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/cxdtl4LmyeY?si=d2DZsl8ll79fUTOt'
  },
  {
    id: 'swing-to-handstand',
    name: 'Swing to Handstand',
    description: 'Using swing momentum to transition into handstand.',
    prerequisites: ['rotating-right'],
    type: 'key',
    state: 'inactive',
    x: 1890,
    y: 60,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=CmCYdpXLccM'
  },

  // Row y=150
  {
    id: 'pull-to-hips',
    name: 'Pull to Hips',
    description: 'Swinging movement pulling toward hips using momentum.',
    prerequisites: ['twisting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1440,
    y: 150,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/aoJzgNtjdjQ'
  },
  {
    id: 'swing-to-meathook',
    name: 'Swing to Meathook',
    description: 'Using swing momentum to transition into meathook position.',
    prerequisites: ['twisting-right'],
    type: 'regular',
    state: 'inactive',
    x: 1530,
    y: 150,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=PHtBZWcp0Gg'
  },
  {
    id: 'swing-to-full',
    name: 'Swing to Full',
    description: 'Swing to full rotation.',
    prerequisites: ['twisting-right'],
    type: 'key',
    state: 'inactive',
    x: 1620,
    y: 150,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/aCkpDVtMdzM?si=-f0jfaHafW56R9he'
  },

  // Row y=300
  {
    id: 'roll-ups',
    name: 'Roll Ups',
    description: 'Rolling from tucked position, lifting pelvis to place straps above elbows.',
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
    description: 'Controlled press to handstand. Pelvis above shoulders with open shoulders.',
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
    description: 'Advanced static strength position. Maltese or iron cross variation.',
    prerequisites: ['support'],
    type: 'regular',
    state: 'inactive',
    x: 1710,
    y: 300,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=30fUEKLW74M'
  },

  // Row y=390
  {
    id: 'front-balance',
    name: 'Front Balance',
    description: 'Horizontal support with locked grip. Shoulders set back, arms bent, palms up on pelvis.',
    prerequisites: ['support'],
    type: 'key',
    state: 'inactive',
    x: 1440,
    y: 390,
    connections: ['support']
  },
  {
    id: 'side-balance',
    name: 'Side Balance',
    description: 'Support balanced to one side. Weight on one arm with pelvis turned.',
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
    description: 'Support variation with open shoulders and extended body line.',
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
    description: 'Transition between two fully extended support positions.',
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
    description: 'Inverted hanging with both arms. Pelvis stretched with feet to ceiling.',
    prerequisites: ['hanging-right'],
    type: 'key',
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
    connections: [],
    videoUrl: 'https://youtube.com/shorts/MsLbJOZAW9M'
  },
  {
    id: 'back-flag',
    name: 'Back Flag',
    description: 'Horizontal back planche position behind the straps. Shallow angle between trunk and arms.',
    prerequisites: ['hanging-right'],
    type: 'key',
    state: 'inactive',
    isGoldBorder: true,
    x: 1620,
    y: 510,
    connections: [],
    videoUrl: 'https://www.youtube.com/shorts/gOJ4kMs5St8'
  },

  // Row y=750
  {
    id: 'spinning-meathook',
    name: 'Spinning muscle up',
    description: 'Muscle-up performed while rotating around central straps axis.',
    prerequisites: ['center'],
    type: 'key',
    state: 'inactive',
    x: 1320,
    y: 750,
    connections: []
  },

  // Row y=870
  {
    id: 'meathook-right',
    name: 'Meathook',
    description: 'Hanging with legs raised and pelvis lifted to the side. Arm held tight to body.',
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
    description: 'Arms crossed or wrapped while maintaining rotation. Limited arm mobility.',
    prerequisites: ['reverse-right'],
    type: 'key',
    state: 'inactive',
    x: 1410,
    y: 870,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/tDNdHqBcsOo?si=Z5XAhNpg1BZ36ylZ'
  },

  // Row y=990
  {
    id: 'flare-bottom',
    name: 'Flare',
    description: 'Horizontal flag position performed in rotation. Body tilted to one side with arm tucked to back.',
    prerequisites: ['normal-bottom'],
    type: 'key',
    state: 'inactive',
    x: 1320,
    y: 990,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/LngeQfLsL3c'
  },
  {
    id: 'barswrecker-bottom',
    name: 'Nutcracker',
    description: 'Inverted position with legs separated and turned out. Back stretched pushing hips toward wrist.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1410,
    y: 990,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/zKKMrqKPJWY'
  },
  {
    id: 'meathook-bottom',
    name: 'Meathook',
    description: 'Hanging with legs raised and pelvis lifted to the side. Arm held tight to body.',
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
    description: 'Arms crossed or wrapped while maintaining rotation. Limited arm mobility.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1590,
    y: 990,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/tDNdHqBcsOo?si=Z5XAhNpg1BZ36ylZ'
  },
  {
    id: 'flare-to-flag-right',
    name: 'Flare to Flag',
    description: 'Transition from flare to flag while rotating. Continuous arm rotation from wrist through body.',
    prerequisites: ['normal-bottom'],
    type: 'key',
    state: 'inactive',
    x: 1680,
    y: 990,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/Rbs7Kw9xKU0'
  },
  {
    id: 'flare-to-full',
    name: 'Flare to Full',
    description: 'Flare transitioning to fully extended position while rotating.',
    prerequisites: ['normal-bottom'],
    type: 'regular',
    state: 'inactive',
    x: 1770,
    y: 990,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/Un6PkAhavGQ?si=sqvqQGeKlo5Un5nk'
  },

  // New node: Bent arm to handstand
  {
    id: 'front-balance-copy-1769358407899-puhwc',
    name: 'Bent arm to handstand',
    description: 'Press to handstand from bent arms. Raise pelvis above shoulders.',
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
