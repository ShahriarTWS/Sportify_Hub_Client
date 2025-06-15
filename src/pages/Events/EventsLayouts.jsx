import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const EventsLayouts = () => {
   return (
        <div>
            <ScrollToTop></ScrollToTop>
            <header className="sticky top-0 z-50 bg-primary shadow-sm">
                <section className="w-full max-w-screen-xl mx-auto">
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

export default EventsLayouts;