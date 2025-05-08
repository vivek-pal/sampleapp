import { React, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ValidationErrorMessage } from "../ValidationErrorMessage/ValidationErrorMessage";

export const Expirydate = () => {
  const {
    register,
    watch,
    clearErrors,
    trigger,
    formState: { errors, touchedFields },
  } = useFormContext();

  // Watch the values of expiryMonth and expiryYear
  const expiryMonth = watch("expiryMonth");
  const expiryYear = watch("expiryYear");

  // Check if the expiryMonth or expiryYear input was touched and has an error
  const isExpiryMonthTouched = touchedFields.expiryMonth;
  const isExpiryYearTouched = touchedFields.expiryYear;

  // Determine if error exists in any field (MM or YY)
  const hasError = errors.expiryMonth || errors.expiryYear;

  // Handler for blur event to trigger validation
  const handleBlur = async () => {
    // Trigger validation for month and year fields on blur
    await trigger(["expiryMonth", "expiryYear"]);
  };

  useEffect(() => {
    // Clear errors when either month or year changes
    clearErrors(["expiryMonth", "expiryYear"]);
  }, [clearErrors]);

  // Custom validation function to check if the month and year are greater than or equal to the current date
  const validateExpiryDate = (watch) => () => {
    const month = parseInt(watch("expiryMonth"), 10);
    const year = parseInt(watch("expiryYear"), 10);
  
    if (isNaN(month) || isNaN(year)) {
      return "Enter a valid expiry date";
    }
  
    const now = new Date();
    const inputDate = new Date(2000 + year, month - 1); // assumes YY format
    const today = new Date(now.getFullYear(), now.getMonth());
  
    if (inputDate < today) {
      return "Expiry date must not be in the past";
    }
  
    return true;
  };
  

  return (
    <div className="flex flex-col" data-testid="expiryDate--inputdate">
      <label className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500"
        id="ExpiryDateLabel"
      >
        Expiry date
      </label>
      {(errors.expiryMonth?.message || errors.expiryYear?.message) && (
        <ValidationErrorMessage
          errorMessage={
            errors.expiryMonth?.message || errors.expiryYear?.message
          }
        />
      )}

      <div className="flex flex-row gap-2">
        {/* Expiry Month */}
        <div className="w-60">
          <div className="flex flex-col gap-y-1"
            data-testid="expiryMonth--inputtext">
            <label className="font-light inline-flex flex-col justify-center items-start gap-xs leading-6 font-open-sans text-base text-xs text-gray-700 h-5"
              htmlFor="expiryMonth--inputtext--input"
              data-testid="expiryMonth--inputtext--labelhint"
              id="expiryMonth--inputtext--labelhint">
              MM
            </label>

            <div className={`mt-1 border relative rounded-lg h-[52px] ps-2 flex items-center focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500 bg-white-white border-gray-600 ${errors.expiryMonth ? 'border-red-500 bg-red-200 pl-6' : 'border-grey-600'}`}
            >
              {errors.expiryMonth && (
                <div className="absolute inset-y-0 left-3 flex h-2 w-2 self-center rounded-full bg-red-500"></div>
              )}
              <input
                data-testid="expiryMonth--inputtext--input"
                id="expiryMonth--inputtext--input"
                min="1"
                max="12"
                type="text"
                maxLength="2"
                className="!w-1/2"
                aria-describedby="expiryDate--inputdate--error"
                aria-required="true"
                aria-label="MM"
                {...register("expiryMonth", {
                  required: "Enter a valid expiry date",
                  pattern: {
                    value: /^(0?[1-9]|1[0-2])$/,
                    message: "Enter a valid expiry date",
                  },
                })}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>

        {/* Expiry Year */}
        <div className="flex-1 flex-col w-24">
          {/* <div className="flex flex-col gap-y-1" */}
          <div className="w-60"
            data-testid="expiryYear--inputtext">
            <label className="font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-xs leading-6 font-open-sans text-base leading-6 text-xs text-gray-700 h-5"
              htmlFor="expiryYear--inputtext--input"
              data-testid="expiryYear--inputtext--labelhint"
              id="expiryYear--inputtext--labelhint">
              YY
            </label>

            <div className={`mt-1 border relative rounded-lg h-[52px] ps-2 flex items-center focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500 bg-white-white border-gray-600 ${errors.expiryYear ? 'border-red-500 bg-red-200 pl-6' : 'border-grey-600'}`}>
              {errors.expiryYear && (
                <div className="absolute inset-y-0 left-3 flex h-2 w-2 self-center rounded-full bg-red-500"></div>
              )}
              <input
                data-testid="expiryYear--inputtext--input"
                id="expiryYear--inputtext--input"
                min="0"
                max="99"
                type="text"
                maxLength="2"
                aria-describedby="expiryDate--inputdate--error"
                aria-required="true"
                aria-label="YY"
                {...register("expiryYear", {
                  required: "Enter a valid expiry date",
                  pattern: {
                    value: /^\d{2}$/,
                    message: "Enter a valid expiry date",
                  },
                  validate: validateExpiryDate(watch),
                })}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
