import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Divider, Surface, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserContext from '../contexts/UserContext';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const Contact = ({ navigation, route }) => {
  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: 'white',
        width: '100%',
        flex: 1,
      }}
      contentContainerStyle={{
        alignItems: 'center',
        paddingHorizontal: 50,
      }}
    >
      <Text style={styles.mainText}>
        Escríbenos un mensaje. Te responderemos por correo.
      </Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={10}
        textAlignVertical={'top'}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainText: {
    marginVertical: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'grey',
  },

  input: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    fontSize: 18,
    color: 'grey',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 20,
  },
  button: {
    width: 200,
    marginTop: 40,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Contact;
