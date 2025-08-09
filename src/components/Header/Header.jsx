import React from 'react';
import Navbar from './Navbar';
import ScrollToTop from '../../pages/ScrollToTop/ScrollToTop';

const Header = () => {
    return (
        <div className=' w-full'>
            <ScrollToTop></ScrollToTop>
            <div className='py-3 mx-auto '>
                <Navbar></Navbar>
            </div>
        </div>
    );
};

export default Header;