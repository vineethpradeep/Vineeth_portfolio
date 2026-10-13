---
name: design-system-monocad-webflow-html-website-template
description: >
  Apply the Monocad - Webflow HTML Website Template design system when building or updating UI.
  Use when creating components, choosing colors or typography,
  or reviewing designs for marketing interfaces.
---

# Monocad - Webflow HTML Website Template — Design System Skill

## When to Use

- Building new UI components for Monocad - Webflow HTML Website Template.
- Reviewing or updating existing component styles.
- Choosing colors, typography, or spacing for marketing pages.
- Checking designs against the extracted token set.

## Context

- **Product:** Monocad - Webflow HTML Website Template — https://monocad-portfolio-template.webflow.io/
- **Surface:** marketing
- **Audience:** Business decision-makers and potential customers
- **Character:** Conversion-focused marketing presence with a balanced color system and 3 typefaces.

## Tokens

### Colors

| Token | Value | Role |
|-------|-------|------|
| color-1 | `#202020` | Text Primary |
| color-2 | `#0000EE` | Text Primary |
| color-3 | `#797979` | Background Dark |
| color-4 | `#FFFFFF` | Text Light |

### Typography

**Font stack:** Stack Sans Headline, Stack Sans Text, Stack Sans Notch

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 14px | Captions, metadata |
| text-sm | 16px | Labels, secondary text |
| text-base | 40px | Body text (default) |
| text-lg | 120px | Subheadings, emphasis |

**Weight scale:** 400 · 500
**Line heights:** 20.48px · 48px · 24px · 129.6px · 21px

### Spacing

**Base unit:** 4px

`space-1: 6px` · `space-2: 12px` · `space-3: 16px` · `space-4: 24px` · `space-5: 30px` · `space-6: 38px` · `space-7: 60px` · `space-8: 120px` · `space-9: 203px` · `space-10: 224px`

### Shapes

**Border radius:** _None detected._

### Elevation

_None detected._

### Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-slow:** `0.4s cubic-bezier(0.645, 0.045, 0.355, 1)`
- **duration-slow:** `transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)`

## Component Inventory

- **Links:** 51 detected
- **Navigation:** 1 elements
- **Images:** 54 detected

## Constraints

### Always

- Use tokens from the tables above — do not introduce new values.
- Include hover, focus-visible, and disabled states for interactive elements.
- Follow the 4px spacing grid.
- Meet WCAG 2.2 AA contrast minimums.

### Never

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Tone

Concise, confident, implementation-focused. Avoid filler preambles.

## Authoring Workflow

When creating or documenting a component for this system:

1. State intent — one sentence on purpose.
2. Map tokens — list every token the component uses.
3. Define anatomy — named parts with token assignments.
4. Specify states — default, hover, focus-visible, active, disabled, loading, error, empty.
5. Describe interactions — keyboard, pointer, touch, edge cases.
6. Add a11y criteria — testable pass/fail checks.
7. List anti-patterns — concrete misuse examples.
8. Close with the Definition of Done checklist.

## Output Structure

Component guidelines must contain, in order:

1. Overview (purpose, when to use, when not to use)
2. Tokens and foundations
3. Anatomy, variants, responsive behavior
4. States and interactions
5. Accessibility (ARIA, contrast, focus, screen reader)
6. Content guidelines (copy rules, tone)
7. Anti-patterns with reasoning

## Component Requirements

- Reference only tokens from the tables above.
- Define all states: default, hover, focus-visible, active, disabled, loading, error.
- Handle edge cases: empty, overflow, truncation, max content.
- Include keyboard navigation behavior.
- Document ARIA roles and labels.

## Definition of Done

- Default state renders (smoke test).
- All states visually verified.
- Zero hardcoded visual values — tokens only.
- Keyboard navigation works without pointer.
- No critical a11y violations.
- Tested at min and max breakpoint.
- At least one anti-pattern documented.
- Purpose, usage, and limitations documented.
