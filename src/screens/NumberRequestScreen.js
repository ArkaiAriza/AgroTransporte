import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import UserContext from '../contexts/UserContext';

const NumberRequestScreen = () => {
  const { user, setUserNumber } = useContext(UserContext);
  const [number, setNumber] = useState('');

  const handleSubmit = () => {
    setUserNumber(number);
  };

  return (
    <View
      style={{
        height: '100%',
        paddingTop: '30%',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Text style={styles.text}>Ingresa tu número telefónico:</Text>
      <TextInput
        style={styles.textInput}
        keyboardType='numeric'
        value={number}
        onChange={(e) => {
          setNumber(e.nativeEvent.text);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: '10%',
    marginTop: '10%',
    fontSize: 34,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    paddingHorizontal: '10%',
    marginVertical: '10%',
    width: '70%',
    fontSize: 32,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
  },
  button: {
    height: '10%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NumberRequestScreen;
