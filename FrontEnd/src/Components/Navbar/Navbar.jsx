import React, { useState ,useEffect } from 'react'
import Icon from 'react-icons-kit';
import { Link, useLocation } from 'react-router-dom'
import {userMd} from 'react-icons-kit/fa/userMd'
export default function NavBar({LogOut , PharmacistData , PatientData , AdminData}) {
  const [activeLink, setActiveLink] = useState();
  const location = useLocation();
  useEffect(()=>{
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setActiveLink(lastSegment || 'Home');
  }, [location.pathname]);

return <>
  <nav className={ `first-z navbar navbar-expand-lg bg-light shadow-sm navbar-light position-sticky top-0`}>
  <div className="container">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <h6 className='navbar-brand text-main m-0 d-flex align-items-center'><span><Icon size={30} icon={userMd}/></span><span className='me-1'>EL7A2NY</span> </h6>
    <div className="navbar-collapse collapse justify-content-between" id="navbarSupportedContent">
    <>
      <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'Home' ? ' active' : ''}`} to={""} onClick={() => setActiveLink('Home')}>
            Home
          </Link>
        </li>
        {PharmacistData || PatientData || AdminData ? <>
          {PatientData ? <>
            <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'AddMedicineDocs' ? ' active' : ''}`} to={`AddMedicineDocs`} onClick={() => setActiveLink('AddMedicineDocs')}>
          Add Medicine Docs
          </Link>
        </li>
          </>:null}
            {PatientData ? <>

            </>:null}

        {AdminData ?  <>
          <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'PharmacistRequests' ? ' active' : ''}`} to={`PharmacistRequests`} onClick={() => setActiveLink('PharmacistRequests')}>
          Pharmacist Requests
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'PharmacistList' ? ' active' : ''}`} to={`PharmacistList`} onClick={() => setActiveLink('PharmacistList')}>
          Pharmacist List
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'PatientList' ? ' active' : ''}`} to={`PatientList`} onClick={() => setActiveLink('PatientList')}>
          PatientList
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'AddAdmin' ? ' active' : ''}`} to={`AddAdmin`} onClick={() => setActiveLink('AddAdmin')}>
          ADD ADMIN
          </Link>
        </li>

        </>
      : null }
              <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'MedicineList' ? ' active' : ''}`} to={`MedicineList`} onClick={() => setActiveLink('MedicineList')}>
          Medicine List
          </Link>
        </li>

        
        </> : <>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'PatientLogin' ? ' active' : ''}`} to={`PatientLogin`} onClick={() => setActiveLink('PatientLogin')}>
          Patient Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'AdminLogin' ? ' active' : ''}`} to={`AdminLogin`} onClick={() => setActiveLink('AdminLogin')}>
          Admin Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'PharmacistLogin' ? ' active' : ''}`} to={`PharmacistLogin`} onClick={() => setActiveLink('PharmacistLogin')}>
          Pharmacist Login
          </Link>
        </li>

        </>}
      </ul>
    </> 
      <ul className='navbar-nav'>
      {PharmacistData || PatientData || AdminData ? <>
        <li className="nav-item position-relative dropdown">
          <span
            className={`cursor-pointer nav-link dropdown-toggle ${activeLink === 'MyProfile' ? ' active' : ''}`}
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className='pi pi pi-user me-1'></span> My Profile
          </span>
          <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
            {PatientData ? <>
            <Link className={`dropdown-item text-main ${activeLink === 'PatientDocs' ? ' active' : ''}`} to={"PatientDocs"} onClick={() => setActiveLink('PatientDocs')}>
              My Documents
            </Link>
            </>
            :
            null
            }
            {PharmacistData ? <>
            <Link className={`dropdown-item text-main ${activeLink === 'PatientDocs' ? ' active' : ''}`} to={"PharmacistDocs"} onClick={() => setActiveLink('PatientDocs')}>
              My Documents
            </Link>
            </>
            :null
            }
            <Link className={`dropdown-item text-main ${activeLink === 'ChangePassword' ? ' active' : ''}`} to={"ChangePassword"} onClick={() => setActiveLink('ChangePassword')}>
              Change Password
            </Link>


            <hr className='my-1'/>
            <Link className={`dropdown-item text-main ${activeLink === 'Logout' ? ' active' : ''}`}  onClick={() => { LogOut(); setActiveLink('Logout')}}>Logout</Link>
          </div>
        </li>
      </> : <>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'PharmacistRegister' ? ' active' : ''}`} to={`PharmacistRegister`} onClick={() => setActiveLink('PharmacistRegister')}>Signup as a Pharmacist</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === 'PatientRegister' ? ' active' : ''}`} to={`PatientRegister`} onClick={() => setActiveLink('PatientRegister')}>Signup as a Patient</Link>
        </li>
      </>}
      </ul>
    </div>
  </div>
  </nav>
  </>
}