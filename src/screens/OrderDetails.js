import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Linking,
} from 'react-native';
import { Divider, Surface, Avatar } from 'react-native-paper';
import OrderContext from '../contexts/OrderContext';
import UserContext from '../contexts/UserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OrderDetails = ({ navigation }) => {
  const [offer, setOffer] = useState(null);
  const {
    selectedOrder,
    getUserFromOrder,
    userFromOrder,
    makeOffer,
  } = useContext(OrderContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.userType === 'agricultor') {
      getUserFromOrder(
        selectedOrder.offeringUsersID[selectedOrder.offeringUsersID.length - 1]
      );
    } else {
      getUserFromOrder(selectedOrder.userID);
    }
  }, []);

  const handleOffer = () => {
    makeOffer(offer, user);
    navigation.pop(2);
  };

  const renderItems = () => {
    return selectedOrder.products.map((item, index) => {
      return (
        <View
          style={{
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 1,
            height: 70,
            flex: 1,
            marginHorizontal: '5%',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.productText}>{item.product}</Text>
          <Text style={styles.weightText}>{item.weight} Kg</Text>
        </View>
      );
    });
  };

  const handleChat = () => {
    Linking.openURL(
      `http://api.whatsapp.com/send?phone=57${
        userFromOrder.number
      }&text=${'Enviado a traves de AgroTransporte'}`
    );
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <ScrollView style={{ paddingHorizontal: '5%' }} persistentScrollbar>
        <View style={styles.positionSection}>
          <Surface style={styles.positionCard}>
            <View style={styles.positionContainer}>
              <Avatar.Icon
                size={30}
                icon='crosshairs-gps'
                color='grey'
                style={styles.positionAvatar}
              />
              <Text style={styles.positionText}>{selectedOrder.initLoc}</Text>
            </View>
            <Divider />
            <View style={styles.positionContainer}>
              <Avatar.Icon
                size={30}
                icon='map-marker'
                color='grey'
                style={styles.positionAvatar}
              />
              <Text style={styles.positionText}>{selectedOrder.endLoc}</Text>
            </View>
          </Surface>
        </View>
        <View style={styles.recentSection}>
          <View>
            <Text style={{ ...styles.recentText, fontWeight: 'bold' }}>
              PRODUCTOS
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.recentList}
            persistentScrollbar
            nestedScrollEnabled
          >
            {renderItems()}
          </ScrollView>
        </View>
        <Divider />
        <View style={[styles.totalWeightSection, { flexDirection: 'row' }]}>
          <View>
            <Text style={styles.totalWeightText}>
              Peso Total: {selectedOrder.weight} Kg
            </Text>
            <Text style={styles.totalWeightText}>
              Mejor Oferta: {selectedOrder.currentBid} $
            </Text>
          </View>
          <TouchableOpacity style={styles.optionTouch} onPress={handleChat}>
            <Surface>
              <Avatar.Icon
                style={{ backgroundColor: 'blue' }}
                size={60}
                icon='chat'
                color='white'
              />
            </Surface>
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={styles.conductorSection}>
          <Text style={styles.conductorText}>
            {user.userType === 'agricultor' ? 'CONDUCTOR' : 'AGRICULTOR'}
          </Text>
          <Surface style={styles.conductorCard}>
            <Avatar.Image size={48} source={{ uri: userFromOrder.photo }} />
            <View style={styles.conductorInfoContainer}>
              <Text style={{ ...styles.conductorInfoText, fontWeight: 'bold' }}>
                {userFromOrder.name}
              </Text>
              <Text style={styles.conductorInfoText}>
                {userFromOrder.email}
              </Text>
            </View>
          </Surface>
        </View>
        {user.userType === 'transportador' && (
          <View style={styles.finalSection}>
            <View style={styles.myBid}>
              <TextInput
                style={styles.myBidInput}
                keyboardType='numeric'
                defaultValue={offer}
                value={offer}
                onChange={(e) => setOffer(e.nativeEvent.text)}
              />
            </View>
            <TouchableOpacity style={styles.bidButton} onPress={handleOffer}>
              <Text style={styles.bidButtonText}>Ofertar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  positionSection: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  positionCard: {
    width: '90%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
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
  recentSection: {
    flexDirection: 'column',
    paddingHorizontal: '5%',
    height: 200,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flex: 1,
  },
  recentList: {
    width: '100%',
    backgroundColor: 'white',
  },
  weightText: { fontSize: 14, color: 'lightgrey' },
  productText: {
    fontSize: 16,
    color: 'grey',
  },
  recentText: { fontSize: 16, color: 'grey' },
  totalWeightSection: {
    backgroundColor: 'white',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
  },

  totalWeightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  conductorSection: {
    height: 150,
    paddingTop: '5%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  conductorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  conductorCard: {
    elevation: 5,
    borderRadius: 20,
    height: '70%',
    marginTop: '2%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  conductorInfoContainer: {
    paddingLeft: '5%',
  },
  conductorInfoText: {
    fontSize: 16,
    color: 'grey',
  },
  finalSection: {
    height: 200,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  myBid: {
    height: 70,
    width: 300,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    borderRadius: 20,
  },
  myBidInput: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    borderRadius: 20,
    backgroundColor: '#0000',
  },
  bidButton: {
    height: 50,
    width: 200,
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  bidButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default OrderDetails;
