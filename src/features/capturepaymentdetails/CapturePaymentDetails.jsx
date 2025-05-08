/**-------------------------------------------------------------------------------------------
 * @module Capture payment Details feature
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
import { Semafonefragment } from "../../components/common/FormElements/Semafonefragment";
import { processExecutePayment } from "../../services/paymentInterfaceAdapterService";
import { buildExecutePaymentRequest } from "../../services/requestMapper/executePaymentReqMapper";
import { PaymentSummary } from "../paymentsummary/PaymentSummary";
import PaymentDetails from "../../components/common/FormElements/PaymentDetails";
import { Billingcountry } from "../../components/common/FormElements/Billingcountry";
import { SavedCardDropdown } from "../../components/common/FormElements/SavedCardDropdown";
import { Startdate } from '../../components/common/FormElements/Startdate';
import BillingAddress from "../../components/common/FormElements/BillingAddress";
import FinalAmount from "../../components/common/FormElements/FinalAmount";

const CapturePaymentDetails = () => {
    const semafoneInitRef = useRef(null);
    const { preparePaymentData } = useContext(paymentDataContext);
    const shouldShowSavedCard = preparePaymentData?.PaymentRequest?.SaveCardSupported === "Y" && apiData?.preparePaymentResponse?.storedPaymentMethods?.length > 0;
    const [isSemafoneReady, setSemafoneReady] = useState(false);
    const [hideSemafoneClass, sethideSemafoneClass] = useState(false);
    const [newCardRadioBtn, setnewCardRadioBtn] = useState(false);
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
        let request = buildExecutePaymentRequest(data);
        const respons = processExecutePayment(request);
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

    //method to directly handle visiblity of syucirio
    const HideSycurio = (flag) => {
        //hide
        if (isSemafoneReady && semafoneInitRef.current) {
            semafoneInitRef.current('PAY', true);
            sethideSemafoneClass(flag);
        } else {
            console.warn('Semafone not ready yet.');
        }
    }

    //recieve callback from saved card with selected card, when saved card dropdown is changed.
    const isNewCardRadioBtnClicked = (isNewCardRadioBtnClicked) => {
        setnewCardRadioBtn(isNewCardRadioBtnClicked);
    }

    const HandleSavedCardChange = (card) => {
        sethideSemafoneClass(!hideSemafoneClass);
        let flag = false;
        if (card != null) {
            if (
                card?.schemeCode?.pciCode?.toUpperCase() === "UAP" &&
                card?.schemeCode?.schemeCode?.toUpperCase() === "TP"
            ) {
                flag = true;
            }
            else {
                //call semafone ref inside here
                if (isSemafoneReady && semafoneInitRef.current) {
                    semafoneInitRef.current('TDC');
                } else {
                    console.warn('Semafone not ready yet.');
                }
                flag = false;
            }
            sethideSemafoneClass(flag);
        }
    }

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
                                                        Review and pay
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                                                <div className="lg:col-span-12">
                                                    <div className="mb-[1rem]">
                                                        <PaymentSummary
                                                            apiData={preparePaymentData}
                                                        ></PaymentSummary>
                                                    </div>
                                                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                                                        <div className="w-full">
                                                            <div className="flex w-full flex-col gap-y-4 *:focus:border-4 *:focus:border [&_iframe]:!h-12">
                                                                <div>
                                                                    <div className="mt-[-1rem]">
                                                                        <div className="mb-[1rem]">
                                                                            <PaymentDetails apiData={preparePaymentData}></PaymentDetails>
                                                                        </div>
                                                                        <div>
                                                                            <Billingcountry></Billingcountry>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                {!shouldShowSavedCard && <SavedCardDropdown apiData={preparePaymentData}
                                                                    onCardChange={HandleSavedCardChange}
                                                                    HideSycurio={HideSycurio}
                                                                    isNewCardRadioBtnClicked={isNewCardRadioBtnClicked}
                                                                />}
                                                                <div className="w-1/2 space-y-8">
                                                                    <div className={hideSemafoneClass ? 'hidden' : 'block'}>
                                                                        <Semafonefragment
                                                                            showSavedCard={!shouldShowSavedCard}
                                                                            semafoneInitRef={semafoneInitRef}
                                                                            onSemafoneReady={handleSemafoneReady}
                                                                            isNewCardRadioBtnClicked={isNewCardRadioBtnClicked}
                                                                            hideTrueCardDropDown={!shouldShowSavedCard}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-[1rem]">
                                                                        <Startdate
                                                                            apiData={preparePaymentData}
                                                                        ></Startdate>
                                                                    </div>
                                                                    {<Expirydate />}
                                                                    <div className="mb-[1rem]">
                                                                        <BillingAddress
                                                                            BillingAddressData={preparePaymentData}
                                                                        ></BillingAddress>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <FinalAmount apiData={preparePaymentData} />
                                    </form>
                                </div>
                            </section>
                        </div>
                    </FormProvider>
                </div>
            </main>
        </Layout>)
};
export default CapturePaymentDetails;