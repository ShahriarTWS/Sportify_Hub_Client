import React from 'react';
import { Outlet } from 'react-router';
import ScrollToTop from '../pages/ScrollToTop/ScrollToTop';

const RootLayout = () => {
    return (
        <div>
            <ScrollToTop></ScrollToTop>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;