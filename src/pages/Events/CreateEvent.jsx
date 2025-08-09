import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/hooks';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const CreateEvent = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.creatorName = user?.displayName || 'Unknown';
    data.creatorEmail = user?.email || 'Unknown';

    try {
      const token = await user.getIdToken();

      const response = await axios.post('http://localhost:3000/events', data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Event Created!',
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
      navigate('/eventInfo/manageEvents');
    } catch (error) {
      console.error('Error posting event:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to create event',
        text: error.message || 'Something went wrong',
      });
    }
  };


  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-6 py-16">
      <title>SportifyHub || Create Event</title>
      <ScrollToTop></ScrollToTop>
      <div className="w-full max-w-4xl bg-base-100 rounded-3xl shadow-lg p-10 sm:p-12">
        <h2 className="text-3xl font-extrabold text-center mb-10">
          Create a New Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Name
              </label>
              <input
                {...register('name', { required: true })}
                type="text"
                placeholder="Enter event name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Type
              </label>
              <select
                {...register('type', { required: true })}
                className="w-full bg-base-100 rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date
              </label>
              <input
                {...register('date', { required: true })}
                type="date"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            {/* Event Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Location
              </label>
              <input
                {...register('location', { required: true })}
                type="text"
                placeholder="e.g., Stadium A, City XYZ"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            {/* Image URL full width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Picture URL
              </label>
              <input
                {...register('image', { required: true })}
                type="url"
                placeholder="https://example.com/event.jpg"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description', { required: true })}
              rows="5"
              placeholder="Describe your event..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 resize-y
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Creator Info */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Creator Name
              </label>
              <input
                {...register('creatorName')}
                type="text"
                value={user?.displayName || ''}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-base-200 px-4 py-3
                  outline-none cursor-not-allowed"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Creator Email
              </label>
              <input
                {...register('creatorEmail')}
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-base-200 px-4 py-3
                  outline-none cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700
              transition shadow-lg"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
