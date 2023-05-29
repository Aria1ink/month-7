import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersFromStore } from "../../utils/tools";
import { connectWS, disconnectWS } from "../../services/actions/ws";
import OrderList from '../../components/OrderList/OrderList';
import { sortByDate } from '../../utils/tools';
import Preloader from '../../components/Preloader/Preloader';
import style from "./orders.module.css";

export default function OrdersPage(){
  const dispatch = useDispatch();
  const orders = useSelector(getUserOrdersFromStore);
  const [sortedOrders, setSortedOrders] = useState([]);

  useEffect( () => {
    dispatch(connectWS('orders'));

    return () => {
      dispatch(disconnectWS('feed'));
    };
  }, []);

  useEffect( () => {
    setSortedOrders(sortByDate(orders));
  }, [orders]);

  if (sortedOrders.length === 0) {
    return(
      <Preloader />
    )
  }
  return (
    <div className={style.container}>
      <OrderList orders={sortedOrders} />
    </div>
  );
}