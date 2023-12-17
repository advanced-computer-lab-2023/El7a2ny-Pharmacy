import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import {  useFormik } from 'formik'
import {  Link, useNavigate} from 'react-router-dom'
import {Helmet} from "react-helmet";
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'

export default function PatientLogin({savePatientData}) {
  const[isLoading,setIsLoading]=useState(false)
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  let navigate = useNavigate()
  async function makePatientLogged(values){
    setIsLoading(true)
    let {data} =await axios.post('http://localhost:4000/api/patients/login',values).catch((err)=>{
      setIsLoading(false)
  })
    if (data) {
      formik.resetForm();
      setIsLoading(false)
      localStorage.setItem("PatientToken",data.token)
      savePatientData()
      navigate("/")
    }
    setIsLoading(false)
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
  onSubmit:(values)=> makePatientLogged(values)
  })
  return <>
  <Helmet>
    <title>
    El7a2ny | Patient Login
    </title>
  </Helmet>
    <div className="container login w-75 m-auto bg-light my-5 rounded border shadow-sm w-auto p-4">
      
      <form action=""  onSubmit={formik.handleSubmit}>
      <h2 className='text-muted'>Patient LOG IN :</h2>
        <div className="row">
          <div className="col-md-6  form-floating">
            <input type="string"  placeholder='Username' className='mb-2 form-control' name='username' id='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <label className='ms-2' htmlFor="username">Username</label>
            {formik.errors.username && formik.touched.username ?<div className="alert alert-danger">{formik.errors.username}</div>: null}
          </div>
          <div className="col-md-6  ">
            <div className="passwordField position-relative form-floating">
              <input type={passwordShown ? "text" : "password"} placeholder='Password' className='mb-2 form-control' name='password' id='password'  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              <span onClick={togglePassword} className='togglePassword position-absolute top-0 end-0 me-3 mt-3 cursor-pointer'>{passwordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
              <label htmlFor="password">Password</label>
            </div>
            {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>: null}
          </div>
        </div>
        <div className="btns col-md-2 col-3 mt-2">
          {isLoading?
          <button type="button" className='btn bg-main text-light me-2 w-100'><i className=' fa fa-spin fa-spinner'></i></button>
          :<>
          <button type="submit" disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light me-2 w-100'>Log in</button>
          </>
          }
        </div>
        <Link id='forgetPass' className="btn p-0 mb-2 text-main">Do You Forget Your Password ? </Link>

      </form>
    </div>
  </>
}