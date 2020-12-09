import React, { useState, useEffect } from 'react';
import AgroTransporte from '../apis/AgroTransporteApi';

const OrderContext = React.createContext({
  temporaryOrder: {},
  selectedOrder: {},
  ordersList: [],
  loading: true,
  searchOrdersList: [],
  userFromOrder: {},
});

export const OrderProvider = ({ children }) => {
  const [temporaryOrder, setTemporaryOrder] = useState({});
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [searchOrdersList, setSearchOrdersList] = useState([]);
  const [userFromOrder, setUserFromOrder] = useState([]);

  const modifyTemporaryOrder = (order) => {
    setTemporaryOrder(order);
  };

  const postOrder = async (order, user) => {
    const totalWeight = order.products.reduce(
      (acc, current) => acc + parseInt(current.weight),
      0
    );

    const finalOrder = {
      initLoc: order.initLoc,
      endLoc: order.endLoc,
      products: order.products,
      weight: totalWeight,
      timeLeft: order.duration,
      currentBid: order.price,
    };
    const res = await AgroTransporte.post(
      `/agroapi/create_order/${user._id}`,
      finalOrder
    );
  };

  const selectOrder = async (id) => {
    const { data } = await AgroTransporte.get(`/agroapi/orders_details/${id}`);
    setSelectedOrder(data.order);
  };

  const getOrdersList = async (user) => {
    const { data } = await AgroTransporte.get(
      `/agroapi/orders_agricultor/${user._id}`
    );
    setOrdersList(data);
    setLoading(false);
  };

  const getOrdersOfferedList = async (user) => {
    const { data } = await AgroTransporte.get(
      `/agroapi/orders_transportador/${user._id}`
    );
    setOrdersList(data);
    setLoading(false);
  };

  const searchOrders = async (initLoc, endLoc, user) => {
    const search = {
      initLoc,
      endLoc,
    };
    const { data } = await AgroTransporte.post(
      `/agroapi/search_orders_transportador/${user._id}`,
      search
    );
    if (data.message) {
      setSearchOrdersList([]);
    } else {
      setSearchOrdersList(data);
    }
  };

  const getUserFromOrder = async (id) => {
    const { data } = await AgroTransporte.get(`/agroapi/current_user/${id}`);
    setUserFromOrder(data);
  };

  const makeOffer = async (offer, user) => {
    const { data } = await AgroTransporte.put(
      `/agroapi/offer_order/${selectedOrder._id}`,
      {
        offeringUserID: user._id,
        offeredBid: offer,
      }
    );
    console.log(data);
  };

  const deleteOrder = async (orderId) => {
    const { data } = await AgroTransporte.delete(
      `/agroapi/delete_order/${orderId}`
    );
    console.log(data);
  };

  return (
    <OrderContext.Provider
      value={{
        temporaryOrder,
        selectedOrder,
        setSelectedOrder,
        ordersList,
        loading,
        modifyTemporaryOrder,
        postOrder,
        getOrdersList,
        getOrdersOfferedList,
        searchOrders,
        searchOrdersList,
        userFromOrder,
        getUserFromOrder,
        makeOffer,
        selectOrder,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
