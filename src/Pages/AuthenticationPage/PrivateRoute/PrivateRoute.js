import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseFireBase from '../../../Hooks/UseFireBase';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = UseFireBase();
    let location = useLocation();
    if (isLoading) { return <CircularProgress /> }
    if (user.email) {
        return children;
    }
    return <Navigate to="/signIn" state={{ from: location }} />;
};

export default PrivateRoute;