import React from "react";
import { motion } from "framer-motion";
import { FaRunning, FaSwimmer, FaHiking, FaFutbol } from "react-icons/fa";
import { MdOutlineSportsKabaddi } from "react-icons/md";
import ScrollToTop from "../../pages/ScrollToTop/ScrollToTop";

const categories = [
    {
        name: "Sprinting",
        icon: <FaRunning size={40} className="text-blue-500" />,
        description: "Speed competitions like 100m & 200m dashes."
    },
    {
        name: "Swimming",
        icon: <FaSwimmer size={40} className="text-teal-500" />,
        description: "Freestyle, butterfly, relay and more aquatic events."
    },
    {
        name: "Hurdle Race",
        icon: <FaHiking size={40} className="text-orange-500" />,
        description: "Track races involving barriers and speed coordination."
    },
    {
        name: "High Jump",
        icon: <MdOutlineSportsKabaddi size={40} className="text-purple-500" />,
        description: "Vertical leap-based competition for record heights."
    },
    {
        name: "Long Jump",
        icon: <FaFutbol size={40} className="text-red-500" />,
        description: "Athletic skill to leap farthest from a set point."
    }
];

const TopCategories = () => {
    return (
        <section className="bg-base-200 py-16">
            <ScrollToTop></ScrollToTop>
            <motion.h2
                className="text-3xl md:text-4xl font-bold  mb-3 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
            >
                Top Categories
            </motion.h2>

            <p className="text-gray-500 max-w-2xl mx-auto mb-6 text-center">
                Explore the most popular sports and activities loved by our community.
            </p>

            <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {categories.map((cat, index) => (
                    <motion.div
                        key={index}
                        className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center hover:scale-105"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className="mb-4 flex justify-center">{cat.icon}</div>
                        <h3 className="text-lg font-semibold mb-2">{cat.name}</h3>
                        <p className="text-gray-500 text-sm">{cat.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TopCategories;
