import React, { useContext, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { cartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Icon } from 'react-icons-kit';
import {plus} from 'react-icons-kit/feather/plus'
import { Button } from 'primereact/button';
import {minus} from 'react-icons-kit/feather/minus'

export default function Cart({ PatientToken }) {
  let { getLoggedUserCart, removeItem, updateProductCount, setNumbOfCartItems } = useContext(cartContext);
  const [cartDetails, setCartDetails] = useState();
  const [btnLoading, setBtnLoading] = useState(false);
  const [TotalPrice, setTotalPrice] = useState();

  async function getCart() {
    let response = await getLoggedUserCart();
    if (response?.status === 200) {
      setCartDetails(response.data.medicine_list);
      setTotalPrice(response.data.total);
    } else {
      setCartDetails(response.message);
    }
  }

  async function deleteItem(productId) {
    setBtnLoading(true);
    try {
      let response = await removeItem(productId);
      setNumbOfCartItems(response.data.medicine_list.length);
      getCart();
    } catch (error) {
      console.error(error);
    }
    toast.success('Product Removed', {
      className: 'first-z mt-5 bg-main-light text-danger ',
      duration: 2000,
    });

    setBtnLoading(false);
  }

  async function updateProductQuantity(productId, quantity) {
    setBtnLoading(true);
    if (quantity <= 0) {
      deleteItem(productId)
    }else{
    try {
      let response = await updateProductCount(productId, quantity);
      console.log(response);
      toast.success('Product Count Updated', {
        className: 'first-z mt-5 bg-main-light text-main ',
        duration: 2000,
      });
      getCart();
      setBtnLoading(false);
    } catch (error) {
      console.error(error);
      setBtnLoading(false);
    }
  }
  }

  useEffect(() => {
    if (PatientToken) {
      getCart();
    }
  }, [PatientToken]);

  const columns = [
    { field: 'medicine.name', header: 'Product Name' },
    { field: 'medicine.price', header: 'Price' },
    { field: 'quantity', header: 'Quantity' },
  ];

  return (
    <>
      <Helmet>
        <title>Cart Details</title>
      </Helmet>
      {cartDetails ? (
        <div className="container bg-light my-4 p-4 position-relative shadow-sm border rounded">
          {btnLoading ? (
            <div className="overlayLoading text-main position-absolute h-100 top-0 d-flex align-items-center justify-content-center left-0 w-100 bg-overlay">
              <i className="text-main fa fa-spin fa-spinner fs-1"></i>
            </div>
          ) : null}
          <h3>Shopping Cart</h3>
          {cartDetails ? (
            <>
              <h6 className="text-main">Total : {TotalPrice} EGP</h6>
            </>
          ) : (
            <h3 className="text-main h6">Your Cart IS Empty</h3>
          )}
          {cartDetails ? (
            <DataTable value={cartDetails}selectionMode="single" className={`dataTabel mb-4 text-capitalize AllList`} dataKey="_id" scrollable scrollHeight="100vh" tableStyle={{ minWidth: "50rem" }} rows={10} responsive="scroll">
              {columns.map((col) => (
                <Column key={col.field} field={col.field} header={col.header} />
              ))}
              <Column header="Update Quantity" body={(rowData)=>(
                <div className='d-flex justify-content-center'>
                  <Button onClick={() => updateProductQuantity(rowData.medicine._id, rowData.quantity + 1)} className="TabelButton text-secondary border-secondary">
                    <Icon icon={plus} className='mb-1' size={20}></Icon>
                  </Button>
                  <Button onClick={() => updateProductQuantity(rowData.medicine._id, rowData.quantity - 1)}  className="TabelButton text-secondary border-secondary">
                  <Icon icon={minus} className='mb-1' size={20}></Icon>
                  </Button>
                </div>
              )}
              />
              <Column header=" " body={(rowData) => (
                    <Button onClick={() => deleteItem(rowData.medicine._id)} className="btn">
                      <i className="fa-regular fa-trash-can text-danger"></i>
                    </Button>
                )}
              />
            </DataTable>
          ) : null}
          {cartDetails ? (
            <button className="btn bg-main btn-sm d-block" >
              <Link className="text-light btn" to={'/Checkout'}>
                Checkout
              </Link>
            </button>
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
