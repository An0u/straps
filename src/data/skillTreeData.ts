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
 * The 'Two Arm' skill tree flows from left to right, starting from the RIGHT corner
 * of the central rhombus.
 * 
 * Flow Structure:
 * - Level 1 node (category: 'two arm') appears at the rhombus RIGHT corner
 * - Level 2 nodes (sub-categories: Spin, Static, Swing) appear to the right of Level 1
 * - Level 3 nodes (specific groupings: Normal, Reverse, Center, Hanging, Support,
 *   Support Ii, Twisting, Twisting Ii, Rotating) appear to the right of Level 2
 * - Level 4 nodes (actual skills) appear at the rightmost position
 * 
 * Connection Behavior:
 * - Connections flow rightward from parent nodes to child nodes through Levels 1-3
 * - Nodes within the same level are arranged vertically and evenly spaced
 * 
 * Level 4 Special Behavior:
 * - Level 4 contains the actual learnable skills
 * - Forms a linear sequence arranged horizontally (continuing the left-to-right flow)
 * - Each Level 4 skill connects to the previous and next skill in the sequence
 *   (forming a learning progression chain that flows left-to-right)
 * - Only the first skill in each Level 4 chain receives connections from its Level 3 parent node
 * - The remaining skills are unlocked by progressing through the chain sequentially
 * - Skills marked as 'Key skill: yes' represent major milestone skills in the progression
 * 
 * Group Separation and No Overlaps:
 * - The 'Two Arm' Level 1 node and ALL its descendants (Level 2, Level 3, and Level 4 children)
 *   form a distinct group extending rightward from the rhombus
 * - This group must have a buffer/margin around its entire bounding area
 * - No group may overlap with any other group's buffer zone
 * - The group extends vertically with sufficient spacing to prevent any visual overlap
 *   of nodes or connections with other Level 1 hierarchies
 * 
 * ============================================================================
 * LEFT DIRECTION (One Arm Category - from LEFT corner)
 * ============================================================================
 * 
 * The 'One Arm' skill tree flows from right to left, starting from the LEFT corner
 * of the central rhombus.
 * 
 * Flow Structure:
 * - Level 1 node (category: 'one arm') appears at the rhombus LEFT corner
 * - Level 2 nodes (sub-categories: Spin, Static, Swing) appear to the left of Level 1
 * - Level 3 nodes (specific groupings: Normal, Reverse, Center, Hanging, Basics,
 *   Twisting, Rotating, Rotating Ii) appear to the left of Level 2
 * - Level 4 nodes (actual skills) appear at the leftmost position
 * 
 * Connection Behavior:
 * - Connections flow leftward from parent nodes to child nodes through Levels 1-3
 * - Nodes within the same level are arranged vertically and evenly spaced
 * 
 * Level 4 Special Behavior:
 * - Level 4 contains the actual learnable skills
 * - Forms a linear sequence arranged horizontally (continuing the right-to-left flow)
 * - Each Level 4 skill connects to the previous and next skill in the sequence
 *   (forming a learning progression chain that flows right-to-left)
 * - Only the first skill in each Level 4 chain receives connections from its Level 3 parent node
 * - The remaining skills are unlocked by progressing through the chain sequentially
 * - Skills marked as 'Key skill: yes' represent major milestone skills in the progression
 * 
 * Group Separation and No Overlaps:
 * - The 'One Arm' Level 1 node and ALL its descendants (Level 2, Level 3, and Level 4 children)
 *   form a distinct group extending leftward from the rhombus
 * - This group must have a buffer/margin around its entire bounding area
 * - No group may overlap with any other group's buffer zone
 * - The group extends vertically with sufficient spacing to prevent any visual overlap
 *   of nodes or connections with other Level 1 hierarchies
 * 
 * ============================================================================
 * DOWN DIRECTION (C-Shaping Category - from BOTTOM corner)
 * ============================================================================
 * 
 * The 'C-Shaping' skill tree flows from top to bottom, starting from the BOTTOM corner
 * of the central rhombus.
 * 
 * Flow Structure:
 * - Level 1 node (category: 'c-shaping') appears at the rhombus BOTTOM corner
 * - Level 2 nodes (sub-categories: Static) appear below Level 1
 * - Level 3 nodes (specific groupings if any) appear below Level 2
 * - Level 4 nodes (actual skills) appear at the bottom
 * 
 * Connection Behavior:
 * - Connections flow downward from parent nodes to child nodes through Levels 1-3
 * - Nodes within the same level are arranged horizontally and evenly spaced
 * 
 * Level 4 Special Behavior:
 * - Level 4 contains the actual learnable skills
 * - Forms a linear sequence arranged vertically (continuing the top-to-bottom flow)
 * - Each Level 4 skill connects to the previous and next skill in the sequence
 *   (forming a learning progression chain that flows top-to-bottom)
 * - Only the first skill in each Level 4 chain receives connections from its Level 3 parent node
 * - The remaining skills are unlocked by progressing through the chain sequentially
 * - Skills marked as 'Key skill: yes' represent major milestone skills in the progression
 * 
 * Group Separation and No Overlaps:
 * - The 'C-Shaping' Level 1 node and ALL its descendants (Level 2, Level 3, and Level 4 children)
 *   form a distinct group extending downward from the rhombus
 * - This group must have a buffer/margin around its entire bounding area
 * - No group may overlap with any other group's buffer zone
 * - The group extends horizontally with sufficient spacing to prevent any visual overlap
 *   of nodes or connections with other Level 1 hierarchies
 * 
 * ============================================================================
 * UP DIRECTION (Future Expansion - from TOP corner)
 * ============================================================================
 * 
 * The TOP corner of the rhombus is reserved for future category expansion.
 * When a new category is added, its skill tree will flow from bottom to top,
 * starting from the TOP corner of the central rhombus.
 * 
 * Future Flow Structure:
 * - Level 1 node would appear at the rhombus TOP corner
 * - Level 2 nodes would appear above Level 1
 * - Level 3 nodes would appear above Level 2
 * - Level 4 nodes would appear at the topmost position
 * 
 * Connection Behavior:
 * - Connections would flow upward from parent nodes to child nodes through Levels 1-3
 * - Nodes within the same level would be arranged horizontally and evenly spaced
 * 
 * Level 4 Special Behavior:
 * - Level 4 would contain the actual learnable skills
 * - Form a linear sequence arranged vertically (continuing the bottom-to-top flow)
 * - Each Level 4 skill would connect to the previous and next skill in the sequence
 * - Only the first skill in each Level 4 chain would receive connections from its Level 3 parent node
 * 
 * Group Separation and No Overlaps:
 * - Any future Level 1 node and ALL its descendants would form a distinct group
 *   extending upward from the rhombus
 * - Buffer/margin preventing overlap with other groups
 * 
 * ============================================================================
 * COMPLETE SPACING AND CONNECTION RULES
 * ============================================================================
 *
 * NODE GROUP DEFINITION
 * ---------------------
 * A Node Group is defined as a Level 1 node PLUS ALL its descendant children
 * (Level 2, Level 3, and Level 4 nodes). Each node group forms a distinct
 * visual unit extending outward from its respective rhombus corner.
 *
 * NODE SIZES
 * ----------
 * - Level 1, 2, 3 nodes: Larger size (used for category / subcategory nodes)
 * - Level 4 nodes:       Smaller size (used for actual individual skill nodes)
 *
 * SPACING RULES
 * -------------
 * Between Individual Nodes (Fixed pixel spacing):
 * - A fixed pixel gap is maintained between sibling nodes at the same level.
 * - A fixed pixel gap is maintained between parent and child levels within the
 *   same group (e.g., Level 1 → Level 2, Level 2 → Level 3, Level 3 → Level 4).
 * - Fixed spacing ensures a consistent, predictable layout throughout the tree.
 *
 * Between Node Groups (Proportional buffer):
 * - A proportional buffer / margin is calculated around each entire node
 *   group's bounding area (the bounding box that encloses all nodes in the group).
 * - The buffer zone size scales with the total size of the group.
 * - NO overlap is permitted between the buffer zones of any two node groups.
 * - This prevents visual collision of nodes or connection lines that belong to
 *   different groups.
 *
 * CONNECTION RULES
 * ----------------
 * Parent-to-Child Connections (Levels 1 → 2, 2 → 3, 3 → first Level 4):
 * - All parent-to-child connections use straight lines (no curves, no bends).
 * - Level 1 → Level 2: Straight line from the Level 1 node to each of its
 *   Level 2 children.
 * - Level 2 → Level 3: Straight line from each Level 2 node to each of its
 *   Level 3 children.
 * - Level 3 → Level 4: Straight line from the Level 3 node to ONLY the FIRST
 *   Level 4 skill in that chain. Subsequent Level 4 nodes are reached by
 *   traversing the chain, not by direct connection from Level 3.
 *
 * Level 4 Sequential Chain Connections:
 * - All Level 4 skills that share the same Level 3 parent form ONE continuous
 *   sequential chain connected by straight lines.
 * - Each Level 4 node connects to the previous node and the next node in the
 *   chain (doubly-linked sequential progression).
 * - Chain flow direction is determined by the category's "Direction" value:
 *     • "Right" — chain flows LEFT → RIGHT horizontally  (Two Arm category)
 *     • "Left"  — chain flows RIGHT → LEFT horizontally  (One Arm category)
 *     • "Down"  — chain flows TOP → BOTTOM vertically    (C-Shaping category)
 * - First node in chain:  receives a connection FROM the Level 3 parent node,
 *                         AND connects forward to the next node in the chain.
 * - Middle nodes in chain: connect backward to the previous node AND forward
 *                          to the next node only (no direct Level 3 connection).
 * - Last node in chain:   connects backward to the previous node only.
 *
 * VISUAL STYLING
 * --------------
 * Level 4 Key Skills:
 * - Background glow: Yellow
 * - These nodes are visually distinct to mark milestone / important skills
 *   within the progression chain.
 * - Identified in data by `type: 'key'` (maps to `Key skill: yes` in source CSV).
 *
 * All Connection Lines:
 * - Style: Straight lines only — no curves and no angled/elbow connectors.
 * - Lines must clearly communicate skill progression and hierarchy at a glance.
 *
 * ============================================================================
 * IMPLEMENTATION NOTES
 * ============================================================================
 * 
 * Key Implementation Requirements:
 * 
 * 1. RHOMBUS CENTER:
 *    - Must be positioned at page center
 *    - Four corners at exact cardinal directions (TOP, RIGHT, BOTTOM, LEFT)
 *    - Serves as the origin point for all skill tree branches
 * 
 * 2. DIRECTIONAL FLOW:
 *    - RIGHT (Two Arm): Left-to-right progression
 *    - LEFT (One Arm): Right-to-left progression
 *    - DOWN (C-Shaping): Top-to-bottom progression
 *    - UP (Future): Bottom-to-top progression (reserved)
 * 
 * 3. LEVEL 4 CHAINS:
 *    - Linear progression chains for actual skills
 *    - Sequential unlocking mechanism
 *    - First skill connects to Level 3 parent
 *    - Subsequent skills connect only to previous/next in chain
 *    - Direction follows parent category's flow direction
 * 
 * 4. NON-OVERLAPPING GROUPS:
 *    - Each Level 1 + descendants = single bounded group
 *    - Mandatory buffer zones around each group
 *    - No visual overlap of nodes or connections between groups
 *    - Sufficient spacing based on direction of expansion
 * 
 * 5. KEY SKILLS:
 *    - Marked with 'Key skill: yes' in data
 *    - Represent major milestone achievements
 *    - Should be visually distinguished in UI
 * 
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

  // ── LEVEL 2 — Two Arm (x=1300) ───────────────────────────────────────────────
  // y centred on their L3 group midpoints
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

  // ── LEVEL 2 — One Arm (x=620) ────────────────────────────────────────────────
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

  // ── LEVEL 2 — C-Shaping (y=1450) ─────────────────────────────────────────────
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

  // ── LEVEL 3 — Two Arm Spin (x=1550, spacing=150, centred on y=75) ────────────
  // Normal y=-75, Reverse y=75, Center y=225
  // Gap to next group (Static top=375): 375-225=150 ✓
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

  // ── LEVEL 3 — Two Arm Static (x=1550, spacing=150, top=375) ──────────────────
  // Hanging y=375, Support y=525, Support-ii y=675
  // Gap to next group (Swing top=825): 825-675=150 ✓
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

  // ── LEVEL 3 — Two Arm Swing (x=1550, spacing=150, top=825) ───────────────────
  // Twisting y=825, Twisting-ii y=975, Rotating y=1125
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

  // ── LEVEL 3 — One Arm Spin (x=370, spacing=150, centred on y=75) ─────────────
  // Center y=-75, Reverse y=75, Normal y=225
  // Gap to Static (y=450): 450-225=225 ✓
  {
    id: 'one-spin-center',
    name: 'Center',
    description: 'Center techniques.',
    prerequisites: ['one-spin'],
    type: 'category',
    state: 'active',
    x: 370,
    y: -75,
    connections: ['center-spin']
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

  // ── LEVEL 3 — One Arm Static (x=370) ─────────────────────────────────────────
  // Hanging y=450 (single child, gap to Swing top=663: 663-450=213 ✓)
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

  // ── LEVEL 3 — One Arm Swing (x=370, spacing=150, top=663) ────────────────────
  // Basics y=663, Twisting y=813, Rotating y=963, Rotating-ii y=1113
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

  // ── LEVEL 4 — two-spin-normal chain  y=-75,  x: 1710 +150 each ───────────────
  {
    id: 'flare',
    name: 'Flare',
    description: 'Horizontal Flag position performed in rotation. Body tilted to one side with arm tucked to back.',
    prerequisites: ['two-spin-normal'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1710,
    y: -75,
    connections: ['nutcracker'],
    videoUrl: 'https://youtube.com/shorts/LngeQfLsL3c'
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
    videoUrl: 'https://youtube.com/shorts/zKKMrqKPJWY'
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
    videoUrl: 'https://www.youtube.com/watch?v=MsLbJOZAW9M'
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
    videoUrl: 'https://youtube.com/shorts/tDNdHqBcsOo?si=Z5XAhNpg1BZ36ylZ'
  },
  {
    id: 'flare-to-flag',
    name: 'Flare To Flag',
    description: 'Transition from flare to Flag while rotating. Continuous arm rotation from wrist through body.',
    prerequisites: ['two-spin-normal'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 2310,
    y: -75,
    connections: ['flare-to-full'],
    videoUrl: 'https://youtube.com/shorts/Rbs7Kw9xKU0'
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
    videoUrl: 'https://youtube.com/shorts/Un6PkAhavGQ?si=sqvqQGeKlo5Un5nk'
  },

  // ── LEVEL 4 — two-spin-reverse chain  y=75,  x: 1710 +150 each ───────────────
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
    connections: ['straightjacket-in-reverse']
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
    connections: []
  },

  // ── LEVEL 4 — two-spin-center chain  y=225,  x: 1710 ─────────────────────────
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
    connections: []
  },

  // ── LEVEL 4 — two-static-hanging chain  y=375,  x: 1710 +150 each ────────────
  {
    id: '2-arm-inversion',
    name: '2 Arm Inversion',
    description: 'Inverted hanging with both arms. Pelvis stretched with feet to ceiling.',
    prerequisites: ['two-static-hanging'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1710,
    y: 375,
    connections: ['2-arm-skin-the-cat']
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
    videoUrl: 'https://youtu.be/3tQap3R4xgQ?si=l6GhHPs_EiXcoTsN'
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
    videoUrl: 'https://youtube.com/shorts/MsLbJOZAW9M'
  },
  {
    id: 'back-flag',
    name: 'Back Flag',
    description: 'Horizontal back planche position behind the straps. Shallow angle between trunk and arms.',
    prerequisites: ['two-static-hanging'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 2160,
    y: 375,
    connections: [],
    videoUrl: 'https://youtube.com/shorts/gOJ4kMs5St8'
  },

  // ── LEVEL 4 — two-static-support chain  y=525,  x: 1710 +150 each ────────────
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
    connections: ['side-balance']
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
    connections: ['butterfly']
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
    connections: ['full-to-full']
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
    connections: []
  },

  // ── LEVEL 4 — two-static-support-ii chain  y=675,  x: 1710 +150 each ─────────
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
    connections: ['roll-ups']
  },
  {
    id: 'roll-ups',
    name: 'Roll Ups',
    description: 'Rolling from tucked position, lifting pelvis to place straps above elbows.',
    prerequisites: ['two-static-support-ii'],
    type: 'key',
    state: 'inactive',
    isBlue: true,
    x: 1860,
    y: 675,
    connections: ['press-handstand'],
    videoUrl: 'Roll-ups / roll down - YouTube'
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
    connections: ['azarian']
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
    videoUrl: 'https://www.youtube.com/watch?v=30fUEKLW74M'
  },

  // ── LEVEL 4 — two-swing-twisting chain  y=825,  x: 1710 +150 each ────────────
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
    videoUrl: 'https://youtube.com/shorts/aoJzgNtjdjQ'
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
    videoUrl: 'https://www.youtube.com/watch?v=PHtBZWcp0Gg'
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
    videoUrl: 'https://youtube.com/shorts/qzoISsV5-Zc?si=kgap5Uj5kiOh8x7t'
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
    videoUrl: 'https://youtube.com/shorts/aCkpDVtMdzM?si=-f0jfaHafW56R9he'
  },

  // ── LEVEL 4 — two-swing-twisting-ii chain  y=975,  x: 1710 +150 each ─────────
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
    videoUrl: 'https://www.youtube.com/watch?v=py7b6Q04-nQ'
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
    videoUrl: 'https://www.youtube.com/watch?v=aoJzgNtjdjQ'
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
    videoUrl: 'https://youtube.com/shorts/aoJzgNtjdjQ'
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
    videoUrl: 'https://www.youtube.com/watch?v=UQ0fme2tGIo'
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
    videoUrl: 'https://youtube.com/shorts/cxdtl4LmyeY?si=d2DZsl8ll79fUTOt'
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
    videoUrl: 'https://www.youtube.com/watch?v=CmCYdpXLccM'
  },

  // ── LEVEL 4 — two-swing-rotating chain  y=1125,  x: 1710 +150 each ───────────
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
    connections: ['disloc']
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
    videoUrl: 'https://youtube.com/shorts/uFZ2-c1vePE?si=NNe87_Q2NvrFPEfP'
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
    videoUrl: 'https://youtube.com/shorts/G5TW1kj028g'
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
    videoUrl: 'https://youtube.com/shorts/CSCpzHYiBqA?si=d3td_sI2NW6nMx5c'
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
    videoUrl: 'https://youtube.com/shorts/6zuzT9qCQlk?si=U1gfY5vPGEtA-V4H'
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
    videoUrl: 'https://youtube.com/shorts/uFZ2-c1vePE'
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
    videoUrl: 'https://youtube.com/shorts/ggkSz6urQko?si=b77McRYXk1niVMXp'
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
    connections: []
  },

  // ── LEVEL 4 — one-spin-center chain  y=-75,  x: 210 -150 each ────────────────
  {
    id: 'center-spin',
    name: 'Center Spin',
    description: 'One-arm rotation around the vertical axis with body spinning in the center between the straps',
    prerequisites: ['one-spin-center'],
    type: 'regular',
    state: 'inactive',
    x: 210,
    y: -75,
    connections: ['front-candle']
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
    connections: ['back-candle']
  },
  {
    id: 'back-candle',
    name: 'Back Candle',
    description: '',
    prerequisites: ['one-spin-center'],
    type: 'regular',
    state: 'inactive',
    x: -90,
    y: -75,
    connections: ['nugget']
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
    connections: []
  },

  // ── LEVEL 4 — one-spin-reverse chain  y=75,  x: 210 -150 each ───────────────
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
    videoUrl: 'https://youtube.com/shorts/UiYRfphWzLk'
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
    videoUrl: 'https://youtube.com/shorts/obGJr1S9g9E'
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
    videoUrl: 'https://youtube.com/shorts/vYUrKNzxiVA?si=M4pha7tXNSrOL-KO'
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
    videoUrl: 'https://youtube.com/shorts/COJg5yzvEH0'
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
    connections: ['reverse-flag']
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
    videoUrl: 'https://www.youtube.com/watch?v=XIhf5raHEhU'
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
    videoUrl: 'https://www.youtube.com/watch?v=Yn-K6a9ujU0'
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
    videoUrl: 'https://youtube.com/shorts/vYUrKNzxiVA?si=M4pha7tXNSrOL-KO'
  },

  // ── LEVEL 4 — one-spin-normal chain  y=225,  x: 210 -150 each ────────────────
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
    videoUrl: 'https://youtube.com/shorts/oB5ib9u2fT4'
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
    videoUrl: 'https://youtube.com/shorts/Freat_9N9FQ'
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
    connections: ['flare-to-flag-1']
  },
  {
    id: 'flare-to-flag-1',
    name: 'Flare To Flag',
    description: 'Dynamic flaring movement transitioning into a one-arm Flag position (horizontal inverted) while spinning forward',
    prerequisites: ['one-spin-normal'],
    type: 'key',
    state: 'inactive',
    x: -240,
    y: 225,
    connections: ['low-switch'],
    videoUrl: 'https://youtube.com/shorts/FSWWEqdo3o8'
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
    connections: ['nutcrcker-switch']
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
    connections: ['high-switch']
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
    videoUrl: 'https://www.youtube.com/watch?v=FTWTzB1TrEo'
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
    videoUrl: 'https://youtube.com/shorts/wU1eGKGhEtw'
  },
  {
    id: 'mushu',
    name: 'Mushu',
    description: 'One-arm horizontal position similar to Flag but with specific body and leg configuration; named position in contemporary straps vocabulary',
    prerequisites: ['one-spin-normal'],
    type: 'key',
    state: 'inactive',
    x: -990,
    y: 225,
    connections: ['double-full']
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
    connections: []
  },

  // ── LEVEL 4 — one-static-hanging chain  y=450,  x: 210 -150 each ─────────────
  {
    id: 'straddle-rock-to-flag',
    name: 'Straddle Rock To Flag',
    description: 'Movement from a straddle position rocking into a one-arm Flag (horizontal inverted position); performed as a static transition',
    prerequisites: ['one-static-hanging'],
    type: 'regular',
    state: 'inactive',
    x: 210,
    y: 450,
    connections: ['high-switch-1']
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
    videoUrl: 'https://youtube.com/shorts/ijT5BrdM0tg'
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
    videoUrl: 'https://youtube.com/shorts/HiTTJftm8Bk'
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
    videoUrl: 'https://www.youtube.com/watch?v=f9wwfI56LhQ'
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
    connections: []
  },

  // ── LEVEL 4 — one-swing-basics chain  y=663,  x: 210 -150 each ──────────────
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
    videoUrl: 'https://youtube.com/shorts/Z36ukVFnBko'
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
    videoUrl: 'https://youtube.com/shorts/qzoISsV5-Zc?si=kgap5Uj5kiOh8x7t'
  },

  // ── LEVEL 4 — one-swing-twisting chain  y=813,  x: 210 -150 each ─────────────
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
    videoUrl: 'https://youtube.com/shorts/jkp_BVnO4vA'
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
    videoUrl: 'https://youtube.com/shorts/BJDNpk6f0BM?si=UgI9waZNerQ1KHJ3'
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
    videoUrl: 'https://youtube.com/shorts/u8FwOq0WFXc'
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
    connections: ['swing-to-flag']
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
    videoUrl: 'https://youtube.com/shorts/9h72wmKI0RY?si=XBmDrDAxc2GtuhhP'
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
    videoUrl: 'https://youtube.com/shorts/PQ9u_RVRfUg'
  },

  // ── LEVEL 4 — one-swing-rotating chain  y=963,  x: 210 -150 each ─────────────
  {
    id: 'back',
    name: 'Back',
    description: 'Backward swinging movement on one arm; body extends through vertical with open shoulders and natural descent pattern',
    prerequisites: ['one-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    x: 210,
    y: 963,
    connections: ['disloc-1']
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
    videoUrl: 'https://youtube.com/shorts/8NfijlpC99A'
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
    connections: ['15-arm-salto'],
    videoUrl: 'https://youtube.com/shorts/ENIyf9XwSAg?si=XChsRB-e6sIWkI4O'
  },
  {
    id: '15-arm-salto',
    name: '1.5 Arm Salto',
    description: 'One and a half somersault rotation performed on one arm during swing; advanced rotational movement',
    prerequisites: ['one-swing-rotating'],
    type: 'regular',
    state: 'inactive',
    x: -240,
    y: 963,
    connections: ['double-salto'],
    videoUrl: 'https://youtube.com/shorts/PNBN6wlqCuw?si=e1JLkU9KILCs1huF'
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
    connections: []
  },

  // ── LEVEL 4 — one-swing-rotating-ii chain  y=1113,  x: 210 -150 each ─────────
  {
    id: 'front',
    name: 'Front',
    description: 'Forward swinging rotation on one arm; body rotates forward around suspended arm axis',
    prerequisites: ['one-swing-rotating-ii'],
    type: 'key',
    state: 'inactive',
    x: 210,
    y: 1113,
    connections: ['inloc-1']
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
    videoUrl: 'https://youtube.com/shorts/AGgargIWLX4?si=ItbhaMgTReC2ThFE'
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
    videoUrl: 'https://youtube.com/shorts/tR2kE-mkF5o'
  },

  // ── LEVEL 4 — c-shaping-static chain  x=960,  y: 1610 +150 each ─────────────
  {
    id: 'front-c',
    name: 'Front C',
    description: 'C shaping techique etx',
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