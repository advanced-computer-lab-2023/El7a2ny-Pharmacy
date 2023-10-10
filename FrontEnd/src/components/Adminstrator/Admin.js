import React, { useState } from 'react'

const Admin = () => {
  return (
    <>
        <div id='admin-head'></div>

        <div id='admin-control-panel'>

          <form id='add-admin'>
            <h2>Add an Admin</h2>

            <input type="text" placeholder="User name" name="username" id="username"></input>
            <input type="password" placeholder="Password" name="password" id="password"></input>
            <input type="submit" id="submit"></input>
            <label for="submit">SUBMIT</label>
          </form>

          <form id='admin-remove'>
            <h2>Remove a Pharmacist or Patient</h2>

            <input type="radio" id="Pharmacist" name="pha-or-pat" value="Pharmacist"></input>
            <label for="Pharmacist">Pharmacist</label><br></br>

            <input type="radio" id="Patient" name="pha-or-pat" value="Patient"></input>
            <label for="Patient">Patient</label><br></br>

            <input type="text" placeholder="User name" name="username" id="username"></input>
            <input type="password" placeholder="Password" name="password" id="password"></input>
            <input type="submit" id="submit"></input>
            <label for="submit">SUBMIT</label>
          </form>

        </div>

        <div id='admin-info-board'>
          <div id='admin-joining-req'> {/* Should be rendered dynamicly */}
            <div id='joining-req-card'>
              <div className='joining-data'></div>
              <div className='joining-accept-btn'><input type="button" onClick={console.log("Accepted")} value="Accept" id="" ></input></div>
              <div className='joining-reject-btn'><input type="button" onClick={console.log("Rejected")} value="Reject" id=""></input></div>
            </div>
          </div>
          <div id='admin-patient-view'></div>
          <div id='admin-pharmacist-view'></div>
        </div>
        
        
    </>
  )
}

export default Admin