// paymentPayloadTemplate.js

export const buildFinalPayload = (formData, apiData) => {
    const userId = apiData?.agentInteractionDetails?.userID;
    const pageType = apiData?.pageType;
    const bookingReference = apiData?.paymentData?.PaymentRequest?.PegasusCardDetails?.BookingReference;
    const formattedExpiryDate = `${formData.expiryMonth}/${formData.expiryYear}`;
    return {
        urlToken: "b09f4214-f4b2-4ba2-af8d-291c2b85aefa",
        paymentRequest: {
        InterfaceVersion: "V1",
        Audience: "BA_Agent",
        AgentCredentials: {
            OfficeID: formData.officeID,
            AgentID: formData.agentID,
        },
        LanguageCode: "EN",
        RevenueType: "NONREVENUE",
        SaleType: "NonRevenue",
        CountryOfResidence: "GB",
        PointOfSaleCountry: "GB",
        BookingTransactionType: "New",
        CallingApplication: "PEGPAY",
        PegasusCardDetails: {
            CollectCardDataOnly: "true",
            CollectExpiryDate: "true",
            CollectCvvData: "true",
            BookingReference: bookingReference,
        },
        },
        pageSubmissionData: {
        crReference: formData.semafoneCRNumber,
        domainURL: formData.semafoneSiteURL,
        ExpiryDate: formattedExpiryDate,
        BookingReference: bookingReference,
        },
        pageType: pageType,
        userId: userId,
    }
};
  