import React, { createContext, useState, useContext } from 'react';

const AppBranchesContext = createContext();
export const useAppBranches = () => useContext(AppBranchesContext);

export const AppBranchesProvider = ({ children }) => {
    const [appBranches, setAppBranches] = useState([]);

    const changeAppBranches = (newAppBranchesList) => {
        setAppBranches(newAppBranchesList);
    };

    return (
        <AppBranchesContext.Provider value={{appBranches, changeAppBranches}}>
            {children}
        </AppBranchesContext.Provider>
    );
};