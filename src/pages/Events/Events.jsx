import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';

const Events = () => {
    return (
        <div>
            <header className=" relative">
                <div className='bg-primary sticky'>
                    <section className=" top-0  w-full max-w-screen-xl mx-auto z-50">
                        <Header />
                    </section>
                </div>
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

export default Events;