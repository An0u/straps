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

// Y positions for skill rows - each row is 90 pixels apart
const generateYPositions = (startY: number, count: number, spacing: number = 90) => {
  return Array.from({ length: count }, (_, i) => startY + (i * spacing));
};

export const skillTreeData: Skill[] = [
  // ============ TWO ARM BRANCH ============
  
  // LEVEL 1 - Root
  {
    id: 'two-arm',
    name: 'Two Arm',
    description: 'Foundation for all two-arm skills. Essential grip and positioning.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1050,
    y: 450,
    connections: ['spin-two', 'static-two', 'swing-two']
  },

  // LEVEL 2 - Main categories
  {
    id: 'spin-two',
    name: 'Spin',
    description: 'Spinning movements and rotations in two-arm positions.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1200,
    y: 0,
    connections: ['normal-two', 'reverse-two', 'center-two']
  },
  {
    id: 'static-two',
    name: 'Static',
    description: 'Two-arm static positions and holds.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1200,
    y: 450,
    connections: ['hanging-two', 'support-two']
  },
  {
    id: 'swing-two',
    name: 'Swing',
    description: 'Swinging movements with two arms.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1200,
    y: 900,
    connections: ['twisting-two', 'rotating-two']
  },

  // LEVEL 3 - Spin subcategories
  {
    id: 'normal-two',
    name: 'Normal',
    description: 'Normal spinning position.',
    prerequisites: ['spin-two'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1350,
    y: -150,
    connections: []
  },
  {
    id: 'reverse-two',
    name: 'Reverse',
    description: 'Reverse spinning position.',
    prerequisites: ['spin-two'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1350,
    y: 0,
    connections: []
  },
  {
    id: 'center-two',
    name: 'Center',
    description: 'Center spinning position.',
    prerequisites: ['spin-two'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1350,
    y: 150,
    connections: []
  },

  // LEVEL 3 - Static subcategories
  {
    id: 'hanging-two',
    name: 'Hanging',
    description: 'Two-arm hanging techniques.',
    prerequisites: ['static-two'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1350,
    y: 300,
    connections: []
  },
  {
    id: 'support-two',
    name: 'Support',
    description: 'Support positions and transitions.',
    prerequisites: ['static-two'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1350,
    y: 450,
    connections: ['support-two-ii']
  },
  {
    id: 'support-two-ii',
    name: 'Support II',
    description: 'Advanced support positions.',
    prerequisites: ['support-two'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1350,
    y: 600,
    connections: []
  },

  // LEVEL 3 - Swing subcategories
  {
    id: 'twisting-two',
    name: 'Twisting',
    description: 'Twisting movements from swing.',
    prerequisites: ['swing-two'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1350,
    y: 750,
    connections: ['twisting-two-ii']
  },
  {
    id: 'twisting-two-ii',
    name: 'Twisting II',
    description: 'Advanced twisting movements.',
    prerequisites: ['twisting-two'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1350,
    y: 900,
    connections: []
  },
  {
    id: 'rotating-two',
    name: 'Rotating',
    description: 'Rotational movements from swing.',
    prerequisites: ['swing-two'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1350,
    y: 1050,
    connections: []
  },

  // ====== TWO ARM SKILLS - Normal Spin (6 skills, left to right, 40px spacing) ======
  {
    id: 'flare-two',
    name: 'Flare',
    description: 'Horizontal flag position performed in rotation. Body tilted to one side with arm tucked to back.',
    prerequisites: ['normal-two'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1500,
    y: -150,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/LngeQfLsL3c'
  },
  {
    id: 'nutcracker-two',
    name: 'Nutcracker',
    description: 'Inverted position with legs separated and turned out. Back stretched pushing hips toward wrist.',
    prerequisites: ['normal-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1620,
    y: -150,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/zKKMrqKPJWY'
  },
  {
    id: 'meathook-two-normal',
    name: 'Meathook',
    description: 'Hanging with legs raised and pelvis lifted to the side. Arm held tight to body.',
    prerequisites: ['normal-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1740,
    y: -150,
    connections: []
  },
  {
    id: 'straightjacket-two',
    name: 'Straightjacket',
    description: 'Arms crossed or wrapped while maintaining rotation. Limited arm mobility.',
    prerequisites: ['normal-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: -150,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/tDNdHqBcsOo?si=Z5XAhNpg1BZ36ylZ'
  },
  {
    id: 'flare-to-flag-two',
    name: 'Flare to Flag',
    description: 'Transition from flare to flag while rotating. Continuous arm rotation from wrist through body.',
    prerequisites: ['normal-two'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1980,
    y: -150,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/Rbs7Kw9xKU0'
  },
  {
    id: 'flare-to-full-two',
    name: 'Flare to Full',
    description: 'Flare transitioning to fully extended position while rotating.',
    prerequisites: ['normal-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2100,
    y: -150,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/Un6PkAhavGQ?si=sqvqQGeKlo5Un5nk'
  },

  // ====== TWO ARM SKILLS - Reverse Spin (2 skills, 40px spacing) ======
  {
    id: 'meathook-two-reverse',
    name: 'Meathook in Reverse',
    description: 'Meathook position with reverse rotation direction.',
    prerequisites: ['reverse-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1500,
    y: 0,
    connections: []
  },
  {
    id: 'straightjacket-two-reverse',
    name: 'Straightjacket in Reverse',
    description: 'Straightjacket position spinning in opposite direction.',
    prerequisites: ['reverse-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1620,
    y: 0,
    connections: []
  },

  // ====== TWO ARM SKILLS - Center Spin (1 skill) ======
  {
    id: 'spinning-muscle-up',
    name: 'Spinning Muscle Up',
    description: 'Muscle-up performed while rotating around central straps axis.',
    prerequisites: ['center-two'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1500,
    y: 150,
    connections: []
  },

  // ====== TWO ARM SKILLS - Hanging (4 skills, 40px spacing) ======
  {
    id: 'two-arm-inversion',
    name: '2 Arm Inversion',
    description: 'Inverted hanging with both arms. Pelvis stretched with feet to ceiling.',
    prerequisites: ['hanging-two'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1500,
    y: 300,
    connections: []
  },
  {
    id: 'two-arm-skin-cat',
    name: '2 Arm Skin the Cat',
    description: 'Shoulder rotation from hanging to inverted. Continuous wrist rotation throughout.',
    prerequisites: ['hanging-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1620,
    y: 300,
    connections: [],
    videoUrl: 'https://youtu.be/3tQap3R4xgQ?si=l6GhHPs_EiXcoTsN'
  },
  {
    id: 'inversion-to-meathook-two',
    name: 'Inversion to Meathook',
    description: 'Transition from inverted position into meathook. Tuck one arm while bringing feet to side.',
    prerequisites: ['hanging-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1740,
    y: 300,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/MsLbJOZAW9M'
  },
  {
    id: 'back-flag',
    name: 'Back Flag',
    description: 'Horizontal back planche position behind the straps. Shallow angle between trunk and arms.',
    prerequisites: ['hanging-two'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 300,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/gOJ4kMs5St8'
  },

  // ====== TWO ARM SKILLS - Support (4 skills on first line, 40px spacing) ======
  {
    id: 'front-balance',
    name: 'Front Balance',
    description: 'Horizontal support with locked grip. Shoulders set back, arms bent, palms up on pelvis.',
    prerequisites: ['support-two'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1500,
    y: 450,
    connections: []
  },
  {
    id: 'side-balance',
    name: 'Side Balance',
    description: 'Support balanced to one side. Weight on one arm with pelvis turned.',
    prerequisites: ['support-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1620,
    y: 450,
    connections: []
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    description: 'Support variation with open shoulders and extended body line.',
    prerequisites: ['support-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1740,
    y: 450,
    connections: []
  },
  {
    id: 'full-to-full',
    name: 'Full to Full',
    description: 'Transition between two fully extended support positions.',
    prerequisites: ['support-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 450,
    connections: []
  },

  // ====== TWO ARM SKILLS - Support II (4 skills on second line, 40px spacing) ======
  {
    id: 'bent-arm-handstand',
    name: 'Bent Arm to Handstand',
    description: 'Press to handstand from bent arms. Raise pelvis above shoulders.',
    prerequisites: ['support-two-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1500,
    y: 600,
    connections: []
  },
  {
    id: 'roll-ups',
    name: 'Roll Ups',
    description: 'Rolling from tucked position, lifting pelvis to place straps above elbows.',
    prerequisites: ['support-two-ii'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1620,
    y: 600,
    connections: []
  },
  {
    id: 'press-handstand',
    name: 'Press Handstand',
    description: 'Controlled press to handstand. Pelvis above shoulders with open shoulders.',
    prerequisites: ['support-two-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1740,
    y: 600,
    connections: []
  },
  {
    id: 'azarian',
    name: 'Azarian',
    description: 'Advanced static strength position. Maltese or iron cross variation.',
    prerequisites: ['support-two-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 600,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=30fUEKLW74M'
  },

  // ====== TWO ARM SKILLS - Twisting (4 skills on first line, 40px spacing) ======
  {
    id: 'pull-to-hips',
    name: 'Pull to Hips',
    description: 'Swinging movement pulling toward hips using momentum.',
    prerequisites: ['twisting-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1500,
    y: 750,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/aoJzgNtjdjQ'
  },
  {
    id: 'swing-to-meathook-two',
    name: 'Swing to Meathook',
    description: 'Using swing momentum to transition into meathook position.',
    prerequisites: ['twisting-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1620,
    y: 750,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=PHtBZWcp0Gg'
  },
  {
    id: 'side-swing-flag',
    name: 'Side Swing to 2 Arm Flag',
    description: 'Lateral swing transitioning to two-arm flag. Control sideways momentum.',
    prerequisites: ['twisting-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1740,
    y: 750,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/qzoISsV5-Zc?si=kgap5Uj5kiOh8x7t'
  },
  {
    id: 'swing-to-full-two',
    name: 'Swing to Full',
    description: 'Swing leading to fully extended position using momentum.',
    prerequisites: ['twisting-two'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 750,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/aCkpDVtMdzM?si=-f0jfaHafW56R9he'
  },

  // ====== TWO ARM SKILLS - Twisting II (6 skills on second line, 40px spacing) ======
  {
    id: 'bell-beats',
    name: 'Bell Beats',
    description: 'Rhythmic swinging similar to rings. Arched position to dish position at vertical.',
    prerequisites: ['twisting-two-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1500,
    y: 900,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=py7b6Q04-nQ'
  },
  {
    id: 'to-plank',
    name: 'To Plank',
    description: 'Swing transitioning to horizontal plank position using momentum.',
    prerequisites: ['twisting-two-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1620,
    y: 900,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=aoJzgNtjdjQ'
  },
  {
    id: 'side-push-pull',
    name: 'Side Push Pull',
    description: 'Lateral swinging with pushing and pulling actions.',
    prerequisites: ['twisting-two-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1740,
    y: 900,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/aoJzgNtjdjQ'
  },
  {
    id: 'half-turn',
    name: 'Half Turn',
    description: '180-degree rotation during swing. Turn initiated by feet at peak.',
    prerequisites: ['twisting-two-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 900,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=UQ0fme2tGIo'
  },
  {
    id: 'pirouette-two',
    name: 'Pirouette',
    description: 'Full 360-degree rotation during swing phase.',
    prerequisites: ['twisting-two-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1980,
    y: 900,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/cxdtl4LmyeY?si=d2DZsl8ll79fUTOt'
  },
  {
    id: 'swing-to-handstand',
    name: 'Swing to Handstand',
    description: 'Using swing momentum to transition into handstand.',
    prerequisites: ['twisting-two-ii'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 2100,
    y: 900,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=CmCYdpXLccM'
  },

  // ====== TWO ARM SKILLS - Rotating (8 skills, 40px spacing) ======
  {
    id: 'armpit-beats',
    name: 'Armpit Beats',
    description: 'Swinging with straps in armpit area. Different rotation axis.',
    prerequisites: ['rotating-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1500,
    y: 1050,
    connections: []
  },
  {
    id: 'disloc-two',
    name: 'Disloc',
    description: 'Shoulder rotation backward through full range. Continuous wrist rotation.',
    prerequisites: ['rotating-two'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1620,
    y: 1050,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/uFZ2-c1vePE?si=NNe87_Q2NvrFPEfP'
  },
  {
    id: 'inloc-two',
    name: 'Inloc',
    description: 'Forward shoulder rotation. Body passes forward through arms.',
    prerequisites: ['rotating-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1740,
    y: 1050,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/G5TW1kj028g'
  },
  {
    id: 'giants',
    name: 'Giants',
    description: 'Full 360-degree rotations around straps axis. Continuous circular swinging.',
    prerequisites: ['rotating-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 1050,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/CSCpzHYiBqA?si=d3td_sI2NW6nMx5c'
  },
  {
    id: 'inloc-giants',
    name: 'Inloc Giants',
    description: 'Giant swings with forward shoulder rotation pattern.',
    prerequisites: ['rotating-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1980,
    y: 1050,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/6zuzT9qCQlk?si=U1gfY5vPGEtA-V4H'
  },
  {
    id: 'back-salto',
    name: 'Back Salto',
    description: 'Backward somersault, likely with release or loose grip.',
    prerequisites: ['rotating-two'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 2100,
    y: 1050,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/uFZ2-c1vePE'
  },
  {
    id: 'delchev',
    name: 'Delchev',
    description: 'Named skill involving release and re-catch with rotation.',
    prerequisites: ['rotating-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2220,
    y: 1050,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/ggkSz6urQko?si=b77McRYXk1niVMXp'
  },
  {
    id: 'yamawaki',
    name: 'Yamawaki',
    description: 'Named gymnastics skill adapted to straps. Specific rotation pattern.',
    prerequisites: ['rotating-two'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2340,
    y: 1050,
    connections: []
  },

  // ============ ONE ARM BRANCH ============
  
  // LEVEL 1 - Root
  {
    id: 'one-arm',
    name: 'One Arm',
    description: 'Foundation for all one-arm skills. Master single arm grip and control.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 870,
    y: 450,
    connections: ['spin-one', 'static-one', 'swing-one']
  },

  // LEVEL 2 - Main categories
  {
    id: 'spin-one',
    name: 'Spin',
    description: 'Spinning from hang position. Dynamic movement skills.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 720,
    y: 0,
    connections: ['center-one', 'reverse-one', 'normal-one']
  },
  {
    id: 'static-one',
    name: 'Static',
    description: 'Static holds and positions. Focus on stability and control.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 720,
    y: 450,
    connections: ['hanging-one']
  },
  {
    id: 'swing-one',
    name: 'Swing',
    description: 'Swinging from rotation. Momentum-based skills.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 720,
    y: 900,
    connections: ['basics-one', 'twisting-one', 'rotating-one']
  },

  // LEVEL 3 - Spin subcategories
  {
    id: 'center-one',
    name: 'Center',
    description: 'Advanced cruiser position. Signature skill for flow.',
    prerequisites: ['spin-one'],
    type: 'category',
    state: 'active',
    x: 570,
    y: -150,
    connections: []
  },
  {
    id: 'reverse-one',
    name: 'Reverse',
    description: 'Inverted hanging position. Builds core and grip.',
    prerequisites: ['spin-one'],
    type: 'category',
    state: 'active',
    x: 570,
    y: 0,
    connections: []
  },
  {
    id: 'normal-one',
    name: 'Normal',
    description: 'Standard hanging position. Entry point for hang variations.',
    prerequisites: ['spin-one'],
    type: 'category',
    state: 'active',
    x: 570,
    y: 150,
    connections: []
  },

  // LEVEL 3 - Static subcategories
  {
    id: 'hanging-one',
    name: 'Hanging',
    description: 'Hanging positions using one arm. Build endurance and grip strength.',
    prerequisites: ['static-one'],
    type: 'category',
    state: 'active',
    x: 570,
    y: 450,
    connections: []
  },

  // LEVEL 3 - Swing subcategories
  {
    id: 'basics-one',
    name: 'Basics',
    description: 'Fundamental movements and positions. Essential foundation.',
    prerequisites: ['swing-one'],
    type: 'category',
    state: 'active',
    x: 570,
    y: 750,
    connections: []
  },
  {
    id: 'twisting-one',
    name: 'Twisting',
    description: 'Twisting movements from rotation. Advanced coordination.',
    prerequisites: ['swing-one'],
    type: 'category',
    state: 'active',
    x: 570,
    y: 900,
    connections: []
  },
  {
    id: 'rotating-one',
    name: 'Rotating',
    description: 'Rotating movements and spins. Dynamic one-arm rotations.',
    prerequisites: ['swing-one'],
    type: 'category',
    state: 'active',
    x: 570,
    y: 1050,
    connections: ['rotating-one-ii']
  },
  {
    id: 'rotating-one-ii',
    name: 'Rotating II',
    description: 'Advanced rotating movements.',
    prerequisites: ['rotating-one'],
    type: 'category',
    state: 'active',
    x: 570,
    y: 1200,
    connections: []
  },

  // ====== ONE ARM SKILLS - Center Spin (3 skills, RIGHT to LEFT, 40px spacing) ======
  {
    id: 'center-spin',
    name: 'Center Spin',
    description: 'One-arm rotation around the vertical axis with body spinning in the center between the straps.',
    prerequisites: ['center-one'],
    type: 'key',
    state: 'inactive',
    x: 420,
    y: -150,
    connections: []
  },
  {
    id: 'nugget',
    name: 'Nugget',
    description: 'A compact one-arm spinning position with the body close to the suspended arm.',
    prerequisites: ['center-one'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: -150,
    connections: []
  },
  {
    id: 'scorpion',
    name: 'Scorpion',
    description: 'One-arm spinning position with back arched and one leg bent upward resembling a scorpion\'s tail.',
    prerequisites: ['center-one'],
    type: 'regular',
    state: 'inactive',
    x: 180,
    y: -150,
    connections: []
  },

  // ====== ONE ARM SKILLS - Reverse Spin (8 skills, RIGHT to LEFT, 40px spacing) ======
  {
    id: 'meathook-one',
    name: 'Meathook',
    description: 'One-arm position with closed legs raised to the side; hanging arm held tightly to body.',
    prerequisites: ['reverse-one'],
    type: 'key',
    state: 'inactive',
    x: 420,
    y: 0,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/UiYRfphWzLk'
  },
  {
    id: 'split-grip-flag',
    name: 'Split Grip to Flag',
    description: 'Transition from split grip position into one-arm flag while spinning in reverse.',
    prerequisites: ['reverse-one'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 0,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/obGJr1S9g9E'
  },
  {
    id: 'split-grip-full',
    name: 'Split Grip to Full',
    description: 'Transition from split grip to full rotation/inversion while spinning in reverse.',
    prerequisites: ['reverse-one'],
    type: 'regular',
    state: 'inactive',
    x: 180,
    y: 0,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/vYUrKNzxiVA?si=M4pha7tXNSrOL-KO'
  },
  {
    id: 'flare-lockoff',
    name: 'Flare to Lockoff',
    description: 'Dynamic flaring movement transitioning to locked static hold while spinning in reverse.',
    prerequisites: ['reverse-one'],
    type: 'key',
    state: 'inactive',
    x: 60,
    y: 0,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/COJg5yzvEH0'
  },
  {
    id: 'beat-one-arm',
    name: 'Beat to 1 Arm',
    description: 'Swinging movement transitioning into one-arm hang while spinning in reverse.',
    prerequisites: ['reverse-one'],
    type: 'regular',
    state: 'inactive',
    x: -60,
    y: 0,
    connections: []
  },
  {
    id: 'reverse-flag',
    name: 'Reverse Flag',
    description: 'One-arm flag position performed with reverse/backward rotation.',
    prerequisites: ['reverse-one'],
    type: 'regular',
    state: 'inactive',
    x: -180,
    y: 0,
    connections: []
  },
  {
    id: 'reverse-full',
    name: 'Reverse Full',
    description: 'Complete rotation performed in reverse direction on one arm.',
    prerequisites: ['reverse-one'],
    type: 'key',
    state: 'inactive',
    x: -300,
    y: 0,
    connections: []
  },
  {
    id: 'reverse-mushu',
    name: 'Reverse Mushu',
    description: 'Mushu position executed with reverse spin direction.',
    prerequisites: ['reverse-one'],
    type: 'regular',
    state: 'inactive',
    x: -420,
    y: 0,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/vYUrKNzxiVA?si=M4pha7tXNSrOL-KO'
  },

  // ====== ONE ARM SKILLS - Normal Spin (10 skills, RIGHT to LEFT, 40px spacing) ======
  {
    id: 'flare-one',
    name: 'Flare',
    description: 'Dynamic swinging movement with body extended horizontally while spinning.',
    prerequisites: ['normal-one'],
    type: 'key',
    state: 'inactive',
    x: 420,
    y: 150,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/oB5ib9u2fT4'
  },
  {
    id: 'nutcracker-one',
    name: 'Nutcracker',
    description: 'One-arm position with legs separated and turned out; back stretched upward.',
    prerequisites: ['normal-one'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 150,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/Freat_9N9FQ'
  },
  {
    id: 'reverse-meathook',
    name: 'Reverse Meathook',
    description: 'Meathook position with opposite rotation direction.',
    prerequisites: ['normal-one'],
    type: 'regular',
    state: 'inactive',
    x: 180,
    y: 150,
    connections: []
  },
  {
    id: 'flare-to-flag-one',
    name: 'Flare to Flag',
    description: 'Dynamic flaring movement transitioning into one-arm flag position.',
    prerequisites: ['normal-one'],
    type: 'key',
    state: 'inactive',
    x: 60,
    y: 150,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/FSWWEqdo3o8'
  },
  {
    id: 'low-switch',
    name: 'Low Switch',
    description: 'Transition between positions executed at lower height while spinning.',
    prerequisites: ['normal-one'],
    type: 'regular',
    state: 'inactive',
    x: -60,
    y: 150,
    connections: []
  },
  {
    id: 'nutcracker-switch',
    name: 'Nutcracker Switch',
    description: 'Transition involving nutcracker position while maintaining rotation.',
    prerequisites: ['normal-one'],
    type: 'regular',
    state: 'inactive',
    x: -180,
    y: 150,
    connections: []
  },
  {
    id: 'high-switch-one',
    name: 'High Switch',
    description: 'Fast transition between meathook and flag at peak of movement.',
    prerequisites: ['normal-one'],
    type: 'regular',
    state: 'inactive',
    x: -300,
    y: 150,
    connections: []
  },
  {
    id: 'full-one',
    name: 'Full',
    description: 'Complete 360-degree rotation on one arm.',
    prerequisites: ['normal-one'],
    type: 'key',
    state: 'inactive',
    x: -420,
    y: 150,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/wU1eGKGhEtw'
  },
  {
    id: 'mushu',
    name: 'Mushu',
    description: 'One-arm horizontal position similar to flag with specific body configuration.',
    prerequisites: ['normal-one'],
    type: 'regular',
    state: 'inactive',
    x: -540,
    y: 150,
    connections: []
  },
  {
    id: 'double-full',
    name: 'Double Full',
    description: 'Two complete 360-degree rotations performed consecutively on one arm.',
    prerequisites: ['normal-one'],
    type: 'regular',
    state: 'inactive',
    x: -660,
    y: 150,
    connections: []
  },

  // ====== ONE ARM SKILLS - Hanging (5 skills, RIGHT to LEFT, 40px spacing) ======
  {
    id: 'straddle-rock-flag',
    name: 'Straddle Rock to Flag',
    description: 'Movement from straddle position rocking into one-arm flag.',
    prerequisites: ['hanging-one'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 450,
    connections: []
  },
  {
    id: 'high-switch-static',
    name: 'High Switch',
    description: 'Transition from meathook to flag through vertical alignment.',
    prerequisites: ['hanging-one'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 450,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/ijT5BrdM0tg'
  },
  {
    id: 'inversion-one',
    name: 'Inversion',
    description: 'One-arm inverted position with body hanging upside down.',
    prerequisites: ['hanging-one'],
    type: 'regular',
    state: 'inactive',
    x: 180,
    y: 450,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/HiTTJftm8Bk'
  },
  {
    id: 'inversion-meathook',
    name: 'Inversion to Meathook',
    description: 'Transition from inverted position down into meathook.',
    prerequisites: ['hanging-one'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 450,
    connections: []
  },
  {
    id: 'inversion-flag',
    name: 'Inversion to Flag',
    description: 'Transition from inverted position into flag.',
    prerequisites: ['hanging-one'],
    type: 'regular',
    state: 'inactive',
    x: -60,
    y: 450,
    connections: []
  },

  // ====== ONE ARM SKILLS - Basics (2 skills, RIGHT to LEFT, 40px spacing) ======
  {
    id: 'front-to-front',
    name: 'Front to Front',
    description: 'Basic one-arm swinging movement from front position back to front.',
    prerequisites: ['basics-one'],
    type: 'key',
    state: 'inactive',
    x: 420,
    y: 750,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/Z36ukVFnBko'
  },
  {
    id: 'front-to-side',
    name: 'Front to Side',
    description: 'One-arm swing transitioning from front-facing to side-facing position.',
    prerequisites: ['basics-one'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 750,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/qzoISsV5-Zc?si=kgap5Uj5kiOh8x7t'
  },

  // ====== ONE ARM SKILLS - Twisting (6 skills, RIGHT to LEFT, 40px spacing) ======
  {
    id: 'inside-pirouette',
    name: 'Inside Pirouette',
    description: 'Half turn initiated by feet at furthest swing point; body rotates inward.',
    prerequisites: ['twisting-one'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 900,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/jkp_BVnO4vA'
  },
  {
    id: 'reverse-soleil',
    name: 'Reverse Soleil',
    description: 'Twisting movement performed in reverse direction.',
    prerequisites: ['twisting-one'],
    type: 'key',
    state: 'inactive',
    x: 300,
    y: 900,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/BJDNpk6f0BM?si=UgI9waZNerQ1KHJ3'
  },
  {
    id: 'soleil',
    name: 'Soleil',
    description: 'Twisting swing movement where body rotates around suspended arm.',
    prerequisites: ['twisting-one'],
    type: 'regular',
    state: 'inactive',
    x: 180,
    y: 900,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/u8FwOq0WFXc'
  },
  {
    id: 'outside-pirouette',
    name: 'Outside Pirouette',
    description: 'Half turn rotation where body turns outward away from suspended arm.',
    prerequisites: ['twisting-one'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 900,
    connections: []
  },
  {
    id: 'swing-to-flag',
    name: 'Swing to Flag',
    description: 'Swinging movement that culminates in a flag position.',
    prerequisites: ['twisting-one'],
    type: 'regular',
    state: 'inactive',
    x: -60,
    y: 900,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/9h72wmKI0RY?si=XBmDrDAxc2GtuhhP'
  },
  {
    id: 'swing-to-mushu',
    name: 'Swing to Mushu',
    description: 'One-arm swing transitioning into Mushu position.',
    prerequisites: ['twisting-one'],
    type: 'regular',
    state: 'inactive',
    x: -180,
    y: 900,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/PQ9u_RVRfUg'
  },

  // ====== ONE ARM SKILLS - Rotating (5 skills, RIGHT to LEFT, 40px spacing) ======
  {
    id: 'back-one',
    name: 'Back',
    description: 'Backward swinging movement on one arm.',
    prerequisites: ['rotating-one'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 1050,
    connections: []
  },
  {
    id: 'disloc-one',
    name: 'Disloc',
    description: 'Dislocate movement on one arm; outward rotation allowing body to swing opposite side.',
    prerequisites: ['rotating-one'],
    type: 'key',
    state: 'inactive',
    x: 300,
    y: 1050,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/8NfijlpC99A'
  },
  {
    id: 'salto',
    name: 'Salto',
    description: 'Somersault/flip performed while swinging on one arm.',
    prerequisites: ['rotating-one'],
    type: 'regular',
    state: 'inactive',
    x: 180,
    y: 1050,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/ENIyf9XwSAg?si=XChsRB-e6sIWkI4O'
  },
  {
    id: 'one-half-salto',
    name: '1.5 Arm Salto',
    description: 'One and a half somersault rotation performed on one arm.',
    prerequisites: ['rotating-one'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 1050,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/PNBN6wlqCuw?si=e1JLkU9KILCs1huF'
  },
  {
    id: 'double-salto',
    name: 'Double Salto',
    description: 'Two complete somersaults performed consecutively on one arm.',
    prerequisites: ['rotating-one'],
    type: 'regular',
    state: 'inactive',
    x: -60,
    y: 1050,
    connections: []
  },

  // ====== ONE ARM SKILLS - Rotating II (3 skills on second line, RIGHT to LEFT, 40px spacing) ======
  {
    id: 'front-one',
    name: 'Front',
    description: 'Forward swinging rotation on one arm.',
    prerequisites: ['rotating-one-ii'],
    type: 'regular',
    state: 'inactive',
    x: 420,
    y: 1200,
    connections: []
  },
  {
    id: 'inloc-one',
    name: 'Inloc',
    description: 'Inlocate movement - inward rotation pattern during swing.',
    prerequisites: ['rotating-one-ii'],
    type: 'regular',
    state: 'inactive',
    x: 300,
    y: 1200,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/AGgargIWLX4?si=ItbhaMgTReC2ThFE'
  },
  {
    id: 'double-front',
    name: 'Double Front',
    description: 'Two forward rotations performed in sequence on one arm.',
    prerequisites: ['rotating-one-ii'],
    type: 'regular',
    state: 'inactive',
    x: 180,
    y: 1200,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/tR2kE-mkF5o'
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