import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
const PharmacistRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

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
      speciality: '',    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      hourlyRate: Yup.number().required('Hourly rate is required'),
      DOB: Yup.date().required('Date of birth is required'),
      education: Yup.string().required('Education is required'),
      affiliation: Yup.string().required('Affiliation is required'),
      speciality: Yup.string().required('Speciality is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const {data} = await axios.post(ApiBaseUrl + 'pharmacists/register-request', values);
        setIsLoading(false);
        formik.resetForm();
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    },
  });
  return (
    <>
      <div className="container ">
        <h1>Doctor Form</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* username input */}
          <label htmlFor="username">Username:</label>
          <input type="text"className="form-control mb-2" id="username"name="username"value={formik.values.username} onChange={formik.handleChange}onBlur={formik.handleBlur} />
          {formik.errors.username && formik.touched.username ? (<div className="alert alert-danger">{formik.errors.username}</div>) : null}

          {/* name input */}
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control mb-2" id="name"  name="name" value={formik.values.name} onChange={formik.handleChange}  onBlur={formik.handleBlur} />
          {formik.errors.name && formik.touched.name ? ( <div className="alert alert-danger">{formik.errors.name}</div> ) : null}

          {/* email input */}
          <label htmlFor="email">Email:</label>
          <input type="email"  className="form-control mb-2" id="email" name="email" value={formik.values.email} onChange={formik.handleChange}  onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ? ( <div className="alert alert-danger">{formik.errors.email}</div> ) : null}

          {/* password input */}
          <label htmlFor="password">Password:</label>
          <div className="passwordField position-relative">
            <input type={passwordShown ? 'text' : 'password'} className="mb-2 form-control" name="password" id="password" value={formik.values.password}  onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <span  onClick={togglePassword}  className="togglePassword cursor-pointer position-absolute end-0 top-0 me-2 mt-1"  >
              {passwordShown ? ( <i className="fa fa-eye text-danger"></i>  ) : ( <i className="fa fa-eye-slash text-main"></i>   )}  </span>
          </div>
          {formik.errors.password && formik.touched.password ? ( <div className="alert alert-danger">{formik.errors.password}</div>  ) : null}

          {/* hourly rate input */}
          <label htmlFor="hourlyRate">Hourly Rate:</label>
          <input type="number"className="form-control mb-2" id="hourlyRate" name="hourlyRate"  value={formik.values.hourlyRate}  onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.hourlyRate && formik.touched.hourlyRate ? ( <div className="alert alert-danger">{formik.errors.hourlyRate}</div> ) : null}

          {/* date of birth input */}
          <label htmlFor="DOB">Date of Birth:</label>
          <input  type="date" className="form-control mb-2" id="DOB" name="DOB" value={formik.values.DOB} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.DOB && formik.touched.DOB ?( <div className="alert alert-danger">{formik.errors.DOB}</div> ) : null}

          {/* education input */}
          <label htmlFor="education">Education:</label>
          <input type="text" className="form-control mb-2" id="education" name="education"value={formik.values.education}onChange={formik.handleChange} onBlur={formik.handleBlur}  />
          {formik.errors.education && formik.touched.education ? ( <div className="alert alert-danger">{formik.errors.education}</div> ) : null}

          {/* affiliation input */}
          <label htmlFor="affiliation">Affiliation:</label>
          <input type="text"className="form-control mb-2" id="affiliation" name="affiliation" value={formik.values.affiliation} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.affiliation && formik.touched.affiliation ? ( <div className="alert alert-danger">{formik.errors.affiliation}</div> ) : null}

          {/* speciality input */}
          <label htmlFor="speciality">Speciality:</label>
          <input type="text" className="form-control mb-2"  id="speciality" name="speciality"  value={formik.values.speciality}  onChange={formik.handleChange}  onBlur={formik.handleBlur} />
          {formik.errors.speciality && formik.touched.speciality ? ( <div className="alert alert-danger">{formik.errors.speciality}</div>   ) : null}

          {/* loading & signup btns */}
          {isLoading ? ( <button type="button" className="btn btn-success text-light me-2"><i className="fa fa-spin fa-spinner"></i></button>
          ) : (
            <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="btn btn-success text-light me-2">Submit </button>)
          }
        </form>
      </div>
    </>
  );
};
export default PharmacistRegister;