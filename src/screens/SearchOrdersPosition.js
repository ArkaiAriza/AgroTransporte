import React, { useContext, useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Surface, Avatar, Divider } from 'react-native-paper';
import OrderContext from '../contexts/OrderContext';
import UserContext from '../contexts/UserContext';
import { useFocusEffect } from '@react-navigation/native';

const SearchOrdersPosition = ({ navigation }) => {
  const [initLoc, setInitLoc] = useState('Bogota');
  const [endLoc, setEndLoc] = useState('Cartagena');

  const { user } = useContext(UserContext);
  const { searchOrders, searchOrdersList, setSelectedOrder } = useContext(
    OrderContext
  );

  useFocusEffect(
    useCallback(() => {
      return () => searchOrders('Bogota', 'Bogota', user);
    }, [])
  );

  const renderItems = () => {
    return searchOrdersList.map((item, index) => {
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
            setSelectedOrder(item);
            navigation.push('OrderDetails', { orderId: item._id });
          }}
        >
          <View style={styles.card}>
            <View style={styles.topCardContent}>
              <Text style={styles.date}>
                {new Date(item.initDate).toDateString()}
              </Text>
              <Text style={styles.totalWeight}>{item.weight} KG</Text>
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
              <View style={styles.leftContainer}>
                <View style={styles.positionContainer}>
                  <Avatar.Icon
                    size={30}
                    icon='crosshairs-gps'
                    color='grey'
                    style={styles.positionAvatar}
                  />
                  <Text style={styles.positionText}>{item.initLoc}</Text>
                </View>
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
              <View style={styles.rightContainer}>
                <Text style={styles.bidText}>{item.currentBid} $</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const handleSearch = () => {
    searchOrders(initLoc, endLoc, user);
  };

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <View style={styles.positionSection}>
        <Text>Origen</Text>
        <Surface style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Avatar.Icon
              size={25}
              icon='magnify'
              color='grey'
              style={styles.searchAvatar}
            />
            <TextInput
              style={styles.searchInput}
              value={initLoc}
              onChange={(e) => setInitLoc(e.nativeEvent.text)}
            />
          </View>
        </Surface>
        <Text>Destino</Text>
        <Surface style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Avatar.Icon
              size={25}
              icon='magnify'
              color='grey'
              style={styles.searchAvatar}
            />
            <TextInput
              style={styles.searchInput}
              value={endLoc}
              onChange={(e) => setEndLoc(e.nativeEvent.text)}
            />
          </View>
        </Surface>
        <View style={styles.addButtonSection}>
          <TouchableOpacity style={styles.addButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollSection}>
          {searchOrdersList.length !== 0 ? renderItems() : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    height: '40%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flex: 1,
  },
  scrollSection: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  positionSection: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    width: '100%',
  },
  searchCard: {
    width: '100%',
    height: '20%',
    paddingLeft: '1%',
    marginBottom: '3%',
    borderRadius: 20,
    elevation: 5,
  },
  searchContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchAvatar: {
    backgroundColor: 'white',
  },
  searchInput: {
    fontSize: 18,
    marginLeft: '5%',
    height: '100%',
    flex: 1,
    color: 'grey',
    fontWeight: 'bold',
  },
  addButtonSection: { height: '30%', width: '100%', alignItems: 'center' },
  addButton: {
    height: '60%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
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
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    height: 150,
  },
  topCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '40%',
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
  totalWeight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  pContainer: {
    height: '60%',
    flexDirection: 'row',
  },
  leftContainer: {
    height: '100%',
    width: '50%',
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
    fontSize: 18,
    marginLeft: '5%',
    flex: 1,
    color: 'grey',
    fontWeight: 'bold',
  },
  rightContainer: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '20%',
    borderLeftColor: 'lightgrey',
    borderLeftWidth: 1,
  },
  bidText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SearchOrdersPosition;
