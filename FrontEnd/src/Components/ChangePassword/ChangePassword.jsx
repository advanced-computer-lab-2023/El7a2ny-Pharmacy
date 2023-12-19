import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import {  useFormik } from 'formik'
import {   useNavigate} from 'react-router-dom'
import {Helmet} from "react-helmet";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import ApiBaseUrl from '../ApiBaseUrl'

export default function ChangePassword({ DrToken , AdminToken , PatientToken }) {
  let drHeaders = { 'Authorization': `Bearer ${DrToken}` };
  let adminHeaders = { 'Authorization': `Bearer ${AdminToken}` };
  let patientHeaders = { 'Authorization': `Bearer ${PatientToken}` };
  const[isLoading,setIsLoading]=useState(false)
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  let navigate = useNavigate();
  function handleUpdateRole(val){
    switch (DrToken || AdminToken || PatientToken) {
      case DrToken:
        updatePassword('doctors' , val , drHeaders)
        break;
        case AdminToken:
          updatePassword('administrators' , val , adminHeaders)
        break;
        case PatientToken:
          updatePassword('patients' , val , patientHeaders) 
        break;
      default:
        break;
    }
  }
  async function updatePassword(role , val , header) {
    setIsLoading(true)
    try {
      await axios.patch(ApiBaseUrl + `${role}/change-password` , val , {headers : header});
      console.log("done"); 
      formik.resetForm()
      setIsLoading(false) 
      navigate('/')
    } catch (error) {
      console.error(error)
      setIsLoading(false) 
    }
  }
  let mySchema =Yup.object( {
    password:Yup.string().required("password is required")
  })
  let formik = useFormik({
  initialValues:{
    password:"",
  },
  validationSchema:mySchema,
  onSubmit:(values)=> handleUpdateRole(values)
  })

  return <>
    <Helmet>
      <title>Change Password</title>
    </Helmet>
      
      <div className="container mt-4 w-50">
      <form action=""  onSubmit={formik.handleSubmit} className='row text-center '>
      <div className="col-8 offset-2 m-auto bg-light my-5 rounded border shadow-sm w-auto p-4">
      <h4 className='text-muted mb-3'>Change Your Password </h4>
      <div className="row">
      <div className="col-12">
        <div className="passwordField position-relative form-floating">
        <input type={passwordShown ? "text" : "password"} placeholder='New Password' className='mb-2 form-control' name='password' id='password'  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <span onClick={togglePassword} className='togglePassword position-absolute top-0 end-0 me-3 mt-1 cursor-pointer mt-3'>{passwordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
        <label htmlFor="password">New Password </label>
        </div>
        {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>: null}
        </div>
        <div className="col-12">
        {isLoading?
        <button type="button" className='btn btn-primary text-light me-2'><i className=' fa fa-spin fa-spinner'></i></button>
        :<>
        <button type="submit" disabled={!(formik.isValid && formik.dirty)} className='btn btn-primary text-light me-2'>Change</button>
        </>
      }
      </div>
      </div>
      </div>
      </form>
      </div>
    </>
}
