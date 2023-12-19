import React from 'react'
export default function Loading() {
  return <>
    <div className='loader h-100 d-flex align-items-center justify-content-center position-absolute top-0 w-100'>
      <i className='fas fa-3x fa-spin fa-spinner text-main'></i>
    </div>
  </>
}
