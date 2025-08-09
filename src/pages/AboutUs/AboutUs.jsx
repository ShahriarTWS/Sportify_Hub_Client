import React from 'react';
import { CalendarDays, Medal, UsersRound } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import bikeImg from '../../assets/svg/bike-rideIMG.svg';
import jumpImg from '../../assets/svg/jumpIMG.svg';
import runImg from '../../assets/svg/runIMG.svg';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const AboutUs = () => {
    return (
        <div>

            <title>SportifyHub || About Us</title>
            <ScrollToTop></ScrollToTop>
            {/* Sticky Header */}

            {/* About Section */}
            <section className="bg-base-200 py-16 md:px-16">
                <div className="w-11/12 mx-auto">
                    {/* Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">About Sportify Hub</h2>
                        <p className="text-lg text-base-1000">
                            Where passion for sports meets seamless event experiences.
                        </p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 ">Who We Are</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Sportify Hub is your go-to platform for discovering, managing, and booking athletic events across the nation. We empower both organizers and participants to experience smooth, dynamic sports journeys — from planning to participation.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Medal className="text-yellow-400 w-8 h-8 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">Our Vision</h4>
                                        <p className="text-gray-500">
                                            Build a connected and thriving sports ecosystem for all — players, fans, and organizers.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <CalendarDays className="text-blue-500 w-8 h-8 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">Our Mission</h4>
                                        <p className="text-gray-500">
                                            Make sports event booking seamless, inclusive, and tech-powered for everyone involved.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <UsersRound className="text-green-500 w-8 h-8 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">Our Values</h4>
                                        <ul className="list-disc ml-5 text-gray-500">
                                            <li>Passion & Sportsmanship</li>
                                            <li>Fair Play & Inclusivity</li>
                                            <li>Community Collaboration</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Images */}
                        <div className="grid grid-cols-2 gap-4">
                            <img src={bikeImg} alt="Bike Ride" className="rounded-xl shadow-lg w-full" />
                            <img src={jumpImg} alt="Jump" className="rounded-xl shadow-lg w-full" />
                            <img src={runImg} alt="Run" className="rounded-xl shadow-lg w-full col-span-2" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100">
                <Footer />
            </footer>
        </div>
    );
};

export default AboutUs;
