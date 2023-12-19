import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import ApiBaseUrl from '../ApiBaseUrl';

export default function AddAdmin({AdminToken}) {
  let AdminHeaders = { 'Authorization': `Bearer ${AdminToken}` };
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function addNewAdmin(values){
    setIsLoading(true);
    try {
      let {data} = await axios.post(ApiBaseUrl +'administrators/add-admin' ,
        values ,
        { headers: AdminHeaders })
      setIsLoading(false);
      formik.resetForm();
    } catch (error) {
      setIsLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      password: '',
      username: '',
      email : ''
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().min(8).required('Password is required "pasword must contain lowercase letters, uppercase letters, symbols, numbers"'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      username: Yup.string().required('Username is required')
    }),
    onSubmit: (values) => addNewAdmin(values)
  })
  const togglePassword = () => {setPasswordShown(!passwordShown)};

  return <>
    <Helmet>
      <title>Add Admin</title>
    </Helmet>
    <div className="container w-50 mx-auto mt-4 border rounded shadow-sm p-4 bg-light">
    <form onSubmit={formik.handleSubmit}>
      <h3 className='text-muted'>New Admin Form</h3>
                {/* username input */}
          <label htmlFor="username">Username :</label>
          <input type="text" className="form-control mb-2" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.username && formik.touched.username ? ( <div className="alert alert-danger">{formik.errors.username}</div> ) : null}
                {/* email input */}
          <label htmlFor="email">Email :</label>
          <input type="email"  className="form-control mb-2" id="email" name="email" value={formik.values.email} onChange={formik.handleChange}  onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ? ( <div className="alert alert-danger">{formik.errors.email}</div> ) : null}
                  {/* password input */}
          <label htmlFor="password">Password :</label>
          <div className="passwordField position-relative">
            <input type={passwordShown ? 'text' : 'password'} className="mb-2 form-control" name="password" id="password" current-password = "true" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <i className={`fa  cursor-pointer position-absolute end-0 top-0 me-2 mt-2  ${passwordShown ? 'fa-eye-slash text-danger' : "fa-eye"} passwordToggle`} onClick={togglePassword} ></i>
          </div>
          {formik.errors.password && formik.touched.password ? ( <div className="alert alert-danger">{formik.errors.password}</div> ) : null}
          <div className="btns">
          {isLoading ? (
            <button type="button" className="btn bg-main ms-auto text-light me-2">
              <i className="fa fa-spin fa-spinner"></i>
            </button>
          ) : (
            <button type="submit"disabled={!(formik.isValid && formik.dirty)}className="btn ms-auto bg-main text-light">
              Add Admin
            </button>
          )}

          </div>
    </form>
    </div>
    </>
}
