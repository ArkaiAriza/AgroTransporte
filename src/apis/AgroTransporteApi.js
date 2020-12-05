import axios from 'axios';

import Constants from 'expo-constants';
import { processColor } from 'react-native';
const { manifest } = Constants;

export let api = ``;

if (process.env.NODE_ENV === 'production') {
  api = 'https://floating-mesa-30503.herokuapp.com';
} else {
  api = `http://${manifest.debuggerHost.split(':').shift()}.nip.io:5000`;
  //api = 'https://floating-mesa-30503.herokuapp.com';
}

export default axios.create({
  baseURL: api,
  //params: { token: NEWS_KEY },
});
