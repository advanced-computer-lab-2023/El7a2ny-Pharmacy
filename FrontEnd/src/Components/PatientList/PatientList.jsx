import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ApiBaseUrl from '../ApiBaseUrl';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function PatientList({AdminToken}) {
  let AdminHeaders = { 'Authorization': `Bearer ${AdminToken}` };
  const [Patients, setPatients] = useState([]);
  const [loadingPatientId, setLoadingPatientId] = useState(null);
  const [originalPatients, setOriginalPatients] = useState([]); 

  async function getAllPatients() {
    try {
      const response = await axios.get(ApiBaseUrl + `administrators/all-patients` , { headers: AdminHeaders })
      setPatients(response.data);
      setOriginalPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function deletePatient(id){
    setLoadingPatientId(id);
    try {
      let {data} = await axios.delete(ApiBaseUrl + `administrators/remove-patient/${id}` , { headers: AdminHeaders });
      setLoadingPatientId(null);
      if (AdminToken) {
      getAllPatients()
      }
    } catch (error) {
      console.error(error);
      setLoadingPatientId(null);
    }
  }

  function searchPatients(searchVal) {
    if (searchVal.trim() === '') {
      setPatients([...originalPatients]);
    } else {
      const filteredPatients = originalPatients.filter(
        (patient) => patient.name.toLowerCase().includes(searchVal.toLowerCase())
      );
      setPatients([...filteredPatients]);
    }
  }

  const header = (
    <div className="d-flex justify-content-between">
        <h2 className='text-secondary'>All Patients</h2>
      <span className="p-input-icon-left me-2">
        <i className="pi pi-search" />
        <InputText placeholder="Search By Patients Name..." onChange={(e) => { searchPatients(e.target.value) }} />
      </span>
    </div>
  );

  const actionTemplate = (rowData) => {
    return (
      <div className='d-flex justify-content-around align-items-center'>
        {AdminToken ? <Button icon="pi pi-trash"  className='TabelButton Cancel' onClick={() => { deletePatient(rowData._id) }} /> : null}
      </div>
    );
  };

  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const DobBodyTemplate = (rowData) => {
    const age = calculateAge(rowData.DOB);
    return (
      <span>
        {rowData.DOB ? `${age}` : ''}
      </span>
    );
  };  
  
  const joinBodyTemplate = (rowData) => rowData?.createdAt?.slice(0,10);

  useEffect(()=>{getAllPatients()},[AdminToken])

  return <>
    <Helmet>
      <title>Patient List</title>
    </Helmet>
    <div className="container my-3">
    <DataTable value={Patients} header={header} paginator selectionMode="single" className={`dataTabel mb-4 text-capitalize AllList`} dataKey="_id" scrollable scrollHeight="100vh" tableStyle={{ minWidth: "50rem" }} rows={10} responsive="scroll">
        <Column field="name" header="Name" sortable style={{ width: "16%", borderBottom: '1px solid #dee2e6' }} />
        <Column field="email" header="email" sortable style={{ width: "15%", borderBottom: '1px solid #dee2e6' }} />
        <Column field="gender" header="gender" sortable style={{ width: "12%", borderBottom: '1px solid #dee2e6' }} />
        <Column field="mobile_number" header="mobile number" sortable style={{ width: "15%", borderBottom: '1px solid #dee2e6' }} />
        <Column field="DOB" header="Age" body={DobBodyTemplate} sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} ></Column>
        <Column field="createdAt" header="Join at" body={joinBodyTemplate} sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
        <Column body={actionTemplate} header="Actions" style={{ width: '15%', borderBottom: '1px solid #dee2e6' }} />
      </DataTable>

    </div>
    </>
}