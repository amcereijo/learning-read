import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SoundManager from '../utils/SoundManager';

const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const wordsByLetter: {[key: string]: string[]} = {
  'A': ['AGUA', 'ÁRBOL', 'AVIÓN', 'ARAÑA', 'AMOR'],
  'B': ['BARCO', 'BOLA', 'BESO', 'BEBÉ', 'BANCO'],
  'C': ['CASA', 'COCHE', 'CAMA', 'CAJA', 'COPA'],
  'D': ['DEDO', 'DADO', 'DULCE', 'DIENTE', 'DAMA'],
  'E': ['ELEFANTE', 'ESCUELA', 'ESTRELLA', 'ESPEJO', 'EDAD'],
  'F': ['FLOR', 'FOCA', 'FUEGO', 'FRESA', 'FARO'],
  'G': ['GATO', 'GOMA', 'GLOBO', 'GORRA', 'GOLPE'],
  'H': ['HOJA', 'HUEVO', 'HIELO', 'HADA', 'HAMACA'],
  'I': ['ISLA', 'IGLÚ', 'INDIO', 'IDEA', 'IGUANA'],
  'J': ['JUEGO', 'JARDÍN', 'JAULA', 'JAMÓN', 'JABÓN'],
  'K': ['KILO', 'KARATE', 'KIWI', 'KOALA', 'KÉTCHUP'],
  'L': ['LUNA', 'LIBRO', 'LÁPIZ', 'LEÓN', 'LOBO'],
  'M': ['MAMÁ', 'MESA', 'MANO', 'MONO', 'MAR'],
  'N': ['NIÑO', 'NUBE', 'NARIZ', 'NIDO', 'NOCHE'],
  'Ñ': ['ÑANDÚ', 'ÑOÑO', 'NIÑA', 'MUÑECA', 'CAÑA'],
  'O': ['OSO', 'OJO', 'OREJA', 'OVEJA', 'OLLA'],
  'P': ['PAPÁ', 'PATO', 'PERRO', 'PEZ', 'PALA'],
  'Q': ['QUESO', 'QUINTA', 'QUINCE', 'QUEQUE', 'EQUIPO'],
  'R': ['RATA', 'ROSA', 'RANA', 'ROJO', 'RELOJ'],
  'S': ['SOL', 'SOPA', 'SAPO', 'SILLA', 'SACO'],
  'T': ['TAZA', 'TORO', 'TREN', 'TIGRE', 'TAPA'],
  'U': ['UVA', 'UÑA', 'UNO', 'URBE', 'UNIÓN'],
  'V': ['VACA', 'VASO', 'VELA', 'VESTIDO', 'VERDE'],
  'W': ['WIFI', 'WEB', 'WATERPOLO', 'WAFLE', 'WHISKY'],
  'X': ['XILÓFONO', 'SAXOFÓN', 'XEROGRAFÍA', 'TAXI', 'BOXEO'],
  'Y': ['YOYO', 'YEMA', 'YACARÉ', 'YATE', 'YOGA'],
  'Z': ['ZAPATO', 'ZEBRA', 'ZORRO', 'ZANAHORIA', 'ZETA'],
};

export function LetterSelectionScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedLetter, setSelectedLetter] = useState('');

  const textColor = {color: isDarkMode ? Colors.white : Colors.black};
  const backgroundColor = {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter};

  useEffect(() => {
    SoundManager.initialize();
    return () => {
      SoundManager.stopAll();
    };
  }, []);

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
    SoundManager.playLetter(letter);
  };

  const playSound = (word: string) => {
    SoundManager.playWord(word);
  };

  return (
    <View style={[styles.container, backgroundColor]}>
      <ScrollView>
        <View style={styles.alphabetContainer}>
          {alphabet.map((letter) => (
            <TouchableOpacity
              key={letter}
              style={[
                styles.letterButton,
                selectedLetter === letter && styles.selectedLetter,
              ]}
              onPress={() => handleLetterSelect(letter)}>
              <Text style={[
                styles.letterText,
                selectedLetter === letter && styles.selectedLetterText,
              ]}>
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedLetter && (
          <View style={styles.wordsContainer}>
            <Text style={[styles.sectionTitle, textColor]}>
              Palabras con {selectedLetter}:
            </Text>
            {wordsByLetter[selectedLetter].map((word) => (
              <TouchableOpacity
                key={word}
                style={styles.wordButton}
                onPress={() => playSound(word)}>
                <Text style={styles.wordText}>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  alphabetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  letterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  selectedLetter: {
    backgroundColor: '#2196F3',
  },
  letterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedLetterText: {
    color: 'white',
  },
  wordsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  wordButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  wordText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
