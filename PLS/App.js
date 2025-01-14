import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './context/AuthContext';  // Import the AuthContextProvider
import RootNavigator from './navigation/RootNavigator';  // A navigator that decides which screen to render based on authentication state

// App Component: Wrapping the entire app in AuthContextProvider
const App = () => {
  return (
    <AuthContextProvider> {/* Ensures the AuthContext is available to all components */}
      <NavigationContainer>
        <RootNavigator /> {/* RootNavigator handles the screen switching based on authentication */}
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
