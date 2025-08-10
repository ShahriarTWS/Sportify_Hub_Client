import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Calendar, MapPin, Search, Filter, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const eventTypes = ['Swimming', 'Sprinting', 'Long Jump', 'High Jump', 'Hurdle race'];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('https://sportify-hub-server-nine.vercel.app/all-events');
                const data = await res.json();
                const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setEvents(sorted);
                setFilteredEvents(sorted);
            } catch (err) {
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        let filtered = [...events];

        if (searchTerm) {
            filtered = filtered.filter(
                (event) =>
                    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedType) {
            filtered = filtered.filter((event) => event.type === selectedType);
        }

        setFilteredEvents(filtered);
    }, [searchTerm, selectedType, events]);

    if (loading) {
        return <Loading />;
    }

    return (
        <motion.div
            className="min-h-screen bg-base-200 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-11/12 mx-auto">
                <ScrollToTop></ScrollToTop>
                <title>SportifyHub || All Events</title>
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold  mb-4">Athletic Events</h1>
                    <p className="md:text-xl text-gray-500 max-w-3xl mx-auto">
                        Discover and join exciting athletic events in your area. From swimming to sprinting, find the perfect competition for your skills.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="bg-base-100 p-6 rounded-lg shadow-md mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search events by name or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none  md:min-w-[200px]"
                            >
                                <option value="">All Event Types</option>
                                {eventTypes.map((type) => (
                                    <option key={type} className='bg-base-100' value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {filteredEvents.length} of {events.length} events
                        {searchTerm && ` for "${searchTerm}"`}
                        {selectedType && ` in ${selectedType}`}
                    </p>
                </div>

                {/* Events Grid */}
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Calendar className="h-16 w-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-600">
                            {searchTerm || selectedType
                                ? 'Try adjusting your search criteria'
                                : 'Check back later for new events'}
                        </p>
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.15,
                                },
                            },
                        }}
                    >
                        {filteredEvents.map((event) => (
                            <motion.div
                                key={event._id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.1 }}
                                className="bg-base-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                            >
                                <div className="relative h-48">
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {event.type}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-white bg-opacity-90 text-gray-900 px-2 py-1 rounded text-xs font-medium">
                                            {new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold  mb-2 line-clamp-2">
                                        {event.name}
                                    </h3>
                                    <div className="flex items-center  mb-2">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center  mb-4">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        <span className="text-sm line-clamp-1">{event.location}</span>
                                    </div>
                                    <p className="text-gray-400 mb-4 line-clamp-3">{event.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm ">
                                            By {event.creatorName || 'Admin'}
                                        </span>
                                        <Link
                                            to={`/eventInfo/events/${event._id}`}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
                                        >
                                            View Details
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Events;
