import React, { useContext, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Helmet } from 'react-helmet';
import { Button } from 'primereact/button';
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog } from 'primereact/dialog';
import Loading from '../Loading/Loading';

export default function MyAddresses({ PatientToken }) {
  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };

  const [Addresses, setAddresses] = useState([]);
  const [DisplayNewAddressDialog, setDisplayNewAddressDialog] = useState(false);

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
  
  useEffect(() => {
    if (PatientToken) {
      getAllAddresses();
    }
  }, [PatientToken]);

  const showDialog = () => {
    setDisplayNewAddressDialog(true);
  };

  const hideDialog = () => {
    setDisplayNewAddressDialog(false);
    formik.resetForm();
  };

  const header = (
    <div className="d-flex justify-content-between col-12">
      <div className="row w-100">
        <div className="col-5">
          <div className="tableTitle mt-1">
            <h2 className='text-secondary'>All ADDRESSES :</h2>
          </div>
        </div>
        <div className="col-7 ms-auto">
          <div className="rightHeader d-flex flex-column">
            <div className="addBtn align-self-end me-1">
              <Button label="ADD ADDRESS" icon="pi pi-plus" className="mb-2 rounded" onClick={showDialog} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const addNewAddress = async (val) => {
    try {
      let { data } = await axios.patch(ApiBaseUrl + `patients/add-address`, val, { headers: PatientHeaders });
      console.log(data);
      getAllAddresses();
      hideDialog();
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      address: ''
    },
    validationSchema: Yup.object().shape({
      address: Yup.string().required('address is required'),
    }),
    onSubmit: (values) => addNewAddress(values)
  });

  return (
    <>
      <Helmet>
        My Addresses
      </Helmet>
      {Addresses ? <>
      <div className="container my-3">
        <DataTable value={Addresses} header={header} selectionMode="single" className={`dataTabel mb-4 text-capitalize AllList`} dataKey="id" scrollable scrollHeight="100vh" tableStyle={{ minWidth: "50rem" }} rows={10} responsive="scroll">
          <Column field="address" header="Addresses" />
        </DataTable>
        <Dialog header={"ADD NEW ADDRESS"} className='bg-danger addAdressModal' visible={DisplayNewAddressDialog} onHide={hideDialog} modal>
          <form action="" onSubmit={formik.handleSubmit} className='row text-center bg-dark .addAdressForm'>
            <div className="col-8 offset-2 m-auto bg-light rounded border shadow-sm w-auto p-4 h-100">
              <div className="row">
                <div className="col-12 form-floating">
                  <input type="text" placeholder='address' className="form-control mb-2" id="address" name="address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  <label className='ms-2' htmlFor="address">address</label>
                  {formik.errors.address && formik.touched.address ? (<div className="alert alert-danger">{formik.errors.address}</div>) : null}
                </div>
                <div className="col-12">
                  <Button label='Submit' type='submit' className='rounded' />
                </div>
              </div>
            </div>
          </form>
        </Dialog>
      </div>
      </>:<Loading/>}
    </>
  );
}
