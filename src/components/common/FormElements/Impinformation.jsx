import React from 'react'

export const Impinformation = ({apiData,finalAmount}) => {
  return (
    <div className='message info-icon terms-condition relative'>
        <h3 className='mb-[1rem] font-mylius-modern font-light inline-flex flex-col justify-center
         items-start gap-2 leading-snug text-2xl lg:text-4xl leading-9 lg:leading-[48px]
          text-midnight-blue-500'>Important information</h3>
        <ul className='ml-[0] list-disc font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-2 leading-snug font-open-sans text-base leading-6 text-midnight-blue-500'>
            <li className="PEGPAY">You will not receive a paper ticket. An e-ticket will be sent to <span className="!font-bold personaldata">testy.tester@ba.com</span>.</li>
            <li>Please check the details of the items purchased are correct before continuing.</li>
            <li><span id="termsPayText">Selecting 'Pay' will confirm your purchase</span><span id="termsPayAviosText">  and charge  <b><span id="cashValLogOut"><strong className='!font-bold'>£{finalAmount}</strong></span></b> to your payment card.</span></li>
            <li>If you notice a mistake after you have paid for your ticket(s), we will allow you to cancel your flight booking and claim a full refund without penalty (including any corporate card), up to 24 hours from when you make the original booking. Refunds under these circumstances can only be requested by calling our contact centres. <a className="modal-link tertiaryLink" data-inline-modal="false" data-close-option="both" data-close-text="Close" data-modal-class="small-modal ivsg-style" data-body-close="true" data-content-id="main-content" href="https://cugdev786.baplc.com/badirect/book-with-confidence/public/en_gb" tabIndex="365">Terms and conditions</a> apply</li>
            <li>You will be billed in the currency your fare is quoted in. Your bank and card issuer may apply additional fees for credit card transactions originating from some countries e,g, South Korea (Foreign Transaction Fee).</li>
        </ul>
    </div>
  )
}
