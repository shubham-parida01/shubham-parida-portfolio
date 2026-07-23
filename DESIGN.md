---
name: Academic Precision
colors:
  surface: '#fcf8f8'
  surface-dim: '#ddd9d9'
  surface-bright: '#fcf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f1eded'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1c'
  on-surface-variant: '#45474a'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#75777b'
  outline-variant: '#c5c6ca'
  surface-tint: '#5d5e62'
  primary: '#111416'
  on-primary: '#ffffff'
  primary-container: '#26282b'
  on-primary-container: '#8e8f92'
  inverse-primary: '#c6c6ca'
  secondary: '#855323'
  on-secondary: '#ffffff'
  secondary-container: '#ffbb83'
  on-secondary-container: '#79491a'
  tertiary: '#191210'
  on-tertiary: '#ffffff'
  tertiary-container: '#2e2624'
  on-tertiary-container: '#988c89'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e6'
  primary-fixed-dim: '#c6c6ca'
  on-primary-fixed: '#1a1c1f'
  on-primary-fixed-variant: '#45474a'
  secondary-fixed: '#ffdcc2'
  secondary-fixed-dim: '#fcb980'
  on-secondary-fixed: '#2e1500'
  on-secondary-fixed-variant: '#693c0d'
  tertiary-fixed: '#eedfdc'
  tertiary-fixed-dim: '#d1c3c0'
  on-tertiary-fixed: '#211a18'
  on-tertiary-fixed-variant: '#4e4542'
  background: '#fcf8f8'
  on-background: '#1c1b1c'
  surface-variant: '#e5e2e1'
  bg-primary: '#FFFFFF'
  bg-secondary: '#F4F4F3'
  bg-card-alt: '#F1F1EF'
  bg-input: '#F0F0EF'
  text-primary: '#2B2B2B'
  text-secondary: '#6E6E6E'
  text-muted: '#9A9A9A'
  accent-blue: '#4C6E9E'
  border-light: '#E3E3E1'
  tag-bg: '#EFEFED'
typography:
  display-script:
    fontFamily: Sacramento
    fontSize: 80px
    fontWeight: '400'
    lineHeight: '1.1'
  display-light:
    fontFamily: plusJakartaSans
    fontSize: 52px
    fontWeight: '300'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  headline-hero:
    fontFamily: inter
    fontSize: 68px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-card:
    fontFamily: inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-main:
    fontFamily: inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-pill:
    fontFamily: inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1'
  display-light-mobile:
    fontFamily: plusJakartaSans
    fontSize: 36px
    fontWeight: '300'
    lineHeight: '1.2'
  headline-hero-mobile:
    fontFamily: inter
    fontSize: 42px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  section-gap: 5rem
  container-padding: 2rem
  card-padding: 1.5rem
  gutter: 1.5rem
---

# Design System — Shubham Parida Portfolio

Derived from DESIGN.md and PRD for Shubham Parida.

## 1. Brand Identity
**Personality:** Academic, Research-Oriented, Credible, Minimalist, Engineering-Led.
**Core Mission:** Presenting a high-fidelity research and ML profile for fellowship reviewers and recruiters.

## 2. Color Palette
| Token | Hex | Usage |
|---|---|---|
| `bg-primary` | `#FFFFFF` | Hero, Projects, Achievements, Contact backgrounds |
| `bg-secondary` | `#F4F4F3` | Splash screen, About Me, Experience sections |
| `bg-card` | `#FFFFFF` | Experience timeline cards, Achievement cards |
| `bg-card-alt` | `#F1F1EF` | Project cards |
| `bg-input` | `#F0F0EF` | Form field backgrounds |
| `text-primary` | `#2B2B2B` | Headings, bold names, primary labels |
| `text-secondary` | `#6E6E6E` | Body copy, meta information, descriptions |
| `text-muted` | `#9A9A9A` | Placeholder text |
| `accent-rust` | `#A9713F` | Nav "Experience" link, subtext labels, location values |
| `accent-blue` | `#4C6E9E` | Nav "Projects" link, Achievements nav link |
| `btn-dark` | `#26282B` | Primary buttons ("View Projects", "Send Message") |
| `border-light` | `#E3E3E1` | Card borders, tech pill outlines, dividers |
| `tag-bg` | `#EFEFED` | Skill and technology pill backgrounds |

## 3. Typography
1. **Tier 1 (Display Script):** Casual, connected cursive (e.g., *Caveat* or *Sacramento*) used for the Splash screen name ("Shubham Parida"). ~72-90px.
2. **Tier 2 (Light Display):** Light weight, geometric sans (e.g., *Quicksand Light* or *Poppins Light*) with wide letter spacing. Used for section headings ("Experience", "Projects", "Achievements", "Let's Connect"). ~48-56px.
3. **Tier 3 (Grotesk Sans):** Clean, professional sans (e.g., *Inter* or *General Sans*). 
   - **Bold cut:** Hero name ("Shubham Parida"). ~64-72px.
   - **Medium cut:** Card titles, button labels.
   - **Regular cut:** Body text, form fields, descriptions. Line-height 1.6.

## 4. Components & Layout
- **Splash Screen:** bg-secondary, Tier 1 script name, subtitle, outlined pill CTA.
- **Hero Section:** Two-column. Left: Tier 3 bold name, role, positioning statement, two pill buttons. Right: Static visual/graphic slot.
- **Section Headers:** Tier 2 light display, centered.
- **Experience Cards:** White cards on bg-secondary. Timeline dot-and-line (accented scroll indicator). Title (Bold) -> Meta (Small gray) -> Body -> Tag Pills.
- **Project Cards:** bg-card-alt on bg-primary. Rounded corners (16px), soft shadow, GitHub icon top-right. Title -> Description -> Tag Pills.
- **Achievement Cards:** Stacked or 3-column grid. Follows Experience card styling but without the timeline line.
- **Tag Pills:** Fully rounded, tag-bg fill, tight padding, small text.
- **Forms:** bg-input, no border, 12px radius, placeholder-as-label. Full-width btn-dark submit button.
- **Sticky Nav:** Horizontal, centered, underline active state indicator. Links: About Me, Experience, Projects, Achievements, Contact.

## 5. Interaction
- **Scroll Snapping:** Full-viewport height sections.
- **Scroll-Spy:** Nav underline moves with section scroll.
- **Chevron:** Bouncing "Scroll to explore" prompt in Hero.
- **Hover States:** Subtle scaling or opacity shift on cards and buttons.
