import React from 'react'
import {Helmet} from "react-helmet";
export default function Home() {
  return <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <main>
      <div className="homePage d-flex justify-content-center align-items-center">
      <h4 className='headLine first-z'>Welcome in our medical services website </h4>
      </div>
    </main>
    </>
}