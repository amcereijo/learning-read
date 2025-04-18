import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Animated,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SoundManager from '../utils/SoundManager';

const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const exampleWords: {[key: string]: string[]} = {
  'A': ['AGUA', 'ÁRBOL', 'AVIÓN'],
  'B': ['BARCO', 'BOLA', 'BESO'],
  'C': ['CASA', 'COCHE', 'CAMA'],
  'D': ['DEDO', 'DADO', 'DULCE'],
  'E': ['ELEFANTE', 'ESCUELA', 'ESTRELLA'],
  'F': ['FLOR', 'FOCA', 'FUEGO'],
  'G': ['GATO', 'GOMA', 'GLOBO'],
  'H': ['HOJA', 'HUEVO', 'HIELO'],
  'I': ['ISLA', 'IGLÚ', 'INDIO'],
  'J': ['JUEGO', 'JARDÍN', 'JAULA'],
  'K': ['KILO', 'KARATE', 'KIWI'],
  'L': ['LUNA', 'LIBRO', 'LÁPIZ'],
  'M': ['MAMÁ', 'MESA', 'MANO'],
  'N': ['NIÑO', 'NUBE', 'NARIZ'],
  'Ñ': ['ÑANDÚ', 'ÑOÑO', 'NIÑA'],
  'O': ['OSO', 'OJO', 'OREJA'],
  'P': ['PAPÁ', 'PATO', 'PERRO'],
  'Q': ['QUESO', 'QUINTA', 'QUINCE'],
  'R': ['RATA', 'ROSA', 'RANA'],
  'S': ['SOL', 'SOPA', 'SAPO'],
  'T': ['TAZA', 'TORO', 'TREN'],
  'U': ['UVA', 'UÑA', 'UNO'],
  'V': ['VACA', 'VASO', 'VELA'],
  'W': ['WIFI', 'WEB', 'WATERPOLO'],
  'X': ['XILÓFONO', 'SAXOFÓN', 'TAXI'],
  'Y': ['YOYO', 'YEMA', 'YACARÉ'],
  'Z': ['ZAPATO', 'ZEBRA', 'ZORRO'],
};

export function AlphabetScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    SoundManager.initialize();
    return () => {
      SoundManager.stopAll();
    };
  }, []);

  const textColor = {color: isDarkMode ? Colors.white : Colors.black};
  const backgroundColor = {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter};

  const currentLetter = alphabet[currentIndex];
  const words = exampleWords[currentLetter];

  const animateLetter = (letter: string) => {
    SoundManager.playLetter(letter);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const goToNextLetter = () => {
    if (currentIndex < alphabet.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      animateLetter(alphabet[nextIndex]);
    }
  };

  const goToPreviousLetter = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      animateLetter(alphabet[prevIndex]);
    }
  };

  const playSound = (word: string) => {
    SoundManager.playWord(word);
  };

  return (
    <View style={[styles.container, backgroundColor]}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
          onPress={goToPreviousLetter}
          disabled={currentIndex === 0}>
          <Text style={styles.navButtonText}>← Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentIndex === alphabet.length - 1 && styles.disabledButton,
          ]}
          onPress={goToNextLetter}
          disabled={currentIndex === alphabet.length - 1}>
          <Text style={styles.navButtonText}>Siguiente →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.letterContainer,
            {
              transform: [{scale: animation}],
            },
          ]}>
          <Text style={[styles.letterText, textColor]}>{currentLetter}</Text>
        </Animated.View>

        <View style={styles.wordsContainer}>
          {words.map((word) => (
            <TouchableOpacity
              key={word}
              style={styles.wordButton}
              onPress={() => playSound(word)}>
              <Text style={styles.wordText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={[styles.progressText, textColor]}>
          {currentIndex + 1} / {alphabet.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 100,
    marginBottom: 30,
  },
  letterText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: 'white',
  },
  wordsContainer: {
    width: '100%',
  },
  wordButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  wordText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressText: {
    fontSize: 18,
  },
});
