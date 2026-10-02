---
name: HuCrafts
description: A robotics engineer's portfolio drawn the way a robot sees its world, every subject a coordinate frame.
colors:
  paper: "#f7f7f5"
  ink: "#111315"
  ink-soft: "#3b3f44"
  ink-mute: "#5d6167"
  rule: "#d9dad6"
  well: "#ecedea"
  white: "#ffffff"
  axis-x: "#e5322d"
  axis-y: "#2bb24c"
  axis-z: "#2f6bff"
  signal-error: "#b3261e"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.6vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 118"
  subtitle:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  body-lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  ui:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
  frame-label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0px"
spacing:
  gutter-sm: "16px"
  gutter-md: "32px"
  gutter-lg: "48px"
  grid-cell: "32px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink-soft}"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  input-text:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "44px"
  nav-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.ui}"
  nav-link-hover:
    textColor: "{colors.ink}"
  tile-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    padding: "16px 20px 16px 112px"
  icon-button:
    textColor: "{colors.ink}"
    size: "40px"
---

# Design System: HuCrafts

## Overview

**Creative North Star: "Robot Frames"**

The site is drawn the way a robot sees its world. Every subject owns a coordinate frame: a red X, green Y, blue Z triad pinned to its bottom-left origin, named in monospace the way ROS names a TF frame (`frame: vincent`, `/skyslide`, `parent: world`). Everything else stays out of the way: a near-white neutral ground, near-black ink, 1px hairline rules, square corners. The triads are the only ornament, so they read as instrumentation rather than decoration.

The density is calm and editorial: wide gutters on a 1440px frame, a heavy expanded Archivo for headings against plain Archivo body text, and large real images of machines. Depth comes from the frame metaphor (a grid ground plane, triads that grow from their origin) instead of shadows or gradients. The world rejects the generic white image-grid portfolio and the dark neon "tech" page.

Motion is short and purposeful. The hero and project-hero triads draw X, then Y, then Z on load. Project tiles grow their triads from origin and raise an ink band on hover or focus. Reduced motion shows everything already drawn.

**Key Characteristics:**
- Neutral paper ground, ink text, hairline rules; no tinted surfaces beyond the well grey.
- Three axis colors that appear only as coordinate-frame triads, plus axis blue as the selection/focus state.
- Heavy expanded Archivo display; Archivo text; Geist Mono only for real frame names and coordinates.
- Square corners everywhere; 1px rules and 1px borders carry all structure.
- The 32px coordinate grid is the ground plane, reserved for empty or contain-fit frames.

## Colors

A near-achromatic neutral system with three saturated axis colors held in strict reserve.

### Primary
- **Robot Ink** (#111315): headings, body emphasis, primary button fill, top rule of fact blocks and the contact form, code-block ground, the tile hover band (at 90% opacity), and the text caret. It is the working accent of the system: every interactive emphasis is ink.

### Secondary
- **Frame Axis X Red** (#e5322d), **Frame Axis Y Green** (#2bb24c), **Frame Axis Z Blue** (#2f6bff): the three strokes of a coordinate-frame triad, always together, always X right, Y receding, Z up. Axis Z Blue additionally marks the frame-selection state: the 2px focus outline (offset 3px), input focus border and ring, the focus outline on project tiles, and the `::selection` fill (white text).

### Tertiary
- **Signal Error** (#b3261e): the contact form's failure message only. Deliberately darker and duller than Axis X Red so an error never reads as a frame axis.

### Neutral
- **Paper** (#f7f7f5): page ground, sticky nav (90% with a light backdrop blur), the halo stroke under every triad axis, and text on ink buttons.
- **Ink Soft** (#3b3f44): body paragraphs, nav links at rest, and the hover state of the primary button.
- **Ink Mute** (#5d6167): captions, fact labels, mono frame names, placeholders, list markers, and the hover state of icon links. 5.9:1 on white.
- **Hairline Rule** (#d9dad6): 1px dividers, nav and footer borders, input borders, figure rings, link underlines at rest, and the grid lines of the ground plane.
- **Well** (#ecedea): fill behind cover images while they load and the field color of the coordinate grid.
- **White** (#ffffff): input fields and figure backings, so drawings and form fields sit slightly forward of paper.

### Named Rules
**The Axis Reservation Rule.** Red, green, and blue appear only as coordinate-frame triads. Blue alone also signals frame selection (focus and text selection). No axis color is ever used for hover, links, fills, icons, or decoration.

**The Ink Hover Rule.** Every hover state moves between ink, ink-soft, and ink-mute: text darkens to ink, buttons lighten to ink-soft or invert to ink, underlines go from rule to ink, icons fade to ink-mute.

## Typography

**Display Font:** Archivo, expanded (`wdth` axis at 118%), with ui-sans-serif / system-ui fallback
**Body Font:** Archivo, normal width
**Label/Mono Font:** Geist Mono, with ui-monospace fallback

**Character:** One family carries the whole voice. Stretched wide and set extra-bold with tight negative tracking, Archivo reads like a stamped machine label; at normal width it is a plain, legible text face. Geist Mono is the robot's own voice and appears only where the robot would speak.

### Hierarchy
- **Display** (800, clamp(3rem, 7.4vw, 6rem), 0.95, -0.035em, expanded): the homepage greeting only.
- **Headline** (800, clamp(2.5rem, 5.6vw, 4.75rem), 0.98, -0.035em, expanded, max 18ch): project page titles. The contact pitch line uses the same voice at clamp(2rem, 4vw, 3.25rem).
- **Title** (800, 1.5rem to 1.75rem; 2rem in project sections, -0.025em, expanded): section headings (Work, About, Contact, project sections). The Tools & skills subheading drops to 700 at 1.25rem.
- **Subtitle** (600, 17px to 1.125rem, snug): tile titles, list item titles, fact values, school names.
- **Body** (400, 17px, 1.625, max 68ch on project pages; 1.125rem leads at max 34 to 44rem): paragraphs in ink-soft. Project leads run at 1.25rem.
- **UI** (400 to 600, 15px): nav and footer links, button text (600), input text, figure captions, the hover-band blurb, and form notes. Tile tags drop to 13px.
- **Label** (600, 0.875rem): form field labels and small column headings in ink-mute. Sentence case, no tracking, never uppercase.
- **Frame label** (Geist Mono 400, 0.75rem; 0.875rem beside project titles): frame names and coordinates in ink-mute.

### Named Rules
**The Real Frame Rule.** Geist Mono is used only for real frame names (`/skyslide`, `frame: vincent`), frame/parent labels, coordinates, the frame count on the Work header, triad axis letters, and code blocks. Everything else, including small labels, is Archivo.

**The Wide Voice Rule.** Expanded width is for headings at title size and above (and the mobile menu links). Body copy never runs expanded.

## Layout

Content sits in a 1440px frame with gutters of 16px, 32px from `sm`, and 48px from `lg`. Project bodies narrow to a 1120px reading column under a hero that runs edge to edge (44vh on mobile, min(72vh, 760px) from `sm`). Homepage sections stack with 80 to 96px of vertical rhythm, separated by 1px rules rather than background bands.

Recurring structures:
- **Split hero:** portrait frame (5fr) beside text (6fr) from `lg`, 64px gap, vertically centered; stacks with the portrait first on mobile (5:4 aspect, 4:5 on desktop, capped at 64vh).
- **Label column:** About, Writing, and Contact use a 14rem heading column beside content from `lg`.
- **Work grid:** 1, 2, then 3 columns (`sm`, `lg`), 20px column gap, 40px row gap, 4:3 tiles, captions below.
- **Fact grid:** 1 to 3 columns of label/value pairs, each closed by a hairline, opened by a single ink rule.

Breakpoints are Tailwind defaults (640, 768, 1024, 1280px). The nav collapses to a menu button below 768px.

## Elevation & Depth

The system is flat. There are no shadows. Depth is conveyed by the frame metaphor: the coordinate grid as a ground plane, triads standing on their origins, and white surfaces (inputs, figures) sitting a half-step forward of paper. The only layered surfaces are the sticky nav (paper at 90% with a small backdrop blur) and the tile hover band (ink at 90%) rising over an image.

### Named Rules
**The Ground Plane Rule.** The 32px coordinate grid (rule-colored lines on well) is the floor a frame sits on. It appears only behind the portrait placeholder, pending project tiles, and contain-fit project heroes where a drawing must stay whole. It is never a page or section background.

## Shapes

Every corner is square (0px). Structure comes from 1px lines: hairline rules between items, 1px rule borders on inputs and the menu button, a 1px ink border on the outline button, a 1px ink rule opening fact blocks and the form. Images are cropped into hard 4:3 or full-bleed rectangles. The triad is the one recurring non-rectangular form: square-capped strokes, filled arrowheads, an ink origin dot, all with a paper halo so they read over any image.

## Components

### Buttons
Solid and blunt, like a machine control.
- **Shape:** square (0px), 48px tall, 24px horizontal padding, Archivo 600 at 15px.
- **Primary:** ink fill, paper text. Hover lightens to ink-soft. Used for "See the work" and "Send message" (with a trailing arrow).
- **Outline:** 1px ink border, ink text; hover inverts to ink fill, paper text. Used for resume links.
- **Focus:** the global 2px axis-blue outline, offset 3px.
- **Disabled:** 60% opacity, not-allowed cursor.

### Cards / Containers
There are no cards. Grouping is done with hairline rules, `divide-y` lists, and the label column.

### Inputs / Fields
- **Style:** white field, 1px rule border, square, 44px tall (textarea 5 rows), 12px horizontal padding, 15px text, Archivo 600 label above at 0.875rem.
- **Focus:** border and a 1px ring switch to axis blue; the default outline is suppressed in favor of the ring.
- **Error:** form-level message in signal error with an email fallback; no per-field error styling exists.

### Navigation
Sticky 64px bar on paper at 90% with a backdrop blur and a hairline bottom border. Wordmark at left, then text links (15px, ink-soft, hover to ink with a 2px ink underline offset 6px). LinkedIn and email as 40px icon buttons at right (ink, hover to ink-mute). Below 768px a square bordered menu button opens a full-width list of expanded semibold 1.125rem links divided by hairlines. The footer repeats the links centered, underlined in rule at rest and ink on hover, with a small triad beside the wordmark and a mono `frame: hucrafts · parent: world` line.

### Links
Inline links carry a 2px underline offset 5px, rule-colored at rest and ink on hover. Row links (Writing list) underline the title on hover and nudge an up-right arrow.

### Coordinate-Frame Triad (signature)
An SVG X/Y/Z triad drawn RViz-style: X red to the right, Y green receding up-right, Z blue straight up, from an ink origin dot pinned to the bottom-left corner of whatever it marks. A paper halo sits under every stroke and label. Sizes in use: 132px with labels on the hero portrait, 120px with labels on project heroes, 84px on project tiles, 56px on pending tiles, 34px in the footer. Hero triads draw in sequence (each axis 700ms, staggered 140ms, arrowheads fading in after); reduced motion shows them drawn.

### Project Tile (signature)
A 4:3 image frame with a triad at its origin at rest (84px scaled to 0.42, about 35px). On hover or focus the triad scales to full size from its origin and its x/y/z labels fade in, while an ink band (90%) rises from the bottom edge with the blurb in white and the tags in white at 75%, left-padded to clear the triad. Both moves run 500ms on cubic-bezier(0.16, 1, 0.3, 1) and are instant under reduced motion. The title (Archivo 600, 17px) and the mono `/frame` name always sit visible below the tile, so the tile works on touch. Focus draws a 2px axis-blue outline offset 4px around the image.

**Pending tile:** an open frame. The grid ground plane, a 56px triad at its origin, "write-up in progress" centered in ink-mute, the caption below, and no link.

### Project Facts
Opened by a 1px ink rule; label/value pairs in a 1 to 3 column grid, each closed by a hairline. Labels are Archivo 0.875rem in ink-mute, values Archivo 600 at 1.125rem. A Tools & skills list follows as hairline-divided rows with a 14rem area column.

### Figure
White backing with a 1px rule ring, image contained, caption below in 15px ink-mute.

### Code Block
Ink ground, paper text, Geist Mono 0.875rem with relaxed leading, 20px padding, square corners, horizontal scroll.

## Do's and Don'ts

### Do:
- **Do** pin a triad to the bottom-left origin of every finished subject (portrait, project hero, project tile), with the paper halo intact.
- **Do** keep the three axis colors together and in their fixed directions: X red right, Y green receding, Z blue up.
- **Do** use axis blue (#2f6bff) for focus outlines, input focus rings, and text selection, and nowhere else outside a triad.
- **Do** give every project a real frame name in Geist Mono (`/skyslide`) shown beside its title on the tile and the project page.
- **Do** keep tile titles visible below the image at all times; the hover band adds the summary, it never hides the title.
- **Do** separate content with 1px rules and keep every corner square.
- **Do** honor reduced motion: triads drawn and tiles static.

### Don't:
- **Don't** use red, green, or blue for hover states, links, buttons, icons, badges, or decoration; hovers move between ink, ink-soft, and ink-mute.
- **Don't** set ordinary labels, captions, dates, or UI text in Geist Mono; mono is for frame names, coordinates, and code only.
- **Don't** add drop shadows, rounded corners, gradients, or tinted card surfaces.
- **Don't** use the coordinate grid as a page or section background; it is the ground plane under empty or contain-fit frames only.
- **Don't** add uppercase tracked labels above headings; section headings stand alone in the expanded display voice.
- **Don't** add a triad to something that is not a subject with its own frame; triads are the only ornament because they are rare.
