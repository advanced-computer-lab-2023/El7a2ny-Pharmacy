import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

export default function MedicineList() {
  const [Medicines, setMedicines] = useState([])
  const [SearchedMedicine, setSearchedMedicine] = useState()

  async function getAllMedicines() {
    try {
      const response = await axios.get(ApiBaseUrl + `medicines/all-medicines`)
      setMedicines(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  async function addNewMedicine(values){
    try {
      let {data} = await axios.post(ApiBaseUrl +'medicines/add-medicine' , values)
      formik.resetForm();
    } catch (error) {
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      medicinal_use: '',
      sales: '',
      description: '',
      quantity: '',
      price: '',
      pictureUrl: '',
      name: ''
    },
    validationSchema: Yup.object().shape({
      medicinal_use: Yup.string().required('Username is required'),
      sales: Yup.string().required('Username is required'),
      quantity: Yup.string().required('Username is required'),
      price: Yup.string().required('Username is required'),
      pictureUrl: Yup.string().required('Username is required'),
      name: Yup.string().required('Username is required')
    }),
    onSubmit: (values) => addNewMedicine(values)
  })

  useEffect(()=>{getAllMedicines()},[])

  const handleNameSearch = async () => {
    const searchVal = document.getElementById('MedicineName').value
    setSearchedMedicine()
    try {
      let {data} = await axios.get(ApiBaseUrl +`medicines/search-by-name/${searchVal}`)
      setSearchedMedicine(data)
    } catch (error) {
      
    }
  }
  const handleUsageSearch = async () => {
    const searchUseVal = document.getElementById('MedicineUsage').value
    setSearchedMedicine()
    try {
      let {data} = await axios.get(ApiBaseUrl +`medicines/filter-by-medicinal-use/${searchUseVal}`)
      setSearchedMedicine(data)
    } catch (error) {
      
    }
  }

  return <>
    <Helmet>
      <title>Medicine List</title>
    </Helmet>
    <div className="searchField d-flex align-items-center justify-content-center mb-3">
      <input type="search" name="MedicineName" id="MedicineName" className='form-control w-50 me-2' placeholder='Search For a Medicine By Name ...' />
      <button className='btn btn-primary' onClick={handleNameSearch}>Search</button>
      </div>
      <div className="searchField d-flex align-items-center justify-content-center mb-3">
      <input type="search" name="MedicineUsage" id="MedicineUsage" className='form-control w-50 me-2' placeholder='Search For a Medicine By Usage ...' />
      <button className='btn btn-primary' onClick={handleUsageSearch}>Search</button>
      </div>

      {SearchedMedicine ?  <div className='mb-4'><h4>Search Result :</h4> 
      {SearchedMedicine.length === 0 ? <h5 className='text-danger'>No Medicine With This Name</h5> :
      <div className="row text-center gy-4 align-items-stretch">

      {SearchedMedicine?.map((medicine , index)=>
          <div key={index} className="col-6 ">
            <div className="medicineCard rounded px-2 py-3 cursor-pointer border">
              <img src={medicine.pictureUrl} className='w-100' alt="" />
              <h5>Name : <span className='text-secondary'>{medicine.name}</span></h5>
              <h5>username : <span className='text-secondary'>{medicine.username}</span></h5>
              <h5>price : <span className='text-secondary'>{medicine.price}</span></h5>
              <h5>quantity : <span className='text-secondary'>{medicine.quantity}</span></h5>
              <h5>description : <span className='text-secondary'>{medicine.description}</span></h5>
              <h5>sales : <span className='text-secondary'>{medicine.sales}</span></h5>
              <h5>medicinal_use : <span className='text-secondary'>{medicine.medicinal_use}</span></h5>
              <h5>ingredients : </h5>
              {medicine.ingredients?.map((m , index)=><h5 key={index} className='ms-4'> <span className='text-secondary'>{m}</span></h5>)}
              <Link to={`/EditMedicine/${medicine._id}`} className='btn btn-success'>Edit Info</Link>
            </div>
          </div>
        )}
      </div>
       }
      </div> 
: null}
    <div className="container py-5">
<h4> All Medicines :</h4>
      <div className="row text-center gy-4 align-items-stretch">
        {Medicines?.map((medicine , index)=>
          <div key={index} className="col-6 ">
            <div className="medicineCard rounded px-2 py-3 cursor-pointer border">
              <img src={medicine.pictureUrl} className='w-100' alt="" />
              <h5>Name : <span className='text-secondary'>{medicine.name}</span></h5>
              <h5>username : <span className='text-secondary'>{medicine.username}</span></h5>
              <h5>price : <span className='text-secondary'>{medicine.price}</span></h5>
              <h5>quantity : <span className='text-secondary'>{medicine.quantity}</span></h5>
              <h5>description : <span className='text-secondary'>{medicine.description}</span></h5>
              <h5>sales : <span className='text-secondary'>{medicine.sales}</span></h5>
              <h5>medicinal_use : <span className='text-secondary'>{medicine.medicinal_use}</span></h5>
              <h5>ingredients : </h5>
              {medicine.ingredients?.map((m , index)=><h5 key={index} className='ms-4'> <span className='text-secondary'>{m}</span></h5>)}
              <Link to={`/EditMedicine/${medicine._id}`} className='btn btn-success'>Edit Info</Link>
            </div>
          </div>
        )}
      </div>

      <h4>Add New Medicine</h4>
      <form onSubmit={formik.handleSubmit}>
                        {/*name input */}
                        <label htmlFor="username">New Medicine name :</label>
          <input type="text" className="form-control mb-2" id="name" name="name"value={formik.values.name}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.name && formik.touched.name ? (<div className="alert alert-danger">{formik.errors.name}</div>) : null}

                {/*pictureUrl input */}
            <label htmlFor="pictureUrl">New Medicine pictureUrl :</label>
          <input type="text" className="form-control mb-2" id="pictureUrl" name="pictureUrl"value={formik.values.pictureUrl}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.pictureUrl && formik.touched.pictureUrl ? (<div className="alert alert-danger">{formik.errors.pictureUrl}</div>) : null}

                {/*medicinal_use input */}
                <label htmlFor="medicinal_use">New Medicine medicinal_use :</label>
          <input type="text" className="form-control mb-2" id="medicinal_use" name="medicinal_use"value={formik.values.medicinal_use}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.medicinal_use && formik.touched.medicinal_use ? (<div className="alert alert-danger">{formik.errors.medicinal_use}</div>) : null}
                
                                {/*description input */}
                                <label htmlFor="description">New Medicine description :</label>
          <input type="text" className="form-control mb-2" id="description" name="description"value={formik.values.description}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.description && formik.touched.description ? (<div className="alert alert-danger">{formik.errors.description}</div>) : null}

                
                {/*sales input */}
                <label htmlFor="sales">New Medicine sales :</label>
          <input type="text" className="form-control mb-2" id="sales" name="sales"value={formik.values.sales}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.sales && formik.touched.sales ? (<div className="alert alert-danger">{formik.errors.sales}</div>) : null}
                {/*quantity input */}
                <label htmlFor="quantity">New Medicine quantity:</label>
          <input type="number" className="form-control mb-2" id="quantity" name="quantity"value={formik.values.quantity}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.quantity && formik.touched.quantity ? (<div className="alert alert-danger">{formik.errors.quantity}</div>) : null}
                {/*price input */}
                <label htmlFor="price">New Medicine price :</label>
          <input type="number" className="form-control mb-2" id="price" name="price"value={formik.values.price}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
          {formik.errors.price && formik.touched.price ? (<div className="alert alert-danger">{formik.errors.price}</div>) : null}

            <button type="submit" disabled={!(formik.isValid && formik.dirty)}className="btn btn-success text-light me-2">
              Add Mdicine
            </button>

    </form>
    </div>
    </>
}