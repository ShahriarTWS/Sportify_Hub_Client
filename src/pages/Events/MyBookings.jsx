import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/hooks';
import Loading from '../../components/Loading';
import Swal from 'sweetalert2';
import { LayoutGrid, LayoutList } from 'lucide-react';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const MyBookings = () => {
    const { user, loading, setLoading } = useAuth();
    const [bookings, setBookings] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [isTableView, setIsTableView] = useState(true); // toggle state
    // console.log('Sending token:', user?.accessToken);
    // Fetch bookings
    useEffect(() => {
        const fetchBookings = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`https://sportify-hub-server-nine.vercel.app/bookings?user_email=${user.email}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken || ''}`
                    },
                    credentials: 'include'

                });


                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);



    // Delete booking
    const handleDelete = async (bookingId) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to cancel this booking?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`https://sportify-hub-server-nine.vercel.app/bookings/${bookingId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
                setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
            } else {
                Swal.fire('Error', 'Failed to cancel booking.', 'error');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
            Swal.fire('Error', 'Failed to cancel booking.', 'error');
        }
    };

    if (loading) return <Loading />;

    if (!user) {
        return <p className="text-center mt-20 text-red-600 font-semibold">Please login to see your bookings.</p>;
    }
    if (loading) return <Loading />;
    if (bookings.length === 0) {
        return <p className="text-center h-[50vh] my-20 text-gray-500 font-medium">You have no bookings yet.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
            <title>SportifyHub || My Bookings</title>
            <ScrollToTop></ScrollToTop>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Bookings</h1>

                <div className="flex gap-2">
                    {/* Table View Button */}
                    <button
                        onClick={() => setIsTableView(true)}
                        className={`p-2 rounded-lg border transition ${isTableView
                            ? 'bg-blue-600 text-white border-blue-700 shadow'
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                            }`}
                        title="Table View"
                    >
                        <LayoutList className="w-6 h-6" />
                    </button>

                    {/* Card View Button */}
                    <button
                        onClick={() => setIsTableView(false)}
                        className={`p-2 rounded-lg border transition ${!isTableView
                            ? 'bg-blue-600 text-white border-blue-700 shadow'
                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                            }`}
                        title="Card View"
                    >
                        <LayoutGrid className="w-6 h-6" />
                    </button>
                </div>
            </div>



            {isTableView ? (
                // TABLE VIEW
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-3 px-6 text-left">Event Name</th>
                                <th className="py-3 px-6 text-left">Date</th>
                                <th className="py-3 px-6 text-left">Location</th>
                                <th className="py-3 px-6 text-left">Booked On</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(({ _id, eventName, eventDate, eventLocation, bookingTime }) => (
                                <tr key={_id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-4 px-6">{eventName}</td>
                                    <td className="py-4 px-6">{new Date(eventDate).toLocaleDateString()}</td>
                                    <td className="py-4 px-6">{eventLocation}</td>
                                    <td className="py-4 px-6">{new Date(bookingTime).toLocaleString()}</td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            onClick={() => handleDelete(_id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // CARD VIEW
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {bookings.map(({ _id, eventName, eventDate, eventLocation, bookingTime }) => (
                        <div
                            key={_id}
                            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between border"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{eventName}</h2>
                                <p className="text-gray-600 mb-1">
                                    <strong>Date:</strong> {new Date(eventDate).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <strong>Location:</strong> {eventLocation}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Booked On:</strong> {new Date(bookingTime).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(_id)}
                                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                Cancel Booking
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
