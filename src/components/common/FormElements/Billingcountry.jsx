import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form"; // Importing react-hook-form
import BillingcountryJSON from "../../../assets/data/json/billingCountry.json";
import clsx from "clsx";
import { inputHoverStyle } from "../commonStyles";
import { ValidationErrorMessage } from "../ValidationErrorMessage/ValidationErrorMessage";

export const Billingcountry = () => {
  const [countries, setCountries] = useState([]);
  // const [selectedCountry, setSelectedCountry] = useState("GB");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
  } = useFormContext(); // Using hook for form handling

  // Fetch the countries data from the JSON file
  useEffect(() => {
    // Access the countries array under 'BillingCountries.Country'
    setCountries(BillingcountryJSON.BillingCountries.Country);
  }, []);

  // Handle selection change
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  // Register the field manually
  useEffect(() => {
    register("billingCountry", {
      required: "Billing country/region is required",
    });
  }, [register]);

  return (
    <div id="BillingCountryFieldRow" className="mb-[3rem] relative w-full">
      <label
        id="CardSchemeCodeLabel"
        className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500"
        htmlFor="CardSchemeCode"
      >
        Billing country / region
      </label>
      {errors.billingCountry && (
        <p className="mt-1 text-sm text-red-600">
          <ValidationErrorMessage
            errorMessage={errors.billingCountry.message}
          />
        </p>
      )}
      {/* Billing country dropdown */}
      {/* <div className="input-icon max-w-[29rem] relative w-full"> */}
      <div className="relative w-1/2">
        <select
          aria-required="true"
          tabIndex="105"
          name="CardSchemeCode1"
          id="CardSchemeCode1"
          data-cardschemecode="1"
          value={selectedCountry}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedCountry(value); // <- This is key!
            setValue("billingCountry", value);
            if (value) {
              clearErrors("billingCountry");
            }
          }}
          className={clsx(
            "block w-full appearance-none rounded-lg border px-4 py-3 pr-10 font-mylius-modern text-midnight-blue-500 h-[52px] border-grey-600",
            inputHoverStyle,
            errors.billingCountry && "border-red-500 bg-red-200 pl-6"
          )}
        >
          <option value="">Select billing country/region</option>
          {/* Map over the countries array and render options */}
          {Array.isArray(countries) &&
            countries.map((country) => (
              <option key={country.CountryCode} value={country.CountryCode}>
                {country.CountryName}
              </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <div className="ICON" aria-hidden="true">
            <div aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9246 1.37787C18.5164 3.28184 17.0076 4.98539 15.4989 6.68893C13.9901 8.39248 12.3808 10.096 10.7715 11.6994C10.3691 12.1002 9.66507 12.1002 9.26273 11.6994C8.45807 10.8977 7.6534 9.99582 6.84873 9.09394C6.04407 8.19207 5.2394 7.29019 4.53532 6.38831C3.02657 4.58455 1.51782 2.78079 0.109652 0.776617C-0.0915146 0.576199 0.00906752 0.275573 0.210234 0.0751557C0.4114 -0.025053 0.612568 -0.025053 0.813734 0.0751557C2.62423 1.7787 4.33415 3.38204 5.94348 5.08559C6.74815 5.98747 7.55282 6.78914 8.35748 7.69102C9.16215 8.5929 9.96681 9.39457 10.6709 10.3967L9.16215 10.3967C10.6709 8.69311 12.2802 6.98956 13.8896 5.38622C15.7001 3.78288 17.41 2.17954 19.2205 0.676409C19.4216 0.475992 19.7234 0.5762 19.9246 0.776618C20.0251 0.977035 20.0251 1.17745 19.9246 1.37787Z"
                  fill="#021B41"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
