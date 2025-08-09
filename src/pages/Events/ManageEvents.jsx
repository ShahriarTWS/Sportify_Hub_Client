import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';
import { useAuth } from '../../hooks/hooks';
import { Pencil, Trash2, Plus } from 'lucide-react';
import axios from 'axios';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const ManageEvents = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) return;

        const fetchEvents = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/events`, {
                    params: { creatorEmail: user.email },
                    headers: {
                        authorization: `Bearer ${user?.accessToken || ''}`
                    },
                    withCredentials: true
                });
                setEvents(res.data);
            } catch (error) {
                console.error('Error fetching user events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [user]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This event will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.delete(`http://localhost:3000/events/${id}`);
            setEvents(events.filter((e) => e._id !== id));
            Swal.fire('Deleted!', 'The event has been deleted.', 'success');
        } catch (error) {
            console.error('Delete error:', error);
            Swal.fire('Error', 'Failed to delete event.', 'error');
        }
    };

    const handleUpdate = (id) => {
        navigate(`/eventInfo/updateEvent/${id}`);
    };

    const handleCreate = () => {
        navigate('/eventInfo/create-event');
    };

    if (loading) return <Loading />;

    return (
        <div className='bg-base-200 min-h-screen transition-all'>
            <div className="w-11/12  mx-auto py-10">
                <title>SportifyHub || Manage Events</title>
                <ScrollToTop></ScrollToTop>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h2 className="text-3xl font-bold text-center sm:text-left">Manage Your Events</h2>
                    <button
                        onClick={handleCreate}
                        className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus size={18} /> Create Event
                    </button>
                </div>

                {events.length === 0 ? (
                    <p className="text-center h-[50vh] text-gray-600">You haven’t created any events yet.</p>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto rounded-lg shadow">
                            <table className="min-w-full divide-y divide-gray-200 bg-base-100">
                                <thead className="bg-base-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold ">Image</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold ">Name</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold ">Date</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold ">Location</th>
                                        <th className="px-6 py-3 text-center text-sm font-semibold ">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {events.map((event) => (
                                        <tr key={event._id} className="hover:bg-primary/10">
                                            <td className="px-6 py-4">
                                                <img src={event.image} alt={event.name} className="w-20 h-14 object-cover rounded" />
                                            </td>
                                            <td className="px-6 py-4 font-medium">{event.name}</td>
                                            <td className="px-6 py-4 ">
                                                {new Date(event.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 ">{event.location}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-3">
                                                    <button
                                                        onClick={() => handleUpdate(event._id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                                    >
                                                        <Pencil size={16} /> Update
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(event._id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                                    >
                                                        <Trash2 size={16} /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-6">
                            {events.map((event) => (
                                <div key={event._id} className="bg-white rounded-xl shadow p-4 space-y-3">
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold">{event.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(event.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleUpdate(event._id)}
                                            className="flex-1 flex items-center justify-center gap-1 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            <Pencil size={16} /> Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="flex-1 flex items-center justify-center gap-1 px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageEvents;
