  import React, { useState, useEffect, useRef } from 'react';
  import { useFormContext } from 'react-hook-form';  // Importing react-hook-form
  import paymentCards from '../../../assets/data/json/paymentCards.json'; // Import the JSON file
  import { typeOfCardError } from "../../../assets/data/json/errorMessage.json"
  import { useApiData } from "../../../contexts/DataContext";
  import {ValidationErrorMessage} from "../ValidationErrorMessage/ValidationErrorMessage"

  
  export const Semafonefragment = ({showSavedCard,semafoneInitRef,onSemafoneReady,isNewCardRadioBtnClicked,hideTrueCardDropDown}) => {
    const [cardDetails, setCardDetails] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedName, setSelectedName] = useState("");
    // const semafoneInitRef = useRef(null); //Storing imported function here
    const [semafoneLoaded, setSemafoneLoaded] = useState(false); // tracking if loaded
    const [typeOfCardOptions, settypeOfCardOptions] = useState([]);
    const [surCharge,setsurCharge]=useState('');
    const { apiData } = useApiData();
    const { register, formState: { errors }, setValue,clearErrors } = useFormContext(); // Using hook for form handling
    const [showDiv, setShowDiv] = useState(null);
    const isFirstLoad = useRef(true); // Track if it's the first load
    const renderCount = useRef(1);
    const [showInput, setShowInput] = useState(false);

    const mapTypeOfCardDropdown = (data) => {
      if (data?.pageType) {
        if (data.pageType.toUpperCase() === "CDC" || data.pageType.toUpperCase() === "GIZMOCDC") {
          if (data?.schemeOptions?.schemeOptions) {
            setCardDetails(data.schemeOptions.schemeOptions);
          }
        } else if (data.pageType.toUpperCase() === "PAYMENT") {
          const { paymentMethods } = data?.preparePaymentResponse;
          paymentMethods.paymentCards.forEach((card) => {
            const { schemeName, schemeOptions } = card;
            // console.log(typeOfCardOptions)
            schemeOptions.forEach((option) => {
              settypeOfCardOptions((prevOptions) => [
                ...prevOptions,
                {
                  label: `${schemeName} ${option.type} ${option.usage}`,
                  value: `${card.pciSchemeCode} ${option.type} ${option.usage}`,
                  schemevalue: `${card.schemeCode}`,
                  surcharge:`${option.surcharge}`
                },
              ]);
            });
          });
        }
      }
    };

    useEffect(() => {
      mapTypeOfCardDropdown(apiData);
    }, [apiData]);

    useEffect(() => {
      const loadSemafone = async () => {
        try {
          const { initSemafoneFragmentForCardDetails, registerSemafoneSetter } = await import('../../../assets/js/pciDssSemafoneReact.js');
          // Optional delay (e.g. 300ms to 2000ms) after the script loads
          semafoneInitRef.current = initSemafoneFragmentForCardDetails;
          console.log('Semafone script loaded');
          setSemafoneLoaded(true); // updating flag once loaded

          // Notify parent that it's ready
          onSemafoneReady?.();

          registerSemafoneSetter((semafoneCR, sessionId, siteURL, isSubmitted) => {
            setValue('semafoneCRNumber', semafoneCR);
            setValue('semafoneSessionID', sessionId);
            setValue('semafoneSiteURL', siteURL);
            setValue('SemafoneSubmitSuccess', isSubmitted ? 'true' : '');
          });

          // Skip the first call after page load
          // if (isFirstLoad.current) {
          //   isFirstLoad.current = false;
          //   return;
          // }
          

          // Listen for Semafone iframe messages
          const handleMessage = (event) => {
            try {
              const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
              if ('captureComplete' in data) {
                const isValid = data.captureComplete === true;
                setValue('SemafoneCaptureComplete', isValid ? 'true' : '', {
                  shouldValidate: true, // Important!
                });
              }
            } catch (err) {
              console.error('Failed to parse Semafone message:', err);
            }
          };
        
          window.addEventListener('message', handleMessage);
          return () => window.removeEventListener('message', handleMessage);

        } catch (error) {
          console.error('Failed to load Semafone script:', error);
        }
      };
      loadSemafone();

      if (isFirstLoad.current === true) {
          isFirstLoad.current = false;
          return;
      }

      // if (renderCount.current === 2) {
      //   console.log('Skipping validation on second render');
      //   if (isFirstLoad.current === true) {
      //       isFirstLoad.current = false;
      //       return;
      //   }
      //   else if (renderCount.current > 2) {
      //     isFirstLoad.current = false;
      //       return;
      //   }
      // }

      // Validation runs on first render and from third render onwards
      // console.log('Running validation');
      // // No need to call validateForm(); react-hook-form handles it

      // if (typeof renderCount.current === 'number') {
      //   renderCount.current += 1;
      // }

      //Delay before marking as loaded (e.g., 300ms to 2000ms)
      // setTimeout(() => {
      //   loadSemafone();
      // }, 2000); // you can adjust the delay (in ms) as needed
    }, [setValue, errors.SemafoneCaptureComplete]);

    // errorMessage respons when semafoneLoaded becomes true
    useEffect(() => {
      if (!semafoneLoaded) return;

      const iframe = document.querySelector('#semafoneiFrame iframe.semafone-iframe');
      if (iframe) {
        const classList = [
          'block', 'appearance-none', 'rounded-lg', 'border',
          'px-4', 'py-3', 'pr-10', 'font-mylius-modern', 'text-midnight-blue-500'
        ];

        iframe.classList.remove(...classList);
        iframe.classList.add(...classList);
        iframe.classList.add('border-grey-600');

        if (errors.SemafoneCaptureComplete) {
          iframe.classList.add('border-red-500', 'bg-red-200', 'pl-6');
        } else {
          iframe.classList.add('border-grey-600');
          iframe.classList.remove('border-red-500', 'bg-red-200', 'pl-6');
        }
      }
    // }, [semafoneInitRef,onSemafoneReady,semafoneLoaded, errors.SemafoneCaptureComplete]); //re-run if error state changes too
    }, [onSemafoneReady,semafoneLoaded, errors.SemafoneCaptureComplete]); //re-run if error state changes too
  
    const handleSelectChange = (event) => {
      
      setSelectedValue(event.target.value);
      setSelectedName(event.target.options[event.target.selectedIndex].text);

      //get surcharge value
      const selectedOption = event.target.selectedOptions[0]; // <- Get the selected <option>
  
      const surcharge = selectedOption.dataset.surcharge;  // from data-pcischemecode
      setsurCharge(surcharge);
      setValue('currentCardSurcharge',surcharge);
    
      const handleChange = (e) => {
        const selectedValue = e.target.value;

        if (semafoneInitRef.current) {
          //pass 2nd param, as it holds value coming from dropdown
          if(e.target.value!="TP"){
            semafoneInitRef.current(selectedValue,hideTrueCardDropDown);
          }
          else if(e.target.value=="TP"){
            semafoneInitRef.current(selectedValue);
          }
        } else {
          console.warn('Semafone init function not loaded yet.');
        }
      };
    
      handleChange(event);
    };

    // Type of card show/hide logic
    useEffect(() => {
      const interval = setInterval(() => {
        const element = document.getElementById("CollectCvvData");
        const pageType = document.getElementById("pageType");
        const collectCvvValue = element?.value;
        const showPageType = pageType?.value;
  
        if (
          (showPageType === 'CDC' && collectCvvValue !== 'true') ||
          showPageType === 'GIZMOCDC' ||
          showPageType === 'PAYMENT'
        ) {
          setShowDiv(collectCvvValue == "false"); // true means show the div
        }
        else {
          setShowDiv(true); // default to false if element not found
        }
      }, 10); // check every 5ms
  
      return () => clearInterval(interval); // cleanup
    }, []);  

    const handleButtonClick = () => {
      setShowInput(true);
    };

  return (
    <>
      <input type="hidden" id="currentCardSurcharge" {...register('currentCardSurcharge')} name=""  />
      <input type="hidden" id="pageName" name="" value="PEGASUS_PAYMENT" />
      {/* {(showDiv === null || showDiv === undefined) && <p>Type of card loading...</p>} */}
      { (hideTrueCardDropDown || showSavedCard==false) && (
      <div id="" className="mt-[-2rem] relative w-full" data-testid="typeOfCard--select">
        {apiData?.pageType === "PAYMENT" && (
        <p className={`mb-[12px] list-disc font-mylius-modern font-light inline-flex flex-col
         justify-center items-start gap-2 leading-snug font-open-sans text-base leading-6 
         text-midnight-blue-500 ${!showSavedCard?'mt-[2rem]':''}`}>Using a Corporate Card might attract a surcharge</p>
        )}
         <br></br>
        <label id="CardSchemeCodeLabel"
          data-testid="typeOfCard--select--label"
          className="mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500">
          Type of card
        </label>
        {/* Error Message Display just below the label */}
        {
          errors.typeOfCard &&
          (
            <ValidationErrorMessage errorMessage={errors.typeOfCard.message}/>
          )
        }
        {/* Type of card dropdown */}
        <div className="relative w-full">
          {errors.typeOfCard && (
            <div className="absolute inset-y-0 left-3 flex h-2 w-2 self-center rounded-full bg-red-500"></div>
          )}
          <select
            {...register('typeOfCard', {
              required: 'Please select a type of card',  // Add required validation
            })}
            aria-describedby="typeOfCard--label"
            aria-labelledby="typeOfCard--label typeOfCard--hint typeOfCard--error"
            id="typeOfCard"
            data-testid="typeOfCard--select--select"
            aria-label="Type of card"
            className={` block w-full appearance-none rounded-lg border px-4 py-3 pr-10 font-mylius-modern text-midnight-blue-500 h-[52px] ${errors.typeOfCard ? 'border-red-500 bg-red-200 pl-6' : 'border-grey-600'}`}
            value={selectedValue} // Control the selected value
            onChange={(e) => {
              setSelectedValue(e.target.value);
              setSelectedName(e.target.options[e.target.selectedIndex].text);
              setValue('typeOfCard', e.target.value); // Update the value in the react-hook-form context
              if(e.target.value){
                clearErrors("typeOfCard");
              }
              handleSelectChange(e); // Call the handleChange function to update the selected value
            }}
          >
            <option value="" disabled hidden>
              Select type of card
            </option>
            {apiData?.pageType === "PAYMENT" &&
              Array.isArray(typeOfCardOptions) &&
              typeOfCardOptions.map((opt) => (
                <option key={opt.value} value={opt.schemevalue} data-surcharge={opt.surcharge} data-pcischemecode={opt.value}>
                  {opt.label} 
                </option>
              ))}
            {(apiData?.pageType === "CDC" || apiData?.pageType === "GIZMOCDC") &&
              Array.isArray(cardDetails) && cardDetails.map(({ schemeCode, schemeName }) => (
                <option key={schemeName} value={schemeCode}>
                {schemeName}
              </option>
              ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="ICON" aria-hidden="true">
              <div aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.9246 1.37787C18.5164 3.28184 17.0076 4.98539 15.4989 6.68893C13.9901 8.39248 12.3808 10.096 10.7715 11.6994C10.3691 12.1002 9.66507 12.1002 9.26273 11.6994C8.45807 10.8977 7.6534 9.99582 6.84873 9.09394C6.04407 8.19207 5.2394 7.29019 4.53532 6.38831C3.02657 4.58455 1.51782 2.78079 0.109652 0.776617C-0.0915146 0.576199 0.00906752 0.275573 0.210234 0.0751557C0.4114 -0.025053 0.612568 -0.025053 0.813734 0.0751557C2.62423 1.7787 4.33415 3.38204 5.94348 5.08559C6.74815 5.98747 7.55282 6.78914 8.35748 7.69102C9.16215 8.5929 9.96681 9.39457 10.6709 10.3967L9.16215 10.3967C10.6709 8.69311 12.2802 6.98956 13.8896 5.38622C15.7001 3.78288 17.41 2.17954 19.2205 0.676409C19.4216 0.475992 19.7234 0.5762 19.9246 0.776618C20.0251 0.977035 20.0251 1.17745 19.9246 1.37787Z" fill="#021B41"></path>
                </svg>
              </div>
            </div>
          </div>

          <input value={selectedValue} data-value={selectedName} name="CardSchemeName" id="cardSchemeName" type="hidden" />
        </div>
      </div>
      )}

      <div id="SemafoneReferencefieldrow" className="mt-[1rem]">
        <label htmlFor="semafoneIframe" id="semafoneIframeLabel" className='mb-1 font-mylius-modern text-base font-light leading-7 text-midnight-blue-500'> 
          Sycurio Input field(s) for card/cvv details
        </label>
      {errors.SemafoneCaptureComplete && (
        <p className="mb-1 font-mylius-modern text-xs font-light text-red-500" data-testid="cvv--inputtext--error" id="cvv--inputtext--error">{errors.SemafoneCaptureComplete.message}</p>
      )}
        <div>
          <div id="semafoneiFrame" className='[&_iframe]:!h-[300px]'>
            {/* div to display semafone fragment used by JavaScript */}
          </div>
          <input type="hidden" id="SemafoneCRNumber" placeholder="SemafoneCRNumber" {...register('semafoneCRNumber')} value=''/>
          <input type="hidden" id="SemafoneSessionID" placeholder="Semafone Session ID" {...register('semafoneSessionID')} value=''/>
          <input type="hidden" id="SemafoneSiteURL" placeholder="Semafone Site URL" {...register('semafoneSiteURL')} value='' />
          <input type="hidden" id="SemafoneSubmitSuccess" placeholder="Semafone Submit Success" {...register("SemafoneSubmitSuccess")} />
          <input type="hidden" id="SemafoneCaptureComplete" 
            {...register('SemafoneCaptureComplete', {
              validate: (value) =>
                value === 'true' ? true : 'Sycurio Input field(s) is required',
            })}
          defaultValue='' />
          {/* Temp disabled spinner using inline style until futher confirmation */}
          <div id="semafone-spinner" >
                <div className="loader">
                <div id="interstitialContent">
                  <div id="interstitial-spinner">
                    <div className="spinnerWrapper"></div>
                  </div>
                </div>
                {/* div to display the spinner */}
                </div>
            </div>
        </div>
      </div>
      <>
      {apiData?.pageType === "GIZMOCDC" && (
        <button
          type="submit"
          className="md:py-3.5 md:px-6 py-0 px-0 justify-center items-center inline-flex text-center text-base font-mylius-modern font-normal tracking-tight rounded-lg disabled:pointer-events-none disabled:opacity-50 text-white bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:outline-1 min-w-[145px] px-6 min-h-12 gap-2"
          onClick={handleButtonClick}
        >
          Convert to PCI Token
        </button>
      )}

      {apiData?.pageType === "GIZMOCDC" && showInput && (
        <input
          autoComplete="on"
          maxLength="50"
          size="37"
          type="text"
          className="mt-1 border rounded-lg h-[52px] ps-2 flex items-center focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-blue-500 bg-white-white border-grey-600 disabled disabled:opacity-50 disabled:pointer-events-none"
          name="AddressLine1"
          id="AddressLine1"
          aria-required="true"
          tabIndex="330"
          disabled="disabled"
        />
      )}
      </>
    </>
  )
}

