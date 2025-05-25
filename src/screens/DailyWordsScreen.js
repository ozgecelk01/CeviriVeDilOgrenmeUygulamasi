import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';


const allWords = [
  { id: '1', word: 'accumulate', meaning: 'biriktirmek', isFavorite: false },
  { id: '2', word: 'dilute', meaning: 'seyreltmek', isFavorite: false },
  { id: '3', word: 'sustainability', meaning: 'sürdürülebilirlik', isFavorite: false },
  { id: '4', word: 'encrypt', meaning: 'şifrelemek', isFavorite: false },
  { id: '5', word: 'drain', meaning: 'boşaltmak', isFavorite: false },
  { id: '6', word: 'applicable', meaning: 'uygulanabilir', isFavorite: false },
  { id: '7', word: 'submerge', meaning: 'batırmak', isFavorite: false },
  { id: '8', word: 'hold up', meaning: 'geciktirmek', isFavorite: false },
  { id: '9', word: 'disrupt', meaning: 'aksatmak, bozmak', isFavorite: false },
  { id: '10', word: 'commence', meaning: 'başlamak', isFavorite: false },
  { id: '11', word: 'convey', meaning: 'iletmek', isFavorite: false },
  { id: '12', word: 'allocate', meaning: 'tahsis etmek', isFavorite: false },
  { id: '13', word: 'adapt', meaning: 'uyum sağlamak', isFavorite: false },
  { id: '14', word: 'exceed', meaning: 'aşmak', isFavorite: false },
  { id: '15', word: 'implement', meaning: 'uygulamak', isFavorite: false },
  { id: '16', word: 'modify', meaning: 'değiştirmek', isFavorite: false },
  { id: '17', word: 'navigate', meaning: 'yolunu bulmak', isFavorite: false },
  { id: '18', word: 'obtain', meaning: 'elde etmek', isFavorite: false },
  { id: '19', word: 'perceive', meaning: 'algılamak', isFavorite: false },
  { id: '20', word: 'pursue', meaning: 'takip etmek', isFavorite: false },
  { id: '21', word: 'refine', meaning: 'arıtmak, geliştirmek', isFavorite: false },
  { id: '22', word: 'relocate', meaning: 'taşınmak', isFavorite: false },
  { id: '23', word: 'suppress', meaning: 'bastırmak', isFavorite: false },
  { id: '24', word: 'synthesize', meaning: 'birleştirmek', isFavorite: false },
  { id: '25', word: 'transform', meaning: 'dönüştürmek', isFavorite: false },
  { id: '26', word: 'validate', meaning: 'doğrulamak', isFavorite: false },
  { id: '27', word: 'anticipate', meaning: 'beklemek, ummak', isFavorite: false },
  { id: '28', word: 'collaborate', meaning: 'iş birliği yapmak', isFavorite: false },
  { id: '29', word: 'diversify', meaning: 'çeşitlendirmek', isFavorite: false },
  { id: '30', word: 'eliminate', meaning: 'elemek', isFavorite: false },
  { id: '31', word: 'fluctuate', meaning: 'dalgalanmak', isFavorite: false },
  { id: '32', word: 'highlight', meaning: 'vurgulamak', isFavorite: false },
  { id: '33', word: 'illustrate', meaning: 'örneklemek, göstermek', isFavorite: false },
  { id: '34', word: 'integrate', meaning: 'bütünleştirmek', isFavorite: false },
  { id: '35', word: 'mediate', meaning: 'arabuluculuk yapmak', isFavorite: false },
  { id: '36', word: 'navigate', meaning: 'yolunu bulmak', isFavorite: false },
  { id: '37', word: 'optimize', meaning: 'optimize etmek', isFavorite: false },
  { id: '38', word: 'overcome', meaning: 'üstesinden gelmek', isFavorite: false },
  { id: '39', word: 'prioritize', meaning: 'öncelik vermek', isFavorite: false },
  { id: '40', word: 'reconcile', meaning: 'uzlaştırmak', isFavorite: false },
  { id: '41', word: 'reinforce', meaning: 'güçlendirmek', isFavorite: false },
  { id: '42', word: 'speculate', meaning: 'tahminde bulunmak', isFavorite: false },
  { id: '43', word: 'streamline', meaning: 'düzenlemek, kolaylaştırmak', isFavorite: false },
  { id: '44', word: 'sustain', meaning: 'devam ettirmek', isFavorite: false },
  { id: '45', word: 'thrive', meaning: 'gelişmek', isFavorite: false },
  { id: '46', word: 'utilize', meaning: 'kullanmak', isFavorite: false },
  { id: '47', word: 'withdraw', meaning: 'geri çekilmek', isFavorite: false },
  { id: '48', word: 'yield', meaning: 'vermek, sağlamak', isFavorite: false },
  { id: '49', word: 'absorb', meaning: 'emmek', isFavorite: false },
  { id: '50', word: 'broaden', meaning: 'genişletmek', isFavorite: false },
  { id: '51', word: 'conceal', meaning: 'gizlemek', isFavorite: false },
  { id: '52', word: 'dedicate', meaning: 'adamak', isFavorite: false },
  { id: '53', word: 'enhance', meaning: 'arttırmak', isFavorite: false },
  { id: '54', word: 'facilitate', meaning: 'kolaylaştırmak', isFavorite: false },
  { id: '55', word: 'gather', meaning: 'toplamak', isFavorite: false },
  { id: '56', word: 'highlight', meaning: 'vurgulamak', isFavorite: false },
  { id: '57', word: 'illustrate', meaning: 'örneklemek', isFavorite: false },
  { id: '58', word: 'jeopardize', meaning: 'tehlikeye atmak', isFavorite: false },
  { id: '59', word: 'justify', meaning: 'haklı çıkarmak', isFavorite: false },
  { id: '60', word: 'kindle', meaning: 'ateşlemek', isFavorite: false },
  { id: '61', word: 'legislate', meaning: 'yasalaştırmak', isFavorite: false },
  { id: '62', word: 'manipulate', meaning: 'yönlendirmek', isFavorite: false },
  { id: '63', word: 'mitigate', meaning: 'hafifletmek', isFavorite: false },
  { id: '64', word: 'navigate', meaning: 'yolunu bulmak', isFavorite: false },
  { id: '65', word: 'oblige', meaning: 'zorunda bırakmak', isFavorite: false },
  { id: '66', word: 'optimize', meaning: 'optimize etmek', isFavorite: false },
  { id: '67', word: 'oversee', meaning: 'denetlemek', isFavorite: false },
  { id: '68', word: 'participate', meaning: 'katılmak', isFavorite: false },
  { id: '69', word: 'persevere', meaning: 'azmetmek', isFavorite: false },
  { id: '70', word: 'prevail', meaning: 'üstün gelmek', isFavorite: false },
  { id: '71', word: 'prohibit', meaning: 'yasaklamak', isFavorite: false },
  { id: '72', word: 'pursue', meaning: 'takip etmek', isFavorite: false },
  { id: '73', word: 'qualify', meaning: 'hak kazanmak', isFavorite: false },
  { id: '74', word: 'relinquish', meaning: 'vazgeçmek', isFavorite: false },
  { id: '75', word: 'resist', meaning: 'direnmek', isFavorite: false },
  { id: '76', word: 'retain', meaning: 'elde tutmak', isFavorite: false },
  { id: '77', word: 'revise', meaning: 'gözden geçirmek', isFavorite: false },
  { id: '78', word: 'scrutinize', meaning: 'incelemek', isFavorite: false },
  { id: '79', word: 'substitute', meaning: 'yerine geçmek', isFavorite: false },
  { id: '80', word: 'terminate', meaning: 'sonlandırmak', isFavorite: false },
  { id: '81', word: 'transcend', meaning: 'aşmak', isFavorite: false },
  { id: '82', word: 'trigger', meaning: 'tetiklemek', isFavorite: false },
  { id: '83', word: 'underscore', meaning: 'vurgulamak', isFavorite: false },
  { id: '84', word: 'utilize', meaning: 'kullanmak', isFavorite: false },
  { id: '85', word: 'vacate', meaning: 'boşaltmak', isFavorite: false },
  { id: '86', word: 'validate', meaning: 'doğrulamak', isFavorite: false },
  { id: '87', word: 'vanish', meaning: 'gözden kaybolmak', isFavorite: false },
  { id: '88', word: 'warrant', meaning: 'garanti etmek', isFavorite: false },
  { id: '89', word: 'withstand', meaning: 'dayanmak', isFavorite: false },
  { id: '90', word: 'yield', meaning: 'vermek', isFavorite: false },
  { id: '91', word: 'zoom', meaning: 'yakınlaştırmak', isFavorite: false },
  { id: '92', word: 'anticipate', meaning: 'beklemek', isFavorite: false },
  { id: '93', word: 'broaden', meaning: 'genişletmek', isFavorite: false },
  { id: '94', word: 'clarify', meaning: 'açıklığa kavuşturmak', isFavorite: false },
  { id: '95', word: 'consolidate', meaning: 'sağlamlaştırmak', isFavorite: false },
  { id: '96', word: 'disclose', meaning: 'açıklamak', isFavorite: false },
  { id: '97', word: 'embrace', meaning: 'kucaklamak', isFavorite: false },
  { id: '98', word: 'facilitate', meaning: 'kolaylaştırmak', isFavorite: false },
  { id: '99', word: 'highlight', meaning: 'vurgulamak', isFavorite: false },
  { id: '100', word: 'implement', meaning: 'uygulamak', isFavorite: false },
];

function getTodayKey() {
  const today = new Date().toISOString().slice(0, 10); 
  return `daily_words_${today}`;
}

function getRandomWords(words, count) {
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function DailyWords() {
  const [dailyWords, setDailyWords] = useState([]);

  useEffect(() => {
    (async () => {
      const key = getTodayKey();
      const stored = await AsyncStorage.getItem(key);
      let todayWords;

      if (stored) {
        todayWords = JSON.parse(stored);
      } else {
        todayWords = getRandomWords(allWords, 10);
        await AsyncStorage.setItem(key, JSON.stringify(todayWords));
      }

      for (let word of todayWords) {
        const fav = await AsyncStorage.getItem(`favorite_${word.id}`);
        word.isFavorite = fav === 'true';
      }

      setDailyWords(todayWords);
    })();
  }, []);

  const toggleFavorite = async (id) => {
    const updatedWords = dailyWords.map((word) =>
      word.id === id ? { ...word, isFavorite: !word.isFavorite } : word
    );
    setDailyWords(updatedWords);
    const updated = updatedWords.find(w => w.id === id);
    await AsyncStorage.setItem(`favorite_${id}`, updated.isFavorite.toString());
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.wordText}>{item.word}</Text>
        <Text style={styles.meaningText}>{item.meaning}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <AntDesign
          name={item.isFavorite ? 'heart' : 'hearto'}
          size={24}
          color={item.isFavorite ? '#e63946' : '#aaa'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌞 Günlük Kelime Önerileri</Text>
      <FlatList
        data={dailyWords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
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
    color: "black",
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
});
