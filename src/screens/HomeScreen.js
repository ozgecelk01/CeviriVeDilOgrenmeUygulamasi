import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome 👋</Text>
      <Text style={styles.subText}>Choose an option below:</Text>

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={() => navigation.navigate('Translate')}
      >
        🈂️ Translate Words or Sentences
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={() => navigation.navigate('Favorites')}
      >
        ⭐ Favorites
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={() => navigation.navigate('DailyWords')}
      >
        📅 Daily Word Suggestions
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={() => navigation.navigate('History')}
      >
        🕓 Translation History
      </Button>

      <Button
        mode="outlined"
        style={styles.logoutButton}
        labelStyle={styles.logoutText}
        onPress={() => navigation.replace('Login')}
      >
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#FFF8F3',
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  button: {
    marginBottom: 15,
    backgroundColor: '#FFA500',
    borderRadius: 20,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  logoutButton: {
    marginTop: 20,
    borderColor: '#FF6A00',
    borderWidth: 1,
    borderRadius: 20,
  },
  logoutText: {
    color: '#FF6A00',
    fontWeight: 'bold',
  },
});
