import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';

const AddNewParent = ({ close ,onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    relation: '',
    mobile: '',
    email: '',
    address: {
      street: '',
      city: '',
      country: ''
    },
    student: []
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.registerParents,
        data: formData
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        setFormData({
          name: '',
          relation: '',
          mobile: '',
          email: '',
          address: { street: '', city: '', country: '' },
          student: []
        });
        if(close){
          onSuccess()
          close();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-neutral-800 bg-opacity-65 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <div className='flex items-center justify-between mb-4'>
          <h2 className="text-xl font-semibold">Register Parent</h2>
          <button onClick={close} className='cursor-pointer'><IoClose size={25} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name">FullName</label>
            <input
              type="text"
              id='name'
              name='name'
              value={formData.name}
              onChange={handleOnChange}
              placeholder='fullname'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="relation">Relation</label>
            <select
              name="relation"
              id='relation'
              value={formData.relation}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Relation</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
            </select>
          </div>
          <div>
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id='mobile'
              name='mobile'
              value={formData.mobile}
              onChange={handleOnChange}
              placeholder='mobile'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id='email'
              name='email'
              value={formData.email}
              onChange={handleOnChange}
              placeholder='email'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className='grid gap-2'>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id='address'
              name='address.street'
              value={formData.address.street}
              onChange={handleOnChange}
              placeholder='street'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              id='address'
              name='address.city'
              value={formData.address.city}
              onChange={handleOnChange}
              placeholder='city'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              id='address'
              name='address.country'
              value={formData.address.country}
              onChange={handleOnChange}
              placeholder='country'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="students">Student Id</label>
            <input
              type="text"
              id="student"
              name="student"
              value={formData.student.join(',')}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  student: e.target.value.split(',').map(s => s.trim())
                }))
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="S001,S002,..."
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

export default AddNewParent