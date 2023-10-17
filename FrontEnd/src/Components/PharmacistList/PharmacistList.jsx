import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';

export default function PharmacistList() {
  const [Pharmacists, setPharmacists] = useState([])
  async function getAllPharmacists() {
    try {
      const response = await axios.get(ApiBaseUrl + `pharmacists/all-pharmacists`)
      setPharmacists(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{getAllPharmacists()},[])

  return <>
    <Helmet>
      <title>Pharmacist List</title>
    </Helmet>
    <div className="container py-5">
<h4> All Pharmacists :</h4>
      <div className="row text-center gy-4 align-items-stretch">
        {Pharmacists?.map((pharmacist , index)=>
          <div key={index} className="col-6 ">
            <div className="pharmacistCard rounded px-2 py-3 cursor-pointer border">
              <h5>Name : <span className='text-secondary'>{pharmacist.name}</span></h5>
              <h5>username : <span className='text-secondary'>{pharmacist.username}</span></h5>
              <h5>email : <span className='text-secondary'>{pharmacist.email}</span></h5>
              <h5>hourlyRate : <span className='text-secondary'>{pharmacist.hourlyRate}</span></h5>
              <h5>DOB : <span className='text-secondary'>{pharmacist.DOB?.slice(0,10)}</span></h5>
              <h5>education : <span className='text-secondary'>{pharmacist.education}</span></h5>
              <h5>affiliation : <span className='text-secondary'>{pharmacist.affiliation}</span></h5>
              <h5>status : <span className='text-secondary'>{pharmacist.status}</span></h5>
              <h5>createdAt : <span className='text-secondary'>{pharmacist.createdAt?.slice(0,10)}</span></h5>
              <button className='btn btn-sm btn-success me-2'>Aplly Request</button>
              <button className='btn btn-sm btn-danger '>Decline Request</button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
}