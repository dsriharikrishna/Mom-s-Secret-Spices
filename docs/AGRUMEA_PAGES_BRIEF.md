# AGRUMEA FARM — COMPLETE MULTI-PAGE & PRODUCT EXPERIENCE BRIEF

**Live Website Analyzed:** [https://www.agrumeafarm.it/en](https://www.agrumeafarm.it/en)  
**Role:** Senior Creative Developer, 3D Experience Designer, Motion Specialist & Art Director  
**Purpose:** Comprehensive interactive brief examining every subpage, product click behavior, flight transition, and section architecture to inspire an original, Awwwards-level website.

---

## 1. The Core Interaction: "Jar-Flight" Product Click

### How Clicking Products Works:
When the user clicks on any product jar in the hero carousel (or clicks the floating `DISCOVER THE PRODUCT` capsule):

1. **Pre-Flight Lock:**
   - The document cursor transforms to `progress`.
   - The hero background, rotating text arc, and sibling jars fade out smoothly (`opacity: 0`, `scale: 0.94`, transition duration `0.42s`).
2. **Flight Physics (`.jar-flight`):**
   - The clicked jar clones into a fixed overlay container (`z-index: 10000`, `position: fixed`).
   - Using CSS matrix transformations (`will-change: transform, opacity`), the jar smoothly scales and translates from its tilted carousel coordinates (`-12°` or `+15°`) to center viewport (`0°` rotation, scale `1.0`).
3. **Seamless Page Transition (`.page-transition`):**
   - A burgundy/terracotta sweep panel (`--color-border: #762530`) wipes across the screen from bottom-to-top (`transform: translate3d(0, -100%, 0)` in `900ms`) with a 1px white energy line.
   - The product detail page loads underneath, seamlessly revealing the full product story.

---

## 2. Comprehensive Page-by-Page Architectural Breakdown

### Page 1: Product Detail Page (e.g., `/en/pantry/orange-marmalade`)
- **Hero Staging:**
  - Enormous display headline: `ORANGE MARMALADE` in high-contrast terracotta serif (**IvyMode**).
  - Central isolated product jar presented vertically at high resolution.
  - Symmetrical metadata pillars flanking the jar:
    - *Left:* `Marmelade and Jams` (Category)
    - *Right:* `Made in Sicily – Italy` (Origin guarantee)
- **Weight / Format Selectors:**
  - Minimalist outlined circular pills allowing users to toggle jar sizes: `240 g` vs `1.2 kg` (and for pestos: `190 g`, `1 kg`, `3 kg`).
- **Editorial Photography Strip:**
  - Three-column curved rounded photo grid showcasing real-life consumption:
    - *Image 1:* Close-up macro of jar label and glass rim.
    - *Image 2:* Warm picnic scene with hands spreading fresh marmalade onto toasted rustic bread.
    - *Image 3:* Sibling product jar nestled in an orchard stone wall.
- **Tasting Notes & Ingredients:**
  - Clean typographic tables documenting percentage of Sicilian fruit (e.g. `82% Fruit Content`), total sugar levels, and zero artificial preservatives.
- **Footer Wordmark:**
  - Monumental oversized `AGRUMEA` wordmark spanning full width of the dark burgundy footer.

---

### Page 2: Pantry / Catalog Page (`/en/pantry`)
- **Header Intro:**
  - Centered editorial manifesto framed by two small diamond glyphs (`♦`):
    > *"We have selected the finest of our harvests to craft a line of ready-to-enjoy delicacies. La dispensa is a showcase of our artisanal creations - a signature pantry where the purity of our fruit meets only the finest ingredients."*
- **Hero Product Feature:**
  - Large horizontal card featuring picnic lifestyle photography alongside size tags (`240g`, `1.2kg`).
- **Product Card Grid (4-Column Layout):**
  - Crisp, rounded cards with light peach background tint (`#FFF0E6`).
  - Products cataloged:
    1. **Marmellata di Arance a Fette** (Sliced Orange Marmalade - Organic)
    2. **Confettura Extra di Fragole e Bacche Goji** (Strawberry & Goji Berry Extra Jam)
    3. **Confettura Extra di Gelsi Neri** (Black Mulberry Extra Jam)
    4. **Confettura Extra di Pere e Cannella** (Pear & Cinnamon Extra Jam)
    5. **Pesto Smeraldo** (Pistachio Pesto)
    6. **Sinfonia Barocca** (Sicilian Caponata)
    7. **Pesto Rosso Ibleo** (Sun-dried Tomato & Almond Pesto)
- **Card Hover Interactions:**
  - Hovering a product card triggers a subtle upward float (`translateY(-8px)`), card shadow deepening, and the `DISCOVER THE PRODUCT` floating cursor pill.

---

### Page 3: Production / Agricultural Heritage Page (`/en/production`)
- **Visual Impact:**
  - Full-width hero banner displaying hyper-saturated macro photography of Sicilian harvest lemons and blood oranges glistening under Mediterranean sunlight.
- **Harvest Calendar / Seasonal Availability Table:**
  - Precise 2-column typographic table tracking seasonal fruit availability:
    - *Navel Oranges for Fresh Consumption:* November 20 — January 15
    - *Navel Oranges for Juicing:* November 20 — January 15
    - *Moro Oranges for Fresh Consumption:* January 15 — February 28
    - *Moro Oranges for Juicing:* January 15 — February 28
    - *Siracusa Femminello Lemon:* November 15 — April 15
    - *Late Ciaculli Mandarin:* January 15 — February 28
    - *Pomegranate (Wonderful & Dente di Cavallo):* October 01 — November 31
- **Artisanal Storytelling:**
  - Highlighting organic hand-picked cultivation methods, zero chemical post-harvest treatments, and traditional small-batch copper kettle reduction.

---

### Page 4: Experience / Farm Tourism Page (`/en/experience`)
- **Theme:** Farm tours, harvesting walks, and Sicilian culinary tastings.
- **Hero Atmosphere:**
  - Warm sun-drenched photography of an open-air banquet table with artisan bruschetta topped with goat cheese, orange marmalade, and local wines.
- **Vibrant Saffron Section Backdrop:**
  - Section transitions into deep warm golden saffron (`#F39200`), creating dramatic tonal warmth.
- **Numbered Experience Cards:**
  - **`01. THE GOLDEN PATH (YOUR BASKET)`**
    - *Duration:* 1 hour 30 minutes
    - *The Experience:* Grab your basket, walk through citrus groves, and pick fruits directly from trees at peak ripeness.
    - *What's Included:* Guided grove tour, explanation of organic techniques, tasting of 3 citrus varieties.
  - **`02. SUNSET HARVEST & APERITIVO`**
    - Sunset wine pairing with artisanal preserves, cheeses, and Sicilian charcuterie under illuminated olive groves.

---

## 3. Interaction & Animation Inventory

| Page / Element | Trigger | Visible Response | Underlying Technique | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Jar Click** | Click on jar or cursor pill | Jar detaches from carousel, scales up, and flies to center screen before page wipe transition. | CSS fixed-position flight clone + cubic-bezier easing | **Verified** |
| **Pantry Product Card** | Hover over product card | Card elevates slightly (`translateY(-8px)`), drop shadow expands, and label glints. | CSS transform + custom cursor pill presence | **Verified** |
| **Weight Pill Toggle** | Click `240g` / `1.2kg` | Active circle fills with solid orange; inactive remains outlined; product code and price update. | Local React state toggle | **Verified** |
| **Seasonal Table Row** | Mouse hover over row | Row text shifts from muted wine to bright blood orange (`#E94E1B`) with smooth indent. | CSS hover transition with horizontal padding offset | **Verified** |
| **Experience Tour Cards** | Scroll into viewport | Number numerals (`01.`, `02.`) fade and float in from bottom with staggered timing. | Scroll-triggered entrance (Motion `whileInView`) | **Verified** |

---

## 4. Reusable Blueprint for Our Original Project

To reproduce this tier of creative polish in our new project:

1. **Implement the "Jar-Flight" Transition:**
   - Use Motion for React's `layoutId` or an absolute transition overlay to animate the 3D model/product card from catalog coordinates directly into the product detail hero without jarring cuts.
2. **Dynamic Weight & Size Pills:**
   - Incorporate circular size pills (`190g`, `240g`, `1kg`) adjacent to product centerpieces for authentic artisanal packaging feel.
3. **Seasonal Harvest Calendar:**
   - Include a clean, monospaced or grotesque tabular calendar tracking ingredient peak freshness, reinforcing craft authenticity.
4. **Curved Lifestyle Photography Strips:**
   - Frame human, sensory food photography with soft rounded corners (`rounded-2xl` / `rounded-3xl`) next to high-contrast Didone display type.
5. **Bold Saffron Color Break:**
   - Interrupt cream/terracotta pages with a vibrant, unexpected saturated background (like Agrumea's golden saffron `#F39200` Experience section) to re-engage the user's eye.

---

*This brief has been documented and saved in [AGRUMEA_PAGES_BRIEF.md](file:///c:/Users/Signi/Documents/WebApplications/3d-website-practice/AGRUMEA_PAGES_BRIEF.md).*
