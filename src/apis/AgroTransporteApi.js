import axios from 'axios';

export default axios.create({
  baseURL: 'https://floating-mesa-30503.herokuapp.com/',
  //params: { token: NEWS_KEY },
});
