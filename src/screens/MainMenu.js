import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Surface } from 'react-native-paper';
import UserContext from '../contexts/UserContext';

const MainMenu = ({ navigation }) => {
  const { user } = useContext(UserContext);

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <View style={styles.avatarSection}>
        <Avatar.Image
          style={styles.avatar}
          size={80}
          source={{ uri: user.photo }}
        />
        <Text style={styles.avatarName}>{user.name}</Text>
        <Text style={styles.avatarEmail}>{user.email}</Text>
      </View>
      <View style={styles.optionsSection}>
        <TouchableOpacity
          style={styles.optionTouch}
          onPress={() => navigation.push('OrdersList')}
        >
          <Surface style={styles.option}>
            <Avatar.Icon
              style={styles.optionsIcon}
              size={60}
              icon='history'
              color='white'
            />
            <Text style={styles.optionText}>Historial</Text>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionTouch}>
          <Surface style={styles.option}>
            <Avatar.Icon
              style={styles.optionsIcon}
              size={60}
              icon='credit-card-outline'
              color='white'
            />
            <Text style={styles.optionText}>Pagos</Text>
          </Surface>
        </TouchableOpacity>
        {user.userType === 'agricultor' ? (
          <TouchableOpacity
            style={styles.optionTouch}
            onPress={() => navigation.push('CreateOrder')}
          >
            <Surface style={styles.option}>
              <Avatar.Icon
                style={styles.optionsIcon}
                size={60}
                icon='tag'
                color='white'
              />
              <Text style={styles.optionText}>Crear Pedido</Text>
            </Surface>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.optionTouch}
            onPress={() => navigation.push('SearchOrder')}
          >
            <Surface style={styles.option}>
              <Avatar.Icon
                style={styles.optionsIcon}
                size={60}
                icon='tag'
                color='white'
              />
              <Text style={styles.optionText}>Buscar Pedido</Text>
            </Surface>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.optionTouch}>
          <Surface style={styles.option}>
            <Avatar.Icon
              style={styles.optionsIcon}
              size={60}
              icon='face-agent'
              color='white'
            />
            <Text style={styles.optionText}>Soporte</Text>
          </Surface>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarSection: {
    paddingBottom: '5%',
    height: '35%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    backgroundColor: '#eee',
  },
  avatarName: {
    marginTop: '3%',
    fontSize: 24,
    color: 'grey',
    fontWeight: 'bold',
  },
  avatarEmail: {
    color: 'grey',
  },

  optionsSection: {
    paddingTop: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',

    paddingHorizontal: '5%',
    height: '65%',
    backgroundColor: 'white',
  },
  optionTouch: { width: '40%', height: 140, margin: '2%' },
  option: {
    width: '100%',
    height: '100%',
    margin: '2%',

    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsIcon: { backgroundColor: '#1152fd' },
  optionText: {
    fontSize: 16,
    paddingTop: '5%',
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default MainMenu;
