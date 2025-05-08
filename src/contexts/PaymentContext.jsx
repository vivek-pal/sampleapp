/**-------------------------------------------------------------------------------------------
 * @module pauymentDataContext
 * @author Coforge/IAG Payment Team
 * @version 1.0.0 
 * <TODO Update Documents>
 * @description This service class is providing functions to focused on handling tasks related to internal payment interface."
 * @throws {Error} - If an error is encountered while processing the request, this function throws an Error object.
-------------------------------------------------------------------------------------------*/

import { getPreparePaymentData } from  "../services/paymentInterfaceAdapterService"
import { buildPreparePaymentRequest } from "../services/requestMapper/preparePaymentReqMapper";

import { createContext, useState } from "react";

const PaymentContext = createContext(null);

export default PaymentContext;

export const PaymentProvider = ({ children,userid,token,pnr }) => {
  const [preparePaymentData, setPreparePaymentData] = useState(null);

//   useEffect(async () => {
//     try {
//       let preparePaymentRequest = buildPreparePaymentRequest(userid,token,pnr);
//       const response =
//         await getPreparePaymentData(preparePaymentRequest);
//       if (response) {
//         setPreparePaymentData(response);
//       }
//     } catch (error) {
//       console.error("Error fetching in context:", error);
//     }
//   }, []);

  return (
    <PaymentContext.Provider value={{ preparePaymentData, setPreparePaymentData }}>
      {children}
    </PaymentContext.Provider>
  );
};

