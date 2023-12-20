import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import { Icon } from 'react-icons-kit'
import {notepad_ok} from 'react-icons-kit/ikons/notepad_ok'
import { Helmet } from 'react-helmet';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {ic_error_twotone} from 'react-icons-kit/md/ic_error_twotone'
const PharmacistRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [pendingMssg, setpendingMssg] = useState(null);
  const [ErrMsg, setErrMsg] = useState(null)
  const togglePassword = () => {setPasswordShown(!passwordShown)};
  const formik = useFormik({
    initialValues: {
      name:   '',
      username:  '',
      email:  '',
      password: '',
      hourlyRate: '',
      DOB: '',
      education: '',
      affiliation:  '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      hourlyRate: Yup.number().required('Hourly rate is required'),
      DOB: Yup.date().required('Date of birth is required'),
      education: Yup.string().required('Education is required'),
      affiliation: Yup.string().required('Affiliation is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setpendingMssg(null);
      setErrMsg(null);
      try {
        const data = await axios.post(ApiBaseUrl + 'pharmacists/register-request', values);
        console.log(data);
        setIsLoading(false);
        formik.resetForm();
        setpendingMssg('Pending Approval: Your request is currently pending admin approval. Please wait for approval or contact an admin for more information.')
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        if (error.response && error.response.status === 409) {
          // Handle username conflict error
          setErrMsg('Error: The username is already in use. Please choose a different username.');
        } else {
          // Handle other errors
          setErrMsg('An error occurred. Please try again later.');
        }      }
    },
  });
  return (
    <>
        <Helmet>
      <title>Pharmacist Registration</title>
    </Helmet>

      <div className="container bg-light my-5 p-4 border rounded shadow-sm mx-auto ">
        <h2 className='text-muted d-flex align-items-center'><Icon className='me-2' size={30} icon={notepad_ok}/><span className='me-2'>Pharmacist Form</span> </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="name col-md-4 form-floating">
            {/* name input */}
            <input type="text" className="form-control mb-2" placeholder='Full Name' id="name"  name="name" value={formik.values.name} onChange={formik.handleChange}  onBlur={formik.handleBlur} />
            <label className='ms-2' htmlFor="name">Name</label>
            {formik.errors.name && formik.touched.name ? ( <div className="alert alert-danger">{formik.errors.name}</div> ) : null}
            </div>
            <div className="uName col-md-4 form-floating">
              {/* username input */}
              <input type="text"className="form-control mb-2" placeholder='Unique User-Name' id="username"name="username"value={formik.values.username} onChange={formik.handleChange}onBlur={formik.handleBlur} />
              <label className='ms-2' htmlFor="username">Username</label>
              {formik.errors.username && formik.touched.username ? (<div className="alert alert-danger">{formik.errors.username}</div>) : null}
            </div>
            <div className="col-md-4 form-floating">
              {/* email input */}
              <input type="email"  className="form-control mb-2" id="email" placeholder='E-mail@example.ex' name="email" value={formik.values.email} onChange={formik.handleChange}  onBlur={formik.handleBlur} />
              <label className='ms-2' htmlFor="email">Email</label>
              {formik.errors.email && formik.touched.email ? ( <div className="alert alert-danger">{formik.errors.email}</div> ) : null}
            </div>
            <div className="col-md-4 form-floating">
              {/* date of birth input */}
              <input  type="date" className="form-control mb-2" id="DOB" name="DOB" value={formik.values.DOB} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              <label className='ms-2' htmlFor="DOB">Date of Birth</label>
              {formik.errors.DOB && formik.touched.DOB ?( <div className="alert alert-danger">{formik.errors.DOB}</div> ) : null}
            </div>
            <div className="col-md-8 form-floating">
              {/* education input */}
              <input type="text" className="form-control mb-2" id="education" placeholder='Faculty and University' name="education"value={formik.values.education}onChange={formik.handleChange} onBlur={formik.handleBlur}  />
              <label className='ms-2' htmlFor="education">Education</label>
              {formik.errors.education && formik.touched.education ? ( <div className="alert alert-danger">{formik.errors.education}</div> ) : null}
            </div>
            <div className="col-md-6 form-floating">
              {/* hourly rate input */}
              <input type="number"className="form-control mb-2" id="hourlyRate" placeholder='Hourly Rate' name="hourlyRate"  value={formik.values.hourlyRate}  onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <label className='ms-2' htmlFor="hourlyRate">Hourly Rate</label>
              {formik.errors.hourlyRate && formik.touched.hourlyRate ? ( <div className="alert alert-danger">{formik.errors.hourlyRate}</div> ) : null}
            </div>
            <div className="col-md-6 form-floating">
              {/* affiliation input */}
              <input type="text"className="form-control mb-2" id="affiliation" placeholder='Affiliation' name="affiliation" value={formik.values.affiliation} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <label className='ms-2' htmlFor="affiliation">Affiliation</label>
              {formik.errors.affiliation && formik.touched.affiliation ? ( <div className="alert alert-danger">{formik.errors.affiliation}</div> ) : null}
            </div>
            <div className="col-md-12 ">
              {/* password input */}
              <div className="passwordField position-relative form-floating">
                <input type={passwordShown ? 'text' : 'password'} placeholder='Password' className="mb-2 form-control" name="password" id="password" value={formik.values.password}  onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <span onClick={togglePassword} className='togglePassword position-absolute top-0 end-0 me-3 mt-3 cursor-pointer'>{passwordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
                <label htmlFor="password">Password</label>
              </div>
              {formik.errors.password && formik.touched.password ? ( <div className="alert alert-danger">{formik.errors.password}</div>  ) : null}
          </div>
          {pendingMssg ? <>
          <div className="col-12">
            <div className="alert alert-success">
            <Icon className='me-2' size={30} icon={ic_error_twotone}/>{pendingMssg}
            </div>
          </div>
          </> : null}
          {ErrMsg ? <>
            <div className="col-12">
          <div className="alert alert-danger">
            {ErrMsg}
          </div>
          </div>
          </> : null}
          </div>
          <div className="btns ms-auto w-25">
            {/* loading & signup btns */}
            {isLoading ? <button type="button" className="btn bg-main text-light w-100 me-2"><i className="fa fa-spin fa-spinner"></i></button>
              : <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="btn bg-main text-light w-100 me-2">SUBMIT </button>
            }
          </div>
        </form>
      </div>
    </>
  );
};
export default PharmacistRegister;