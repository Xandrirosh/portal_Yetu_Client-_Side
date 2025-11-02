import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios.js'
import AxiosToastError from '../utils/AxiosToastError.js'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.forgotPassword,
                data: data
            })
            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                console.log('data', data.email)
                navigate('/verification-otp', {
                    state: data.email
                })
                setData({
                    email: ''
                })
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const validateValue = Object.values(data).every(el => el)
    return (
        <section className='container mx-auto flex justify-center items-center mt-10 bg-white'>
            <div className='border rounded p-4'>
                <p className='font-semibold text-xl flex justify-center'>Forgot Password</p>
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

                    <button disabled={!validateValue} className='text-white bg-gray-600 hover:bg-black cursor-pointer font-semibold rounded py-2 my-3 '>
                        Send OTP
                    </button>
                </form>
                <p>
                    Already have an account ? <Link to={'/'}
                        className='font-semibold text-blue-600 hover:text-blue-800'>Login</Link>
                </p>
            </div>
        </section >
    )
}

export default ForgotPassword