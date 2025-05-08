import { React, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ValidationErrorMessage } from "../ValidationErrorMessage/ValidationErrorMessage.jsx";

export const Startdate = () => {
  const {
    register,
    watch,
    clearErrors,
    trigger,
    formState: { errors, touchedFields },
  } = useFormContext();

  // Watch the values of startMonth and startYear
  const startMonth = watch("startMonth");
  const startYear = watch("startYear");

  // Check if the startMonth or startYear input was touched and has an error
  const isstartMonthTouched = touchedFields.startMonth;
  const isstartYearTouched = touchedFields.startYear;

  // Determine if error exists in any field (MM or YY)
  const hasError = errors.startMonth || errors.startYear;

  // Handler for blur event to trigger validation
  const handleBlur = async () => {
    // Trigger validation for month and year fields on blur
    await trigger(["startMonth", "startYear"]);
  };

  useEffect(() => {
    // Clear errors when either month or year changes
    clearErrors(["startMonth", "startYear"]);
  }, [clearErrors]);

  // Custom validation function to check if the month and year are greater than or equal to the current date
  const validatestartDate = (watch) => () => {
    const month = parseInt(watch("startMonth"), 10);
    const year = parseInt(watch("startYear"), 10);
  
    if (isNaN(month) || isNaN(year)) {
      return "Enter a valid start date";
    }
  
    const now = new Date();
    const inputDate = new Date(2000 + year, month - 1); // assumes YY format
    const today = new Date(now.getFullYear(), now.getMonth());
  
    if (inputDate > today) {
      return "Start date must not be in the future";
    }
  
    return true;
  };
  

  return (
    <div className="flex flex-col" data-testid="startDate--inputdate">
      <label className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500"
        id="startDateLabel"
      >
        Start Date
      </label>
      {(errors.startMonth?.message || errors.startYear?.message) && (
        <ValidationErrorMessage
          errorMessage={
            errors.startMonth?.message || errors.startYear?.message
          }
        />
      )}

      <div className="flex flex-row gap-2">
        {/* Start Month */}
        <div className="w-60">
          <div className="flex flex-col gap-y-1"
            data-testid="startMonth--inputtext">
            <label className="font-light inline-flex flex-col justify-center items-start gap-xs leading-6 font-open-sans text-base text-xs text-gray-700 h-5"
              htmlFor="startMonth--inputtext--input"
              data-testid="startMonth--inputtext--labelhint"
              id="startMonth--inputtext--labelhint">
              MM
            </label>

            <div className={`mt-1 border relative rounded-lg h-[52px] ps-2 flex items-center focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500 bg-white-white border-gray-600 ${errors.startMonth ? 'border-red-500 bg-red-200 pl-6' : 'border-grey-600'}`}
            >
              {errors.startMonth && (
                <div className="absolute inset-y-0 left-3 flex h-2 w-2 self-center rounded-full bg-red-500"></div>
              )}
              <input
                data-testid="startMonth--inputtext--input"
                id="startMonth--inputtext--input"
                min="1"
                max="12"
                type="text"
                maxLength="2"
                className="!w-1/2"
                aria-describedby="startDate--inputdate--error"
                aria-required="true"
                aria-label="MM"
                {...register("startMonth", {
                  required: "Enter a valid start date",
                  pattern: {
                    value: /^(0?[1-9]|1[0-2])$/,
                    message: "Enter a valid start date",
                  },
                })}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>

        {/* start Year */}
        <div className="flex-1 flex-col w-24">
          {/* <div className="flex flex-col gap-y-1" */}
          <div className="w-60"
            data-testid="startYear--inputtext">
            <label className="font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-xs leading-6 font-open-sans text-base leading-6 text-xs text-gray-700 h-5"
              htmlFor="startYear--inputtext--input"
              data-testid="startYear--inputtext--labelhint"
              id="startYear--inputtext--labelhint">
              YY
            </label>

            <div className={`mt-1 border relative rounded-lg h-[52px] ps-2 flex items-center focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500 bg-white-white border-gray-600 ${errors.startYear ? 'border-red-500 bg-red-200 pl-6' : 'border-grey-600'}`}>
              {errors.startYear && (
                <div className="absolute inset-y-0 left-3 flex h-2 w-2 self-center rounded-full bg-red-500"></div>
              )}
              <input
                data-testid="startYear--inputtext--input"
                id="startYear--inputtext--input"
                min="0"
                max="99"
                type="text"
                maxLength="2"
                aria-describedby="startDate--inputdate--error"
                aria-required="true"
                aria-label="YY"
                {...register("startYear", {
                  required: "Enter a valid start date",
                  pattern: {
                    value: /^\d{2}$/,
                    message: "Enter a valid start date",
                  },
                  validate: validatestartDate(watch),
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
