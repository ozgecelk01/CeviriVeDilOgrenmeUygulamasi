import React, { useState } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { TextInput, Button, Text, Divider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToHistory = async (text, translatedText) => {
  try {
    const existing = await AsyncStorage.getItem('translation_history');
    const history = existing ? JSON.parse(existing) : [];
    const newEntry = { id: Date.now(), text, translatedText };
    const updated = [newEntry, ...history.slice(0, 49)]; 
    await AsyncStorage.setItem('translation_history', JSON.stringify(updated));
  } catch (e) {
    console.error('History saving failed:', e);
  }
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Turkish' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
];

export default function TranslateScreen() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('tr');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) {
      Alert.alert("Error", "Please enter text to translate.");
      return;
    }
    if (sourceLang === targetLang) {
      Alert.alert("Error", "Source and target languages must be different.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'https://libretranslate.com/translate',
        {
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text',
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTranslated(response.data.translatedText);
    } catch (error) {
      Alert.alert("Translation Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Translate</Text>

      <TextInput
        label="Enter text"
        value={text}
        onChangeText={setText}
        mode="outlined"
        multiline
        style={styles.input}
      />

      <Text style={styles.label}>From:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sourceLang}
          onValueChange={(itemValue) => setSourceLang(itemValue)}
          mode="dropdown"
          style={styles.picker}
        >
          {languages.map(lang => (
            <Picker.Item key={lang.code} label={lang.name} value={lang.code} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>To:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={targetLang}
          onValueChange={(itemValue) => setTargetLang(itemValue)}
          mode="dropdown"
          style={styles.picker}
        >
          {languages.map(lang => (
            <Picker.Item key={lang.code} label={lang.name} value={lang.code} />
          ))}
        </Picker>
      </View>

      <Button
        mode="contained"
        onPress={handleTranslate}
        loading={loading}
        style={styles.button}
      >
        Translate →
      </Button>

      {translated ? (
        <View style={styles.resultContainer}>
          <Divider style={{ marginBottom: 10 }} />
          <Text style={styles.resultTitle}>Translation:</Text>
          <Text style={styles.resultText}>{translated}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFF8F3',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
    marginLeft: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#FF8C42',
    borderRadius: 25,
    paddingVertical: 8,
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#222',
  },
});
