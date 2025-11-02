import image1 from '../assets/portal logo.jpeg'
import image2 from '../assets/portal icon.jpeg'
import { FiLogOut } from "react-icons/fi";
import AxiosToastError from '../utils/AxiosToastError.js'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi';
import { useDispatch } from 'react-redux'
import { logout } from '../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })
            if (response.data.success) {
                dispatch(logout())
                // Clear all localStorage keys
                localStorage.removeItem('loginData');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                toast.success(response.data.message)
                navigate('/')
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <header className='h-20  sticky top-0 z-40 bg-white flex justify-between items-center  shadow-2xl'>
            <Link to="/home" >
                <div>
                    <img
                        src={image1}
                        alt=""
                        className='h-20  hidden sm:block md:block lg:block mx-6'
                    />
                </div>
                <div>
                    <img
                        src={image1}
                        alt=""
                        className='h-16  lg:hidden md:hidden sm:hidden block '
                    />
                </div>
            </Link>

            <button onClick={handleLogout} className='flex gap-1 cursor-pointer'>
                <p className='font-semibold text-lg'>logout</p>
                <FiLogOut size={25} />
            </button>

        </header>
    )
}

export default Header