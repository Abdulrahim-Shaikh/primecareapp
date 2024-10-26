import React, { createContext, useState, useContext } from 'react';

const SpecialitiesContext = createContext();
export const useSpecialities = () => useContext(SpecialitiesContext);

export const SpecialitiesProvider = ({ children }) => {
    const [allSpecialities, setAllSpecialities] = useState([]);

    const changeSpecialities = (newSpecialitiesList) => {
        setAllSpecialities(newSpecialitiesList);
    };

    return (
        <SpecialitiesContext.Provider value={{allSpecialities, changeSpecialities}}>
            {children}
        </SpecialitiesContext.Provider>
    );
};