import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Calendar, Mail, MapPin, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/hooks';

const EventDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`http://localhost:3000/events/${id}`);
                const data = await res.json();
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            Swal.fire({
                icon: 'info',
                title: 'Login Required',
                text: 'You must be logged in to book this event.',
            });
            return;
        }

        const bookingData = {
            id: event._id,
            name: event.name,
            date: event.date,
            location: event.location,
            creatorName: event.creatorName,
            creatorEmail: event.creatorEmail,
            user_email: user.email,
            booking_time: new Date().toISOString(),
        };

        try {
            const res = await fetch('http://localhost:3000/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData),
            });

            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Booked!',
                    text: `You have successfully booked "${event.name}".`,
                });
                navigate('/eventInfo/myBookings');
            } else {
                const errorData = await res.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Booking Failed',
                    text: errorData.error || 'Please try again later.',
                });
            }
        } catch (error) {
            console.error('Error booking event:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to book',
                text: 'Please try again later.',
            });
        }
    };

    if (loading) return <Loading />;

    if (!event) {
        return (
            <div className="text-center mt-28 text-gray-500 text-lg font-medium">
                Event not found or failed to load.
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-8 lg:px-20">
            <title>SportifyHub || Event Details</title>
            <motion.div
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Left: Image */}
                <div className="h-96 md:h-auto">
                    <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* Right: Details */}
                <div className="p-8 flex flex-col justify-between ">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.name}</h1>

                        <div className="space-y-3 text-gray-600 mb-6">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-blue-600" />
                                <span>{event.creatorName || 'Admin'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-600" />
                                <span>{event.creatorEmail}</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
                        <div>
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed pr-4">
                                {event.description}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        {user ? (
                            user.email === event.creatorEmail ? (
                                <p className="w-full py-4 text-green-600 font-semibold text-center border border-green-200 rounded-xl">
                                    You Have Created This Event
                                </p>
                            ) : (
                                <button
                                    onClick={handleBooking}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
                                >
                                    Book Now
                                </button>
                            )
                        ) : (
                            <p className="text-center text-red-600 font-medium">
                                Please login to book this event.
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default EventDetails;
