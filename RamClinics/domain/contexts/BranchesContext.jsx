import React, { createContext, useState, useContext } from 'react';

const BranchesContext = createContext();
export const useBranches = () => useContext(BranchesContext);

export const BranchesProvider = ({ children }) => {
    const [branches, setBranches] = useState([]);

    const changeBranches = (newBranchesList) => {
        setBranches(newBranchesList);
    };

    return (
        <BranchesContext.Provider value={{branches, changeBranches}}>
            {children}
        </BranchesContext.Provider>
    );
};