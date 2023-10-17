import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import {  useParams } from 'react-router-dom'
import ApiBaseUrl from '../ApiBaseUrl';

export default function PatientDetails() {
  let {id} = useParams()
  const [Patient, setPatient] = useState([])
  async function getPatientDetails(){
    let {data} = await axios.get(ApiBaseUrl + `patients//one-patient/${id}`)
    setPatient(data)
  }
  useEffect(()=>{getPatientDetails()},[])
  return <>
    <Helmet>
      <title>Patient Details</title>
    </Helmet>
    <div className="container py-5">
      <h5 className='mb-3'>Full Name : <span className='text-secondary'>{Patient.name}</span></h5>
      <h5 className='mb-3'>User Name : <span className='text-secondary'>{Patient.username}</span> </h5>
      <h5 className='mb-3'>Email : <span className='text-secondary'>{Patient.email}</span></h5>
      <h5 className='mb-3'>Date of Birth : <span className='text-secondary'>{Patient.DOB?.slice(0, 10)}</span></h5>
      <h5 className='mb-3'>Mobile Number : <span className='text-secondary'>{Patient.mobile_number}</span></h5>
      <h5 className='mb-3'>Emergency Contact : </h5>
      <h6 className='mb-3 ms-5'>Name : <span className='text-secondary'>{Patient.emergency_contact?.name}</span></h6>
      <h6 className='mb-3 ms-5'>Mobile Number : <span className='text-secondary'>{Patient.emergency_contact?.mobile_number}</span></h6>
      <h6 className='mb-3 ms-5'>Relation : <span className='text-secondary'>{Patient.emergency_contact?.relation}</span></h6>
      <h5 className='mb-3'>Join at : <span className='text-secondary'>{Patient.createdAt?.slice(0, 10)}</span></h5>

    </div>
    </>
}