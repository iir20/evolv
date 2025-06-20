// Enhanced Glyph-based evolving language system for Evola pets

class GlyphLanguage {
  constructor() {
    this.glyphs = this.generateInitialGlyphs();
    this.vocabulary = {};
    this.evolutionRate = 0.2; // chance to evolve vocabulary each cycle
  }

  // Generate initial set of glyphs (symbols)
  generateInitialGlyphs() {
    const baseGlyphs = ['⟐', '⋇', '⋈', '⧫', '⚯', '✶', '✷', '✸', '✹', '✺'];
    return baseGlyphs;
  }

  // Create a new word by combining glyphs
  createWord(length = 3) {
    let word = '';
    for (let i = 0; i < length; i++) {
      word += this.glyphs[Math.floor(Math.random() * this.glyphs.length)];
    }
    return word;
  }

  // Evolve vocabulary by adding new words or modifying existing ones
  evolveVocabulary() {
    // Add new word with some probability
    if (Math.random() < this.evolutionRate) {
      const newWord = this.createWord();
      const meaning = `Meaning${Object.keys(this.vocabulary).length + 1}`;
      this.vocabulary[newWord] = meaning;
    }

    // Modify existing words randomly
    Object.keys(this.vocabulary).forEach(word => {
      if (Math.random() < this.evolutionRate / 2) {
        const newWord = this.createWord();
        this.vocabulary[newWord] = this.vocabulary[word];
        delete this.vocabulary[word];
      }
    });
  }

  // Translate a phrase into glyphs (simple substitution)
  translatePhrase(phrase) {
    const words = phrase.split(' ');
    return words.map(word => {
      // Find glyph word with similar meaning or create new
      for (const [glyphWord, meaning] of Object.entries(this.vocabulary)) {
        if (meaning.toLowerCase() === word.toLowerCase()) {
          return glyphWord;
        }
      }
      // If no match, create new glyph word
      const newWord = this.createWord();
      this.vocabulary[newWord] = word;
      return newWord;
    }).join(' ');
  }
}

export default GlyphLanguage;
