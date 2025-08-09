import React from 'react';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import FeaturedEvents from '../../components/FeaturedEvents/FeaturedEvents';
import HowSportifyHubWorks from '../../components/ExtraSection/HowSportifyHubWorks';
import TopCategories from '../../components/ExtraSection/TopCategories';
import WhatPeopleSay from '../../components/ExtraSection/WhatPeopleSay';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Home = () => {
  return (
    <div>
      <title>SportifyHub || Home</title>

      <ScrollToTop></ScrollToTop>

      {/* <header className="sticky top-0 z-50 bg-primary shadow-sm">
        <section className="w-full ">
          <Header />
        </section>
      </header> */}

      <main>
        <Banner></Banner>
        <FeaturedEvents></FeaturedEvents>
        <HowSportifyHubWorks></HowSportifyHubWorks>
        <TopCategories></TopCategories>
        <WhatPeopleSay></WhatPeopleSay>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Home;