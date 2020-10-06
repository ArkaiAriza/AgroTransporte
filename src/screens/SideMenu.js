import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Drawer, Avatar } from 'react-native-paper';
import UserContext from '../contexts/UserContext';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const SideMenu = ({ navigation }) => {
  const { user, logOut } = useContext(UserContext);

  const [active, setActive] = useState('');

  return (
    <View style={styles.drawerContent}>
      <Drawer.Section style={styles.avatarSection}>
        <Avatar.Image
          style={styles.avatar}
          size={80}
          source={{ uri: user.photo }}
        />
        <Text style={styles.avatarName}>{user.name}</Text>
        <Text style={styles.avatarEmail}>{user.email}</Text>
      </Drawer.Section>
      <View style={styles.optionsSection}>
        <Drawer.Item
          style={styles.option}
          label='HISTORIAL'
          active={active === 'historial'}
          onPress={() => setActive('historial')}
        />
        <Drawer.Item
          style={styles.option}
          label='PAGOS'
          active={active === 'pagos'}
          onPress={() => setActive('pagos')}
        />
        {user.userType === 'agricultor' ? (
          <Drawer.Item
            style={styles.option}
            label='CREAR PEDIDO'
            active={active === 'crear'}
            onPress={() => {
              setActive('crear');
              navigation.navigate('CreateOrder');
            }}
          />
        ) : (
          <Drawer.Item
            style={styles.option}
            label='BUSCAR PEDIDO'
            active={active === 'buscar'}
            onPress={() => {
              setActive('buscar');
              navigation.navigate('SearchOrder');
            }}
          />
        )}
        <Drawer.Item
          style={styles.option}
          label='SOPORTE'
          active={active === 'soporte'}
          onPress={() => setActive('soporte')}
        />
        <View style={{ flexBasis: '20%' }} />
        <TouchableOpacity
          style={{ padding: '5%', color: 'blue' }}
          onPress={logOut}
        >
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
            Salir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: { flex: 1 },
  avatarSection: {
    paddingBottom: '5%',
    paddingLeft: '15%',
    height: '40%',
    backgroundColor: '#1152fd',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  avatar: {
    backgroundColor: 'white',
  },
  avatarName: {
    marginVertical: '3%',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  avatarEmail: {
    color: 'white',
  },
  optionsSection: {
    paddingTop: '10%',
    paddingLeft: '10%',
  },
});
export default SideMenu;
