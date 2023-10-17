import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ApiBaseUrl from '../ApiBaseUrl';

export default function PatientList() {
  const [Patients, setPatients] = useState([])
  async function getAllPatients() {
    try {
      const response = await axios.get(ApiBaseUrl + `patients/all-patients`)
      setPatients(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  async function deletePatient(id){
    try {
      let {data} = await axios.delete(ApiBaseUrl + `patients/remove-patient/${id}`)
      getAllPatients()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{getAllPatients()},[])

  return <>
    <Helmet>
      <title>Patient List</title>
    </Helmet>
    <div className="container py-5">
<h4> All Patients :</h4>
      <div className="row text-center gy-4 align-items-stretch">
        {Patients?.map((patient , index)=>
          <div key={index} className="col-4 col-md-3 col-lg-2">
            <div className="patientCard rounded px-2 py-3 cursor-pointer border">
              <h5>Name : <span className='text-secondary'>{patient.name}</span></h5>
              <p className='mb-1'>Gender : <span className='text-secondary'>{patient.gender}</span></p>
              <p>Mobile : <span className='text-secondary'>{patient.mobile_number}</span></p>
              <div className="row">
                <div className="col-6">
                <Link to={`/PatientDetails/${patient._id}`} className='btn btn-success btn-sm'>more info</Link>
                </div>
                <div className="col-6">
                <button onClick={()=>{deletePatient(patient._id)}} className='btn btn-danger btn-sm'>Delete Patient</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
}