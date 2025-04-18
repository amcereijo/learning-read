import Sound from 'react-native-sound';
import {Platform} from 'react-native';

const LETTERS_AUDIO: Record<string, string> = {
  a: require('../../assets/sounds/a.mp3'),
  á: require('../../assets/sounds/a.mp3'),
  b: require('../../assets/sounds/b.mp3'),
  c: require('../../assets/sounds/c.mp3'),
  d: require('../../assets/sounds/d.mp3'),
  e: require('../../assets/sounds/e.mp3'),
  é: require('../../assets/sounds/e.mp3'),
  f: require('../../assets/sounds/f.mp3'),
  g: require('../../assets/sounds/g.mp3'),
  h: require('../../assets/sounds/h.mp3'),
  i: require('../../assets/sounds/i.mp3'),
  í: require('../../assets/sounds/i.mp3'),
  j: require('../../assets/sounds/j.mp3'),
  k: require('../../assets/sounds/k.mp3'),
  l: require('../../assets/sounds/l.mp3'),
  m: require('../../assets/sounds/m.mp3'),
  n: require('../../assets/sounds/n.mp3'),
  enye: require('../../assets/sounds/enye.mp3'),
  o: require('../../assets/sounds/o.mp3'),
  ó: require('../../assets/sounds/o.mp3'),
  p: require('../../assets/sounds/p.mp3'),
  q: require('../../assets/sounds/q.mp3'),
  r: require('../../assets/sounds/r.mp3'),
  s: require('../../assets/sounds/s.mp3'),
  t: require('../../assets/sounds/t.mp3'),
  u: require('../../assets/sounds/u.mp3'),
  ú: require('../../assets/sounds/u.mp3'),
  v: require('../../assets/sounds/v.mp3'),
  w: require('../../assets/sounds/w.mp3'),
  x: require('../../assets/sounds/x.mp3'),
  y: require('../../assets/sounds/y.mp3'),
  z: require('../../assets/sounds/z.mp3'),
};

// Enable playback in silence mode
Sound.setCategory('Playback');

class SoundManager {
  private static sounds: {[key: string]: Sound} = {};
  private static initialized = false;

  static initialize() {
    if (this.initialized) {
      return;
    }

    // Enable playback in silence mode (required on iOS)
    if (Platform.OS === 'ios') {
      Sound.setCategory('Playback');
    }

    this.initialized = true;

    // Initialize all letter sounds
    'AÁBCDEÉFGHIÍJKLMNÑOÓPQRSTUÚVWXYZ'.split('').forEach(letter => {
      const soundName = letter.toLowerCase();
      let normalizedName = soundName === 'ñ' ? 'enye' : soundName;

      this.loadSound(`letter_${soundName}`, normalizedName);
    });
  }

  private static loadSound(key: string, soundName: string) {
    try {
      const soundPath = LETTERS_AUDIO[soundName];
      if (!soundPath) {
        console.log(`Sound not found for key: ${key}`);
        return;
      }
      const sound = new Sound(soundPath, error => {
        if (error) {
          console.error(`Error loading sound ${soundName}:`, error);
          return;
        }
      });

      console.log(`Sound ${soundName} loaded successfully`);
      sound.setVolume(1.0);
      this.sounds[key] = sound;
    } catch (error) {
      console.error(`Error creating sound ${soundName}:`, error);
    }
  }

  static async playLetter(letter: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const key = `letter_${letter.toLowerCase()}`;
      const sound = this.sounds[key];

      if (!sound) {
        console.error(`Sound not found for letter: ${letter}`);
        reject(new Error(`Sound not found for letter: ${letter}`));
        return;
      }

      // Reset the sound to the beginning
      sound.stop();
      sound.setCurrentTime(0);

      sound.play(success => {
        if (success) {
          resolve();
        } else {
          reject(new Error('Playback failed'));
        }
      });
    });
  }

  static async playWord(word: string): Promise<void> {
    // Play each letter with a small delay between them
    const letters = word.split('');
    for (const letter of letters) {
      try {
        await this.playLetter(letter);
        await new Promise(resolve => setTimeout(resolve, 300)); // 300ms delay between letters
      } catch (error) {
        console.error(`Error playing letter ${letter}:`, error);
      }
    }
  }

  static stopAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.stop();
    });
  }

  static release() {
    Object.values(this.sounds).forEach(sound => {
      sound.release();
    });
    this.sounds = {};
    this.initialized = false;
  }
}

export default SoundManager;
