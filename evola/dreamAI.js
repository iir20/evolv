// Dream AI module for Evola pets with Gemini AI integration

import AIService from './aiService.js';

class DreamAI {
  async generateDream(pet) {
    try {
      const response = await AIService.generateDream(pet);
      if (response && response.dreamText) {
        return response.dreamText;
      }
      // Fallback if API response is unexpected
      return `Dream of ${pet.name} with emotions ${JSON.stringify(pet.emotionalState)}`;
    } catch (error) {
      console.error('Error generating dream:', error);
      return `Dream of ${pet.name} with emotions ${JSON.stringify(pet.emotionalState)}`;
    }
  }

  async processDreamOutcome(pet, dream) {
    try {
      const response = await AIService.processDreamOutcome(pet, dream);
      if (response && response.emotionalChanges) {
        // Apply emotional changes to pet state
        Object.entries(response.emotionalChanges).forEach(([key, value]) => {
          if (pet.emotionalState.hasOwnProperty(key)) {
            pet.emotionalState[key] = Math.min(1, Math.max(0, pet.emotionalState[key] + value));
          }
        });
      }
      // Increase consciousness score as before
      pet.consciousnessScore = Math.min(1.0, pet.consciousnessScore + 0.01);
    } catch (error) {
      console.error('Error processing dream outcome:', error);
      pet.consciousnessScore = Math.min(1.0, pet.consciousnessScore + 0.01);
    }
  }
}

export default DreamAI;
