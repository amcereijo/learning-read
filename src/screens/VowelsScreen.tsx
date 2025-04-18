import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Animated,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SoundManager from '../utils/SoundManager';

const vowels = [
  {
    letter: 'A',
    color: '#FF5252',
    words: ['AGUA', 'ÁRBOL', 'AVIÓN', 'AMOR', 'AVE'],
  },
  {
    letter: 'E',
    color: '#4CAF50',
    words: ['ELEFANTE', 'ESCUELA', 'ESTRELLA', 'ESPEJO', 'EDAD'],
  },
  {
    letter: 'I',
    color: '#2196F3',
    words: ['ISLA', 'IGLÚ', 'INDIO', 'IDEA', 'IGUANA'],
  },
  {
    letter: 'O',
    color: '#FFC107',
    words: ['OSO', 'OJO', 'OREJA', 'OVEJA', 'OLLA'],
  },
  {
    letter: 'U',
    color: '#9C27B0',
    words: ['UVA', 'UÑA', 'UNO', 'URBE', 'UNIÓN'],
  },
];

export function VowelsScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null);
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    SoundManager.initialize();
    return () => {
      SoundManager.stopAll();
    };
  }, []);

  const handleVowelPress = (vowel: string) => {
    setSelectedVowel(vowel);
    SoundManager.playLetter(vowel);
    // Simple animation effect
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

  const playSound = (word: string) => {
    SoundManager.playWord(word);
  };

  const textColor = {color: isDarkMode ? Colors.white : Colors.black};
  const backgroundColor = {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter};

  return (
    <View style={[styles.container, backgroundColor]}>
      <ScrollView>
        <View style={styles.vowelsContainer}>
          {vowels.map((vowel) => (
            <TouchableOpacity
              key={vowel.letter}
              style={[
                styles.vowelButton,
                {backgroundColor: vowel.color},
                selectedVowel === vowel.letter && styles.selectedVowel,
              ]}
              onPress={() => handleVowelPress(vowel.letter)}>
              <Animated.Text
                style={[
                  styles.vowelText,
                  {
                    transform: [
                      {
                        scale: selectedVowel === vowel.letter ? animation : 1,
                      },
                    ],
                  },
                ]}>
                {vowel.letter}
              </Animated.Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedVowel && (
          <Animated.View
            style={[
              styles.wordsContainer,
              {
                transform: [{scale: animation}],
              },
            ]}>
            <Text style={[styles.sectionTitle, textColor]}>
              Palabras con {selectedVowel}:
            </Text>
            {vowels
              .find((v) => v.letter === selectedVowel)
              ?.words.map((word) => (
                <TouchableOpacity
                  key={word}
                  style={[
                    styles.wordButton,
                    {
                      backgroundColor: vowels.find(
                        (v) => v.letter === selectedVowel,
                      )?.color,
                    },
                  ]}
                  onPress={() => playSound(word)}>
                  <Text style={styles.wordText}>{word}</Text>
                </TouchableOpacity>
              ))}
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  vowelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginVertical: 20,
  },
  vowelButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedVowel: {
    borderWidth: 3,
    borderColor: '#FFF',
  },
  vowelText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  wordsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  wordButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  wordText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
