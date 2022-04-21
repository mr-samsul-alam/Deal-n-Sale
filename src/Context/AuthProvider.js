import { createContext } from "react";
import UseFireBase from "../Hooks/UseFireBase";
import UseMyCartsData from "../Hooks/UseMyCartsData";
import UseProductsData from "../Hooks/UseProductsData";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const allContexts = UseFireBase();
    const allProductsData = UseProductsData();
    // const allCartsData = UseMyCartsData();
    const allData = { ...allContexts, ...allProductsData}
    return (
        <AuthContext.Provider value={allData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;