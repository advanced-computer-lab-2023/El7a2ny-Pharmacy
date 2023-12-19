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

export default function Perscriptions({ PatientToken }) {
  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };
  let {addToCart} = useContext(cartContext);

  const [Medicines, setMedicines] = useState();
  const [OriginalMedicines, setOriginalMedicines] = useState();

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
      setOriginalMedicines(updatedPrescriptions);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => { getAllMedicines('patients', PatientHeaders) }, [PatientToken]);

  function searchMedicines(searchVal , searchType) {
    if (searchVal.trim() === '') {
      setMedicines([...OriginalMedicines]);
    } else {
      const filteredMedicines = OriginalMedicines.filter(
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
            <h2 className="text-secondary">All Un-Filled Medicines :</h2>
          </div>
        </div>
        {/* <div className="col-7 ms-auto">
          <div className="rightHeader d-flex flex-column">
            <div className="searchContiner align-self-end ">
              <span className="p-input-icon-left me-2">
                <i className="pi pi-search" />
                <InputText placeholder="Medicine Name..." onChange={(e) => { searchMedicines(e.target.value, 'name') }} />
              </span>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText placeholder="Medicine Usage..." onChange={(e) => { searchMedicines(e.target.value, 'medicinal-use') }} />
              </span>
            </div>
          </div>
        </div> */}
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

  const AddToCartBody = (rowData) => <Button className='TabelButton approve' onClick={() => { addToCart(rowData.medicine._id) }}> <Icon size={20} className='m-0 mb-2' icon={shopping_cart_ok}></Icon> </Button>

  return (
    <>
      <Helmet>
        <title>Medicine List</title>
      </Helmet>
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
    </>
  );
}
