import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Avatar, Card, Divider } from 'react-native-paper';
import userContext from '../contexts/UserContext';
import OrderContext from '../contexts/OrderContext';
import UserContext from '../contexts/UserContext';

const OrdersOffered = ({ navigation }) => {
  const [product, setProduct] = useState('');

  const { user } = useContext(UserContext);
  const { ordersList, getOrdersOfferedList, setSelectedOrder } = useContext(
    OrderContext
  );

  useEffect(() => {
    getOrdersOfferedList(user);
  }, []);

  const renderItems = () => {
    return ordersList.map((item, index) => {
      return (
        <TouchableOpacity
          key={item._id}
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
            navigation.push('OrderDetails', {
              orderId: item._id,
              payment: false,
            });
          }}
        >
          <View style={styles.card}>
            <View style={styles.topCardContent}>
              <Text style={styles.date}>
                {new Date(item.initDate).toDateString()}
              </Text>
              <Text style={styles.timeLeft}>{item.daysToExpire} days</Text>
              <Text
                style={
                  ({ ...styles.progress },
                  item.expired ? { color: 'red' } : { color: 'blue' })
                }
              >
                {item.expired ? 'TERMINADO' : 'EN PROGRESO'}
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
              <Text
                style={[
                  styles.bidText,
                  user._id ===
                  item.offeringUsersID[item.offeringUsersID.length - 1]
                    ? { color: 'green' }
                    : { color: 'red' },
                ]}
              >
                Mejor Oferta: {item.currentBid} $
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const handleFinish = async () => {
    await postOrder(
      { ...temporaryOrder, products: items, price, duration },
      user
    );
    navigation.pop(2);
    //navigation.push('OrdersOffered');
  };

  const handleAdd = () => {
    setItems([...items, { product, weight }]);
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

export default OrdersOffered;
