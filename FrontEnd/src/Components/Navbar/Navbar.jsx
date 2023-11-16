import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export default function NavBar({LogOut , PharmacistData , PatientData , AdminData}) {
  const [activeLink, setActiveLink] = useState('Home');
  return <>
    <nav className={ `first-z navbar navbar-expand-lg bg-light shadow-sm navbar-light position-sticky top-0`}>
  <div className="container ">
    <Link className="navbar-brand" to={""}>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="navbar-collapse collapse justify-content-between" id="navbarSupportedContent">
    <>
      <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'Home' ? ' active' : ''}`} to={""} onClick={() => setActiveLink('Home')}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'PharmacistList' ? ' active' : ''}`} to={`PharmacistList`} onClick={() => setActiveLink('PharmacistList')}>
          Pharmacist List
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'AddMedicine' ? ' active' : ''}`} to={`AddMedicine`} onClick={() => setActiveLink('AddMedicine')}>
          Add Medicine
          </Link>
        </li>

        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'MedicineList' ? ' active' : ''}`} to={`MedicineList`} onClick={() => setActiveLink('MedicineList')}>
          Medicine List
          </Link>
        </li>

        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'AddAdmin' ? ' active' : ''}`} to={`AddAdmin`} onClick={() => setActiveLink('AddAdmin')}>
          AddAdmin
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'PatientList' ? ' active' : ''}`} to={`PatientList`} onClick={() => setActiveLink('PatientList')}>
          PatientList
          </Link>
        </li>

      </ul>
    </> 
      <ul className='navbar-nav'>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'PharmacistRegister' ? ' active' : ''}`} to={`PharmacistRegister`} onClick={() => setActiveLink('PharmacistRegister')}>Signup as a Pharmacist</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'PatientRegister' ? ' active' : ''}`} to={`PatientRegister`} onClick={() => setActiveLink('PatientRegister')}>Signup as a Patient</Link>
        </li>
      </ul>
    </div>
  </div>
  </nav>
  </>
}