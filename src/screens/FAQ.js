import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider, Surface, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderContext from '../contexts/OrderContext';
import UserContext from '../contexts/UserContext';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const FAQ = ({ navigation }) => {
  const faq = [
    {
      section: 'Cuenta',
      questions: [
        {
          q: 'Desbloquear cuenta',
          text:
            'dhfjabdshjbfhbdasflkjhadsfkjhkjahsdfkjhkjahsd asfdsg sd fg sd fg s dfg  sdg  sdg asdfasdfasdf .as f.a.sf asfsdfasdfafdfa.sdf asdf a sf a sf  as f as df a s df  daf daasfda df f as df a dfs \n jhgjgadshdsagd fds  sdf s  fdsfsdf  sdfs dfsdf sdf sdfs df s sdf sd f',
        },
        {
          q: 'Cambiar el número de telefono',
          text: 'dhfjabdshjbfhbdasflkjhadsfkjhkjahsdfkjhkjahsd',
        },
        {
          q: 'Información de privacidad',
          text: 'dhfjabdshjbfhbdasflkjhadsfkjhkjahsdfkjhkjahsd',
        },
      ],
    },
    {
      section: 'Pagos y precios',
      questions: [
        {
          q: 'Métodos de pago aceptados',
          text: 'dhfjabdshjbfhbdasflkjhadsfkjhkjahsdfkjhkjahsd',
        },
        {
          q: 'Estimación del precio',
          text: 'dhfjabdshjbfhbdasflkjhadsfkjhkjahsdfkjhkjahsd',
        },
        {
          q: 'Cuota de cancelación del viaje',
          text: 'dhfjabdshjbfhbdasflkjhadsfkjhkjahsdfkjhkjahsd',
        },
        {
          q: 'Cargo por daños o limpieza',
          text: 'dhfjabdshjbfhbdasflkjhadsfkjhkjahsdfkjhkjahsd',
        },
        {
          q: 'Precio más alto de lo esperado',
          text: 'dhfjabdshjbfhbdasflkjhadsfkjhkjahsdfkjhkjahsd',
        },
      ],
    },
  ];

  const renderSections = () => {
    return faq.map((item) => {
      return (
        <View key={item.section} style={styles.sectionContainer}>
          <Text style={styles.sectionText}>{item.section}</Text>
          {renderQuestions(item.questions)}
        </View>
      );
    });
  };

  const renderQuestions = (questions) => {
    return questions.map((item) => {
      return (
        <TouchableOpacity
          key={item.q}
          style={styles.questionContainer}
          onPress={() => navigation.push('FAQQuestion', { question: item })}
        >
          <Text style={styles.questionTitle}>{item.q}</Text>
          <Icon
            style={{ backgroundColor: 'white' }}
            size={30}
            name='chevron-right'
            color='lightgrey'
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: 'white',
        width: '100%',
        flex: 1,
      }}
      contentContainerStyle={{ alignItems: 'flex-start', paddingLeft: 50 }}
    >
      {renderSections()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: { width: '100%' },
  sectionText: {
    marginVertical: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: 50,
    marginVertical: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  questionTitle: {
    fontSize: 14,
    color: 'grey',
  },
});

export default FAQ;
