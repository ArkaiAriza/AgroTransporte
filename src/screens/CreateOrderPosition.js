import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Divider, Surface, Avatar } from 'react-native-paper';
import OrderContext from '../contexts/OrderContext';
import UserContext from '../contexts/UserContext';

const CreateOrderPosition = ({ navigation }) => {
  const [initLoc, setInitLoc] = useState('');
  const [endLoc, setEndLoc] = useState('');
  const { temporaryOrder, modifyTemporaryOrder } = useContext(OrderContext);
  const { user } = useContext(UserContext);

  const renderItems = () => {
    return user.recentLocations.map((item, index) => {
      return (
        <View style={styles.recent} key={item + index}>
          <Text style={styles.recentText}>{item}</Text>
        </View>
      );
    });
  };

  const handleContinue = () => {
    navigation.push('CreateOrderContent');
    modifyTemporaryOrder({ initLoc, endLoc, products: {} });
  };

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <View style={styles.positionSection}>
        <Surface style={styles.positionCard}>
          <View style={styles.positionContainer}>
            <Avatar.Icon
              size={30}
              icon='crosshairs-gps'
              color='grey'
              style={styles.positionAvatar}
            />
            <TextInput
              style={styles.positionInput}
              value={initLoc}
              onChange={(e) => setInitLoc(e.nativeEvent.text)}
            />
          </View>
          <Divider />
          <View style={styles.positionContainer}>
            <Avatar.Icon
              size={30}
              icon='map-marker'
              color='grey'
              style={styles.positionAvatar}
            />
            <TextInput
              style={styles.positionInput}
              value={endLoc}
              onChange={(e) => setEndLoc(e.nativeEvent.text)}
            />
          </View>
        </Surface>
      </View>
      <View style={styles.recentSection}>
        <View>
          <Text style={{ ...styles.recentText, fontWeight: 'bold' }}>
            RECIENTES
          </Text>
        </View>
        <View style={styles.recentList}>{renderItems()}</View>
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  positionSection: {
    height: '25%',
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
  positionInput: {
    fontSize: 18,
    marginLeft: '5%',
    height: '100%',
    flex: 1,
    color: 'grey',
    fontWeight: 'bold',
  },
  recentSection: {
    flexDirection: 'column',
    paddingHorizontal: '5%',
    height: '55%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  recentList: {
    width: '100%',
    paddingHorizontal: '10%',
    paddingBottom: 20,
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  recent: {
    width: '100%',
    height: '25%',
    paddingTop: '2%',
    justifyContent: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  recentText: { fontSize: 18, color: 'grey' },
  buttonSection: {
    backgroundColor: 'white',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: '50%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateOrderPosition;
