// Automated Dream and Evolution Stress Test for Evola

import PetAI from './petAI.js';

async function stressTestPetEvolution(iterations = 1000, delayMs = 10) {
  const pet = new PetAI('StressTestPet');

  console.log(`Starting stress test with ${iterations} iterations...`);

  for (let i = 0; i < iterations; i++) {
    pet.evolve();

    if (i % 100 === 0) {
      console.log(`Iteration ${i}: Age=${pet.age}, Consciousness=${pet.consciousnessScore.toFixed(3)}`);
      console.log(`Emotions:`, pet.emotionalState);
      console.log(`Beliefs:`, pet.beliefs);
      console.log(`Memories count:`, pet.memories.length);
      console.log(`Dreams count:`, pet.dreams.length);
    }

    // Simulate asynchronous delay to mimic real-time evolution
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  console.log('Stress test completed.');
}

stressTestPetEvolution();
