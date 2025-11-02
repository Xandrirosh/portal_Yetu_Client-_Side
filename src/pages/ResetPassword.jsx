import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const ResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const validateValue = Object.values(data).every(el => el)

  useEffect(() => {
    if (!(location?.state?.data?.success)) {
      navigate('/home')
    }

    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email
        }
      })
    }
  }, [])

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
    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/')
        setData({
          email: '',
          newPassword: '',
          confirmPassword: ''
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='container mx-auto flex justify-center items-center mt-10 bg-white'>
      <div className='border rounded p-4'>
        <p className='font-semibold text-xl flex justify-center'>Reset Password</p>
        <form className='grid gap-1' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="password">New password:</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-600' >
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                value={data.password}
                onChange={handleChange}
                placeholder='enter new password'
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
          </div>


          <div className='grid gap-1'>
            <label htmlFor="password">Confirm password:</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-600' >
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                id='password'
                value={data.password}
                onChange={handleChange}
                placeholder='enter your confirm password'
                className=' w-full outline-none '
              />
              <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
                {
                  showPassword ? (
                    <FaEye />
                  ) : (
                    <FaEyeSlash />
                  )
                }
              </div>
            </div>
          </div>

          <button disabled={!validateValue} className='text-white bg-gray-600 hover:bg-black cursor-pointer font-semibold rounded py-2 my-3 '>
            Change Password
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

export default ResetPassword