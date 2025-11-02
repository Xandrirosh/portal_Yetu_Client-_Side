import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';

const AddNewCourse = ({ close, onSuccess }) => {
    const [formData, setFormData] = useState({
        courseName: '',
        department: '',
        academicLevel: '',
        duration: '',
        fees: ''
    })
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { courseName, department, academicLevel, duration, fees } = formData;

        if (!courseName || !department || !academicLevel || !duration || !fees) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.registerCourse,
                data: formData
            })
            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                setFormData({
                    courseName: '',
                    department: '',
                    academicLevel: '',
                    duration: '',
                    fees: ''
                })
                onSuccess(); 
                close();
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <section className="fixed inset-0 bg-neutral-800 bg-opacity-65 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                <div className='flex items-center justify-between mb-4'>
                    <h2 className="text-xl font-semibold">Register Course</h2>
                    <button onClick={close} className='cursor-pointer'><IoClose size={25} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="courseName">Course Name</label>
                        <input
                            type="text"
                            id='courseName'
                            name='courseName'
                            value={formData.courseName}
                            onChange={handleOnChange}
                            placeholder='enter course name'
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor=" department">Department</label>
                        <select
                            name="department"
                            id='department'
                            value={formData.department}
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Department</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Business">Business</option>
                            <option value="Education">Education</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="academicLevel">Academic Level</label>
                        <select
                            name="academicLevel"
                            id='academicLevel'
                            value={formData.academicLevel}
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Academic Level</option>
                            <option value="Degree">Degree</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Certificate">Certificate</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="duration">Duration</label>
                        <input
                            type="text"
                            id='duration'
                            name='duration'
                            value={formData.duration}
                            onChange={handleOnChange}
                            placeholder='enter course duration'
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="fees">Fees</label>
                        <input
                            type="number"
                            id='fees'
                            name='fees'
                            value={formData.fees}
                            onChange={handleOnChange}
                            placeholder='enter course fees'
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded-md text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-600'}`}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>

                    </div>
                </form>
            </div>
        </section>
    )
}

export default AddNewCourse