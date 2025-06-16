import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/hooks';
import Loading from '../../components/Loading';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`https://sportify-hub-server-nine.vercel.app/events/${id}`);
        const event = res.data;
        // console.log(event);

        // Set form fields with fetched data
        setValue('name', event.name);
        setValue('type', event.type || '');
        setValue('date', event.date?.slice(0, 10));
        setValue('location', event.location);
        setValue('image', event.image);
        setValue('description', event.description || '');
      } catch (error) {
        console.error('Error fetching event:', error);
        Swal.fire('Error', 'Failed to load event data.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      // You can add user info if needed, or rely on backend to check auth
      data.creatorName = user?.displayName || 'Unknown';
      data.creatorEmail = user?.email || 'Unknown';

      await axios.put(`https://sportify-hub-server-nine.vercel.app/events/${id}`, data, {
        headers: {
          authorization: `Bearer ${user?.accessToken || ''}`
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Event updated successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/eventInfo/manageEvents');
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update event',
        text: error.message || 'Something went wrong',
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white flex items-center justify-center px-6 py-16">
      <title>SportifyHub || Update Events</title>
      <ScrollToTop></ScrollToTop>
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-10 sm:p-12">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-10">
          Update Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Name
              </label>
              <input
                {...register('name', { required: 'Event name is required' })}
                type="text"
                placeholder="Enter event name"
                className={`w-full rounded-lg border px-4 py-3 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                  ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Type
              </label>
              <select
                {...register('type', { required: 'Event type is required' })}
                className={`w-full rounded-lg border px-4 py-3 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                  ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Event Type</option>
                <option value="Swimming">Swimming</option>
                <option value="Sprinting">Sprinting</option>
                <option value="Long Jump">Long Jump</option>
                <option value="High Jump">High Jump</option>
                <option value="Hurdle Race">Hurdle Race</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date
              </label>
              <input
                {...register('date', { required: 'Event date is required' })}
                type="date"
                className={`w-full rounded-lg border px-4 py-3
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                  ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                {...register('location', { required: 'Location is required' })}
                type="text"
                placeholder="e.g., Stadium A, City XYZ"
                className={`w-full rounded-lg border px-4 py-3 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                  ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
              )}
            </div>

            {/* Image URL full width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Picture URL
              </label>
              <input
                {...register('image', {
                  required: 'Image URL is required',
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/i,
                    message: 'Enter a valid image URL',
                  }
                })}
                type="url"
                placeholder="https://example.com/event.jpg"
                className={`w-full rounded-lg border px-4 py-3 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                  ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows="5"
              placeholder="Describe your event..."
              className={`w-full rounded-lg border px-4 py-3 placeholder-gray-400 resize-y
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Creator Info */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={user?.displayName || ''}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3
                outline-none cursor-not-allowed"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3
                outline-none cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white font-semibold rounded-lg transition shadow-lg
              ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
