import React, { createContext, useState, useContext } from 'react';

const CitiesContext = createContext();
export const useCities = () => useContext(CitiesContext);

export const CitiesProvider = ({ children }) => {
    const [cities, setCities] = useState([]);

    const changeCities = (newCitiesList) => {
        setCities(newCitiesList);
    };

    return (
        <CitiesContext.Provider value={{cities, changeCities}}>
            {children}
        </CitiesContext.Provider>
    );
};