import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';  
import UseAuth from '../../../FireBase/UseAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { user, admin, isLoading } = UseAuth();
    console.log(admin)
    const location = useLocation();
    if (isLoading) { return <CircularProgress /> }
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;

};

export default AdminRoute;