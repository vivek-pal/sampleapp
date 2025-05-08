import React, { useEffect, useState, useRef  } from "react";
import { useForm, FormProvider,useFormState } from "react-hook-form";
import { TripInfoDetails } from "./TripInfoDetails";
import { PCIDSSSessionData } from "../../../features/pcidsscomponent/PCIDSSComponent";
import { Cardaccepted } from "./Cardaccepted";
import { Semafonefragment } from "./Semafonefragment";
import { Expirydate } from "./Expirydate";
import { Paymentbutton } from "./Paymentbutton";
import { useApiData } from "../../../contexts/DataContext";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { agentStatusBasedErrMsg } from "../../../assets/data/json/resource.json"
import { SavedCardDropdown } from './SavedCardDropdown';
import { buildFinalPayload } from "../../../utils/paymentPayloadTemplate";

export const Formelementsplaceholder = () => {
  const [isErrorMessageVisible, setisErrorMessageVisible] = useState(false);
  const [errorMessage, seterrorMessage] = useState([]);
  const [pageType, setpageType] = useState("");
  const [agentLiveStatus, setagentLiveStatus] = useState(true);
  const { apiData } = useApiData();
  const [paymentData,setpaymentData] = React.useState("");
  const [agentInteractionDetails,setagentInteractionDetails] = React.useState("");
  // const [formErrorFieldsCount,setformErrorFieldsCount]=useState(0);
  const [loading, setLoading] = useState(true);
  const [showSavedCard, setShowSavedCard] = useState(false);
  const [showExpiryField, setShowExpiryField] = useState(false);
  const [collectCvvData, setCollectCvvData] = useState(false);
  const [showCardAccepted, setShowCardAccepted] = useState(false);
  const [shouldShowSemfone, setShouldShowSemfone] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const errorMessageRef = useRef(null);
  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    // reValidateMode: "onChange",
  });

  const {control } =methods;
  const { errors } = useFormState({ control }); 

  // const errorCount = useErrorCount();

  useEffect(() => {
    if (apiData) {
      setpageType(apiData?.pageType);
      setpaymentData(apiData?.paymentData);
      setagentInteractionDetails(apiData?.agentInteractionDetails);
      reset({
        userId: agentInteractionDetails?.userID,
        pageType: pageType,
      });
    }
  }, [apiData, reset]);

  // useEffect(() => {
  //   const isDOMReady = document.readyState === 'complete' || document.readyState === 'interactive';
  //   // if (isDOMReady && pageType && paymentData && agentInteractionDetails) {
  //   if (
  //     isDOMReady &&
  //     pageType &&
  //     (
  //       (pageType === "PAYMENT" && paymentData && agentInteractionDetails) ||
  //       (pageType === "CDC" && paymentData && agentInteractionDetails) ||
  //       (pageType === "GIZMOCDC" && agentInteractionDetails)
  //     )
  //   ) {
  //     console.log('Page Type:', pageType);
  //     console.log('Payment Data:', paymentData);
  //     console.log('AgentStatus Data:', agentInteractionDetails);

  //     const shouldShowSavedCard = pageType === "PAYMENT" && paymentData?.PaymentRequest?.SaveCardSupported === "Y";
  //     const shouldShowExpiryfield = (pageType === "CDC" && paymentData?.PaymentRequest?.PegasusCardDetails?.CollectExpiryDate === "true") ||
  //     pageType === "PAYMENT";
  //     const CollectCvvData = (pageType === "CDC" && paymentData?.PaymentRequest?.PegasusCardDetails?.CollectCvvData === "true");
  //     const shouldShowCardAccepted = pageType === "PAYMENT";
  //     const shouldShowSemfone = pageType === "GIZMOCDC" || pageType === "CDC" || pageType === "PAYMENT";

  //      // Update state of given based on the conditions
  //     setShowSavedCard(shouldShowSavedCard);
  //     setShowExpiryField(shouldShowExpiryfield);
  //     setCollectCvvData(CollectCvvData);
  //     setShowCardAccepted(shouldShowCardAccepted);
  //     setShouldShowSemfone(shouldShowSemfone);
  //     setLoading(false); // Hide loader when ready
  //   } else if (!isDOMReady) {
  //     const handleDomReady = () => {
  //       if (pageType &&
  //         (
  //           (pageType === "PAYMENT" && paymentData && agentInteractionDetails) ||
  //           (pageType === "CDC" && paymentData && agentInteractionDetails) ||
  //           (pageType === "GIZMOCDC" && agentInteractionDetails)
  //         )) 
  //       {
  //         setLoading(false);
  //       }
  //     };
  //     window.addEventListener('DOMContentLoaded', handleDomReady);
  //     return () => window.removeEventListener('DOMContentLoaded', handleDomReady);
  //   }
  // }, [pageType, paymentData, reset]);

  useEffect(() => {
    const isDOMReady =
      document.readyState === "complete" || document.readyState === "interactive";
  
    const readyToInitialize =
      pageType &&
      (
        (pageType === "PAYMENT" && paymentData && agentInteractionDetails) ||
        (pageType === "CDC" && paymentData && agentInteractionDetails) ||
        (pageType === "GIZMOCDC" && agentInteractionDetails)
      );
  
    const initializeUI = () => {
      console.log("Page Type:", pageType);
      console.log("Payment Data:", paymentData);
      console.log("AgentStatus Data:", agentInteractionDetails);
  
      const shouldShowSavedCard =
        pageType === "PAYMENT" &&
        paymentData?.PaymentRequest?.SaveCardSupported === "Y";
  
      const shouldShowExpiryField =
        (pageType === "CDC" &&
          paymentData?.PaymentRequest?.PegasusCardDetails?.CollectExpiryDate===
            "true") ||
        pageType === "PAYMENT";
  
      const collectCvvData =
        pageType === "CDC" &&
        paymentData?.PaymentRequest?.PegasusCardDetails?.CollectCvvData ===
          "true";
  
      const shouldShowCardAccepted = pageType === "PAYMENT";
      const shouldShowSemfone =
        pageType === "GIZMOCDC" || pageType === "CDC" || pageType === "PAYMENT";
  
      // Update state
      setShowSavedCard(shouldShowSavedCard);
      setShowExpiryField(shouldShowExpiryField);
      setCollectCvvData(collectCvvData);
      setShowCardAccepted(shouldShowCardAccepted);
      setShouldShowSemfone(shouldShowSemfone);
      setLoading(false);
    };
  
    if (isDOMReady && readyToInitialize) {
      initializeUI();
    } else if (!isDOMReady) {
      const handleDomReady = () => {
        if (readyToInitialize) {
          initializeUI();
        }
      };
  
      if (document.readyState === "complete" || document.readyState === "interactive") {
        handleDomReady();
      } else {
        window.addEventListener("DOMContentLoaded", handleDomReady);
        return () => window.removeEventListener("DOMContentLoaded", handleDomReady);
      }
    }
  }, [pageType, paymentData, agentInteractionDetails, reset]);  

  const onSubmit = (formData) => {
    const finalPayload = buildFinalPayload(formData, apiData);
    console.log("Final Payload:", finalPayload);

    // Optionally submit
    // fetch('/api/submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(finalPayload),
    // });

    //hide error msg popup
    // setisErrorMessageVisible(false);

    // methods.clearErrors("typeOfCard");
    // console.log('Form Data:', data);
  };

  // useEffect(() => {
  //   const errorCount = Object.keys(errors || {}).length;
  //   setformErrorFieldsCount(errorCount);

  // }, [errors]);


  useEffect(() => {

    //Use logic to show error message,on condition when agent is not active
    if (apiData) {
      if (apiData?.agentInteractionDetails?.agentLiveCallStatus.toUpperCase() ==="TRUE")
        setagentLiveStatus(true);
      else 
      setagentLiveStatus(false);

      if (agentLiveStatus === true) {
        //do not show err msg when true, and show remaining page contents
        setisErrorMessageVisible(false);
      } 
      else if (agentLiveStatus === false) {
        //show err msg when false, and do not show remaining page contents
        setisErrorMessageVisible(true);

        //set err msg "To capture card details, you need to be on an active call for capturing details via Sycurio."
        seterrorMessage((prevErrors) => [
          ...prevErrors,
          agentStatusBasedErrMsg,
        ]);
      }
    }
  }, [apiData,agentLiveStatus]);

  //Fn to call when form is in error state ie. invalid.
  const onInvalidForm=(errors)=>{
    console.log("Form has errors:", errors);
    //show error message popup on top
    setisErrorMessageVisible(true);
  }
  
  useEffect(() => {
    if (isErrorMessageVisible) {
      setTimeout(() => {
        errorMessageRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
      }, 0);
    }
  }, [isErrorMessageVisible]);

  return (
    <>
      {loading && (
        // <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        //   <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent"></div>
        // </div>

        <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center min-h-screen bg-white">
          <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
            <div className="flex animate-pulse space-x-4">
              <div className="size-10 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 rounded bg-gray-200"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                  </div>
                  <div className="h-2 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <main data-testid="payment-page">
          <div className="bg-gray-100">
            <FormProvider {...methods}>
              <div className="py-8 lg:py-16">
                <section className="mb-8 lg:mb-16">
                  <div className="lg:container mx-auto px-4 lg:px-0">
                    <PCIDSSSessionData />
                    <ErrorMessage ref={errorMessageRef} isVisible={Object.keys(methods.formState.errors).length > 0} errorFieldsCount={Object.keys(methods.formState.errors).length} errorMessages={[]}></ErrorMessage>
                    <form className="w-full" onSubmit={methods.handleSubmit(onSubmit, onInvalidForm)}>
                      <input type="hidden" name="pageType" id="pageType" value={pageType} />
                      <input type="hidden" name="CollectCvvData" id="CollectCvvData" value={collectCvvData} />
                    {/* isVisible={Object.keys(methods.formState.errors).length > 0} */}
                        <div className="mb-8 space-y-8">
                        <div className="space-y-8">
                            <div data-testid="page-heading">
                                <h1 className="font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-2 leadingSnug text-4xl lg:text-[44px] leading-[48px] lg:leading-[56px] text-midnight-blue-500"
                                data-testid="hero-title--text-custom"
                                id="hero-title">
                                  {/* {pageType === "PAYMENT" ? "Review and pay" : "Card Details Capture"} */}
                                  {pageType === "PAYMENT"
                                  ? "Review and pay"
                                  : pageType === "CDC"
                                  ? "Card Details Capture"
                                  : pageType === "GIZMOCDC"
                                  ? "Gizmo Card Capture"
                                  : ""}
                                </h1>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                            <div className={`${pageType === "PAYMENT" ? "lg:col-span-8" : "lg:col-span-12"}`}>
                              <div className="bg-white p-6 rounded-lg border border-gray-200">
                                  <div className="w-full">
                                  <div className="flex w-full flex-col gap-y-4 *:focus:border-4 *:focus:border [&_iframe]:!h-12">
                                      <div>
                                          <h2 className="font-light inline-flex flex-col justify-center items-start gap-xs leading-6 text-2xl lg:text-4xl leading-9 lg:leading-[48px] text-midnight-blue-500"
                                          data-testid="text-custom--text-custom"
                                          id="text-custom">
                                              {/* {pageType === "PAYMENT" ? "Payment details" : "Card details"} */}
                                              {pageType === "PAYMENT"
                                              ? "Payment details"
                                              : pageType === "CDC"
                                              ? "Card details"
                                              : pageType === "GIZMOCDC"
                                              ? "Card details"
                                              : ""}
                                          </h2>
                                          <div className="mt-4 flex gap-y-4">
                                            {showCardAccepted && <Cardaccepted />}
                                          </div>
                                      </div>
                                      {showSavedCard && <SavedCardDropdown />}
                                      <div className="w-[350px] max-w-[350px] space-y-8">
                                          {/* <Semafonefragment /> */}
                                          {shouldShowSemfone && <Semafonefragment />}
                                          {showExpiryField && <Expirydate />}                                         
                                      </div>
                                  </div>
                                  {/* placeholder */}
                                  </div>
                              </div>
                            </div>
                            <aside className={`lg:col-span-4 ${pageType === "PAYMENT" ? "" : "hidden"}`}>
                              <section className="min-w-[315px] space-y-4">
                                <TripInfoDetails />
                                {/* placeholder */}
                              </section>
                            </aside>
                        </div>
                        </div>
                        {/* <Paymentbutton pageType={(pageType ==="PAYMENT" || pageType ==="CDC")} /> */}
                        {(pageType === "CDC") && (
                          <Paymentbutton pageType={pageType} />
                        )}
                    </form>
                  </div>
                </section>
              </div>
            </FormProvider>
          </div>
        </main>
      )}
    </>
  );
};

export default Formelementsplaceholder;