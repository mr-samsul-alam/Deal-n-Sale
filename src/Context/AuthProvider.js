import { createContext } from "react";
import GetProductData from "../Hooks/GetProductData";
import UseFireBase from "../Hooks/UseFireBase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const allContexts = UseFireBase();
    const allProductsData = GetProductData();
    // const allCartsData = UseMyCartsData();
    const allData = { ...allContexts, ...allProductsData }
    return (
        <AuthContext.Provider value={allData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;