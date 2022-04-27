import { Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const SearchBox = () => {
    const getSearchedWord = (e) => {
        console.log(e.target.value)
    }
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
        </>
    );
};

export default SearchBox;