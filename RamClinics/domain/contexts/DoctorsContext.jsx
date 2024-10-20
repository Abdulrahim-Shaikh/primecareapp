import React, { createContext, useState, useContext } from 'react';

const DoctorsContext = createContext();
export const useDoctors = () => useContext(DoctorsContext);

export const DoctorsProvider = ({ children }) => {
    const [doctors, setDoctors] = useState([]);

    const changeDoctors = (newDoctorsList) => {
        setDoctors(newDoctorsList);
    };

    return (
        <DoctorsContext.Provider value={{ doctors, changeDoctors }}>
            {children}
        </DoctorsContext.Provider>
    );
};