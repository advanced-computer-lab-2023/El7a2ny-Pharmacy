import { RouterProvider, createHashRouter } from 'react-router-dom';
import { useState , useEffect } from 'react'

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        
import Layout from './Components/Layout/Layout';
import Notfound from './Components/Notfound/Notfound';
import PatientList from './Components/PatientList/PatientList';
import PatientRegister from './Components/PatientRegister/PatientRegister';
import PatientDetails from './Components/PatientDetails/PatientDetails';
import Home from './Components/Home/Home';

import PharmacistRegister from './Components/PharmacistRegister/PharmacistRegister';
import PharmacistList from './Components/PharmacistList/PharmacistList';
import MedicineList from './Components/MedicineList/MedicineList';
import PharmacistOtpLogin from './Components/PharmacistOtpLogin/PharmacistOtpLogin';
import PharmacistLogin from './Components/PharmacistLogin/PharmacistLogin';
import PharmacistDocs from './Components/PharmacistDocs/PharmacistDocs';

import AdminOtpLogin from './Components/AdminOtpLogin/AdminOtpLogin';
import PatientLogin from './Components/PatientLogin/PatientLogin';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import PatientOtpLogin from './Components/PatientOtpLogin/PatientOtpLogin';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import { jwtDecode } from 'jwt-decode';
import AdminForgetPassword from './Components/AdminForgetPassword/AdminForgetPassword';
import PharmacistRequests from './Components/PharmacistRequests/PharmacistRequests';
import AddAdmin from './Components/AddAdmin/AddAdmin';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import SalesReport from './Components/SalesReport/SalesReport';
import Perscriptions from './Components/Perscriptions/Perscriptions';
import { CartContextProvider } from './Context/CartContext';
import Cart from './Components/Cart/Cart';
import MyAddresses from './Components/MyAddresses/MyAddresses';
import AllOrders from './Components/AllOrders/AllOrders';
import Checkout from './Components/Checkout/Checkout';


function App() {
  const [PharmacistData, setPharmacistData] = useState(null);
  const [PharmacistToken, setPharmacistToken] = useState(null);

  const [AdminData, setAdminData] = useState(null);
  const [AdminToken, setAdminToken] = useState(null);

  const [PatientData, setPatientData] = useState(null);
  const [PatientToken, setPatientToken] = useState(null);

  function savePharmacistData(){
    let encodedPharmacistToken = localStorage.getItem("PharmacistToken");
    let decodedPharmacistToken = jwtDecode(encodedPharmacistToken);
    setPharmacistData(decodedPharmacistToken);
    setPharmacistToken(encodedPharmacistToken)
  }

  function savePatientData(){
    let encodedPatientToken = localStorage.getItem("PatientToken");
    let decodedPatientToken = jwtDecode(encodedPatientToken);
    setPatientData(decodedPatientToken);
    setPatientToken(encodedPatientToken);
  }

  function saveAdminData(){
    let encodedAdminToken = localStorage.getItem("AdminToken");
    let decodedAdminToken = jwtDecode(encodedAdminToken);
    setAdminData(decodedAdminToken);
    setAdminToken(encodedAdminToken)
  }

  useEffect(() => {
    localStorage.getItem("PharmacistToken") ? savePharmacistData() : null ;
    localStorage.getItem("PatientToken") ? savePatientData() : null ;
    localStorage.getItem("AdminToken") ? saveAdminData() : null ;
  }, []);

  const routes = createHashRouter([
    {
      path: "",element:<Layout PharmacistToken={PharmacistToken} PatientToken={PatientToken} AdminData={AdminData} setAdminData={setAdminData} PatientData={PatientData} setPatientData={setPatientData} PharmacistData={PharmacistData} setPharmacistData={setPharmacistData}/>,
      children:[
        {index:true , element:<Home/>},
        {path : "AdminOtpLogin",element:<AdminOtpLogin/>},
        {path : "PatientRegister",element:<PatientRegister/>},
        {path : "PatientLogin",element:<PatientLogin savePatientData={savePatientData}/>},
        {path : "AdminLogin",element:<AdminLogin saveAdminData={saveAdminData}/>},
        {path : "PatientOtpLogin",element:<PatientOtpLogin/>},
        {path : "ChangePassword",element:<ChangePassword/>},
        {path : "PharmacistRegister",element:<PharmacistRegister/>},
        {path : "PharmacistOtpLogin",element:<PharmacistOtpLogin/>},
        {path : "PharmacistLogin",element:<PharmacistLogin savePharmacistData={savePharmacistData}/>},
        
        {path : "PharmacistDocs",element:<PharmacistDocs  PharmacistToken={PharmacistToken}/>},
        {path : "Home",element:<Home/>},
        {path : "AddAdmin",element:<AddAdmin AdminToken={AdminToken}/>},
        {path : "PharmacistRequests",element:<PharmacistRequests AdminToken={AdminToken}/>},
        {path : "SalesReport",element:<SalesReport AdminToken={AdminToken} PharmacistToken={PharmacistToken} />},
        {path : "AdminForgetPassword",element:<AdminForgetPassword/>},
        {path : "PatientList",element:<PatientList AdminToken={AdminToken}/>},
        {path : "PatientDetails/:id",element:<PatientDetails/>},

        {path : "Perscriptions",element:<Perscriptions PatientToken={PatientToken}/>},
        {path : "Cart",element:<Cart PatientToken={PatientToken}/>},
        {path : "MyAddresses",element:<MyAddresses PatientToken={PatientToken}/>},
        {path : "AllOrders",element:<AllOrders PatientToken={PatientToken}/>},
        {path : "Checkout",element:<Checkout PatientToken={PatientToken}/>},
        
        // Pharmacist Routes
        {path : "PharmacistList",element:<PharmacistList AdminToken={AdminToken}/>},
        {path : "MedicineList",element:<MedicineList PatientToken={PatientToken} AdminToken={AdminToken} PharmacistToken={PharmacistToken} PharmacistData={PharmacistData}/>},
        {path : "*",element:<Notfound/>}
        
      ]
    }
  ])
  return <>
    <PrimeReactProvider>
    <CartContextProvider>
      <RouterProvider router={routes}></RouterProvider>
    </CartContextProvider>
    </PrimeReactProvider>
    </>
}
export default App;