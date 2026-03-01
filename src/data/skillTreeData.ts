/*
 * ============================================================================
 * COMPLETE DIRECTIONAL LOGIC WITH RHOMBUS CENTER AND NON-OVERLAPPING GROUPS
 * ============================================================================
 * 
 * RHOMBUS CENTER STRUCTURE
 * ------------------------
 * The skill tree originates from a central rhombus positioned at the page center.
 * The rhombus has four corners positioned at cardinal directions: TOP, RIGHT, BOTTOM, and LEFT.
 * Each corner serves as an anchor point where a Level 1 node group begins.
 * A node group consists of a Level 1 node (category) and ALL its descendant nodes (Level 2, 3, and 4 children).
 * 
 * Rhombus Layout:
 * - TOP corner: Reserved for future expansion or central navigation
 * - RIGHT corner: 'Two Arm' category group flows RIGHT (left-to-right)
 * - BOTTOM corner: 'C-Shaping' category group flows DOWN (top-to-bottom)
 * - LEFT corner: 'One Arm' category group flows LEFT (right-to-left)
 * 
 * Each Level 1 node is positioned at its respective rhombus corner, and its entire
 * descendant hierarchy extends outward in the designated direction.
 * 
 * ============================================================================
 * RIGHT DIRECTION (Two Arm Category - from RIGHT corner)
 * ============================================================================
 * 
 * Flow: Level 1 → Level 2 (right) → Level 3 (right) → Level 4 chain (right, +150px each)
 * Level 4 chains: horizontal, x starts at 1710, step +150. y fixed per L3.
 * 
 * ============================================================================
 * LEFT DIRECTION (One Arm Category - from LEFT corner)
 * ============================================================================
 * 
 * Flow: Level 1 → Level 2 (left) → Level 3 (left) → Level 4 chain (left, -150px each)
 * Level 4 chains: horizontal, x starts at 210, step -150. y fixed per L3.
 * 
 * ============================================================================
 * DOWN DIRECTION (C-Shaping Category - from BOTTOM corner)
 * ============================================================================
 * 
 * Flow: Level 1 → Level 2 (down) → Level 3 (down) → Level 4 chain (down, +150px each)
 * Level 4 chains: vertical, x fixed at 960, y starts at 1610, step +150.
 * 
 * ============================================================================
 * UP DIRECTION (Future Expansion - from TOP corner)
 * ============================================================================
 * Reserved. Any new L1 category flows upward from the TOP rhombus corner.
 * 
 * ============================================================================
 * SPACING AND CONNECTION RULES
 * ============================================================================
 * - L1 → L2: straight lines
 * - L2 → L3: straight lines
 * - L3 → first L4 only: straight line; rest of chain is sequential L4 → L4
 * - L4 chain: each skill connects forward to the next (singly linked)
 * - Key skills (type: 'key'): isGoldBorder = true, yellow glow in UI
 * - isBlue = true for Two Arm skills, false for One Arm / C-Shaping
 * 
 * NODE SCHEMA
 * -----------
 * id          — unique slug identifier
 * name        — display name
 * description — skill description
 * prerequisites — parent node ids (used for lock/unlock logic)
 * type        — 'category' | 'regular' | 'key'
 * state       — 'active' | 'inactive'
 * isGoldBorder — true for key skills
 * isBlue      — true for Two Arm branch
 * x, y        — absolute canvas position in pixels
 * connections — child node ids (what this node unlocks)
 * videoUrl    — optional YouTube link
 * ============================================================================
 */

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

  // ── LEVEL 1 ─────────────────────────────────────────────────────────────────
  {
    id: 'two-arm',
    name: 'Two Arm',
    description: 'Foundation for all two arm skills.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1050,
    y: 450,
    connections: ['two-spin', 'two-static', 'two-swing']
  },
  {
    id: 'one-arm',
    name: 'One Arm',
    description: 'Foundation for all one arm skills.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 870,
    y: 450,
    connections: ['one-spin', 'one-static', 'one-swing']
  },
  {
    id: 'c-shaping',
    name: 'C-Shaping',
    description: 'Foundation for all c-shaping skills.',
    prerequisites: [],
    type: 'category',
    state: 'active',
    x: 960,
    y: 1200,
    connections: ['c-shaping-static']
  },
  {
    id: 'armpit-skills',
    name: 'Armpit Skills',
    description: '',
    prerequisites: [],
    type: 'category',
    state: 'inactive',
    x: 960,
    y: -150,
    connections: []
  },

  // ── LEVEL 2 — Two Arm ────────────────────────────────────────────────────────
  {
    id: 'two-spin',
    name: 'Spin',
    description: 'Spin movements and positions.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1300,
    y: 75,
    connections: ['two-spin-normal', 'two-spin-reverse', 'two-spin-center']
  },
  {
    id: 'two-static',
    name: 'Static',
    description: 'Static movements and positions.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1300,
    y: 525,
    connections: ['two-static-hanging', 'two-static-support', 'two-static-support-ii']
  },
  {
    id: 'two-swing',
    name: 'Swing',
    description: 'Swing movements and positions.',
    prerequisites: ['two-arm'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1300,
    y: 975,
    connections: ['two-swing-twisting', 'two-swing-twisting-ii', 'two-swing-rotating']
  },

  // ── LEVEL 2 — One Arm ────────────────────────────────────────────────────────
  {
    id: 'one-spin',
    name: 'Spin',
    description: 'Spin movements and positions.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 620,
    y: 75,
    connections: ['one-spin-center', 'one-spin-reverse', 'one-spin-normal']
  },
  {
    id: 'one-static',
    name: 'Static',
    description: 'Static movements and positions.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 620,
    y: 450,
    connections: ['one-static-hanging']
  },
  {
    id: 'one-swing',
    name: 'Swing',
    description: 'Swing movements and positions.',
    prerequisites: ['one-arm'],
    type: 'category',
    state: 'active',
    x: 620,
    y: 888,
    connections: ['one-swing-basics', 'one-swing-twisting', 'one-swing-rotating', 'one-swing-rotating-ii']
  },

  // ── LEVEL 2 — C-Shaping ──────────────────────────────────────────────────────
  {
    id: 'c-shaping-static',
    name: 'Static',
    description: 'Static movements and positions.',
    prerequisites: ['c-shaping'],
    type: 'category',
    state: 'active',
    x: 960,
    y: 1450,
    connections: ['front-c']
  },

  // ── LEVEL 3 — Two Arm Spin ───────────────────────────────────────────────────
  {
    id: 'two-spin-normal',
    name: 'Normal',
    description: 'Normal techniques.',
    prerequisites: ['two-spin'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1550,
    y: -75,
    connections: ['flare']
  },
  {
    id: 'two-spin-reverse',
    name: 'Reverse',
    description: 'Reverse techniques.',
    prerequisites: ['two-spin'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1550,
    y: 75,
    connections: ['meathook-in-reverse']
  },
  {
    id: 'two-spin-center',
    name: 'Center',
    description: 'Center techniques.',
    prerequisites: ['two-spin'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1550,
    y: 225,
    connections: ['spinning-muscle-up']
  },

  // ── LEVEL 3 — Two Arm Static ─────────────────────────────────────────────────
  {
    id: 'two-static-hanging',
    name: 'Hanging',
    description: 'Hanging techniques.',
    prerequisites: ['two-static'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1550,
    y: 375,
    connections: ['2-arm-inversion']
  },
  {
    id: 'two-static-support',
    name: 'Support',
    description: 'Support techniques.',
    prerequisites: ['two-static'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1550,
    y: 525,
    connections: ['front-balance']
  },
  {
    id: 'two-static-support-ii',
    name: 'Support Ii',
    description: 'Support Ii techniques.',
    prerequisites: ['two-static'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1550,
    y: 675,
    connections: ['bent-arm-to-handstand']
  },

  // ── LEVEL 3 — Two Arm Swing ──────────────────────────────────────────────────
  {
    id: 'two-swing-twisting',
    name: 'Twisting',
    description: 'Twisting techniques.',
    prerequisites: ['two-swing'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1550,
    y: 825,
    connections: ['pull-to-hips']
  },
  {
    id: 'two-swing-twisting-ii',
    name: 'Twisting Ii',
    description: 'Twisting Ii techniques.',
    prerequisites: ['two-swing'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1550,
    y: 975,
    connections: ['bell-beats']
  },
  {
    id: 'two-swing-rotating',
    name: 'Rotating',
    description: 'Rotating techniques.',
    prerequisites: ['two-swing'],
    type: 'category',
    state: 'active',
    isBlue: true,
    x: 1550,
    y: 1125,
    connections: ['armpit-beats']
  },

  // ── LEVEL 3 — One Arm Spin ───────────────────────────────────────────────────
  {
    id: 'one-spin-center',
    name: 'Center',
    description: 'Center techniques.',
    prerequisites: ['one-spin'],
    type: 'category',
    state: 'active',
    x: 370,
    y: -75,
    connections: ['center-spin'],
	videoUrl:'https://youtube.com/shorts/H4ozywL45I8?si=tlsbjtUt5yOwcpXZ',
  },
  {
    id: 'one-spin-reverse',
    name: 'Reverse',
    description: 'Reverse techniques.',
    prerequisites: ['one-spin'],
    type: 'category',
    state: 'active',
    x: 370,
    y: 75,
    connections: ['meathook-1']
  },
  {
    id: 'one-spin-normal',
    name: 'Normal',
    description: 'Normal techniques.',
    prerequisites: ['one-spin'],
    type: 'category',
    state: 'active',
    x: 370,
    y: 225,
    connections: ['flare-1']
  },

  // ── LEVEL 3 — One Arm Static ─────────────────────────────────────────────────
  {
    id: 'one-static-hanging',
    name: 'Hanging',
    description: 'Hanging techniques.',
    prerequisites: ['one-static'],
    type: 'category',
    state: 'active',
    x: 370,
    y: 450,
    connections: ['straddle-rock-to-flag']
  },

  // ── LEVEL 3 — One Arm Swing ──────────────────────────────────────────────────
  {
    id: 'one-swing-basics',
    name: 'Basics',
    description: 'Basics techniques.',
    prerequisites: ['one-swing'],
    type: 'category',
    state: 'active',
    x: 370,
    y: 663,
    connections: ['front-to-front']
  },
  {
    id: 'one-swing-twisting',
    name: 'Twisting',
    description: 'Twisting techniques.',
    prerequisites: ['one-swing'],
    type: 'category',
    state: 'active',
    x: 370,
    y: 813,
    connections: ['inside-pirouette']
  },
  {
    id: 'one-swing-rotating',
    name: 'Rotating',
    description: 'Rotating techniques.',
    prerequisites: ['one-swing'],
    type: 'category',
    state: 'active',
    x: 370,
    y: 963,
    connections: ['back']
  },
  {
    id: 'one-swing-rotating-ii',
    name: 'Rotating Ii',
    description: 'Rotating Ii techniques.',
    prerequisites: ['one-swing'],
    type: 'category',
    state: 'active',
    x: 370,
    y: 1113,
    connections: ['front']
  },

  // ── LEVEL 4 — two-spin-normal chain ─────────────────────────────────────────────────
  {
    id: 'flare',
    name: 'Flare',
    description: 'Horizontal Flag position performed in rotation. Body tilted to one side with arm tucked to back.',
    prerequisites: ['two-spin-normal'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    isGoldBorder: true,
    x: 1710,
    y: -75,
    connections: ['nutcracker'],
    videoUrl: 'https://youtube.com/shorts/LngeQfLsL3c',
  },
  {
    id: 'nutcracker',
    name: 'Nutcracker',
    description: 'Inverted position with legs separated and turned out. Back stretched pushing hips toward wrist.',
    prerequisites: ['two-spin-normal'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: -75,
    connections: ['meathook'],
    videoUrl: 'https://youtube.com/shorts/zKKMrqKPJWY',
  },
  {
    id: 'meathook',
    name: 'Meathook',
    description: 'Hanging with legs raised and pelvis lifted to the side. Arm held tight to body.',
    prerequisites: ['two-spin-normal'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2010,
    y: -75,
    connections: ['straightjacket'],
    videoUrl: 'https://www.youtube.com/watch?v=MsLbJOZAW9M',
  },
  {
    id: 'straightjacket',
    name: 'Straightjacket',
    description: 'Arms crossed or wrapped while maintaining rotation. Limited arm mobility.',
    prerequisites: ['two-spin-normal'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2160,
    y: -75,
    connections: ['flare-to-flag'],
    videoUrl: 'https://youtube.com/shorts/tDNdHqBcsOo?si=Z5XAhNpg1BZ36ylZ',
  },
  {
    id: 'flare-to-flag',
    name: 'Flare To Flag',
    description: 'Transition from flare to Flag while rotating. Continuous arm rotation from wrist through body.',
    prerequisites: ['two-spin-normal'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    isGoldBorder: true,
    x: 2310,
    y: -75,
    connections: ['flare-to-full'],
    videoUrl: 'https://youtube.com/shorts/Rbs7Kw9xKU0',
  },
  {
    id: 'flare-to-full',
    name: 'Flare To Full',
    description: 'Flare transitioning to fully extended position while rotating.',
    prerequisites: ['two-spin-normal'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2460,
    y: -75,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/Un6PkAhavGQ?si=sqvqQGeKlo5Un5nk',
  },

  // ── LEVEL 4 — two-spin-reverse chain ─────────────────────────────────────────────────
  {
    id: 'meathook-in-reverse',
    name: 'Meathook In Reverse',
    description: 'Meathook position with reverse rotation direction.',
    prerequisites: ['two-spin-reverse'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1710,
    y: 75,
    connections: ['straightjacket-in-reverse'],
  },
  {
    id: 'straightjacket-in-reverse',
    name: 'Straightjacket In Reverse',
    description: 'Straightjacket position spinning in opposite direction.',
    prerequisites: ['two-spin-reverse'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 75,
    connections: [],
  },

  // ── LEVEL 4 — two-spin-center chain ─────────────────────────────────────────────────
  {
    id: 'spinning-muscle-up',
    name: 'Spinning Muscle Up',
    description: 'Muscle-up performed while rotating around central straps axis.',
    prerequisites: ['two-spin-center'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1710,
    y: 225,
    connections: [],
	videoUrl:'https://youtube.com/shorts/uWyEd6r3eOY?si=GxIngbc9z_YDafbg',
  },

  // ── LEVEL 4 — two-static-hanging chain ─────────────────────────────────────────────────
  {
    id: '2-arm-inversion',
    name: '2 Arm Inversion',
    description: 'Inverted hanging with both arms. Pelvis stretched with feet to ceiling.',
    prerequisites: ['two-static-hanging'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    isGoldBorder: true,
    x: 1710,
    y: 375,
    connections: ['2-arm-skin-the-cat'],
  },
  {
    id: '2-arm-skin-the-cat',
    name: '2 Arm Skin The Cat',
    description: 'Shoulder rotation from hanging to inverted. Continuous wrist rotation throughout.',
    prerequisites: ['two-static-hanging'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 375,
    connections: ['inversion-to-methook'],
    videoUrl: 'https://youtu.be/3tQap3R4xgQ?si=l6GhHPs_EiXcoTsN',
  },
  {
    id: 'inversion-to-methook',
    name: 'Inversion To Methook',
    description: 'Transition from inverted position into meathook. Tuck one arm while bringing feet to side.',
    prerequisites: ['two-static-hanging'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2010,
    y: 375,
    connections: ['back-flag'],
    videoUrl: 'https://youtube.com/shorts/MsLbJOZAW9M',
  },
  {
    id: 'back-flag',
    name: 'Back Flag',
    description: 'Horizontal back planche position behind the straps. Shallow angle between trunk and arms.',
    prerequisites: ['two-static-hanging'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    isGoldBorder: true,
    x: 2160,
    y: 375,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/gOJ4kMs5St8',
  },

  // ── LEVEL 4 — two-static-support chain ─────────────────────────────────────────────────
  {
    id: 'front-balance',
    name: 'Front Balance',
    description: 'Horizontal support with locked grip. Shoulders set back, arms bent, palms up on pelvis.',
    prerequisites: ['two-static-support'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1710,
    y: 525,
    connections: ['side-balance'],
  },
  {
    id: 'side-balance',
    name: 'Side Balance',
    description: 'Support balanced to one side. Weight on one arm with pelvis turned.',
    prerequisites: ['two-static-support'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 525,
    connections: ['butterfly'],
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    description: 'Support variation with open shoulders and extended body line.',
    prerequisites: ['two-static-support'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2010,
    y: 525,
    connections: ['full-to-full'],
  },
  {
    id: 'full-to-full',
    name: 'Full To Full',
    description: 'Transition between two fully extended support positions.',
    prerequisites: ['two-static-support'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2160,
    y: 525,
    connections: [],
  },

  // ── LEVEL 4 — two-static-support-ii chain ─────────────────────────────────────────────────
  {
    id: 'bent-arm-to-handstand',
    name: 'Bent Arm To Handstand',
    description: 'Press to handstand from bent arms. Raise pelvis above shoulders.',
    prerequisites: ['two-static-support-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1710,
    y: 675,
    connections: ['roll-ups'],
  },
  {
    id: 'roll-ups',
    name: 'Roll Ups',
    description: 'Rolling from tucked position, lifting pelvis to place straps above elbows.',
    prerequisites: ['two-static-support-ii'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    isGoldBorder: true,
    x: 1860,
    y: 675,
    connections: ['press-handstand'],
  },
  {
    id: 'press-handstand',
    name: 'Press Handstand',
    description: 'Controlled press to handstand. Pelvis above shoulders with open shoulders.',
    prerequisites: ['two-static-support-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2010,
    y: 675,
    connections: ['azarian'],
  },
  {
    id: 'azarian',
    name: 'Azarian',
    description: 'Advanced static strength position. Maltese or iron cross variation.',
    prerequisites: ['two-static-support-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2160,
    y: 675,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=30fUEKLW74M',
  },

  // ── LEVEL 4 — two-swing-twisting chain ─────────────────────────────────────────────────
  {
    id: 'pull-to-hips',
    name: 'Pull To Hips',
    description: 'Swinging movement pulling toward hips using momentum.',
    prerequisites: ['two-swing-twisting'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1710,
    y: 825,
    connections: ['swing-to-meathook'],
    videoUrl: 'https://youtube.com/shorts/aoJzgNtjdjQ',
  },
  {
    id: 'swing-to-meathook',
    name: 'Swing To Meathook',
    description: 'Using swing momentum to transition into meathook position.',
    prerequisites: ['two-swing-twisting'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 825,
    connections: ['side-swing-to-2-arm-flag'],
    videoUrl: 'https://www.youtube.com/watch?v=PHtBZWcp0Gg',
  },
  {
    id: 'side-swing-to-2-arm-flag',
    name: 'Side Swing To 2 Arm Flag',
    description: 'Lateral swing transitioning to two-arm Flag. Control sideways momentum.',
    prerequisites: ['two-swing-twisting'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2010,
    y: 825,
    connections: ['swing-to-fulll'],
    videoUrl: 'https://youtube.com/shorts/qzoISsV5-Zc?si=kgap5Uj5kiOh8x7t',
  },
  {
    id: 'swing-to-fulll',
    name: 'Swing To Fulll',
    description: 'Swing leading to fully extended position using momentum.',
    prerequisites: ['two-swing-twisting'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2160,
    y: 825,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/aCkpDVtMdzM?si=-f0jfaHafW56R9he',
  },

  // ── LEVEL 4 — two-swing-twisting-ii chain ─────────────────────────────────────────────────
  {
    id: 'bell-beats',
    name: 'Bell Beats',
    description: 'Rhythmic swinging similar to rings. Arched position to dish position at vertical.',
    prerequisites: ['two-swing-twisting-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1710,
    y: 975,
    connections: ['to-plank'],
    videoUrl: 'https://www.youtube.com/watch?v=py7b6Q04-nQ',
  },
  {
    id: 'to-plank',
    name: 'To Plank',
    description: 'Swing transitioning to horizontal plank position using momentum.',
    prerequisites: ['two-swing-twisting-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 975,
    connections: ['side-push-pull'],
    videoUrl: 'https://www.youtube.com/watch?v=aoJzgNtjdjQ',
  },
  {
    id: 'side-push-pull',
    name: 'Side Push Pull',
    description: 'Lateral swinging with pushing and pulling actions.',
    prerequisites: ['two-swing-twisting-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2010,
    y: 975,
    connections: ['half-turn'],
    videoUrl: 'https://youtube.com/shorts/aoJzgNtjdjQ',
  },
  {
    id: 'half-turn',
    name: 'Half Turn',
    description: '180-degree rotation during swing. Turn initiated by feet at peak.',
    prerequisites: ['two-swing-twisting-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2160,
    y: 975,
    connections: ['pirouette'],
    videoUrl: 'https://www.youtube.com/watch?v=UQ0fme2tGIo',
  },
  {
    id: 'pirouette',
    name: 'Pirouette',
    description: 'Full 360-degree rotation during swing phase.',
    prerequisites: ['two-swing-twisting-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2310,
    y: 975,
    connections: ['swing-to-handstand'],
    videoUrl: 'https://youtube.com/shorts/cxdtl4LmyeY?si=d2DZsl8ll79fUTOt',
  },
  {
    id: 'swing-to-handstand',
    name: 'Swing To Handstand',
    description: 'Using swing momentum to transition into handstand.',
    prerequisites: ['two-swing-twisting-ii'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2460,
    y: 975,
    connections: [],
    videoUrl: 'https://www.youtube.com/watch?v=CmCYdpXLccM',
  },

  // ── LEVEL 4 — two-swing-rotating chain ─────────────────────────────────────────────────
  {
    id: 'armpit-beats',
    name: 'Armpit Beats',
    description: 'Swinging with straps in armpit area. Different rotation axis.',
    prerequisites: ['two-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1710,
    y: 1125,
    connections: ['disloc'],
  },
  {
    id: 'disloc',
    name: 'Disloc',
    description: 'Shoulder rotation backward through full range. Continuous wrist rotation.',
    prerequisites: ['two-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 1125,
    connections: ['inloc'],
    videoUrl: 'https://youtube.com/shorts/uFZ2-c1vePE?si=NNe87_Q2NvrFPEfP',
  },
  {
    id: 'inloc',
    name: 'Inloc',
    description: 'Forward shoulder rotation. Body passes forward through arms.',
    prerequisites: ['two-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2010,
    y: 1125,
    connections: ['giants'],
    videoUrl: 'https://youtube.com/shorts/G5TW1kj028g',
  },
  {
    id: 'giants',
    name: 'Giants',
    description: 'Full 360-degree rotations around straps axis. Continuous circular swinging.',
    prerequisites: ['two-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2160,
    y: 1125,
    connections: ['inloc-giants'],
    videoUrl: 'https://youtube.com/shorts/CSCpzHYiBqA?si=d3td_sI2NW6nMx5c',
  },
  {
    id: 'inloc-giants',
    name: 'Inloc Giants',
    description: 'Giant swings with forward shoulder rotation pattern.',
    prerequisites: ['two-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2310,
    y: 1125,
    connections: ['back-salto'],
    videoUrl: 'https://youtube.com/shorts/6zuzT9qCQlk?si=U1gfY5vPGEtA-V4H',
  },
  {
    id: 'back-salto',
    name: 'Back Salto',
    description: 'Backward somersault, likely with release or loose grip.',
    prerequisites: ['two-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2460,
    y: 1125,
    connections: ['delchev'],
    videoUrl: 'https://youtube.com/shorts/uFZ2-c1vePE',
  },
  {
    id: 'delchev',
    name: 'Delchev',
    description: 'Named skill involving release and re-catch with rotation.',
    prerequisites: ['two-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2610,
    y: 1125,
    connections: ['yamawaki'],
    videoUrl: 'https://youtube.com/shorts/ggkSz6urQko?si=b77McRYXk1niVMXp',
  },
  {
    id: 'yamawaki',
    name: 'Yamawaki',
    description: 'Named gymnastics skill adapted to straps. Specific rotation pattern.',
    prerequisites: ['two-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    isBlue: true,
    x: 2760,
    y: 1125,
    connections: [],
  },

  // ── LEVEL 4 — one-spin-center chain ─────────────────────────────────────────────────
  {
    id: 'center-spin',
    name: 'Center Spin',
    description: 'One-arm rotation around the vertical axis with body spinning in the center between the straps',
    prerequisites: ['one-spin-center'],
    type: 'regular',
    state: 'inactive',
    x: 210,
    y: -75,
    connections: ['front-candle'],
	videoUrl:'https://youtube.com/shorts/H4ozywL45I8?si=tlsbjtUt5yOwcpXZ',
  },
  {
    id: 'front-candle',
    name: 'Front Candle',
    description: 'A compact one-arm spinning position with the body close to the suspended arm',
    prerequisites: ['one-spin-center'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: -75,
    connections: ['back-candle'],
	videoUrl:'https://youtube.com/shorts/6WDJZediu5Q?si=ZMGQ4fSUnu_ExrHh',
  },
  {
    id: 'back-candle',
    name: 'Back Candle',
    description: 'Back Candle skill',
    prerequisites: ['one-spin-center'],
    type: 'regular',
    state: 'inactive',
    x: -90,
    y: -75,
    connections: ['nugget'],
	videoUrl:'https://youtube.com/shorts/ubBj-fPzcX0?si=_I4MzlHkTI_JDepb',
  },
  {
    id: 'nugget',
    name: 'Nugget',
    description: 'One-arm spinning position with legs in.',
    prerequisites: ['one-spin-center'],
    type: 'regular',
    state: 'inactive',
    x: -240,
    y: -75,
    connections: [],
  },

  // ── LEVEL 4 — one-spin-reverse chain ─────────────────────────────────────────────────
  {
    id: 'meathook-1',
    name: 'Meathook',
    description: 'One-arm position with closed legs raised to the side; the hanging arm held tightly to the body with stretched free arm next to the ear; body in a closed hooked shape',
    prerequisites: ['one-spin-reverse'],
    type: 'regular',
    state: 'inactive',
    x: 210,
    y: 75,
    connections: ['split-grip-to-flag'],
    videoUrl: 'https://youtube.com/shorts/UiYRfphWzLk',
  },
  {
    id: 'split-grip-to-flag',
    name: 'Split Grip To Flag',
    description: 'Transition from a split grip position into a one-arm Flag (horizontal inverted position) while spinning in reverse direction',
    prerequisites: ['one-spin-reverse'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 75,
    connections: ['split-grip-to-full'],
    videoUrl: 'https://youtube.com/shorts/obGJr1S9g9E',
  },
  {
    id: 'split-grip-to-full',
    name: 'Split Grip To Full',
    description: 'Transition from split grip to a full rotation/inversion while spinning in reverse direction',
    prerequisites: ['one-spin-reverse'],
    type: 'regular',
    state: 'inactive',
    x: -90,
    y: 75,
    connections: ['flare-to-lockoff'],
    videoUrl: 'https://youtube.com/shorts/vYUrKNzxiVA?si=M4pha7tXNSrOL-KO',
  },
  {
    id: 'flare-to-lockoff',
    name: 'Flare To Lockoff',
    description: 'Dynamic flaring movement transitioning to a locked static hold position while spinning in reverse',
    prerequisites: ['one-spin-reverse'],
    type: 'regular',
    state: 'inactive',
    x: -240,
    y: 75,
    connections: ['beat-to-1-arm'],
    videoUrl: 'https://youtube.com/shorts/COJg5yzvEH0',
  },
  {
    id: 'beat-to-1-arm',
    name: 'Beat To 1 Arm',
    description: 'Swinging movement (beat) transitioning into a one-arm hang or position while spinning in reverse direction',
    prerequisites: ['one-spin-reverse'],
    type: 'regular',
    state: 'inactive',
    x: -390,
    y: 75,
    connections: ['reverse-flag'],
  },
  {
    id: 'reverse-flag',
    name: 'Reverse Flag',
    description: 'One-arm Flag position (inverted horizontal) performed with reverse/backward rotation',
    prerequisites: ['one-spin-reverse'],
    type: 'regular',
    state: 'inactive',
    x: -540,
    y: 75,
    connections: ['reverse-full'],
    videoUrl: 'https://www.youtube.com/watch?v=XIhf5raHEhU',
  },
  {
    id: 'reverse-full',
    name: 'Reverse Full',
    description: 'Complete rotation performed in reverse direction on one arm',
    prerequisites: ['one-spin-reverse'],
    type: 'regular',
    state: 'inactive',
    x: -690,
    y: 75,
    connections: ['reverse-mushu'],
    videoUrl: 'https://www.youtube.com/watch?v=Yn-K6a9ujU0',
  },
  {
    id: 'reverse-mushu',
    name: 'Reverse Mushu',
    description: 'Mushu position (one-arm horizontal position with specific leg configuration) executed with reverse spin direction; similar to a one-arm Flag with variations in body shape',
    prerequisites: ['one-spin-reverse'],
    type: 'regular',
    state: 'inactive',
    x: -840,
    y: 75,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/vYUrKNzxiVA?si=M4pha7tXNSrOL-KO',
  },

  // ── LEVEL 4 — one-spin-normal chain ─────────────────────────────────────────────────
  {
    id: 'flare-1',
    name: 'Flare',
    description: 'Dynamic swinging movement with body extended horizontally while spinning in reverse direction',
    prerequisites: ['one-spin-normal'],
    type: 'regular',
    state: 'inactive',
    x: 210,
    y: 225,
    connections: ['nutcracker-1'],
    videoUrl: 'https://youtube.com/shorts/oB5ib9u2fT4',
  },
  {
    id: 'nutcracker-1',
    name: 'Nutcracker',
    description: 'One-arm position with legs separated and turned out; outer leg in hooked meathook shape; back stretched upward pushing hips toward wrist',
    prerequisites: ['one-spin-normal'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 225,
    connections: ['reverse-meathook'],
    videoUrl: 'https://youtube.com/shorts/Freat_9N9FQ',
  },
  {
    id: 'reverse-meathook',
    name: 'Reverse Meathook',
    description: 'Meathook position with opposite rotation direction - inverted hanging position tilted to one side with one arm tucked to back close to pelvis',
    prerequisites: ['one-spin-normal'],
    type: 'regular',
    state: 'inactive',
    x: -90,
    y: 225,
    connections: ['flare-to-flag-1'],
	videoUrl:'https://youtube.com/shorts/K9wC5gS7n-I?si=GwAyWCoMxH0G1Wg8',
  },
  {
    id: 'flare-to-flag-1',
    name: 'Flare To Flag',
    description: 'Dynamic flaring movement transitioning into a one-arm Flag position (horizontal inverted) while spinning forward',
    prerequisites: ['one-spin-normal'],
    type: 'key',
    state: 'inactive',
    isGoldBorder: true,
    x: -240,
    y: 225,
    connections: ['low-switch'],
    videoUrl: 'https://youtube.com/shorts/FSWWEqdo3o8',
  },
  {
    id: 'low-switch',
    name: 'Low Switch',
    description: 'Transition between positions (meathook to Flag or Flag to meathook) executed at a lower height while spinning',
    prerequisites: ['one-spin-normal'],
    type: 'regular',
    state: 'inactive',
    x: -390,
    y: 225,
    connections: ['nutcrcker-switch'],
  },
  {
    id: 'nutcrcker-switch',
    name: 'Nutcrcker Switch',
    description: 'Transition involving the nutcracker position - changing between different leg/body configurations while maintaining rotation',
    prerequisites: ['one-spin-normal'],
    type: 'regular',
    state: 'inactive',
    x: -540,
    y: 225,
    connections: ['high-switch'],
	videoUrl:'https://youtube.com/shorts/pQPwq2w3vwo?si=JlhWT6ytLL6eBjnj',
  },
  {
    id: 'high-switch',
    name: 'High Switch',
    description: 'Fast transition between meathook and Flag positions at the peak of movement; involves stretching through vertical position with half cat twist',
    prerequisites: ['one-spin-normal'],
    type: 'regular',
    state: 'inactive',
    x: -690,
    y: 225,
    connections: ['full'],
    videoUrl: 'https://www.youtube.com/watch?v=FTWTzB1TrEo',
  },
  {
    id: 'full',
    name: 'Full',
    description: 'Complete 360-degree rotation on one arm; can refer to full turn in spinning or full body rotation',
    prerequisites: ['one-spin-normal'],
    type: 'regular',
    state: 'inactive',
    x: -840,
    y: 225,
    connections: ['mushu'],
    videoUrl: 'https://youtube.com/shorts/wU1eGKGhEtw',
  },
  {
    id: 'mushu',
    name: 'Mushu',
    description: 'One-arm horizontal position similar to Flag but with specific body and leg configuration; named position in contemporary straps vocabulary',
    prerequisites: ['one-spin-normal'],
    type: 'key',
    state: 'inactive',
    isGoldBorder: true,
    x: -990,
    y: 225,
    connections: ['double-full'],
	videoUrl:'https://youtube.com/shorts/cUtlEPOU4iw?si=vtgP30LsXKefMo3e',
  },
  {
    id: 'double-full',
    name: 'Double Full',
    description: 'Two complete 360-degree rotations performed consecutively on one arm while spinning',
    prerequisites: ['one-spin-normal'],
    type: 'regular',
    state: 'inactive',
    x: -1140,
    y: 225,
    connections: [],
	videoUrl:'https://youtube.com/shorts/SEtrvxISarM?si=e-j--JRd-GoUX6gK',
  },

  // ── LEVEL 4 — one-static-hanging chain ─────────────────────────────────────────────────
  {
    id: 'straddle-rock-to-flag',
    name: 'Straddle Rock To Flag',
    description: 'Movement from a straddle position rocking into a one-arm Flag (horizontal inverted position); performed as a static transition',
    prerequisites: ['one-static-hanging'],
    type: 'regular',
    state: 'inactive',
    x: 210,
    y: 450,
    connections: ['high-switch-1'],
  },
  {
    id: 'high-switch-1',
    name: 'High Switch',
    description: 'Transition from meathook to Flag position through vertical alignment with legs together; involves pelvis lift and half cat twist; performed without swinging momentum',
    prerequisites: ['one-static-hanging'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 450,
    connections: ['inversion'],
    videoUrl: 'https://youtube.com/shorts/ijT5BrdM0tg',
  },
  {
    id: 'inversion',
    name: 'Inversion',
    description: 'One-arm inverted position with body hanging upside down; suspended arm as extension of straps with pelvis stretched and feet pointing to ceiling',
    prerequisites: ['one-static-hanging'],
    type: 'regular',
    state: 'inactive',
    x: -90,
    y: 450,
    connections: ['inversion-to-meathook'],
  },
  {
    id: 'inversion-to-meathook',
    name: 'Inversion To Meathook',
    description: 'Transition from one-arm inverted vertical position down into meathook (horizontal side-facing position with hooked body shape)',
    prerequisites: ['one-static-hanging'],
    type: 'regular',
    state: 'inactive',
    x: -240,
    y: 450,
    connections: ['inversion-to-flag'],
    videoUrl: 'https://www.youtube.com/watch?v=f9wwfI56LhQ',
  },
  {
    id: 'inversion-to-flag',
    name: 'Inversion To Flag',
    description: 'Transition from one-arm inverted vertical position into Flag (horizontal inverted position with extended body)',
    prerequisites: ['one-static-hanging'],
    type: 'regular',
    state: 'inactive',
    x: -390,
    y: 450,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/HiTTJftm8Bk?si=6LrObsWMRcBBjeMq',
  },

  // ── LEVEL 4 — one-swing-basics chain ─────────────────────────────────────────────────
  {
    id: 'front-to-front',
    name: 'Front To Front',
    description: 'Basic one-arm swinging movement from front position back to front; fundamental swinging pattern',
    prerequisites: ['one-swing-basics'],
    type: 'regular',
    state: 'inactive',
    x: 210,
    y: 663,
    connections: ['fron-to-side'],
    videoUrl: 'https://youtube.com/shorts/Z36ukVFnBko',
  },
  {
    id: 'fron-to-side',
    name: 'Fron To Side',
    description: 'One-arm swing transitioning from front-facing position to side-facing position',
    prerequisites: ['one-swing-basics'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 663,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/qzoISsV5-Zc?si=kgap5Uj5kiOh8x7t',
  },

  // ── LEVEL 4 — one-swing-twisting chain ─────────────────────────────────────────────────
  {
    id: 'inside-pirouette',
    name: 'Inside Pirouette',
    description: 'Half turn initiated by feet at furthest swing point; body rotates inward around suspended arm while maintaining extended position',
    prerequisites: ['one-swing-twisting'],
    type: 'regular',
    state: 'inactive',
    x: 210,
    y: 813,
    connections: ['reverse-soleil'],
    videoUrl: 'https://youtube.com/shorts/jkp_BVnO4vA',
  },
  {
    id: 'reverse-soleil',
    name: 'Reverse Soleil',
    description: 'Twisting movement performed in reverse direction; body rotation initiated during swing phase with specific directional control',
    prerequisites: ['one-swing-twisting'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 813,
    connections: ['soleil'],
    videoUrl: 'https://youtube.com/shorts/BJDNpk6f0BM?si=UgI9waZNerQ1KHJ3',
  },
  {
    id: 'soleil',
    name: 'Soleil',
    description: 'Twisting swing movement where body rotates around suspended arm; feet describe circular path during upward swing phase',
    prerequisites: ['one-swing-twisting'],
    type: 'regular',
    state: 'inactive',
    x: -90,
    y: 813,
    connections: ['outside-pirouette'],
    videoUrl: 'https://youtube.com/shorts/u8FwOq0WFXc',
  },
  {
    id: 'outside-pirouette',
    name: 'Outside Pirouette',
    description: 'Half turn rotation where body turns outward away from suspended arm during swing; initiated at peak of momentum',
    prerequisites: ['one-swing-twisting'],
    type: 'regular',
    state: 'inactive',
    x: -240,
    y: 813,
    connections: ['swing-to-flag'],
	videoUrl:'https://youtube.com/shorts/AVxbFPkoBZ8?si=tG23JR8NeuC0pnQY',
  },
  {
    id: 'swing-to-flag',
    name: 'Swing To Flag',
    description: 'Swinging movement that culminates in a Flag position; involves closing hips during forward swing, transitioning through vertical to horizontal inverted position',
    prerequisites: ['one-swing-twisting'],
    type: 'regular',
    state: 'inactive',
    x: -390,
    y: 813,
    connections: ['swing-to-mushu'],
    videoUrl: 'https://youtube.com/shorts/9h72wmKI0RY?si=XBmDrDAxc2GtuhhP',
  },
  {
    id: 'swing-to-mushu',
    name: 'Swing To Mushu',
    description: 'One-arm swing transitioning into Mushu position (horizontal position with specific body configuration)',
    prerequisites: ['one-swing-twisting'],
    type: 'regular',
    state: 'inactive',
    x: -540,
    y: 813,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/PQ9u_RVRfUg',
  },

  // ── LEVEL 4 — one-swing-rotating chain ─────────────────────────────────────────────────
  {
    id: 'back',
    name: 'Back',
    description: 'Backward swinging movement on one arm; body extends through vertical with open shoulders and natural descent pattern',
    prerequisites: ['one-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    x: 210,
    y: 963,
    connections: ['disloc-1'],
  },
  {
    id: 'disloc-1',
    name: 'Disloc',
    description: 'Dislocate movement on one arm; outward rotation of hanging arm and shoulder allowing body to swing to opposite side of strap, maintaining axis and direction',
    prerequisites: ['one-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 963,
    connections: ['salto'],
    videoUrl: 'https://youtube.com/shorts/8NfijlpC99A',
  },
  {
    id: 'salto',
    name: 'Salto',
    description: 'Somersault/flip performed while swinging on one arm; requires significant momentum and body control',
    prerequisites: ['one-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    x: -90,
    y: 963,
    connections: ['1-5-arm-salto'],
    videoUrl: 'https://youtube.com/shorts/ENIyf9XwSAg?si=XChsRB-e6sIWkI4O',
  },
  {
    id: '1-5-arm-salto',
    name: '1.5 Arm Salto',
    description: 'One and a half somersault rotation performed on one arm during swing; advanced rotational movement',
    prerequisites: ['one-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    x: -240,
    y: 963,
    connections: ['double-salto'],
    videoUrl: 'https://youtube.com/shorts/PNBN6wlqCuw?si=e1JLkU9KILCs1huF',
  },
  {
    id: 'double-salto',
    name: 'Double Salto',
    description: 'Two complete somersaults performed consecutively on one arm while swinging; extreme difficulty move',
    prerequisites: ['one-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    x: -390,
    y: 963,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/WNXk34-Fzyk?si=ZLeCu4_LBh8XpCCa',
  },

  // ── LEVEL 4 — one-swing-rotating-ii chain ─────────────────────────────────────────────────
  {
    id: 'front',
    name: 'Front',
    description: 'Forward swinging rotation on one arm; body rotates forward around suspended arm axis',
    prerequisites: ['one-swing-rotating-ii'],
    type: 'regular',
    state: 'inactive',
    x: 210,
    y: 1113,
    connections: ['inloc-1'],
  },
  {
    id: 'inloc-1',
    name: 'Inloc',
    description: 'Inlocate movement - opposite of dislocate; inward rotation pattern during swing, body passing through specific rotational positions',
    prerequisites: ['one-swing-rotating-ii'],
    type: 'regular',
    state: 'inactive',
    x: 60,
    y: 1113,
    connections: ['double-front'],
    videoUrl: 'https://youtube.com/shorts/AGgargIWLX4?si=ItbhaMgTReC2ThFE',
  },
  {
    id: 'double-front',
    name: 'Double Front',
    description: 'Two forward rotations performed in sequence on one arm; requires high swing momentum and precise technique',
    prerequisites: ['one-swing-rotating-ii'],
    type: 'regular',
    state: 'inactive',
    x: -90,
    y: 1113,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/gxeFZ03qV98?si=O6Pl90PbagyT6wWr',
  },

  // ── LEVEL 4 — c-shaping-static chain ─────────────────────────────────────────
  {
    id: 'front-c',
    name: 'Front C',
    description: 'C shaping technique.',
    prerequisites: ['c-shaping-static'],
    type: 'regular',
    state: 'inactive',
    x: 960,
    y: 1610,
    connections: []
  }
];

export const getSkillById = (id: string): Skill | undefined => {
  return skillTreeData.find(skill => skill.id === id);
};

export const getPrerequisiteSkills = (skill: Skill): Skill[] => {
  return skill.prerequisites
    .map(prereqId => getSkillById(prereqId))
    .filter((s): s is Skill => s !== undefined);
};