import React, { useContext , useEffect , useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";
export default function Cart({PatientToken}) {
  let {getLoggedUserCart , removeItem , updateProductCount , setNumbOfCartItems} = useContext(cartContext)
  const [cartDetails, setCartDetails] = useState()
  const [btnLoading, setBtnLoading] = useState(false)
  const [TotalPrice, setTotalPrice] = useState()
  async function getCart (){
    let response = await getLoggedUserCart()
    if (response?.status ===  200) {
      setCartDetails(response.data.medicine_list);
      setTotalPrice(response.data.total)
    }else{
      setCartDetails(response.message)
    }
  }
  async function deleteItem(productId){
    setBtnLoading(true)
    try {
      let response = await removeItem(productId)
      getCart()
    } catch (error) {
      console.error(error);
    }
    // 
    // setCartDetails(response.data.data);
    // setNumbOfCartItems(response.data.medicine_list.length)
    // toast.success('Product Removed' , {
    //   className : 'first-z mt-5 bg-main-light text-danger ',
    //   duration:2000})
    //   
      setBtnLoading(false)
  }
  
  async function updateProductQuantity(productId , quantity){
    setBtnLoading(true)
    try {
      let response = await updateProductCount(productId , quantity)
      toast.success('Product Count Updated' , {
      className : 'first-z mt-5 bg-main-light text-main ',
      duration:2000})
      getCart()
      setBtnLoading(false)
  } catch (error) {
      console.error(error);
      setBtnLoading(false)
    }
  }

  useEffect(()=>{
    if (PatientToken) {
      getCart()
    }
  },[PatientToken])
  return <>
  <Helmet>
      <title>Cart Details</title>
    </Helmet>
  {cartDetails? 
    <div className="container bg-light my-4 p-4 position-relative shadow-sm border rounded">
        {btnLoading ?
        <div className="overlayLoading">
          <i className='text-main fa fa-spin fa-spinner fs-1'></i>
        </div>
          : null}
      <h3>Shop Cart :</h3> 
      {cartDetails? <>
      <h6 className='text-main'>Total Cart Price : {TotalPrice} EGP</h6>
      </>
      :
      <h3 className='text-main h6'>Your Cart IS Empty</h3>
      }
      {cartDetails?.map((product)=> <div key={product._id} className='row border-bottom py-2 my-2 align-items-center'>
      <div className="col-3 col-md-2 col-lg-1">
        <img src={product.medicine.pictureUrl} className='w-100 rounded' alt="" />
      </div>
      <div className="col-9 col-md-10 col-lg-11 ">
        <div className="row">
          <div className='productDetails col-6'>

          <h6>{product.medicine.title}</h6>
          <h6 className='text-main'>price : {product.medicine.price} EGP</h6>
          </div>
          <div className='countContainer col-3'>
            <button onClick={()=>{updateProductQuantity(product.medicine._id , product.quantity+1)}} className='btn border-main btn-sm p-1'>+</button>
            <span className='mx-1'>{product.quantity}</span>
            <button onClick={()=>{updateProductQuantity(product.medicine._id , product.quantity-1)}} className='btn border-main btn-sm p-1'>-</button>
          </div>
          <div className="col-2">
          <button onClick={()=>{deleteItem(product.medicine._id)}} className='btn'><i className='fa-regular fa-trash-can text-danger'></i> Remove Item </button>
          </div>
        </div>
      </div>
      </div>)}
      {cartDetails? <button className='btn bg-main btn-sm d-block'>
        <Link className='text-light' to={'/checkout'}>
          Checkout
        </Link>
      </button>:null }
    </div>
  :
  <Loading/>}
  </>
}
