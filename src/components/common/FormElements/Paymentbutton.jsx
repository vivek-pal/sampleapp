import React from 'react'
import { useFormContext } from 'react-hook-form';
// import {Submit,MakeaBooking} from '../../assets/data/json/resource.json'

export const Paymentbutton = ({pageType}) => {
  return (
    <>
      <div data-testid="payment-button">
        <button className='md:py-3.5 md:px-6 py-0 px-0 justify-center items-center inline-flex text-center text-base font-mylius-modern font-normal tracking-tight rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:outline-1 min-w-[145px] px-6 min-h-12 gap-2' type='submit'> 
          {pageType.toUpperCase() === "PAYMENT" ? "Pay Now" : "Submit"}
        </button>
      </div>
    </>
  )
}
