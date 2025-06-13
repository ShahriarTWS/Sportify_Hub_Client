import React from 'react';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import FeaturedEvents from '../../components/FeaturedEvents/FeaturedEvents';
import HowSportifyHubWorks from '../../components/ExtraSection/HowSportifyHubWorks';

const Home = () => {
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
            <Banner></Banner>
            <FeaturedEvents></FeaturedEvents>
            <HowSportifyHubWorks></HowSportifyHubWorks>
          </main>

          <footer>
            <Footer></Footer>
          </footer>
        </div>
    );
};

export default Home;