import { createContext } from "react";
import GetProductData from "../Hooks/GetProductData";

export const ProductsContext = createContext(null);

const ProductsProvider = ({ children }) => {
    const allProductsData = GetProductData(); 
    return (
        <ProductsContext.Provider value={allProductsData}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;