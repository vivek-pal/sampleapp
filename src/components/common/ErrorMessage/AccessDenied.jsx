import React from 'react'

export const AccessDenied = () => {
  return (
    <div className="w-full bg-red-200 hidden">
        <div className="relative flex w-full flex-wrap items-center justify-between gap-3 gap-x-2 rounded-card border p-4 font-light md:items-start md:gap-2 border-red-700
        bg-[rgb(247,219,217)] bg-opacity-50" data-testid="error-message-wrong-entries-payment-form--message"
          id="error-message-wrong-entries-payment-form"
          tabIndex="-1"
        >
          <div
            className="order-1 md:order-none"
            id="error-message-wrong-entries-payment-form--alert-message-icon"
          >
            <div
              className="w-6 h-6 bg-[#8c160a] flex justify-center items-center m-auto"
              style={{
                maskImage: 'url("/icons/warning.svg")',
                maskSize: "cover",
                maskRepeat: "no-repeat",
              }}
            ></div>
          </div>
          <div className="order-3 w-full space-y-3 md:order-none md:flex-1 [&amp;>*]:text-red-700">
            <div
              className="flex max-w-[690px] flex-col gap-1 self-stretch"
              role="alert"
              aria-live="polite"
            >
              {Array.isArray(errorMessages) && errorMessages.length > 0 ? (
                errorMessages.map((msg, idx) => (
                  <span key={idx} className="block font-mylius-modern">
                    {msg}
                  </span>
                ))
              ) : (
                <>
                  <span className="font-mylius-modern">
                    There's an error with 12 of your entries
                  </span>
                  <span className="font-open-sans tracking-[0.004]">
                    <p>
                      Please review the form and ensure that all mandatory
                      fields are filled out correctly.
                    </p>
                  </span>
                  <button
                    className="inline-flex items-center gap-2 font-mylius-modern font-normal tracking-tight text-blue-700 underline underline-offset-4 hover:text-blue-700 focus:text-blue-700 disabled:pointer-events-none disabled:opacity-50"
                    type="button"
                    id="error-message-wrong-entries-payment-form--alert-message-0"
                    data-testid="error-message-wrong-entries-payment-form--alert-message-0--button"
                  >
                    Go to first error
                    <div
                      className="w-4 h-4 bg-[#8c160a]"
                      style={{
                        maskImage: 'url("/icons/arrow-right.svg")',
                        maskSize: "cover",
                        maskRepeat: "no-repeat",
                      }}
                    ></div>
                  </button>
                </>
              )}
            </div>
          </div>
          <button
            className="order-2 flex h-6 w-6 items-center justify-center rounded-md p-1 md:order-none bg-red-300"
            id="error-message-wrong-entries-payment-form--alert-message-icon-close"
            aria-label="Close"
            onClick={hideErrorHandler}
          >
            <div
              className="w-4 h-4 bg-[#8c160a] flex justify-center items-center m-auto"
              style={{
                maskImage: 'url("/icons/close-bare.svg")',
                maskSize: "cover",
                maskRepeat: "no-repeat",
              }}
            ></div>
          </button>
        </div>
      </div>
  )
}
