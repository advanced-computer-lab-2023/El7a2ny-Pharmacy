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

        <div id='admin-info-board'></div>
        
        
    </>
  )
}

export default Admin