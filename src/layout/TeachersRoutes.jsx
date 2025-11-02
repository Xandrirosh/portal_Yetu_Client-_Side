import { useSelector } from 'react-redux'
import isTeacher from '../utils/isTeacher.js'
const TeachersRoutes = ({children}) => {
    const user = useSelector((state) => state.user)
  return (
    <>
    {
        isTeacher(user.role) ?  children : <p className='text-red-600 bg-red-100 p-4'>Not Authrised</p>
    }
    </>
  )
}

export default TeachersRoutes



