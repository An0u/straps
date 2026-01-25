

# Skill Tree Visual Update Plan

## Overview
This plan will update the skill tree to use:
- **Pirata One font** from Google Fonts for all text
- **Custom SVG shapes** for the skill nodes (from the 10 provided SVGs)
- **Glow effects** behind the shapes for active states
- **Grayscale filter** for inactive skills (black and white treatment)

---

## Understanding the SVG Assets

Based on analysis of the 10 provided SVG files:

| File | Size | Color | Purpose |
|------|------|-------|---------|
| .01.svg | 107x111 | Blue | Category node (ornate frame) |
| .02.svg | 101x101 | Blue | Category node (ornate frame) - inactive variant |
| .03.svg | 89x92 | Blue | Key item (larger) |
| .04.svg | 80x80 | Blue | Regular item (active) |
| .05.svg | 80x80 | Blue | Regular item with icon |
| .06.svg | 80x80 | Blue (0.6 opacity) | Regular item (inactive) |
| .07.svg | 89x92 | Purple | Key item (larger) |
| .08.svg | 80x80 | Purple | Regular item (active) |
| .09.svg | 80x80 | Purple | Regular item with icon |
| .10.svg | 80x80 | Purple (0.6 opacity) | Regular item (inactive) |

---

## Implementation Steps

### 1. Copy SVG Assets to Project
Copy all 10 SVG files from user-uploads to `src/assets/shapes/`:
- `category-active.svg` (from .01.svg)
- `category-inactive.svg` (from .02.svg) 
- `key-blue.svg` (from .03.svg)
- `regular-blue-active.svg` (from .04.svg)
- `regular-blue-icon.svg` (from .05.svg)
- `regular-inactive.svg` (from .06.svg)
- `key-purple.svg` (from .07.svg)
- `regular-purple-active.svg` (from .08.svg)
- `regular-purple-icon.svg` (from .09.svg)
- `regular-purple-inactive.svg` (from .10.svg)

### 2. Update Font Import
Update `src/index.css` to:
- Replace "Cinzel" with "Pirata One" from Google Fonts
- Update font-family references throughout

```text
Google Fonts URL: 
https://fonts.googleapis.com/css2?family=Pirata+One&family=Inter:wght@300;400;500;600&display=swap
```

### 3. Create New SkillNode Component with SVG Shapes
Completely rework `src/components/SkillNode.tsx` to:
- Import the SVG files as React components or image sources
- Display the appropriate SVG based on skill type (category/key/regular) and state (active/inactive)
- Overlay the skill name text using Pirata One font
- Apply glow effect behind active shapes using CSS filter/box-shadow
- Apply grayscale filter for inactive skills

### 4. Add Glow Effect Styling
Update `src/index.css` to add:
- Glow animation for active skills
- Grayscale filter for inactive skills
- Text styling with Pirata One font

```text
Key CSS additions:
- .skill-node-glow: Drop shadow/blur effect behind active shapes
- .skill-node-grayscale: filter: grayscale(100%) for inactive
- .skill-text: Pirata One styling with text-shadow for legibility
```

### 5. Update Tailwind Config
Update `tailwind.config.ts`:
- Add 'Pirata One' to the display font family
- Ensure font-family utilities are available

---

## Technical Details

### Font Integration
```text
- Font: Pirata One (display/decorative)
- Source: Google Fonts
- Usage: Skill names, modal headings
- Fallback: Keep Inter for body text
```

### SVG Rendering Strategy
The SVGs are complex with embedded images and filters. Best approach:
1. Copy SVGs to `public/shapes/` directory for direct URL reference
2. Use `<img>` tags with the SVG paths
3. Layer text on top using absolute positioning
4. Apply CSS filters for glow and grayscale effects

### Glow Effect Implementation
```text
For active skills:
- CSS filter: drop-shadow(0 0 10px rgba(80, 97, 222, 0.8))
- Additional box-shadow for layered glow
- Subtle pulse animation for emphasis

For inactive skills:
- CSS filter: grayscale(100%)
- Reduced opacity (handled by SVG already at 0.6)
```

### Text Overlay
```text
Position: absolute, centered over the SVG shape
Font: 'Pirata One', serif
Color: White for active, gray for inactive
Text-shadow: 1px 1px 2px rgba(0,0,0,0.8) for legibility
Size: Responsive based on node size
```

---

## Files to Modify

1. **`src/index.css`**
   - Update Google Fonts import (replace Cinzel with Pirata One)
   - Add glow and grayscale filter classes
   - Update font-family references

2. **`tailwind.config.ts`**
   - Update display font to 'Pirata One'

3. **`src/components/SkillNode.tsx`**
   - Complete rewrite to use SVG images
   - Add text overlay with Pirata One
   - Implement glow effects
   - Implement grayscale filter for inactive

4. **New files in `public/shapes/`**
   - 10 SVG files copied from user uploads

---

## Visual Result

**Active Skills:**
- Full color SVG shape displayed
- Glowing effect behind the shape (purple/blue glow)
- White "Pirata One" text overlaid on shape
- Subtle pulse animation

**Inactive Skills:**
- Grayscale SVG shape displayed  
- No glow effect
- Darker/gray text overlay
- Static (no animation)

**Category Nodes:**
- Larger ornate frame SVG
- Same active/inactive treatment
- Larger text size

**Key Items:**
- Medium-sized key SVG (89x92)
- Enhanced glow effect
- Same text treatment

