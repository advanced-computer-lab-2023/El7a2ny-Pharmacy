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
        let {data} =await axios.get(ApiBaseUrl + `patients/my-orders`, { headers: PatientHeaders });
        console.log(data);
        setAllPatientOrders(data);
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(()=>{ PatientToken? getAllAllPatientOrders() : null},[PatientToken]);

    async function CancelOrder( id){
      try {
        const { data } = await axios.patch(ApiBaseUrl + `patients/cancel-order/${id}`,
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
  
  
  const DobBodyTemplate = (rowData) =>  <span>{rowData.createdAt ? rowData.createdAt.slice(0, 10) : ''}</span>;
  
    return <>
      <Helmet>
        <title>Pharmacist Requests</title>
      </Helmet>
    <div className="container my-3">
    <DataTable value={AllPatientOrders} header={header} paginator selectionMode="single" className={`dataTabel mb-4 text-capitalize`} dataKey="_id" scrollable scrollHeight="100vh" tableStyle={{ minWidth: "50rem" }} rows={10} responsive="scroll">
          <Column field="name" header="Name" sortable style={{ width: "13%" , borderBottom: '1px solid #dee2e6' }} />
          <Column field="_id" header="idinvoice number" sortable style={{ width: "15%" , borderBottom: '1px solid #dee2e6' }} />
          <Column field="address" header="address" sortable style={{ width: "15%" ,borderBottom: '1px solid #dee2e6' }} />
          <Column field="createdAt" header="created At" body={DobBodyTemplate} sortable style={{ width: '10%' , borderBottom: '1px solid #dee2e6' }}></Column>
          <Column field="affiliation" header="affiliation" sortable style={{ width: "12%" , borderBottom: '1px solid #dee2e6' }} />
          <Column field="status" header="status" sortable style={{ width: "11%" ,borderBottom: '1px solid #dee2e6' }} />
          <Column body={actionTemplate} header="Actions" style={{ width: '12%' , borderBottom: '1px solid #dee2e6' }} />
    </DataTable>
    </div>
      </>
}
