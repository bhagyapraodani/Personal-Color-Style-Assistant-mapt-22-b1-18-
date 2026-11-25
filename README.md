# ATELIER CHROMA
### *Personal Color & Sartorial Intelligence Platform*

[![Version](https://img.shields.io/badge/version-2.0.0-111111?style=flat-square)](https://github.com/)
[![License](https://img.shields.io/badge/license-MIT-7a5c48?style=flat-square)](LICENSE)
[![Colorimetry](https://img.shields.io/badge/color_space-CIELAB_%CE%94E-365e46?style=flat-square)](https://en.wikipedia.org/wiki/CIELAB_color_space)
[![Client--Side](https://img.shields.io/badge/privacy-100%25_on--device-111111?style=flat-square)](https://github.com/)
[![Architecture](https://img.shields.io/badge/architecture-HTML5_Canvas_+_ES6+-5b5752?style=flat-square)](https://github.com/)

> **Atelier Chroma** is an on-device personal color and wardrobe intelligence system designed at the intersection of haute couture styling, Italian 12-season Armocromia, and computer-vision colorimetry. It performs real-time skin tone analysis in the browser, evaluates clothing compatibility via CIELAB $\Delta E$ perceptual distance, and curates season-calibrated capsule wardrobes.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [1. Atelier Dashboard](#1-atelier-dashboard)
  - [2. AI Color Analysis Engine](#2-ai-color-analysis-engine)
  - [3. 12-Season Armocromia Library & Draping Studio](#3-12-season-armocromia-library--draping-studio)
  - [4. In-Store Clothing Color Scanner](#4-in-store-clothing-color-scanner)
  - [5. Outfit Recommendation Formulas](#5-outfit-recommendation-formulas)
  - [6. Fabric & Texture Guide](#6-fabric--texture-guide)
  - [7. Wardrobe Archive & Saved Styles](#7-wardrobe-archive--saved-styles)
  - [8. Profile & Two-Tier Persistence](#8-profile--two-tier-persistence)
- [Mathematical & Color Science Foundations](#mathematical--color-science-foundations)
- [Design Direction & Editorial Aesthetic](#design-direction--editorial-aesthetic)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Privacy & Security](#privacy--security)
- [License](#license)

---

## Overview

Traditional personal styling relies either on expensive in-person salon draping or arbitrary quiz apps that do not account for color science. **Atelier Chroma** bridges this gap by combining:
1. **Client-Side Computer Vision:** Real-time pixel segmentation via YCrCb and HSV thresholding with K-Means clustering on the HTML5 Canvas.
2. **Perceptual Colorimetry:** Calculating true Euclidean distance ($\Delta E$) in the three-dimensional $L^*a^*b^*$ color space to grade clothing match harmony.
3. **High-Fashion Editorial UX:** Designed with an atelier aesthetic—utilizing Bodoni Moda typography, warm gallery stone backgrounds, and tactile textile diagrams.

---

## Key Features

### 1. Atelier Dashboard
- **Personalized Salutation:** Dynamic, time-aware greeting reflecting client profile name and active season.
- **Headline Chromatic Metrics:** Live telemetry tiles reporting Skin Undertone (Warm, Cool, Neutral, Olive), 12-Season Profile with Confidence Score (%), Flattering Metals & Whites, and Wardrobe Archive statistics.
- **Daily Atelier Inspiration:** Season-aware daily styling tip, palette pairing formula, and fabric recommendations.
- **Three-Axis Armocromia Matrix:** Dynamic SVG vector plate mapping skin temperature (Cool $\leftrightarrow$ Warm), value depth (Light $\leftrightarrow$ Deep), and chroma clarity (Muted $\leftrightarrow$ Clear).
- **Curated Signature & Avoid Swatches:** Direct access to core neutrals, statement accents, and face-washing clash shades.

### 2. AI Color Analysis Engine
- **Browser-Based Computer Vision:** Isolates facial skin pixels within an editorial Region of Interest (ROI) using dual-space filtering:
  - $\text{YCrCb}$ Chrominance Thresholding: $133 \le \text{Cr} \le 173$, $77 \le \text{Cb} \le 127$, $Y > 60$.
  - $\text{HSV}$ Hue Angle & Saturation Filtering: $H \in [0^\circ, 52^\circ] \cup [335^\circ, 360^\circ]$, $S \in [14\%, 70\%]$.
- **3-Cluster K-Means Segmentation:** Determines dominant facial tone, secondary cluster, and luminance variance (facial contrast spread).
- **Transparent Provenance:** Distinct UI badges clearly disclose whether live client-side computer vision or pre-calibrated studio baselines are active.
- **Interactive ROI Resampling:** Click anywhere on cheek or jawline to sample a custom spot with instant recalculation.
- **Drag-and-Drop Upload:** Drop portrait photos directly onto the canvas with file type and 15MB size safety validation.
- **Guided 5-Step Daylight Self-Check:** Algorithmic fallback using daylight vein color, metal harmony, white vs. cream fabric drape, foundation behavior, and natural contrast.

### 3. 12-Season Armocromia Library & Draping Studio
- **Full 12-Season Matrix:**
  - **Spring:** Light Spring, Warm Spring, Clear Spring (Bright Spring).
  - **Summer:** Light Summer, Cool Summer, Soft Summer.
  - **Autumn:** Soft Autumn, Warm Autumn, Deep Autumn.
  - **Winter:** Deep Winter, Cool Winter, Clear Winter (Bright Winter).
- **Comprehensive Swatch Specifications:** Each season includes 6 Power Neutrals, 6 Signature Accents, and 3 Avoid Shades with specific stylist explanations.
- **Virtual Draping Studio:**
  - Interactive SVG avatar tinted with the user's detected skin tone.
  - Single-stage draping and side-by-side comparison mode contrasting palette tones against avoid shades.
- **Beauty & Makeup Calibration:** Detailed specifications for foundation base formulas, blush, lipsticks, eye shadows, hair colors, and jewelry metals.
- **1-Click Actions:** Copy HEX/RGB codes to clipboard, save to favorites, or drape immediately.

### 4. In-Store Clothing Color Scanner
- **Perceptual CIELAB $\Delta E$ Distance:** Computes the CIE76 Euclidean distance between the sampled garment and all seasonal palette swatches.
- **Match Compatibility Verdicts:**
  - **Harmonious Match** ($\Delta E < 12$, Score 85–99%): Harmonizes naturally with skin undertone and chroma.
  - **Acceptable Accent** ($12 \le \Delta E \le 25$, Score 65–84%): Usable with balancing bridge neutrals.
  - **Palette Clash** ($\Delta E > 25$ or near Avoid shade): Triggers practical buffering advice (e.g. wearing below the waist or buffering the collarbone with an ivory scarf).
- **Automated Dominant Hue Extraction:** Automatically clusters top 4 dominant garment colors using K-Means.
- **Interactive Magnifier Loupe:** Real-time crosshair loupe showing live pixel values under cursor.
- **Complete Telemetry:** Displays HEX, RGB, HSL, and CIELAB ($L^*, a^*, b^*$) coordinates.

### 5. Outfit Recommendation Formulas
- **12 Curated Looks:** Spanning Casual, Work & Office, Evening & Party, Formal & Gala, Weekend, and Capsule Wardrobe.
- **Color Harmony Dimensions:** Filterable by Monochromatic, Analogous, Complementary, and Triadic schemes.
- **Dynamic Seasonal Tinting:** Each look's SVG flat-lay diagram tints automatically based on the user's active seasonal palette.
- **Live Search & Silhouette Filter:** Instant text search and silhouette selection (Tailored, Draped, Minimal).

### 6. Fabric & Texture Guide
- **11 Luxury Textiles:** Linen, Combed Cotton, Selvedge Denim, Silk Charmeuse, Silk Chiffon, Cashmere & Merino, Wool Crepe, Silk Velvet, Heritage Tweed, Lambskin Leather & Suede, and Crisp Poplin.
- **Multi-Dimensional Filters:** Filter by Season Recommendation, Category (Matte / Luminous), Texture (Smooth / Textured), Weight, and Weather (Warm / Cold).
- **Procedural SVG Weave Diagrams:** Visualizing twill, satin float, slub yarn, open sheer, pile, and herringbone weaves.
- **Textile Optics Educational Guide:** Explaining specular vs. diffuse scattering and micro-shadows.

### 7. Wardrobe Archive & Saved Styles
- **Personal Wardrobe Dossier:** Persists favorite swatches, bookmarked outfits, and in-store garment scans.
- **Export Options:**
  - Download formatted editorial text dossier (`.txt`).
  - Export complete structured profile backup (`.json`).
- **Import JSON Backup:** Restore saved styles and profiles with schema validation.
- **Confirmation Modals:** Accessible dialogs to prevent accidental scan log deletion or factory reset.

### 8. Profile & Two-Tier Persistence
- **Local Settings:** Customize name, undertone, surface depth, manual season override, silhouette preference, and olive undertone nuance.
- **Dual Persistence:** Automatically synchronizes to browser `localStorage` with fallback to `notebookAppApi` when available.

---

## Mathematical & Color Science Foundations

### 1. sRGB to CIE $L^*a^*b^*$ Conversion
The application transforms non-linear sRGB values to linear space, converts them to CIE XYZ ($D_{65}$ illuminant), and projects into the perceptually uniform CIELAB space:

$$f(t) = \begin{cases} t^{1/3} & \text{if } t > 0.008856 \\ 7.787 t + \frac{16}{116} & \text{otherwise} \end{cases}$$

$$L^* = 116 f(Y / Y_n) - 16, \quad a^* = 500 \left[ f(X / X_n) - f(Y / Y_n) \right], \quad b^* = 200 \left[ f(Y / Y_n) - f(Z / Z_n) \right]$$

### 2. CIELAB Perceptual Color Difference ($\Delta E$)
Perceptual distance between sampled garment color $C_1$ and palette reference $C_2$:

$$\Delta E = \sqrt{(L_1^* - L_2^*)^2 + (a_1^* - a_2^*)^2 + (b_1^* - b_2^*)^2}$$

### 3. Compatibility Score Calculation
$$\text{Score} = \max\left(18, \min\left(99, \text{round}\left(100 - 1.85 \times \Delta E\right)\right)\right)$$

---

## Design Direction & Editorial Aesthetic

Atelier Chroma rejects generic dashboard designs in favor of an **editorial, high-fashion publication aesthetic**:

| Token | Value | Description |
| :--- | :--- | :--- |
| `--background` | `#fafaf8` | Warm gallery white |
| `--surface-container-low` | `#ece8e1` | Pale stone |
| `--surface-container` | `#e5e0d8` | Muted stone |
| `--on-surface` | `#111111` | Dark espresso / ink |
| `--on-surface-variant` | `#5b5752` | Warm graphite |
| `--secondary` | `#7a5c48` | Muted taupe / earth brown |
| `--rule-ink` | `1px solid #111111` | Hairline editorial border |
| `--rounded` | `0px` | Crisp, architectural geometry |

### Typography
- **Headings & Editorial Titles:** `Bodoni Moda` (high-contrast modern serif)
- **Interface & Body Text:** `Jost` (clean geometric sans-serif with `0.22em` letter-tracking on labels)
- **Telemetry & Technical Data:** `IBM Plex Mono` (monospace data lining)

---

## Project Structure

```
├── index.html        # Complete 8-view single-page application shell
├── styles.css        # Atelier design system tokens, typography & animations
├── app.js            # Core engine (Colorimetry, Computer Vision, State, UI Controllers)
└── README.md         # Documentation & architecture guide
```

---

## Getting Started

### Prerequisites
No dependencies or package managers required. The application runs natively in any modern web browser.

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/atelier-chroma.git
   cd atelier-chroma
   ```
2. Open [`index.html`](file:///c:/Users/my%20pc/OneDrive/Desktop/App%20Development/R4/index.html) in your browser:
   - On Windows: Double-click `index.html` or run `start index.html`
   - On macOS: Run `open index.html`
   - Or serve with any static web server:
     ```bash
     npx serve .
     # or
     python -m http.server 8000
     ```

---

## Privacy & Security

- **100% On-Device:** Portrait photos and garment images are processed entirely in browser RAM using the HTML5 Canvas API.
- **Zero Server Telemetry:** No camera feeds, facial images, or personal metadata are ever transmitted to external servers.
- **Local Persistence:** Wardrobe history and color profiles reside exclusively in the client's `localStorage`.

---

## License

This project is licensed under the [MIT License](LICENSE).
