import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Calendar, MapPin, User } from 'lucide-react';
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
            ...event,
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
                navigate('/my-bookings');
            } else {
                throw new Error('Booking failed');
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
            <div className="text-center mt-20 text-gray-600">
                Event not found or failed to load.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-40">
            <motion.div
                className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Image Section */}
                <div>
                    <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-80 object-cover rounded-xl"
                    />
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.name}</h1>
                        <div className="space-y-2 text-gray-600 mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <span>{event.creatorName || 'Admin'}</span>
                            </div>
                        </div>
                        <p className="text-gray-700 text-lg">{event.description}</p>
                    </div>

                    <div className="mt-6">
                        {user ? (
                            <button
                                onClick={handleBooking}
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Book Now
                            </button>
                        ) : (
                            <p className="text-red-600 text-sm font-medium">
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
