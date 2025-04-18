import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SoundManager from '../utils/SoundManager';

const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const words = [
  'CASA', 'PERRO', 'GATO', 'MESA', 'SILLA', 'LUNA', 'SOL', 'ÁRBOL',
  'NIÑO', 'NIÑA', 'MAMÁ', 'PAPÁ', 'FLOR', 'LIBRO', 'AGUA', 'PAN',
  'JUEGO', 'PELOTA', 'PÁJARO', 'COCHE'
];

export function RandomScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentItem, setCurrentItem] = useState('');
  const [isLetter, setIsLetter] = useState(true);

  useEffect(() => {
    // Initialize sound manager when component mounts
    SoundManager.initialize();
    return () => {
      // Clean up sounds when component unmounts
      SoundManager.stopAll();
    };
  }, []);

  const getRandomLetter = () => {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    setCurrentItem(letter);
    setIsLetter(true);
    SoundManager.playLetter(letter);
  };

  const getRandomWord = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentItem(word);
    setIsLetter(false);
    SoundManager.playWord(word);
  };

  const repeatItem = () => {
    if (isLetter) {
      SoundManager.playLetter(currentItem);
    } else {
      SoundManager.playWord(currentItem);
    }
  };

  const textColor = {color: isDarkMode ? Colors.white : Colors.black};

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={[styles.displayText, textColor]}>
          {currentItem || 'Presiona un botón para comenzar'}
        </Text>

        {currentItem && (
          <TouchableOpacity
            style={[styles.button, styles.repeatButton]}
            onPress={repeatItem}>
            <Text style={styles.buttonText}>Repetir {isLetter ? 'Letra' : 'Palabra'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.letterButton]}
          onPress={getRandomLetter}>
          <Text style={styles.buttonText}>Nueva Letra</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.wordButton]}
          onPress={getRandomWord}>
          <Text style={styles.buttonText}>Nueva Palabra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    minWidth: 150,
    alignItems: 'center',
  },
  letterButton: {
    backgroundColor: '#4CAF50',
  },
  wordButton: {
    backgroundColor: '#2196F3',
  },
  repeatButton: {
    backgroundColor: '#FFA000',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
