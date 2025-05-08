import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState( {userid:"", userName:"", isLoggedIn: true});
    const [pegasusInputData, setPegasusInputData] = useState( {token:"",
    pnr:""});
  
    const updateUser = (userData) => {
      setUser(userData);
    };

    const updatePegasusInput = (data) => {
        setPegasusInputData(data);
      };
  
    const contextValue = {
      user,
      updateUser,
      pegasusInputData
      ,updatePegasusInput
    };
  
    return (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );
  };

  export default UserContext;