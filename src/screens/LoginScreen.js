import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('ozgecelk01@gmail.com');
  const [password, setPassword] = useState('123');


  const handleLogin = () => {
  if (email === 'ozgecelk01@gmail.com' && password === '123') {
    Alert.alert("Success", "Login successful");
    navigation.navigate('Home');
  } else {
    Alert.alert("Login Failed", "Invalid email or password");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

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

      <Text style={styles.forgot}>Forgot your password?</Text>

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        labelStyle={styles.buttonText}
        contentStyle={{ height: 50 }}
      >
        Sign in →
      </Button>

      <Button onPress={() => navigation.navigate('Register')} style={styles.secondaryButton}>
        Don't have an account? Register
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
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 3, 
  },
  forgot: {
    textAlign: 'right',
    color: '#777',
    marginBottom: 10,
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
