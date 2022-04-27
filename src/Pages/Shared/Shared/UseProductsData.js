import { useContext } from 'react';
import { ProductsContext } from '../../../Context/ProductsProvider';

const UseProductsData = () => {
    const products = useContext(ProductsContext); 
    return products;
}

export default UseProductsData;