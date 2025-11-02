import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const DeleteConfirmBox = ({ cancel, close, onSuccess }) => {
    const [formData, setFormData] = useState({
        userId: ''
    })
    const [loading, setLoading] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.deleteTeacher,
                data: formData
            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                onSuccess()
                close()
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center'>
            <div className='bg-white p-4 rounded  w-full max-w-md md:m-0 lg:m-0 m-4'>
                <div className="flex justify-between items-center gap-3">
                    <h1 className='font-semibold'>Permanent Delete</h1>
                    <button onClick={close}  >
                        <IoClose size={25} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="userId">Teacher ID</label>
                        <input
                            type="text"
                            name='userId'
                            value={formData.userId}
                            onChange={handleOnChange}
                            placeholder='Enter Id'
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <p className='text-sm text-gray-600 my-4'>
                            Are you sure you want to delete this user?
                        </p>
                        <div className="flex items-center justify-end gap-2">
                            <button type="submit" className="px-4 py-1 border rounded border-green-700 text-green-700 hover:bg-green-500 hover:text-white">Confirm</button>
                            <button onClick={cancel} className="px-4 py-1 border rounded border-red-500 text-red-700 hover:bg-red-500 hover:text-white">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DeleteConfirmBox