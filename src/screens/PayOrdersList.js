import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import OrderContext from '../contexts/OrderContext';
import UserContext from '../contexts/UserContext';

const PayOrdersList = ({ navigation }) => {
  const [product, setProduct] = useState('');

  const { user } = useContext(UserContext);
  const {
    ordersList,
    getOrdersList,
    setSelectedOrder,
    getOrdersOfferedList,
  } = useContext(OrderContext);

  useFocusEffect(
    useCallback(() => {
      if (user.userType === 'agricultor') {
        getOrdersList(user);
      } else {
        getOrdersOfferedList(user);
      }
    }, [])
  );

  const renderItems = () => {
    return ordersList.map((item, index) => {
      if (!item.expired) return;
      if (
        user.userType === 'transportador' &&
        item.offeringUsersID[item.offeringUsersID.length - 1] !== user._id
      )
        return;

      return (
        <TouchableOpacity
          style={{
            width: '90%',
            marginVertical: '5%',
            elevation: 2,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'lightgrey',
            backgroundColor: 'white',
          }}
          onPress={() => {
            //setSelectedOrder(item);
            navigation.push(
              'OrderDetails',
              user.userType === 'agricultor'
                ? { payment: true, orderId: item._id }
                : {}
            );
          }}
          key={item._id}
        >
          <View style={styles.card}>
            <View style={styles.topCardContent}>
              <Text style={styles.date}>
                {new Date(item.initDate).toDateString()}
              </Text>
              <Text style={styles.timeLeft}>{item.daysToExpire} days</Text>
              <Text
                style={[
                  { ...styles.progress },
                  item.bill === 'None' ? { color: 'red' } : { color: 'green' },
                ]}
              >
                {item.bill === 'None' ? 'NO PAGADO' : 'PAGADO'}
              </Text>
            </View>
            <Divider />
            <View style={styles.pContainer}>
              <View style={styles.positionContainer}>
                <Avatar.Icon
                  size={30}
                  icon='crosshairs-gps'
                  color='grey'
                  style={styles.positionAvatar}
                />
                <Text style={styles.positionText}>{item.initLoc}</Text>
              </View>
              <Divider />
              <View style={styles.positionContainer}>
                <Avatar.Icon
                  size={30}
                  icon='map-marker'
                  color='grey'
                  style={styles.positionAvatar}
                />
                <Text style={styles.positionText}>{item.endLoc}</Text>
              </View>
            </View>
            <Divider />
            <View style={styles.bidContainer}>
              <Text style={styles.bidText}>
                Mejor Oferta: {item.currentBid} $
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollSection}>
        {renderItems()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    height: '35%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flex: 1,
  },
  scrollSection: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  card: {
    height: 250,
  },
  topCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '15%',
  },
  date: {
    fontSize: 16,
    color: 'black',
  },
  timeLeft: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  progress: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pContainer: {
    height: '55%',
    backgroundColor: 'white',
  },
  positionContainer: {
    paddingHorizontal: '5%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionAvatar: {
    backgroundColor: 'white',
  },
  positionText: {
    fontSize: 24,
    marginLeft: '5%',
    flex: 1,
    color: 'grey',
    fontWeight: 'bold',
  },
  bidContainer: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PayOrdersList;
