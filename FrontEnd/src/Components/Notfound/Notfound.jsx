import React from 'react'
import notfound from '../../assets/error.svg'
import {Helmet} from "react-helmet";
export default function Notfound() {
  return <>
  <Helmet>
      <title>El7a2ny | Notfound</title>
    </Helmet>
    <div className='w-50 mx-auto'>
      <img className='w-100' src={notfound} alt="" />
    </div>
    </>
}
