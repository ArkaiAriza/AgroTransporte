import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { Appbar, Avatar } from 'react-native-paper';
import { TransitionPresets } from '@react-navigation/stack';

import LandingPage from './LandingPage';
import CreateOrderPosition from './CreateOrderPosition';
import CreateOrderContent from './CreateOrderContent';
import OrdersList from './OrdersList';
import OrdersOfferedList from './OrdersOffered';
import OrderDetails from './OrderDetails';
import SearchOrderPosition from './SearchOrdersPosition';
import Support from './Support';
import FAQ from './FAQ';
import Contact from './Contact';
import PaymentOptions from './PaymentOptions';
import PayOrdersList from './PayOrdersList';
import PayOrder from './PayOrder';

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
    <Appbar.Header
      style={[
        styles.header,
        options.color ? { backgroundColor: options.color } : {},
      ]}
    >
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
      <Stack.Screen
        name='OrdersList'
        component={OrdersList}
        options={{ headerTitle: 'Pedidos' }}
      />
      <Stack.Screen
        name='OrdersOfferedList'
        component={OrdersOfferedList}
        options={{ headerTitle: 'Pedidos Ofertados' }}
      />
      <Stack.Screen
        name='OrderDetails'
        component={OrderDetails}
        options={{ headerTitle: 'Pedido' }}
      />
      <Stack.Screen
        name='SearchOrder'
        component={SearchOrderPosition}
        options={{ headerTitle: 'Buscar Pedidos' }}
      />
      <Stack.Screen
        name='Support'
        component={Support}
        options={{
          headerTitle: 'Soporte',
          color: '#1152fdee',
        }}
      />
      <Stack.Screen
        name='FAQ'
        component={FAQ}
        options={{
          headerTitle: 'FAQ',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name='Contact'
        component={Contact}
        options={{
          headerTitle: 'Contacto',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name='PayOrdersList'
        component={PayOrdersList}
        options={{
          headerTitle: 'Pedidos de Pago',
        }}
      />
      <Stack.Screen
        name='Payments'
        component={PaymentOptions}
        options={{
          headerTitle: 'Pagos',
        }}
      />
      <Stack.Screen
        name='PayOrder'
        component={PayOrder}
        options={{
          headerTitle: 'Pagar Orden',
        }}
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
