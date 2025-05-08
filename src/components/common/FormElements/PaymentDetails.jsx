import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form"; // Importing react-hook-form
import clsx from "clsx";
import { inputHoverStyle } from "../commonStyles";
import { ValidationErrorMessage } from "../ValidationErrorMessage/ValidationErrorMessage.jsx";
import {Cardaccepted} from './Cardaccepted'
import CustomerTitle from '../../../assets/data/json/CustomerTitle.json';

const PaymentDetails = ({ apiData }) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext(); // Using hook for form handling
  // const isCustomerPaying = watch("customerPayingOnFlight"); // this will be true/false
  const [passengerListArray, setpassengerListArray] = useState([]);
  const [showCustomerNameDetails, setshowCustomerNameDetails] = useState(true);

  // const [isCustomerPayingCheckbox, setisCustomerPayingCheckbox] = useState(
  //   false
  // );


  useEffect(() => {
    if (apiData) {
      const {
        Customer,
        EmailAddress,
      } = apiData?.paymentData?.PaymentRequest?.Customers;
      if (Customer) {
        setValue("title", Customer?.CustomerName?.Title);
        setValue("firstName", Customer?.CustomerName?.FirstName);
        setValue("lastName", Customer?.CustomerName?.LastName);
        setValue("emailAddress", EmailAddress);

        //update passenger list logic
        if (Customer != null && Customer != undefined) {
          if (Customer?.AgeGroup?.toUpperCase() === "ADULT") {
            setpassengerListArray(Customer.CustomerName);

            const normalizedList = Array.isArray(Customer.CustomerName)
              ? Customer.CustomerName
              : Customer.CustomerName
              ? [Customer.CustomerName]
              : [];
            setpassengerListArray(normalizedList);
            if (normalizedList) {
              if (normalizedList.length > 0) {
                //if customer details exist, then show Person Paying
                setshowCustomerNameDetails(false);
              } else {
                setshowCustomerNameDetails(true);
              }
            }
          }
        }
      }
    }
  }, apiData);

  const handleCheckboxChange = (e) => {
    // Get the checked status of the checkbox
    const isChecked = e.target.checked;
    setisCustomerPayingCheckbox(isChecked);
  };

  //Handle on blur event for validation
  const handleBlur = async (e) => {
    const fieldName = e.target.name;
    await trigger(fieldName);
  };

  return (
    <div>
      <div>
        <div className="payment-block" id="paymentDetails">
          {/* <h3 className="style-h2 billing-address-heading">Payment Details</h3> */}
          <h2
            className="font-light inline-flex flex-col justify-center items-start gap-xs leading-6 text-2xl lg:text-4xl leading-9 lg:leading-[48px] text-midnight-blue-500"
            data-testid="text-custom--text-custom"
            id="text-custom"
          >
            Payment details
          </h2>
          {/* //todo1 */}
          {<Cardaccepted />}

          {showCustomerNameDetails == false && (
            <div className="mb-[1.5rem]">
              <label
                htmlFor="title"
                id="titlelbl"
                className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500"
              >
                Person Paying
              </label>

              <div className="">
                {getValues("title")}{" "}
                {`${getValues("firstName")} ${getValues("lastName")}`}
              </div>
            </div>
          )}
          {showCustomerNameDetails && (
            <div className="">
              <div className="">
                <div className="mb-[1.5rem]">
                  <label
                    htmlFor="title"
                    id="titlelbl"
                    className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500"
                  >
                    Title
                  </label>
                  {errors.title?.message && (
                    <ValidationErrorMessage
                      errorMessage={errors.title?.message}
                    />
                  )}
                  {/* <div className=""> */}
                  <div className="relative w-1/2">
                    <select
                      {...register("title", { required: "Title is required" })}
                      aria-required="true"
                      tabIndex="105"
                      name="title"
                      id="title"
                      className={clsx(
                        "block w-full appearance-none rounded-lg border px-4 py-3 pr-10 font-mylius-modern text-midnight-blue-500 h-[52px] border-grey-600",
                        inputHoverStyle,
                        errors.title && "border-red-500 bg-red-200 pl-6"
                      )}
                    >
                      <option value="">Select a title</option>
                      {CustomerTitle.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>

                    {/* Custom dropdown arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
                        />
                      </svg>
                    </div>
                  </div>

                </div>
                <div className="mb-[1.5rem]">
                  <label
                    htmlFor="firstName"
                    id="firstNameLabel"
                    className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500"
                  >
                    First Name
                  </label>
                  {errors.firstName?.message && (
                    <ValidationErrorMessage
                      errorMessage={errors.firstName?.message}
                    />
                  )}
                  <div className="">
                    <input
                      className={clsx(
                        "block w-1/2 appearance-none rounded-lg border px-4 py-3 pr-10 font-mylius-modern text-midnight-blue-500 h-[52px] border-grey-600",
                        inputHoverStyle,
                        errors.firstName && "border-red-500 bg-red-200 pl-6"
                      )}
                      autoComplete="on"
                      maxLength="12"
                      size="10"
                      type="text"
                      name="firstName"
                      id="firstName"
                      tabIndex="310"
                      aria-required="true"
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-[1.5rem]">
                <label
                  htmlFor="LastName"
                  id="LastNameLabel"
                  className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500"
                >
                  Last Name
                </label>
                {errors.lastName?.message && (
                  <ValidationErrorMessage
                    errorMessage={errors.lastName?.message}
                  />
                )}
                <div className="">
                  <input
                    autoComplete="on"
                    maxLength="50"
                    size="37"
                    type="text"
                    className={clsx(
                      "block w-1/2 appearance-none rounded-lg border px-4 py-3 pr-10 font-mylius-modern text-midnight-blue-500 h-[52px] border-grey-600",
                      inputHoverStyle,
                      errors.lastName && "border-red-500 bg-red-200 pl-6"
                    )}
                    name="lastName"
                    id="lastName"
                    aria-required="true"
                    tabIndex="330"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* end of lastname */}
      </div>
    </div>
  );
};

export default PaymentDetails;
