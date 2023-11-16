import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import * as Yup from 'yup';

const PatientRegister = () => {
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
      console.log(response);
      setIsLoading(false);
      formik.resetForm();

    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <div className="container">
        <h1>Patient Registration</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* username input */}
          <label htmlFor="username">Username:</label>
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

          {/* name input */}
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control mb-2"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

          {/* email input */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control mb-2"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          {/* password input */}
          <label htmlFor="password">Password:</label>
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

          {/* gender input */}
          <label htmlFor="gender">Gender:</label>
          <select
            className="form-control mb-2"
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formik.errors.gender && formik.touched.gender ? (
            <div className="alert alert-danger">{formik.errors.gender}</div>
          ) : null}

          {/* DOB input */}
          <label htmlFor="DOB">Date of Birth:</label>
          <input
            type="date"
            className="form-control mb-2"
            id="DOB"
            name="DOB"
            value={formik.values.DOB}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.DOB && formik.touched.DOB ? (
            <div className="alert alert-danger">{formik.errors.DOB}</div>
          ) : null}

          {/* mobile number input */}
          <label htmlFor="mobile_number">Mobile Number:</label>
          <input
            type="text"
            className="form-control mb-2"
            id="mobile_number"
            name="mobile_number"
            value={formik.values.mobile_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.mobile_number && formik.touched.mobile_number ? (
            <div className="alert alert-danger">{formik.errors.mobile_number}</div>
          ) : null}

          {/* emergency contact name input */}
          <label htmlFor="emergency_contact.name">Emergency Contact Name:</label>
          <input
            type="text"
            className="form-control mb-2"
            id="emergency_contact.name"
            name="emergency_contact.name"
            value={formik.values.emergency_contact.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.emergency_contact?.name && formik.touched.emergency_contact?.name ? (
            <div className="alert alert-danger">{formik.errors.emergency_contact.name}</div>
          ) : null}

          {/* emergency contact mobile number input */}
          <label htmlFor="emergency_contact.mobile_number">Emergency Contact Mobile Number:</label>
          <input
            type="text"
            className="form-control mb-2"
            id="emergency_contact.mobile_number"
            name="emergency_contact.mobile_number"
            value={formik.values.emergency_contact.mobile_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.emergency_contact?.mobile_number && formik.touched.emergency_contact?.mobile_number ? (
            <div className="alert alert-danger">{formik.errors.emergency_contact.mobile_number}</div>
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default PatientRegister;