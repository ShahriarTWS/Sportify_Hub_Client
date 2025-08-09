import React from 'react';
import { CalendarCheck, ClipboardPlus, Trophy, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import BlurText from '../../assets/animation/BlurText';
import ScrollToTop from '../../pages/ScrollToTop/ScrollToTop';

const HowSportifyHubWorks = () => {
    const steps = [
        {
            icon: <Users className="h-10 w-10 text-blue-600" />,
            title: 'Join the Community',
            desc: 'Create your account and become part of the active athletic community.',
        },
        {
            icon: <ClipboardPlus className="h-10 w-10 text-blue-600" />,
            title: 'Create or Discover Events',
            desc: 'Browse exciting sports events or host your own with ease.',
        },
        {
            icon: <CalendarCheck className="h-10 w-10 text-blue-600" />,
            title: 'Book & Compete',
            desc: 'Book events with one click and showcase your skills on the field.',
        },
        {
            icon: <Trophy className="h-10 w-10 text-blue-600" />,
            title: 'Achieve & Celebrate',
            desc: 'Track your progress, earn rewards, and celebrate your victories with the community.',
        }
    ];

    return (
        <div className="bg-base-200 py-16">
            <ScrollToTop></ScrollToTop>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.3 }}
                className="w-11/12 mx-auto text-center"
            >
                {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                    How Sportify-Hub Works
                </h2> */}
                <BlurText
                    text='How Sportify-Hub Works'
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-3xl md:text-4xl font-bold  mb-3 flex justify-center"
                />
                <p className="text-gray-500 max-w-2xl mx-auto mb-6">
                    Whether you're an athlete or an organizer, our platform makes it easy to connect, compete, and grow.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            viewport={{ once: false, amount: 0.3 }}
                            className="bg-base-100 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-300"
                        >
                            <div className="mb-4">{step.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-500 text-sm">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default HowSportifyHubWorks;
