import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'

export default function Layout({PharmacistData ,setPharmacistData , AdminData, setAdminData , PatientData, setPatientData }) {
  let navigate = useNavigate();
  function LogOut(){
    localStorage.removeItem("PharmacistToken")
    localStorage.removeItem("PatientToken")
    localStorage.removeItem("AdminToken")
    setPharmacistData(null)
    setAdminData(null)
    setPatientData(null)
    navigate("/")
  }

  return <>
  <div className="layout">
    <NavBar PharmacistData={PharmacistData} PatientData={PatientData} AdminData={AdminData} LogOut={LogOut}></NavBar>
    <Outlet></Outlet>
  </div>
    </>
}
