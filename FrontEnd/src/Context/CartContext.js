import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ApiBaseUrl from "../Components/ApiBaseUrl";
export let cartContext = createContext();
export function CartContextProvider(props) {
    const [numbOfCartItems, setNumbOfCartItems] = useState();
    const [IsInCart, setIsInCart] = useState(false);

    let PatientToken = localStorage.getItem('PatientToken')
    let headers = { 'Authorization': `Bearer ${PatientToken}` };
    function getLoggedUserCart(){
        return axios.get(ApiBaseUrl + `patients/view-cart` ,
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }
    async function getCart(){
        let response = await getLoggedUserCart()
        if (response?.status == 200) {
            setNumbOfCartItems(response.data.medicine_list.length)
        }
    }
    useEffect(()=>{
        getCart();
    },[])
    async function addToCart(productId){
        try {
            let response =await axios.patch(ApiBaseUrl + `patients/add-medicine-to-cart/${productId}` , {}, { headers });
            setNumbOfCartItems(response.data.medicine_list.length);
            setIsInCart(true)
            return response
        } catch (error) {
            console.error(error);
        }
    }
    function removeItem(productId){
        return axios.patch(ApiBaseUrl + `patients/remove-medicine-from-cart/${productId}` ,{}, { headers })
        .then((response) => {
            setIsInCart(false);
            console.log(response);
            return response
        })
        .catch((erorr) => erorr)
    }
    function updateProductCount(productId , quantity){
        return axios.patch(ApiBaseUrl + `patients/update-medicine-quantity-in-cart/${productId}` ,
        {
            quantity
        },
        {
            headers 
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }
    async function onlinePayment(){
        try {
            let response = await axios.post(ApiBaseUrl + `patients/credit-card-payment` ,{},{headers});
            console.log(response);
            return response
        } catch (error) {
            console.error(error);
        }
    }
    function PlaceOrder(values){
        return axios.post(ApiBaseUrl + `patients/place-order` ,
        {
            address : values.address ,
            payment_method : values.payment_method
        },
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }

    return <>
    <cartContext.Provider value={{setNumbOfCartItems , IsInCart ,PlaceOrder, numbOfCartItems  , onlinePayment, addToCart , getLoggedUserCart , removeItem , updateProductCount }}>
        {props.children}
    </cartContext.Provider>
    </>
}