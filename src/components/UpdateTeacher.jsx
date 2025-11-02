import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UpdateTeacher = ({ close, data }) => {
    const [formData, setFormData] = useState({
        userId: '',
        department: '',
        salary: '',
        rank: '',
        isActive: true
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
                ...SummaryApi.updateTeachersDetails,
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
        }
    }
    return (
        <section className="fixed inset-0 bg-neutral-800 bg-opacity-65 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                <div className='flex items-center justify-between mb-4'>
                    <h2 className="text-xl font-semibold">Update Teacher</h2>
                    <button onClick={close} className='cursor-pointer'><IoClose size={25} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <label htmlFor="department">Department</label>
                        <select
                            name="department"
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
                        <label htmlFor="rank">Rank</label>
                        <select
                            name="rank"
                            value={formData.rank}
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Rank</option>
                            <option value="Head of Department">Head of Department</option>
                            <option value="Senior Lecturer">Senior Lecturer</option>
                            <option value="Lecturer">Lecturer</option>
                            <option value="Assistant">Assistant</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="salary">Salary</label>
                        <input
                            type="number"
                            name='salary'
                            value={formData.salary}
                            onChange={handleOnChange}
                            placeholder='Enter salary'
                            min={0}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={formData.isActive}
                            onChange={handleOnChange}
                            className="cursor-pointer"
                        />
                        <label htmlFor="isActive">Active</label>
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

export default UpdateTeacher