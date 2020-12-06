import React, { useContext, useEffect, useState } from 'react';
import AgroTransporte from '../apis/AgroTransporteApi';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Linking,
} from 'react-native';
//import StripeCheckout from 'expo-stripe-checkout';
import { Button } from 'react-native-paper';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

import OrderContext from '../contexts/OrderContext';
import UserContext from '../contexts/UserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PaymentOptions = ({ navigation }) => {
  const [params, setParams] = useState({
    number: '',
    expMonth: 0,
    expYear: 0,
    cvc: '',
    currency: 'cop',
  });

  const onPaymentSuccess = async (token) => {
    const res = await AgroTransporte.post(`/agroapi/stripe_charge`, {
      token: token,
      amount: params.amount,
    });
    console.log(res.data);
  };

  const handlePayment = async () => {
    console.log(params);
    const token = await Stripe.createTokenWithCardAsync(params);
    console.log(token);
    onPaymentSuccess(token);
  };

  useEffect(() => {
    Stripe.setOptionsAsync({
      publishableKey: 'pk_test_yIeR58jW6RHraV9JaMrwBCg700t4DAzjlV', // Your key
    });
  }, []);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <View style={styles.weightContainer}>
        <View style={styles.container}>
          <Text style={styles.weightLabel}>Card number:</Text>
          <TextInput
            style={styles.weightInput}
            value={params.number}
            onChange={(e) =>
              setParams({ ...params, number: e.nativeEvent.text })
            }
            keyboardType='numeric'
          />
        </View>
        <View
          style={[
            styles.container,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <View style={{ height: '50%', width: '40%' }}>
            <Text style={styles.weightLabel}>Month:</Text>
            <TextInput
              style={[styles.weightInput, { height: '100%', width: '100%' }]}
              value={params.month}
              onChange={(e) =>
                setParams({ ...params, expMonth: Number(e.nativeEvent.text) })
              }
              keyboardType='numeric'
            />
          </View>
          <View style={{ height: '50%', width: '40%' }}>
            <Text style={styles.weightLabel}>Year:</Text>
            <TextInput
              style={[styles.weightInput, { height: '100%', width: '100%' }]}
              value={params.year}
              onChange={(e) =>
                setParams({ ...params, expYear: Number(e.nativeEvent.text) })
              }
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.weightLabel}>CVC:</Text>
          <TextInput
            style={styles.weightInput}
            value={params.cvc}
            onChange={(e) => setParams({ ...params, cvc: e.nativeEvent.text })}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.weightLabel}>Precio</Text>
          <TextInput
            style={styles.weightInput}
            value={params.amount}
            onChange={(e) =>
              setParams({ ...params, amount: e.nativeEvent.text })
            }
            keyboardType='numeric'
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handlePayment()}>
        <Text style={styles.googleText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', height: '20%' },
  weightContainer: {
    height: '70%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  weightLabel: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  weightInput: {
    width: '100%',
    height: '50%',
    fontSize: 18,
    paddingLeft: '5%',
    color: 'grey',
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
  },
  googleText: { fontSize: 25, fontWeight: 'bold', color: '#eee' },
  button: {
    backgroundColor: '#1152fdee',
    height: '30%',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 10,
  },
});

export default PaymentOptions;
