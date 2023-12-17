import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import {  useFormik } from 'formik'
import {  Link, useNavigate} from 'react-router-dom'
import ApiBaseUrl from '../ApiBaseUrl';
import {Helmet} from "react-helmet";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
export default function PharmacistLogin({savePharmacistData}) {
  const[isLoading,setIsLoading]=useState(false)
  const [passwordShown, setPasswordShown] = useState(false);
  const [ErrMsg, setErrMsg] = useState(null)
  const togglePassword = () => {setPasswordShown(!passwordShown)};
  let navigate = useNavigate()
  async function makePharmacistLogged(values){
    setIsLoading(true)
    setErrMsg(null)
    try {
      let {data} =await axios.post(ApiBaseUrl + 'pharmacists/login',values);
      setIsLoading(false)
      formik.resetForm();
      localStorage.setItem("PharmacistToken",data.token)
      savePharmacistData()
      navigate("/")
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      setErrMsg('Login Failed: Your user Name or password is incorrect')
    }
  }
  let mySchema =Yup.object( {
    username:Yup.string().required("User Name is required"),
    password:Yup.string().required("password is required")
  })
  let formik = useFormik({
  initialValues:{
    username:"",
    password:"",
  },
  validationSchema:mySchema,
  onSubmit:(values)=> makePharmacistLogged(values)
  })
  return <>
  <Helmet>
    <title>
    El7a2ny | Pharmacist Login
    </title>
  </Helmet>
    <div className="container login p-5 w-50 m-auto">
      <h3>Pharmacist LOG IN :</h3>
      <form action=""  onSubmit={formik.handleSubmit} className='bg-muted p-3 rounded shadow-sm'>
        <label htmlFor="username">Pharmacist Name :</label>
        <input type="string" className='mb-2 form-control' name='username' id='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.username && formik.touched.username ?<div className="alert alert-danger">{formik.errors.username}</div>: null}
        <label htmlFor="password">Pharmacist Password :</label>
        <div className="passwordField position-relative">
        <input type={passwordShown ? "text" : "password"} className='mb-2 form-control' name='password' id='password'  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <span onClick={togglePassword} className='togglePassword position-absolute top-0 end-0 me-3 mt-1 cursor-pointer'>{passwordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
        </div>
        {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>: null}
        <Link to={'/PharmacistForgetPassword'} id='forgetPass' className="btn p-0 mb-2 text-primary">Do You Forget Your Password ? </Link>
        <br />
        {ErrMsg ? <div className="Err alert-danger">{ErrMsg}</div> : null }
        {isLoading?
        <button type="button" className='btn btn-primary text-light me-2'><i className=' fa fa-spin fa-spinner'></i></button>
        :<>
        <button type="submit" disabled={!(formik.isValid && formik.dirty)} className='btn btn-primary text-light me-2'>Log in</button>
        </>
      }
      </form>
    </div>
  </>
}