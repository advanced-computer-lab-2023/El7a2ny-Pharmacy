import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'

export default function Layout() {
  return <>
  <div className="layout">
    <NavBar></NavBar>
    <Outlet></Outlet>
  </div>
    </>
}
