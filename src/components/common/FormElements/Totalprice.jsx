import React from 'react'

export const Totalprice = () => {
  return (
    <div className='mb-[3rem] relative w-full payment-block total-price'>
        <label>Total price</label>
        <p><span id="detailsTotalPrice">£661.12 (GBP)</span><span className="surcharge-info" id="detailsTotalPriceSurcharge">&nbsp;</span></p>
    </div>
  )
}
