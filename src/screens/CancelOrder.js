import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserContext from '../contexts/UserContext';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import OrderContext from '../contexts/OrderContext';

const CancelOrder = ({ navigation, route }) => {
  const { deleteOrder } = useContext(OrderContext);
  const [checked, setChecked] = useState('first');

  const handleCancel = () => {
    deleteOrder(route.params.orderId);
    navigation.pop(2);
  };

  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: 'white',
        width: '100%',
        flex: 1,
      }}
      contentContainerStyle={{
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Text style={styles.mainText}>
        Escríbenos un mensaje. Te responderemos por correo.
      </Text>
      <View style={{ width: '100%' }}>
        <RadioButton.Group
          onValueChange={(newValue) => setChecked(newValue)}
          value={checked}
        >
          <View>
            <RadioButton.Item
              style={{ justifyContent: 'space-between' }}
              label={'El transportador tiene baja calificación'}
              value='first'
            />
          </View>
          <View>
            <RadioButton.Item
              style={{ justifyContent: 'space-between' }}
              label={'No puedo contactar con el transportador'}
              value='second'
            />
          </View>
          <View>
            <RadioButton.Item
              style={{ justifyContent: 'space-between' }}
              label={'El precio no es razonable'}
              value='third'
            />
          </View>
        </RadioButton.Group>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleCancel()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainText: {
    marginVertical: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'grey',
  },

  input: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    fontSize: 18,
    color: 'grey',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 20,
  },
  button: {
    width: 200,
    marginTop: 40,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CancelOrder;
