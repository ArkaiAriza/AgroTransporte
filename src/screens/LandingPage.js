import React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SideMenu from './SideMenu';

import MainMenu from './MainMenu';
import CreateOrderPosition from './CreateOrderPosition';

const Drawer = createDrawerNavigator();

export default LandingPage = ({ navigation }) => {
  return (
    <Drawer.Navigator
      drawerContent={() => <SideMenu navigation={navigation} />}
    >
      <Drawer.Screen name='MainMenu' component={MainMenu} />
      <Drawer.Screen name='CreateOrder' component={CreateOrderPosition} />
    </Drawer.Navigator>
  );
};
