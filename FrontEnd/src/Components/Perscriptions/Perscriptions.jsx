import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function Perscriptions({ PatientToken }) {
  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };
  const [Medicines, setMedicines] = useState()
  const [OrignalMedicines, setOrignalMedicines] = useState()

  async function getAllMedicines(role , header) {
      try {
        const response = await axios.get(ApiBaseUrl + `${role}/all-not-filled-prescriptions` , {headers : header})
        const prescriptions = response.data;

        // Update the prescription data to include doctor's name and prescription date
        const updatedPrescriptions = prescriptions.map((prescription) => {
          return {
            ...prescription,
            doctorName: prescription.doctor_id.name,
            prescriptionDate: new Date(prescription.date).toLocaleDateString(),
          };
        });
        console.log(updatedPrescriptions);
        setMedicines(updatedPrescriptions);
        setOrignalMedicines(updatedPrescriptions);
        } catch (error) {
        console.error(error);
    }
  }

  useEffect(()=>{ getAllMedicines('patients' , PatientHeaders) } ,[ PatientToken])

  function searchMedicines(searchVal , searchType) {
    if (searchVal.trim() === '') {
      setMedicines([...OrignalMedicines]);
    } else {
      const filteredMedicines = OrignalMedicines.filter(
        (medicine) =>{
          if (searchType === "name") {
            return medicine.name.toLowerCase().includes(searchVal.toLowerCase())
          } else if (searchType === "medicinal-use") {
            return medicine.medicinal_use.toLowerCase().includes(searchVal.toLowerCase())
          }
        }
      );
      setMedicines([...filteredMedicines]);
    }
  }


  const header = (
    <div className="d-flex justify-content-between col-12">
      <div className="row w-100">
        <div className="col-5">
          <div className="tableTitle mt-1">
            <h2 className='text-secondary'>All Un-Filled Medicines :</h2>
          </div>
        </div>
        <div className="col-7 ms-auto">
          <div className="rightHeader d-flex flex-column">
            <div className="searchContiner align-self-end ">
              <span className="p-input-icon-left me-2">
                <i className="pi pi-search" />
                <InputText placeholder="Medicine Name..." onChange={(e) => { searchMedicines(e.target.value , "name") }} />
              </span>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText placeholder="Medicine Usage..." onChange={(e) => { searchMedicines(e.target.value , "medicinal-use") }}  />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // const mainIngredientBody = (rowData) => rowData.ingredients.map((medicine, index) => <span key={index}>{medicine}</span>).reduce((acc, span, index) => index === 0 ? span : [acc, ' - ', span], null);
  const mainIngredientBody = (rowData) => {
    if (rowData.ingredients && Array.isArray(rowData.ingredients)) {
      return rowData.ingredients.map((medicine, index) => (
        <span key={index}>{medicine}</span>
      )).reduce((acc, span, index) => index === 0 ? span : [acc, ' - ', span], null);
    } else {
      return null; // or provide a default value if needed
    }
  };
  
  const actionTemplate = (rowData) => {
    return (
      <div className='d-flex justify-content-around align-items-center'>
        <Button icon="pi pi-pencil" className='TabelButton approve' onClick={() => {}} />
      </div>
    );
  };


  const uploadImgBody = (rowData) => {
    if (rowData.pictureUrl) return <img src={rowData.pictureUrl} alt="Medicine" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
  };
    
  return <>
    <Helmet>
      <title>Medicine List</title>
    </Helmet>
    <div className="container-fluid my-3">
          <DataTable value={Medicines} header={header} paginator selectionMode="single" className={`dataTabel mb-4 text-capitalize AllList`} dataKey="_id" scrollable scrollHeight="100vh" tableStyle={{ minWidth: "50rem" }} rows={10} responsive="scroll">
          <Column
            field="doctorName"
            header="Doctor Name"
            sortable
            style={{ width: "15%", borderBottom: "1px solid #dee2e6" }}
          />
          <Column
            field="prescriptionDate"
            header="Prescription Date"
            sortable
            style={{ width: "15%", borderBottom: "1px solid #dee2e6" }}
          />
            <Column field="name" header="Name" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="availableQuantity" header="Quantity" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="medicine_list" header="medicine_list" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="price" header="price" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="description" header="description" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="sales" header="sales" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="medicinal_use" header="use" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="main_ingredient" header="main ingredient" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field='ingredients' header="ingredients" body={mainIngredientBody} style={{ width: '15%', borderBottom: '1px solid #dee2e6' }} />
          </DataTable>
    </div>
    </>
}
