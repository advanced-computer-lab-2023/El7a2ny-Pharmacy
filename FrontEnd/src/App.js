import { RouterProvider, createHashRouter } from 'react-router-dom';
import { useState , useEffect } from 'react'

import Layout from './Components/Layout/Layout';
import PharmacistRegister from './Components/PharmacistRegister/PharmacistRegister';
import Notfound from './Components/Notfound/Notfound';
import AddAdmin from './Components/AddAdmin/AddAdmin';
import PatientList from './Components/PatientList/PatientList';
import PatientRegister from './Components/PatientRegister/PatientRegister';
import PatientDetails from './Components/PatientDetails/PatientDetails';
import Home from './Components/Home/Home';
import PharmacistList from './Components/PharmacistList/PharmacistList';
import MedicineList from './Components/MedicineList/MedicineList';
import EditMedicine from './Components/EditMedicine/EditMedicine';
import AdminOtpLogin from './Components/AdminOtpLogin/AdminOtpLogin';
import PatientLogin from './Components/PatientLogin/PatientLogin';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import PatientOtpLogin from './Components/PatientOtpLogin/PatientOtpLogin';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import PharmacistOtpLogin from './Components/PharmacistOtpLogin/PharmacistOtpLogin';
import PharmacistLogin from './Components/PharmacistLogin/PharmacistLogin';
import PharmacistDocs from './Components/PharmacistDocs/PharmacistDocs';
import AddMedicine from './Components/AddMedicine/AddMedicine';
import { jwtDecode } from 'jwt-decode';

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
      path: "",element:<Layout AdminData={AdminData} setAdminData={setAdminData} PatientData={PatientData} setPatientData={setPatientData} PharmacistData={PharmacistData} setPharmacistData={setPharmacistData}/>,
      children:[
        {index:true , element:<Home/>},
        {path : "AdminOtpLogin",element:<AdminOtpLogin/>},
        {path : "PatientLogin",element:<PatientLogin/>},
        {path : "AdminLogin",element:<AdminLogin/>},
        {path : "AddMedicine",element:<AddMedicine/>},
        {path : "PatientOtpLogin",element:<PatientOtpLogin/>},
        {path : "ChangePassword",element:<ChangePassword/>},
        {path : "PharmacistOtpLogin",element:<PharmacistOtpLogin/>},
        {path : "PharmacistLogin",element:<PharmacistLogin/>},
        {path : "PharmacistDocs",element:<PharmacistDocs/>},
        {path : "Home",element:<Home/>},
        {path : "PharmacistRegister",element:<PharmacistRegister/>},
        {path : "MedicineList",element:<MedicineList/>},
        {path : "PharmacistList",element:<PharmacistList/>},
        {path : "AddAdmin",element:<AddAdmin AdminToken={AdminToken}/>},
        {path : "PatientList",element:<PatientList/>},
        {path : "EditMedicine/:id",element:<EditMedicine/>},
        {path : "PatientDetails/:id",element:<PatientDetails/>},
        {path : "PatientRegister",element:<PatientRegister/>},
        {path : "*",element:<Notfound/>}
      ]
    }
  ])
  return <>
      <RouterProvider router={routes}></RouterProvider>
    </>
}
export default App;