import React, { useEffect, useState , useContext } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { cartContext } from '../../Context/CartContext'
import { Button } from 'primereact/button';
import {shopping_cart_ok} from 'react-icons-kit/ikons/shopping_cart_ok'
import { Icon } from 'react-icons-kit';
import Loading from '../Loading/Loading';

export default function Perscriptions({ PatientToken }) {
  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };
  let {addToCart , IsInCart} = useContext(cartContext);

  const [Medicines, setMedicines] = useState();
  const [selectedRow, setSelectedRow] = useState(null);

  async function getAllMedicines(role, header) {
    try {
      const response = await axios.get(ApiBaseUrl + `${role}/all-not-filled-prescriptions`, { headers: header });
      const prescriptions = response.data;
      const updatedPrescriptions = prescriptions.map((prescription) => {
        return {
          ...prescription,
          doctorName: prescription.doctor_id.name,
          prescriptionDate: new Date(prescription.date).toLocaleDateString(),
        };
      });
      setMedicines(updatedPrescriptions);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => { getAllMedicines('patients', PatientHeaders) }, [PatientToken]);


  const header = (
    <div className="d-flex justify-content-between col-12">
      <div className="row w-100">
        <div className="col-5">
          <div className="tableTitle mt-1">
            <h2 className="text-secondary">Prescription Medicines</h2>
          </div>
        </div>
      </div>
    </div>
  );

  const mainIngredientBody = (rowData) => {
    if (rowData.medicine.ingredients && Array.isArray(rowData.medicine.ingredients)) {
      return rowData.medicine.ingredients.map((ingredient, index) => (
        <span key={index}>{ingredient}</span>
      )).reduce((acc, span, index) => index === 0 ? span : [acc, ' - ', span], null);
    } else {
      return null;
    }
  };

  const getAlternatives = async (rowData)=>{
    try {
      let {data} =await axios.get(ApiBaseUrl + `patients/medicine-alternatives/${rowData.medicine._id}` , {headers : PatientHeaders})
      console.log(data);
    } catch (error) {
      
    }
  }
  
  const AddToCartBody = (rowData) => <Button className='TabelButton approve' onClick={() => { addToCart(rowData.medicine._id) }}> <Icon size={20} className='m-0 mb-2' icon={shopping_cart_ok}></Icon> </Button>

  return  <>
      <Helmet>
        <title>Medicine List</title>
      </Helmet>
      {Medicines ? <>
      <div className="container-fluid my-3">
      <DataTable
  value={Medicines?.flatMap((prescription) =>
    prescription.medicine_list.map((medicine) => ({ ...prescription, ...medicine }))
  )}
  header={header}
  paginator
  selectionMode="single"
  className={`dataTabel mb-4 text-capitalize AllList`}
  dataKey="_id"
  scrollable
  scrollHeight="100vh"
  tableStyle={{ minWidth: "50rem" }}
  rows={10}
  responsive="scroll"
  onRowClick={(event) => {
    setSelectedRow(event.data);
    getAlternatives(event.data);
  }}
  selection={selectedRow}
  expandedRows={[selectedRow]}
>
  
            <Column field="doctorName" header="Doctor Name" sortable style={{ width: "15%", borderBottom: "1px solid #dee2e6" }} />
          <Column field="prescriptionDate" header="Prescription Date" sortable style={{ width: "15%", borderBottom: "1px solid #dee2e6" }} />
          <Column field="medicine.name" header="Name" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="medicine.availableQuantity" header="Quantity" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="medicine.price" header="Price" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="description" header="Description" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="medicine.medicinal_use" header="Usage" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="medicine.main_ingredient" header="Main Ingredient" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
          <Column field="medicine.ingredients" header="Ingredients" body={mainIngredientBody} style={{ width: '15%', borderBottom: '1px solid #dee2e6' }} />
          {PatientToken ? <Column header=" " body={AddToCartBody}  style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} /> : null}
        </DataTable>
      </div>
      </> : <Loading/> }
    </>
}