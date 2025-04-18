# Learning Read App

A React Native mobile application designed to help children learn to read in Spanish through interactive letter and word exercises.

## Features

- **Random Letter/Word Mode**: Randomly generates letters or words for practice, with audio pronunciation
- **Letter Selection**: Interactive alphabet interface where users can:
  - Select individual letters
  - See and hear words beginning with the selected letter
  - Practice pronunciation through audio feedback
- **Vowels Practice**: Dedicated section for practicing vowels
- **Complete Alphabet**: Sequential practice of the entire alphabet with example words
- **Audio Support**: High-quality audio pronunciation for:
  - Individual letters (including 'Ñ')
  - Complete words
  - Special characters and accented vowels (á, é, í, ó, ú)

## Technical Overview

### Built With
- React Native
- React Navigation
- react-native-sound for audio management

### Project Structure
```
LearningRead/
├── src/
│   ├── screens/
│   │   ├── AlphabetScreen.tsx     # Sequential alphabet practice
│   │   ├── LetterSelectionScreen.tsx  # Interactive letter selection
│   │   ├── RandomScreen.tsx       # Random letter/word practice
│   │   └── VowelsScreen.tsx       # Vowels practice
│   └── utils/
│       └── SoundManager.ts        # Audio management system
├── assets/
│   └── sounds/                    # Audio files for letters and words
└── ios/ & android/               # Native platform code
```

### Features in Detail

#### Sound Management
- Centralized audio system through `SoundManager`
- Supports:
  - Individual letter pronunciation
  - Word-by-word playback
  - Sequential word pronunciation
  - Audio cleanup on component unmount

#### Interactive Screens
1. **Random Screen**
   - Generates random letters or words
   - Includes repeat functionality
   - Clear audio feedback

2. **Letter Selection Screen**
   - Interactive alphabet grid
   - Word examples for each letter
   - Audio pronunciation for both letters and words

3. **Vowels Screen**
   - Focused practice on vowels (a, e, i, o, u)
   - Includes accented variations
   - Example words for each vowel

4. **Alphabet Screen**
   - Sequential alphabet navigation
   - Example words for each letter
   - Animated letter transitions

## Getting Started

### Prerequisites
- Node.js
- React Native development environment
- iOS/Android development tools

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Run the application
```bash
# For iOS
npx react-native run-ios

# For Android
npx react-native run-android
```

## Usage

The app provides multiple learning modes:
1. Use the Random mode for spontaneous practice
2. Select specific letters to practice with related words
3. Focus on vowels in the dedicated vowels section
4. Practice the complete alphabet in sequence

Each mode includes audio support - tap on letters or words to hear their pronunciation.

## License

This project is licensed under standard open-source terms. See LICENSE file for details.

## Important Notes

### Development Notes
- This project was created entirely with AI assistance (GitHub Copilot)
- A modification in the `react-native-sound` dependency is required:
  - File: `node_modules/react-native-sound/sound.js`
  - Line 40: Update code to::
    ```js
    var asset = resolveAssetSource.default(filename);
    ```
