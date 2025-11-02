import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError.js';

const AddNewTeacher = ({ close, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    mobile: '',
    password: '',
    avatarFile: null,
    preview: ''
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadUserImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, avatarFile: file, preview }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.avatarFile) {
      toast.error('Image is required');
      return;
    }

    try {
      setLoading(true);
      const payload = new FormData();

      payload.append('firstName', formData.firstName);
      payload.append('lastName', formData.lastName);
      payload.append('email', formData.email);
      payload.append('role', formData.role);
      payload.append('mobile', formData.mobile);
      payload.append('password', formData.password);
      payload.append('avatar', formData.avatarFile); // key must match backend multer field

      const response = await Axios({
        ...SummaryApi.register,
        data: payload,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          role: '',
          mobile: '',
          password: '',
          avatarFile: null,
          preview: ''
        });
        onSuccess();
        close();
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
          <h2 className="text-xl font-semibold">Register User</h2>
          <button onClick={close}><IoClose size={25} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['firstName', 'lastName', 'email', 'mobile', 'password'].map(field => (
            <div key={field}>
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleOnChange}
                placeholder={field}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label htmlFor="role">Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Role</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
            </select>
          </div>

          <div>
            <p>Avatar:</p>
            <label htmlFor="uploadUserImage">
              <div className='border bg-blue-50 h-36 w-36 flex items-center justify-center rounded cursor-pointer'>
                {formData.preview ? (
                  <img src={formData.preview} alt="preview" className='h-full w-full object-scale-down' />
                ) : (
                  <div className='text-center flex flex-col items-center'>
                    <FaCloudUploadAlt size={35} />
                    <p className='text-sm text-gray-600'>Upload Image</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="uploadUserImage"
                className="hidden"
                accept="image/*"
                onChange={handleUploadUserImage}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-600'}`}
          >
            {loading ? 'Saving...' : 'Register'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewTeacher;