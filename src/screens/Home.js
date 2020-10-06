import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import AppMain from './AppMain';
import SelectUsertype from './SelectUserType';

import UserContext from '../contexts/UserContext';

export default Home = () => {
  const { user, logged, loading } = useContext(UserContext);
  useEffect(() => console.log(user, loading), [user, loading]);

  return loading ? null : !logged ? (
    <HomeScreen />
  ) : user.userType === 'Not Selected' ? (
    <SelectUsertype />
  ) : (
    <AppMain />
  );
};
