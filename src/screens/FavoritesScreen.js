import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favorites() {
  const [favoriteWords, setFavoriteWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorite_words');
      if (jsonValue != null) {
        setFavoriteWords(JSON.parse(jsonValue));
      } else {
        setFavoriteWords([]);
      }
    } catch (e) {
      console.error('Favori kelimeler yüklenirken hata:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.wordText}>{item.word}</Text>
        <Text style={styles.meaningText}>{item.meaning}</Text>
      </View>
      <AntDesign name="heart" size={24} color="#e63946" />
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Favori Kelimeler</Text>
      {favoriteWords.length > 0 ? (
        <FlatList
          data={favoriteWords}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={styles.emptyText}>Henüz favori kelimen yok.</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  wordText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  meaningText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
});
