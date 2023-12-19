import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';

export default function Checkout({ PatientToken }) {
  let { onlinePayment, cartId } = useContext(cartContext);
  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };

  const [Addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (PatientToken) {
      getAllAddresses();
    }
  }, [PatientToken]);

  async function handleSubmit(values) {
    // Check if an address is selected before placing an order
    if (!values.address) {
      alert('Please select an address before placing the order.');
      return;
    }else if (values.paymentMethod === 'wallet' || values.paymentMethod === 'cash') {
      placeOrder(values)
    }
    try {
      let response = await onlinePayment(cartId, values);
      if (response?.data?.status === 'success') {
        window.location.href = response.data.session.url;
      }
    } catch (error) {
      console.error(error);
    }
  }

  let formik = useFormik({
    initialValues: {
      address: '', // Use this field to store the selected address
      paymentMethod: 'wallet', // Default to 'wallet'
    },
    onSubmit: handleSubmit,
  });

  const placeOrder = async (val) => {
    try {
      let { data } = await axios.post(ApiBaseUrl + `patients/place-order`, val, { headers: PatientHeaders });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAddresses = async () => {
    try {
      let { data } = await axios.get(ApiBaseUrl + `patients/my-addresses`, { headers: PatientHeaders });
      // Transform the array of strings into an array of objects
      const addressesArray = data.map((address, index) => ({ id: index + 1, address }));
      setAddresses(addressesArray);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="w-50 p-5 mx-auto bg-light my-4 rounded border shadow-sm">
        <form onSubmit={formik.handleSubmit}>

          <label>Delivery Address:</label>
          {Addresses.map((addressOption) => (
            <div className="form-check" key={addressOption.id}>
              <input
                className="form-check-input"
                type="radio"
                name="address"
                id={`address${addressOption.id}`}
                value={addressOption.address}
                checked={formik.values.address === addressOption.address}
                onChange={() => formik.setFieldValue('address', addressOption.address)}
              />
              <label className="form-check-label" htmlFor={`address${addressOption.id}`}>
                {addressOption.address}
              </label>
            </div>
          ))}
<hr />
<label>Choose Payment Method:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="cash"
              checked={formik.values.paymentMethod === 'cash'}
              onChange={() => formik.setFieldValue('paymentMethod', 'cash')}
            />
            <label className="form-check-label" htmlFor="cash">
              Cash on Delivery
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="wallet"
              checked={formik.values.paymentMethod === 'wallet'}
              onChange={() => formik.setFieldValue('paymentMethod', 'wallet')}
            />
            <label className="form-check-label" htmlFor="wallet">
              Pay by Wallet
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="online"
              checked={formik.values.paymentMethod === 'online'}
              onChange={() => formik.setFieldValue('paymentMethod', 'online')}
            />
            <label className="form-check-label" htmlFor="online">
              Complete Payment Online
            </label>
          </div>

          <hr />
          <button type="submit" className="btn bg-main text-light w-100">
            Place Order
          </button>
        </form>
      </div>
    </>
  );
}
