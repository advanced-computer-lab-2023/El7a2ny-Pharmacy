import React ,{useState , useEffect}from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import ApiBaseUrl from '../ApiBaseUrl'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function AllOrders({PatientToken}) {

  const [AllPatientOrders, setAllPatientOrders] = useState();

  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };
  
    async function getAllAllPatientOrders() {
      try {
        let {data} =await axios.get(ApiBaseUrl + `administrators/all-pharmacists-requests`, { headers: PatientHeaders });
        console.log(data);
        setAllPatientOrders(data);
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(()=>{ PatientToken? getAllAllPatientOrders() : null},[PatientToken]);

    async function CancelOrder( id){
      try {
        const { data } = await axios.patch(ApiBaseUrl + `administrators/pharmacist-request/${id}`,
          { headers: PatientHeaders }
        );
        if (PatientToken) {
          getAllAllPatientOrders() 
        } 
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    const actionTemplate = (rowData) => {
      return (
        <div className='d-flex justify-content-around align-items-center'>
          <Button icon="pi pi-times" className={`TabelButton Cancel`} onClick={() => {CancelOrder(rowData._id)}} />
        </div>
      );
    };
    const header = (
      <div className="d-flex justify-content-between">
        <h2 className='text-secondary'>All Patient Orders :</h2>
      </div>
    );
  
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
  
    return <>
      <Helmet>
        <title>Pharmacist Requests</title>
      </Helmet>
    <div className="container my-3">
    <DataTable value={AllPatientOrders} header={header} paginator selectionMode="single" className={`dataTabel mb-4 text-capitalize`} dataKey="_id" scrollable scrollHeight="100vh" tableStyle={{ minWidth: "50rem" }} rows={10} responsive="scroll">
          <Column field="name" header="Name" sortable style={{ width: "13%" , borderBottom: '1px solid #dee2e6' }} />
          <Column field="_id" header="id" sortable style={{ width: "15%" , borderBottom: '1px solid #dee2e6' }} />
          <Column field="email" header="email" sortable style={{ width: "15%" ,borderBottom: '1px solid #dee2e6' }} />
          <Column field="DOB" header="Age" body={DobBodyTemplate} sortable style={{ width: '10%' , borderBottom: '1px solid #dee2e6' }}></Column>
          <Column field="affiliation" header="affiliation" sortable style={{ width: "12%" , borderBottom: '1px solid #dee2e6' }} />
          <Column field="hourlyRate" header="H-Rate" sortable style={{ width: "11%" ,borderBottom: '1px solid #dee2e6' }} />
          <Column body={actionTemplate} header="Actions" style={{ width: '12%' , borderBottom: '1px solid #dee2e6' }} />
    </DataTable>
    </div>
      </>
}
