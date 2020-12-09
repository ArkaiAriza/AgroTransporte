import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider, Surface, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderContext from '../contexts/OrderContext';
import UserContext from '../contexts/UserContext';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const FAQQuestion = ({ navigation, route }) => {
  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: 'white',
        width: '100%',
        flex: 1,
      }}
      contentContainerStyle={{
        alignItems: 'flex-start',
        paddingHorizontal: 50,
      }}
    >
      <View>
        <Text style={styles.title}>{route.params.question.q}</Text>
        <Text style={styles.text}>{route.params.question.text}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'grey',
  },

  text: {
    fontSize: 18,
    color: 'grey',
  },
});

export default FAQQuestion;
