import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import AgroTransporte from '../apis/AgroTransporteApi';

const UserContext = React.createContext({
  user: {},
  userId: '',
  logged: false,
  loading: true,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState('');
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUserFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('@user_id');
        if (value !== null) {
          const { data } = await AgroTransporte.get(
            `/agroapi/current_user/${value}`
          );
          console.log(data);
          setUser(data);
          setLogged(true);
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getUserFromStorage();
  }, []);

  const logIn = async (user) => {
    try {
      await AsyncStorage.setItem('@user_id', user._id);
      setUser(user);
      setLogged(true);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    console.log('logOut');
    setUser({});
    setLogged(false);
    try {
      await AsyncStorage.removeItem('@user_id');
    } catch (e) {
      console.log(e);
    }
  };

  const setUserType = async (type) => {
    const res = await AgroTransporte.put(`/agroapi/user_type/${user._id}`, {
      userType: type,
    });
    setUser({ ...user, userType: type });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userId,
        logged,
        logIn,
        logOut,
        setUserType,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
