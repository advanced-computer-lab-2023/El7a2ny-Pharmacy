import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function Checkout() {
  let { onlinePayment, cartId } = useContext(cartContext);

  async function handleSubmit(values) {
    let response = await onlinePayment(cartId, values);
    if (response?.data?.status === 'success') {
      window.location.href = response.data.session.url;
    }
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      address: '',
      phone: '',
      paymentMethod: 'wallet', // Default to 'wallet'
    },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="w-50 p-5 mx-auto bg-light">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Full Name :</label>
          <input
            type="text"
            className="form-control mb-3"
            value={formik.values.details}
            onChange={formik.handleChange}
            name="details"
            id="details"
          />
          <label htmlFor="phone">phone :</label>
          <input
            type="tel"
            className="form-control mb-3"
            value={formik.values.phone}
            onChange={formik.handleChange}
            name="phone"
            id="phone"
          />
          <label htmlFor="address">Address :</label>
          <input
            type="text"
            className="form-control mb-3"
            value={formik.values.address}
            onChange={formik.handleChange}
            name="address"
            id="address"
          />

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
          <button type="submit" className="btn border-main w-100">
            Place Order
          </button>
        </form>
      </div>
    </>
  );
}
