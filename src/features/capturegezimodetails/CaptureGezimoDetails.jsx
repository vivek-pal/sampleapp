/**-------------------------------------------------------------------------------------------
 * @module Capture Gezimo Details feature
 * @author Coforge/IAG Payment Team
 * @version 1.0.0
 * @description This service class is to build execute payment."
  -------------------------------------------------------------------------------------------*/
  import React, { useEffect, useContext, useState, useRef } from "react";
  import { useForm, FormProvider } from "react-hook-form";
  import Layout from "../../components/layouts/Layout";
  import paymentDataContext from "../../contexts/PaymentContext";
  import { PCIDSSSessionData } from "../pcidsscomponent/PCIDSSComponent";
  import { ErrorMessage } from "../../components/common/ErrorMessage/ErrorMessage";
  import { Expirydate } from "../../components/common/FormElements/Expirydate";
  import { Paymentbutton } from "../../components/common/FormElements/Paymentbutton";
  import { Semafonefragment } from "../../components/common/FormElements/Semafonefragment";
  import { captureGizmoCardDetail } from "../../services/paymentInterfaceAdapterService";
import { buildGizmoCaptureCardDetailRequest } from "../../services/requestMapper/captureGizmoCardDetailReqMapper";
  
  const CaptureGezimoDetails = () => {
      const semafoneInitRef = useRef(null);
      const { preparePaymentData } = useContext(paymentDataContext);
      const showExpiryField = preparePaymentData?.PaymentRequest?.PegasusCardDetails?.CollectExpiryDate ===
          "true"
      const [setSemafoneReady] = useState(false);
      const [isErrorMessageVisible, setisErrorMessageVisible] = useState(false);
      const errorMessageRef = useRef(null);
      const methods = useForm({
          mode: "onBlur",
          reValidateMode: "onSubmit",
      });
  
      /*This method is call on submit cature card detail form*/
      const onSubmit = (formData) => {
        let data = { ...formData };
        data.CollectCvvData = preparePaymentData?.PaymentRequest?.PegasusCardDetails?.CollectCvvData;
        data.CollectCardDataOnly = preparePaymentData?.PaymentRequest?.PegasusCardDetails?.CollectCardDataOnly;
        let request = buildGizmoCaptureCardDetailRequest(data);
        const respons = captureGizmoCardDetail(request);
        if (respons.statusCode == 200) {
            // TODO: display success message
        } else {
            // TODO: display faliure message
        }
      }
  
      /*This method on error set variable and scroll to the top*/
      const onInvalidForm = (errors) => {
          setisErrorMessageVisible(true);
      }
  
      useEffect(() => {
          if (isErrorMessageVisible) {
              setTimeout(() => {
                  errorMessageRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
              }, 0);
          }
      }, [isErrorMessageVisible]);
  
      /*This method handle if semo fone ready to use*/
      const handleSemafoneReady = () => {
          setSemafoneReady(true); // Called by child when ref is ready
      };
  
      return (
          <Layout>
              <main data-testid="capture-card-details-page">
                  <div className="bg-gray-100">
                      <FormProvider {...methods}>
                          <div className="py-8 lg:py-16">
                              <section className="mb-8 lg:mb-16">
                                  <div className="lg:container mx-auto px-4 lg:px-0">
                                      <PCIDSSSessionData />
                                      <ErrorMessage
                                          ref={errorMessageRef}
                                          isVisible={
                                              Object.keys(methods.formState.errors).length > 0
                                          }
                                          errorFieldsCount={
                                              Object.keys(methods.formState.errors).length
                                          }
                                          errorMessages={[]}
                                      ></ErrorMessage>
                                      <form
                                          className="w-full"
                                          onSubmit={methods.handleSubmit(onSubmit, onInvalidForm)}
                                      >
                                          <div className="mb-8 space-y-8">
                                              <div className="space-y-8">
                                                  <div data-testid="page-heading">
                                                      <h1
                                                          className="font-mylius-modern font-light inline-flex flex-col justify-center items-start gap-2 leadingSnug text-4xl lg:text-[44px] leading-[48px] lg:leading-[56px] text-midnight-blue-500"
                                                          data-testid="hero-title--text-custom"
                                                          id="hero-title"
                                                      >
                                                          Gizmo Card Conversion
                                                      </h1>
                                                  </div>
                                              </div>
                                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                                                  <div className="lg:col-span-12">
                                                      <div className="bg-white p-6 rounded-lg border border-gray-200">
                                                          <div className="w-full">
                                                              <div className="flex w-full flex-col gap-y-4 *:focus:border-4 *:focus:border [&_iframe]:!h-12">
                                                                  <div>
                                                                      <h2
                                                                          className="font-light inline-flex flex-col justify-center items-start gap-xs leading-6 text-2xl lg:text-4xl leading-9 lg:leading-[48px] text-midnight-blue-500"
                                                                          data-testid="text-custom--text-custom"
                                                                          id="text-custom"
                                                                      >
                                                                          Card details
                                                                      </h2>
                                                                      <div className="mt-[-1rem]">
                                                                      </div>
                                                                  </div>
                                                                  <div className="w-1/2 space-y-8">
                                                                      <div className={'block'}>
                                                                          <Semafonefragment
                                                                              showSavedCard={false}
                                                                              semafoneInitRef={semafoneInitRef}
                                                                              onSemafoneReady={handleSemafoneReady}
                                                                              hideTrueCardDropDown={false}
                                                                          />
                                                                      </div>
                                                                      {showExpiryField && <Expirydate />}
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                          <Paymentbutton pageType={"CDC"} />
                                      </form>
                                  </div>
                              </section>
                          </div>
                      </FormProvider>
                  </div>
              </main>
          </Layout>)
  };
  export default CaptureGezimoDetails;