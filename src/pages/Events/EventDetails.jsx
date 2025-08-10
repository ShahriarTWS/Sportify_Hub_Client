// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router';
// import { Calendar, Mail, MapPin, User } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Loading from '../../components/Loading';
// import Swal from 'sweetalert2';
// import { useAuth } from '../../hooks/hooks';
// import ScrollToTop from '../ScrollToTop/ScrollToTop';

// const EventDetails = () => {
//     const { id } = useParams();
//     const { user } = useAuth();
//     const [event, setEvent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchEvent = async () => {
//             try {
//                 const res = await fetch(`https://sportify-hub-server-nine.vercel.app/events/${id}`);
//                 const data = await res.json();
//                 setEvent(data);
//             } catch (error) {
//                 console.error('Error fetching event:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchEvent();
//     }, [id]);

//     const handleBooking = async () => {
//         if (!user) {
//             Swal.fire({
//                 icon: 'info',
//                 title: 'Login Required',
//                 text: 'You must be logged in to book this event.',
//             });
//             return;
//         }

//         const bookingData = {
//             id: event._id,
//             name: event.name,
//             date: event.date,
//             location: event.location,
//             creatorName: event.creatorName,
//             creatorEmail: event.creatorEmail,
//             user_email: user.email,
//             booking_time: new Date().toISOString(),
//         };

//         try {
//             const res = await fetch('https://sportify-hub-server-nine.vercel.app/bookings', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(bookingData),
//             });

//             if (res.ok) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Booked!',
//                     text: `You have successfully booked "${event.name}".`,
//                 });
//                 navigate('/eventInfo/myBookings');
//             } else {
//                 const errorData = await res.json();
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Booking Failed',
//                     text: errorData.error || 'Please try again later.',
//                 });
//             }
//         } catch (error) {
//             console.error('Error booking event:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Failed to book',
//                 text: 'Please try again later.',
//             });
//         }
//     };

//     if (loading) return <Loading />;

//     if (!event) {
//         return (
//             <div className="text-center mt-28 text-gray-500 text-lg font-medium">
//                 Event not found or failed to load.
//             </div>
//         );
//     }

//     return (
//         <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-8 lg:px-20">
//             <title>SportifyHub || Event Details</title>
//             <ScrollToTop></ScrollToTop>
//             <motion.div
//                 className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-lg"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 {/* Left: Image */}
//                 <div className="h-96 md:h-auto">
//                     <img
//                         src={event.image}
//                         alt={event.name}
//                         className="w-full h-full object-cover object-center"
//                     />
//                 </div>

//                 {/* Right: Details */}
//                 <div className="p-8 flex flex-col justify-between ">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.name}</h1>

//                         <div className="space-y-3 text-gray-600 mb-6">
//                             <div className="flex items-center gap-3">
//                                 <Calendar className="w-5 h-5 text-blue-600" />
//                                 <span>{new Date(event.date).toLocaleDateString()}</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <MapPin className="w-5 h-5 text-blue-600" />
//                                 <span>{event.location}</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <User className="w-5 h-5 text-blue-600" />
//                                 <span>{event.creatorName || 'Admin'}</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <Mail className="w-5 h-5 text-blue-600" />
//                                 <span>{event.creatorEmail}</span>
//                             </div>
//                         </div>

//                         <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
//                         <div>
//                             <p className="text-gray-700 whitespace-pre-line leading-relaxed pr-4">
//                                 {event.description}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="mt-6">
//                         {user ? (
//                             user.email === event.creatorEmail ? (
//                                 <p className="w-full py-4 text-green-600 font-semibold text-center border border-green-200 rounded-xl">
//                                     You Have Created This Event
//                                 </p>
//                             ) : (
//                                 <button
//                                     onClick={handleBooking}
//                                     className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
//                                 >
//                                     Book Now
//                                 </button>
//                             )
//                         ) : (
//                             <p className="text-center text-red-600 font-medium">
//                                 Please login to book this event.
//                             </p>
//                         )}
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default EventDetails;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Calendar, Mail, MapPin, User, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/hooks';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const EventDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [participantCount, setParticipantCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch event details + participant count
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`https://sportify-hub-server-nine.vercel.app/events/${id}`);
                const data = await res.json();
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        const fetchParticipantCount = async () => {
            try {
                const res = await fetch(`https://sportify-hub-server-nine.vercel.app/bookings/count/${id}`);
                const data = await res.json();
                setParticipantCount(data.count || 0);
            } catch (error) {
                console.error('Error fetching participant count:', error);
            }
        };

        Promise.all([fetchEvent(), fetchParticipantCount()]).finally(() => setLoading(false));
    }, [id]);

    // Handle booking
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
            const res = await fetch('https://sportify-hub-server-nine.vercel.app/bookings', {
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

    // Loading or error states
    if (loading) return <Loading />;
    if (!event) {
        return (
            <div className="text-center mt-28 text-gray-500 text-lg font-medium">
                Event not found or failed to load.
            </div>
        );
    }

    return (
        <div className="bg-base-200 py-16 transition-all">
            <title>SportifyHub || Event Details</title>
            <ScrollToTop />

            <h1 className="text-4xl font-extrabold text-center mb-3">
                Event Details
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto mb-6 text-center">
                Get all the essential information about the event including date, location, type, and organizer details to help you stay informed and prepared.
            </p>
            <motion.div
                className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 bg-base-100 rounded-3xl shadow-lg overflow-hidden border border-primary/10 transition-all"
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

                {/* Right: Info */}
                <div className="p-8 flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">{event.name}</h2>

                        <div className="space-y-3  mb-6">
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
                            <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-blue-600" />
                                <span>{participantCount} Participant{participantCount !== 1 ? 's' : ''}</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold  mb-2">Description</h3>
                        <p className=" whitespace-pre-line leading-relaxed pr-4">
                            {event.description}
                        </p>
                    </div>

                    {/* Booking Action */}
                    <div className="mt-6">
                        {user ? (
                            user.email === event.creatorEmail ? (
                                <p className="w-full py-4 text-green-600 font-semibold text-center border border-green-200 rounded-xl">
                                    You Have Created This Event
                                </p>
                            ) : (
                                <button
                                    onClick={handleBooking}
                                    className="w-full py-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
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
