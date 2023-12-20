import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import {  useFormik } from 'formik'
import {  useNavigate} from 'react-router-dom'
import {Helmet} from "react-helmet";
import ApiBaseUrl from '../ApiBaseUrl';

export default function PatientForgetPassword() {
  const[isLoading,setIsLoading]=useState(false);
  const [ErrMsg, setErrMsg] = useState()

  let navigate = useNavigate()

  async function sendData(values) {
    setIsLoading(true)
    try {
      let { data } = await axios.post(ApiBaseUrl + 'patients/OTP-email', values);
      setIsLoading(false)
      navigate(`/PatientOtpLogin`)
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
      <title>Patient Forget Password</title>
    </Helmet>
    <div className="container my-5 login w-75">
      <form action=""  onSubmit={formik.handleSubmit} className='row text-center'>
      <div className="col-8 offset-2 m-auto bg-light rounded border shadow-sm w-auto p-4 h-100">
      <h2 className='text-muted'>Patient</h2>
      <div className="row">
          <div className="col-12  form-floating">
            <input type="string"  placeholder='Username' className='mb-2 form-control' name='username' id='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <label className='ms-2' htmlFor="username">Username</label>
            {formik.errors.username && formik.touched.username ?<div className="alert alert-danger">{formik.errors.username}</div>: null}
          </div>
        </div>
        <div className="col-12">
        {ErrMsg ? <div className="Err alert alert-danger">{ErrMsg}</div> : null }
        </div>
        <div className="btns col-12 my-2">
          {isLoading?
          <button type="button" className='btn bg-main text-light me-2 w-100'><i className=' fa fa-spin fa-spinner'></i></button>
          :<>
          <button type="submit" disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light me-2 w-100 d-flex align-items-center justify-content-center'><span className='me-2'>Get OTP</span></button>
          </>
          }
        </div>
      </div>
      </form>
    </div>
    </>
}
