import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import {  useFormik } from 'formik'
import ApiBaseUrl from '../ApiBaseUrl';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function AdminForgetPassword({AdminToken}) {
  let AdminHeaders = { 'Authorization': `Bearer ${AdminToken}` };
  const[isLoading,setIsLoading]=useState(false)
  let navigate = useNavigate()

  async function sendData(values) {
    setIsLoading(true)
    try {
      
      let { data } = await axios.post(ApiBaseUrl + 'administrators/OTP-email', values, {
        headers: AdminHeaders,
      });
      setIsLoading(false)
      console.log(data);
      navigate(`AdminOtpLogin`)

    } catch (error) {
      console.error('Error during API call:', error);
      setIsLoading(false)
    }
    
  }
  
let validateschema = Yup.object({
  username:Yup.string().required("User Name is required")
})

  let formik = useFormik({
    initialValues: {
      username: ""
    } , validationSchema : validateschema
    , onSubmit:(values)=>sendData(values)
  })
  return <>
    <Helmet>
      <title>Admin Forget Password</title>
    </Helmet>
    <div className="container">
        <div className="col-md-9 mx-auto mt-5">
        <h2>Forget Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <label className='mt-4' htmlFor="username">Username : </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} name = 'username' type = 'text' id = 'username' className='form-control w-100 mx-auto mt-1' placeholder='enter Username' />
          {formik.errors.username && formik.touched.username ?<div className="alert alert-danger">{formik.errors.username}</div>: null}
          {isLoading?
            <button type="button" className='btn btn-primary text-light mt-2'><i className=' fa fa-spin fa-spinner'></i></button>
          :<>
            <button type='submit' className=' mt-2 btn btn-primary'>Send</button></>}
        </form>
      </div>
    </div>
    </>
}
