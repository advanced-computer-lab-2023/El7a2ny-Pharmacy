import React, { useState ,useEffect,useContext } from 'react'
import Icon from 'react-icons-kit';
import { Link, useLocation } from 'react-router-dom'
import {userMd} from 'react-icons-kit/fa/userMd'
import {out} from 'react-icons-kit/entypo/out'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {ic_payment} from 'react-icons-kit/md/ic_payment'
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import { cartContext } from '../../Context/CartContext'
import {login} from 'react-icons-kit/entypo/login'

export default function NavBar({LogOut , PharmacistData , PatientData , AdminData ,PatientToken, PharmacistToken }) {
  let {numbOfCartItems} = useContext(cartContext);

  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };
  let PharmacistHeaders = { 'Authorization': `Bearer ${PharmacistToken}` };
  const [activeLink, setActiveLink] = useState();
  const [WalletAmount, setWalletAmount] = useState();

  const handleGetWallet = ()=>{
      if (PatientToken) {
        getWalletAmount('patients' , PatientHeaders);
      }else if (PharmacistToken) {
        getWalletAmount('pharmacists' , PharmacistHeaders);
      }
  }
  const getWalletAmount = async (role , header)=>{
    try {
      let {data} = await axios.get(ApiBaseUrl + `${role}/my-wallet` , {headers : header})
      console.log(data);
      setWalletAmount(data)
    } catch (error) {
      
    }
  }
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
    <Link to={""} className='navbar-brand text-main m-0 d-flex align-items-center h-6'><span><Icon size={30} icon={userMd}/></span><span className='me-1'>EL7A2NY</span> </Link>
    <div className="navbar-collapse collapse justify-content-between" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0">
        {PharmacistData || PatientData || AdminData ? <>
          {PatientData ? <>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'perscriptions' ? ' active' : ''}`} to={`Perscriptions`} onClick={() => setActiveLink('perscriptions')}>
                Perscriptions
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
          {PharmacistData || AdminData ? <>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'SalesReport' ? ' active' : ''}`} to={`SalesReport`} onClick={() => setActiveLink('SalesReport')}>
              Sales Report
              </Link>
            </li>
          </>
          :null}
          <li className="nav-item">
            <Link className={`nav-link ${activeLink === 'MedicineList' ? ' active' : ''}`} to={`MedicineList`} onClick={() => setActiveLink('MedicineList')}>
            Medicine List
            </Link>
          </li>
          </> :
          null
        }
      </ul>
      <ul className='navbar-nav'>
        {PharmacistData || PatientData || AdminData ? <>
          <li className="nav-item position-relative dropdown">
            <span className={`cursor-pointer nav-link dropdown-toggle ${activeLink === 'MyProfile' ? ' active' : ''}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className='pi pi pi-user me-1'></span> My Profile 
            </span>
            <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
              {PatientData ? <>
                <Link className={`dropdown-item text-main ${activeLink === 'MyAddresses' ? ' active' : ''}`} to={"PharmacistDocs"} onClick={() => setActiveLink('MyAddresses')}>
                  My Addresses
                </Link>
                <Link className={`dropdown-item text-main ${activeLink === 'Orders' ? ' active' : ''}`} to={"PharmacistDocs"} onClick={() => setActiveLink('Orders')}>
                  All Orders
                </Link>
              </>
              :
              null
              }
              {PharmacistData ? <>
                <Link className={`dropdown-item text-main ${activeLink === 'PharmacistDocs' ? ' active' : ''}`} to={"PharmacistDocs"} onClick={() => setActiveLink('PharmacistDocs')}>
                  My Documents
                </Link>
                </>
                :null
              }
              <Link className={`dropdown-item text-main ${activeLink === 'ChangePassword' ? ' active' : ''}`} to={"ChangePassword"} onClick={() => setActiveLink('ChangePassword')}>
                Change Password
              </Link>
              <hr className='my-1'/>
              <Link className={`dropdown-item text-main ${activeLink === 'Logout' ? ' active' : ''}`}  onClick={() => { LogOut(); setActiveLink('Logout')}}><Icon size={20} icon={out}/> Logout</Link>
            </div>
          </li>
          {PatientData || PharmacistData ? <>
            <li className="nav-item position-relative dropdown">
              <span className={`cursor-pointer nav-link dropdown-toggle ${activeLink === 'MyProfile' ? ' active' : ''}`}  onClick={handleGetWallet} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <Icon size={20} icon={ic_payment}/> 
              </span>
              <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                <span className={`dropdown-item text-main`}>
                  {WalletAmount} EGP
                </span>
              </div>
            </li>
          </> : null}
          {PatientData ? 
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === 'Cart' ? ' cartActive' : ''}`} to={`Cart`} onClick={() => setActiveLink('Cart')}>
                <Icon size={20} icon={shoppingCart}/>
                <span  className='cart-Num p- badge bg-main text-white position-absolute top-0 end-0 rounded-circle'>{numbOfCartItems}</span>
              </Link>
            </li>
          : null }

        </> : <>
        <li className="nav-item position-relative dropdown">
            <span className={`cursor-pointer nav-link dropdown-toggle ${activeLink === 'MyProfile' ? ' active' : ''}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <Icon size={20}  icon={login}></Icon> LOGIN
            </span>
            <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
            <li className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
            <Link className={`dropdown-item text-main ${activeLink === 'PatientLogin' ? ' active' : ''}`} to={`PatientLogin`} onClick={() => setActiveLink('PatientLogin')}>
            Patient Login
            </Link>
          </li>
          <li className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
            <Link className={`dropdown-item text-main ${activeLink === 'PharmacistLogin' ? ' active' : ''}`} to={`PharmacistLogin`} onClick={() => setActiveLink('PharmacistLogin')}>
            Pharmacist Login
            </Link>
          </li>
          <li className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
            <Link className={`dropdown-item text-main ${activeLink === 'AdminLogin' ? ' active' : ''}`} to={`AdminLogin`} onClick={() => setActiveLink('AdminLogin')}>
            Admin Login
            </Link>
          </li>

            </div>
          </li>


          <li className="nav-item position-relative dropdown">
            <span className={`cursor-pointer nav-link dropdown-toggle ${activeLink === 'MyProfile' ? ' active' : ''}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className='pi pi pi-user me-1'></span> REGISTER
            </span>
            <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                <li className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
                  <Link className={`dropdown-item text-main ${activeLink === 'PharmacistRegister' ? ' active' : ''}`} to={`PharmacistRegister`} onClick={() => setActiveLink('PharmacistRegister')}>Signup as a Pharmacist</Link>
                </li>
                <li className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
                    <Link className={`dropdown-item text-main ${activeLink === 'PatientRegister' ? ' active' : ''}`} to={`PatientRegister`} onClick={() => setActiveLink('PatientRegister')}>Signup as a Patient</Link>
                </li>
            </div>
          </li>


        </>}
      </ul>
    </div>
  </div>
</nav>
</>
}