import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../../../FireBase/UseAuth';

const SuperAdminRoute = ({ children, ...rest }) => {
    const { user, adminSuperStatus, isAdmiLoading } = UseAuth();
    const location = useLocation();
    if (isAdmiLoading) { return <CircularProgress /> }
    if (user?.email && adminSuperStatus) {
        return children;
    }
    return <Navigate to="/signIn" state={{ from: location }} />;

};

export default SuperAdminRoute;