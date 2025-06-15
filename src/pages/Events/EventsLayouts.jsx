import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router';

const EventsLayouts = () => {
   return (
        <div>
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