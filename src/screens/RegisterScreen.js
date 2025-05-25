import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password
      });

      if (response.status === 201) {
        Alert.alert("Success", "Registered successfully");
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert("Registration Failed", error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        theme={{ roundness: 10 }}
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
        theme={{ roundness: 10 }}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
        labelStyle={styles.buttonText}
        contentStyle={{ height: 50 }}
      >
        Create →
      </Button>

      <Button onPress={() => navigation.navigate('Login')} style={styles.secondaryButton}>
        Already have an account? Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 20,
  },
});
