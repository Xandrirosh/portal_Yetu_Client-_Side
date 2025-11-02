import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UpdateStudent = ({ data: id, close }) => {
    const [formData, setFormData] = useState({
        courseName:'',
        amountPaid:'',
    })
    const [loading, setLoading] = useState(false)
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateStudentDetails,
                url: `/api/students/update-details/${id}`,
                data: formData
            })
            
            const { data: responseData } = response;
            if (responseData.success) {                       
                toast.success(responseData.message);
                if (close) {
                    close();
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <section className="fixed inset-0 bg-neutral-800 bg-opacity-65 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                <div className='flex items-center justify-between mb-4'>
                    <h2 className="text-xl font-semibold">Update Student</h2>
                    <button onClick={close} className='cursor-pointer'><IoClose size={25} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="courseName">Course Name</label>
                        <input
                            type="text"
                            name='courseName'
                            value={formData.courseName}
                            onChange={handleOnChange}
                            placeholder='Enter course name'
                            min={0}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="amountPaid">Amount Paid</label>
                        <input
                            type="number"
                            name='amountPaid'
                            value={formData.amountPaid}
                            onChange={handleOnChange}
                            placeholder='Enter amount paid'
                            min={0}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded-md text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-600'}`}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>

                    </div>
                </form>
            </div>
        </section>
    )
}

export default UpdateStudent