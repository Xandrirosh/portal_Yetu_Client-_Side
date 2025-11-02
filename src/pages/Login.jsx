import { Link, useNavigate } from 'react-router-dom'
import portalLogo from '../assets/portal logo.jpeg'
import { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Axios from '../utils/Axios.js'
import AxiosToastError from '../utils/AxiosToastError.js'
import toast from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi';
import { setUserDetails } from '../store/userSlice'
import { useDispatch } from 'react-redux'
const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const validateValue = Object.values(data).every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            })
            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)

                const fullLoginData = response.data.data;

                localStorage.setItem('loginData', JSON.stringify(fullLoginData));

                localStorage.setItem('accessToken', fullLoginData.accessToken)
                localStorage.setItem('refreshToken', fullLoginData.refreshToken)

                dispatch(setUserDetails(fullLoginData.user));
                setData({
                    email: '',
                    password: ''
                })
                navigate('/home')
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='container mx-auto flex justify-center items-center px-2 bg-white'>
            <div>
                <div>
                    <img
                        src={portalLogo}
                        alt="portallogo"
                        className='w-full h-60 object-scale-down'
                    />
                </div>
                <div className='border rounded p-4'>
                    <p className='font-semibold text-4xl flex justify-center'>Login Form</p>
                    <form className='grid gap-1' onSubmit={handleSubmit}>
                        < div className='grid gap-1 '>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name='email'
                                id='email'
                                value={data.email}
                                onChange={handleChange}
                                placeholder='enter your email'
                                className='bg-blue-50 p-2 border rounded outline-none focus:border-blue-600'
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor="password">Password:</label>
                            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-600' >
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder='enter your password'
                                    className=' w-full outline-none '
                                />
                                <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                                    {
                                        showPassword ? (
                                            <FaEye />
                                        ) : (
                                            <FaEyeSlash />
                                        )
                                    }
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block ml-auto hover:text-blue-600'>Forgot password ?</Link>
                        </div>
                        <button disabled={!validateValue} className='text-white bg-gray-600 hover:bg-black cursor-pointer font-semibold rounded py-2 my-3 '>
                            Login
                        </button>
                    </form>

                </div>
            </div >
        </section >
    )
}

export default Login