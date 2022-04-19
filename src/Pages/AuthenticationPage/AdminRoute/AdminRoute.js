import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseFireBase from '../../../Hooks/UseFireBase';

const AdminRoute = ({ children, ...rest }) => {
    const { user, admin, isLoading } = UseFireBase();
    console.log(admin)
    const location = useLocation();
    if (isLoading) { return <CircularProgress /> }
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;

};

export default AdminRoute;