import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider, Surface, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderContext from '../contexts/OrderContext';
import UserContext from '../contexts/UserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createNavigatorFactory } from '@react-navigation/native';

const Support = ({ navigation }) => {
  const { user } = useContext(UserContext);

  const renderItems = () => {};

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <View style={styles.blueSection} />
      <View style={styles.content}>
        <View style={{ height: '50%' }}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.push('FAQ')}
          >
            <Text style={styles.optionsText}>Preguntas Frecuentes</Text>
            <Icon
              style={{ backgroundColor: 'white' }}
              size={40}
              name='chevron-right'
              color='lightgrey'
            />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={{ height: '50%' }}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.push('Contact')}
          >
            <Text style={styles.optionsText}>Contáctanos</Text>
            <Icon
              style={{ backgroundColor: 'white' }}
              size={40}
              name='chevron-right'
              color='lightgrey'
            />
          </TouchableOpacity>
        </View>
      </View>
      <View styles={styles.whiteSection} />
    </View>
  );
};

const styles = StyleSheet.create({
  blueSection: {
    backgroundColor: '#1152fdee',
    width: '100%',
    height: '40%',
  },
  content: {
    top: '-10%',
    height: '30%',
    width: '90%',
    paddingHorizontal: '5%',
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  option: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0000',
  },
  optionsText: { fontSize: 24, color: 'grey', fontWeight: 'bold' },
  separator: {
    height: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'black',
  },
  whiteSection: {
    backgroundColor: 'white',
    height: '60%',
    width: '100%',
  },
});

export default Support;
