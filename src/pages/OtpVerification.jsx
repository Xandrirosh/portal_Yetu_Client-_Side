import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();
  console.log("Received navigation state:", location.state);

  // Redirect if no valid email in state
  useEffect(() => {
    if (!location?.state) {
      navigate('/forgot-password')
    }
  })

  const validateValue = data.every(el => el);

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const requestData = {
      email: location?.state, // ✅ direct string now
      otp: data.join('')      // ✅ direct string from array
    };

    console.log("Submitting request data:", requestData);

    const response = await Axios({
      ...SummaryApi.verifyOtp,
      data: requestData
    });

    if (response.data.error) {
      toast.error(response.data.message);
      return;
    }

    if (response.data.success) {
      toast.success(response.data.message);
      setData(["", "", "", "", "", ""]);
      navigate('/reset-password', {
        state: {
          data: response.data,
          email: location?.state // ✅ keep consistent
        }
      });
    }
  } catch (error) {
    AxiosToastError(error);
  }
};


  const handleChange = (value, index) => {
    const newData = [...data];
    newData[index] = value.replace(/[^0-9]/g, '');
    setData(newData);

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !data[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <section className='container mx-auto flex justify-center items-center mt-10 bg-white'>
      <div className='border rounded p-4'>
        <p className='font-semibold text-xl flex justify-center'>Enter OTP</p>
        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
          <label>Enter Your OTP:</label>
          <div className='flex items-center gap-2 justify-between mt-3'>
            {data.map((el, index) => (
              <input
                key={'otp' + index}
                ref={(ref) => (inputRef.current[index] = ref)}
                value={el}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-blue-600 text-center'
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!validateValue}
            className='text-white bg-gray-600 hover:bg-black disabled:bg-gray-400 cursor-pointer font-semibold rounded py-2 my-3'
          >
            Verify OTP
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link
            to={'/'}
            className='font-semibold text-blue-600 hover:text-blue-800'
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
