import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router';
import { useAuth } from '../../hooks/hooks';
import Loading from '../Loading';
import ScrollToTop from '../../pages/ScrollToTop/ScrollToTop';

const Banner = () => {

    const [upcomingEvents, setUpcomingEvents] = useState([])
    const { loading, setLoading } = useAuth()
    useEffect(() => {
        // fetch('http://localhost:3000/all-events',)
        fetch('http://localhost:3000/all-events',)
            .then(res => res.json())
            .then(data => {
                setUpcomingEvents(data);
                // console.log(data);
                setLoading(false);
            })
    }, [])

    // Sort events by date ascending and slice first 6
    const sortedEvents = [...upcomingEvents]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    if (loading) {
        return (
            <Loading></Loading>
        );
    }

    return (
        <div className="h-[90vh]">
            <ScrollToTop></ScrollToTop>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                loop={sortedEvents.length > 2}
                speed={1000}
                className="h-full"
            >
                {sortedEvents.map((event) => (
                    <SwiperSlide key={event.id}>
                        {/* Slide background image */}
                        <div
                            className="relative h-full w-full bg-center bg-cover flex items-center justify-center "
                            style={{ backgroundImage: `url(${event.image})` }}
                        >
                            {/* Dark overlay for readability */}
                            <div className="absolute inset-0 bg-[#00000090]"></div>

                            {/* Content */}
                            <div className="relative z-10 text-center max-w-3xl px-4">
                                <h2 className="text-4xl px-2 md:px-0 md:text-6xl font-bold text-white mb-4 ">
                                    {event.name}

                                </h2>
                                <p className="text-lg md:text-xl text-gray-200 mb-2">
                                    📍 {event.location} &nbsp; | &nbsp;
                                    📅{" "}
                                    {new Date(event.date).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <p className="text-white px-2 md:px-0 mb-6">{event.description}</p>
                                <button
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition"
                                >
                                    <Link to={(`/eventInfo/events/${event._id}`)}>
                                        View Details
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
