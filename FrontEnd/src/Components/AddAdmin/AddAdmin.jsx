import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import ApiBaseUrl from '../ApiBaseUrl';

export default function AddAdmin() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function addNewAdmin(values){
    setIsLoading(true);
    try {
      let {data} = await axios.post(ApiBaseUrl + 'administrators/add-admin' , values)
      console.log(data);
      setIsLoading(false);
      formik.resetForm();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      password: '',
      username: ''
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required('Password is required'),
      username: Yup.string().required('Username is required')
    }),
    onSubmit: (values) => addNewAdmin(values)
  })
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return <>
    <Helmet>
      <title>Add Admin</title>
    </Helmet>
  <div className="container py-5">
    <form onSubmit={formik.handleSubmit}>
                {/* username input */}
            <label htmlFor="username">New Admin User Name :</label>
          <input
            type="text"
            className="form-control mb-2"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.username && formik.touched.username ? (
            <div className="alert alert-danger">{formik.errors.username}</div>
          ) : null}
                    {/* password input */}
                    <label htmlFor="password">New Admin  Password :</label>
          <div className="passwordField position-relative">
            <input
              type={passwordShown ? 'text' : 'password'}
              className="mb-2 form-control"
              name="password"
              id="password"
              current-password = "true"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i
              className={`fa fa-eye cursor-pointer position-absolute end-0 top-0 me-2 mt-2 ${passwordShown ? '-slash' : ''} passwordToggle`}
              onClick={togglePassword}
            ></i>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

{isLoading ? (
            <button type="button" className="btn btn-success text-light me-2">
              <i className="fa fa-spin fa-spinner"></i>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="btn btn-success text-light me-2"
            >
              Add Admin
            </button>
          )}

    </form>
  </div>
    </>
}