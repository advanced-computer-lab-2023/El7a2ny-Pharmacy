import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';

export default function Checkout({ PatientToken }) {
  let { onlinePayment, cartId , PlaceOrder } = useContext(cartContext);
  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };

  const [Addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (PatientToken) {
      getAllAddresses();
    }
  }, [PatientToken]);

  async function handleSubmit(values) {
    if (!values.address) {
      alert('Please select an address before placing the order.');
      return;
    }else if (values.payment_method === 'wallet' || values.payment_method === 'cash') {
      PlaceOrder(values)
      formik.resetForm()
    }else if (values.payment_method === 'online') {
      try {
        let response = await onlinePayment(cartId, values);
        if (response?.data?.status === 'success') {
          window.location.href = response.data.session.url;
        }
      } catch (error) {
        console.error(error);
      }  
    }
  }

  let formik = useFormik({
    initialValues: {
      address: '', // Use this field to store the selected address
      payment_method: '', // Default to 'wallet'
    },
    onSubmit: handleSubmit,
  });

  const getAllAddresses = async () => {
    try {
      let { data } = await axios.get(ApiBaseUrl + `patients/my-addresses`, { headers: PatientHeaders });
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
              name="payment_method"
              id="cash"
              checked={formik.values.payment_method === 'cash'}
              onChange={() => formik.setFieldValue('payment_method', 'cash')}
            />
            <label className="form-check-label" htmlFor="cash">
              Cash on Delivery
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_method"
              id="wallet"
              checked={formik.values.payment_method === 'wallet'}
              onChange={() => formik.setFieldValue('payment_method', 'wallet')}
            />
            <label className="form-check-label" htmlFor="wallet">
              Pay by Wallet
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_method"
              id="online"
              checked={formik.values.payment_method === 'online'}
              onChange={() => formik.setFieldValue('payment_method', 'online')}
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
