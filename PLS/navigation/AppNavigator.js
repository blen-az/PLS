import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../components/screens/DashboardScreen';  // Main dashboard screen
import CourseOverviewScreen from '../components/screens/CourseOverviewScreen';  // List of courses

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="DashboardScreen">
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="CourseOverviewScreen" component={CourseOverviewScreen} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
