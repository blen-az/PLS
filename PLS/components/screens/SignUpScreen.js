import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';  // Import useAuth hook

const SignUpScreen = ({ navigation }) => {
  const { register } = useAuth();  // Get the register function from context
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    age: '',
    educationLevel: '',
    phoneNumber: '',
  });

  const handleInputChange = (name, value) => {
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignUp = async () => {
    const { fullName, email, password } = userData;

    // Check if all required fields are filled
    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    // Check password strength (at least 6 characters)
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    // Call the register function from the AuthContext
    const { success, msg } = await register(email, password, fullName);

    if (success) {
      // On successful sign-up, navigate directly to the SignInScreen
      Alert.alert("Success", msg, [
        {
          text: "OK",
          onPress: () => navigation.replace('SignInScreen'),  // Use 'replace' to avoid going back to SignUp screen
        }
      ]);
    } else {
      // Show error message if registration fails
      Alert.alert("Registration Failed", msg);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Full Name */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={text => handleInputChange('fullName', text)}
        value={userData.fullName}
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => handleInputChange('email', text)}
        value={userData.email}
        keyboardType="email-address"
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => handleInputChange('password', text)}
        value={userData.password}
        secureTextEntry
      />

      {/* Age */}
      <TextInput
        style={styles.input}
        placeholder="Age"
        onChangeText={text => handleInputChange('age', text)}
        value={userData.age}
        keyboardType="numeric"
      />

      {/* Education Level */}
      <TextInput
        style={styles.input}
        placeholder="Education Level"
        onChangeText={text => handleInputChange('educationLevel', text)}
        value={userData.educationLevel}
      />

      {/* Phone Number */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={text => handleInputChange('phoneNumber', text)}
        value={userData.phoneNumber}
        keyboardType="phone-pad"
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Redirect to SignIn Screen */}
      <View style={styles.signInRedirect}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
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
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInRedirect: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInLink: {
    color: '#0066cc',
    fontWeight: 'bold',
  }
});

export default SignUpScreen;
