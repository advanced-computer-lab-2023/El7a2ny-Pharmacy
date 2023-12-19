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
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [OrignalSales, setOrignalSales] = useState()
  const getAllSales = async (role , header)=>{
    try {
      let {data} = await axios.get(ApiBaseUrl + `${role}/sales-report` , {headers : header});
      setAllSales(data.medicineSales);
      setOrignalSales(data.medicineSales);
      settotalMedicinesSold(data.totalMedicinesSold);
      settotalMoney(data.totalMoney)
    } catch (error) {
      console.error(error);
    }
  }

  const handleDateRangeChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  function handleSalesDate(){
    AdminToken ? filterSalesDate('administrators' , AdminHeaders):null;
    PharmacistToken ? filterSalesDate('pharmacists' , PharmacistHeaders):null;
  }  

  const filterSalesDate = async (role , header) => {
    try {
      const { data } = await axios.get(ApiBaseUrl + `${role}/sales-report-filter-by-date/${dateRange.start}/${dateRange.end}`,{headers : header});
      console.log(data);
      setAllSales(data.medicineSales);
      settotalMedicinesSold(data.totalMedicinesSold);
      settotalMoney(data.totalMoney)

    } catch (error) {
      console.error(error);
    }
  };

  function searchSalesName(searchVal) {
    if (searchVal.trim() === '') {
      setAllSales([...OrignalSales]);
    } else {
      const filteredPharmacists = OrignalSales.filter((sale) => sale.name.toLowerCase().includes(searchVal.toLowerCase()));
      setAllSales([...filteredPharmacists]);
    }
  }

  const header = ()=>{
    return <>
    <div className="d-flex align-items-center justify-content-between">
        <div className="tableTitle">
            <h2 className='text-secondary'>SALES REPORT</h2>
          <div className="headerData">
            <h5 className='text-main'>Medicines Sold : <span className='text-muted'>{totalMedicinesSold}</span> </h5>
            <h5 className='text-main'>Revenue :  <span className='text-muted'>{totalMoney} EGP</span></h5>
          </div>
        </div>
        <div className="rightHeader d-flex flex-column align-items-end">
          <div className="searchContiner mb-2">
            <span className="p-input-icon-left align-self-end">
              <i className="pi pi-search" />
              <InputText placeholder="Search By Name..." onChange={(e) => { searchSalesName(e.target.value) }} />
            </span>
          </div>
          <div className="dateContair  d-flex  justify-content-around align-items-stretch">
            <div className="startDate form-floating me-2">    
              <input type="date" placeholder="Start Date" className="form-control  mb-0"id="start"name="start" value={dateRange.start}onChange={handleDateRangeChange}/>
              <label className='' htmlFor="start">Start Date </label>
            </div>
            <div className="endDate me-2 form-floating">
              <input type="date" className="form-control mb-0" id="end"name="end"value={dateRange.end}onChange={handleDateRangeChange}/>
              <label className='' htmlFor="end">End Date </label>
            </div>
            <Button icon="pi pi-search" className='rounded px-4 me-1' onClick={handleSalesDate} size="larg"/>
            <Button icon="pi pi-ban" severity='secondary' className='rounded px-4' onClick={handleRole} size="larg"/>
          </div>
        </div>
    </div>
    </>
  }
  
  const handleRole = ()=>{    
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
}
  useEffect(()=>{
    handleRole()
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
