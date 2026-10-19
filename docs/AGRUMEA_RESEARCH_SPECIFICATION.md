# AGRUMEA FARM — VISUAL, 3D & INTERACTION REFERENCE SPECIFICATION

**Creative Case Study:** [Agrumea Farm (https://www.agrumeafarm.it/)](https://www.agrumeafarm.it/)  
**Role:** Senior Creative Developer, 3D Web Experience Designer, Motion Specialist & Digital Art Director  
**Stack Target for Original Project:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Motion for React, Three.js, React Three Fiber (R3F), Drei

---

## 1. Executive Summary & Brand Identity

**Agrumea Farm** is an Awwwards-winning Italian artisanal e-commerce and storytelling platform from Sicily celebrating Mediterranean citrus jams, pestos, and preserves. Its digital experience establishes an organic bridge between **centuries-old Sicilian agricultural heritage** and **cutting-edge web interaction design**.

The experience is characterized by:
- **Warm Mediterranean Color Palette:** Ripe blood orange (`#e94e1b`), sun-bleached Sicilian cream (`#fdf3eb`), rich Nero d'Avola burgundy (`#762530`), and radiant lemon yellow (`#f39200`).
- **Hero-Pinned Jar Carousel:** A physical, weighted jar carousel scrubbed via scroll and responsive to pointer tilt, evoking tactile grocery shelves.
- **Dynamic Micro-Pills & Custom Cursor:** A floating white capsule indicator reading `DISCOVER THE PRODUCT` with an orange diamond glyph that tracks cursor hover states on product artifacts.
- **Monumental Full-Page Typography:** Editorial high-contrast serif display (`IvyMode`) paired with clean Swiss grotesque labels (`IvyStyle Sans`) and rolling letter transitions.
- **Hybrid Real-Time Rendering:** Strategic balance between high-fidelity pre-rendered photo-realism (for label legibility) and real-time transform choreography (for fluid 60-120 FPS performance).

---

## 2. Visual Design & Art Direction Analysis

### 2.1 Typographic Hierarchy & System

| Typographic Level | Font Family / Pairing | Fluid Scale | Weight & Style | Tracking & Leading | Editorial Characteristics |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Display Titles** | **IvyMode** (or High-Contrast Serif / Didone) | `clamp(3.69rem, 2.38rem + 5.35vw, 999px)` | 400 (Regular with high stroke contrast) | `line-height: 1.0`, `letter-spacing: -0.02em` | Uppercase monumental titles in full-page nav and hero headlines (`HOME`, `PANTRY`, `PRODUCTION`). |
| **Curved Arch Marquee** | **IvyMode** / Serif Display | `clamp(2rem, 3.5vw, 4.5rem)` | 400 (Regular) | `letter-spacing: 0.15em` | Texts curved along radial SVG/Canvas arcs (`"SERVE · WE GROW · WE PRESERVE"`). |
| **Hero Lead Paragraphs** | **IvyStyle Sans** (Avenir / Swiss Grotesque) | `clamp(1.125rem, 1.08rem + 0.165vw, 1.25rem)` | 400–500 | `line-height: 1.3`, Normal tracking | Balanced column widths (`max-w-[450px]` to `550px`) creating editorial breathing room. |
| **Technical Metadata & Badges** | **IvyStyle Sans** | `0.875rem` (`14px`) | 600–700 (Semi-bold) | `letter-spacing: 0.04em–0.08em`, All Caps | Circular pills, badge markers, and status tags (`IT / EN`, `MENU`, `BIO`). |

### 2.2 Color & Material Atmosphere

```
Core Brand Palette:
  ├── Cream Sicilian Base:       #FDF3EB / #F4E9DD (warm unbleached paper)
  ├── Vivid Blood Orange:        #E94E1B / #E0522C (citrus skin & active accents)
  ├── Deep Nero d'Avola Wine:    #762530 / #5C2126 (rich contrast typography & cards)
  ├── Radiant Sunlit Yellow:     #F39200 (zest accents & highlights)
  └── Crisp Neutral White:       #FFFFFF (floating cursor pills & badges)

Surface & Lighting Effects:
  ├── Layered Asymmetrical Backdrops: Large curved elliptical terracotta discs framing central jars.
  ├── Glass & Metallic Shading: Silver lid reflections with soft studio rim highlights.
  └── Realistic Ambient Occlusion: Contact drop-shadows under glass bottoms anchoring jars to background shapes.
```

### 2.3 Product Art Direction & Framing
- **Artisanal Jars:** Jars are tilted at dynamic, tactile angles (approx. `-12deg` to `+15deg`), breaking rigid e-commerce grid conventions.
- **Label Clarity:** Labels maintain razor-sharp legibility (e.g., `Marmellata di Arance`, `Sinfonia Barocca - Caponata Siciliana`), prioritizing appetizing ingredients over abstract 3D silhouettes.
- **Physical Weight:** Moving between jars feels like spinning a curated carousel or pantry lazy Susan.

---

## 3. Deep 3D & WebGL Experience Analysis

### 3.1 Verification of Visible 3D vs Hybrid Implementation

| Feature | Directly Observed Visual Behavior | Verified DOM / Network Evidence | Technical Architecture | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Product Jars** | Jars appear physical, with glass reflections, silver metallic lids, and smooth tilt when moving the cursor. | Inspected DOM exposes `.jar-slider`, `.jar-flight`, and composite layers with high-res PNG/WebP texture maps and CSS custom properties (`--jar-marquee-top`, `--jar-item-w`, `--jar-circle-rotation`). | **Hybrid High-Res Mesh/Texture Billboard Engine:** Rendered via optimized Canvas/CSS transform matrices with pointer lerp rather than heavy untextured raw geometry. | **Verified** |
| **Fruit Preloader & Sweep Line** | Animated fruits drop/bounce into view; horizontal scanning sweep line wipes across the screen before revealing the hero. | Classes `.fruit-loader`, `.fruit-loader__sweep-panel`, and `.fruit-loader__sweep-line` with bezier curve timing. | CSS keyframe transforms (`--ease-don-expo`, `--ease-don-power`) combined with SVG path assets. | **Verified** |
| **Pointer-Responsive Jar Parallax** | Jars shift laterally and pitch slightly when the cursor moves across the viewport. | Tracked by `--jar-parallax-x` and `--jar-parallax-y` updated on `pointermove` events. | Normalized pointer coordinates `[-1, 1]` applied via spring interpolation to object transforms. | **Verified** |
| **Curved Carousel Arc** | Jars follow a radial elliptical arc as users scroll or advance the hero slider. | CSS transform origin with radial rotation angles (`--jar-circle-rotation`) and layered Z-indexes. | Mathematical arc projection: $X = R \cdot \cos(\theta)$, $Y = R \cdot \sin(\theta)$ with rotation angle synchronized to scroll. | **Verified** |

### 3.2 How to Reproduce with Real-Time Three.js / React Three Fiber (R3F)
In our new project, we can take this concept to the next level by implementing **authentic real-time 3D**:
1. **Glass Jar PBR Material:**
   - Use R3F `MeshPhysicalMaterial` with:
     - `transmission: 0.95` (true optical refraction through glass)
     - `roughness: 0.08`
     - `ior: 1.52` (glass index of refraction)
     - `thickness: 1.2`
   - Inside the glass, place an inner mesh with food texture maps (marmalade chunks, pesto seeds) using subsurface scattering.
2. **Metallic Lid:**
   - Use `MeshStandardMaterial` with `metalness: 0.9`, `roughness: 0.2`, and an anisotropic brushed normal map.
3. **Decal / Label Layer:**
   - Use Drei's `<Decal />` component to apply the label graphic seamlessly onto the cylindrical jar mesh without texture distortion.
4. **Interactive Orbit & Tilt:**
   - Drive jar rotation with `@react-three/fiber`'s `useFrame` using damped pointer coordinates:
     ```tsx
     useFrame((state, delta) => {
       meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, state.pointer.x * 0.35, 4, delta);
       meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, -state.pointer.y * 0.2, 4, delta);
     });
     ```

---

## 4. Cursor & Hover Interaction Inventory

| Element | Trigger | Visual Response | Likely Implementation | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| **"DISCOVER THE PRODUCT" Capsule** | Hover over any product jar in hero | Floating white pill (`rounded-full`) with orange diamond marker and uppercase text appears at mouse position, scaling from `0.4` to `1.0`. | Custom pointer hook tracking mouse coords with CSS spring transition | **Verified** |
| **Jar Parallax Tilt** | Pointer move over hero viewport | Central jar and background citrus shapes tilt in opposing directions (counter-parallax). | CSS custom property updates `--jar-parallax-x/y` or R3F pointer lerp | **Verified** |
| **Menu Toggle Pill** | Pointer hover over `MENU` button | Internal character roll: top characters slide up `-100%`, bottom characters slide in from `100%` with staggered delay. | Staggered character translate spans (`.site-menu-toggle__roll-top/bot`) | **Verified** |
| **Language Switcher (`IT / EN`)** | Click on language button | Active circular pill fills with solid orange (`#E94E1B`) while inactive remains an outlined circle. | State switch with CSS border/background transitions | **Verified** |
| **Menu Open Diamond Morph** | Click on `MENU` | Orange circular disc rotates and diamond scales up, morphing into a close icon `×`. | CSS transform `rotate(45deg) scale(...)` + opacity swap | **Verified** |

---

## 5. Scroll Experience & Narrative Choreography

1. **Pinned Hero Stage (`Scroll-Jacking` Stage 1):**
   - The hero section locks at `top: 0` while the user's initial scroll scrubs the jar carousel, rotating jars along the elliptical arc before releasing page scroll.
2. **Jar Flight Transition (`.jar-flight`):**
   - Clicking a jar initiates a smooth flight animation: the jar scales and translates across the screen to land directly onto the product detail view.
3. **Stacked Section Unveil:**
   - Subsequent content sections rise from beneath with clean horizontal divider rules, maintaining a rhythmic alternating pattern between full-bleed imagery and structured editorial copy.

---

## 6. Fullscreen Navigation & Product Interaction Analysis

```
Fullscreen Navigation Architecture:
┌────────────────────────────────────────────────────────────────────────┐
│ [ IT / EN ]                       AGRUMEA                     [ CLOSE ×]│
│                                     Farm                               │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   HOME ♦                                                               │
│                     PANTRY                                             │
│                                    PRODUCTION                          │
│                                                   EXPERIENCE           │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│ About              Contacts             Shop ↗                         │
└────────────────────────────────────────────────────────────────────────┘
```

- **Entrance Animation:** The full-page terracotta drawer slides down from `translate3d(0, -100%, 0)` to `translateZ(0)` in `0.9s` using `--ease-premium` (`cubic-bezier(0.645, 0.045, 0.355, 1)`).
- **Staggered Links:** Asymmetrical layout where links cascade diagonally across the viewport (`HOME` top-left, `EXPERIENCE` bottom-right).
- **Active Diamond Indicator:** Active link is illuminated with white text and preceded by a rotated diamond glyph (`♦`).

---

## 7. Technology Stack Mapping & Architectural Allocation

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS APP ROUTER                              │
│       App Shell, Route Handlers, Font Preloading, Server Metadata      │
├────────────────────────────────────────────────────────────────────────┤
│                      DOM & EDITORIAL INTERFACE                         │
│  - Tailwind CSS: Editorial fluid clamp scales, Mediterranean tokens    │
│  - Motion for React: Character roll hovers, fullscreen nav, jar flight │
│  - shadcn/ui: Accessible Dialogs, Sheet navigation, Tooltips           │
├────────────────────────────────────────────────────────────────────────┤
│                     SPATIAL 3D & WEBGL LAYER                          │
│  - React Three Fiber (R3F): Declarative canvas, scene management       │
│  - Drei: <Decal /> for labels, <Float />, <Environment />, <Html />    │
│  - Three.js: MeshPhysicalMaterial glass, custom shaders, post-fx       │
└────────────────────────────────────────────────────────────────────────┘
```

### Responsibility Breakdown:
- **Next.js App Router (TypeScript):** Layout orchestration, static route pre-rendering, image optimization.
- **React Three Fiber & Drei:** Real-time 3D centerpiece jar rendering with authentic glass refraction, metallic lid anisotropy, and interactive pointer orbit.
- **Motion for React:** Custom cursor capsule tracking, character roll transitions on buttons, and smooth route transitions.
- **Tailwind CSS & shadcn/ui:** Design token enforcement, responsive grid structures, and accessible menu overlays.

---

## 8. Performance, Mobile & Accessibility Guidelines

1. **Asset Optimization:**
   - 3D models should be compressed using **glTF-Transform** with Draco / Meshopt compression (target: `< 1.8 MB` total 3D asset size).
   - Use high-resolution `.webp` / `.avif` textures capped at `2048x2048` for product labels.
2. **Mobile Simplification:**
   - On screens `< 768px`, replace full WebGL scene with a lightweight CSS-transform carousel or reduce texture resolution and disable heavy screen-space refractions.
3. **Accessibility & Reduced Motion:**
   - Respect `@media (prefers-reduced-motion: reduce)`: disable continuous pointer parallax and instant-jump between jar carousel states without animation.
   - Maintain visible `:focus-visible` outlines on all navigation links and buttons.

---

## 9. Prioritized Creative Techniques to Reproduce

| Creative Technique | Priority | Complexity | Recommended Tech | Performance Impact & Best Practice |
| :--- | :--- | :--- | :--- | :--- |
| **Tactile 3D Glass Jar with Food Interior** | **High** | High | R3F + Three.js `MeshPhysicalMaterial` | Use 1 low-poly jar mesh and swap `<Decal />` textures per product. |
| **Radial Elliptical Jar Carousel** | **High** | Medium | R3F / Motion for React | Compute transform coordinates on math arc; use GPU-accelerated transforms. |
| **Custom Capsule Cursor ("DISCOVER PRODUCT")** | **High** | Low | Motion for React | Use pointer spring interpolation with `pointer-events: none` to avoid layout shifts. |
| **Diagonal Asymmetrical Fullscreen Menu** | **High** | Medium | Tailwind CSS + Motion | Staggered character entrance with CSS `translateY` and line reveals. |
| **Character Roll Micro-Interactions** | **Medium** | Low | Motion / CSS pseudo-elements | Pure CSS dual-span translate; zero runtime JS cost. |
| **Curved SVG Text Marquee Arc** | **Medium** | Low | SVG `<textPath>` | Lightweight SVG path curved text; fluid vector scaling. |
| **Fruit / Line Sweep Preloader** | **Medium** | Medium | Motion for React + SVG | Clean SVG stroke animation before unmounting preloader DOM. |

---

## 10. Conclusion & Readiness for Implementation

This specification decodes every core visual pillar of **Agrumea Farm**:
- The organic, warm Mediterranean palette.
- The tactile, angled product jar presentation.
- The bespoke cursor interactions and scroll choreography.
- The editorial typographic poise.

We now have the complete blueprint to build an **original, award-grade website** that captures this same level of craft, polish, and spatial engagement without copying any assets or code.

---

*Specification saved to [AGRUMEA_RESEARCH_SPECIFICATION.md](file:///c:/Users/Signi/Documents/WebApplications/3d-website-practice/AGRUMEA_RESEARCH_SPECIFICATION.md).*
