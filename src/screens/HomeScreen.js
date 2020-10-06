import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'expo';
import UserContext from '../contexts/UserContext';

import Constants from 'expo-constants';
const { manifest } = Constants;

let api = ``;

if (process.env.NODE_ENV === 'production') {
  api = 'https://floating-mesa-30503.herokuapp.com';
} else {
  api = `http://${manifest.debuggerHost.split(':').shift()}.nip.io:5000`;
}

const HomeScreen = () => {
  const { user, logged, logIn, setLoading } = useContext(UserContext);

  const handleRedirect = async (event) => {
    const data = Linking.parse(event.url);
    logIn(data.queryParams);
  };

  const handleOAuthLogin = async () => {
    setLoading(true);
    let redirectUrl = await Linking.makeUrl();
    let authUrl = `${api}/auth/google`;

    console.log('redirectURL ' + redirectUrl);
    console.log(api);
    Linking.addEventListener('url', handleRedirect);

    await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);
    Linking.removeEventListener('url', handleRedirect);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/2.jpg')}
        style={styles.image}
      >
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>Bienvenido a</Text>
          <View style={{ alignItems: 'center', marginVertical: '10%' }}>
            <Text style={styles.titleText}>Agro</Text>
            <Text style={styles.titleText}>Transporte</Text>
          </View>
          <Text style={styles.paragraph}>
            La aplicación que conecta a los agricultores y a los
            transportadores!
          </Text>
        </View>
        <View style={styles.googleContainer}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => handleOAuthLogin()}
          >
            <Text style={styles.googleText}> Conéctate con Google!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: '100%', alignItems: 'stretch' },
  mainTextContainer: {
    paddingTop: '5%',
    height: '70%',
    backgroundColor: '#222c',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mainText: { fontSize: 30, color: 'white' },
  titleText: {
    fontSize: 70,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 70,
  },
  paragraph: {
    fontSize: 30,
    color: 'white',
    textAlign: 'justify',
    marginHorizontal: '5%',
  },
  googleContainer: {
    height: '30%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#222c',
  },
  googleText: { fontSize: 25, fontWeight: 'bold', color: '#eee' },
  googleButton: {
    backgroundColor: '#1152fdee',
    padding: '5%',
    elevation: 2,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default HomeScreen;
