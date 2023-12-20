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
import {bellO} from 'react-icons-kit/fa/bellO'
export default function NavBar({LogOut , PharmacistData , PatientData , AdminData ,PatientToken, PharmacistToken }) {
  let {numbOfCartItems} = useContext(cartContext);
  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };
  let PharmacistHeaders = { 'Authorization': `Bearer ${PharmacistToken}` };
  const [activeLink, setActiveLink] = useState();
  const [WalletAmount, setWalletAmount] = useState();
  const [Notification, setNotification] = useState("No Avialable Notifications");
  const location = useLocation();

  const NavItem = ({ to, text, activeLink, onClick }) => (
    <li className="nav-item">
      <Link to={to} className={`nav-link ${activeLink === to ? 'active' : ''}`} onClick={() => onClick(to)} > {text} </Link>
    </li>
  );

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
      setWalletAmount(data)
    } catch (error) {
      console.error(error);
    }
  }

  const getNotification = async()=>{
    try {
      let {data} = await axios.get(ApiBaseUrl +`pharmacists/notifications` ,  {headers : PharmacistHeaders});
      if (data.length > 0) {
        setNotification(data);
        console.log("ehhh");
      }
      console.log(Notification);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
    
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
            <NavItem to="perscriptions" text="Prescriptions" activeLink={activeLink} onClick={setActiveLink} />
          </>:null}
          {AdminData ?  <>
            <NavItem to="PharmacistRequests" text="Pharmacist Requests" activeLink={activeLink} onClick={setActiveLink} />
            <NavItem to="PharmacistList" text="Pharmacist List" activeLink={activeLink} onClick={setActiveLink} />
            <NavItem to="PatientList" text="Patient List" activeLink={activeLink} onClick={setActiveLink} />
            <NavItem to="AddAdmin" text="AddAdmin" activeLink={activeLink} onClick={setActiveLink} />
            </>
          : null }
          {PharmacistData || AdminData ? <>
            <NavItem to="SalesReport" text="Sales Report" activeLink={activeLink} onClick={setActiveLink} />
          </>
          :null}
          <NavItem to="MedicineList" text="Medicine List" activeLink={activeLink} onClick={setActiveLink} />
          </> :
          null
        }
      </ul>
      <ul className='navbar-nav'>
      {PharmacistData ? 
            <li className="nav-item position-relative dropdown">
            <span className={`cursor-pointer nav-link dropdown-toggle`}  onClick={getNotification} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <Icon size={20} icon={bellO}/> 
            </span>
            <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
              <span className={`dropdown-item text-main`}>
                hey , {Notification} 
              </span>
            </div>
          </li>
        : null }
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

        {PharmacistData || PatientData || AdminData ? <>
          <li className="nav-item position-relative dropdown">
            <span className={`cursor-pointer nav-link dropdown-toggle ${activeLink === 'MyProfile' ? ' active' : ''}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className='pi pi pi-user me-1'></span> My Profile 
            </span>
            <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
              {PatientData ? <>
                <Link className={`dropdown-item text-main ${activeLink === 'Orders' ? ' active' : ''}`} to={"AllOrders"} onClick={() => setActiveLink('Orders')}>
                  All Orders
                </Link>
                <Link className={`dropdown-item text-main ${activeLink === 'MyAddresses' ? ' active' : ''}`} to={"MyAddresses"} onClick={() => setActiveLink('MyAddresses')}>
                  My Addresses
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
        </> : <>
        <li className="nav-item position-relative dropdown">
            <span className={`cursor-pointer nav-link dropdown-toggle ${activeLink === '' ? ' active' : ''}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <Icon size={20}  icon={login}></Icon> LOGIN
            </span>
            <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
              <span className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
                <Link className={`dropdown-item text-main ${activeLink === 'PatientLogin' ? ' active' : ''}`} to={`PatientLogin`} onClick={() => setActiveLink('PatientLogin')}>
                Patient Login
                </Link>
              </span>
              <span className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
                <Link className={`dropdown-item text-main ${activeLink === 'PharmacistLogin' ? ' active' : ''}`} to={`PharmacistLogin`} onClick={() => setActiveLink('PharmacistLogin')}>
                Pharmacist Login
                </Link>
              </span>
              <span className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
                <Link className={`dropdown-item text-main ${activeLink === 'AdminLogin' ? ' active' : ''}`} to={`AdminLogin`} onClick={() => setActiveLink('AdminLogin')}>
                Admin Login
                </Link>
              </span>
            </div>
          </li>
          <li className="nav-item position-relative dropdown">
            <span className={`cursor-pointer nav-link dropdown-toggle ${activeLink === 'MyProfile' ? ' active' : ''}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className='pi pi pi-user me-1'></span> REGISTER
            </span>
            <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                <span className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
                  <Link className={`dropdown-item text-main ${activeLink === 'PharmacistRegister' ? ' active' : ''}`} to={`PharmacistRegister`} onClick={() => setActiveLink('PharmacistRegister')}>Pharmacist Register</Link>
                </span>
                <span className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
                    <Link className={`dropdown-item text-main ${activeLink === 'PatientRegister' ? ' active' : ''}`} to={`PatientRegister`} onClick={() => setActiveLink('PatientRegister')}>Patient Register</Link>
                </span>
            </div>
          </li>
        </>}
      </ul>
    </div>
  </div>
</nav>
</>
}