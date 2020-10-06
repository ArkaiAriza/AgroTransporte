import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { UserProvider } from './src/contexts/UserContext';
import { OrderProvider } from './src/contexts/OrderContext';
import Home from './src/screens/Home';

export default App = () => {
  return (
    <PaperProvider>
      <UserProvider>
        <OrderProvider>
          <NavigationContainer>
            <Home />
          </NavigationContainer>
        </OrderProvider>
      </UserProvider>
    </PaperProvider>
  );
};
