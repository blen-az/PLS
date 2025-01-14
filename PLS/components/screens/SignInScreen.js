import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';  // Import useAuth hook

const SignInScreen = ({ navigation }) => {
  const { login } = useAuth(); // Use the login function from context
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setCredentials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = async () => {
    const { email, password } = credentials;

    // Ensure email and password are not empty
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // Call the login function from the AuthContext
    const { success, msg } = await login(email, password);

    if (success) {
      // Navigate to the Dashboard on successful login
      navigation.replace('DashboardScreen');  // Use replace to avoid going back to the SignInScreen after login
    } else {
      // Show error message if login fails
      Alert.alert("Login Failed", msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => handleInputChange('email', text)}
        value={credentials.email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => handleInputChange('password', text)}
        value={credentials.password}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.signUpRedirect}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  button: {
    backgroundColor: '#4c6ef5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpRedirect: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpLink: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default SignInScreen;
