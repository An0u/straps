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
    description: 'Opposite of dislocate - forward shoulder rotation (inlocate). Brings body from back position through to front, maintaining control through rotation. Body passes forward through arms rather than backward, requiring opposite shoulder mechanics.',
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
    description: 'Dislocate - shoulder rotation through backward range passing behind body. Can be performed with straight or bent arms. From inverted hanging position, begin same as straight arm dislocation. During pelvis descent, bend arms and clench hands. Pass vertical point with straight body, continue toward inverted position while straightening arms. Continuous wrist rotation accompanies shoulder opening.',
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
    description: 'Transition from two-arm inverted position into meathook position. From vertical inversion with pelvis stretched and feet to ceiling, tuck one arm tight to body while bringing feet to side. Return by lowering pelvis and raising feet toward straps before lowering legs.',
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
    description: 'Inverted position with legs separated and turned out, outer leg resembling hooked meathook shape. Back stretched upward pushing hips toward wrist. Legs stay separated and turned out while rotating. The pelvis goes up and down keeping closed position with legs staying close to arm.',
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
    description: 'Transition from flare position into flag while maintaining rotation. Continuous arm rotation creates twist initiated by wrist through elbow, shoulder and entire body. Horizontal stretched body hooks onto suspended arm with continuous external rotation of upper body.',
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
    description: 'Inverted position with legs separated and turned out, outer leg resembling hooked meathook shape. Back stretched upward pushing hips toward wrist. Legs stay separated and turned out while rotating. The pelvis goes up and down keeping closed position with legs staying close to arm.',
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
    description: 'One-arm flag position performed in rotation. Body tilted horizontally to one side with arm tucked to back near pelvis, free arm extended as extension of trunk. Body slightly extended with open pelvis, back and shoulders. The suspended arm is an extension of the straps while hips conceal the arm.',
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
    description: 'Hanging position with closed legs raised, then pelvis lifted with feet toward the side. Hanging arm held tight to body, stretched free arm next to ear constantly lined up with body length. Suspended arm is extension of straps, hips cover and conceal the arm. Weight of free arm and legs accentuate body hook effect.',
    prerequisites: ['normal-hang'],
    type: 'key',
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
    description: 'Swinging movements with straps positioned in armpit area rather than hands, creating different rotation axis and momentum pattern. Requires different body mechanics and control compared to hand-grip swinging.',
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
    description: 'Dislocate - shoulder rotation through backward range passing behind body. Can be performed with straight or bent arms. From inverted hanging position, begin same as straight arm dislocation. During pelvis descent, bend arms and clench hands. Pass vertical point with straight body, continue toward inverted position while straightening arms. Continuous wrist rotation accompanies shoulder opening.',
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
    description: 'Opposite of dislocate - forward shoulder rotation (inlocate). Brings body from back position through to front, maintaining control through rotation. Body passes forward through arms rather than backward, requiring opposite shoulder mechanics.',
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
    description: 'Full 360-degree rotations around the straps axis. Continuous circular swinging movement requiring significant momentum and precise timing. Body maintains extended position while rotating completely around attachment point.',
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
    description: 'Giant swings performed with inlocate (forward) shoulder rotation pattern. Combines full 360-degree rotation with forward shoulder movement, creating continuous forward-rotating circles around straps axis.',
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
    description: 'Backward somersault/flip movement, likely released from straps or performed in loose grip. Acrobatic element requiring sufficient height from swing and rotation control. May involve release and re-catch or maintained contact throughout.',
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
    description: 'Delchev technique.',
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
    description: 'Named gymnastics skill from rings/high bar adapted to aerial straps. Involves specific rotation or release pattern characteristic of the original element. Requires advanced technical skill and precise execution of rotation mechanics.',
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
    description: 'Rhythmic swinging movements similar to rings gymnastics. Swing position slightly arched with open back and shoulders, arms slightly apart looking forward. Keep stretched position into vertical, then close body in dish position with feet going up. Arms slightly separated pushing backward, looking down at feet. Lead movement with stretched pelvis and elbows.',
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
    description: 'Swing movement transitioning to horizontal plank/planche position. Related to planche work, using momentum to achieve and hold horizontal body position. Requires timing to convert swing energy into static hold.',
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
    description: 'Lateral swinging movement with pushing and pulling actions. Combines side-to-side momentum with coordinated arm work. Creates diagonal or lateral swing patterns rather than forward-backward.',
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
    description: '180-degree rotation during swing. At top of swing, extended body position creates greater distance between free hand and feet. Half turn initiated by feet at furthest point from floor causes change of axis of entire body, retracing circle drawn by feet during upward swing phase.',
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
    description: 'Full 360-degree rotation or spinning movement during swing phase. Complete turn with body control maintained throughout. Requires precise timing and coordination to execute full rotation while maintaining swing momentum.',
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
    description: 'Using swing momentum to transition into handstand position. Timing and alignment crucial for successful entry to inverted balance. Convert horizontal swing energy into vertical press, finishing in stable handstand with arms extended and locked.',
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
    description: 'Swinging movement where body pulls toward hips position. Involves hip-level roll or rotation using swing momentum. Likely transition from hanging swing into hip-wrapped or supported position using dynamic energy.',
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
    description: 'Using forward or backward swing momentum to transition into meathook position. In backward part of swing, clench hands to achieve position. Timing and body positioning crucial for smooth entry - raise closed legs then continue to raise pelvis putting feet toward side.',
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
    description: 'Forward or backward swing leading to fully extended position. Uses swing energy to achieve stretched body alignment. Momentum carries body into complete extension with control maintained throughout.',
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
    description: 'Rolling movement from tucked position, lifting pelvis to place straps above elbows. Arms slightly apart in back position, closed when raising back. Perform roll-up while remaining piked, turn wrists and shoulders. Finish upward in crucifix, inverted crucifix or handstand. Maintain gaze at waist to create rounded shape. Contact with straps right below elbows provides rotational force.',
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
    description: 'Controlled press from lower position to handstand. Raise pelvis above shoulders whilst keeping shoulders open. Can press with legs together or separated. Do not engage shoulders immediately - keep slightly closed to engage at right moment. Arms remain extended and locked out in final position.',
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
    description: 'Advanced static strength position named after gymnast Albert Azarian. Typically involves maltese or iron cross position variations on straps, requiring exceptional shoulder and arm strength. One of the most demanding static holds in aerial straps.',
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
    description: 'Horizontal support position executed with locked grip, shoulders slightly set back, bent arms with palms up rested on pelvis. Find horizontal balance point with open back and steady support below center of gravity. Practice initially with feet on ground, then raise heels off floor to find balance.',
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
    description: 'Support position balanced to one side, similar to flag in support position. Transfer weight to one arm, turn pelvis and point foot backward with straight leg while stretching support arm. Line up free arm next to head. Laying down in arched shape with lower back in straps, pelvis and shoulders in open position.',
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
    description: 'Support position variation with specific body shape involving open shoulder position and extended body line. Related to front balance family of moves requiring balance and control in horizontal plane with distinctive wing-like aesthetic.',
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
    description: 'Transition between two fully extended support positions, maintaining straight body alignment throughout. Requires strength and control to maintain both positions and smoothly transition between them without loss of form.',
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
    description: 'Inverted hanging position using both arms. From meathook position, stretch pelvis with arm pointing to floor and feet to ceiling. Keep suspended hand close to pelvis. Head straight looking at feet. Upper body doesn\'t move in relation to suspended arm - just legs dropping down and lifting in line with trunk.',
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
    description: 'Transition from two-arm inverted position into meathook position. From vertical inversion with pelvis stretched and feet to ceiling, tuck one arm tight to body while bringing feet to side. Return by lowering pelvis and raising feet toward straps before lowering legs.',
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
    description: 'Two-arm back planche - body goes downward lined up into horizontal position behind the straps. Keep angle between trunk and arms quite shallow. Head straight looking slightly forward. Different leg positions possible: one bent leg, legs separated, aligned and fully extended.',
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
    description: 'Muscle-up (transition from hanging to support position) performed while rotating around central axis of straps. Begin with flexed wrists in support position, hoist up until hands in front of chest, turn wrists and push into support. Combines vertical strength movement with rotational momentum.',
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
    description: 'Hanging position with closed legs raised, then pelvis lifted with feet toward the side. Hanging arm held tight to body, stretched free arm next to ear constantly lined up with body length. Suspended arm is extension of straps, hips cover and conceal the arm. Weight of free arm and legs accentuate body hook effect.',
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
    description: 'Two-arm position with arms crossed or wrapped in restrictive position while maintaining rotation. Body control maintained while spinning with limited arm mobility. Creates constraining aesthetic while rotating around vertical axis.',
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
    description: 'One-arm flag position performed in rotation. Body tilted horizontally to one side with arm tucked to back near pelvis, free arm extended as extension of trunk. Body slightly extended with open pelvis, back and shoulders. The suspended arm is an extension of the straps while hips conceal the arm.',
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
    description: 'Inverted position with legs separated and turned out, outer leg resembling hooked meathook shape. Back stretched upward pushing hips toward wrist. Legs stay separated and turned out while rotating. The pelvis goes up and down keeping closed position with legs staying close to arm.',
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
    description: 'Hanging position with closed legs raised, then pelvis lifted with feet toward the side. Hanging arm held tight to body, stretched free arm next to ear constantly lined up with body length. Suspended arm is extension of straps, hips cover and conceal the arm. Weight of free arm and legs accentuate body hook effect.',
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
    description: 'Two-arm position with arms crossed or wrapped in restrictive position while maintaining rotation. Body control maintained while spinning with limited arm mobility. Creates constraining aesthetic while rotating around vertical axis.',
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
    description: 'Transition from flare position into flag while maintaining rotation. Continuous arm rotation creates twist initiated by wrist through elbow, shoulder and entire body. Horizontal stretched body hooks onto suspended arm with continuous external rotation of upper body.',
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
    description: 'Transition from flare position to fully extended position (likely inverted or complete extension) while rotating. Maintains continuous momentum throughout movement with body control during position change.',
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
    description: 'Press to handstand starting from bent arm position. Raise pelvis above shoulders while keeping shoulders open. Option to go up with legs together or separated. Don\'t engage shoulders immediately - keep slightly closed to engage at right moment. Eventually balance with legs on straps.',
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
