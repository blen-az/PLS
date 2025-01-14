import React from 'react';
import { Text, View } from 'react-native';  // Make sure Text is imported
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';  // Accessing AuthContext

import SignInScreen from '../components/screens/SignInScreen';
import SignUpScreen from '../components/screens/SignUpScreen';
import DashboardScreen from '../components/screens/DashboardScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, loading } = useAuth();  // Access the authentication status

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>  {/* Ensure Text is imported to avoid the error */}
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? "DashboardScreen" : "SignInScreen"}>
      {isAuthenticated ? (
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      ) : (
        <>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
