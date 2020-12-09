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
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

import OrderContext from '../contexts/OrderContext';
import UserContext from '../contexts/UserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OrderDetails from './OrderDetails';

const PayOrder = ({ navigation, route }) => {
  const [params, setParams] = useState({
    number: '',
    expMonth: 0,
    expYear: 0,
    cvc: '',
    currency: 'cop',
  });

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    Stripe.setOptionsAsync({
      publishableKey: 'pk_test_yIeR58jW6RHraV9JaMrwBCg700t4DAzjlV', // Your key
    });
  }, []);

  const doPayment = async () => {
    console.log('errors', errors);
    if (!errors && params.number) {
      let temp = { ...params };

      temp.expMonth = parseInt(params.expMonth);
      temp.expYear = parseInt(params.expYear);

      const token = await Stripe.createTokenWithCardAsync(temp);
      onPaymentSuccess(token);
    } else {
      console.log('errors', errors);
    }
  };

  useEffect(() => {
    doPayment();
  }, [errors]);

  const onPaymentSuccess = async (token) => {
    const res = await AgroTransporte.post(
      `/agroapi/stripe_charge/${route.params.orderId}`,
      {
        token: token,
        amount: Number(params.amount + '00'),
      }
    );
    if (res.data.bill !== 'None') {
      navigation.pop();
    }
  };

  const checkErrors = () => {
    const { number, expMonth, expYear, cvc, amount } = params;
    let temp = null;
    if (!number || number.length < 16) {
      temp = { ...temp, number: 'Incorrect card number.' };
    }
    if (!expMonth || expMonth.length < 2) {
      temp = { ...temp, expMonth: 'Incorrect month.' };
    }
    if (!expYear || expYear.length < 2 || expYear < 21) {
      temp = { ...temp, expYear: 'Incorrect year.' };
    }
    if (!cvc || cvc.length < 3) {
      temp = { ...temp, cvc: 'Incorrect cvc.' };
    }
    setErrors(temp);

    if (!errors) {
      doPayment();
    }
  };

  const handleChange = (target, text) => {
    setParams({ ...params, [target]: text });
  };

  const renderInput = (label, target, maxLenght, style) => {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.weightLabel}>{label}</Text>
        <TextInput
          style={[
            styles.weightInput,
            errors && errors[target] ? { borderColor: 'red' } : {},
          ]}
          value={target === 'amount' ? route.params.price + '' : params[target]}
          onChange={(e) => handleChange(target, e.nativeEvent.text)}
          keyboardType='numeric'
          maxLength={maxLenght}
          editable={target === 'amount' ? false : true}
        />
        {errors && errors[target] && (
          <Text style={{ color: 'red' }}>{errors[target]}</Text>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={styles.cardContainer}>
        <View style={styles.weightContainer}>
          {renderInput('Card number:', 'number', 16)}
          <View
            style={[
              styles.container,
              { flexDirection: 'row', justifyContent: 'space-between' },
            ]}
          >
            {renderInput('Month:', 'expMonth', 2, {
              height: '100%',
              width: '40%',
            })}
            {renderInput('Year:', 'expYear', 2, {
              height: '100%',
              width: '40%',
            })}
          </View>

          {renderInput('CVC:', 'cvc', 3)}
          {renderInput('Precio:', 'amount', 16)}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            checkErrors();
          }}
        >
          <Text style={styles.googleText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', height: '20%' },
  cardContainer: {
    height: '90%',
    width: '80%',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 20,
  },
  weightContainer: {
    height: '80%',
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
    height: '40%',
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

export default PayOrder;
