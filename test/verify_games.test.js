const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const DASHBOARD_FILE = path.join(ROOT_DIR, 'index.html');
const GAMES = [
  'games/dreamy-highway/index.html',
  'games/bubble-aquarium/index.html',
  'games/starlight-safari/index.html',
  'games/rainbow-cloud/index.html'
];

console.log('--- RUNNING INFANT 3D SENSORY GAMES AUTOMATED TEST SUITE ---');

// Test 1: Dashboard exists and contains all 4 playable game links
console.log('\n[Test 1] Verifying Dashboard & Game Links...');
assert(fs.existsSync(DASHBOARD_FILE), 'Dashboard index.html must exist');
const dashboardContent = fs.readFileSync(DASHBOARD_FILE, 'utf8');
assert(dashboardContent.includes('<!DOCTYPE html>'), 'Dashboard must be valid HTML5');
assert(dashboardContent.includes('games/dreamy-highway/index.html'), 'Dashboard must link to dreamy-highway');
assert(dashboardContent.includes('games/bubble-aquarium/index.html'), 'Dashboard must link to bubble-aquarium');
assert(dashboardContent.includes('games/starlight-safari/index.html'), 'Dashboard must link to starlight-safari');
assert(dashboardContent.includes('games/rainbow-cloud/index.html'), 'Dashboard must link to rainbow-cloud');
assert(dashboardContent.includes('contextmenu'), 'Dashboard must handle contextmenu');
assert(dashboardContent.includes('visibilitychange'), 'Dashboard must handle visibilitychange');
console.log('✓ Dashboard verification passed.');

// Test 2: Verify Each Game's Sensory & Technical Requirements
GAMES.forEach((gameRelPath) => {
  const gamePath = path.join(ROOT_DIR, gameRelPath);
  const gameName = path.basename(path.dirname(gameRelPath));
  console.log(`\n[Test 2] Verifying Game: ${gameName}...`);

  assert(fs.existsSync(gamePath), `Game file ${gameRelPath} must exist`);
  const content = fs.readFileSync(gamePath, 'utf8');

  // Three.js CDN inclusion
  assert(content.includes('three.js') || content.includes('three.min.js'), `${gameName} must load Three.js`);

  // Web Audio API usage
  assert(content.includes('AudioContext') || content.includes('webkitAudioContext'), `${gameName} must implement Web Audio API`);

  // Sensory dynamics compressor limiter
  assert(content.includes('createDynamicsCompressor'), `${gameName} must use DynamicsCompressor to protect infant hearing`);

  // sRGBEncoding on textures
  assert(content.includes('sRGBEncoding'), `${gameName} must use THREE.sRGBEncoding for procedural textures`);

  // Right-click / context menu prevention
  assert(content.includes('contextmenu'), `${gameName} must prevent context menu`);

  // Multi-touch palm grab gesture detection
  assert(content.includes('touches.length') || content.includes('touchstart'), `${gameName} must handle multi-touch grab gesture`);

  // Tab minimize & visibility change handling
  assert(content.includes('visibilitychange'), `${gameName} must handle visibilitychange`);

  // Smart TV Remote Back button routing to hub
  assert(content.includes('../../index.html'), `${gameName} must route back to Playroom Hub`);

  // Responsive & DPR capping
  assert(content.includes('devicePixelRatio') || content.includes('setPixelRatio'), `${gameName} must configure pixel ratio`);

  console.log(`✓ ${gameName} passed all verification checks.`);
});

console.log('\n======================================================');
console.log('🎉 ALL AUTOMATED TESTS PASSED! 100% HEALTHY SUITE.');
console.log('======================================================\n');
