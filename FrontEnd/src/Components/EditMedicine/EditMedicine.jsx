import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

export default function EditMedicine() {
  let {id} = useParams()
  const formik = useFormik({
    initialValues: {
      medicinal_use: '',
      sales: '',
      description: '',
      quantity: '',
      price: '',
      pictureUrl: '',
      name: ''
    },
    validationSchema: Yup.object().shape({
      medicinal_use: Yup.string().required('Username is required'),
      sales: Yup.string().required('Username is required'),
      quantity: Yup.string().required('Username is required'),
      price: Yup.string().required('Username is required'),
      pictureUrl: Yup.string().required('Username is required'),
      name: Yup.string().required('Username is required')
    }),
    onSubmit: (values) => EditMedicine(values)
  })
  async function EditMedicine(values){
    try {
      let {data} = await axios.patch(ApiBaseUrl +`medicines/update-medicine/${id}` , values)
      formik.resetForm();
    } catch (error) {
      console.log(error);
    }
  }

  return <>
  <div className="container">
  <h4>Add New Medicine</h4>
      <form onSubmit={formik.handleSubmit}>
                        {/*name input */}
                        <label htmlFor="username">New Medicine name :</label>
          <input type="text" className="form-control mb-2" id="name" name="name"value={formik.values.name}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.name && formik.touched.name ? (<div className="alert alert-danger">{formik.errors.name}</div>) : null}

                {/*pictureUrl input */}
            <label htmlFor="pictureUrl">New Medicine pictureUrl :</label>
          <input type="text" className="form-control mb-2" id="pictureUrl" name="pictureUrl"value={formik.values.pictureUrl}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.pictureUrl && formik.touched.pictureUrl ? (<div className="alert alert-danger">{formik.errors.pictureUrl}</div>) : null}

                {/*medicinal_use input */}
                <label htmlFor="medicinal_use">New Medicine medicinal_use :</label>
          <input type="text" className="form-control mb-2" id="medicinal_use" name="medicinal_use"value={formik.values.medicinal_use}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.medicinal_use && formik.touched.medicinal_use ? (<div className="alert alert-danger">{formik.errors.medicinal_use}</div>) : null}
                
                                {/*description input */}
                                <label htmlFor="description">New Medicine description :</label>
          <input type="text" className="form-control mb-2" id="description" name="description"value={formik.values.description}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.description && formik.touched.description ? (<div className="alert alert-danger">{formik.errors.description}</div>) : null}

                
                {/*sales input */}
                <label htmlFor="sales">New Medicine sales :</label>
          <input type="text" className="form-control mb-2" id="sales" name="sales"value={formik.values.sales}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.sales && formik.touched.sales ? (<div className="alert alert-danger">{formik.errors.sales}</div>) : null}
                {/*quantity input */}
                <label htmlFor="quantity">New Medicine quantity:</label>
          <input type="number" className="form-control mb-2" id="quantity" name="quantity"value={formik.values.quantity}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.quantity && formik.touched.quantity ? (<div className="alert alert-danger">{formik.errors.quantity}</div>) : null}
                {/*price input */}
                <label htmlFor="price">New Medicine price :</label>
          <input type="number" className="form-control mb-2" id="price" name="price"value={formik.values.price}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.price && formik.touched.price ? (<div className="alert alert-danger">{formik.errors.price}</div>) : null}

            <button type="submit" disabled={!(formik.isValid && formik.dirty)}className="btn btn-success text-light me-2">
              Add Mdicine
            </button>

    </form>

  </div>
  </>
}
