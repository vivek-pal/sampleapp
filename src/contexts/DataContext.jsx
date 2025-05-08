import { createContext, useContext, useState, useEffect } from "react";
//create context
const DataContext = createContext();

//create a provider component
export const DataProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {

    const getData = async () => {
      try {
        const response = await fetchData();
        if(response){
          setApiData(response);
        }
      } catch (error) {
        console.error("Error fetching in context:", error);
      }
    };

    getData();
  }, []);

  return (
    <DataContext.Provider
      value={{apiData, setApiData }}
    >
      {children}
    </DataContext.Provider>
  );
};


//Method to fetch data using auth token
export const fetchData = async () => {
  try {
  // CDC API
  // let dataSource="/api/pegasus/payment/v1/orchestrator/load?userid=n507945&token=aa254569-01df-4af4-b8eb-2be70a28284f";
  // Payment API
  // let dataSource ="/api/pegasus/payment/v1/orchestrator/load?userid=n507945&token=28a0d1b9-cd45-48a9-8ef6-8252d37e1b77"

  // let dataSource = "/data/PaymentPageLoadResponse.json"; // Local JSON Example
  let dataSource = "/data/paymentPageLoadResponse-EMPTY.json"; // empty JSON Example


  // let dataSource = "/data/cdcPageLoadResponse.json"; // Local JSON Example
  // dataSource = "/data/gizmocdcPageLoadResponse.json"; // Local JSON Example

    // Step 1: Get Auth Token first
    // TODO:as discussed, we will remove below credentials after Intra is on.
                      // const authResponse = await fetch('/api/payment/v1/getAuthToken', {
                      //   method: 'GET',
                      //   headers: {
                      //     'client_id': 'E_24e354c8-1d79-4967-8691-a9f253525d3c',
                      //     'client_secret': 'ctN8Q~S64brJuU5fME2iL-JbtlSR1J7~ehkCAcoN',
                      //     'Content-Type': 'application/json'
                      //   }
                      // });

                      // if (!authResponse.ok) {
                      //   throw new Error('Failed to fetch auth token');
                      // }

                      // const authData = await authResponse.json();
                      // const authToken = authData?.access_token; 

                      // Step 2: Use Auth Token to hit api URL
                      // const dataResponse = await fetch(dataSource, {
                      //   method: 'GET', // or 'POST' depending on your API
                      //   headers: {
                      //     'authorization': `${authToken}`,
                      //     'Content-Type': 'application/json'
                      //   }
                      // });

                      const dataResponse = await fetch(dataSource, {
                        method: 'GET', // or 'POST' depending on your API
                      });

                      if (!dataResponse.ok) {
                        throw new Error('Failed to fetch data');
                      }

                      const data = await dataResponse.json();
                      console.log('Data received:', data);
                      return data;

                    } 
                    catch (error) {
                      console.error('Error:', error.message);
                    }
};


export const useApiData = () => useContext(DataContext);