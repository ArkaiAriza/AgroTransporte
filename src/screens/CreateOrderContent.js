import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Divider, Surface, Avatar } from 'react-native-paper';

const DATA = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'Third Item',
  },
  {
    title: 'Fourth item',
  },
];

const CreateOrderContent = ({ navigation }) => {
  const [product, setProduct] = useState('');
  const [weight, setWeight] = useState('');
  const [items, setItems] = useState([]);

  const renderItems = () => {
    return items.map((item, index) => {
      return (
        <View style={styles.product} key={item.product + index}>
          <TouchableOpacity
            onPress={() =>
              setItems(items.filter((item, cindex) => cindex !== index))
            }
          >
            <Avatar.Icon
              size={36}
              icon='close'
              style={{
                backgroundColor: 'white',
                elevation: 5,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 1,
              flex: 1,
              marginHorizontal: '5%',
            }}
          >
            <Text style={styles.productText}>{item.product}</Text>
            <Text style={styles.weightText}>{item.weight}</Text>
          </View>
        </View>
      );
    });
  };

  const handleContinue = () => {
    navigation.push('CreateOrderContent');
  };

  const handleAdd = () => {
    setItems([...items, { product, weight }]);
  };

  return (
    <View style={{ height: '100%', width: '100%', flex: 1 }}>
      <View style={styles.addSection}>
        <Surface style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Avatar.Icon
              size={30}
              icon='magnify'
              color='grey'
              style={styles.searchAvatar}
            />
            <TextInput
              style={styles.searchInput}
              value={product}
              onChange={(e) => setProduct(e.nativeEvent.text)}
            />
          </View>
        </Surface>
        <View style={styles.weightContainer}>
          <Text style={styles.weightLabel}>Peso:</Text>
          <TextInput
            style={styles.weightInput}
            value={weight}
            onChange={(e) => setWeight(e.nativeEvent.text)}
          />
          <Text style={styles.weightLabel}>Kg</Text>
        </View>
        <View style={styles.addButtonSection}>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.recentSection}>
        <ScrollView contentContainerStyle={styles.recentList}>
          {renderItems()}
        </ScrollView>
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addSection: {
    height: '35%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchCard: {
    width: '90%',
    height: '20%',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
  },
  searchContainer: {
    paddingHorizontal: '5%',
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
  weightContainer: {
    paddingHorizontal: '5%',
    height: '30%',
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightLabel: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  weightInput: {
    height: '70%',
    fontSize: 18,
    marginHorizontal: '5%',
    paddingLeft: '5%',
    flex: 1,
    color: 'grey',
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
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
  recentSection: {
    flexDirection: 'column',
    paddingHorizontal: '5%',
    height: '40%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flex: 1,
  },
  recentList: {
    width: '100%',

    backgroundColor: 'white',
  },
  product: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '2%',
  },
  productText: {
    fontSize: 18,
    color: 'black',
  },
  weightText: { fontSize: 14, color: 'grey' },
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

export default CreateOrderContent;
