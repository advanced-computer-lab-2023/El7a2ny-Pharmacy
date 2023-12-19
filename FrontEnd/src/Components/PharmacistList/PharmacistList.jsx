import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Icon } from 'react-icons-kit';
import { ic_verified_user } from 'react-icons-kit/md/ic_verified_user';
import { ic_info } from 'react-icons-kit/md/ic_info';
import { InputText } from 'primereact/inputtext';
import {xCircle} from 'react-icons-kit/feather/xCircle'

export default function PharmacistList({ PatientToken, AdminToken }) {
  let AdminHeaders = { 'Authorization': `Bearer ${AdminToken}` };
  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };

  const [loadingPharmacistId, setLoadingPharmacistId] = useState(null);
  const [originalPharmacists, setOriginalPharmacists] = useState([]); 
  const [Pharmacists, setPharmacists] = useState([]);
  const [PharmacistId, setPharmacistId] = useState(null)

  const showDialog = () => {
    setDrAppointments(true);
  };
  
  const hideDialog = () => {
    setDrAppointments(false);
    setDrId(null)
  };

  async function getAllPharmacists() {
    try {
      let response;
      switch (PatientToken || AdminToken) {
        case PatientToken:
          response = await axios.get(ApiBaseUrl + `patients/all-pharmacists` , { headers: AdminHeaders })
          setPharmacists(response.data);
          setOriginalPharmacists(response.data);    
          break;
        case AdminToken:
          response = await axios.get(ApiBaseUrl + `administrators/all-pharmacists` , { headers: AdminHeaders })
          setPharmacists(response.data);
          setOriginalPharmacists(response.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deletePharmacist(id){
    setLoadingPharmacistId(id);
    try {
      const response = await axios.delete(ApiBaseUrl + `administrators/remove-pharmacist/${id}` ,{ headers: AdminHeaders } );
      setLoadingPharmacistId(null);
      if (AdminToken) {
        getAllPharmacists()
      }
    } catch (error) {
      console.error(error);
      setLoadingPharmacistId(null);
    }
  };

  function searchPharmacists(searchVal , searchType) {
    if (searchVal.trim() === '') {
      setPharmacists([...originalPharmacists]);
    } else {
      const filteredPharmacists = originalPharmacists.filter(
        (pharmacist) =>{
          if (searchType === "name") {
            return pharmacist.name.toLowerCase().includes(searchVal.toLowerCase())
          } 
        }
      );
      setPharmacists([...filteredPharmacists]);
    }
  }

  const header = (
    <div className="d-flex justify-content-between">
      <div className="tableTitle">
        <h2 className='text-secondary'>All Pharmacists :</h2>
      </div>
      <div className="searchContiner">
      <span className="p-input-icon-left me-2">
        <i className="pi pi-search" />
        <InputText placeholder="Search By Name..." onChange={(e) => { searchPharmacists(e.target.value , "name") }} />
      </span>
      </div>
    </div>
  );

  const actionTemplate = (rowData) => {
    return (
      <div className='d-flex justify-content-around align-items-center'>
        {AdminToken ? <Button icon="pi pi-trash"  className='TabelButton Cancel'onClick={() => { deletePharmacist(rowData._id) }} /> : null}
        {PatientToken ? <Button icon="pi pi-eye"  className='TabelButton approve'onClick={()=>{showDialog() ; setPharmacistId(rowData._id) }} /> : null}
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    if (rowData.status === 'registered') return <Icon className='text-primary' size={22} icon={ic_verified_user} />;
    else if (rowData.status === 'declined') return <Icon className=' Cancel' size={22} icon={xCircle} />;
    else if (rowData.status === 'pending') return <Icon size={22} className='text-warning' icon={ic_info} />;
    
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

  useEffect(()=>{getAllPharmacists()},[AdminToken, PatientToken])

  return <>
    <Helmet>
      <title>Pharmacist List</title>
    </Helmet>
    <div className="container my-3">
        <DataTable value={Pharmacists} header={header} paginator selectionMode="single" className={`dataTabel mb-4 text-capitalize AllList`} dataKey="_id" scrollable scrollHeight="100vh" tableStyle={{ minWidth: "50rem" }} rows={10} responsive="scroll">
          <Column field="name" header="Name" sortable style={{ width: "13%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="email" header="email" sortable style={{ width: "15%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="education" header="education" sortable style={{ width: "15%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="affiliation" header="affiliation" sortable style={{ width: "12%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="DOB" header="Age" body={DobBodyTemplate} sortable style={{ width: "12%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="createdAt" header="Joined At" body={joinBodyTemplate} sortable style={{ width: "12%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="hourlyRate" header="Hourly Rate" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="status" header="status" body={statusBodyTemplate} sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }}></Column>
          <Column body={actionTemplate} header=" " style={{ width: '15%', borderBottom: '1px solid #dee2e6' }} />
        </DataTable>
    </div>
    </>
}