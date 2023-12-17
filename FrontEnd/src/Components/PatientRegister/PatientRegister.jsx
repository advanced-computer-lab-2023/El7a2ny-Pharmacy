import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import * as Yup from 'yup';
import { Icon } from 'react-icons-kit'
import {notepad_ok} from 'react-icons-kit/ikons/notepad_ok'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'

const PatientRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      gender: '',
      username: '',
      DOB: '',
      mobile_number: '',
      emergency_contact: {
        name: '',
        mobile_number: ''
      }
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
      gender: Yup.string().required('Gender is required'),
      username: Yup.string().required('Username is required'),
      DOB: Yup.date().required('Date of birth is required'),
      mobile_number: Yup.string()
        .matches(/^\d{10}$/, 'Invalid mobile number')
        .required('Mobile number is required'),
      emergency_contact: Yup.object().shape({
        name: Yup.string().required('Emergency contact name is required'),
        mobile_number: Yup.string()
          .matches(/^\d{10}$/, 'Invalid mobile number')
          .required('Emergency contact mobile number is required')
      })
    }),

    onSubmit: (values) => patientSignup(values)
  });
  async function patientSignup(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(ApiBaseUrl + 'patients/register', values);
      setIsLoading(false);
      formik.resetForm();
      navigate(`/PatientLogin`)
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
    <Helmet>
      <title>Pharmacist Registration</title>
    </Helmet>
    <div className="container bg-light my-5 p-4 border rounded shadow-sm mx-auto">
      <h2 className='text-muted d-flex align-items-center'><Icon className='me-2' size={30} icon={notepad_ok}/><span className='me-2'>Patient Form</span> </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className=" col-12">
            <div className="row">
              <div className="col-md-6 form-floating">
                {/* name input */}
                <input type="text" placeholder='Full Name' className="form-control mb-2" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <label className='ms-2' htmlFor="name">Full Name</label>
                {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div>: null}
              </div>
              <div className="col-md-6 form-floating">
                {/* username input */}
                <input type="text" className="form-control mb-2" placeholder='Username' id="username" name="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <label className='ms-2' htmlFor="username">Username </label>
                {formik.errors.username && formik.touched.username ?  <div className="alert alert-danger">{formik.errors.username}</div> : null}
              </div>
              <div className="col-md-6 form-floating">
                {/* email input */}
                <input placeholder='Email@example.ex' type="email" className="form-control mb-2" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <label className='ms-2' htmlFor="email">Email</label>
                {formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div> : null}
              </div>
              <div className="col-md-6 form-floating">
                {/* gender input */}
                <select  className="form-control mb-2" id="gender" name="gender"  value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <label className='ms-2' htmlFor="gender">Gender</label>
                {formik.errors.gender && formik.touched.gender ? <div className="alert alert-danger">{formik.errors.gender}</div> : null}
              </div>
              <div className="col-md-6 form-floating">
                {/* mobile number input */}
                <input type="text" className="form-control mb-2" id="mobile_number" placeholder='Mobile Number' name="mobile_number" value={formik.values.mobile_number} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <label className='ms-2' htmlFor="mobile_number">Mobile Number</label>
                {formik.errors.mobile_number && formik.touched.mobile_number ? <div className="alert alert-danger">{formik.errors.mobile_number}</div> : null}
              </div>
              <div className="col-md-6 form-floating">
                {/* DOB input */}
                <input type="date" className="form-control mb-2" id="DOB" placeholder='Date of Birth' name="DOB" value={formik.values.DOB} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <label className='ms-2' htmlFor="DOB">Date of Birth</label>
                {formik.errors.DOB && formik.touched.DOB ? <div className="alert alert-danger">{formik.errors.DOB}</div>: null}
              </div>
            </div>
          </div>
          <div className="col-12 ">
            {/* password input */}
            <div className="passwordField position-relative form-floating">
              <input type={passwordShown ? 'text' : 'password'} className="mb-2 form-control" placeholder='Password' name="password" id="password" current-password = "true" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <label className='ms-1' htmlFor="password">Password</label>
              <span onClick={togglePassword} className='togglePassword position-absolute top-0 end-0 me-3 mt-3 cursor-pointer'>{passwordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
            </div>
            {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}
          </div>
          <hr className='mt-3'/>
          <div className="col-12">
            <div className="row">            
              <h6 className='text-muted'>Emergency Contact Information :</h6>
              <div className="col-md-6 form-floating">
                {/* emergency contact name input */}
                <input type="text" placeholder='Name' className="form-control mb-2" id="emergency_contact.name" name="emergency_contact.name" value={formik.values.emergency_contact.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <label className='ms-2' htmlFor="emergency_contact.name">Name</label>
                {formik.errors.emergency_contact?.name && formik.touched.emergency_contact?.name ? <div className="alert alert-danger">{formik.errors.emergency_contact.name}</div>  : null}
              </div>
              <div className="col-md-6 form-floating">
                {/* emergency contact mobile number input */}
                <input type="text" placeholder='Mobile Number' className="form-control mb-2" id="emergency_contact.mobile_number" name="emergency_contact.mobile_number" value={formik.values.emergency_contact.mobile_number} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <label htmlFor="emergency_contact.mobile_number" className='ms-2'>Mobile Number</label>
                {formik.errors.emergency_contact?.mobile_number && formik.touched.emergency_contact?.mobile_number ? <div className="alert alert-danger">{formik.errors.emergency_contact.mobile_number}</div> : null}
              </div>
            </div>
          </div>
          <div className="btns ms-auto w-25">
            {/* loading & signup btns */}
            {isLoading ? <button type="button" className="btn bg-main text-light w-100 me-2"><i className="fa fa-spin fa-spinner"></i></button>
             : 
              <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="btn bg-main text-light w-100 me-2">SUBMIT </button>
            }
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default PatientRegister;