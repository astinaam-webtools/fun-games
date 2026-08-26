# 🧸 Little Explorers Playroom — 3D Sensory Games for Infants & Toddlers

A collection of lightweight, self-contained HTML5 & Three.js 3D sensory web games tailored for infants (< 1 year old) and toddlers. Designed specifically for **34-inch 21:9 Ultrawide Monitors**, **4K & 1080p Smart TV Browsers**, and **Touchscreens**.

---

## 🌟 Featured Games (All 4 Live & Playable!)

| Game | Status | Description | Key Features |
|---|---|---|---|
| **🚗 Dreamy Highway** | 🟢 **Playable** | A gentle, continuously moving 3D world where friendly shapes, floating clouds, and cute stylized toys glide past on an infinite pastel highway. | Zero-allocation toy pooling, pentatonic celesta chimes, 21:9 adaptive FOV, baby mash safe. |
| **🫧 Bubble Aquarium** | 🟢 **Playable** | Bioluminescent crystal reef with swimming clownfish, jumping dolphins, floating sea stars, tap-to-pop bubbles, and soothing ocean harp chords. | Bioluminescent shaders, floating bubble pool, underwater drone pad, multi-grab water bloom. |
| **🌙 Starlight Safari** | 🟢 **Playable** | Bedtime constellation voyage connecting glowing star animals (Giraffe, Lion, Elephant, Bear, Owl) with music box celesta lullabies and shooting stars. | 5 constellation animal meshes, shooting star pool, sleepy moon halo, soothing bedtime pad. |
| **☁️ Rainbow Cloud Meadow** | 🟢 **Playable** | Soft puffy cloud trampolines where friendly bunnies bounce along rainbow arches and hot-air balloons float to cheerful xylophone bells. | Cloud spring deformation, bunny jump physics, rainbow arches, multi-grab balloon lift. |

---

## 📱 Mobile & Infant Grab Ergonomics

- **Disabled Context Menu:** Right-click and long-press context menus are disabled across all games (`contextmenu` prevented, `-webkit-touch-callout: none`).
- **Multi-Touch Palm Grab Detection:** When an infant grabs the screen with multiple fingers or palms (`e.touches.length >= 2`), all games trigger a spectacular **Super Bloom Multi-Burst** animation with cascades of ripples, extra particles, and harmonic chord arpeggios.
- **Tab Minimize & Notification Pull-down Protection:** Tab visibility changes and blur events cleanly suspend Web Audio API playback to avoid runaway audio, and resume with a welcoming sparkle animation upon return.
- **Touch Targets & Viewport:** Sized $\ge 48\text{px}$ with `touch-action: none` and `overscroll-behavior: none` to prevent accidental pull-to-refresh or page bounces.

---

## 📺 Smart TV Remote & Controller Navigation

- **Dashboard D-Pad Navigation:** Use D-Pad arrows (`▲`, `▼`, `◄`, `►` on TV remote or Gamepad) to move focus across game cards.
- **Dashboard Selection:** Press the Center **OK / Select** button (or `Enter`, `Space`, Gamepad Button `0`) to launch the focused game.
- **In-Game Baby Sensory Bursts:** Press **ANY button on the TV remote** (Center OK, D-Pad, Play/Pause, Channel Up/Down, Numbers, Color keys) or tap the screen to explode soft particle fountains, spawn surprise toys, and speed up the cruise.
- **Return to Hub from Game:** Press the TV Remote **Back / Return** button (Samsung Tizen `Return`, LG webOS `Back`, Android TV `Back`, Gamepad Button `1`, or click the top-right `🏠 Playroom` button).
- **Fullscreen:** Press `⛶` button or `F` for immersive TV fullscreen.

---

## 🎨 Sensory Ergonomics

1. **Zero External Assets:** 100% procedurally synthesized textures (smiling faces, candy swirls, polka dots) and audio.
2. **Harmonious Sound Engine:** Web Audio API 3-octave C Major pentatonic scale with a dynamic master compressor limiter and 420 Hz low-pass ambient lullaby pad.
3. **Soft Visual Contrast:** Pastel color palettes, PCF soft shadows, and zero harsh strobe flashes.
4. **Adaptive Aspect Ratios:** Seamlessly renders on 21:9 ultrawide (3440×1440), 16:9 TV/monitors (3840×2160, 1920×1080), and tablets.

---

## 🚀 Running Locally

Serve with any static file server:
```bash
# Python 3
python3 -m http.server 8080

# Or Node.js / npx
npx serve .
```
Navigate to `http://localhost:8080` in your browser.
