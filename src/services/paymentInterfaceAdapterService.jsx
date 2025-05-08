/**-------------------------------------------------------------------------------------------
 * @module paymentInterfaceAdapterService
 * @author Coforge/IAG Payment Team
 * @version 1.0.0 
 * <TODO Update Documents>
 * @description This service class is providing functions to focused on handling tasks related to internal payment interface."
 * @throws {Error} - If an error is encountered while processing the request, this function throws an Error object.
-------------------------------------------------------------------------------------------*/
const API_URL = 'https://paymentplatform-dev.int.iag.cloud/pegasus/payment/v1';
const PREPARE_PAYMENT_ENDPOINT = API_URL+'/semafone/prepare';
const EXECUTE_PAYMENT_ENDPOINT = API_URL+'/semafone/execute/';
const CARD_DETAIL_ENDPOINT = API_URL+'/semafone/carddetails/';
const GIZMO_CARD_DETAIL_ENDPOINT = API_URL+'/semafone/carddetails/gizmo';
const AUTH_TOKEN_ENDPOINT = API_URL+`/api/payment/v1/getAuthToken`;
const Mock_API = true;


/**-------------------------------------------------------------------------------------------
* This function .  TODO
* @function {getPreparePaymentData}
* @param {Object} reqBody - The request body containing token to get the payment data from service.
* @returns {Promise<Object>} - A promise that resolves to the response object with payment interface data.
---------------------------------------------------------------------------------------------*/
export const getPreparePaymentData = async (request) => {
  try {
    let response = ""
    if(Mock_API) {
      const dataResponse = await fetch("/data/mock/preparePaymentServiceResponse.json")
      response = await dataResponse.json();
    } else {
      response = await httpPostService(PREPARE_PAYMENT_ENDPOINT,request);
     
    }
    return response;
  } catch (error) {
    console.error('Error during POST request:', error);
    throw error;
  }
};



/**-------------------------------------------------------------------------------------------
* This function .  TODO
* @function {getPreparePaymentData}
* @param {Object} reqBody - The request body containing token to get the payment data from service.
* @returns {Promise<Object>} - A promise that resolves to the response object with payment interface data.
---------------------------------------------------------------------------------------------*/
export const processExecutePayment = async (request) => {
    try {
      let response = await httpPostService(EXECUTE_PAYMENT_ENDPOINT,request);
      return response;
    } catch (error) {
      console.error('Error during POST request:', error);
      throw error;
    }
  };


/**-------------------------------------------------------------------------------------------
* This function .  TODO
* @function {getPreparePaymentData}
* @param {Object} reqBody - The request body containing token to get the payment data from service.
* @returns {Promise<Object>} - A promise that resolves to the response object with payment interface data.
---------------------------------------------------------------------------------------------*/
export const captureCardDetail = async (request) => {
    try {
      let response = await httpPostService(CARD_DETAIL_ENDPOINT,request);
      return response;
    } catch (error) {
      console.error('Error during POST request:', error);
      throw error;
    }
  };

/**-------------------------------------------------------------------------------------------
* This function .  TODO
* @function {getPreparePaymentData}
* @param {Object} reqBody - The request body containing token to get the payment data from service.
* @returns {Promise<Object>} - A promise that resolves to the response object with payment interface data.
---------------------------------------------------------------------------------------------*/
  export const captureGizmoCardDetail = async (request) => {
    try {
      let response = await httpPostService(GIZMO_CARD_DETAIL_ENDPOINT,request);
      return response;
    } catch (error) {
      console.error('Error during POST request:', error);
      throw error;
    }
  };



const httpPostService = async (endpoint,request) =>{
    const authToken = await authResponse();
    const response = await fetch(`${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${authToken}`
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
}


const authResponse = async (request) => {
  try {
    const response = await fetch(`${AUTH_TOKEN_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'client_id': 'E_24e354c8-1d79-4967-8691-a9f253525d3c',
        'client_secret': 'ctN8Q~S64brJuU5fME2iL-JbtlSR1J7~ehkCAcoN',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const result = await response.json();
    if(result){
      const authToken = authData?.access_token
      return authToken;
    }
  } catch (error) {
    console.error('Error during POST request:', error);
    throw error;
  }
};