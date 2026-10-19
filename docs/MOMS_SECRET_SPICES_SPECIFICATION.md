# MOM'S SECRET SPICES — IMMERSIVE 3D CULINARY EXPERIENCE
## Master Architectural Blueprint & Creative Implementation Specification

**Brand:** Mom's Secret Spices (Crafted by Akshaya Foods, Bengaluru, Karnataka)  
**Tagline:** *"Authentic artisanal Indian spice blends freshly stone-ground and curated for everyday culinary magic."*  
**WhatsApp Order Hotline:** `+91 99001 61030` (`https://wa.me/919900161030`)  
**Primary Design Inspiration:** [Agrumea Farm](https://www.agrumeafarm.it/) (Perspective product choreography, jar-flight transitions, custom cursor pills, and monumental editorial typography)  
**Target Technology Stack:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Motion for React, Three.js, React Three Fiber (R3F), Drei

---

## 1. Brand Identity & Visual Language System

### 1.1 Color Palette & Surface Tokens
The atmosphere rejects generic supermarket brights and stark tech-portfolio minimalism in favor of a warm, spice-studio ambiance:

```
Core Brand Palette:
  ├── Cream Base:          #FFF8EE (warm stone-ground flour & parchment tone)
  ├── Terracotta:          #A9472A (roasted red chilli & earthen clay pots)
  ├── Dark Brown:          #39251E (deep roasted coriander, clove & dark timber)
  ├── Heritage Gold:       #E8A33A (freshly milled turmeric & brass masala dabba)
  ├── Fresh Green:         #496844 (fresh curry leaves & green cardamom pod)
  └── Warm Sand:           #F0E2CF (raw cumin seeds & burlap spice sacks)
```

### 1.2 Typography System

| Role | Font Family | Fluid Scale | Weight | Editorial Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Monumental Display** | **Playfair Display** / **IvyMode**-equivalent high-contrast Serif | `clamp(3.5rem, 2.5rem + 6vw, 8rem)` | 400–700 | Dramatic titles (`"EVERY SPICE HAS A STORY"`, `"THE PANTRY"`, `"THE CRAFT"`). |
| **Curved Arc Marquee** | **Playfair Display** (Uppercase) | `clamp(1.5rem, 3vw, 3.5rem)` | 400 (Tracking `0.18em`) | Sweeping radial arc: `"STONE-GROUND · TRADITIONAL TEMPERING · PURE MASALA"`. |
| **Editorial Body** | **Plus Jakarta Sans** / **Inter** | `clamp(1.05rem, 1.25rem)` | 400–500 (Leading `1.4`) | Artisanal preparation notes, recipes, and heritage stories. |
| **Technical Labels & Pills** | **IBM Plex Mono** & Bold Sans | `0.8rem` (`13px`) | 600–700 (Tracking `0.08em`) | Uppercase status badges: `[AGMARK GRADE A]`, `[COLD STONE-MILLED]`, `50g / 100g / 250g`. |

---

## 2. Signature Hero — "The World of Spices"

### 2.1 Viewport Composition
- **Atmospheric Lighting:** Warm directional amber key light (`#FFE2B3`) casting long, soft shadows, with a subtle golden rim light simulating an open morning kitchen window.
- **Background Texture:** Warm Sand (`#FFF8EE` with a 3% SVG spice grain noise filter) overlaid with a subtle rotating terracotta elliptical backdrop disc.
- **Hero Typography:**
  - Headline: *"Every Spice Has a Story."*
  - Supporting Statement: *"Rooted in Indian kitchens. Crafted with care. Made to bring everyday cooking to life."*
  - CTA Button: Pill with character roll text: `EXPLORE COLLECTION →`.

### 2.2 Hero 3D Composition (R3F Scene)
- **Central Packaging:** Authentically modeled curved spice pouch or brass masala container with displacement mapping for realistic fabric wrinkles and tactile foil sheen.
- **Floating Whole Spices:**
  - Guntur red chillies with natural curved stems.
  - Golden turmeric roots with organic bark-like roughness.
  - Cinnamon bark rolls, star anise, and whole green cardamom pods.
- **Particle Atmosphere:** Custom point cloud particle system emitting 120 tiny floating spice dust specks drifting with subtle Brownian motion.
- **Pointer Parallax:** Interactive mouse lerp tilting the pouch and scattering particles in opposing depth planes.

---

## 3. Interactive 3D Spice Collection (The Radial Perspective Carousel)

Inspired by Agrumea's perspective jar carousel, this serves as the primary discovery engine:

```
Perspective Carousel Layout:
       [ Card 0: Pure Chilli ] (scale 0.55, z: -200px)
              \
               [ Card 1: Turmeric Powder ] (scale 0.78, z: -100px)
                     \
                      [ CENTER ACTIVE: Garam Masala ] (scale 1.0, z: 0px, tilt: -8°)
                     /
               [ Card 3: Dum Biryani Masala ] (scale 0.78, z: -100px)
              /
       [ Card 4: Magic Masala ] (scale 0.55, z: -200px)
```

### Carousel Mechanics:
1. **Active Center Stage:** The highlighted spice pouch sits proud in the center, rendered with high specular reflections.
2. **Radial Elliptical Curve:** Cards follow the mathematical formula:
   $$X = R_x \cdot \sin(\theta), \quad Z = R_z \cdot (\cos(\theta) - 1), \quad \text{RotateY} = -\theta \cdot 0.85$$
3. **Cursor Pill Interaction:** Hovering over the active product reveals a floating cream capsule cursor:
   `[ ♦ DISCOVER THE BLEND ]` that springs smoothly to the pointer.
4. **Touch & Drag Navigation:** Supports frictionless mouse drag and mobile touch swiping with momentum damping (`inertia`).

---

## 4. The "Jar / Pouch-Flight" Transition to Product Detail

When a visitor clicks on any product in the 3D carousel:
1. **Pre-Flight Freeze:** Adjacent carousel cards and background typography ease to `opacity: 0` and `scale: 0.95` over `350ms`.
2. **Coordinate Flight:** The selected 3D pouch / image clones to a top-level fixed overlay (`z-index: 10000`). It smoothly un-tilts from `-8°` to `0°` and glides to the center-top position of the dedicated product detail route (`/products/[slug]`).
3. **Curtain Lift:** A terracotta transition panel wipes up with an ambient 1px gold line, seamlessly docking the product into its full detail view.

---

## 5. Product Catalog — 27 Authentic Akshaya Foods Items

The catalog organizes all 27 verified products into 4 intuitive categories:

```
┌────────────────────────────────────────────────────────────────────────┐
│ [ All Products ]  [ Pure Spices ]  [ Masala Blends ]  [ Regional ] ... │
├────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│ │ Turmeric     │  │ Pure Chilli  │  │ Garam Masala │  │ Dum Biryani  │ │
│ │ Powder       │  │ Powder       │  │              │  │ Masala       │ │
│ │ ₹45 (100g)   │  │ ₹65 (100g)   │  │ ₹85 (100g)   │  │ ₹95 (100g)   │ │
│ └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Verified Catalog Categories & Sample Pricing:
1. **Pure Spices:**
   - *Turmeric Powder (Haldi)*: ₹25 (50g), ₹45 (100g), ₹85 (200g)
   - *Pure Red Chilli Powder (Mirchi)*: ₹35 (50g), ₹65 (100g), ₹125 (200g)
   - *Coriander Powder (Dhania)*: ₹30 (50g), ₹55 (100g), ₹105 (200g)
   - *Cumin Powder (Jeera)*: ₹40 (50g), ₹75 (100g), ₹145 (200g)
2. **Signature Masala Blends:**
   - *Garam Masala*: ₹48 (50g), ₹85 (100g), ₹165 (200g)
   - *Kitchen King / Magic Masala*: ₹50 (50g), ₹90 (100g), ₹175 (200g)
   - *Chat Masala*: ₹45 (50g), ₹80 (100g)
3. **Regional Heritage Blends:**
   - *Bisi Bele Bath Powder (Karnataka)*: ₹50 (50g), ₹95 (100g), ₹180 (200g)
   - *Traditional Sambar Powder (Tamil Nadu / South India)*: ₹45 (50g), ₹85 (100g), ₹160 (200g)
   - *Chutney Podi (Gunpowder / Idli Chutney Powder)*: ₹40 (50g), ₹75 (100g)
   - *Dum Biryani Masala (Hyderabadi / North Indian)*: ₹55 (50g), ₹98 (100g), ₹190 (200g)
   - *Chicken 65 & Kabab Masala*: ₹45 (50g), ₹85 (100g)
4. **Gourmet Seasonings & Refreshers:**
   - *Chilli Garlic Seasoning*: ₹60 (100g)
   - *Jal Jeera Refreshing Masala*: ₹45 (100g)

---

## 6. Product Detail View & WhatsApp Conversion Engine

### 6.1 Detail Layout
- **Hero Stage:**
  - High-res product packshot with interactive 3D rotation option.
  - Symmetrical metadata pillars:
    - *Left:* Category & Regional Origin (e.g. *Karnataka Heritage Blend*)
    - *Right:* Grade & Quality Seal (*100% Stone-Ground · No Anti-Caking Agents*)
- **Weight Selectors:** Minimalist circular outline-to-fill pills: `[ 50g ]  [ 100g ]  [ 200g ]  [ 250g ]`.
- **Dynamic Price Display:** Real-time price calculation in Indian Rupees (e.g., `₹85`).
- **Quantity Selector:** Stepper (`-  1  +`).

### 6.2 WhatsApp Prefilled Order Engine
Clicking the prominent **"Order via WhatsApp"** button constructs a fully encoded URL to the official Akshaya Foods number:

```typescript
const buildWhatsAppOrderUrl = (
  productName: string,
  packSize: string,
  quantity: number,
  unitPrice: number
): string => {
  const totalPrice = unitPrice * quantity;
  const message = 
    `Namaste Akshaya Foods! 🙏\n\n` +
    `I would like to place an order from Mom's Secret Spices:\n` +
    `• Product: ${productName}\n` +
    `• Pack Size: ${packSize}\n` +
    `• Quantity: ${quantity}\n` +
    `• Total Estimate: ₹${totalPrice}\n\n` +
    `Please share payment and delivery details. Thank you!`;

  return `https://wa.me/919900161030?text=${encodeURIComponent(message)}`;
};
```

---

## 7. Cinematic Scroll Storytelling (The 5 Scenes)

1. **Scene 1 — The Whole Spices:** Macro photography of whole Byadgi chillies, Salem turmeric, and Tellicherry black pepper with gentle parallax drift.
2. **Scene 2 — The Ancient Craft:** Stone-milling at slow RPMs to prevent heat degradation of volatile essential oils.
3. **Scene 3 — The Transformation:** Visual blend where crushed spices fall into golden brass bowls.
4. **Scene 4 — The Living Kitchen:** Real Indian home cooking moments (sputtering mustard seeds, tempering *tadka*, fragrant biryani steam).
5. **Scene 5 — The Pantry Invitation:** Perspective transition leading directly into the curated 27-item catalog.

---

## 8. Fullscreen Editorial Navigation

```
Fullscreen Navigation Layout:
┌────────────────────────────────────────────────────────────────────────┐
│ [ EN / हिन्दी / ಕನ್ನಡ ]         MOM'S SECRET SPICES           [ CLOSE ×]│
│                               By Akshaya Foods                         │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   HOME ♦                                                               │
│                     COLLECTION                                         │
│                                    THE CRAFT                           │
│                                                   EXPERIENCE           │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│ Karnataka Heritage   |   Wholesale (HoReCa)   |   WhatsApp: +91 99001  │
└────────────────────────────────────────────────────────────────────────┘
```
- **Entrance:** Terracotta sheet slides from top with staggered character reveals on navigation links.
- **Micro-Interaction:** Hovering a link triggers a dual-char roll and rotates the active gold diamond (`♦`).

---

## 9. Performance, Fallback & Accessibility Guarantees

1. **Asset Compression:**
   - 3D models compressed with glTF-Transform (Draco/Meshopt) to `< 1.5 MB`.
   - All food packshots delivered as modern `.webp` with responsive `srcset` (`sizes="800px"`).
2. **Device Scaling & Mobile Simplification:**
   - Desktop: Full real-time R3F PBR shaders and particle simulation.
   - Mobile: High-performance CSS transform carousel with low-power 2D canvas fallback to preserve battery life and 60 FPS scrolling.
3. **Reduced Motion & A11y:**
   - Detects `prefers-reduced-motion`: replaces jar flights with instant fade transitions and disables continuous particle drift.
   - Full ARIA compliance on all tabs, quantity steppers, and dialogs via **shadcn/ui**.

---

*This specification represents the complete architectural blueprint for Phase 2 implementation.*
