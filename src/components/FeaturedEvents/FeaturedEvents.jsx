import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router"; // corrected router import
import { motion } from "framer-motion";

const FeaturedEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/events")
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
            });
    }, []);

    const sortedEvents = [...events]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 6);

    return (
        <div className="bg-primary">
            <section className="max-w-7xl mx-auto px-4 py-12">
                <motion.h2
                    className="text-3xl font-bold text-base-100 mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    Featured Events
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {sortedEvents.map((event, index) => (
                        <motion.div
                            key={event._id}
                            className="bg-base-100 rounded-lg shadow-md overflow-hidden flex flex-col"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: false, amount: 0.2 }}
                        >
                            <img
                                src={event.image}
                                alt={event.name}
                                className="w-full h-48 object-cover"
                                loading="lazy"
                            />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold mb-2 text-primary">
                                    {event.name}
                                </h3>
                                <p className="text-gray-600 mb-1">
                                    📅{" "}
                                    {new Date(event.date).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <p className="text-gray-600 mb-4">📍 {event.location}</p>
                                <button className="btn btn-accent mt-auto py-2 rounded-md font-semibold hover:brightness-110 transition">
                                    <Link to={`/eventInfo/events/${event._id}`}>
                                        View Details
                                    </Link>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="flex justify-center mt-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: false }}
                >
                    <button
                        onClick={() => navigate("/events")}
                        className="btn btn-primary px-8 py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-neutral transition"
                    >
                        See All Events
                    </button>
                </motion.div>
            </section>
        </div>
    );
};

export default FeaturedEvents;
