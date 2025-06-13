import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/hooks';
import axios from 'axios';

const CreateEvent = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        data.creatorName = user?.displayName || 'Unknown';
        data.creatorEmail = user?.email || 'Unknown';

        axios.post('http://localhost:3000/events', data)
            .then(result => {
                console.log(result.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Event Created!',
                    timer: 1500,
                    showConfirmButton: false
                });
            })
            .catch(error => {
                console.error('Error posting event:', error);
            });


        console.table(data);
        console.log(data);

        reset();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create a New Event</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* --- Basic Info (grid on md+) --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Event Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                            <input
                                {...register('name', { required: true })}
                                type="text"
                                placeholder="Enter event name"
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                                required
                            />
                        </div>

                        {/* Event Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                            <select
                                {...register('type', { required: true })}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                                required
                            >
                                <option value="">Select Event Type</option>
                                <option value="Swimming">Swimming</option>
                                <option value="Sprinting">Sprinting</option>
                                <option value="Long Jump">Long Jump</option>
                                <option value="High Jump">High Jump</option>
                                <option value="Hurdle Race">Hurdle Race</option>
                            </select>
                        </div>

                        {/* Event Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                            <input
                                {...register('date', { required: true })}
                                type="date"
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                                required
                            />
                        </div>

                        {/* Event Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Location</label>
                            <input
                                {...register('location', { required: true })}
                                type="text"
                                placeholder="Enter location (e.g., Stadium A, City XYZ)"
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                                required
                            />
                        </div>

                        {/* Event Image URL */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Picture URL</label>
                            <input
                                {...register('image', { required: true })}
                                type="url"
                                placeholder="https://example.com/event.jpg"
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            {...register('description', { required: true })}
                            rows="4"
                            placeholder="Describe your event..."
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
                            required
                        ></textarea>
                    </div>

                    {/* Creator Info (flex row on md+) */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Creator Name</label>
                            <input
                                {...register('creatorName')}
                                type="text"
                                value={user?.displayName || ''}
                                readOnly
                                className="w-full px-4 py-2 border bg-gray-100 rounded-md outline-none"
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Creator Email</label>
                            <input
                                {...register('creatorEmail')}
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className="w-full px-4 py-2 border bg-gray-100 rounded-md outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
                    >
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
