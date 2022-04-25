import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; 
import UseAuth from '../../../FireBase/UseAuth';

const SuperAdminRoute = ({ children, ...rest }) => {
    const { user, SuperAdminRoute, isLoading } = UseAuth();
    const location = useLocation();
    if (isLoading) { return <CircularProgress /> }
    if (user.email && SuperAdminRoute) {
        return children;
    }
    return <Navigate to="/signIn" state={{ from: location }} />;

};

export default SuperAdminRoute;