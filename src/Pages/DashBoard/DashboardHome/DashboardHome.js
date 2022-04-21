import * as React from 'react';  
import UseAuth from '../../../FireBase/UseAuth';

const DashboardHome = () => {
    const { user } = UseAuth()
    return (
        <h1>Hi {user.displayName}</h1>
    );
};

export default DashboardHome;