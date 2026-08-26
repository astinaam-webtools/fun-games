# 🤖 AGENTS.md — Contributor & AI Agent Guidelines

Welcome to the **Little Explorers Playroom** (`fun-games`) codebase. This repository contains self-contained, lightweight HTML5 & Three.js 3D sensory web games tailored for infants (< 1 year old), toddlers, **34-inch 21:9 Ultrawide Monitors**, **Smart TV Browsers (Samsung Tizen, LG webOS, Android TV, Fire TV)**, and **Touchscreens**.

---

## 📁 Repository Structure

```
/home/astinaam/projects/games/
├── index.html                   # 🧸 Playroom Dashboard Hub (TV D-Pad & Touch spatial portal)
├── games/
│   ├── dreamy-highway/
│   │   └── index.html           # 🚗 Dreamy Highway Explorer (3D ribbon road & surprise toys)
│   ├── bubble-aquarium/
│   │   └── index.html           # 🫧 Floating Bubble Aquarium (Bioluminescent coral reef)
│   ├── starlight-safari/
│   │   └── index.html           # 🌙 Starlight Constellation Safari (Bedtime glowing star animals)
│   └── rainbow-cloud/
│       └── index.html           # ☁️ Rainbow Cloud Meadow (Cloud trampolines & hopping bunnies)
├── test/
│   └── verify_games.test.js     # 🧪 Automated TDD verification test suite
├── package.json                 # Project manifest & test scripts
├── README.md                    # User-facing documentation & TV controls
└── AGENTS.md                    # Guidelines & architecture standards for AI agents
```

---

## 🧪 Test-Driven Development (TDD) & Verification

All code changes and new games must be verified using the automated test suite.

### Running Automated Tests
```bash
node test/verify_games.test.js
```

### Headless Browser CDP Verification
When testing rendering, WebGL scenes, or UI interactions:
```bash
node -e "
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
  let filePath = path.join(process.cwd(), req.url.split('?')[0]);
  if (req.url === '/' || req.url === '') filePath = path.join(process.cwd(), 'index.html');
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404); res.end();
  }
});

server.listen(0, async () => {
  const port = server.address().port;
  const chrome = spawn('chromium', ['--headless', '--disable-gpu', '--remote-debugging-port=9280', 'http://localhost:' + port + '/index.html']);
  await new Promise(r => setTimeout(r, 1500));
  http.get('http://localhost:9280/json', (res) => {
    let raw = ''; res.on('data', c => raw += c);
    res.on('end', () => {
      const targets = JSON.parse(raw);
      const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
      ws.onopen = () => ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression: 'document.title' } }));
      ws.onmessage = (msg) => {
        const d = JSON.parse(msg.data);
        if (d.id === 1) {
          console.log('✓ Page loaded cleanly:', d.result.result.value);
          ws.close(); chrome.kill(); server.close();
        }
      };
    });
  });
});
"
```

---

## 🎯 Infant Sensory Design Principles (Iron Rules)

1. **Zero External Assets:**
   - No external image files (`.png`, `.jpg`, `.svg`) or audio files (`.mp3`, `.wav`).
   - All textures (smiling faces, candy swirls, polka dots, celestial bodies) **must** be generated procedurally via HTML5 Canvas.
   - Textures must use `tex.encoding = THREE.sRGBEncoding` and be cached in a static `Map` to prevent duplicate canvas allocations.

2. **Web Audio API Harmonic Synthesis:**
   - 100% synthesized in code.
   - Tuned exclusively to consonant **C Major / Pentatonic scales** (never dissonant or harsh).
   - **Mandatory Dynamics Compressor Limiter:** Every game must route all audio through a `createDynamicsCompressor()` node (`threshold: -14dB`, `ratio: 12`) to protect infant hearing from volume spikes.
   - Always attach `osc.onended` cleanup listeners to disconnect oscillator, gain, and filter nodes from the audio graph.

3. **Soft Visual Ergonomics:**
   - Soft pastel color palettes, cozy ambient lighting, and PCF soft shadows.
   - **Zero rapid strobing**, aggressive flashing, or high-frequency visual jitter.

---

## 📺 Smart TV & Mobile Ergonomics Standards

1. **TV Remote Navigation:**
   - D-Pad keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) move focus across cards with spatial rings.
   - Center **OK / Select** button (keyCodes `13`, `23`, `DPAD_CENTER`, `Select`, `Accept`, Gamepad Button `0`) launches games.
   - **ANY Remote Button** (in-game) triggers the sensory burst (explosions, toy spawns, speed boosts).
   - **TV Remote Back / Return Key:** (`Escape`, `Back`, `GoBack`, `BrowserBack`, keyCodes `10009` [Tizen], `461` [webOS], `4` [Android TV], Gamepad Button `1`) must smoothly navigate to `../../index.html`.
   - Top-right `🏠 Playroom` button present in every game.

2. **Focus Management in Fullscreen:**
   - All buttons (`#btn-fullscreen`, `#btn-sound`, settings) must call `.blur()` on click so that pressing `Spacebar` or `OK` in fullscreen triggers in-game bursts instead of clicking the focused button.

3. **Mobile & Tablet Protection:**
   - `document.addEventListener('contextmenu', e => e.preventDefault())` mandatory on all pages.
   - CSS: `user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; touch-action: none; overscroll-behavior: none;`.
   - Minimum tap target size: $48\text{px} \times 48\text{px}$.
   - **Multi-Touch Palm Grab Detection:** Handle `touchstart` where `e.touches.length >= 2` to trigger a **Super Bloom Multi-Burst** across all touch points.
   - **Visibility / Minimize Handling:** Attach `visibilitychange` & `blur`/`focus` listeners to suspend `AudioContext` on minimize and smoothly resume on return.

---

## 🚀 WebGL & Three.js Performance Rules

1. **Zero Runtime Garbage Collection:**
   - Pre-instantiate object pools for all dynamic entities (toys, sea creatures, shooting stars, particles, ripples).
   - In the `animate()` loop, reuse scratch `THREE.Vector3` / `THREE.Quaternion` objects. Do **never** instantiate `new THREE.*` inside `animate()`.

2. **Resolution & DPR Capping:**
   - Always cap pixel ratio: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))`.
   - Dynamically compute camera FOV based on aspect ratio ($21:9$ ultrawide, $16:9$ TV, and mobile portrait).

---

## ➕ Adding a New Game Checklist

1. Create directory `games/<game-name>/` with a self-contained `index.html`.
2. Implement Three.js r128 CDN, procedural canvas textures, and pentatonic Web Audio API synth.
3. Add the top-bar `🏠 Playroom` link to `../../index.html`.
4. Implement all mobile & TV remote event handlers (contextmenu prevention, multi-touch grab, visibility change, TV remote Back button, button auto-blur).
5. Add the game card to [`index.html`](index.html).
6. Add the game path to [`test/verify_games.test.js`](test/verify_games.test.js).
7. Run `node test/verify_games.test.js` and ensure all tests pass.
8. Commit and push to `origin main`.
