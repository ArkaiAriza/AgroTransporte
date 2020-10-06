import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Appbar, Avatar } from 'react-native-paper';

import LandingPage from './LandingPage';
import CreateOrderPosition from './CreateOrderPosition';
import CreateOrderContent from './CreateOrderContent';

const Stack = createStackNavigator();

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header style={styles.header}>
      {previous ? (
        <Appbar.BackAction onPress={() => navigation.pop()} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        >
          <Avatar.Icon size={40} icon='menu' style={styles.menuIcon} />
        </TouchableOpacity>
      )}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default AppMain = () => {
  return (
    <Stack.Navigator
      initialRouteName='Landing'
      headerMode='screen'
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name='Landing'
        component={LandingPage}
        options={{ headerTitle: 'AgroTransporte' }}
      />
      <Stack.Screen
        name='CreateOrder'
        component={CreateOrderPosition}
        options={{ headerTitle: 'Crear Pedido' }}
      />
      <Stack.Screen
        name='CreateOrderContent'
        component={CreateOrderContent}
        options={{ headerTitle: 'Crear Pedido' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
  },
  menuIcon: {
    backgroundColor: 'white',
  },
});
