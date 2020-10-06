import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import LandingPage from './src/screens/LandingPage';
import UserContext, { UserProvider } from './src/contexts/UserContext';
import Home from './src/screens/Home';

export default App = () => {
  return (
    <PaperProvider>
      <UserProvider>
        <NavigationContainer>
          <Home />
        </NavigationContainer>
      </UserProvider>
    </PaperProvider>
  );
};
