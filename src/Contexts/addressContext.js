import React, { createContext, useState } from 'react';

const AddressContext = createContext();

function AddressProvider({ children }) {
    const [address, setAddress] = useState("");
    return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
    );
}

export default AddressProvider;
export { AddressContext };