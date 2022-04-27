import { Box, Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import GetProductData from '../../../../Hooks/GetProductData';

const SearchBox = () => {
    const { products } = GetProductData()
    const [input, setInput] = useState()
    const getSearchedWord = (e) => {
        if (e.target.value.length !== 0) {
            setInput(e.target.value.toLowerCase())
        } 
    }
    const matchedProducts = products.filter(product => product?.productName?.toLowerCase().includes(input));

    console.log(matchedProducts);
    // console.log(products);

    return (
        <>
            <InputBase
                sx={{ ml: 1, flex: 1, }}
                placeholder="Search Your Product"
                inputProps={{ 'aria-label': 'search What You want' }}
                onChange={getSearchedWord}
            />
            <Button type="submit" sx={{ p: '10px', backgroundColor: '#FE9C00', }} aria-label="search"   >
                <SearchIcon />
            </Button>
            <Box>
                {/* {
                    matchedProducts.map(product => <Box>
                        <img src={product?.mainPicture} width="50px" alt="" />
                    </Box>)
                } */}
            </Box>

        </>
    );
};

export default SearchBox;