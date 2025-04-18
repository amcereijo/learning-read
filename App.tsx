/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RandomScreen} from './src/screens/RandomScreen';
import {LetterSelectionScreen} from './src/screens/LetterSelectionScreen';
import {VowelsScreen} from './src/screens/VowelsScreen';
import {AlphabetScreen} from './src/screens/AlphabetScreen';
import SoundManager from './src/utils/SoundManager';

type RootStackParamList = {
  Home: undefined;
  Random: undefined;
  LetterSelection: undefined;
  Vowels: undefined;
  Alphabet: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Home Screen Component
function HomeScreen({navigation}: HomeScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const buttonStyle = {
    padding: 20,
    marginVertical: 10,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: isDarkMode ? Colors.light : Colors.dark,
  };

  const textStyle = {
    fontSize: 18,
    color: isDarkMode ? Colors.light : Colors.dark,
    textAlign: 'center' as const,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          <Text style={[styles.title, {color: isDarkMode ? Colors.white : Colors.black}]}>
            Aprender a Leer
          </Text>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => navigation.navigate('Random')}>
            <Text style={textStyle}>Aleatorio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => navigation.navigate('LetterSelection')}>
            <Text style={textStyle}>Seleccionar Letra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => navigation.navigate('Vowels')}>
            <Text style={textStyle}>Repasar Vocales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => navigation.navigate('Alphabet')}>
            <Text style={textStyle}>Repasar Abecedario</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  useEffect(() => {
    // Initialize sound manager when app starts
    SoundManager.initialize();

    // Cleanup sounds when app is closed
    return () => {
      SoundManager.release();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Aprender a Leer'}}
        />
        <Stack.Screen
          name="Random"
          component={RandomScreen}
          options={{title: 'Modo Aleatorio'}}
        />
        <Stack.Screen
          name="LetterSelection"
          component={LetterSelectionScreen}
          options={{title: 'Seleccionar Letra'}}
        />
        <Stack.Screen
          name="Vowels"
          component={VowelsScreen}
          options={{title: 'Repasar Vocales'}}
        />
        <Stack.Screen
          name="Alphabet"
          component={AlphabetScreen}
          options={{title: 'Repasar Abecedario'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default App;
