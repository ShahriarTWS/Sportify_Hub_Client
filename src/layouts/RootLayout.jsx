import React from 'react';
import { Outlet } from 'react-router';
import ScrollToTop from '../pages/ScrollToTop/ScrollToTop';
import Header from '../components/Header/Header';

const RootLayout = () => {
    return (
        <div>
            <header className="sticky top-0 z-50 bg-primary shadow-sm">
                <section className="w-full ">
                    <Header />
                </section>
            </header>
            <ScrollToTop></ScrollToTop>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;