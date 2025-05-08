import React, { useEffect, useState } from "react";
import { useFormContext } from 'react-hook-form';  // Importing react-hook-form

// import "./Payment.css";
import {
  PaymentSumcpHeading1,
  PaymentSumcpHeading,
  PaymentSumcpFlightLbl,
  PaymentSumcpTotDue,
} from "../../assets/data/json/resource.json"; 

export const PaymentSummary = ({ apiData }) => {
  const [surchargeAmount, setsurchargeAmount] = useState("");
  const [totalAmount, settotalAmount] = useState("");
  const [currencyCodeValue, setCurrencyCodeValue] = useState("");
  const { register,watch, formState: { errors }, setValue,getValues ,clearErrors } = useFormContext(); // Using hook for form handling
  const surchargeIfAny=watch('currentCardSurcharge');

//set surcharge on change of drop down  
useEffect(()=>{
if(surchargeIfAny){
  setsurchargeAmount(surchargeIfAny);
}

//update total amount
if(surchargeIfAny && surchargeIfAny!="" ){
  const totAmt=Number(totalAmount)+Number(surchargeIfAny);
  settotalAmount(totAmt);
}
},[surchargeIfAny])


//set total amount
  useEffect(() => {
    //populate data from json
    if (apiData) {
      const { Amount, CurrencyCode } = apiData?.paymentData?.PaymentRequest;
      if (Amount?.Cash) {
        settotalAmount(Amount.Cash.Amount);
      }
      if (CurrencyCode) {
        // console.log(CurrencyCode);
        setCurrencyCodeValue(CurrencyCode);
      }
    }
  }, [apiData]);

  return (
    <>
      <section
        data-testid="login-banner"
        role="banner"
        className="flex flex-col md:flex-row w-full overflow-hidden rounded-lg shadow-[0px_2px_6px_0px_rgba(46,92,153,0.15)] bg-white"
      >
        <div
          className="flex-1 rounded-t-lg p-4 md:rounded-l-lg md:rounded-tr-none md:p-6"
          role="region"
          aria-label="image-banner-content"
        >
          <div>
            <div className="min-h-[220px]" id="payment-summary-table">
              {/* <h2 className="!text-[2rem] sm:!text-[1.6rem]
              leading-[2rem] sm:leading-[2.5rem]
              mt-[0.3rem] mb-[0.5rem]
              !important !text-[#000000] !mt-[-10px] !mb-[7px]"> */}
              <h2 className="mb-[1rem] text-[1.5rem] font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-2 leading-snug text-base leading-7 text-midnight-blue-500">
                {PaymentSumcpHeading}
              </h2>
              <div className="border-t-[0.1rem] border-t-[#0293DB] pt-5 pb-5">
                <p
                  className="font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-2 leading-snug text-base leading-7 text-midnight-blue-500"
                >
                  {PaymentSumcpFlightLbl}
                </p>
                <p className="float-right text-right">
                  <input
                    value=""
                    id="hiddenAmount"
                    name="hiddenAmount"
                    type="hidden"
                  />
                  <span className="text-primaryBlue">£</span>
                  <span className="text-primaryBlue">{totalAmount}</span>
                </p>
              </div>
              {surchargeIfAny && (
                <div className="mb-[1rem]">
                  <p
                    className="font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-2 leading-snug text-base leading-7 text-midnight-blue-500"
                  >
                    Surcharge
                  </p>
                  <p className="float-right text-right">
                    <span className="text-primaryBlue">£</span>
                    <span className="text-primaryBlue">{surchargeAmount}</span>
                  </p>
                </div>
              )}
              <div style={{ display: "none" }} id="ccRow">
                <p id="ccRowData">Credit card fee for booking</p>
                <p className="float-right text-right">
                  <input
                    value="13.02"
                    id="hiddenAmount"
                    name="hiddenAmount"
                    type="hidden"
                  />
                  <span className="text-primaryBlue">£</span>
                  <span className="text-primaryBlue">13.02</span>
                </p>
              </div>
              <div className="border-t-[0.1rem] border-t-[#0293DB] pt-5">
                <p className="">{PaymentSumcpTotDue}</p>
                <p
                  id="totalPrice"
                  className=" !text-[2.4rem] text-right w-[60%] float-left not-italic"
                >
                  <span className="">
                    £{totalAmount} ({currencyCodeValue})
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
