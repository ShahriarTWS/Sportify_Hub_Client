import React from "react";
import { motion } from "framer-motion";
import ScrollToTop from "../../pages/ScrollToTop/ScrollToTop";

const testimonials = [
    {
        id: 1,
        name: "Ariana Gomez",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        text: "SportifyHubPoint helped me discover amazing events near me. The booking experience was seamless!",
        role: "Athlete, Sprinting"
    },
    {
        id: 2,
        name: "Rahim Uddin",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        text: "I found my first competition through this platform. Loved the interface and how easy it was to join.",
        role: "Swimmer"
    },
    {
        id: 3,
        name: "Linda Park",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        text: "As a coach, managing events has never been easier. Great work, SportifyHubPoint team!",
        role: "Coach, High Jump"
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut"
        }
    })
};

const WhatPeopleSay = () => {
    return (
        <section className="bg-white py-16 px-4 max-w-7xl mx-auto">
            <ScrollToTop></ScrollToTop>
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">What People Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={testimonial.id}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        custom={index}
                        className="bg-base-100 p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition"
                    >
                        <div className="flex items-center space-x-4 mb-4">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                            />
                            <div>
                                <h4 className="text-lg font-semibold text-primary">{testimonial.name}</h4>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm">{testimonial.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhatPeopleSay;
