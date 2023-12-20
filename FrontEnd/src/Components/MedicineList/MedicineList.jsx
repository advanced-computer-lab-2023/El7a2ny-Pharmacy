import React, { useEffect, useState ,useContext } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Icon } from 'react-icons-kit';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import {notepad_ok} from 'react-icons-kit/ikons/notepad_ok'
import { cartContext } from '../../Context/CartContext'
import {shopping_cart_ok} from 'react-icons-kit/ikons/shopping_cart_ok'
import {shopping_cart_delete} from 'react-icons-kit/ikons/shopping_cart_delete'
import Loading from '../Loading/Loading';

export default function MedicineList({PharmacistToken , PatientToken , AdminToken}) {
  let AdminHeaders = { 'Authorization': `Bearer ${AdminToken}` };
  let PharmacistHeaders = { 'Authorization': `Bearer ${PharmacistToken}` };
  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };

  let {addToCart , IsInCart} = useContext(cartContext);

  const [Medicines, setMedicines] = useState()
  const [OrignalMedicines, setOrignalMedicines] = useState()
  const [DisplayAddMedicineDialog, setDisplayAddMedicineDialog] = useState(false);
  const [displayEditDialog, setDisplayEditDialog] = useState(false);
  const [SelectedMedicine, setSelectedMedicine] = useState(null);
  async function getAllMedicines(role , header) {
      try {
        const response = await axios.get(ApiBaseUrl + `${role}/all-medicines` , {headers : header})
        setMedicines(response.data);
        setOrignalMedicines(response.data);
      } catch (error) {
        console.error(error);
    }
  }
  async function getOverCounterMedicines(role , header) {
    try {
      const response = await axios.get(ApiBaseUrl + `${role}/over-the-counter-medicines` , {headers : header})
      setMedicines(response.data);
      setOrignalMedicines(response.data);
    } catch (error) {
      console.error(error);
  }
}

  async function addNewMedicine(values){
    try {
      let {data} = await axios.post(ApiBaseUrl +'pharmacists/add-medicine' , values , {headers : PharmacistHeaders})
      formik.resetForm();
      hideDialog()
      getAllMedicines('pharmacists' , PharmacistHeaders);
    } catch (error) {
      console.error(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      medicinal_use: '',
      main_ingredient: '',
      description: '',
      availableQuantity: '',
      price: '',
      ingredients: '',
      name: '',
      pictureUrl: '',
      isOverTheCounter : false,
      isArchived : false,
    },
    validationSchema: Yup.object().shape({
      medicinal_use: Yup.string().required('medicinal use is required'),
      main_ingredient: Yup.string().required('main ingredient is required'),
      availableQuantity: Yup.number().required('Quantity is required'),
      price: Yup.number().required('price is required'),
      ingredients: Yup.string().required('ingredients is required'),
      description: Yup.string().required('description is required'),
      name: Yup.string().required('name is required')
    }),
    onSubmit: (values) => addNewMedicine(values)
  })

let editInitial = {
  medicinal_use: '',
  main_ingredient: '',
  description: '',
  availableQuantity: '',
  price: '',
  ingredients: '',
  name: '',
  pictureUrl: '',
}
  let editFormik = useFormik({
    initialValues: editInitial,
    validationSchema: Yup.object().shape({
      medicinal_use: Yup.string().required('medicinal use is required'),
      main_ingredient: Yup.string().required('main ingredient is required'),
      availableQuantity: Yup.number().required('Quantity is required'),
      price: Yup.number().required('price is required'),
      ingredients: Yup.string().required('Ingredients are required'),
      description: Yup.string().required('description is required'),
      name: Yup.string().required('name is required')
    }),
    onSubmit: (values) => editMedicine(SelectedMedicine._id , values)
  })
useEffect(()=>{
  if (SelectedMedicine) {
    editInitial = {
      medicinal_use: SelectedMedicine.medicinal_use,
      main_ingredient: SelectedMedicine.main_ingredient,
      description: SelectedMedicine.description,
      availableQuantity: SelectedMedicine.availableQuantity,
      price: SelectedMedicine.price,
      ingredients: SelectedMedicine.ingredients.toString(),
      name: SelectedMedicine.name,
      isArchived: SelectedMedicine.isArchived,
      isOverTheCounter : SelectedMedicine.isOverTheCounter
    }   
  }
  editFormik.setValues(editInitial)
},[SelectedMedicine]);

  async function editMedicine(id , values){
    try {
      console.log(values);
      let {data} = await axios.patch(ApiBaseUrl +`pharmacists/update-medicine/${id}` , values , {headers : PharmacistHeaders});
      console.log(data);
      getAllMedicines('pharmacists' , PharmacistHeaders);
      setDisplayEditDialog(false);
      formik.resetForm();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    switch (PharmacistToken || PatientToken || AdminToken) {
      case PatientToken:
        getOverCounterMedicines('patients' , PatientHeaders)
        break;
      case PharmacistToken:
        getAllMedicines('pharmacists' , PharmacistHeaders)
        break;
      case AdminToken:
        getAllMedicines('administrators' , AdminHeaders)
        break;
  
      default:
        break;
    }
    
  },[PharmacistToken , PatientToken , AdminToken])

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

  const showDialog = () => {
    setDisplayAddMedicineDialog(true);
  };

  const showEditDialog = () => {
    setDisplayEditDialog(true);
  };

  const hideDialog = () => {
    setDisplayAddMedicineDialog(false);
    setDisplayEditDialog(false);
    formik.resetForm();
  };

  const header = (
    <div className="d-flex justify-content-between col-12">
      <div className="row w-100">
        <div className="col-5">
          <div className="tableTitle mt-1">
            <h2 className='text-secondary'>All Medicines :</h2>
          </div>
        </div>
        <div className="col-7 ms-auto">
          <div className="rightHeader d-flex flex-column">
            {PharmacistToken ?
              <div className="addBtn align-self-end me-1">
                <Button label="ADD MEDICINE" icon="pi pi-plus" className="mb-2 rounded" onClick={showDialog} />
              </div>
            :null}
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

  const mainIngredientBody = (rowData) => rowData.ingredients.map((medicine, index) => <span key={index}>{medicine}</span>).reduce((acc, span, index) => index === 0 ? span : [acc, ' - ', span], null);
  const dialogHeader = ()=>  <h2 className='text-muted d-flex align-items-center'><Icon size={30} icon={notepad_ok}/><span>ADD NEW MEDICINE</span></h2>
  const editDialogHeader = ()=>  <h2 className='text-muted d-flex align-items-center'><Icon className='me-2' size={30} icon={notepad_ok}/><span className='me-2'>Edit MEDICINE</span> </h2>

  const actionTemplate = (rowData) => {
    return (
      <div className='d-flex justify-content-around align-items-center'>
        <Button icon="pi pi-pencil" className='TabelButton approve' onClick={() => { setSelectedMedicine(rowData); showEditDialog() }} />
      </div>
    );
  };

  const handleImageUpload = async (file, id) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      let { data } = await axios.patch(ApiBaseUrl + `pharmacists/upload-medicine-image/${id}`,formData, { headers: PharmacistHeaders });
      getAllMedicines('pharmacists' , PharmacistHeaders);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImgBody = (rowData) => {
    if (rowData.pictureUrl) return <img src={rowData.pictureUrl} alt="Medicine" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
    else return <label htmlFor={`uploadInput_${rowData._id}`} className='cursor-pointer'>
                  <i className="pi pi-upload text-main h5"></i>
                  <input type="file" id={`uploadInput_${rowData._id}`} style={{ display: 'none' }} onChange={(e) => handleImageUpload(e.target.files[0], rowData._id)} />
                </label>
  };
    
  const AddToCartBody = (rowData) => <Button className='TabelButton approve' onClick={() => { addToCart(rowData._id) }}> <Icon size={20} className='m-0 mb-2' icon=  { IsInCart ? shopping_cart_delete : shopping_cart_ok}></Icon> </Button>
  
  return <>
    <Helmet>
      <title>Medicine List</title>
    </Helmet>
    {Medicines ? <>
    <div className="container-fluid  centerContainer">
          <DataTable value={Medicines} header={header} paginator selectionMode="single" className={`dataTabel mb-4 text-capitalize AllList`} dataKey="_id" scrollable scrollHeight="100vh" tableStyle={{ minWidth: "50rem" }} rows={10} responsive="scroll">
            <Column field="name" header="Name" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="availableQuantity" header="Quantity" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="price" header="price" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="description" header="description" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="sales" header="sales" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="medicinal_use" header="use" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field="main_ingredient" header="main ingredient" sortable style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} />
            <Column field='ingredients' header="ingredients" body={mainIngredientBody} style={{ width: '15%', borderBottom: '1px solid #dee2e6' }} />
            {PharmacistToken ? <Column header="edit" body={actionTemplate}  style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} /> : null}
            {PharmacistToken ? <Column header="Image" body={uploadImgBody}  style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} /> : null}
            {PatientToken ? <Column header=" " body={AddToCartBody}  style={{ width: "10%", borderBottom: '1px solid #dee2e6' }} /> : null}
          </DataTable>
      <Dialog header={dialogHeader} className='container' visible={DisplayAddMedicineDialog} onHide={hideDialog} modal>
          <form onSubmit={formik.handleSubmit} className='bg-light p-3 border shadow-sm rounded'>
            <div className="row">
              <div className="col-sm-6 form-floating">
                {/*name input */}
                <input type="text" placeholder='Name' className="form-control mb-2" id="name" name="name"value={formik.values.name}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
                <label className='ms-2' htmlFor="username">NAME</label>
                {formik.errors.name && formik.touched.name ? (<div className="alert alert-danger">{formik.errors.name}</div>) : null}
              </div>
              <div className="col-sm-6 form-floating">
                {/*medicinal_use input */}
                <input type="text" placeholder='Medicinal Usage' className="form-control mb-2" id="medicinal_use" name="medicinal_use"value={formik.values.medicinal_use}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
                <label className='ms-2' htmlFor="medicinal_use">Medicinal Usage</label>
                {formik.errors.medicinal_use && formik.touched.medicinal_use ? (<div className="alert alert-danger">{formik.errors.medicinal_use}</div>) : null}
              </div>
              <div className="col-sm-8 form-floating">
                {/*description input */}
                <input type="text" placeholder='Description' className="form-control mb-2" id="description" name="description"value={formik.values.description}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
                <label className='ms-2' htmlFor="description">Description</label>
                {formik.errors.description && formik.touched.description ? (<div className="alert alert-danger">{formik.errors.description}</div>) : null}
              </div>
              <div className="col-sm-2 form-floating">
                {/*price input */}
                <input type="number" placeholder='Price' className="form-control mb-2" id="price" name="price"value={formik.values.price}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
                <label className='ms-2' htmlFor="price">Price</label>
                {formik.errors.price && formik.touched.price ? (<div className="alert alert-danger">{formik.errors.price}</div>) : null}
              </div>
              <div className="col-sm-2 form-floating">
                {/*availableQuantity input */}
                <input type="number" placeholder='availableQuantity' className="form-control mb-2" id="availableQuantity" name="availableQuantity"value={formik.values.availableQuantity}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
                <label className='ms-2' htmlFor="availableQuantity">Quantity</label>
                {formik.errors.availableQuantity && formik.touched.availableQuantity ? (<div className="alert alert-danger">{formik.errors.availableQuantity}</div>) : null}
              </div>
              <div className="col-sm-12 form-floating">
                {/*ingredients input */}
                <input type="text" placeholder='ingredients' className="form-control mb-2" id="ingredients" name="ingredients"value={formik.values.ingredients}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
                <label className='ms-2' htmlFor="ingredients">Ingredients</label>
                {formik.errors.ingredients && formik.touched.ingredients ? (<div className="alert alert-danger">{formik.errors.ingredients}</div>) : null}
              </div>
              <div className="col-sm-12 form-floating">
                {/*main_ingredient input */}
                <input type="text" placeholder='Main Ingredient' className="form-control mb-2" id="main_ingredient" name="main_ingredient"value={formik.values.main_ingredient}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
                <label className='ms-2' htmlFor="main_ingredient">Main Ingredient</label>
                {formik.errors.main_ingredient && formik.touched.main_ingredient ? (<div className="alert alert-danger">{formik.errors.main_ingredient}</div>) : null}
              </div>
              <div className="col-sm-5 ms-2">
                <div className="form-check form-switch mx-0 mt-2 align-items-center">
                  <label className="form-check-label" htmlFor="isOverTheCounter">
                    <span className='h6'>over the counter ?</span>
                  </label>
                  <input className="form-check-input mt-2" role="switch" value={formik.values.isOverTheCounter} onChange={formik.handleChange} onBlur={formik.handleBlur} type="checkbox" name="isOverTheCounter" id="isOverTheCounter" />
                </div>
              </div>
              <div className="btns ms-auto w-auto mt-2">
                <Button label="SUBMIT" type="submit" icon="pi pi-check" disabled={!(formik.isValid && formik.dirty)}className="btn bg-main text-light "/>
              </div>
            </div> 
          </form>
      </Dialog>
      <Dialog header={editDialogHeader} className='container' visible={displayEditDialog} onHide={hideDialog} modal>
          <form onSubmit={editFormik.handleSubmit} className='bg-light p-3 border shadow-sm rounded'>
            <div className="row">
              <div className="col-sm-6 form-floating">
                {/*name input */}
                <input type="text" placeholder='Name' className="form-control mb-2" id="name" name="name"value={editFormik.values.name}onChange={editFormik.handleChange}onBlur={editFormik.handleBlur}/>
                <label className='ms-2' htmlFor="username">NAME</label>
                {editFormik.errors.name && editFormik.touched.name ? (<div className="alert alert-danger">{editFormik.errors.name}</div>) : null}
              </div>
              <div className="col-sm-6 form-floating">
                {/*medicinal_use input */}
                <input type="text" placeholder='Medicinal Usage' className="form-control mb-2" id="medicinal_use" name="medicinal_use"value={editFormik.values.medicinal_use}onChange={editFormik.handleChange}onBlur={editFormik.handleBlur}/>
                <label className='ms-2' htmlFor="medicinal_use">Medicinal Usage</label>
                {editFormik.errors.medicinal_use && editFormik.touched.medicinal_use ? (<div className="alert alert-danger">{editFormik.errors.medicinal_use}</div>) : null}
              </div>
              <div className="col-sm-8 form-floating">
                {/*description input */}
                <input type="text" placeholder='Description' className="form-control mb-2" id="description" name="description"value={editFormik.values.description}onChange={editFormik.handleChange}onBlur={editFormik.handleBlur}/>
                <label className='ms-2' htmlFor="description">Description</label>
                {editFormik.errors.description && editFormik.touched.description ? (<div className="alert alert-danger">{editFormik.errors.description}</div>) : null}
              </div>
              <div className="col-sm-2 form-floating">
                {/*price input */}
                <input type="number" placeholder='Price' className="form-control mb-2" id="price" name="price"value={editFormik.values.price}onChange={editFormik.handleChange}onBlur={editFormik.handleBlur}/>
                <label className='ms-2' htmlFor="price">Price</label>
                {editFormik.errors.price && editFormik.touched.price ? (<div className="alert alert-danger">{editFormik.errors.price}</div>) : null}
              </div>
              <div className="col-sm-2 form-floating">
                {/*availableQuantity input */}
                <input type="number" placeholder='availableQuantity' className="form-control mb-2" id="availableQuantity" name="availableQuantity"value={editFormik.values.availableQuantity}onChange={editFormik.handleChange}onBlur={editFormik.handleBlur}/>
                <label className='ms-2' htmlFor="availableQuantity">Quantity</label>
                {editFormik.errors.availableQuantity && editFormik.touched.availableQuantity ? (<div className="alert alert-danger">{editFormik.errors.availableQuantity}</div>) : null}
              </div>
              <div className="col-sm-8 form-floating">
                {/*ingredients input */}
                <input type="text" placeholder='ingredients' className="form-control mb-2" id="ingredients" name="ingredients"value={editFormik.values.ingredients}onChange={editFormik.handleChange}onBlur={editFormik.handleBlur}/>
                <label className='ms-2' htmlFor="ingredients">Ingredients</label>
                {editFormik.errors.ingredients && editFormik.touched.ingredients ? (<div className="alert alert-danger">{editFormik.errors.ingredients}</div>) : null}
              </div>
              <div className="col-sm-4 form-floating">
                {/*main_ingredient input */}
                <input type="text" placeholder='Main Ingredient' className="form-control mb-2" id="main_ingredient" name="main_ingredient"value={editFormik.values.main_ingredient}onChange={editFormik.handleChange}onBlur={editFormik.handleBlur}/>
                <label className='ms-2' htmlFor="main_ingredient">Main Ingredient</label>
                {editFormik.errors.main_ingredient && editFormik.touched.main_ingredient ? (<div className="alert alert-danger">{editFormik.errors.main_ingredient}</div>) : null}

              </div>
              <hr className='my-2'/>
              <div className="col-sm-5 ms-2">
                <div className="form-check form-switch mx-0 mt-2 align-items-center">
                  <label className="form-check-label" htmlFor="isOverTheCounter">
                    <span className='h6'>over the counter ?</span>
                  </label>
                  <input checked={editFormik.values.isOverTheCounter} className="form-check-input mt-2" role="switch" value={SelectedMedicine?.isOverTheCounter} onChange={editFormik.handleChange} onBlur={editFormik.handleBlur} type="checkbox" name="isOverTheCounter" id="isOverTheCounter" />
                </div>
                <div className="form-check form-switch mx-0 mt-2 align-items-center">
                  <label className="form-check-label" htmlFor="isArchived">
                    <span className='h6'>Archive Medicine ?</span>
                  </label>
                  <input checked={editFormik.values.isArchived} className="form-check-input mt-2" role="switch" value={SelectedMedicine?.isArchived} onChange={editFormik.handleChange} onBlur={editFormik.handleBlur} type="checkbox" name="isArchived" id="isArchived" />
                </div>
              </div>
              <div className="btns ms-auto w-auto mt-3">
                <Button label="SUBMIT" type="submit" icon="pi pi-check" disabled={!(editFormik.isValid && editFormik.dirty)}className="btn bg-main text-light "/>
              </div>
            </div> 
          </form>
      </Dialog>

    </div>
    </> : <Loading/>}
    </>
}