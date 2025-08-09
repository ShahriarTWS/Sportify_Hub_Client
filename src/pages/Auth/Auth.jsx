import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Auth = () => {
    return (
        <div>
            <ScrollToTop></ScrollToTop>
            <header className="sticky top-0 z-50 bg-primary shadow-sm">
                <section className="w-full ">
                    <Header />
                </section>
            </header>

            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default Auth;