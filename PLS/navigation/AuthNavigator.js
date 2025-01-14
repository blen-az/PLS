import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../components/screens/SignInScreen'; // SignIn screen
import SignUpScreen from '../components/screens/SignUpScreen'; // SignUp screen

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignInScreen">
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
