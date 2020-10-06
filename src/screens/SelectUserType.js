import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Surface } from 'react-native-paper';
import UserContext from '../contexts/UserContext';

const SelectUserType = () => {
  const { user, setUserType } = useContext(UserContext);

  const handleTouch = (type) => {
    console.log(type);
    setUserType(type);
  };

  return (
    <View
      style={{
        height: '100%',
        paddingTop: 10,
        width: '100%',
      }}
    >
      <View style={styles.textSection}>
        <Text style={styles.text}> ¿Qué tipo de usuario eres?</Text>
      </View>
      <View style={styles.optionsSection}>
        <TouchableOpacity
          style={{ ...styles.optionTouch, backgroundColor: '#0c01' }}
          onPress={() => handleTouch('agricultor')}
        >
          <Surface style={styles.option}>
            <Avatar.Icon
              style={styles.optionsIcon}
              size={100}
              icon='sprout'
              color='white'
            />
            <Text style={styles.optionText}>Agricultor</Text>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.optionTouch, backgroundColor: '#00c1' }}
          onPress={() => handleTouch('transportador')}
        >
          <Surface style={styles.option}>
            <Avatar.Icon
              style={styles.optionsIcon}
              size={100}
              icon='truck'
              color='white'
            />
            <Text style={styles.optionText}>Transportador</Text>
          </Surface>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textSection: {
    paddingBottom: '8%',
    height: '30%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    paddingHorizontal: '10%',
    marginTop: '3%',
    fontSize: 32,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  optionsSection: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
  },
  optionTouch: { width: '100%', height: '50%' },
  option: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0000',

    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsIcon: { backgroundColor: '#1152fd' },
  optionText: {
    fontSize: 24,
    paddingTop: '5%',
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default SelectUserType;
