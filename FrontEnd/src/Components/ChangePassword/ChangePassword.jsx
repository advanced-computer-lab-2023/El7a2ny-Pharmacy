import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import {  useFormik } from 'formik'
import {  Link, useNavigate} from 'react-router-dom'
import {Helmet} from "react-helmet";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
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
    console.log("update");
    setIsLoading(true)
    try {
      await axios.patch(  `http://localhost:4000/api/${role}/change-password` , val , {headers : header});
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
    <div className="container">
      <h4 className='Text-muted mb-3'>Change Your Password : </h4>
      <div className="container">
      <form action=""  onSubmit={formik.handleSubmit} className='bg-muted p-3 rounded shadow-sm'>
      <label htmlFor="password">Doctor Password :</label>
        <div className="passwordField position-relative">
        <input type={passwordShown ? "text" : "password"} className='mb-2 form-control' name='password' id='password'  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <span onClick={togglePassword} className='togglePassword position-absolute top-0 end-0 me-3 mt-1 cursor-pointer'>{passwordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
        </div>
        {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>: null}
        {isLoading?
        <button type="button" className='btn btn-primary text-light me-2'><i className=' fa fa-spin fa-spinner'></i></button>
        :<>
        <button type="submit" disabled={!(formik.isValid && formik.dirty)} className='btn btn-primary text-light me-2'>Log in</button>
        </>
      }
      </form>
      </div>
    </div>
    </>
}
