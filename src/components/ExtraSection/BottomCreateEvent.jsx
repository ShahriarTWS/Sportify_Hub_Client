import React from 'react';
import { Link } from 'react-router';
import bikeImg from '../../assets/svg/bike-rideIMG.svg';

const BottomCreateEvent = () => {
    return (
        <div className=''>
            <section className="flex flex-col md:flex-row items-center justify-between bg-base-200 p-8 rounded-lg shadow-md w-11/12 mx-auto my-12">
                {/* Text Content */}
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-4xl font-bold mb-4 ">
                        Discover and Join Exciting Athletic Events Near You
                    </h1>
                    <p className="text-lg  mb-6">
                        Sportify Hub helps you find, create, and manage sports events effortlessly. Join the community and take part in competitions that matter.
                    </p>
                    <Link
                        to="/eventInfo/create-event"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
                    >
                        Create Event
                    </Link>
                </div>

                {/* Image */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src={bikeImg}
                        alt="Athletic Event"
                        className="rounded-lg max-w-full h-auto"
                    />
                </div>
            </section>
        </div>
    );
};

export default BottomCreateEvent;