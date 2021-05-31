import React, { createContext, useState } from 'react';

const IsSubmitContext = createContext();

function IsSubmitProvider({ children }) {
    const [isSubmit, setIsSubmit] = useState(false);
    return (
    <IsSubmitContext.Provider value={{ isSubmit, setIsSubmit }}>
      {children}
    </IsSubmitContext.Provider>
    );
}

export default IsSubmitProvider;
export { IsSubmitContext };