import * as React from 'react'; 
import UseFireBase from '../../../Hooks/UseFireBase';

const DashboardHome = () => {
    const { user } = UseFireBase()
    return (
        <h1>Hi {user.displayName}</h1>
    );
};

export default DashboardHome;