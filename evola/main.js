// Main JavaScript for Evola simulation game

import PetAI from './petAI.js';

// Canvas and context setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const emotionalChart = document.getElementById('emotionalChart').getContext('2d');
const beliefCanvas = document.getElementById('beliefCanvas').getContext('2d');

const dreamEntries = document.getElementById('dreamEntries');
const memoryEntries = document.getElementById('memoryEntries');
const glyphOutput = document.getElementById('glyphOutput');

// Tile types enumeration
const TILE_TYPES = {
  EMPTY: 0,
  SOIL: 1,
  STONE: 2,
  DREAM_DUST: 3,
  LIGHT_SPORES: 4,
  MEMORY_CRYSTALS: 5,
  GLYPH_MARKED: 6,
};

// Tile colors for rendering
const TILE_COLORS = {
  [TILE_TYPES.EMPTY]: '#000000',
  [TILE_TYPES.SOIL]: '#654321',
  [TILE_TYPES.STONE]: '#888888',
  [TILE_TYPES.DREAM_DUST]: '#a0c8f0',
  [TILE_TYPES.LIGHT_SPORES]: '#f0e68c',
  [TILE_TYPES.MEMORY_CRYSTALS]: '#b0e0e6',
  [TILE_TYPES.GLYPH_MARKED]: '#ffcc00',
};

// Game state
const world = {
  width: 100,
  height: 100,
  tiles: [],
  tileSize: 8,
  glyphs: [], // store glyphs on tiles
};

const pet = new PetAI('⟐⋇⋈');

// Initialize world tiles with biome generation based on pet emotions
function initWorld() {
  for (let y = 0; y < world.height; y++) {
    world.tiles[y] = [];
    world.glyphs[y] = [];
    for (let x = 0; x < world.width; x++) {
      // Determine biome tile based on pet emotional state
      const tileType = generateBiomeTile(x, y);
      world.tiles[y][x] = tileType;
      world.glyphs[y][x] = null; // no glyph initially
    }
  }
}

// Generate biome tile based on pet emotional state and position
function generateBiomeTile(x, y) {
  const emotions = pet.emotionalState;
  // Simple noise function for variation
  const noise = (Math.sin(x * 0.1) + Math.cos(y * 0.1)) * 0.5 + 0.5;

  // Determine dominant emotion
  const dominantEmotion = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);

  switch (dominantEmotion) {
    case 'happiness': // Joy biome
      if (noise > 0.7) return TILE_TYPES.LIGHT_SPORES;
      if (noise > 0.4) return TILE_TYPES.SOIL;
      return TILE_TYPES.DREAM_DUST;
    case 'fear': // Fear biome
      if (noise > 0.6) return TILE_TYPES.STONE;
      if (noise > 0.3) return TILE_TYPES.SOIL;
      return TILE_TYPES.EMPTY;
    case 'curiosity': // Curiosity biome
      if (noise > 0.65) return TILE_TYPES.MEMORY_CRYSTALS;
      if (noise > 0.35) return TILE_TYPES.SOIL;
      return TILE_TYPES.DREAM_DUST;
    case 'loneliness': // Grief biome
      if (noise > 0.7) return TILE_TYPES.STONE;
      if (noise > 0.5) return TILE_TYPES.SOIL;
      return TILE_TYPES.EMPTY;
    default:
      return TILE_TYPES.SOIL;
  }
}

// Draw the world with tiles and glyphs
function drawWorld() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const tileSize = world.tileSize;
  const viewX = Math.floor(pet.position?.x || world.width / 2) - Math.floor(canvas.width / tileSize / 2);
  const viewY = Math.floor(pet.position?.y || world.height / 2) - Math.floor(canvas.height / tileSize / 2);

  for (let y = 0; y < Math.floor(canvas.height / tileSize); y++) {
    for (let x = 0; x < Math.floor(canvas.width / tileSize); x++) {
      const worldX = viewX + x;
      const worldY = viewY + y;
      if (
        worldX >= 0 &&
        worldX < world.width &&
        worldY >= 0 &&
        worldY < world.height
      ) {
        const tile = world.tiles[worldY][worldX];
        ctx.fillStyle = TILE_COLORS[tile] || '#000000';
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

        // Draw glowing effect for special tiles
        if (tile === TILE_TYPES.LIGHT_SPORES || tile === TILE_TYPES.MEMORY_CRYSTALS) {
          drawGlowEffect(x * tileSize, y * tileSize, tileSize);
        }

        // Draw glyph if present
        const glyph = world.glyphs[worldY][worldX];
        if (glyph) {
          ctx.fillStyle = '#ffcc00';
          ctx.font = `${tileSize}px monospace`;
          ctx.fillText(glyph, x * tileSize, y * tileSize + tileSize);
        }
      }
    }
  }
}

// Simple glowing effect for special tiles
function drawGlowEffect(x, y, size) {
  const gradient = ctx.createRadialGradient(x + size / 2, y + size / 2, size / 4, x + size / 2, y + size / 2, size);
  gradient.addColorStop(0, 'rgba(255, 255, 200, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, size, size);
}

// Draw the pet as a simple pixel sprite
function drawPet() {
  const tileSize = world.tileSize;
  const centerX = Math.floor(canvas.width / 2);
  const centerY = Math.floor(canvas.height / 2);
  ctx.fillStyle = '#66ccff';
  ctx.fillRect(centerX - tileSize / 2, centerY - tileSize / 2, tileSize, tileSize);
}

// Draw emotional state chart (simple bar chart)
function drawEmotionalChart() {
  const ctx = emotionalChart;
  ctx.clearRect(0, 0, 200, 100);
  const emotions = pet.emotionalState;
  const keys = Object.keys(emotions);
  const barWidth = 40;
  keys.forEach((key, i) => {
    const value = emotions[key];
    ctx.fillStyle = '#66ccff';
    ctx.fillRect(i * (barWidth + 10) + 10, 100 - value * 80, barWidth, value * 80);
    ctx.fillStyle = '#ccc';
    ctx.font = '12px monospace';
    ctx.fillText(key, i * (barWidth + 10) + 10, 95);
  });
}

// Draw belief map (simple visualization)
function drawBeliefMap() {
  const ctx = beliefCanvas;
  ctx.clearRect(0, 0, 200, 200);
  ctx.fillStyle = '#66ccff';
  pet.beliefs.forEach((belief, i) => {
    ctx.fillText(belief, 10, 20 + i * 20);
  });
}

// Update dream journal and memory web UI
function updateTextUI() {
  dreamEntries.textContent = pet.dreams.join('\n');
  memoryEntries.textContent = pet.memories.join('\n');
  glyphOutput.textContent = pet.getGlyphBeliefs();
}

// Main game loop
function gameLoop() {
  pet.evolve();

  // Update world tiles based on pet beliefs (mark some tiles with glyphs)
  updateWorldGlyphs();

  drawWorld();
  drawPet();
  drawEmotionalChart();
  drawBeliefMap();
  updateTextUI();

  // Debug logging for Evola Debug Overlay
  if (window.EvolaDebug) {
    window.EvolaDebug.logEmotionState(pet.emotionalState);
    window.EvolaDebug.logBeliefs(pet.beliefs);
    if (pet.dreams.length > 0) {
      window.EvolaDebug.logDream(pet.dreams[pet.dreams.length - 1]);
    }
    window.EvolaDebug.logConsciousness(pet.consciousnessScore);
  }

  requestAnimationFrame(gameLoop);
}

// Update world tiles with glyphs based on pet beliefs
function updateWorldGlyphs() {
  // For demo, randomly mark some tiles with glyphs from pet beliefs
  if (pet.beliefs.length === 0) return;

  for (let i = 0; i < 3; i++) {
    const x = Math.floor(Math.random() * world.width);
    const y = Math.floor(Math.random() * world.height);
    const glyph = pet.glyphLanguage.createWord(2);
    world.glyphs[y][x] = glyph;
    world.tiles[y][x] = TILE_TYPES.GLYPH_MARKED;
  }
}

// Initialize and start
initWorld();
gameLoop();
