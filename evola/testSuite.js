// Enhanced JavaScript Test Suite for Evola Core Systems with detailed logging

import PetAI from './petAI.js';
import DreamAI from './dreamAI.js';
import GlyphLanguage from './glyphLanguage.js';

// Test biome generation logic in main.js (imported here for testing)
import { generateBiomeTile, TILE_TYPES } from './main.js';

// Helper function for assertions
function assert(condition, message) {
  if (!condition) {
    console.error('Test failed:', message);
  } else {
    console.log('Test passed:', message);
  }
}

// Test 1: Biome Generation based on pet emotions
function testBiomeGeneration() {
  const pet = new PetAI('TestPet');

  pet.emotionalState = { happiness: 1, loneliness: 0, curiosity: 0, fear: 0 };
  let tile = generateBiomeTile(10, 10, pet);
  console.log('Joy biome tile:', tile);
  assert(
    [TILE_TYPES.LIGHT_SPORES, TILE_TYPES.SOIL, TILE_TYPES.DREAM_DUST].includes(tile),
    'Joy biome generates correct tile types'
  );

  pet.emotionalState = { happiness: 0, loneliness: 1, curiosity: 0, fear: 0 };
  tile = generateBiomeTile(10, 10, pet);
  console.log('Grief biome tile:', tile);
  assert(
    [TILE_TYPES.STONE, TILE_TYPES.SOIL, TILE_TYPES.EMPTY].includes(tile),
    'Grief biome generates correct tile types'
  );

  pet.emotionalState = { happiness: 0, loneliness: 0, curiosity: 1, fear: 0 };
  tile = generateBiomeTile(10, 10, pet);
  console.log('Curiosity biome tile:', tile);
  assert(
    [TILE_TYPES.MEMORY_CRYSTALS, TILE_TYPES.SOIL, TILE_TYPES.DREAM_DUST].includes(tile),
    'Curiosity biome generates correct tile types'
  );

  pet.emotionalState = { happiness: 0, loneliness: 0, curiosity: 0, fear: 1 };
  tile = generateBiomeTile(10, 10, pet);
  console.log('Fear biome tile:', tile);
  assert(
    [TILE_TYPES.STONE, TILE_TYPES.SOIL, TILE_TYPES.EMPTY].includes(tile),
    'Fear biome generates correct tile types'
  );
}

// Test 2: Pet AI evolution and state updates
function testPetAIEvolution() {
  const pet = new PetAI('TestPet');
  const initialConsciousness = pet.consciousnessScore;

  pet.evolve();
  console.log('Pet age after evolve:', pet.age);
  console.log('Pet consciousness after evolve:', pet.consciousnessScore);
  console.log('Pet emotional state:', pet.emotionalState);
  console.log('Pet beliefs:', pet.beliefs);
  console.log('Pet memories:', pet.memories);

  assert(pet.age === 1, 'Pet age increments on evolve');
  assert(pet.consciousnessScore >= initialConsciousness, 'Consciousness score increases or stays same');
  assert(Object.keys(pet.emotionalState).length === 4, 'Emotional state keys present');
  assert(Array.isArray(pet.beliefs), 'Beliefs is an array');
  assert(Array.isArray(pet.memories), 'Memories is an array');
}

// Test 3: Dream AI generates and processes dreams
function testDreamAI() {
  const pet = new PetAI('TestPet');
  const dreamAI = new DreamAI();

  const dream = dreamAI.generateDream(pet);
  console.log('Generated dream:', dream);
  assert(typeof dream === 'string' && dream.length > 0, 'Dream generated is a non-empty string');

  const initialConsciousness = pet.consciousnessScore;
  dreamAI.processDreamOutcome(pet, dream);
  console.log('Pet consciousness after dream processing:', pet.consciousnessScore);
  assert(pet.consciousnessScore >= initialConsciousness, 'Dream outcome can increase consciousness');
}

// Test 4: Glyph Language evolves vocabulary and translates phrases
function testGlyphLanguage() {
  const glyphLang = new GlyphLanguage();

  const initialVocabSize = Object.keys(glyphLang.vocabulary).length;
  glyphLang.evolveVocabulary();
  console.log('Vocabulary size after evolve:', Object.keys(glyphLang.vocabulary).length);

  const phrase = 'hello world';
  const translation = glyphLang.translatePhrase(phrase);
  console.log('Phrase translation:', translation);
  assert(typeof translation === 'string' && translation.length > 0, 'Phrase translated to glyphs');
}

// Run all tests
function runTests() {
  console.log('Running Evola Core Systems Test Suite with detailed logging...');
  testBiomeGeneration();
  testPetAIEvolution();
  testDreamAI();
  testGlyphLanguage();
  console.log('Test Suite Completed.');
}

runTests();
