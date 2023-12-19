import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ApiBaseUrl from "../Components/ApiBaseUrl";
export let cartContext = createContext();
export function CartContextProvider(props) {
    const [cartId, setCartId] = useState(null)
    const [numbOfCartItems, setNumbOfCartItems] = useState(0)
    
    let headers = {
        token:localStorage.getItem("UserToken")
    }
    function getLoggedUserCart(){
        return axios.get(ApiBaseUrl + `/api/v1/cart` ,
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }
    async function getCart(){
        let response = await getLoggedUserCart()
        if (response?.data?.status === 'success') {
            setNumbOfCartItems(response.data.numOfCartItems)
            setCartId(response.data.data._id)
        }
    }
    useEffect(()=>{
        getCart();
    },[])
    function addToCart(productId){
        return axios.post(ApiBaseUrl + `/api/v1/cart` ,
        {
            productId
        },
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }
    function removeItem(productId){
        return axios.delete(ApiBaseUrl + `/api/v1/cart/${productId}` ,
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }
    function updateProductCount(productId , count){
        return axios.put(ApiBaseUrl + `/api/v1/cart/${productId}` ,
        {
            count
        },
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }
    function clearUserCart(){
        return axios.delete(ApiBaseUrl + `/api/v1/cart` ,
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }
    function onlinePayment(cartId , shippingAddress){
        return axios.post(ApiBaseUrl + `/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` ,
        {
            shippingAddress : shippingAddress
        },
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }
    return <>
    <cartContext.Provider value={{setNumbOfCartItems , numbOfCartItems , cartId , onlinePayment, addToCart , getLoggedUserCart , removeItem , updateProductCount , clearUserCart}}>
        {props.children}
    </cartContext.Provider>
    </>
}