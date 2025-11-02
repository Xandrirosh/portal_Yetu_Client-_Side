import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditEvent = ({ eventData, close, onSuccess }) => {
    const [title, setTitle] = useState(eventData.title || '');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.updateEvent,
                url: `/api/events/update-event/${eventData._id}`,
                data: { title }
            });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                onSuccess();
                close();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    }
    return (
        <section className="fixed inset-0 bg-neutral-800 bg-opacity-65 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                <div className='flex items-center justify-between mb-4'>
                    <h2 className="text-xl font-semibold text-blue-900">Edit Event</h2>
                    <button onClick={close} className='cursor-pointer'><IoClose size={25} /></button>
                </div>
                <form onSubmit={handleSubmit} className='space-y-2'>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name='title'
                            placeholder="event title"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <button type="submit" className="px-4 py-1 border rounded border-blue-700 text-blue-800 hover:bg-blue-500 hover:text-white">Confirm</button>
                        <button onClick={close} className="px-4 py-1 border rounded border-red-500 text-red-700 hover:bg-red-500 hover:text-white">Cancel</button>
                    </div>
                </form>
            </div>

        </section>
    )
}

export default EditEvent