import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import wordData from '../assets/words.json'; 

const DailyWordsScreen = () => {
  const [dailyWords, setDailyWords] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getRandomWords = () => {
    const shuffled = wordData.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  const loadFavorites = async () => {
    const savedFavorites = await AsyncStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  const toggleFavorite = async (word) => {
    let updatedFavorites;
    if (favorites.some(fav => fav.id === word.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== word.id);
    } else {
      updatedFavorites = [...favorites, word];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    setDailyWords(getRandomWords());
    loadFavorites();
  }, []);

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);
    return (
      <View style={styles.wordContainer}>
        <Text style={styles.word}>{item.word}</Text>
        <Text style={styles.meaning}>{item.meaning}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Text style={styles.favorite}>{isFavorite ? '💛' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Günün Kelimeleri</Text>
      <FlatList
        data={dailyWords}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  meaning: {
    fontSize: 16,
    color: 'gray',
  },
  favorite: {
    fontSize: 20,
  },
});

export default DailyWordsScreen;
