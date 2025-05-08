import React, { useEffect, useState } from "react";
import {useFormContext} from 'react-hook-form';
import {ValidationErrorMessage} from '../ValidationErrorMessage/ValidationErrorMessage'
import {
  BillingadcpHeading,
  Billingadcpwarning,
  BillingadcpAddressWarning,
  BillingadcpPostcode,
  BillingadcpLine1,
  BillingadcpLine2,
  BillingadcpLine3,
  CountryRegion,
  BillingadcpLine2warning,
  BillingadcpLine1warning,
  BillingadcpPostcodeLbl 
} from "../../../assets/data/json/resource.json";


export const BillingAddress = ({BillingAddressData}) => {
  //use props BillingAddressData to populate below states
  const [postCode, setPostCode] = useState('');
  const [Country, setCountry] = useState('');
  const {
    register,
    watch,
    clearErrors,
    trigger, setValue,
    formState: { errors, touchedFields },
  } = useFormContext();
  // let billingCountries=[];
  const [billingCountries, setBillingCountries] = useState([]);

  const isBillingCountrySelected=watch("billingCountry");
  const getCountryNameFromCode = (code,billingCountries) => {
    const country = billingCountries.find(
      (country) => country.countryCode === code?.toUpperCase()
    );
    if (country) {
      setCountry(country.countryName);
      setValue('Country',country.countryName)
    } else {
      // console.log('Country not found for code:', code);
      setCountry('');
    }
  };
useEffect(() => {
  const billingAddressData = BillingAddressData?.preparePaymentResponse?.billingAddressInformation?.billingAddressSample;

  if (billingAddressData) {
    const { line1, line2, line3, postalCode } = billingAddressData;

  }

  const billingData = BillingAddressData?.preparePaymentResponse?.billingCountries;
  const CountryOfResidence = BillingAddressData?.paymentData?.PaymentRequest?.CountryOfResidence;

  if (billingData?.billingCountries) {
    getCountryNameFromCode(CountryOfResidence,billingData?.billingCountries);

  }
}, [Country,BillingAddressData]);

//Handle on blur event for validation
const handleBlur = async (e) => {
  const fieldName = e.target.name;
  await trigger(fieldName);
};

  return (
    <>
    {/* { isBillingCountrySelected && */}
     <div>
      <div className="payment-block" id="billingAddressDetails">
        <h3 
        // className="style-h2 billing-address-heading">
        className="mb-[1rem] text-[1.5rem] font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-2 leading-snug text-base leading-7 text-midnight-blue-500">
          {BillingadcpHeading}
        </h3>
        <div>
          <p className="mb-[12px] list-disc font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-2 leading-snug font-open-sans text-base leading-6 text-midnight-blue-500">{Billingadcpwarning}</p>
          <div className="mb-[1.5rem]">
            <label htmlFor="PostalCode" id="postalCodeLabel"
            className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500"> 
            
              {BillingadcpPostcodeLbl}
            </label>
            {errors.postCode?.message && (
                      <ValidationErrorMessage
                        errorMessage={errors.postCode?.message}
                      />
                    )}
            <div className="">
              <input
                  {...register("postCode", { required: "Post Code is required" })}
                className={`mt-1 border relative rounded-lg h-[52px] ps-2 flex items-center focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500 bg-white-white border-gray-600 ${errors.postCode ? 'border-red-500 bg-red-200 pl-6' : 'border-grey-600'}`}
                autoComplete="on"
                maxLength="12"
                size="37"
                type="text"
                name="postCode"
                id="PostalCode"
                tabIndex="310"
                aria-required="true"
                onChange={(e) => {
                  setValue('postCode', e.target.value, { shouldValidate: true });
                }}
                onBlur={handleBlur}
              />
            </div>
            <div
              aria-describedby="postalCodeLabel"
              id="reqPostalCode"
              role="alert"
              hidden="hidden"
            >
              {BillingadcpPostcode}
            </div>
            <input value="" name="KEY_STREET" type="hidden" />
            <input value="" name="KEY_CITY" type="hidden" />
           
          </div>
          <div hidden="hidden" id="CheckAddressCardRegexError">
            {BillingadcpAddressWarning}{" "}
          </div>
          <div className="mb-[1.5rem]">
            <label htmlFor="AddressLine1" id="addressLine1Label"
            className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500">
              {BillingadcpLine1}
            </label>
            {errors.addressline1?.message && (
                      <ValidationErrorMessage
                        errorMessage={errors.addressline1?.message}
                      />
                    )}
            <div className="">
              <input
                {...register("addressline1", { required: "Address Line 1 is required" })}
                autoComplete="on"
                maxLength="50"
                size="37"
                type="text"
                className={`mt-1 border relative rounded-lg h-[52px] ps-2 flex items-center focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500 bg-white-white border-gray-600 ${errors.addressline1 ? 'border-red-500 bg-red-200 pl-6' : 'border-grey-600'}`}
                name="addressline1"
                id="AddressLine1"
                aria-required="true"
                tabIndex="330"
                onChange={(e) => {
                  setValue('addressline1', e.target.value, { shouldValidate: true });
                }}
                onBlur={handleBlur}
              />
            </div>
            
            
          </div>
          <div className="mb-[1.5rem]">
            <label htmlFor="AddressLine2" id="addressLine2Label"
            className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500">
              {BillingadcpLine2}
            </label>
            {errors.addressline2?.message && (
                      <ValidationErrorMessage
                        errorMessage={errors.addressline2?.message}
                      />
                    )}
            <div className="">
              <input
                {...register("addressline2", { required: "Address Line 2 is required" })}
                autoComplete="on"
                maxLength="50"
                size="37"
                type="text"
                // className="mt-1 border rounded-lg h-[52px] ps-2 flex items-center focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500 bg-white-white border-grey-600"
                className={`mt-1 border relative rounded-lg h-[52px] ps-2 flex items-center focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500 bg-white-white border-gray-600 ${errors.addressline2 ? 'border-red-500 bg-red-200 pl-6' : 'border-grey-600'}`}
                name="addressline2"
                id="AddressLine2"
                aria-required="true"
                tabIndex="331"
                onChange={(e) => {
                  setValue('addressline2', e.target.value, { shouldValidate: true });
                }}
                onBlur={handleBlur}

              />
            </div>
            
          </div>
          <div className="mb-[1.5rem]">
            <label htmlFor="AddressLine3" id="addressLine3Label"
            className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500">
              {BillingadcpLine3}
              <span className="field-option">(optional)</span>
            </label>
            {errors.addressline3?.message && (
                      <ValidationErrorMessage
                        errorMessage={errors.addressline3?.message}
                      />
                    )}
            <div className="">
              <input
                {...register("addressline3", { required: "Address Line 3 is required" })}
                autoComplete="on"
                maxLength="50"
                size="37"
                type="text"
                className={`mt-1 border relative rounded-lg h-[52px] ps-2 flex items-center focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500 bg-white-white border-gray-600 ${errors.addressline3 ? 'border-red-500 bg-red-200 pl-6' : 'border-grey-600'}`}
                name="addressline3"
                id="AddressLine3"
                tabIndex="335"
                onChange={(e) => {
                  setValue('addressline3', e.target.value, { shouldValidate: true });
                }}
                onBlur={handleBlur}
              />
            </div>
            
          </div>
          <div className="mb-[1.5rem]">
            <label htmlFor="DispCountry"
            className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500"
            >{CountryRegion}</label>
            <div className="">
              <input
                readOnly
                {...register("Country")}
                size="37"
                maxLength="50"
                type="text"
                name="Country"
                className="mt-1 border rounded-lg h-[52px] ps-2 flex items-center focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500 bg-white-white border-grey-600"
                id="DispCountry"
                tabIndex="-1"
                onChange={(e) => {
                  setValue('Country', e.target.value, { shouldValidate: true });
                }}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BillingAddress;
