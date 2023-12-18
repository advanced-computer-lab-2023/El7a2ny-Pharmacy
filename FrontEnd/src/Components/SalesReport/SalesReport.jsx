import React , {useEffect , useState}from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Icon } from 'react-icons-kit';
import { InputText } from 'primereact/inputtext';
import {notepad_ok} from 'react-icons-kit/ikons/notepad_ok'

export default function SalesReport({PharmacistToken , AdminToken}) {
  let AdminHeaders = { 'Authorization': `Bearer ${AdminToken}` };
  let PharmacistHeaders = { 'Authorization': `Bearer ${PharmacistToken}` };

  const [AllSales, setAllSales] = useState();
  const [totalMedicinesSold, settotalMedicinesSold] = useState();
  const [totalMoney, settotalMoney] = useState();
  const getAllSales = async (role , header)=>{
    try {
      let {data} = await axios.get(ApiBaseUrl + `${role}/sales-report` , {headers : header});
      setAllSales(data.medicineSales);
      settotalMedicinesSold(data.totalMedicinesSold);
      settotalMoney(data.totalMoney)
    } catch (error) {
      console.error(error);
    }
  }
  const header = ()=>{
    return <>
    <div className="d-flex align-items-center justify-content-between">
        <div className="tableTitle">
            <h2 className='text-secondary'>ALL SALES :</h2>
        </div>
        <div className="headerData">
          <h5 className='text-secondary'>total Medicines Sold : {totalMedicinesSold} </h5>
          <h5 className='text-secondary'>total Money : {totalMoney} EGP</h5>
        </div>
    </div>
    </>
  }
  useEffect(()=>{
    switch (PharmacistToken || AdminToken) {
      case PharmacistToken:
        getAllSales('pharmacists' , PharmacistHeaders)
        break;
      case AdminToken:
        getAllSales('administrators' , AdminHeaders)
        break;
      default:
        break;
    }
  },[PharmacistToken , AdminToken])
  return <>
    <Helmet>
      <title>Sales Report</title>
    </Helmet>
    <div className="container my-3">
      <DataTable value={AllSales} header={header} paginator selectionMode="single" className={`dataTabel mb-4 text-capitalize AllList w-75 mx-auto`} dataKey={(row, index) => row.name + index} scrollable scrollHeight="100vh" tableStyle={{ minWidth: "50rem" }} rows={10} responsive="scroll">
            <Column field="name" header="Name" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="quantity" header="Quantity" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="total" header="price" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
      </DataTable>

    </div>
  </>
}
